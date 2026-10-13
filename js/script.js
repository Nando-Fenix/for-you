'use strict';
(() => {
  const content = window.pageContent;
  const get = path => path.split('.').reduce((data, key) => data?.[key], content);
  if (content) {
    document.querySelectorAll('[data-content]').forEach(element => {
      const value = get(element.dataset.content);
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-content-attr]').forEach(element => {
      const [attribute, path] = element.dataset.contentAttr.split(':');
      const value = get(path);
      if (typeof value === 'string') element.setAttribute(attribute, value);
    });
    if (window.pageRenderer) {
      for (const [id, nodes] of Object.entries(window.pageRenderer.blocks(content))) {
        document.getElementById(id)?.replaceChildren(...nodes.map(node => window.pageRenderer.dom(node, document)));
      }
    }
    // No se solicitan imágenes hasta activar explícitamente la configuración.
    if (content.illustrationsEnabled === true) {
      document.querySelectorAll('[data-pose]').forEach(container => {
        const source = content.poses?.[container.dataset.pose];
        if (!source) return;
        const image = new Image();
        image.alt = content.interactions?.imageAlts?.[container.dataset.pose] || content.labels.imageAlt;
        image.loading = container.dataset.pose === 'inicio' ? 'eager' : 'lazy';
        image.fetchPriority = container.dataset.pose === 'inicio' ? 'high' : 'low';
        image.decoding = 'async';
        image.className = 'character-loading';
        image.onload = () => { image.className = ''; container.replaceChildren(image); };
        image.onerror = () => { image.onload = null; image.remove(); }; // Conserva el marcador HTML.
        // Las imágenes lazy necesitan estar en el DOM para detectar su proximidad.
        container.append(image);
        image.src = source;
      });
    }
  }
  window.pageInteractions?.init(content);
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const header = document.querySelector('.header');
  if (!toggle || !navigation || !header) return;
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const opened = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opened));
    navigation.classList.toggle('is-open', opened);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    closeMenu();
    // El foco no queda en un enlace oculto tras cerrar el menú móvil.
    const destination = document.getElementById(link.hash.slice(1));
    destination?.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu(); toggle.focus();
    }
  });
  // Solo oculta los enlaces después de instalar los controles del menú.
  toggle.hidden = false;
  header.classList.add('menu-ready');
})();
