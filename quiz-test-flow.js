// Market bootstrap: resolve one shared geo response before localized content becomes visible.
(() => {
  const COUNTRY_LOCALE = {
    GB: 'en-GB', IE: 'en-GB', AU: 'en-GB', NZ: 'en-GB',
    US: 'en-US', CA: 'en-US', SG: 'en-SG',
    DE: 'de', AT: 'de', CH: 'de', NL: 'nl', BE: 'nl',
    FR: 'fr', IT: 'it', ES: 'es', PT: 'pt', PL: 'pl',
    SE: 'sv', NO: 'no', DK: 'da', FI: 'fi', GR: 'el', CY: 'el',
    HR: 'hr', SI: 'sl', SK: 'sk', CZ: 'cs', HU: 'hu', IL: 'he'
  };

  const LOCALE_ALIAS = {
    en: 'en-GB', 'en-gb': 'en-GB', 'en-us': 'en-US', 'en-sg': 'en-SG',
    de: 'de', nl: 'nl', fr: 'fr', it: 'it', es: 'es', pt: 'pt', pl: 'pl',
    sv: 'sv', no: 'no', nb: 'no', nn: 'no', da: 'da', fi: 'fi', el: 'el',
    hr: 'hr', sl: 'sl', sk: 'sk', cs: 'cs', hu: 'hu', he: 'he', iw: 'he'
  };

  const normaliseLocale = (value) => {
    if (!value) return null;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (LOCALE_ALIAS[raw]) return LOCALE_ALIAS[raw];
    return LOCALE_ALIAS[raw.split('-')[0]] || null;
  };

  const reveal = (() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      document.documentElement.classList.remove('rmc-market-pending');
      const style = document.getElementById('rmc-market-bootstrap-style');
      if (style) style.remove();
    };
  })();

  const style = document.createElement('style');
  style.id = 'rmc-market-bootstrap-style';
  style.textContent = `
    html.rmc-market-pending{background:#050506}
    html.rmc-market-pending body{opacity:0!important}
    body{transition:opacity .12s ease}
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('rmc-market-pending');

  const originalFetch = window.fetch.bind(window);
  const isGeoRequest = (input) => {
    try {
      const raw = typeof input === 'string' ? input : input?.url;
      if (!raw) return false;
      const url = new URL(raw, location.origin);
      return url.origin === location.origin && url.pathname === '/api/geo';
    } catch (_) {
      return false;
    }
  };

  // Start geo immediately and share exactly the same response with app.js and local-profile.js.
  const geoResponsePromise = originalFetch('/api/geo', {
    headers: { accept: 'application/json' },
    cache: 'no-store',
    credentials: 'same-origin'
  });

  window.__rmcGeoResponsePromise = geoResponsePromise;
  window.fetch = (input, init) => {
    if (!isGeoRequest(input)) return originalFetch(input, init);
    return geoResponsePromise.then((response) => response.clone());
  };

  const waitForLocale = (target) => {
    if (!target) {
      window.setTimeout(reveal, 0);
      return;
    }

    const matches = () => normaliseLocale(document.documentElement.lang) === target;
    if (matches()) {
      reveal();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!matches()) return;
      observer.disconnect();
      reveal();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    // Never leave the page hidden if geo or another script unexpectedly stalls.
    window.setTimeout(() => {
      observer.disconnect();
      reveal();
    }, 1600);
  };

  const queryLocale = normaliseLocale(new URLSearchParams(location.search).get('lang'));
  let storedLocale = null;
  try {
    storedLocale = normaliseLocale(localStorage.getItem('heartmatch-language'));
  } catch (_) {}

  if (queryLocale || storedLocale) {
    // Explicit URL/manual language remains intentional and keeps priority.
    waitForLocale(queryLocale || storedLocale);
  } else {
    geoResponsePromise
      .then((response) => response.clone().json())
      .then((data) => waitForLocale(COUNTRY_LOCALE[String(data?.country || '').toUpperCase()] || normaliseLocale(navigator.language) || 'en-GB'))
      .catch(() => waitForLocale(normaliseLocale(navigator.language) || 'en-GB'));
  }

  window.setTimeout(reveal, 1800);
})();

// Load the exit-intent recovery module without changing the established script order in index.html.
(() => {
  if (document.querySelector('script[data-rmc-exit-intent]')) return;
  const script = document.createElement('script');
  script.src = '/exit-intent.js?v=20260808-1';
  script.async = true;
  script.dataset.rmcExitIntent = '1';
  document.head.appendChild(script);
})();

// Replace unreliable IP-city labels with the detected country while keeping the existing distance.
(() => {
  if (document.querySelector('script[data-rmc-country-location]')) return;
  const script = document.createElement('script');
  script.src = '/country-location.js?v=20260810-1';
  script.async = true;
  script.dataset.rmcCountryLocation = '1';
  document.head.appendChild(script);
})();
