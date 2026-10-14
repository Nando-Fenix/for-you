'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function image(complete, naturalWidth) {
  const classes = new Set();
  return { complete, naturalWidth, hidden: false, handlers: {},
    classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) },
    addEventListener(name, callback) { this.handlers[name] = callback; }
  };
}
test('Fondos: caché, carga diferida y error conservan la alternativa CSS', () => {
  const cached = image(true, 1672);
  const deferred = image(false, 0);
  const failed = image(true, 0);
  vm.runInNewContext(read('js/backgrounds.js'), { document: { querySelectorAll: () => [cached, deferred, failed] } });
  assert(cached.classList.contains('is-loaded'));
  assert(!deferred.hidden && !deferred.classList.contains('is-loaded'));
  deferred.naturalWidth = 1672;
  deferred.handlers.load();
  assert(deferred.classList.contains('is-loaded'));
  assert(failed.hidden);
  deferred.handlers.error();
  assert(deferred.hidden && !deferred.classList.contains('is-loaded'));
});
test('Cinco fondos locales existentes, decorativos, con dimensiones y prioridad adaptada', () => {
  const html = read('index.html');
  const tags = html.match(/<img class="scene-illustration"[^>]+>/g);
  assert.equal(tags.length, 5);
  for (const [index, tag] of tags.entries()) {
    const source = tag.match(/src="([^"]+)"/)[1];
    assert(source.startsWith('assets/backgrounds/'));
    const data = fs.readFileSync(path.join(root, source));
    let width, height;
    if (source.endsWith('.png')) {
      assert.equal(data.subarray(1,4).toString(), 'PNG');
      width = data.readUInt32BE(16);
      height = data.readUInt32BE(20);
    } else {
      assert.equal(data.subarray(0,4).toString(), 'RIFF');
      assert.equal(data.subarray(8,12).toString(), 'WEBP');
      for (let offset = 12; offset + 8 <= data.length;) {
        const chunk = data.subarray(offset, offset + 4).toString();
        const size = data.readUInt32LE(offset + 4);
        const start = offset + 8;
        if (chunk === 'VP8X') {
          width = data.readUIntLE(start + 4, 3) + 1;
          height = data.readUIntLE(start + 7, 3) + 1;
        } else if (chunk === 'VP8 ' && !width) {
          width = data.readUInt16LE(start + 6) & 0x3fff;
          height = data.readUInt16LE(start + 8) & 0x3fff;
        }
        offset += 8 + size + (size % 2);
      }
      assert(width > 0 && height > 0);
    }
    assert(tag.includes('alt=""'));
    assert(tag.includes(`width="${width}"`));
    assert(tag.includes(`height="${height}"`));
    assert(tag.includes(index === 0 ? 'loading="eager"' : 'loading="lazy"'));
    assert(tag.includes('decoding="async"'));
  }
  const section = html.match(/<section[^>]*id="conocerte"[\s\S]*?<\/section>/)[0];
  assert(section.includes('src="assets/backgrounds/bg-sobre-ti.webp"'));
  assert(section.includes('scene-landscape'));
  assert(html.includes('<noscript><style>.scene-illustration'));
});
