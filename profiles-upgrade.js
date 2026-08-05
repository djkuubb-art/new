(() => {
  const SUPPORTED_LOCALES = new Set([
    'en-GB', 'en-US', 'en-SG', 'de', 'nl', 'fr', 'it', 'es', 'pt', 'pl',
    'sv', 'no', 'da', 'fi', 'el', 'hr', 'sl', 'sk', 'cs', 'hu', 'he'
  ]);

  const PACK_BY_LOCALE = {
    'en-US': '/profiles-copy-1.js',
    'en-SG': '/profiles-copy-1.js',
    de: '/profiles-copy-1.js',
    nl: '/profiles-copy-1.js',
    fr: '/profiles-copy-1.js',
    it: '/profiles-copy-2.js',
    es: '/profiles-copy-2.js',
    pt: '/profiles-copy-2.js',
    pl: '/profiles-copy-2.js',
    sv: '/profiles-copy-2.js',
    no: '/profiles-copy-3.js',
    da: '/profiles-copy-3.js',
    fi: '/profiles-copy-3.js',
    el: '/profiles-copy-3.js',
    hr: '/profiles-copy-3.js',
    sl: '/profiles-copy-4.js',
    sk: '/profiles-copy-4.js',
    cs: '/profiles-copy-4.js',
    hu: '/profiles-copy-4.js',
    he: '/profiles-copy-4.js'
  };

  const COUNTRY_LOCALE_MAP = {
    GB: 'en-GB', IE: 'en-GB', AU: 'en-GB', NZ: 'en-GB',
    US: 'en-US', CA: 'en-US', SG: 'en-SG',
    DE: 'de', AT: 'de', CH: 'de', NL: 'nl', BE: 'nl',
    FR: 'fr', IT: 'it', ES: 'es', PT: 'pt', PL: 'pl',
    SE: 'sv', NO: 'no', DK: 'da', FI: 'fi', GR: 'el', CY: 'el',
    HR: 'hr', SI: 'sl', SK: 'sk', CZ: 'cs', HU: 'hu', IL: 'he'
  };

  const FALLBACK_COPY = {
    'en-GB': {
      trust: ['Discreet access', 'Adults only', 'Profiles in your region'],
      profilesKicker: 'Explore',
      profilesTitle: 'See more profiles',
      profilesText: 'Swipe to see more people from your region.',
      cta: 'View profile',
      hint: 'Swipe to see more profiles',
      modalCta: 'Continue to profiles',
      close: 'Close profile',
      bios: [
        'I like honest conversations and men who know what they want.',
        'I’m looking for someone mature, kind and easy to talk to.',
        'I appreciate confidence, humour and genuine interest.'
      ],
      howKicker: 'Simple and clear',
      howTitle: 'How do you continue to the profiles?',
      steps: [
        ['View a profile and message', 'Check the photo, description and voice message.'],
        ['Choose your age range', 'This takes you to the appropriate version of the service.'],
        ['Continue and start a conversation', 'After a short registration, you can browse profiles and send messages.']
      ],
      finalKicker: 'Discover more',
      finalTitle: 'Ready to see more profiles?',
      finalText: 'Choose your age range and continue to the version of the service that suits you.',
      finalCta: 'View profiles',
      finalNote: 'Adults only. You may be redirected to a third-party dating service.'
    }
  };

  const DISTANCE_KEY = 'rmc_local_distance_km_v1';
  const copyStore = Object.assign({}, FALLBACK_COPY, window.RMC_LOWER_COPY || {});
  const scriptPromises = new Map();
  let activeLocale = 'en-GB';
  let refreshVersion = 0;

  const normaliseLocale = (value = '') => {
    const original = String(value).replace('_', '-');
    if (SUPPORTED_LOCALES.has(original)) return original;

    const raw = original.toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';

    const short = raw.split('-')[0];
    return SUPPORTED_LOCALES.has(short) ? short : '';
  };

  const getBrowserLocale = () => {
    const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const candidate of candidates) {
      const locale = normaliseLocale(candidate);
      if (locale) return locale;
    }
    return 'en-GB';
  };

  const detectInitialLocale = async () => {
    const queryLocale = normaliseLocale(new URLSearchParams(location.search).get('lang'));
    if (queryLocale) return queryLocale;

    try {
      const storedLocale = normaliseLocale(localStorage.getItem('heartmatch-language'));
      if (storedLocale) return storedLocale;
    } catch (_) {}

    try {
      const response = await fetch('/api/geo', { headers: { accept: 'application/json' } });
      if (response.ok) {
        const data = await response.json();
        const geoLocale = COUNTRY_LOCALE_MAP[String(data.country || '').toUpperCase()];
        if (geoLocale) return geoLocale;
      }
    } catch (_) {}

    return getBrowserLocale();
  };

  const loadScript = (src) => {
    if (!src) return Promise.resolve();
    if (scriptPromises.has(src)) return scriptPromises.get(src);

    const promise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-rmc-copy="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === '1') {
          resolve();
          return;
        }
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.dataset.rmcCopy = src;
      script.addEventListener('load', () => {
        script.dataset.loaded = '1';
        resolve();
      }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });

    scriptPromises.set(src, promise);
    return promise;
  };

  const ensureLocaleCopy = async (locale) => {
    if (copyStore[locale]) return;

    const src = PACK_BY_LOCALE[locale];
    if (!src) return;

    await loadScript(src);
    Object.assign(copyStore, window.RMC_LOWER_COPY || {});
    document.documentElement.dataset.rmcCopyPack = src;
  };

  const getCopy = () => copyStore[activeLocale] || copyStore['en-GB'];

  const getStableBaseDistance = () => {
    try {
      const saved = Number.parseInt(localStorage.getItem(DISTANCE_KEY) || '', 10);
      if (Number.isInteger(saved) && saved >= 4 && saved <= 12) return saved;
    } catch (_) {}
    return 8;
  };

  const distanceFormatter = {
    'en-GB': (value) => `about ${Math.max(2, Math.round(value * 0.621371))} mi`,
    'en-US': (value) => `about ${Math.max(2, Math.round(value * 0.621371))} mi`,
    'en-SG': (value) => `about ${value} km`,
    de: (value) => `ca. ${value} km`,
    nl: (value) => `ongeveer ${value} km`,
    fr: (value) => `environ ${value} km`,
    it: (value) => `circa ${value} km`,
    es: (value) => `unos ${value} km`,
    pt: (value) => `cerca de ${value} km`,
    pl: (value) => `około ${value} km`,
    sv: (value) => `cirka ${value} km`,
    no: (value) => `omtrent ${value} km`,
    da: (value) => `ca. ${value} km`,
    fi: (value) => `noin ${value} km`,
    el: (value) => `περίπου ${value} χλμ.`,
    hr: (value) => `oko ${value} km`,
    sl: (value) => `približno ${value} km`,
    sk: (value) => `približne ${value} km`,
    cs: (value) => `přibližně ${value} km`,
    hu: (value) => `kb. ${value} km`,
    he: (value) => `כ־${value} ק״מ`
  };

  const getProfileCity = (index) => {
    try {
      const profile = typeof locales !== 'undefined' ? locales[activeLocale]?.profiles?.[index] : null;
      return Array.isArray(profile) && typeof profile[1] === 'string' ? profile[1].trim() : '';
    } catch (_) {
      return '';
    }
  };

  const formatProfileRegion = (index) => {
    const base = getStableBaseDistance();
    const values = [base, Math.max(4, base - 2), Math.min(12, base + 2)];
    const distance = (distanceFormatter[activeLocale] || distanceFormatter['en-GB'])(values[index] || base);
    const city = getProfileCity(index);
    return city ? `${city} · ${distance}` : distance;
  };

  const setText = (node, value) => {
    if (!node) return;
    node.removeAttribute('data-i18n');
    node.textContent = value;
  };

  const renderTrustStrip = () => {
    const section = document.querySelector('.social-proof, .trust-strip');
    if (!section) return;

    const current = getCopy();
    section.className = 'trust-strip shell';
    section.setAttribute('aria-label', current.trust.join(', '));
    section.innerHTML = `
      <div class="trust-item"><span class="trust-icon" aria-hidden="true">🔒</span><strong></strong></div>
      <div class="trust-item"><span class="trust-icon" aria-hidden="true">👤</span><strong></strong></div>
      <div class="trust-item"><span class="trust-icon" aria-hidden="true">📍</span><strong></strong></div>
    `;
    section.querySelectorAll('strong').forEach((node, index) => {
      node.textContent = current.trust[index] || '';
    });
  };

  const enhanceProfileCards = () => {
    const current = getCopy();
    const section = document.querySelector('.premium-profiles');
    if (!section) return;

    setText(section.querySelector('.section-kicker'), current.profilesKicker);
    setText(section.querySelector('.section-heading h2'), current.profilesTitle);
    setText(section.querySelector('.section-heading > p'), current.profilesText);

    section.querySelectorAll('.status-pill').forEach((node) => node.remove());

    section.querySelectorAll('.profile-card-premium').forEach((card, index) => {
      card.classList.remove('js-affiliate');
      card.dataset.profileIndex = String(index);
      card.dataset.slot = `lower-profile-${index + 1}`;
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', current.cta);

      const bio = card.querySelector('[data-profile-bio]');
      if (bio) bio.textContent = current.bios[index] || current.bios[0];

      const distance = card.querySelector('[data-profile-distance]');
      if (distance) distance.textContent = formatProfileRegion(index);

      const cta = card.querySelector('[data-profile-cta]');
      if (cta) cta.textContent = current.cta;
    });

    const hint = section.querySelector('[data-profile-swipe-hint]');
    if (hint) hint.textContent = current.hint;
  };

  const renderJourney = () => {
    const section = document.querySelector('.how-section');
    if (!section) return;

    const current = getCopy();
    section.classList.add('journey-section');
    setText(section.querySelector('.section-kicker'), current.howKicker);
    setText(section.querySelector('.section-heading h2'), current.howTitle);

    const grid = section.querySelector('.steps-grid');
    if (!grid) return;

    grid.className = 'steps-grid journey-grid';
    grid.innerHTML = current.steps.map((step, index) => `
      <article class="journey-step">
        <span class="step-number">${index + 1}</span>
        <div class="journey-step-copy">
          <h3>${step[0]}</h3>
          <p>${step[1]}</p>
        </div>
      </article>
    `).join('');
  };

  const getAvatarMarkup = () => {
    const images = [...document.querySelectorAll('.profile-card-premium .image-wrap > img')].slice(0, 3);
    return images.map((image, index) => `
      <span class="final-avatar final-avatar-${index + 1}">
        <img src="${image.currentSrc || image.src}" alt="" width="80" height="80" loading="lazy" decoding="async" />
      </span>
    `).join('');
  };

  const renderFinal = () => {
    const section = document.querySelector('.final-cta');
    if (!section) return;

    const current = getCopy();
    section.className = 'final-cta final-service-cta shell';
    section.innerHTML = `
      <div class="final-service-visual" aria-hidden="true">
        <div class="final-avatar-stack">${getAvatarMarkup()}</div>
      </div>
      <div class="final-service-copy">
        <span class="section-kicker light"></span>
        <h2></h2>
        <p class="final-service-text"></p>
      </div>
      <div class="final-service-actions">
        <a class="button button-white js-affiliate" data-slot="final" href="/api/go?slot=final">
          <span class="final-service-cta-copy"></span><span aria-hidden="true">→</span>
        </a>
        <p class="final-service-note"></p>
      </div>
    `;

    setText(section.querySelector('.section-kicker'), current.finalKicker);
    setText(section.querySelector('h2'), current.finalTitle);
    setText(section.querySelector('.final-service-text'), current.finalText);
    setText(section.querySelector('.final-service-cta-copy'), current.finalCta);
    setText(section.querySelector('.final-service-note'), current.finalNote);
  };

  const createProfileModal = () => {
    let modal = document.getElementById('profileDetailModal');
    if (modal) return modal;

    modal = document.createElement('dialog');
    modal.id = 'profileDetailModal';
    modal.className = 'profile-detail-modal';
    modal.innerHTML = `
      <article class="profile-detail-card">
        <button class="profile-detail-close" type="button">×</button>
        <div class="profile-detail-photo">
          <img src="" alt="" />
          <div class="profile-detail-photo-gradient"></div>
          <div class="profile-detail-heading">
            <h2></h2>
            <p class="profile-detail-distance"><span aria-hidden="true">📍</span><span></span></p>
          </div>
        </div>
        <div class="profile-detail-body">
          <p class="profile-detail-bio"></p>
          <button class="profile-detail-cta" type="button">
            <span class="profile-detail-cta-copy"></span><span aria-hidden="true">→</span>
          </button>
        </div>
      </article>
    `;
    document.body.appendChild(modal);

    const close = () => {
      if (!modal.open) return;
      modal.classList.add('is-closing');
      window.setTimeout(() => {
        modal.classList.remove('is-closing');
        modal.close();
      }, 140);
    };

    modal.querySelector('.profile-detail-close').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    modal.addEventListener('cancel', (event) => {
      event.preventDefault();
      close();
    });
    modal.querySelector('.profile-detail-cta').addEventListener('click', () => {
      const slot = modal.dataset.slot || 'lower-profile';
      close();
      window.setTimeout(() => {
        const trigger = document.createElement('a');
        trigger.className = 'js-affiliate';
        trigger.dataset.slot = slot;
        trigger.href = `/api/go?slot=${encodeURIComponent(slot)}`;
        trigger.hidden = true;
        document.body.appendChild(trigger);
        trigger.click();
        trigger.remove();
      }, 170);
    });

    return modal;
  };

  const openProfile = (card) => {
    const modal = createProfileModal();
    const current = getCopy();
    const image = card.querySelector('.image-wrap > img');
    const heading = card.querySelector('h3');
    const distance = card.querySelector('[data-profile-distance]');
    const bio = card.querySelector('[data-profile-bio]');

    const modalImage = modal.querySelector('.profile-detail-photo img');
    modalImage.src = image?.currentSrc || image?.src || '';
    modalImage.alt = heading?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-heading h2').textContent = heading?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-distance span:last-child').textContent = distance?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-bio').textContent = bio?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-cta-copy').textContent = current.modalCta;
    modal.querySelector('.profile-detail-close').setAttribute('aria-label', current.close);
    modal.dataset.slot = card.dataset.slot || 'lower-profile';

    if (typeof window.rmcTrack === 'function') {
      window.rmcTrack('profile_open', { slot: modal.dataset.slot });
    }

    if (!modal.open) modal.showModal();
    window.setTimeout(() => modal.querySelector('.profile-detail-close')?.focus(), 30);
  };

  const initialiseCards = () => {
    document.querySelectorAll('.profile-card-premium').forEach((card) => {
      if (card.dataset.lowerProfileReady === '1') return;
      card.dataset.lowerProfileReady = '1';
      card.addEventListener('click', () => openProfile(card));
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openProfile(card);
      });
    });
  };

  const initialiseSwipe = () => {
    const track = document.getElementById('profileSwipeTrack');
    if (!track || track.dataset.swipeReady === '1') return;

    track.dataset.swipeReady = '1';
    const cards = [...track.querySelectorAll('.profile-card-premium')];
    const dots = [...document.querySelectorAll('.profile-swipe-dot')];

    const setActiveDot = () => {
      if (!cards.length || !dots.length) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let active = 0;
      let smallest = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const difference = Math.abs(cardCenter - trackCenter);
        if (difference < smallest) {
          smallest = difference;
          active = index;
        }
      });

      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === active));
    };

    track.addEventListener('scroll', () => requestAnimationFrame(setActiveDot), { passive: true });
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
    setActiveDot();
  };

  const renderAll = () => {
    renderTrustStrip();
    enhanceProfileCards();
    renderJourney();
    renderFinal();
    initialiseCards();
    initialiseSwipe();
  };

  const refreshForLocale = async (requestedLocale) => {
    const locale = normaliseLocale(requestedLocale) || 'en-GB';
    const version = ++refreshVersion;

    try {
      await ensureLocaleCopy(locale);
    } catch (_) {
      if (!copyStore[locale]) return;
    }

    if (version !== refreshVersion) return;
    activeLocale = copyStore[locale] ? locale : 'en-GB';
    renderAll();
  };

  const initialise = async () => {
    const detectedLocale = await detectInitialLocale();
    await refreshForLocale(detectedLocale);

    const languageSelect = document.getElementById('languageSelect');
    languageSelect?.addEventListener('change', () => {
      refreshForLocale(languageSelect.value);
    });

    new MutationObserver(() => {
      const locale = normaliseLocale(document.documentElement.lang);
      if (locale && locale !== activeLocale) refreshForLocale(locale);
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
