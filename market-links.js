(() => {
  const MARKET_LOCALE = {
    uk: 'en-GB', gb: 'en-GB', ie: 'en-GB', au: 'en-GB', nz: 'en-GB',
    us: 'en-US', ca: 'en-US', sg: 'en-SG',
    de: 'de', at: 'de', ch: 'de',
    nl: 'nl', be: 'nl',
    fr: 'fr', it: 'it', es: 'es', pt: 'pt', pl: 'pl',
    se: 'sv', no: 'no', dk: 'da', fi: 'fi',
    gr: 'el', cy: 'el', hr: 'hr', si: 'sl', sk: 'sk', cz: 'cs', hu: 'hu', il: 'he'
  };

  const VALID_SOURCES = new Set(['post', 'reel', 'story']);
  const parts = location.pathname.toLowerCase().split('/').filter(Boolean);
  const market = parts[0] || '';
  const locale = MARKET_LOCALE[market];
  if (!locale) return;

  const source = VALID_SOURCES.has(parts[1]) ? parts[1] : 'direct';

  window.__rmcMarketContext = Object.freeze({ market, locale, source });
  document.documentElement.dataset.market = market;
  document.documentElement.dataset.source = source;

  try {
    sessionStorage.setItem('rmc-market', market);
    sessionStorage.setItem('rmc-source', source);
  } catch (_) {}

  // Force the market locale for this visit without permanently changing the user's saved preference.
  const url = new URL(location.href);
  const hadLang = url.searchParams.has('lang');
  if (!hadLang) {
    url.searchParams.set('lang', locale);
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);

    const cleanInjectedLang = () => {
      const cleanUrl = new URL(location.href);
      if (cleanUrl.searchParams.get('lang') !== locale) return;
      cleanUrl.searchParams.delete('lang');
      const query = cleanUrl.searchParams.toString();
      history.replaceState(history.state, '', `${cleanUrl.pathname}${query ? `?${query}` : ''}${cleanUrl.hash}`);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => window.setTimeout(cleanInjectedLang, 0), { once: true });
    } else {
      window.setTimeout(cleanInjectedLang, 0);
    }
  }
})();
