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

  const render = () => {
    const cta = document.querySelector('.hero-invite .phone-card .phone-cta');
    if (!(cta instanceof HTMLAnchorElement)) return false;

    const locale = getLocale();
    const label = labels[locale] || labels['en-GB'];

    cta.classList.add('js-affiliate', 'notranslate');
    cta.setAttribute('translate', 'no');
    cta.setAttribute('lang', locale);
    cta.dataset.rmcCtaOwner = 'reply';

    if (!cta.dataset.rmcOriginalHref) {
      cta.dataset.rmcOriginalHref = cta.getAttribute('href') || '/api/go?slot=phone-message';
    }
    cta.setAttribute('href', cta.dataset.rmcOriginalHref);

    const copy = document.createElement('span');
    copy.className = 'phone-cta-copy notranslate';
    copy.setAttribute('translate', 'no');
    copy.setAttribute('lang', locale);
    copy.textContent = label;

    const arrow = document.createElement('span');
    arrow.className = 'phone-cta-arrow notranslate';
    arrow.setAttribute('translate', 'no');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    cta.replaceChildren(copy, arrow);
    return true;
  };

  const renderWhenReady = () => {
    if (render()) return;
    const observer = new MutationObserver(() => {
      if (!render()) return;
      observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 5000);
  };

  const refresh = () => {
    window.setTimeout(render, 0);
    window.setTimeout(render, 250);
    window.setTimeout(render, 1000);
  };

  renderWhenReady();
  document.getElementById('languageSelect')?.addEventListener('change', refresh);
  window.addEventListener('pageshow', refresh);
  window.setTimeout(render, 2500);
})();
