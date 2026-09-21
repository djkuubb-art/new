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
    'en-GB': { title: 'Voice note from Maria', play: 'Play Maria’s voice note', pause: 'Pause Maria’s voice note', listened: 'Listened' },
    'en-US': { title: 'Voice note from Maria', play: 'Play Maria’s voice note', pause: 'Pause Maria’s voice note', listened: 'Listened' },
    'en-SG': { title: 'Voice note from Maria', play: 'Play Maria’s voice note', pause: 'Pause Maria’s voice note', listened: 'Listened' },
    de: { title: 'Sprachnachricht von Maria', play: 'Marias Sprachnachricht abspielen', pause: 'Marias Sprachnachricht pausieren', listened: 'Angehört' },
    nl: { title: 'Spraakbericht van Maria', play: 'Maria’s spraakbericht afspelen', pause: 'Maria’s spraakbericht pauzeren', listened: 'Beluisterd' },
    fr: { title: 'Message vocal de Marie', play: 'Écouter le message vocal de Marie', pause: 'Mettre le message vocal en pause', listened: 'Écouté' },
    it: { title: 'Messaggio vocale di Maria', play: 'Ascolta il messaggio vocale di Maria', pause: 'Metti in pausa il messaggio vocale', listened: 'Ascoltato' },
    es: { title: 'Mensaje de voz de María', play: 'Escuchar el mensaje de voz de María', pause: 'Pausar el mensaje de voz', listened: 'Escuchado' },
    pt: { title: 'Mensagem de voz da Maria', play: 'Ouvir a mensagem de voz da Maria', pause: 'Pausar a mensagem de voz', listened: 'Ouvida' },
    pl: { title: 'Głosówka od Marii', play: 'Odtwórz głosówkę od Marii', pause: 'Wstrzymaj głosówkę od Marii', listened: 'Odsłuchano' },
    sv: { title: 'Röstmeddelande från Maria', play: 'Spela Marias röstmeddelande', pause: 'Pausa Marias röstmeddelande', listened: 'Avlyssnat' },
    no: { title: 'Talemelding fra Maria', play: 'Spill av talemeldingen fra Maria', pause: 'Sett talemeldingen på pause', listened: 'Avspilt' },
    da: { title: 'Talebesked fra Maria', play: 'Afspil talebeskeden fra Maria', pause: 'Sæt talebeskeden på pause', listened: 'Aflyttet' },
    fi: { title: 'Ääniviesti Marialta', play: 'Toista Marian ääniviesti', pause: 'Keskeytä Marian ääniviesti', listened: 'Kuunneltu' },
    el: { title: 'Φωνητικό μήνυμα από τη Μαρία', play: 'Άκουσε το φωνητικό μήνυμα της Μαρίας', pause: 'Παύση φωνητικού μηνύματος', listened: 'Ακούστηκε' },
    hr: { title: 'Glasovna poruka od Marije', play: 'Poslušaj Marijinu glasovnu poruku', pause: 'Pauziraj glasovnu poruku', listened: 'Poslušano' },
    sl: { title: 'Glasovno sporočilo od Marije', play: 'Predvajaj Marijino glasovno sporočilo', pause: 'Začasno ustavi glasovno sporočilo', listened: 'Poslušano' },
    sk: { title: 'Hlasová správa od Márie', play: 'Prehrať Máriinu hlasovú správu', pause: 'Pozastaviť hlasovú správu', listened: 'Vypočuté' },
    cs: { title: 'Hlasová zpráva od Marie', play: 'Přehrát Mariinu hlasovou zprávu', pause: 'Pozastavit hlasovou zprávu', listened: 'Poslechnuto' },
    hu: { title: 'Hangüzenet Máriától', play: 'Mária hangüzenetének lejátszása', pause: 'Hangüzenet szüneteltetése', listened: 'Meghallgatva' },
    he: { title: 'הודעה קולית ממריה', play: 'השמעת ההודעה הקולית של מריה', pause: 'השהיית ההודעה הקולית', listened: 'נשמע' }
  };

  let activeAudio = null;
  let activePill = null;
  let hasCompleted = false;

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

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:08';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
  };

  const track = (eventName, details = {}) => {
    const payload = { event: eventName, locale: getLocale(), profile: 'Anna', placement: 'profile-photo', ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, payload);
  };

  const updateCopy = () => {
    if (!activePill || !activeAudio) return;
    const text = getText();
    const label = activePill.querySelector('.voice-pill__label');
    const icon = activePill.querySelector('.voice-pill__icon');

    if (hasCompleted) {
      label.textContent = text.listened;
      icon.textContent = '✓';
      activePill.setAttribute('aria-label', text.listened);
      return;
    }

    label.textContent = text.title;
    icon.textContent = activeAudio.paused ? '▶' : '❚❚';
    activePill.setAttribute('aria-label', activeAudio.paused ? text.play : text.pause);
  };

  const resetPlayer = () => {
    if (!activeAudio || !activePill) return;
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio.src = audioFiles[getLocale()] || audioFiles['en-GB'];
    hasCompleted = false;
    activePill.classList.remove('is-playing', 'is-complete', 'voice-focus');
    activePill.querySelector('.voice-pill__progress-bar').style.width = '0%';
    activePill.querySelector('.voice-pill__time').textContent = '0:08';
    updateCopy();
  };

  const installPlayer = () => {
    const featured = document.querySelector('.hero-invite .featured-profile');
    if (!featured) return false;

    featured.closest('.phone-card')?.querySelector('.anna-voice-panel')?.remove();

    const existing = featured.querySelector('.voice-pill');
    if (existing) {
      activePill = existing;
      activeAudio = existing.querySelector('.voice-pill__audio');
      updateCopy();
      return true;
    }

    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'voice-pill';
    pill.innerHTML = `
      <span class="voice-pill__progress" aria-hidden="true"><span class="voice-pill__progress-bar"></span></span>
      <span class="voice-pill__icon" aria-hidden="true">▶</span>
      <span class="voice-pill__label"></span>
      <span class="voice-pill__time">0:08</span>
      <span class="voice-pill__lock" aria-hidden="true">🔒</span>
      <audio class="voice-pill__audio" preload="metadata"></audio>
    `;
    featured.appendChild(pill);

    const audio = pill.querySelector('.voice-pill__audio');
    const progress = pill.querySelector('.voice-pill__progress-bar');
    const time = pill.querySelector('.voice-pill__time');
    audio.src = audioFiles[getLocale()] || audioFiles['en-GB'];

    activePill = pill;
    activeAudio = audio;
    updateCopy();

    pill.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (hasCompleted) {
        audio.currentTime = 0;
        hasCompleted = false;
        pill.classList.remove('is-complete');
        progress.style.width = '0%';
      }

      if (!audio.paused) {
        audio.pause();
        return;
      }

      try {
        await audio.play();
      } catch (_) {
        pill.classList.remove('is-playing');
        updateCopy();
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      time.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('play', () => {
      pill.classList.add('is-playing');
      pill.classList.remove('is-complete');
      updateCopy();
      track('voice_message_play');
    });

    audio.addEventListener('pause', () => {
      pill.classList.remove('is-playing');
      updateCopy();
    });

    audio.addEventListener('timeupdate', () => {
      const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
      const percent = duration ? Math.min(100, (audio.currentTime / duration) * 100) : 0;
      progress.style.width = `${percent}%`;
      time.textContent = formatTime(Math.max(0, duration - audio.currentTime));
    });

    audio.addEventListener('ended', () => {
      hasCompleted = true;
      pill.classList.remove('is-playing');
      pill.classList.add('is-complete');
      progress.style.width = '100%';
      time.textContent = '✓';
      updateCopy();
      track('voice_message_complete');
    });

    track('voice_message_visible');
    return true;
  };

  const openFromNotification = (event) => {
    const notification = event.target.closest('.anna-notification[data-event-type="voice"]');
    if (!notification || event.target.closest('.anna-notification-close')) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    notification.classList.remove('is-visible');

    installPlayer();
    activePill?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    activePill?.classList.add('voice-focus');
    window.setTimeout(() => activePill?.classList.remove('voice-focus'), 1500);
    activePill?.click();
    track('voice_notification_open_main_profile');
  };

  const initialise = () => {
    if (!installPlayer()) {
      const observer = new MutationObserver(() => {
        if (installPlayer()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('click', openFromNotification, true);
    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(resetPlayer, 0);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();