// Un mismo generador para el respaldo HTML y los bloques que se actualizan en el navegador.
'use strict';
((root) => {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const node = (tag, attrs = {}, children = []) => ({ tag, attrs, children });
  const number = index => node('span', { class: 'card-number', 'aria-hidden': 'true' }, [String(index + 1).padStart(2, '0')]);
  function blocks(content) {
    return {
      'about-cards': content.about.map(([title, text], index) => node('article', { class: 'card' }, [number(index), node('h3', {}, [title]), node('p', {}, [text])])),
      'detail-cards': content.details.map(([title, text], index) => node('details', { class: 'card taste-card' }, [node('summary', {}, [number(index), node('span', { class: 'taste-title' }, [title])]), node('p', {}, [text])])),
      'gift-story': content.memories.map(([title, text, icon]) => node('details', { class: 'memory-card' }, [node('summary', {}, [node('span', { class: 'memory-icon ' + icon, 'aria-hidden': 'true' }), node('span', {}, [title])]), node('p', {}, [text])])),
      questions: content.questions.map(([id, title, text, invite], index) => node('article', { class: 'card', 'data-question-id': id }, [number(index), node('h3', {}, [title]), node('p', {}, [text]), node('p', { class: 'conversation-invite' }, [invite])])),
      'letter-content': content.letter.map(text => node('p', {}, [text]))
    };
  }
  function html(item) {
    if (typeof item === 'string') return escape(item);
    const attributes = Object.entries(item.attrs).map(([key, value]) => ` ${key}="${escape(value)}"`).join('');
    return `<${item.tag}${attributes}>${item.children.map(html).join('')}</${item.tag}>`;
  }
  function dom(item, document) {
    if (typeof item === 'string') return document.createTextNode(item);
    const element = document.createElement(item.tag);
    for (const [key, value] of Object.entries(item.attrs)) element.setAttribute(key, value);
    for (const child of item.children) {
      // Los nodos de texto únicos permiten también pruebas con un DOM mínimo.
      if (item.children.length === 1 && typeof child === 'string') element.textContent = child;
      else element.append(dom(child, document));
    }
    return element;
  }
  const renderer = { blocks, html, dom };
  if (typeof module !== 'undefined' && module.exports) module.exports = renderer;
  else root.pageRenderer = renderer;
})(typeof window === 'undefined' ? globalThis : window);
