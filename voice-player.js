(() => {
  const audioFiles = {
    'en-GB': '/audio/en-GB.mp3', 'en-US': '/audio/en-US.mp3', 'en-SG': '/audio/en-SG.mp3',
    de: '/audio/de.mp3', nl: '/audio/nl.mp3', fr: '/audio/fr.mp3', it: '/audio/it.mp3',
    es: '/audio/es.mp3', pt: '/audio/pt.mp3', pl: '/audio/pl.mp3', sv: '/audio/sv.mp3',
    no: '/audio/no.mp3', da: '/audio/da.mp3', fi: '/audio/fi.mp3', el: '/audio/el.mp3',
    hr: '/audio/hr.mp3', sl: '/audio/sl.mp3', sk: '/audio/sk.mp3', cs: '/audio/cs.mp3',
    hu: '/audio/hu.mp3', he: '/audio/he.mp3'
  };

  const copy = {
    'en-GB': { title:'Voice message from Anna', badge:'Private', play:'Play voice message', pause:'Pause voice message', hint:'Listen to Anna, then reply when you are ready.', listen:'Listen to Anna’s message', reply:'Reply to Anna', complete:'Continue with Anna', waiting:'Anna is waiting for your reply.' },
    'en-US': { title:'Voice message from Anna', badge:'Private', play:'Play voice message', pause:'Pause voice message', hint:'Listen to Anna, then reply when you are ready.', listen:'Listen to Anna’s message', reply:'Reply to Anna', complete:'Continue with Anna', waiting:'Anna is waiting for your reply.' },
    'en-SG': { title:'Voice message from Anna', badge:'Private', play:'Play voice message', pause:'Pause voice message', hint:'Listen to Anna, then reply when you are ready.', listen:'Listen to Anna’s message', reply:'Reply to Anna', complete:'Continue with Anna', waiting:'Anna is waiting for your reply.' },
    de: { title:'Sprachnachricht von Anna', badge:'Privat', play:'Sprachnachricht abspielen', pause:'Sprachnachricht pausieren', hint:'Hör dir Annas Nachricht an und antworte ihr danach.', listen:'Annas Nachricht anhören', reply:'Anna antworten', complete:'Mit Anna weitermachen', waiting:'Anna wartet auf deine Antwort.' },
    nl: { title:'Spraakbericht van Anna', badge:'Privé', play:'Spraakbericht afspelen', pause:'Spraakbericht pauzeren', hint:'Luister naar Anna en stuur haar daarna een antwoord.', listen:'Luister naar Anna’s bericht', reply:'Anna antwoorden', complete:'Verder met Anna', waiting:'Anna wacht op je antwoord.' },
    fr: { title:'Message vocal d’Anna', badge:'Privé', play:'Écouter le message vocal', pause:'Mettre le message en pause', hint:'Écoutez Anna, puis répondez-lui quand vous êtes prêt.', listen:'Écouter le message d’Anna', reply:'Répondre à Anna', complete:'Continuer avec Anna', waiting:'Anna attend votre réponse.' },
    it: { title:'Messaggio vocale di Anna', badge:'Privato', play:'Riproduci il messaggio vocale', pause:'Metti in pausa il messaggio', hint:'Ascolta Anna e poi rispondile quando vuoi.', listen:'Ascolta il messaggio di Anna', reply:'Rispondi ad Anna', complete:'Continua con Anna', waiting:'Anna aspetta la tua risposta.' },
    es: { title:'Mensaje de voz de Anna', badge:'Privado', play:'Reproducir mensaje de voz', pause:'Pausar mensaje de voz', hint:'Escucha a Anna y respóndele cuando estés listo.', listen:'Escuchar el mensaje de Anna', reply:'Responder a Anna', complete:'Continuar con Anna', waiting:'Anna espera tu respuesta.' },
    pt: { title:'Mensagem de voz da Anna', badge:'Privada', play:'Ouvir mensagem de voz', pause:'Pausar mensagem de voz', hint:'Ouve a Anna e responde-lhe quando estiveres pronto.', listen:'Ouvir a mensagem da Anna', reply:'Responder à Anna', complete:'Continuar com a Anna', waiting:'A Anna está à espera da tua resposta.' },
    pl: { title:'Wiadomość głosowa od Anny', badge:'Prywatna', play:'Odtwórz wiadomość głosową', pause:'Wstrzymaj wiadomość głosową', hint:'Posłuchaj Anny, a potem odpowiedz jej, gdy będziesz gotowy.', listen:'Odsłuchaj wiadomość Anny', reply:'Odpisz Annie', complete:'Kontynuuj rozmowę z Anną', waiting:'Anna czeka na Twoją odpowiedź.' },
    sv: { title:'Röstmeddelande från Anna', badge:'Privat', play:'Spela röstmeddelandet', pause:'Pausa röstmeddelandet', hint:'Lyssna på Anna och svara henne när du är redo.', listen:'Lyssna på Annas meddelande', reply:'Svara Anna', complete:'Fortsätt med Anna', waiting:'Anna väntar på ditt svar.' },
    no: { title:'Talemelding fra Anna', badge:'Privat', play:'Spill av talemeldingen', pause:'Sett talemeldingen på pause', hint:'Hør på Anna og svar henne når du er klar.', listen:'Hør Annas melding', reply:'Svar Anna', complete:'Fortsett med Anna', waiting:'Anna venter på svaret ditt.' },
    da: { title:'Talebesked fra Anna', badge:'Privat', play:'Afspil talebeskeden', pause:'Sæt talebeskeden på pause', hint:'Lyt til Anna, og svar hende, når du er klar.', listen:'Lyt til Annas besked', reply:'Svar Anna', complete:'Fortsæt med Anna', waiting:'Anna venter på dit svar.' },
    fi: { title:'Ääniviesti Annalta', badge:'Yksityinen', play:'Toista ääniviesti', pause:'Keskeytä ääniviesti', hint:'Kuuntele Annaa ja vastaa hänelle, kun olet valmis.', listen:'Kuuntele Annan viesti', reply:'Vastaa Annalle', complete:'Jatka Annan kanssa', waiting:'Anna odottaa vastaustasi.' },
    el: { title:'Φωνητικό μήνυμα από την Άννα', badge:'Ιδιωτικό', play:'Αναπαραγωγή φωνητικού μηνύματος', pause:'Παύση φωνητικού μηνύματος', hint:'Άκουσε την Άννα και απάντησέ της όταν είσαι έτοιμος.', listen:'Άκουσε το μήνυμα της Άννας', reply:'Απάντησε στην Άννα', complete:'Συνέχισε με την Άννα', waiting:'Η Άννα περιμένει την απάντησή σου.' },
    hr: { title:'Glasovna poruka od Anne', badge:'Privatno', play:'Reproduciraj glasovnu poruku', pause:'Pauziraj glasovnu poruku', hint:'Poslušaj Annu i odgovori joj kada budeš spreman.', listen:'Poslušaj Anninu poruku', reply:'Odgovori Anni', complete:'Nastavi s Annom', waiting:'Anna čeka tvoj odgovor.' },
    sl: { title:'Glasovno sporočilo od Anne', badge:'Zasebno', play:'Predvajaj glasovno sporočilo', pause:'Začasno ustavi sporočilo', hint:'Poslušaj Anno in ji odgovori, ko boš pripravljen.', listen:'Poslušaj Annino sporočilo', reply:'Odgovori Anni', complete:'Nadaljuj z Anno', waiting:'Anna čaka na tvoj odgovor.' },
    sk: { title:'Hlasová správa od Anny', badge:'Súkromná', play:'Prehrať hlasovú správu', pause:'Pozastaviť hlasovú správu', hint:'Vypočuj si Annu a odpíš jej, keď budeš pripravený.', listen:'Vypočuť si Anninu správu', reply:'Odpísať Anne', complete:'Pokračovať s Annou', waiting:'Anna čaká na tvoju odpoveď.' },
    cs: { title:'Hlasová zpráva od Anny', badge:'Soukromá', play:'Přehrát hlasovou zprávu', pause:'Pozastavit hlasovou zprávu', hint:'Poslechni si Annu a odepiš jí, až budeš připravený.', listen:'Poslechnout si Anninu zprávu', reply:'Odepsat Anně', complete:'Pokračovat s Annou', waiting:'Anna čeká na tvoji odpověď.' },
    hu: { title:'Hangüzenet Annától', badge:'Privát', play:'Hangüzenet lejátszása', pause:'Hangüzenet szüneteltetése', hint:'Hallgasd meg Annát, majd válaszolj neki, amikor készen állsz.', listen:'Hallgasd meg Anna üzenetét', reply:'Válasz Annának', complete:'Folytatás Annával', waiting:'Anna várja a válaszod.' },
    he: { title:'הודעה קולית מאנה', badge:'פרטי', play:'השמעת ההודעה הקולית', pause:'השהיית ההודעה הקולית', hint:'הקשב לאנה ואז השב לה כשתהיה מוכן.', listen:'הקשב להודעה של אנה', reply:'השב לאנה', complete:'המשך עם אנה', waiting:'אנה מחכה לתשובה שלך.' }
  };

  const NOTIFICATION_DELAY_MS = 6000;
  const CTA_UNLOCK_MS = 1200;
  let unlockTimer = 0;
  let stage = 'reply';

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
    document.getElementById('languageSelect')?.value || document.documentElement.lang || navigator.language
  );
  const getText = () => copy[getLocale()] || copy['en-GB'];

  const track = (eventName, details = {}) => {
    const payload = { event: eventName, locale: getLocale(), profile: 'Anna', placement: 'main-profile', ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, payload);
  };

  const injectStyles = () => {
    if (document.getElementById('rmc-staging-voice-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-staging-voice-styles';
    style.textContent = `
      body.rmc-hold-notification .anna-notification{visibility:hidden!important;pointer-events:none!important}
      .anna-voice-state{display:none;margin:8px 0 0;color:#80e8ae;font-size:.68rem;font-weight:750;line-height:1.4}
      .anna-voice-panel.is-started .anna-voice-state,.anna-voice-panel.is-complete .anna-voice-state{display:block}
      .phone-card.rmc-voice-ready .phone-cta{animation:rmcVoiceReadyPulse 1.15s ease 1;box-shadow:0 18px 42px rgba(225,22,63,.42)}
      @keyframes rmcVoiceReadyPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.025)}}
    `;
    document.head.appendChild(style);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
  };

  const getElements = () => {
    const phone = document.querySelector('.hero-invite .phone-card');
    return {
      phone,
      message: phone?.querySelector('.mini-message'),
      cta: phone?.querySelector('.phone-cta'),
      ctaCopy: phone?.querySelector('.phone-cta-copy'),
      panel: phone?.querySelector('.anna-voice-panel')
    };
  };

  const setCtaMode = (mode) => {
    const { phone, cta, ctaCopy, panel } = getElements();
    if (!cta || !ctaCopy) return;
    const text = getText();
    stage = mode;

    if (!cta.dataset.rmcOriginalHref) cta.dataset.rmcOriginalHref = cta.getAttribute('href') || '/api/go?slot=phone';

    if (mode === 'listen') {
      cta.classList.remove('js-affiliate');
      cta.setAttribute('href', '#voice-message');
      ctaCopy.textContent = text.listen;
      phone?.classList.remove('rmc-voice-ready');
      panel?.classList.remove('is-started', 'is-complete');
    } else {
      cta.classList.add('js-affiliate');
      cta.setAttribute('href', cta.dataset.rmcOriginalHref);
      ctaCopy.textContent = mode === 'complete' ? text.complete : text.reply;
      phone?.classList.add('rmc-voice-ready');
      panel?.classList.toggle('is-started', mode === 'reply');
      panel?.classList.toggle('is-complete', mode === 'complete');
    }

    const stateLine = panel?.querySelector('.anna-voice-state');
    if (stateLine) stateLine.textContent = text.waiting;
  };

  const updateCopy = () => {
    const { panel } = getElements();
    if (!panel) return;
    const text = getText();
    const audio = panel.querySelector('.anna-voice-audio');
    panel.querySelector('.anna-voice-title').textContent = text.title;
    panel.querySelector('.anna-voice-badge').textContent = text.badge;
    panel.querySelector('.anna-voice-hint').textContent = text.hint;
    panel.querySelector('.anna-voice-play').setAttribute('aria-label', audio && !audio.paused ? text.pause : text.play);
    setCtaMode(stage);
  };

  const installPlayer = () => {
    const { phone, message, cta } = getElements();
    if (!phone || !message || !cta) return false;
    if (phone.querySelector('.anna-voice-panel')) return true;

    const panel = document.createElement('section');
    panel.id = 'voice-message';
    panel.className = 'anna-voice-panel anna-voice-panel--main';
    panel.innerHTML = `
      <div class="anna-voice-header">
        <div class="anna-voice-label"><strong class="anna-voice-title"></strong><span class="anna-voice-subtitle">Anna, 41</span></div>
        <span class="anna-voice-badge"></span>
      </div>
      <div class="anna-voice-controls">
        <button class="anna-voice-play" type="button" aria-label="">▶</button>
        <div class="anna-voice-track" aria-hidden="true"><span class="anna-voice-progress"></span></div>
        <span class="anna-voice-time">0:00</span>
      </div>
      <p class="anna-voice-hint"></p>
      <p class="anna-voice-state"></p>
      <audio class="anna-voice-audio" preload="metadata"></audio>
    `;
    cta.insertAdjacentElement('beforebegin', panel);

    const audio = panel.querySelector('.anna-voice-audio');
    const play = panel.querySelector('.anna-voice-play');
    const progress = panel.querySelector('.anna-voice-progress');
    const time = panel.querySelector('.anna-voice-time');
    audio.src = audioFiles[getLocale()] || audioFiles['en-GB'];

    play.addEventListener('click', async () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try { await audio.play(); }
      catch (_) { play.textContent = '▶'; play.setAttribute('aria-label', getText().play); }
    });

    cta.addEventListener('click', (event) => {
      if (stage !== 'listen') return;
      event.preventDefault();
      event.stopPropagation();
      panel.scrollIntoView({ behavior:'smooth', block:'center' });
      play.click();
      track('voice_cta_play');
    });

    audio.addEventListener('play', () => {
      play.textContent = '❚❚';
      play.setAttribute('aria-label', getText().pause);
      track('voice_message_play');
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => setCtaMode('reply'), CTA_UNLOCK_MS);
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
      setCtaMode('complete');
      track('voice_message_complete');
    });

    updateCopy();
    track('voice_message_visible');
    return true;
  };

  const focusMainVoice = (event) => {
    const notification = event.target.closest('.anna-notification[data-event-type="voice"]');
    if (!notification || event.target.closest('.anna-notification-close')) return false;
    event.preventDefault();
    event.stopImmediatePropagation();
    notification.classList.remove('is-visible');
    installPlayer();
    const { phone, panel } = getElements();
    phone?.scrollIntoView({ behavior:'smooth', block:'center' });
    panel?.classList.add('voice-focus');
    window.setTimeout(() => panel?.classList.remove('voice-focus'), 1500);
    track('voice_notification_open_main_profile');
    return true;
  };

  const initialise = () => {
    injectStyles();
    document.body.classList.add('rmc-hold-notification');
    window.setTimeout(() => document.body.classList.remove('rmc-hold-notification'), NOTIFICATION_DELAY_MS);

    if (!installPlayer()) {
      const observer = new MutationObserver(() => {
        if (installPlayer()) observer.disconnect();
      });
      observer.observe(document.body, { childList:true, subtree:true });
    }

    document.addEventListener('click', focusMainVoice, true);
    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(() => {
        installPlayer();
        const { panel } = getElements();
        if (!panel) return;
        const audio = panel.querySelector('.anna-voice-audio');
        audio.pause();
        audio.currentTime = 0;
        audio.src = audioFiles[getLocale()] || audioFiles['en-GB'];
        panel.querySelector('.anna-voice-progress').style.width = '0%';
        panel.querySelector('.anna-voice-time').textContent = '0:00';
        stage = 'reply';
        updateCopy();
      }, 0);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once:true });
  else initialise();
})();
