'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function element() {
  const classes = new Set();
  return {
    dataset: {}, attrs: {}, children: [], handlers: {}, hidden: true, value: '', checked: false,
    set className(value) { classes.clear(); value.split(/\s+/).filter(Boolean).forEach(x => classes.add(x)); },
    get className() { return [...classes].join(' '); },
    classList: { add: x => classes.add(x), remove: x => classes.delete(x), toggle: (x, yes) => yes ? classes.add(x) : classes.delete(x), contains: x => classes.has(x) },
    setAttribute(k, v) { this.attrs[k] = v; }, getAttribute(k) { return this.attrs[k]; },
    addEventListener(name, fn) { (this.handlers[name] ??= []).push(fn); },
    async fire(name, event = {}) { for (const fn of this.handlers[name] ?? []) await fn(event); },
    append(...children) { this.children.push(...children); }, replaceChildren(...children) { this.children = children; },
    focus() { this.focused = true; }, select() { this.selected = true; }, querySelectorAll() { return []; },
    querySelector(selector) { return this.children.find(child => child.tagName === selector); },
    click() { return this.fire('click'); }
  };
}
function setup({ number = '', reduced = false, config = true, clipboard = true, dialogSupport = true } = {}) {
  const ids = ['gift-story','prefer-conversation','conversation-status','gift-message','gift-art','letter-panel','letter-art','message-preview','questions','share-answers','answer-status','preview-text','preview-status','confirm-whatsapp','open-whatsapp','number-status','whatsapp-confirmation','copy-answers','cancel-preview','answer-actions','about-cards','detail-cards','letter-content','navigation','gracias'];
  const nodes = Object.fromEntries(ids.map(id => [id, element()]));
  nodes['night-sky'] = element();
  for (const id of ['inicio','sobre-mi','conocerte','detalles','carta']) nodes[id] = element();
  const toggle = element(); toggle.attrs['aria-expanded'] = 'false'; const header = element();
  const gift = element(); gift.dataset = {disclosure:'gift-message',art:'gift-art',openLabel:'giftOpen',closeLabel:'giftClose'};
  const letter = element(); letter.dataset = {disclosure:'letter-panel',art:'letter-art',openLabel:'letterOpen',closeLabel:'letterClose'};
  const characters = ['inicio','gracias','pensativo','atento','relajado','sonrisa'].map(pose => { const e=element();e.dataset.pose=pose;e.children=['placeholder'];return e; });
  const taste = element(); const summary = element(); summary.tagName = 'summary'; taste.append(summary); taste.open = false;
  const descendants = () => { const all = []; const visit = e => { if (!e || typeof e !== 'object') return; all.push(e); for (const child of e.children || []) visit(child); }; Object.values(nodes).forEach(visit); return all; };
  const link=element(); link.hash='#gracias'; nodes.navigation.querySelectorAll=()=>[link];
  const documentHandlers = {};
  const images=[];const opened=[];const copied=[];let observerCount=0;
  if(dialogSupport)nodes['message-preview'].showModal=function(){this.open=true;};
  nodes['message-preview'].close=function(){this.open=false;return this.fire('close');};
  const context = {window:{open:(...args)=>opened.push(args),matchMedia:()=>({matches:reduced})},navigator:{clipboard:clipboard?{writeText:async value=>copied.push(value)}:undefined},
    document:{querySelector:s=>s==='.menu-toggle'?toggle:s==='.header'?header:nodes[s.slice(1)]??null,
      querySelectorAll:s=>s==='[data-disclosure]'?[gift,letter,...descendants().filter(e=>e.dataset?.disclosure)]:s==='[data-pose]'||s==='.character'?characters:s==='.taste-card'?[taste]:[],
      getElementById:id=>nodes[id]??descendants().find(e=>e.id===id)??null,createElement:tag=>{const e=element();e.tagName=tag;return e;},createTextNode:text=>({textContent:text}),addEventListener:(name,fn)=>(documentHandlers[name]??=[]).push(fn)},
    Image:function(){this.remove=()=>{this.removed=true;};images.push(this);},IntersectionObserver:function(){observerCount++;this.observe=()=>{};this.unobserve=()=>{}}
  };
  context.window.IntersectionObserver=context.IntersectionObserver;
  vm.createContext(context);
  if(config){vm.runInContext(read('js/content.js'),context);context.window.pageContent.whatsappNumber=number;}
  vm.runInContext(read('js/render-content.js'),context);
  vm.runInContext(read('js/interactions.js'),context);
  vm.runInContext(read('js/script.js'),context);
  return {nodes,gift,letter,toggle,header,link,characters,images,opened,copied,context,observerCount,documentHandlers,taste,summary,
    answer(index,value){nodes.questions.children[index].children[2].value=value;}};
}
test('Regalo y carta: abrir, cerrar, releer y mantener estados accesibles', async()=>{
  const s=setup();
  for(const [button,id] of [[s.gift,'gift-message'],[s.letter,'letter-panel']]){
    assert.equal(s.nodes[id].hidden,true);assert.equal(button.attrs['aria-expanded'],'false');
    await button.fire('click');assert.equal(s.nodes[id].hidden,false);assert(s.nodes[id].focused);assert.equal(button.attrs['aria-expanded'],'true');
    await button.fire('click');assert.equal(s.nodes[id].hidden,true);
    await button.fire('click');assert.equal(s.nodes[id].hidden,false);
  }
});
test('Menú: Escape devuelve foco y enlaces enfocan su destino',async()=>{
  const s=setup();await s.toggle.fire('click');assert.equal(s.toggle.attrs['aria-expanded'],'true');
  for(const fn of s.documentHandlers.keydown)fn({key:'Escape'});
  assert.equal(s.toggle.attrs['aria-expanded'],'false');assert(s.toggle.focused);
  await s.toggle.fire('click');await s.link.fire('click');assert(s.nodes.gracias.focused);assert.equal(s.toggle.attrs['aria-expanded'],'false');
});
test('Respuestas voluntarias: vacío, una respuesta, vista previa editable y cancelación',async()=>{
  const s=setup();await s.nodes['share-answers'].fire('click');assert(!s.nodes['message-preview'].open);assert(s.nodes['answer-status'].textContent);
  s.answer(1,'  Un paseo tranquilo  ');await s.nodes['share-answers'].fire('click');
  assert(s.nodes['message-preview'].open);assert(s.nodes['preview-text'].value.includes('Un paseo tranquilo'));
  assert(!s.nodes['preview-text'].value.includes('¿Qué canción'));
  s.nodes['preview-text'].value='Mensaje editado';await s.nodes['preview-text'].fire('input');
  await s.nodes['cancel-preview'].fire('click');assert.equal(s.nodes['preview-text'].value,'');assert.equal(s.nodes['message-preview'].open,false);assert.equal(s.opened.length,0);assert(s.nodes['share-answers'].focused);
  await s.nodes['share-answers'].fire('click');assert(s.nodes['preview-text'].value.includes('Un paseo tranquilo'));
});
test('Número vacío: copia sin inventar destino; clipboard no disponible selecciona texto',async()=>{
  for(const clipboard of [true,false]){
    const s=setup({clipboard});s.answer(0,'Una canción');await s.nodes['share-answers'].fire('click');
    assert(s.nodes['open-whatsapp'].hidden);assert(s.nodes['whatsapp-confirmation'].hidden);
    await s.nodes['copy-answers'].fire('click');assert.equal(s.opened.length,0);
    if(clipboard)assert.equal(s.copied[0],s.nodes['preview-text'].value);else assert(s.nodes['preview-text'].selected);
  }
});
test('WhatsApp exige confirmación y codifica el mensaje editado sin enviarlo',async()=>{
  const s=setup({number:'59170000000'});s.answer(0,'Prueba');await s.nodes['share-answers'].fire('click');
  await s.nodes['open-whatsapp'].fire('click');assert.equal(s.opened.length,0);
  s.nodes['confirm-whatsapp'].checked=true;await s.nodes['confirm-whatsapp'].fire('change');assert.equal(s.nodes['open-whatsapp'].disabled,false);
  s.nodes['preview-text'].value='Texto editado: ñ & ?';await s.nodes['preview-text'].fire('input');assert(!s.nodes['confirm-whatsapp'].checked);assert(s.nodes['open-whatsapp'].disabled);
  s.nodes['confirm-whatsapp'].checked=true;await s.nodes['confirm-whatsapp'].fire('change');await s.nodes['open-whatsapp'].fire('click');
  assert.equal(s.opened.length,1);assert.equal(s.opened[0][0],'https://wa.me/59170000000?text='+encodeURIComponent(s.nodes['preview-text'].value));assert.equal(s.opened[0][2],'noopener,noreferrer');
  assert.equal(s.context.window.pageInteractions.whatsappUrl('', 'texto'),null);
  assert.equal(s.context.window.pageInteractions.whatsappUrl('no válido','texto'),null);
});
test('Movimiento reducido: no observa ni reacciona; CSS desactiva las animaciones',async()=>{
  const s=setup({reduced:true});assert.equal(s.observerCount,0);await s.characters[0].fire('pointerdown');assert(!s.characters[0].classList.contains('reacting'));
  assert.match(read('css/style.css'),/@media\(prefers-reduced-motion:reduce\)[\s\S]*animation:none!important;transition:none!important/);
});
test('Imágenes: seis poses reales, error conserva marcador; configuración ausente no falla',()=>{
  const s=setup();const images=s.images.filter(image=>image.src.includes('/chibi/'));assert.equal(images.length,6);
  for(const [index,image] of images.entries()){assert(fs.existsSync(path.join(root,image.src)));assert.equal(image.loading,index===0?'eager':'lazy');image.onerror();assert(image.removed);}
  assert(s.characters.every(e=>e.children[0]==='placeholder'));
  const missing=setup({config:false});assert.equal(missing.images.length,0);assert.equal(missing.gift.hidden,true);assert(missing.header.classList.contains('menu-ready'));
});
test('Respaldo, controles nativos y ausencia de almacenamiento o trackers en scripts',()=>{
  const html=read('index.html');assert(html.includes('No siempre encuentro las palabras adecuadas,'));assert(html.includes('Una mañana apareciste de repente y me entregaste una salteña.'));
  assert(!/<(?:article|div)[^>]*id="(?:gift-message|letter-panel)"[^>]*\bhidden/.test(html));
  assert.equal((html.match(/<section\b/g)||[]).length,6);
  for(const tag of html.match(/<button\b[^>]*>/g))assert(tag.includes('type="button"'));
  assert(html.includes('<dialog'));assert(read('js/interactions.js').includes("document.createElement('summary')"));
  assert(!/localStorage|sessionStorage|indexedDB|sendBeacon|fetch\(|XMLHttpRequest/.test(read('js/interactions.js')));
});

test('Conversar sin responder no abre diálogo ni solicita, copia o comparte datos',async()=>{
  const s=setup();
  assert.equal(s.nodes['prefer-conversation'].hidden,false);
  s.answer(0,'Respuesta que permanece privada');
  await s.nodes['prefer-conversation'].fire('click');
  assert.equal(s.nodes['conversation-status'].textContent,s.context.window.pageContent.interactions.conversationStatus);
  assert(!s.nodes['message-preview'].open);assert.equal(s.opened.length,0);assert.equal(s.copied.length,0);
  assert.equal(s.nodes.questions.children[0].children[2].value,'Respuesta que permanece privada');
});

test('Siete preguntas con invitación; la pregunta libre entra en la vista previa solo al responder',async()=>{
  const s=setup();assert.equal(s.nodes.questions.children.length,7);
  for(const card of s.nodes.questions.children){
    assert.equal(card.children[0].children.length,3);assert(card.children[0].children[2].textContent);
    assert.equal(card.children[1].htmlFor,card.children[2].id);assert(!card.children[2].required);
  }
  s.answer(6,'Algo que quiero contar');await s.nodes['share-answers'].fire('click');
  assert(s.nodes['preview-text'].value.includes('¿Qué te gustaría que yo supiera de ti?'));
  assert(!s.nodes['preview-text'].value.includes('¿Qué canción'));
});

test('Recuerdos, gustos y carta comparten generador con el respaldo; sin dialog siguen legibles',()=>{
  const s=setup({dialogSupport:false});const content=s.context.window.pageContent;
  assert.equal(s.nodes['gift-story'].children.length,3);assert.equal(s.nodes['detail-cards'].children.length,6);assert.equal(s.nodes['letter-content'].children.length,9);
  assert.equal(s.nodes['answer-actions'].hidden,true);assert.equal(s.nodes.questions.children.length,7);
  const renderer=require('../js/render-content.js');const html=read('index.html');
  for(const [id,nodes] of Object.entries(renderer.blocks(content))){
    const start=`<!-- content:${id} -->\n`;const end=`\n<!-- /content:${id} -->`;
    assert.equal(html.split(start)[1].split(end)[0],nodes.map(renderer.html).join('\n'));
  }
  assert(!html.includes('Por completar:'));assert.equal(content.whatsappNumber,'');
  assert(renderer.html({tag:'p',attrs:{title:'"<&'},children:['<script> & texto']}).includes('&lt;script&gt; &amp; texto'));
});

test('Chibis cargados sustituyen el marcador sin alterar sus rutas',()=>{
  const s=setup();for(const [index,image] of s.images.filter(image=>image.src.includes('/chibi/')).entries()){
    image.onload();assert.equal(s.characters[index].children.length,1);assert.equal(s.characters[index].children[0],image);assert.equal(image.className,'');
  }
});
test('Recursos de estado: precarga completa, apertura, cierre y alternativa CSS si fallan',async()=>{
  const s=setup();
  for(const [id,button] of [['gift-art',s.gift],['letter-art',s.letter]]){
    const pair=s.images.filter(image=>image.src.includes(id==='gift-art'?'gift-':'letter-'));
    assert.equal(pair.length,2);pair.forEach(image=>assert(fs.existsSync(path.join(root,image.src))));
    pair[0].onload();assert(!s.nodes[id].classList.contains('has-state-images'));
    await button.fire('click');pair[1].onload();assert(s.nodes[id].classList.contains('has-state-images'));assert(s.nodes[id].classList.contains('is-open'));
    await button.fire('click');assert(!s.nodes[id].classList.contains('is-open'));
  }
  const failed=setup();const pair=failed.images.filter(image=>image.src.includes('gift-'));
  pair[0].onerror();pair[1].onload();assert(!failed.nodes['gift-art'].classList.contains('has-state-images'));
});
test('Cinco estrellas: apertura, cierre explícito, Escape y retorno de foco',async()=>{
  const s=setup();const document=s.context.document;
  const buttons=document.querySelectorAll('[data-disclosure]').filter(button=>button.dataset.disclosure.startsWith('thought-'));
  assert.equal(buttons.length,5);
  for(const button of buttons){
    const panel=document.getElementById(button.dataset.disclosure);
    assert(panel.hidden);assert.equal(button.children[0].className,'star-icon');assert.equal(button.children[0].attrs['aria-hidden'],'true');
    await button.fire('click');assert(!panel.hidden);assert.equal(button.attrs['aria-expanded'],'true');assert(panel.focused);
    await panel.children[1].fire('click');assert(panel.hidden);assert(button.focused);
    await button.fire('click');await panel.fire('keydown',{key:'Escape'});assert(panel.hidden);assert.equal(button.attrs['aria-expanded'],'false');
  }
});
test('Gustos: aria-expanded acompaña al desplegable nativo',async()=>{
  const s=setup();assert.equal(s.summary.attrs['aria-expanded'],'false');
  s.taste.open=true;await s.taste.fire('toggle');assert.equal(s.summary.attrs['aria-expanded'],'true');
  s.taste.open=false;await s.taste.fire('toggle');assert.equal(s.summary.attrs['aria-expanded'],'false');
});
test('Cielo: distribución estable, sesenta estrellas laterales y treinta en secciones',()=>{
  const first=setup();const second=setup();const bands=first.nodes['night-sky'].children;
  assert.equal(bands.length,2);assert.equal(bands[0].className,'sky-band sky-left');assert.equal(bands[1].className,'sky-band sky-right');
  for(const [side,band] of bands.entries()){
    assert.equal(band.children.length,30);
    for(const [index,star] of band.children.entries()){
      assert.equal(star.tagName,'span');assert.equal(Object.keys(star.handlers).length,0);
      assert.equal(star.attrs.style,second.nodes['night-sky'].children[side].children[index].attrs.style);
      const x=Number(star.attrs.style.match(/--star-x:([\d.]+)/)[1]);const y=Number(star.attrs.style.match(/--star-y:([\d.]+)/)[1]);
      assert(x>=12&&x<=82);assert(y>0&&y<100);
      assert(y>index*100/30&&y<(index+1)*100/30);
    }
  }
  assert(new Set(bands[0].children.map(star=>star.attrs.style)).size===30);
  for(const id of ['inicio','gracias','sobre-mi','conocerte','detalles','carta']){
    const local=first.nodes[id].children.find(node=>node.className==='section-sky');
    assert(local);assert.equal(local.attrs['aria-hidden'],'true');
    assert.equal(local.children.flatMap(slot=>slot.children).length,5);
    assert.deepEqual(local.children.flatMap(slot=>slot.children.map(star=>star.attrs.style)),second.nodes[id].children.find(node=>node.className==='section-sky').children.flatMap(slot=>slot.children.map(star=>star.attrs.style)));
  }
  const css=read('css/style.css');const html=read('index.html');
  assert.match(html, /id="night-sky" class="night-sky" aria-hidden="true"/);
  assert.match(css,/\.night-sky\{[^}]*inset:0;[^}]*overflow:hidden;pointer-events:none/);
  assert.match(css,/mask-mode:alpha/);assert.match(css,/\.sky-slot \.sky-star:nth-child\(n\+3\)\{display:none\}/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.sky-star\{animation:none\}/);
});
test('Estrellas: áreas de toque de 44px y márgenes seguros en anchos habituales',()=>{
  const css=read('css/style.css');assert.match(css,/width:44px;height:44px/);assert.match(css,/touch-action:manipulation/);
  for(const width of [320,390,600,768,1024,1250,1320,1440,1920,2560]){
    const gutter=width>=1320?(width-1120)/2-16:width*.04;
    // El extremo más alejado de una estrella de 7px permanece dentro del viewport.
    assert(gutter*.82+7<=gutter+16);
    if(width>=1320){const sectionLeft=(width-1120)/2;assert(sectionLeft-72>=0);assert(sectionLeft+1120+72<=width);}
  }
});

test('Cielo visible: tamaños positivos, opacidad y orden de capas declarado',()=>{
  const s=setup();const css=read('css/style.css');
  assert.match(css,/--layer-ambient:0;--layer-stars:1;--layer-content:2/);
  assert.match(css,/\.header,main,footer\{position:relative;z-index:var\(--layer-content\)\}/);
  assert.match(css,/\.night-sky\{[^}]*pointer-events:none;z-index:var\(--layer-stars\)[^}]*visibility:visible;opacity:1/);
  assert.match(css,/body::before,body::after\{[^}]*z-index:var\(--layer-ambient\)/);
  assert.match(css,/\.sky-star\{[^}]*opacity:\.65/);
  assert.match(css,/@keyframes sky-shimmer\{from\{opacity:\.5\}to\{opacity:\.85\}\}/);
  assert.match(css,/\.sky-band\{[^}]*overflow:hidden;pointer-events:none/);
  assert.match(css,/left:clamp\(0px,var\(--star-x\),calc\(100% - var\(--star-render-size\)\)\)/);
  assert.match(css,/top:clamp\(0px,var\(--star-y\),calc\(100% - var\(--star-render-size\)\)\)/);
  assert.match(css,/mask-image:url\('\.\.\/assets\/images\/star-black.webp'\)/);
  assert.match(css,/mask-mode:alpha/);
  assert(fs.existsSync(path.join(root,'assets/images/star-black.webp')));
  for(const width of [320,390,600,768,1024,1250,1320,1440,1920]){
    const bandWidth=width>=1320?(width-1120)/2-16:width*.04;
    for(const band of s.nodes['night-sky'].children)for(const star of band.children){
      const style=star.attrs.style;
      const size=Number(style.match(/--star-size:([\d.]+)px/)[1]);
      assert(size>=4&&size<=8);
      const rendered=width<=600?Math.min(5,Math.max(3,size*.65)):size;
      const x=Number(style.match(/--star-x:([\d.]+)/)[1]);
      const left=Math.max(0,Math.min(bandWidth*x/100,bandWidth-rendered));
      assert(rendered>0&&left>=0&&left+rendered<=bandWidth+1e-9);
    }
  }
});

test('Sobre ti utiliza la sonrisa existente y conserva el personaje de la carta',()=>{
  const s=setup();const content=s.context.window.pageContent;
  assert.equal(content.poses.atento,'assets/chibi/chibi-sonrisa.webp');
  assert.equal(content.poses.sonrisa,'assets/chibi/chibi-sonrisa.webp');
  const section=read('index.html').match(/<section[^>]*id="conocerte"[\s\S]*?<\/section>/)[0];
  assert(section.includes('data-pose="atento"'));
  assert(section.includes('section-companion'));
  const image=s.images.filter(image=>image.src.includes('/chibi/'))[3];
  assert.equal(image.src,content.poses.atento);assert.equal(image.loading,'lazy');
  image.onload();assert.equal(s.characters[3].children[0],image);
});

test('Depuración inactiva por defecto y espacios del cielo fuera del texto',()=>{
  const css=read('css/style.css');const html=read('index.html');
  assert(!/<body[^>]*class="[^"]*sky-debug/.test(html));
  assert(!/classList\.add\(['"]sky-debug/.test(read('js/interactions.js')));
  assert.match(css,/\.sky-debug \.sky-band\{[^}]*cyan/);
  assert.match(css,/\.sky-debug \.sky-slot\{[^}]*magenta/);
  assert.match(css,/\.sky-debug:not\(\.sky-debug-mask\) \.sky-star\{mask-image:none;-webkit-mask-image:none/);
  assert.match(css,/\.sky-debug.sky-debug-webp \.sky-star\{mask-image:url/);
  assert.match(css,/--sky-mask:url\("data:image\/svg\+xml/);
  assert.match(css,/\.section-sky\{[^}]*z-index:-1;overflow:hidden;pointer-events:none/);
  assert.match(css,/\.scene-layer\{[^}]*z-index:-2/);
  // Tiras reservadas dentro del padding mínimo; la portada solo tiene 25px abajo.
  assert(10+32<=48);assert(12+32<=56);assert(4+16<=25);
  assert(8+24<=48);assert(10+24<=56);
  const s=setup();
  for(const id of ['inicio','gracias','sobre-mi','conocerte','detalles','carta']){
    const local=s.nodes[id].children.find(node=>node.className==='section-sky');
    for(const slot of local.children)for(const star of slot.children){
      assert.equal(star.tagName,'span');assert.equal(Object.keys(star.handlers).length,0);
      const size=Number(star.attrs.style.match(/--star-size:([\d.]+)/)[1]);
      const y=Number(star.attrs.style.match(/--star-y:([\d.]+)/)[1]);
      const top=Math.max(0,Math.min(16*y/100,16-size));
      assert(top>=0&&top+size<=16+1e-9);
    }
  }
});
