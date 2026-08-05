(() => {
  const COPY_SCRIPTS = [
    '/profiles-copy-1.js',
    '/profiles-copy-2.js',
    '/profiles-copy-3.js',
    '/profiles-copy-4.js'
  ];

  const loadScript = (src) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-rmc-copy="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === '1') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.rmcCopy = src;
    script.addEventListener('load', () => {
      script.dataset.loaded = '1';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  const boot = async () => {
    try {
      for (const src of COPY_SCRIPTS) await loadScript(src);
    } catch (_) {}

    const copy = Object.assign({"en-GB":{"trust":["Discreet access","Adults only","Profiles in your region"],"profilesKicker":"Explore","profilesTitle":"See more profiles","profilesText":"Swipe to see more people from your region.","cta":"View profile","hint":"Swipe to see more profiles","modalCta":"Continue to profiles","close":"Close profile","bios":["I like honest conversations and men who know what they want.","I’m looking for someone mature, kind and easy to talk to.","I appreciate confidence, humour and genuine interest."],"howKicker":"Simple and clear","howTitle":"How do you continue to the profiles?","steps":[["View a profile and message","Check the photo, description and voice message."],["Choose your age range","This takes you to the appropriate version of the service."],["Continue and start a conversation","After a short registration, you can browse profiles and send messages."]],"finalKicker":"Discover more","finalTitle":"Ready to see more profiles?","finalText":"Choose your age range and continue to the version of the service that suits you.","finalCta":"View profiles","finalNote":"Adults only. You may be redirected to a third-party dating service."}}, window.RMC_LOWER_COPY || {});
    const DISTANCE_KEY = 'rmc_local_distance_km_v1';

    const normaliseLocale = (value = '') => {
      if (copy[value]) return value;
      const raw = String(value).replace('_', '-').toLowerCase();
      if (raw.startsWith('en-us')) return 'en-US';
      if (raw.startsWith('en-sg')) return 'en-SG';
      if (raw.startsWith('en')) return 'en-GB';
      const short = raw.split('-')[0];
      return copy[short] ? short : 'en-GB';
    };

    const getLocale = () => normaliseLocale(
      document.getElementById('languageSelect')?.value ||
      document.documentElement.lang ||
      navigator.language
    );

    const getCopy = () => copy[getLocale()] || copy['en-GB'];

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
        const locale = getLocale();
        const profile = typeof locales !== 'undefined' ? locales[locale]?.profiles?.[index] : null;
        return Array.isArray(profile) && typeof profile[1] === 'string' ? profile[1].trim() : '';
      } catch (_) {
        return '';
      }
    };

    const formatProfileRegion = (index) => {
      const base = getStableBaseDistance();
      const values = [base, Math.max(4, base - 2), Math.min(12, base + 2)];
      const locale = getLocale();
      const distance = (distanceFormatter[locale] || distanceFormatter['en-GB'])(values[index] || base);
      const city = getProfileCity(index);
      return city ? `${city} · ${distance}` : distance;
    };

    const text = (node, value) => {
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

      const kicker = section.querySelector('.section-kicker');
      const title = section.querySelector('.section-heading h2');
      const description = section.querySelector('.section-heading > p');
      text(kicker, current.profilesKicker);
      text(title, current.profilesTitle);
      text(description, current.profilesText);

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

      const kicker = section.querySelector('.section-kicker');
      const title = section.querySelector('.section-heading h2');
      text(kicker, current.howKicker);
      text(title, current.howTitle);

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
      text(section.querySelector('.section-kicker'), current.finalKicker);
      text(section.querySelector('h2'), current.finalTitle);
      text(section.querySelector('.final-service-text'), current.finalText);
      text(section.querySelector('.final-service-cta-copy'), current.finalCta);
      text(section.querySelector('.final-service-note'), current.finalNote);
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
        dot.addEventListener('click', () => cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
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

    const refresh = () => {
      window.setTimeout(renderAll, 0);
      window.setTimeout(renderAll, 180);
      window.setTimeout(renderAll, 600);
    };

    const initialise = () => {
      renderAll();
      document.getElementById('languageSelect')?.addEventListener('change', refresh);
      new MutationObserver(refresh).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang', 'dir']
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialise, { once: true });
    } else {
      initialise();
    }
  };

  boot();
})();
