(() => {
  const labels = {
    'en-GB': 'Reply to Anna',
    'en-US': 'Reply to Anna',
    'en-SG': 'Reply to Anna',
    de: 'Anna antworten',
    nl: 'Anna antwoorden',
    fr: 'Répondre à Anna',
    it: 'Rispondi ad Anna',
    es: 'Responder a Anna',
    pt: 'Responder à Anna',
    pl: 'Odpowiedz Annie',
    sv: 'Svara Anna',
    no: 'Svar Anna',
    da: 'Svar Anna',
    fi: 'Vastaa Annalle',
    el: 'Απάντησε στην Άννα',
    hr: 'Odgovori Anni',
    sl: 'Odgovori Anni',
    sk: 'Odpíš Anne',
    cs: 'Odepiš Anně',
    hu: 'Válaszolj Annának',
    he: 'השב לאנה'
  };

  const STYLE_ID = 'rmc-proxy-safe-cta-style';
  let ctaObserver = null;
  let repairQueued = false;

  const normaliseLocale = (value = '') => {
    if (labels[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return labels[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const injectStyle = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .phone-cta.rmc-generated-label > .phone-cta-copy {
        display: none !important;
      }
      .phone-cta.rmc-generated-label::before {
        content: attr(data-rmc-label);
        display: inline;
      }
      .phone-cta.rmc-generated-label::after {
        content: '→';
        display: inline;
        flex: 0 0 auto;
      }
      [dir="rtl"] .phone-cta.rmc-generated-label::after {
        content: '←';
      }
    `;
    document.head.appendChild(style);
  };

  const startObserving = (cta) => {
    ctaObserver?.disconnect();
    ctaObserver = new MutationObserver(() => {
      if (repairQueued) return;
      repairQueued = true;
      requestAnimationFrame(() => {
        repairQueued = false;
        render();
      });
    });
    ctaObserver.observe(cta, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  const render = () => {
    const cta = document.querySelector('.hero-invite .phone-card .phone-cta');
    if (!(cta instanceof HTMLAnchorElement)) return false;

    ctaObserver?.disconnect();
    injectStyle();

    const locale = getLocale();
    const label = labels[locale] || labels['en-GB'];

    cta.classList.add('js-affiliate', 'notranslate', 'rmc-generated-label');
    cta.setAttribute('translate', 'no');
    cta.setAttribute('lang', locale);
    cta.setAttribute('aria-label', label);
    cta.dataset.rmcLabel = label;
    cta.dataset.rmcCtaOwner = 'reply';

    if (!cta.dataset.rmcOriginalHref) {
      cta.dataset.rmcOriginalHref = cta.getAttribute('href') || '/api/go?slot=phone-message';
    }
    cta.setAttribute('href', cta.dataset.rmcOriginalHref);

    const hiddenCopy = document.createElement('span');
    hiddenCopy.className = 'phone-cta-copy notranslate';
    hiddenCopy.setAttribute('translate', 'no');
    hiddenCopy.setAttribute('aria-hidden', 'true');
    hiddenCopy.textContent = '';

    cta.replaceChildren(hiddenCopy);
    startObserving(cta);
    return true;
  };

  const renderWhenReady = () => {
    if (render()) return;
    const bodyObserver = new MutationObserver(() => {
      if (!render()) return;
      bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => bodyObserver.disconnect(), 5000);
  };

  const refresh = () => {
    window.setTimeout(render, 0);
    window.setTimeout(render, 250);
    window.setTimeout(render, 1000);
  };

  renderWhenReady();
  document.getElementById('languageSelect')?.addEventListener('change', refresh);
  window.addEventListener('pageshow', refresh);
})();
