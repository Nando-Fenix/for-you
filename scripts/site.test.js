'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/style.css'), 'utf8');

test('HTML: anidación, IDs únicos, destinos, controles y recursos locales relativos', () => {
  const stack = [];
  const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  for (const match of html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<(\/)?([a-z][a-z0-9]*)\b[^>]*>/gi)) {
    const [, closing, tag] = match;
    if (voidTags.has(tag)) continue;
    if (closing) assert.equal(stack.pop(), tag, 'Cierre de ' + tag);
    else stack.push(tag);
  }
  assert.equal(stack.length, 0);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/\s(?:aria-controls|aria-labelledby|aria-describedby)="([^"]+)"/g)) {
    for (const id of match[1].split(' ')) assert(ids.includes(id), 'Referencia ARIA: ' + id);
  }
  for (const match of html.matchAll(/\s(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (target.startsWith('#')) assert(ids.includes(target.slice(1)), 'Destino: ' + target);
    else if (target.startsWith('https://youtu.be/')) {
      assert.equal(target,'https://youtu.be/Xm_M3B5B7Lo?si=BGoWgEivllY5tBN-');
    } else if (target.startsWith('https://www.youtube-nocookie.com/embed/')) {
      assert.equal(target.replace(/&amp;/g,'&'),'https://www.youtube-nocookie.com/embed/Xm_M3B5B7Lo?autoplay=0&playsinline=1&rel=0');
    } else {
      assert(!/^(?:\/|[a-z]+:)/i.test(target), 'Debe ser una ruta relativa: ' + target);
      assert(fs.existsSync(path.join(root, target)), 'Recurso: ' + target);
    }
  }
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (!match[1].startsWith('data:')) assert(fs.existsSync(path.resolve(root, 'css', match[1])));
  }
  const scripts = [...html.matchAll(/<script src="([^"]+)" defer><\/script>/g)].map(match => match[1]);
  assert(scripts.indexOf('js/render-content.js') < scripts.indexOf('js/script.js'));
  assert(scripts.indexOf('js/interactions.js') < scripts.indexOf('js/script.js'));
});

test('Respaldo nativo, continuidad y reglas de legibilidad sin nuevas dependencias', () => {
  assert.equal((html.match(/<section\b/g) || []).length, 5);
  assert.equal((html.match(/<details class="memory-card"/g) || []).length, 3);
  assert(!html.includes('taste-card'));
  assert.equal((html.match(/data-question-id=/g) || []).length, 7);
  assert(html.includes('Elige una conversación'));
  assert(html.includes('Prefiero contártelo conversando'));
  assert(html.includes('aria-live="polite"'));
  assert.match(css, /summary:focus-visible/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /min-width:0/);
  assert.match(css, /overflow-wrap:anywhere/);
  assert.match(css, /mask-image:linear-gradient/);
  assert.match(css, /\.lead,\.body-copy,#letter-content p,\.card p\{font-size:16px\}/);
  assert(!/font-size:\s*[0-9](?:px)\b/.test(css));
  assert(!/<audio\b|autoplay=1/.test(html));
  assert.equal((html.match(/<iframe\b/g)||[]).length,1);
});

test('Contraste de texto y controles sobre las superficies definidas (no renderizado)', () => {
  const luminance = hex => {
    const rgb = hex.match(/\w\w/g).map(channel => parseInt(channel, 16) / 255);
    const linear = rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  for (const [foreground, background] of [
    ['aaa4ac','303039'], ['c4bac5','303039'], ['f0c9d3','303039'],
    ['101014','d59ead'], ['373039','eee5e8'], ['7a5260','eee5e8'], ['825769','eee5e8']
  ]) {
    const values = [luminance(foreground), luminance(background)].sort((a,b) => a-b);
    const ratio = (values[1] + 0.05) / (values[0] + 0.05);
    assert(ratio >= 4.5, foreground + ' sobre ' + background + ': ' + ratio);
  }
});
