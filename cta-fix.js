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

  const getLabel = () => {
    const locale = normaliseLocale(
      document.getElementById('languageSelect')?.value ||
      document.documentElement.lang ||
      navigator.language
    );
    return labels[locale] || labels['en-GB'];
  };

  let scheduled = false;
  let phoneObserver = null;

  const isPlainSpan = (node, className, text) => (
    node instanceof HTMLSpanElement &&
    node.classList.contains(className) &&
    node.childNodes.length === 1 &&
    node.firstChild?.nodeType === Node.TEXT_NODE &&
    node.textContent === text
  );

  const ensureSingleLabel = () => {
    const cta = document.querySelector('.hero-invite .phone-card .phone-cta');
    if (!(cta instanceof HTMLAnchorElement)) return false;

    const label = getLabel();
    const first = cta.children[0];
    const second = cta.children[1];
    const clean = (
      cta.children.length === 2 &&
      cta.childNodes.length === 2 &&
      isPlainSpan(first, 'phone-cta-copy', label) &&
      isPlainSpan(second, 'phone-cta-arrow', '→')
    );

    cta.classList.add('js-affiliate');
    cta.dataset.rmcCtaOwner = 'reply';

    if (!cta.dataset.rmcOriginalHref) {
      cta.dataset.rmcOriginalHref = cta.getAttribute('href') || '/api/go?slot=phone-message';
    }
    if (cta.getAttribute('href') !== cta.dataset.rmcOriginalHref) {
      cta.setAttribute('href', cta.dataset.rmcOriginalHref);
    }

    if (!clean) {
      const copy = document.createElement('span');
      copy.className = 'phone-cta-copy';
      copy.textContent = label;

      const arrow = document.createElement('span');
      arrow.className = 'phone-cta-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      cta.replaceChildren(copy, arrow);
    }

    return true;
  };

  const scheduleRepair = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      ensureSingleLabel();
    });
  };

  const observePhone = () => {
    const phone = document.querySelector('.hero-invite .phone-card');
    if (!phone) return false;
    phoneObserver?.disconnect();
    phoneObserver = new MutationObserver(scheduleRepair);
    phoneObserver.observe(phone, {
      childList: true,
      subtree: true,
      characterData: true
    });
    ensureSingleLabel();
    return true;
  };

  const initialise = () => {
    if (!observePhone()) {
      const bodyObserver = new MutationObserver(() => {
        if (!observePhone()) return;
        bodyObserver.disconnect();
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }

    document.getElementById('languageSelect')?.addEventListener('change', scheduleRepair);
    new MutationObserver(scheduleRepair).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    window.setTimeout(scheduleRepair, 0);
    window.setTimeout(scheduleRepair, 500);
    window.setTimeout(scheduleRepair, 1500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
