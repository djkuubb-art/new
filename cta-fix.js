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

(() => {
  const ages = [47, 42, 49, 45, 44, 48, 46, 51, 43, 55];
  const imagePaths = ages.map((_, index) => `/images/profiles/profile-${String(index + 1).padStart(2, '0')}.svg`);

  const namesByLocale = {
    'en-GB': ['Anna', 'Claire', 'Emma', 'Laura', 'Sophie', 'Rachel', 'Julia', 'Hannah', 'Louise', 'Rebecca'],
    'en-US': ['Anna', 'Rachel', 'Megan', 'Laura', 'Jennifer', 'Amanda', 'Nicole', 'Michelle', 'Melissa', 'Rebecca'],
    'en-SG': ['Anna', 'Grace', 'Elaine', 'Joanne', 'Cheryl', 'Patricia', 'Irene', 'Linda', 'Karen', 'Susan'],
    de: ['Anna', 'Claudia', 'Katja', 'Andrea', 'Martina', 'Nicole', 'Petra', 'Sandra', 'Heike', 'Birgit'],
    nl: ['Anna', 'Monique', 'Linda', 'Marieke', 'Karin', 'Esther', 'Petra', 'Anita', 'Ilse', 'Bianca'],
    fr: ['Anna', 'Sophie', 'Élodie', 'Isabelle', 'Valérie', 'Sandrine', 'Céline', 'Caroline', 'Virginie', 'Laurence'],
    it: ['Anna', 'Laura', 'Alessandra', 'Monica', 'Silvia', 'Paola', 'Barbara', 'Elena', 'Daniela', 'Cristina'],
    es: ['Anna', 'Laura', 'Carmen', 'Ana', 'Isabel', 'Patricia', 'Mónica', 'Elena', 'Cristina', 'Silvia'],
    pt: ['Anna', 'Ana', 'Carla', 'Rita', 'Teresa', 'Paula', 'Sandra', 'Helena', 'Cristina', 'Susana'],
    pl: ['Anna', 'Katarzyna', 'Monika', 'Agnieszka', 'Joanna', 'Magdalena', 'Ewa', 'Beata', 'Marta', 'Dorota'],
    sv: ['Anna', 'Maria', 'Sofia', 'Karin', 'Helena', 'Linda', 'Eva', 'Malin', 'Camilla', 'Åsa'],
    no: ['Anna', 'Marianne', 'Ingrid', 'Linda', 'Kristin', 'Monica', 'Eva', 'Camilla', 'Heidi', 'Tone'],
    da: ['Anna', 'Helle', 'Louise', 'Camilla', 'Charlotte', 'Line', 'Maria', 'Anne', 'Lene', 'Rikke'],
    fi: ['Anna', 'Minna', 'Laura', 'Tiina', 'Päivi', 'Katja', 'Marika', 'Johanna', 'Hanna', 'Kirsi'],
    el: ['Άννα', 'Ελένη', 'Κατερίνα', 'Σοφία', 'Μαρία', 'Δήμητρα', 'Ιωάννα', 'Χριστίνα', 'Γεωργία', 'Νίκη'],
    hr: ['Ana', 'Ivana', 'Marija', 'Petra', 'Martina', 'Jelena', 'Katarina', 'Sandra', 'Marina', 'Renata'],
    sl: ['Ana', 'Nataša', 'Petra', 'Maja', 'Mojca', 'Tanja', 'Mateja', 'Nina', 'Andreja', 'Simona'],
    sk: ['Anna', 'Martina', 'Zuzana', 'Katarína', 'Monika', 'Petra', 'Eva', 'Lucia', 'Andrea', 'Veronika'],
    cs: ['Anna', 'Petra', 'Lucie', 'Martina', 'Monika', 'Kateřina', 'Eva', 'Lenka', 'Andrea', 'Veronika'],
    hu: ['Anna', 'Andrea', 'Éva', 'Mónika', 'Zsuzsa', 'Judit', 'Krisztina', 'Erika', 'Ágnes', 'Ildikó'],
    he: ['אנה', 'מיכל', 'יעל', 'רונית', 'אורית', 'שרון', 'מירב', 'טלי', 'סיגל', 'ליאת']
  };

  const fallbackBios = [
    'I like honest conversations and men who know what they want.',
    'I’m looking for someone mature, kind and easy to talk to.',
    'I appreciate confidence, humour and genuine interest.'
  ];

  const normaliseLocale = (value = '') => {
    const raw = String(value).replace('_', '-');
    if (namesByLocale[raw]) return raw;
    const lower = raw.toLowerCase();
    if (lower.startsWith('en-us')) return 'en-US';
    if (lower.startsWith('en-sg')) return 'en-SG';
    if (lower.startsWith('en')) return 'en-GB';
    const short = lower.split('-')[0];
    return namesByLocale[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const getLocalProfiles = (locale) => {
    try {
      return typeof locales !== 'undefined' && Array.isArray(locales[locale]?.profiles)
        ? locales[locale].profiles
        : [];
    } catch (_) {
      return [];
    }
  };

  const cardMarkup = (index) => `
    <article class="profile-card profile-card-premium js-affiliate" data-slot="card-${index + 1}" tabindex="0" role="button" aria-label="View profile">
      <div class="image-wrap">
        <img
          src="${imagePaths[index]}"
          alt="Profile photo"
          width="600"
          height="800"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <span class="status-pill${index % 4 === 3 ? ' muted' : ''}"><i></i><span data-i18n="${index % 4 === 3 ? 'activeToday' : 'online'}">${index % 4 === 3 ? 'Active today' : 'Online'}</span></span>
        <div class="profile-card-gradient"></div>
        <div class="profile-card-overlay-premium">
          <span class="profile-distance">📍 <span data-profile-distance="${index}">near you</span></span>
          <h3><span data-gallery-name>${namesByLocale['en-GB'][index]}</span>, <span data-gallery-age>${ages[index]}</span></h3>
          <p class="profile-bio" data-profile-bio="${index}">${fallbackBios[index % fallbackBios.length]}</p>
          <button class="profile-primary-action" type="button"><span data-profile-cta>View profile</span><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </article>
  `;

  const injectGalleryStyle = () => {
    if (document.getElementById('rmc-ten-profile-gallery-style')) return;
    const style = document.createElement('style');
    style.id = 'rmc-ten-profile-gallery-style';
    style.textContent = `
      .profile-swipe-track .profile-card-premium .image-wrap > img {
        object-fit: cover;
        object-position: center 18%;
      }
      @media (max-width: 760px) {
        .profile-swipe-dots {
          max-width: 240px;
          margin-inline: auto;
          flex-wrap: wrap;
          gap: 6px;
        }
        .profile-swipe-dot {
          width: 7px;
          height: 7px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const renderGallery = () => {
    const track = document.getElementById('profileSwipeTrack');
    if (!track || track.dataset.tenProfileGallery === '1') return false;

    track.dataset.tenProfileGallery = '1';
    track.innerHTML = ages.map((_, index) => cardMarkup(index)).join('');

    const dots = document.querySelector('.profile-swipe-dots');
    if (dots) {
      dots.innerHTML = ages.map((_, index) => `
        <button class="profile-swipe-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Profile ${index + 1}"></button>
      `).join('');
    }

    injectGalleryStyle();
    return true;
  };

  const syncText = () => {
    const locale = getLocale();
    const names = namesByLocale[locale] || namesByLocale['en-GB'];
    const localProfiles = getLocalProfiles(locale);
    const cards = [...document.querySelectorAll('#profileSwipeTrack .profile-card-premium')];
    if (!cards.length) return;

    const translatedBios = cards.slice(0, 3).map((card, index) =>
      card.querySelector('[data-profile-bio]')?.textContent?.trim() || fallbackBios[index]
    );

    cards.forEach((card, index) => {
      const name = card.querySelector('[data-gallery-name]');
      if (name) name.textContent = names[index] || names[index % names.length];

      const age = card.querySelector('[data-gallery-age]');
      if (age) age.textContent = String(ages[index]);

      const bio = card.querySelector('[data-profile-bio]');
      if (bio && translatedBios.length) bio.textContent = translatedBios[index % translatedBios.length];

      const distance = card.querySelector('[data-profile-distance]');
      if (distance) {
        const current = distance.textContent.trim();
        const distanceOnly = current.includes('·') ? current.split('·').pop().trim() : current;
        const city = localProfiles[index % Math.max(localProfiles.length, 1)]?.[1] || '';
        distance.textContent = city ? `${city} · ${distanceOnly}` : distanceOnly;
      }
    });
  };

  const scheduleSync = () => {
    [0, 250, 900, 1800].forEach((delay) => window.setTimeout(syncText, delay));
  };

  const initialise = () => {
    renderGallery();
    scheduleSync();

    document.getElementById('languageSelect')?.addEventListener('change', scheduleSync);
    window.addEventListener('pageshow', scheduleSync);

    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });
  };

  initialise();
})();
