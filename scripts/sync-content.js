// Genera el respaldo desde content.js. No requiere paquetes ni servidor.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const renderer = require('../js/render-content.js');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/content.js'), 'utf8'), context);
const content = context.window.pageContent;
const get = key => key.split('.').reduce((value, part) => value?.[part], content);
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Los elementos data-content contienen texto plano, nunca otros elementos.
html = html.replace(/<([a-z][a-z0-9]*)\b([^>]*\bdata-content="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/gi, (match, tag, attributes, key) => {
  const value = get(key);
  if (typeof value !== 'string') throw new Error('Contenido inexistente: ' + key);
  return `<${tag}${attributes}>${escape(value)}</${tag}>`;
});
html = html.replace(/<[a-z][a-z0-9]*\b[^>]*\bdata-content-attr="([a-z-]+):([^"]+)"[^>]*>/gi, (match, attribute, key) => {
  const value = get(key);
  if (typeof value !== 'string') throw new Error('Atributo inexistente: ' + key);
  const attributePattern = new RegExp(`\\s${attribute}="[^"]*"`);
  return match.replace(attributePattern, ` ${attribute}="${escape(value)}"`);
});
for (const [id, nodes] of Object.entries(renderer.blocks(content))) {
  const markup = nodes.map(renderer.html).join('\n');
  const start = `<!-- content:${id} -->`;
  const end = `<!-- /content:${id} -->`;
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from < 0 || to < from) throw new Error('Marcadores inexistentes: ' + id);
  html = html.slice(0, from + start.length) + '\n' + markup + '\n' + html.slice(to);
}
if (process.argv.includes('--check')) {
  if (html !== fs.readFileSync(path.join(root, 'index.html'), 'utf8')) {
    console.error('Respaldo desactualizado. Ejecuta node scripts/sync-content.js');
    process.exitCode = 1;
  } else console.log('Respaldo HTML sincronizado.');
} else {
  fs.writeFileSync(path.join(root, 'index.html'), html);
  console.log('Respaldo HTML actualizado desde js/content.js.');
}
