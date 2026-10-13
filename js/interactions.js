'use strict';
(() => {
  function answeredEntries(questions, readAnswer) {
    return questions.flatMap(([id, , question]) => {
      const answer = String(readAnswer(id) ?? '').trim();
      return answer ? [{ question, answer }] : [];
    });
  }
  function buildMessage(entries, intro) {
    return entries.length ? `${intro}\n\n${entries.map(({ question, answer }) => `${question}\n${answer}`).join('\n\n')}` : '';
  }
  function whatsappUrl(number, message) {
    const digits = String(number ?? '').trim();
    return /^[1-9]\d{6,14}$/.test(digits) && message.trim()
      ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
  }
  function init(content) {
    if (!content?.interactions) return;
    const text = content.interactions;
    // Cielo global determinista. Sus bandas quedan fuera del contenido legible.
    const sky = document.getElementById('night-sky');
    if (sky) {
      const bands = ['left', 'right'].map(side => {
        const band = document.createElement('div');
        band.className = `sky-band sky-${side}`;
        return band;
      });
      let seed = 2417;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const createStar = (row, rows) => {
        const star = document.createElement('span');
        star.className = 'sky-star';
        // Una celda vertical por estrella evita grandes vacíos en la parte superior.
        star.setAttribute('style', `--star-x:${(12 + random() * 70).toFixed(2)}%;--star-y:${((row + .15 + random() * .7) * 100 / rows).toFixed(2)}%;--star-size:${(4 + random() * 4).toFixed(2)}px;--star-duration:${(9 + random() * 12).toFixed(2)}s;--star-delay:-${(random() * 20).toFixed(2)}s`);
        return star;
      };
      for (let index = 0; index < 60; index++) {
        bands[index % 2].append(createStar(Math.floor(index / 2), 30));
      }
      sky.replaceChildren(...bands);
      // Las otras treinta se anclan al padding de las seis secciones, fuera
      // de los textos. Su posición responde a la altura real de cada sección.
      ['inicio', 'gracias', 'sobre-mi', 'conocerte', 'detalles', 'carta'].forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        const localSky = document.createElement('div');
        localSky.className = 'section-sky';
        localSky.setAttribute('aria-hidden', 'true');
        const slots = ['top', 'bottom'].map(edge => {
          const slot = document.createElement('div');
          slot.className = `sky-slot sky-${edge}`;
          return slot;
        });
        for (let index = 0; index < 5; index++) slots[index % 2].append(createStar(0, 1));
        localSky.append(...slots);
        section.append(localSky);
      });
    }
    // El botón ocupa el margen amplio; los mensajes siguen en el flujo normal.
    const starSections = ['inicio', 'gracias', 'sobre-mi', 'detalles', 'carta'];
    starSections.forEach((id, index) => {
      const section = document.getElementById(id);
      const thought = content.starThoughts?.[index];
      if (!section || !thought) return;
      const row = document.createElement('div');
      row.className = 'thought-star';
      row.setAttribute('data-sky-side', index % 2 ? 'right' : 'left');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'star-button';
      const icon = document.createElement('span');
      icon.className = 'star-icon';
      icon.setAttribute('aria-hidden', 'true');
      button.append(icon);
      button.dataset.disclosure = `thought-${index}`;
      button.dataset.openLabel = 'starOpen';
      button.dataset.closeLabel = 'starClose';
      button.setAttribute('aria-label', text.starOpen);
      button.setAttribute('aria-controls', `thought-${index}`);
      const panel = document.createElement('div');
      panel.id = `thought-${index}`;
      panel.className = 'thought-message disclosure-panel';
      panel.tabIndex = -1;
      const message = document.createElement('p');
      message.textContent = thought;
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'thought-close';
      close.textContent = text.starClose;
      close.addEventListener('click', () => { button.click(); button.focus(); });
      panel.addEventListener('keydown', event => {
        if (event.key === 'Escape') { button.click(); button.focus(); }
      });
      panel.append(message, close);
      row.append(button, panel);
      section.append(row);
    });
    const preferConversation = document.getElementById('prefer-conversation');
    if (preferConversation) {
      preferConversation.addEventListener('click', () => {
        document.getElementById('conversation-status').textContent = text.conversationStatus;
      });
      preferConversation.hidden = false;
    }
    document.querySelectorAll('[data-disclosure]').forEach(button => {
      const panel = document.getElementById(button.dataset.disclosure);
      const art = document.getElementById(button.dataset.art);
      if (!panel) return;
      let opened = false;
      const sources = content.artStates?.[button.dataset.art];
      if (art && sources?.closed && sources?.open) {
        let loaded = 0;
        let failed = false;
        const images = ['closed', 'open'].map(state => {
          const image = new Image();
          image.alt = '';
          image.className = `state-image state-${state}`;
          image.decoding = 'async';
          image.fetchPriority = 'low';
          image.onload = () => {
            loaded++;
            if (loaded === 2 && !failed) {
              art.append(...images);
              art.classList.add('has-state-images');
            }
          };
          image.onerror = () => { failed = true; };
          return image;
        });
        // Ambas se cargan antes de sustituir el dibujo CSS; nunca hay un estado vacío.
        images[0].src = sources.closed;
        images[1].src = sources.open;
      }
      function render() {
        panel.hidden = !opened;
        button.setAttribute('aria-expanded', String(opened));
        const label = text[opened ? button.dataset.closeLabel : button.dataset.openLabel];
        if (button.classList.contains('star-button')) button.setAttribute('aria-label', label);
        else button.textContent = label;
        panel.classList.toggle('is-open', opened);
        art?.classList.toggle('is-open', opened);
      }
      button.addEventListener('click', () => {
        opened = !opened;
        render();
        if (opened) panel.focus({ preventScroll: true });
      });
      render();
      button.hidden = false;
    });
    // details conserva su comportamiento y accesibilidad nativos con y sin JS.
    document.querySelectorAll('.taste-card').forEach(card => {
      const summary = card.querySelector('summary');
      const update = () => summary?.setAttribute('aria-expanded', String(card.open));
      card.addEventListener('toggle', update);
      update();
    });

    const dialog = document.getElementById('message-preview');
    // Sin soporte para diálogo nativo, permanecen las preguntas de respaldo.
    if (dialog && typeof dialog.showModal === 'function') {
      const fields = new Map();
      const questionNodes = content.questions.map(([id, title, question, invitation]) => {
        const details = document.createElement('details');
        details.className = 'question-card';
        const summary = document.createElement('summary');
        const heading = document.createElement('span');
        heading.className = 'question-title';
        heading.textContent = title;
        const prompt = document.createElement('span');
        prompt.className = 'question-prompt';
        prompt.textContent = question;
        const invite = document.createElement('span');
        invite.className = 'conversation-invite';
        invite.textContent = invitation;
        summary.append(heading, prompt, invite);
        const label = document.createElement('label');
        label.htmlFor = `answer-${id}`;
        label.textContent = `${text.answer}: ${title}`;
        const field = document.createElement('textarea');
        field.id = label.htmlFor;
        field.rows = 3;
        field.placeholder = text.answerPlaceholder;
        field.autocomplete = 'off';
        field.maxLength = 4000;
        fields.set(id, field);
        details.append(summary, label, field);
        return details;
      });
      document.getElementById('questions').replaceChildren(...questionNodes);
      const share = document.getElementById('share-answers');
      const answerStatus = document.getElementById('answer-status');
      const preview = document.getElementById('preview-text');
      const status = document.getElementById('preview-status');
      const confirmation = document.getElementById('confirm-whatsapp');
      const openWhatsapp = document.getElementById('open-whatsapp');
      const hasNumber = Boolean(whatsappUrl(content.whatsappNumber, 'test'));
      document.getElementById('number-status').textContent = hasNumber ? '' : text.noNumber;
      document.getElementById('whatsapp-confirmation').hidden = !hasNumber;
      openWhatsapp.hidden = !hasNumber;
      function resetConfirmation() {
        confirmation.checked = false;
        openWhatsapp.disabled = true;
        status.textContent = '';
      }
      share.addEventListener('click', () => {
        const entries = answeredEntries(content.questions, id => fields.get(id).value);
        const message = buildMessage(entries, text.messageIntro);
        if (!message) { answerStatus.textContent = text.empty; return; }
        answerStatus.textContent = '';
        preview.value = message;
        resetConfirmation();
        dialog.showModal();
        preview.focus();
      });
      preview.addEventListener('input', resetConfirmation);
      confirmation.addEventListener('change', () => {
        openWhatsapp.disabled = !confirmation.checked || !preview.value.trim();
      });
      openWhatsapp.addEventListener('click', () => {
        const url = whatsappUrl(content.whatsappNumber, preview.value);
        if (!confirmation.checked || !url) { status.textContent = text.confirmRequired; return; }
        try {
          window.open(url, '_blank', 'noopener,noreferrer');
          resetConfirmation();
          status.textContent = text.opened;
        } catch { status.textContent = text.blocked; }
      });
      document.getElementById('copy-answers').addEventListener('click', async () => {
        if (!preview.value.trim()) { status.textContent = text.empty; return; }
        try {
          if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
          await navigator.clipboard.writeText(preview.value);
          status.textContent = text.copied;
        } catch {
          preview.focus();
          preview.select();
          status.textContent = text.copyFallback;
        }
      });
      document.getElementById('cancel-preview').addEventListener('click', () => dialog.close());
      dialog.addEventListener('close', () => {
        preview.value = '';
        resetConfirmation();
        share.focus({ preventScroll: true });
      });
      document.getElementById('answer-actions').hidden = false;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reducedMotion.matches && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('arrived');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.character').forEach(character => observer.observe(character));
    }
    document.querySelectorAll('.character').forEach(character => {
      character.addEventListener('pointerdown', () => {
        if (reducedMotion.matches) return;
        character.classList.remove('reacting');
        // Una reacción finita, sin movimiento permanente ni cambio de expresión.
        void character.offsetWidth;
        character.classList.add('reacting');
      });
      character.addEventListener('animationend', () => character.classList.remove('reacting'));
    });
  }
  window.pageInteractions = { answeredEntries, buildMessage, whatsappUrl, init };
})();
