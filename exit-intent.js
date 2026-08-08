(() => {
  const SHOWN_KEY = 'rmc_exit_intent_shown_v1';
  const AGE_ENGAGED_KEY = 'rmc_age_gate_engaged_v1';
  const MIN_DESKTOP_MS = 3500;

  const copy = {
    'en-GB': { kicker: 'ONE MORE THING', title: 'Before you go…', lead: (name) => `${name} has one more message for you`, message: 'One more thing… do you really not want to reply to me? 😊', cta: (name) => `See ${name}’s message`, leave: 'No thanks', close: 'Close' },
    'en-US': { kicker: 'ONE MORE THING', title: 'Before you go…', lead: (name) => `${name} has one more message for you`, message: 'One more thing… do you really not want to reply to me? 😊', cta: (name) => `See ${name}’s message`, leave: 'No thanks', close: 'Close' },
    'en-SG': { kicker: 'ONE MORE THING', title: 'Before you go…', lead: (name) => `${name} has one more message for you`, message: 'One more thing… do you really not want to reply to me? 😊', cta: (name) => `See ${name}’s message`, leave: 'No thanks', close: 'Close' },
    de: { kicker: 'NOCH EINE SACHE', title: 'Bevor du gehst …', lead: (name) => `${name} hat noch eine Nachricht für dich`, message: 'Noch etwas … willst du mir wirklich nicht antworten? 😊', cta: (name) => `Nachricht von ${name} ansehen`, leave: 'Nein, danke', close: 'Schließen' },
    nl: { kicker: 'NOG ÉÉN DING', title: 'Voordat je weggaat…', lead: (name) => `${name} heeft nog een bericht voor je`, message: 'Nog één ding… wil je me echt niet antwoorden? 😊', cta: (name) => `Bekijk het bericht van ${name}`, leave: 'Nee, bedankt', close: 'Sluiten' },
    fr: { kicker: 'ENCORE UNE CHOSE', title: 'Avant de partir…', lead: (name) => `${name} a encore un message pour vous`, message: 'Juste une chose… vous ne voulez vraiment pas me répondre ? 😊', cta: (name) => `Voir le message de ${name}`, leave: 'Non merci', close: 'Fermer' },
    it: { kicker: 'UN’ULTIMA COSA', title: 'Prima di andare…', lead: (name) => `${name} ha ancora un messaggio per te`, message: 'Un’ultima cosa… davvero non vuoi rispondermi? 😊', cta: (name) => `Vedi il messaggio di ${name}`, leave: 'No, grazie', close: 'Chiudi' },
    es: { kicker: 'UNA COSA MÁS', title: 'Antes de irte…', lead: (name) => `${name} tiene otro mensaje para ti`, message: 'Una cosa más… ¿de verdad no quieres responderme? 😊', cta: (name) => `Ver el mensaje de ${name}`, leave: 'No, gracias', close: 'Cerrar' },
    pt: { kicker: 'MAIS UMA COISA', title: 'Antes de saíres…', lead: (name) => `${name} tem mais uma mensagem para ti`, message: 'Só mais uma coisa… não queres mesmo responder-me? 😊', cta: (name) => `Ver a mensagem de ${name}`, leave: 'Não, obrigado', close: 'Fechar' },
    pl: { kicker: 'JESZCZE JEDNA RZECZ', title: 'Zanim wyjdziesz…', lead: (name) => `${name} ma dla Ciebie jeszcze jedną wiadomość`, message: 'Jeszcze jedno… naprawdę nie chcesz mi odpisać? 😊', cta: (name) => `Zobacz wiadomość od ${name}`, leave: 'Nie, dziękuję', close: 'Zamknij' },
    sv: { kicker: 'EN SAK TILL', title: 'Innan du går…', lead: (name) => `${name} har ett meddelande till dig`, message: 'En sak till… vill du verkligen inte svara mig? 😊', cta: (name) => `Se ${name}s meddelande`, leave: 'Nej tack', close: 'Stäng' },
    no: { kicker: 'EN TING TIL', title: 'Før du går …', lead: (name) => `${name} har en melding til deg`, message: 'En ting til … vil du virkelig ikke svare meg? 😊', cta: (name) => `Se meldingen fra ${name}`, leave: 'Nei takk', close: 'Lukk' },
    da: { kicker: 'EN TING MERE', title: 'Inden du går …', lead: (name) => `${name} har en besked mere til dig`, message: 'En ting mere … vil du virkelig ikke svare mig? 😊', cta: (name) => `Se beskeden fra ${name}`, leave: 'Nej tak', close: 'Luk' },
    fi: { kicker: 'VIELÄ YKSI ASIA', title: 'Ennen kuin lähdet…', lead: () => 'Annalla on sinulle vielä yksi viesti', message: 'Vielä yksi asia… etkö todella halua vastata minulle? 😊', cta: () => 'Katso Annan viesti', leave: 'Ei kiitos', close: 'Sulje' },
    el: { kicker: 'ΚΑΤΙ ΑΚΟΜΑ', title: 'Πριν φύγεις…', lead: (name) => `Η ${name} έχει ακόμα ένα μήνυμα για εσένα`, message: 'Κάτι ακόμα… αλήθεια δεν θέλεις να μου απαντήσεις; 😊', cta: () => 'Δες το μήνυμα', leave: 'Όχι, ευχαριστώ', close: 'Κλείσιμο' },
    hr: { kicker: 'JOŠ NEŠTO', title: 'Prije nego odeš…', lead: (name) => `${name} ima još jednu poruku za tebe`, message: 'Još nešto… stvarno mi ne želiš odgovoriti? 😊', cta: () => 'Pogledaj poruku', leave: 'Ne, hvala', close: 'Zatvori' },
    sl: { kicker: 'ŠE NEKAJ', title: 'Preden greš…', lead: (name) => `${name} ima zate še eno sporočilo`, message: 'Še nekaj… mi res ne želiš odgovoriti? 😊', cta: () => 'Poglej sporočilo', leave: 'Ne, hvala', close: 'Zapri' },
    sk: { kicker: 'EŠTE JEDNA VEC', title: 'Skôr než odídeš…', lead: (name) => `${name} má pre teba ešte jednu správu`, message: 'Ešte niečo… naozaj mi nechceš odpovedať? 😊', cta: () => 'Pozri si správu', leave: 'Nie, ďakujem', close: 'Zavrieť' },
    cs: { kicker: 'JEŠTĚ JEDNA VĚC', title: 'Než odejdeš…', lead: (name) => `${name} pro tebe má ještě jednu zprávu`, message: 'Ještě něco… opravdu mi nechceš odpovědět? 😊', cta: () => 'Zobrazit zprávu', leave: 'Ne, děkuji', close: 'Zavřít' },
    hu: { kicker: 'MÉG VALAMI', title: 'Mielőtt elmész…', lead: (name) => `${name} még egy üzenetet hagyott neked`, message: 'Még valami… tényleg nem akarsz válaszolni nekem? 😊', cta: () => 'Üzenet megnyitása', leave: 'Nem, köszönöm', close: 'Bezárás' },
    he: { kicker: 'עוד משהו קטן', title: 'רגע לפני שאתה יוצא…', lead: (name) => `ל${name} יש עוד הודעה בשבילך`, message: 'רק עוד דבר אחד… אתה באמת לא רוצה לענות לי? 😊', cta: () => 'הצג את ההודעה', leave: 'לא, תודה', close: 'סגור' }
  };

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

  const getText = () => copy[getLocale()] || copy['en-GB'];
  const isMobile = () => window.matchMedia('(max-width: 760px)').matches || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const readFlag = (key) => {
    try { return sessionStorage.getItem(key) === '1'; }
    catch (_) { return false; }
  };
  const writeFlag = (key) => {
    try { sessionStorage.setItem(key, '1'); }
    catch (_) {}
  };

  let shown = readFlag(SHOWN_KEY);
  let ageEngaged = readFlag(AGE_ENGAGED_KEY);
  let mobileGuardActive = false;
  let suppressNextPop = false;
  let openTrigger = '';
  let previousOverflow = '';
  const startedAt = Date.now();

  const track = (eventName, details = {}) => {
    if (typeof window.rmcTrack === 'function') window.rmcTrack(eventName, details);
  };

  const getHeroProfile = () => {
    const hero = document.querySelector('.hero-invite .featured-profile');
    const heading = hero?.querySelector('.profile-overlay h2')?.textContent?.trim() || 'Anna, 41';
    const name = heading.replace(/,\s*\d{2}\s*$/, '').trim() || 'Anna';
    const image = hero?.querySelector(':scope > img');
    return {
      name,
      src: image?.currentSrc || image?.src || '',
      srcset: image?.srcset || ''
    };
  };

  const hasBlockingUi = () => Boolean(document.querySelector(
    '#ageGateModal[open], #legalModal[open], #profileDetailModal[open], #profileDetailModal.is-open, dialog[open]'
  ));

  const canShow = () => !shown && !ageEngaged && !hasBlockingUi() && !document.querySelector('.rmc-exit-overlay.is-open');

  const injectStyles = () => {
    if (document.getElementById('rmc-exit-intent-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-exit-intent-styles';
    style.textContent = `
      .rmc-exit-overlay{position:fixed;z-index:12000;inset:0;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(0,0,0,.76);backdrop-filter:blur(10px);opacity:0;visibility:hidden;transition:opacity .18s ease,visibility .18s ease}
      .rmc-exit-overlay.is-open{opacity:1;visibility:visible}
      .rmc-exit-card{position:relative;width:min(440px,100%);overflow:hidden;padding:27px 24px 21px;border:1px solid rgba(255,255,255,.12);border-radius:26px;background:radial-gradient(circle at 50% -15%,rgba(229,9,20,.25),transparent 36%),linear-gradient(155deg,#1a1a1d,#09090a 72%);box-shadow:0 34px 110px rgba(0,0,0,.78);color:#fff;text-align:center;transform:translateY(9px) scale(.985);transition:transform .2s ease}
      .rmc-exit-overlay.is-open .rmc-exit-card{transform:translateY(0) scale(1)}
      .rmc-exit-card:before{content:'';position:absolute;top:0;left:24px;right:24px;height:3px;background:linear-gradient(90deg,transparent,#e50914,#ff6670,#e50914,transparent)}
      .rmc-exit-close{position:absolute;z-index:2;top:11px;right:11px;display:grid;width:35px;height:35px;place-items:center;border:1px solid rgba(255,255,255,.10);border-radius:50%;background:rgba(255,255,255,.045);color:#9c9ca2;font:inherit;font-size:22px;line-height:1;cursor:pointer}
      [dir='rtl'] .rmc-exit-close{right:auto;left:11px}
      .rmc-exit-kicker{display:inline-flex;margin:0 auto 13px;padding:6px 10px;border:1px solid rgba(229,9,20,.4);border-radius:999px;background:rgba(229,9,20,.10);color:#ff737b;font-size:10px;font-weight:950;letter-spacing:.10em}
      .rmc-exit-avatar{position:relative;display:block;width:70px;height:70px;margin:0 auto 12px}
      .rmc-exit-avatar img{width:70px;height:70px;object-fit:cover;object-position:center 22%;border:2px solid rgba(255,255,255,.88);border-radius:50%;box-shadow:0 12px 32px rgba(0,0,0,.36),0 0 0 6px rgba(229,9,20,.09)}
      .rmc-exit-verified{position:absolute;right:-2px;bottom:1px;display:grid;width:23px;height:23px;place-items:center;border:2px solid #111;border-radius:50%;background:#e50914;color:#fff;font-size:11px;font-weight:1000}
      [dir='rtl'] .rmc-exit-verified{right:auto;left:-2px}
      .rmc-exit-title{margin:0 auto 7px;max-width:390px;color:#fff;font-size:clamp(1.35rem,5vw,1.75rem);line-height:1.12;letter-spacing:-.03em}
      .rmc-exit-lead{margin:0 auto 15px;max-width:390px;color:#d7d7da;font-size:.96rem;font-weight:850;line-height:1.35}
      .rmc-exit-message{position:relative;margin:0 auto 18px;padding:14px 15px;border:1px solid rgba(255,255,255,.09);border-radius:16px;background:rgba(255,255,255,.045);color:#f2f2f3;font-size:.92rem;font-weight:700;line-height:1.45;text-align:left}
      [dir='rtl'] .rmc-exit-message{text-align:right}
      .rmc-exit-message:before{content:'';position:absolute;top:-6px;left:50%;width:11px;height:11px;transform:translateX(-50%) rotate(45deg);border-left:1px solid rgba(255,255,255,.09);border-top:1px solid rgba(255,255,255,.09);background:#151517}
      .rmc-exit-cta{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;min-height:57px;padding:12px 16px;border:0;border-radius:15px;background:linear-gradient(180deg,#ef1823,#cf0711);box-shadow:0 10px 30px rgba(229,9,20,.24);color:#fff;font:inherit;font-size:.96rem;font-weight:950;cursor:pointer}
      .rmc-exit-leave{display:inline-flex;margin:11px auto 0;padding:5px 8px;border:0;background:transparent;color:#77777e;font:inherit;font-size:.76rem;font-weight:750;text-decoration:underline;text-decoration-color:rgba(255,255,255,.13);text-underline-offset:3px;cursor:pointer}
      @media(max-width:640px){
        .rmc-exit-overlay{align-items:flex-end;padding:8px}
        .rmc-exit-card{width:100%;padding:24px 14px 17px;border-radius:24px 24px 20px 20px}
        .rmc-exit-card:before{left:20px;right:20px}
        .rmc-exit-kicker{margin-bottom:11px;font-size:9px}
        .rmc-exit-avatar,.rmc-exit-avatar img{width:62px;height:62px}
        .rmc-exit-title{font-size:1.28rem}
        .rmc-exit-lead{margin-bottom:13px;font-size:.88rem}
        .rmc-exit-message{margin-bottom:15px;padding:12px 13px;font-size:.85rem;border-radius:14px}
        .rmc-exit-cta{min-height:54px;border-radius:14px;font-size:.91rem}
        .rmc-exit-leave{margin-top:8px}
      }
      @media(max-height:650px) and (max-width:640px){
        .rmc-exit-card{padding-top:18px}
        .rmc-exit-kicker{margin-bottom:8px}
        .rmc-exit-avatar,.rmc-exit-avatar img{width:54px;height:54px}
        .rmc-exit-avatar{margin-bottom:8px}
        .rmc-exit-title{font-size:1.13rem}
        .rmc-exit-lead{margin-bottom:9px;font-size:.82rem}
        .rmc-exit-message{margin-bottom:10px;padding:10px 12px;font-size:.80rem}
        .rmc-exit-cta{min-height:49px}
      }
    `;
    document.head.appendChild(style);
  };

  const ensureModal = () => {
    let overlay = document.querySelector('.rmc-exit-overlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'rmc-exit-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <section class="rmc-exit-card" role="dialog" aria-modal="true" aria-labelledby="rmcExitTitle">
        <button class="rmc-exit-close" type="button">×</button>
        <div class="rmc-exit-kicker"></div>
        <span class="rmc-exit-avatar"><img alt="" decoding="async"><b class="rmc-exit-verified" aria-hidden="true">✓</b></span>
        <h2 class="rmc-exit-title" id="rmcExitTitle"></h2>
        <p class="rmc-exit-lead"></p>
        <div class="rmc-exit-message"></div>
        <button class="rmc-exit-cta" type="button"><span></span><b aria-hidden="true">→</b></button>
        <button class="rmc-exit-leave" type="button"></button>
      </section>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.rmc-exit-close').addEventListener('click', () => dismiss('close'));
    overlay.querySelector('.rmc-exit-leave').addEventListener('click', () => {
      const shouldLeave = openTrigger === 'back';
      dismiss('leave');
      if (shouldLeave) window.setTimeout(() => history.back(), 30);
    });
    overlay.querySelector('.rmc-exit-cta').addEventListener('click', () => {
      track('exit_intent_cta', { trigger: openTrigger || 'unknown' });
      markAgeEngaged(false);
      closeOverlay();
      window.setTimeout(() => {
        const mainCta = document.querySelector('.phone-cta.js-affiliate, .hero-invite .js-affiliate[data-slot="hero"], .hero-invite .js-affiliate');
        if (mainCta instanceof HTMLElement) mainCta.click();
      }, 35);
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) dismiss('backdrop');
    });
    return overlay;
  };

  const syncCopy = () => {
    const overlay = ensureModal();
    const text = getText();
    const profile = getHeroProfile();
    const image = overlay.querySelector('.rmc-exit-avatar img');
    if (image) {
      if (profile.src) image.src = profile.src;
      if (profile.srcset) image.srcset = profile.srcset;
      else image.removeAttribute('srcset');
      image.alt = profile.name;
    }
    overlay.querySelector('.rmc-exit-kicker').textContent = text.kicker;
    overlay.querySelector('.rmc-exit-title').textContent = text.title;
    overlay.querySelector('.rmc-exit-lead').textContent = text.lead(profile.name);
    overlay.querySelector('.rmc-exit-message').textContent = text.message;
    overlay.querySelector('.rmc-exit-cta span').textContent = text.cta(profile.name);
    overlay.querySelector('.rmc-exit-leave').textContent = text.leave;
    overlay.querySelector('.rmc-exit-close').setAttribute('aria-label', text.close);
  };

  const closeOverlay = () => {
    const overlay = document.querySelector('.rmc-exit-overlay');
    if (!overlay?.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    openTrigger = '';
  };

  function dismiss(reason) {
    const trigger = openTrigger || 'unknown';
    track('exit_intent_dismiss', { trigger, reason });
    closeOverlay();
  }

  const show = (trigger) => {
    if (!canShow()) return false;
    shown = true;
    writeFlag(SHOWN_KEY);
    openTrigger = trigger;
    syncCopy();
    const overlay = ensureModal();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    track('exit_intent_open', { trigger });
    window.setTimeout(() => overlay.querySelector('.rmc-exit-cta')?.focus(), 50);
    return true;
  };

  const disarmMobileGuard = () => {
    if (!mobileGuardActive) return;
    mobileGuardActive = false;
    suppressNextPop = true;
    try { history.back(); }
    catch (_) { suppressNextPop = false; }
  };

  function markAgeEngaged(disarm = true) {
    if (ageEngaged) return;
    ageEngaged = true;
    writeFlag(AGE_ENGAGED_KEY);
    if (disarm) disarmMobileGuard();
  }

  const armMobileBack = () => {
    if (!isMobile() || shown || ageEngaged || mobileGuardActive) return;
    try {
      history.pushState({ ...(history.state || {}), rmcExitGuard: 1 }, '', location.href);
      mobileGuardActive = true;
    } catch (_) {}
  };

  const initialise = () => {
    injectStyles();
    ensureModal();
    armMobileBack();

    document.addEventListener('mouseout', (event) => {
      if (isMobile() || shown || ageEngaged) return;
      if (Date.now() - startedAt < MIN_DESKTOP_MS) return;
      if (event.relatedTarget || event.toElement) return;
      if (event.clientY > 8) return;
      show('desktop-exit');
    }, true);

    window.addEventListener('popstate', () => {
      if (suppressNextPop) {
        suppressNextPop = false;
        return;
      }
      if (!mobileGuardActive) return;
      mobileGuardActive = false;
      if (!show('back')) window.setTimeout(() => history.back(), 0);
    });

    window.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.rmc-exit-cta')) return;
      if (target.closest('.js-affiliate, .age-option')) markAgeEngaged(true);
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (!document.querySelector('.rmc-exit-overlay.is-open')) return;
      dismiss('escape');
    });

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      if (document.querySelector('.rmc-exit-overlay.is-open')) syncCopy();
    });

    window.addEventListener('pageshow', () => {
      if (!shown && !ageEngaged && isMobile()) window.setTimeout(armMobileBack, 80);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();
