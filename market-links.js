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
  const AU_TEST_PROFILES = new Set(['natalie', 'melissa', 'rachel', 'claire']);
  const parts = location.pathname.toLowerCase().split('/').filter(Boolean);
  const market = parts[0] || '';
  const locale = MARKET_LOCALE[market];
  if (!locale) return;

  const source = VALID_SOURCES.has(parts[1]) ? parts[1] : 'direct';
  const profileKey = new URLSearchParams(location.search).get('p')?.toLowerCase() || '';

  window.__rmcMarketContext = Object.freeze({ market, locale, source });
  document.documentElement.dataset.market = market;
  document.documentElement.dataset.source = source;

  try {
    sessionStorage.setItem('rmc-market', market);
    sessionStorage.setItem('rmc-source', source);
  } catch (_) {}

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

  if (market === 'au' && AU_TEST_PROFILES.has(profileKey)) {
    const loadProfileTest = () => {
      if (document.querySelector('script[data-rmc-au-profile-test]')) return;
      const script = document.createElement('script');
      script.src = '/au-profile-test.js?v=20260825-3';
      script.dataset.rmcAuProfileTest = '1';
      document.head.appendChild(script);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadProfileTest, { once: true });
    } else {
      loadProfileTest();
    }
  }
})();

(() => {
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

  if (document.querySelector('script[data-vercel-analytics]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  script.dataset.vercelAnalytics = 'true';
  document.head.appendChild(script);
})();

(() => {
  const stripMainProfileAge = () => {
    const heading = document.querySelector('.hero-invite .featured-profile .profile-overlay h2');
    if (!heading) return;
    const current = (heading.textContent || '').trim();
    const next = current.replace(/\s*,\s*\d+\s*$/, '').trim();
    if (next && current !== next) heading.textContent = next;
  };

  const initialise = () => {
    stripMainProfileAge();
    const heading = document.querySelector('.hero-invite .featured-profile .profile-overlay h2');
    if (heading) {
      new MutationObserver(stripMainProfileAge).observe(heading, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(stripMainProfileAge, 0);
      window.setTimeout(stripMainProfileAge, 250);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();

(() => {
  const ASSET_VERSION = '20260902-1';
  const pathname = location.pathname.toLowerCase();
  const testProfile = new URLSearchParams(location.search).get('p')?.toLowerCase() || '';
  const isAuProfileTest = pathname.startsWith('/au/') && ['natalie', 'melissa', 'rachel', 'claire'].includes(testProfile);
  const isJulieProfile = pathname === '/julie' || pathname === '/julie/';

  const ANNA_IMAGE = `/anna.jpg?v=${ASSET_VERSION}`;
  const LOWER_PROFILE_IMAGES = [
    `/2.jpg?v=${ASSET_VERSION}`,
    `/4.jpg?v=${ASSET_VERSION}`,
    `/6.jpg?v=${ASSET_VERSION}`,
    `/8.jpg?v=${ASSET_VERSION}`,
    `/10.jpg?v=${ASSET_VERSION}`,
    `/12.jpg?v=${ASSET_VERSION}`,
    `/74d661d6-ac4a-4599-880c-8e5f8709ad9f.png?v=${ASSET_VERSION}`,
    `/a7f64ab2-f75d-4b27-b3dd-ec0bfd74a994.png?v=${ASSET_VERSION}`,
    `/e8441314-7f5b-4f63-a5d3-aedbe0e20437.png?v=${ASSET_VERSION}`
  ];

  const setLocalImage = (image, src, alt) => {
    if (!(image instanceof HTMLImageElement) || !src) return;
    if (image.getAttribute('src') !== src) image.setAttribute('src', src);
    if (image.hasAttribute('srcset')) image.removeAttribute('srcset');
    if (image.hasAttribute('sizes')) image.removeAttribute('sizes');
    if (alt && image.alt !== alt) image.alt = alt;
  };

  const applyLocalPhotos = () => {
    if (!isAuProfileTest && !isJulieProfile) {
      setLocalImage(document.querySelector('.invite-avatar img'), ANNA_IMAGE, 'Anna');
      setLocalImage(document.querySelector('.hero-invite .featured-profile > img'), ANNA_IMAGE, 'Anna profile');
      setLocalImage(document.querySelector('.hero-invite .avatar-small img'), ANNA_IMAGE);
      setLocalImage(document.querySelector('.anna-notification-avatar img'), ANNA_IMAGE, 'Anna');
      setLocalImage(document.querySelector('.profile-preview-photo'), ANNA_IMAGE);
    }

    document.querySelectorAll('.profile-card-premium .image-wrap > img').forEach((image, index) => {
      const src = LOWER_PROFILE_IMAGES[index];
      if (src) setLocalImage(image, src);
    });
  };

  let queued = false;
  const queueApply = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      applyLocalPhotos();
    });
  };

  const initialise = () => {
    applyLocalPhotos();

    new MutationObserver(queueApply).observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'sizes']
    });

    window.addEventListener('load', applyLocalPhotos, { once: true });
    [100, 300, 800, 1600, 3200, 8500].forEach((delay) => {
      window.setTimeout(applyLocalPhotos, delay);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();