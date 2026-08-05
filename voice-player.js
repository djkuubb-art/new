(() => {
  const audioFiles = {
    'en-GB': '/audio/en-GB.mp3',
    'en-US': '/audio/en-US.mp3',
    'en-SG': '/audio/en-SG.mp3',
    de: '/audio/de.mp3', nl: '/audio/nl.mp3', fr: '/audio/fr.mp3',
    it: '/audio/it.mp3', es: '/audio/es.mp3', pt: '/audio/pt.mp3',
    pl: '/audio/pl.mp3', sv: '/audio/sv.mp3', no: '/audio/no.mp3',
    da: '/audio/da.mp3', fi: '/audio/fi.mp3', el: '/audio/el.mp3',
    hr: '/audio/hr.mp3', sl: '/audio/sl.mp3', sk: '/audio/sk.mp3',
    cs: '/audio/cs.mp3', hu: '/audio/hu.mp3', he: '/audio/he.mp3'
  };

  const copy = {
    'en-GB': { title: 'Voice message from Anna', badge: 'Private', play: 'Play voice message', pause: 'Pause voice message', hint: 'Listen to Anna, then reply when you are ready.', reply: 'Reply to Anna' },
    'en-US': { title: 'Voice message from Anna', badge: 'Private', play: 'Play voice message', pause: 'Pause voice message', hint: 'Listen to Anna, then reply when you are ready.', reply: 'Reply to Anna' },
    'en-SG': { title: 'Voice message from Anna', badge: 'Private', play: 'Play voice message', pause: 'Pause voice message', hint: 'Listen to Anna, then reply when you are ready.', reply: 'Reply to Anna' },
    de: { title: 'Sprachnachricht von Anna', badge: 'Privat', play: 'Sprachnachricht abspielen', pause: 'Sprachnachricht pausieren', hint: 'Hör dir Annas Nachricht an und antworte ihr danach.', reply: 'Anna antworten' },
    nl: { title: 'Spraakbericht van Anna', badge: 'Privé', play: 'Spraakbericht afspelen', pause: 'Spraakbericht pauzeren', hint: 'Luister naar Anna en stuur haar daarna een antwoord.', reply: 'Anna antwoorden' },
    fr: { title: 'Message vocal d’Anna', badge: 'Privé', play: 'Écouter le message vocal', pause: 'Mettre le message en pause', hint: 'Écoutez Anna, puis répondez-lui quand vous êtes prêt.', reply: 'Répondre à Anna' },
    it: { title: 'Messaggio vocale di Anna', badge: 'Privato', play: 'Riproduci il messaggio vocale', pause: 'Metti in pausa il messaggio', hint: 'Ascolta Anna e poi rispondile quando vuoi.', reply: 'Rispondi ad Anna' },
    es: { title: 'Mensaje de voz de Anna', badge: 'Privado', play: 'Reproducir mensaje de voz', pause: 'Pausar mensaje de voz', hint: 'Escucha a Anna y respóndele cuando estés listo.', reply: 'Responder a Anna' },
    pt: { title: 'Mensagem de voz da Anna', badge: 'Privada', play: 'Ouvir mensagem de voz', pause: 'Pausar mensagem de voz', hint: 'Ouve a Anna e responde-lhe quando estiveres pronto.', reply: 'Responder à Anna' },
    pl: { title: 'Wiadomość głosowa od Anny', badge: 'Prywatna', play: 'Odtwórz wiadomość głosową', pause: 'Wstrzymaj wiadomość głosową', hint: 'Posłuchaj Anny, a potem odpowiedz jej, gdy będziesz gotowy.', reply: 'Odpisz Annie' },
    sv: { title: 'Röstmeddelande från Anna', badge: 'Privat', play: 'Spela röstmeddelandet', pause: 'Pausa röstmeddelandet', hint: 'Lyssna på Anna och svara henne när du är redo.', reply: 'Svara Anna' },
    no: { title: 'Talemelding fra Anna', badge: 'Privat', play: 'Spill av talemeldingen', pause: 'Sett talemeldingen på pause', hint: 'Hør på Anna og svar henne når du er klar.', reply: 'Svar Anna' },
    da: { title: 'Talebesked fra Anna', badge: 'Privat', play: 'Afspil talebeskeden', pause: 'Sæt talebeskeden på pause', hint: 'Lyt til Anna, og svar hende, når du er klar.', reply: 'Svar Anna' },
    fi: { title: 'Ääniviesti Annalta', badge: 'Yksityinen', play: 'Toista ääniviesti', pause: 'Keskeytä ääniviesti', hint: 'Kuuntele Annaa ja vastaa hänelle, kun olet valmis.', reply: 'Vastaa Annalle' },
    el: { title: 'Φωνητικό μήνυμα από την Άννα', badge: 'Ιδιωτικό', play: 'Αναπαραγωγή φωνητικού μηνύματος', pause: 'Παύση φωνητικού μηνύματος', hint: 'Άκουσε την Άννα και απάντησέ της όταν είσαι έτοιμος.', reply: 'Απάντησε στην Άννα' },
    hr: { title: 'Glasovna poruka od Anne', badge: 'Privatno', play: 'Reproduciraj glasovnu poruku', pause: 'Pauziraj glasovnu poruku', hint: 'Poslušaj Annu i odgovori joj kada budeš spreman.', reply: 'Odgovori Anni' },
    sl: { title: 'Glasovno sporočilo od Anne', badge: 'Zasebno', play: 'Predvajaj glasovno sporočilo', pause: 'Začasno ustavi sporočilo', hint: 'Poslušaj Anno in ji odgovori, ko boš pripravljen.', reply: 'Odgovori Anni' },
    sk: { title: 'Hlasová správa od Anny', badge: 'Súkromná', play: 'Prehrať hlasovú správu', pause: 'Pozastaviť hlasovú správu', hint: 'Vypočuj si Annu a odpíš jej, keď budeš pripravený.', reply: 'Odpísať Anne' },
    cs: { title: 'Hlasová zpráva od Anny', badge: 'Soukromá', play: 'Přehrát hlasovou zprávu', pause: 'Pozastavit hlasovou zprávu', hint: 'Poslechni si Annu a odepiš jí, až budeš připravený.', reply: 'Odepsat Anně' },
    hu: { title: 'Hangüzenet Annától', badge: 'Privát', play: 'Hangüzenet lejátszása', pause: 'Hangüzenet szüneteltetése', hint: 'Hallgasd meg Annát, majd válaszolj neki, amikor készen állsz.', reply: 'Válasz Annának' },
    he: { title: 'הודעה קולית מאנה', badge: 'פרטי', play: 'השמעת ההודעה הקולית', pause: 'השהיית ההודעה הקולית', hint: 'הקשב לאנה ואז השב לה כשתהיה מוכן.', reply: 'השב לאנה' }
  };

  let activeProfileIndex = null;
  let unlockTimer = 0;
  let ageFromVoicePending = false;

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

  const track = (eventName, details = {}) => {
    const payload = {
      event: eventName,
      locale: getLocale(),
      profile: 'Anna',
      ...details
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, payload);

    window.dispatchEvent(new CustomEvent('realmeetclub:analytics', { detail: payload }));
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
  };

  const resetPanel = (modal, { clearSource = false } = {}) => {
    window.clearTimeout(unlockTimer);
    const audio = modal?.querySelector('.anna-voice-audio');
    const play = modal?.querySelector('.anna-voice-play');
    const progress = modal?.querySelector('.anna-voice-progress');
    const time = modal?.querySelector('.anna-voice-time');
    const card = modal?.querySelector('.profile-detail-card');
    const ctaCopy = modal?.querySelector('.profile-detail-cta-copy');

    if (audio) {
      audio.pause();
      try { audio.currentTime = 0; } catch (_) {}
      if (clearSource) audio.removeAttribute('src');
    }
    if (play) {
      play.textContent = '▶';
      play.setAttribute('aria-label', getText().play);
    }
    if (progress) progress.style.width = '0%';
    if (time) time.textContent = '0:00';
    if (card) card.classList.remove('voice-cta-ready');
    if (ctaCopy?.dataset.voiceOriginalCopy) {
      ctaCopy.textContent = ctaCopy.dataset.voiceOriginalCopy;
      delete ctaCopy.dataset.voiceOriginalCopy;
    }
  };

  const unlockVoiceCta = (modal) => {
    const card = modal.querySelector('.profile-detail-card');
    const ctaCopy = modal.querySelector('.profile-detail-cta-copy');
    if (!card || !ctaCopy || card.classList.contains('voice-cta-ready')) return;

    ctaCopy.dataset.voiceOriginalCopy = ctaCopy.textContent;
    ctaCopy.textContent = getText().reply;
    card.classList.add('voice-cta-ready');
  };

  const updatePanelCopy = (modal) => {
    const text = getText();
    const title = modal.querySelector('.anna-voice-title');
    const badge = modal.querySelector('.anna-voice-badge');
    const hint = modal.querySelector('.anna-voice-hint');
    const play = modal.querySelector('.anna-voice-play');
    const audio = modal.querySelector('.anna-voice-audio');

    if (title) title.textContent = text.title;
    if (badge) badge.textContent = text.badge;
    if (hint) hint.textContent = text.hint;
    if (play) play.setAttribute('aria-label', audio && !audio.paused ? text.pause : text.play);

    if (modal.querySelector('.profile-detail-card')?.classList.contains('voice-cta-ready')) {
      const ctaCopy = modal.querySelector('.profile-detail-cta-copy');
      if (ctaCopy) ctaCopy.textContent = text.reply;
    }
  };

  const ensurePlayer = (modal) => {
    if (!modal || activeProfileIndex !== 0 || !modal.open) return;

    const body = modal.querySelector('.profile-detail-body');
    const cta = modal.querySelector('.profile-detail-cta');
    if (!body || !cta) return;

    let panel = modal.querySelector('.anna-voice-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'anna-voice-panel';
      panel.innerHTML = `
        <div class="anna-voice-header">
          <div class="anna-voice-label">
            <strong class="anna-voice-title"></strong>
            <span class="anna-voice-subtitle">Anna, 41</span>
          </div>
          <span class="anna-voice-badge"></span>
        </div>
        <div class="anna-voice-controls">
          <button class="anna-voice-play" type="button" aria-label="">▶</button>
          <div class="anna-voice-track" aria-hidden="true"><span class="anna-voice-progress"></span></div>
          <span class="anna-voice-time">0:00</span>
        </div>
        <p class="anna-voice-hint"></p>
        <audio class="anna-voice-audio" preload="metadata"></audio>
      `;
      body.insertBefore(panel, cta);

      const audio = panel.querySelector('.anna-voice-audio');
      const play = panel.querySelector('.anna-voice-play');
      const progress = panel.querySelector('.anna-voice-progress');
      const time = panel.querySelector('.anna-voice-time');

      play.addEventListener('click', async () => {
        if (!audio.src) audio.src = audioFiles[getLocale()] || audioFiles['en-GB'];

        if (!audio.paused) {
          audio.pause();
          return;
        }

        try {
          await audio.play();
        } catch (_) {
          play.textContent = '▶';
          play.setAttribute('aria-label', getText().play);
        }
      });

      audio.addEventListener('play', () => {
        play.textContent = '❚❚';
        play.setAttribute('aria-label', getText().pause);
        if (panel.dataset.playTracked !== '1') {
          panel.dataset.playTracked = '1';
          track('voice_message_play');
        }
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => unlockVoiceCta(modal), 1200);
      });

      audio.addEventListener('pause', () => {
        play.textContent = '▶';
        play.setAttribute('aria-label', getText().play);
      });

      audio.addEventListener('loadedmetadata', () => {
        time.textContent = `0:00 / ${formatTime(audio.duration)}`;
      });

      audio.addEventListener('timeupdate', () => {
        const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
        const percent = duration ? Math.min(100, (audio.currentTime / duration) * 100) : 0;
        progress.style.width = `${percent}%`;
        time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
      });

      audio.addEventListener('ended', () => {
        play.textContent = '▶';
        progress.style.width = '100%';
        unlockVoiceCta(modal);
        if (panel.dataset.completeTracked !== '1') {
          panel.dataset.completeTracked = '1';
          track('voice_message_complete');
        }
      });

      cta.addEventListener('click', () => {
        const listened = panel.dataset.playTracked === '1';
        track('voice_cta_click', { listened });
        ageFromVoicePending = true;
      }, true);
    }

    const audio = panel.querySelector('.anna-voice-audio');
    const expectedSource = audioFiles[getLocale()] || audioFiles['en-GB'];
    if (audio.getAttribute('src') !== expectedSource) {
      resetPanel(modal);
      panel.dataset.playTracked = '0';
      panel.dataset.completeTracked = '0';
      audio.src = expectedSource;
    }

    updatePanelCopy(modal);

    if (modal.dataset.voiceVisibleTracked !== '1') {
      modal.dataset.voiceVisibleTracked = '1';
      track('voice_message_visible');
    }
  };

  const syncModal = () => {
    const modal = document.getElementById('profileDetailModal');
    if (!modal) return;

    if (!modal.open) {
      resetPanel(modal);
      modal.dataset.voiceVisibleTracked = '0';
      return;
    }

    if (activeProfileIndex === 0) {
      ensurePlayer(modal);
    } else {
      const panel = modal.querySelector('.anna-voice-panel');
      if (panel) panel.hidden = true;
      resetPanel(modal);
    }
  };

  const openAnnaProfileFromVoiceNotification = (event) => {
    const notification = event.target.closest('.anna-notification[data-event-type="voice"]');
    if (!notification || event.target.closest('.anna-notification-close')) return false;

    event.preventDefault();
    event.stopImmediatePropagation();
    notification.classList.remove('is-visible');

    const annaCard = document.querySelector('.profile-card-premium[data-profile-index="0"], .profile-card-premium:first-child');
    if (annaCard instanceof HTMLElement) {
      activeProfileIndex = 0;
      annaCard.click();
      return true;
    }
    return false;
  };

  const initialise = () => {
    document.addEventListener('click', (event) => {
      if (openAnnaProfileFromVoiceNotification(event)) return;

      const card = event.target.closest('.profile-card-premium');
      if (card) activeProfileIndex = Number(card.dataset.profileIndex || 0);
    }, true);

    document.addEventListener('keydown', (event) => {
      const card = event.target.closest?.('.profile-card-premium');
      if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;
      activeProfileIndex = Number(card.dataset.profileIndex || 0);
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      const modal = document.getElementById('profileDetailModal');
      if (!modal) return;
      setTimeout(() => {
        resetPanel(modal);
        const panel = modal.querySelector('.anna-voice-panel');
        if (panel) {
          panel.dataset.playTracked = '0';
          panel.dataset.completeTracked = '0';
        }
        ensurePlayer(modal);
      }, 0);
    });

    new MutationObserver(() => {
      syncModal();
      const ageModal = document.getElementById('ageGateModal');
      if (ageFromVoicePending && ageModal?.open) {
        ageFromVoicePending = false;
        track('age_modal_open_from_voice');
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['open']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
