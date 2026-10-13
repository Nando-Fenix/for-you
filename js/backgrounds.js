'use strict';
// Independiente de los formularios: solo habilita imágenes ambientales cargadas.
(() => {
  document.querySelectorAll('.scene-illustration').forEach(image => {
    const loaded = () => {
      if (image.naturalWidth > 0) image.classList.add('is-loaded');
    };
    const failed = () => {
      image.hidden = true; // Deja visibles los escenarios CSS inferiores.
      image.classList.remove('is-loaded');
    };
    image.addEventListener('load', loaded);
    image.addEventListener('error', failed);
    if (image.complete) {
      if (image.naturalWidth > 0) loaded();
      else failed();
    }
  });
})();
