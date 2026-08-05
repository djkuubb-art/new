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
    'en-GB': { open:'Open profile', close:'Close profile', online:'Online now', about:'About me', voice:'Voice message', play:'Play', pause:'Pause', last:'Latest message', message:'I don’t think I’ve told you the most important thing yet…', cta:'Open conversation', label:'Anna’s profile' },
    'en-US': { open:'Open profile', close:'Close profile', online:'Online now', about:'About me', voice:'Voice message', play:'Play', pause:'Pause', last:'Latest message', message:'I don’t think I’ve told you the most important thing yet…', cta:'Open conversation', label:'Anna’s profile' },
    'en-SG': { open:'Open profile', close:'Close profile', online:'Online now', about:'About me', voice:'Voice message', play:'Play', pause:'Pause', last:'Latest message', message:'I don’t think I’ve told you the most important thing yet…', cta:'Open conversation', label:'Anna’s profile' },
    de: { open:'Profil öffnen', close:'Profil schließen', online:'Jetzt online', about:'Über mich', voice:'Sprachnachricht', play:'Abspielen', pause:'Pausieren', last:'Letzte Nachricht', message:'Ich glaube, ich habe dir das Wichtigste noch gar nicht gesagt …', cta:'Unterhaltung öffnen', label:'Annas Profil' },
    nl: { open:'Profiel openen', close:'Profiel sluiten', online:'Nu online', about:'Over mij', voice:'Spraakbericht', play:'Afspelen', pause:'Pauzeren', last:'Laatste bericht', message:'Volgens mij heb ik je het belangrijkste nog niet verteld…', cta:'Gesprek openen', label:'Anna’s profiel' },
    fr: { open:'Ouvrir le profil', close:'Fermer le profil', online:'En ligne maintenant', about:'À propos de moi', voice:'Message vocal', play:'Écouter', pause:'Pause', last:'Dernier message', message:'Je crois que je ne t’ai pas encore dit le plus important…', cta:'Ouvrir la conversation', label:'Profil d’Anna' },
    it: { open:'Apri il profilo', close:'Chiudi il profilo', online:'Online adesso', about:'Su di me', voice:'Messaggio vocale', play:'Riproduci', pause:'Pausa', last:'Ultimo messaggio', message:'Credo di non averti ancora detto la cosa più importante…', cta:'Apri la conversazione', label:'Profilo di Anna' },
    es: { open:'Abrir perfil', close:'Cerrar perfil', online:'En línea ahora', about:'Sobre mí', voice:'Mensaje de voz', play:'Reproducir', pause:'Pausar', last:'Último mensaje', message:'Creo que todavía no te he contado lo más importante…', cta:'Abrir conversación', label:'Perfil de Anna' },
    pt: { open:'Abrir perfil', close:'Fechar perfil', online:'Online agora', about:'Sobre mim', voice:'Mensagem de voz', play:'Ouvir', pause:'Pausar', last:'Última mensagem', message:'Acho que ainda não te contei o mais importante…', cta:'Abrir conversa', label:'Perfil da Anna' },
    pl: { open:'Otwórz profil', close:'Zamknij profil', online:'Teraz online', about:'O mnie', voice:'Wiadomość głosowa', play:'Odtwórz', pause:'Wstrzymaj', last:'Ostatnia wiadomość', message:'Chyba nie powiedziałam Ci jeszcze najważniejszego…', cta:'Otwórz rozmowę', label:'Profil Anny' },
    sv: { open:'Öppna profil', close:'Stäng profil', online:'Online nu', about:'Om mig', voice:'Röstmeddelande', play:'Spela', pause:'Pausa', last:'Senaste meddelandet', message:'Jag tror inte att jag har berättat det viktigaste för dig än…', cta:'Öppna konversationen', label:'Annas profil' },
    no: { open:'Åpne profil', close:'Lukk profil', online:'Pålogget nå', about:'Om meg', voice:'Talemelding', play:'Spill av', pause:'Pause', last:'Siste melding', message:'Jeg tror ikke jeg har fortalt deg det viktigste ennå…', cta:'Åpne samtalen', label:'Annas profil' },
    da: { open:'Åbn profil', close:'Luk profil', online:'Online nu', about:'Om mig', voice:'Talebesked', play:'Afspil', pause:'Pause', last:'Seneste besked', message:'Jeg tror ikke, jeg har fortalt dig det vigtigste endnu…', cta:'Åbn samtalen', label:'Annas profil' },
    fi: { open:'Avaa profiili', close:'Sulje profiili', online:'Paikalla nyt', about:'Tietoa minusta', voice:'Ääniviesti', play:'Toista', pause:'Tauko', last:'Viimeisin viesti', message:'Luulen, etten ole vielä kertonut sinulle sitä kaikkein tärkeintä…', cta:'Avaa keskustelu', label:'Annan profiili' },
    el: { open:'Άνοιγμα προφίλ', close:'Κλείσιμο προφίλ', online:'Συνδεδεμένη τώρα', about:'Σχετικά με μένα', voice:'Φωνητικό μήνυμα', play:'Αναπαραγωγή', pause:'Παύση', last:'Τελευταίο μήνυμα', message:'Νομίζω πως δεν σου έχω πει ακόμα το πιο σημαντικό…', cta:'Άνοιγμα συνομιλίας', label:'Το προφίλ της Άννας' },
    hr: { open:'Otvori profil', close:'Zatvori profil', online:'Sada online', about:'O meni', voice:'Glasovna poruka', play:'Reproduciraj', pause:'Pauziraj', last:'Posljednja poruka', message:'Mislim da ti još nisam rekla ono najvažnije…', cta:'Otvori razgovor', label:'Annin profil' },
    sl: { open:'Odpri profil', close:'Zapri profil', online:'Trenutno na spletu', about:'O meni', voice:'Glasovno sporočilo', play:'Predvajaj', pause:'Premor', last:'Zadnje sporočilo', message:'Mislim, da ti še nisem povedala tistega najpomembnejšega…', cta:'Odpri pogovor', label:'Annin profil' },
    sk: { open:'Otvoriť profil', close:'Zavrieť profil', online:'Práve online', about:'O mne', voice:'Hlasová správa', play:'Prehrať', pause:'Pozastaviť', last:'Posledná správa', message:'Myslím, že som ti ešte nepovedala to najdôležitejšie…', cta:'Otvoriť rozhovor', label:'Annin profil' },
    cs: { open:'Otevřít profil', close:'Zavřít profil', online:'Právě online', about:'O mně', voice:'Hlasová zpráva', play:'Přehrát', pause:'Pozastavit', last:'Poslední zpráva', message:'Myslím, že jsem ti ještě neřekla to nejdůležitější…', cta:'Otevřít konverzaci', label:'Profil Anny' },
    hu: { open:'Profil megnyitása', close:'Profil bezárása', online:'Most online', about:'Rólam', voice:'Hangüzenet', play:'Lejátszás', pause:'Szünet', last:'Legutóbbi üzenet', message:'Azt hiszem, a legfontosabbat még nem is mondtam el neked…', cta:'Beszélgetés megnyitása', label:'Anna profilja' },
    he: { open:'פתיחת הפרופיל', close:'סגירת הפרופיל', online:'מחוברת עכשיו', about:'קצת עליי', voice:'הודעה קולית', play:'השמעה', pause:'השהיה', last:'ההודעה האחרונה', message:'נראה לי שעוד לא סיפרתי לך את הדבר הכי חשוב…', cta:'פתיחת השיחה', label:'הפרופיל של אנה' }
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
    document.getElementById('languageSelect')?.value || document.documentElement.lang || navigator.language
  );
  const getCopy = () => copy[getLocale()] || copy['en-GB'];
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
  };

  let overlay;
  let sheet;
  let audio;
  let opener;
  let startY = 0;
  let currentY = 0;
  let dragging = false;

  const getProfile = () => {
    const hero = document.querySelector('.featured-profile');
    const card = document.querySelector('.profile-card-premium');
    const title = hero?.querySelector('h2')?.textContent?.trim() || 'Anna, 41';
    const city = hero?.querySelector('[data-profile="0-city"]')?.textContent?.trim() || '';
    const distance = card?.querySelector('[data-profile-distance="0"]')?.textContent?.trim() || '';
    const bio = card?.querySelector('[data-profile-bio="0"]')?.textContent?.trim() || '';
    const image = hero?.querySelector(':scope > img');
    return { title, city, distance, bio, src: image?.currentSrc || image?.src || '', srcset: image?.srcset || '' };
  };

  const track = (slot, extra = {}) => {
    if (typeof window.rmcTrack === 'function') {
      window.rmcTrack('profile_open', { slot, component: 'profile-preview', ...extra });
    }
  };

  const setPlayState = () => {
    if (!overlay || !audio) return;
    const button = overlay.querySelector('.profile-preview-play');
    const text = getCopy();
    const playing = !audio.paused;
    button.textContent = playing ? '❚❚' : '▶';
    button.setAttribute('aria-label', playing ? text.pause : text.play);
    overlay.querySelector('.profile-preview-play-copy').textContent = playing ? text.pause : text.play;
  };

  const updateProgress = () => {
    if (!overlay || !audio) return;
    const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    const percent = duration ? Math.min(100, (audio.currentTime / duration) * 100) : 0;
    overlay.querySelector('.profile-preview-progress').style.width = `${percent}%`;
    overlay.querySelector('.profile-preview-time').textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
  };

  const updateContent = () => {
    if (!overlay) return;
    const text = getCopy();
    const profile = getProfile();
    const image = overlay.querySelector('.profile-preview-photo');
    image.src = profile.src;
    if (profile.srcset) image.srcset = profile.srcset;
    else image.removeAttribute('srcset');
    image.alt = profile.title;

    overlay.setAttribute('aria-label', text.label);
    overlay.querySelector('.profile-preview-close').setAttribute('aria-label', text.close);
    overlay.querySelector('.profile-preview-handle').setAttribute('aria-label', text.close);
    overlay.querySelector('.profile-preview-title').textContent = profile.title;
    overlay.querySelector('.profile-preview-online-copy').textContent = text.online;
    overlay.querySelector('.profile-preview-location').textContent = [profile.city, profile.distance].filter(Boolean).join(' · ');
    overlay.querySelector('.profile-preview-about-label').textContent = text.about;
    overlay.querySelector('.profile-preview-bio').textContent = profile.bio;
    overlay.querySelector('.profile-preview-voice-label').textContent = text.voice;
    overlay.querySelector('.profile-preview-last-label').textContent = text.last;
    overlay.querySelector('.profile-preview-message').textContent = text.message;
    overlay.querySelector('.profile-preview-cta-copy').textContent = text.cta;

    const hint = document.querySelector('.profile-preview-open-hint');
    if (hint) hint.textContent = text.open;

    if (audio) {
      const nextSrc = audioFiles[getLocale()] || audioFiles['en-GB'];
      if (!audio.src.endsWith(nextSrc)) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = nextSrc;
        updateProgress();
      }
      setPlayState();
    }
  };

  const close = () => {
    if (!overlay || overlay.hidden) return;
    audio?.pause();
    overlay.classList.remove('is-open');
    document.body.classList.remove('profile-preview-lock');
    window.setTimeout(() => { overlay.hidden = true; }, 220);
    opener?.focus?.({ preventScroll: true });
  };

  const open = (trigger) => {
    if (!overlay) return;
    opener = trigger || document.activeElement;
    updateContent();
    overlay.hidden = false;
    document.body.classList.add('profile-preview-lock');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    overlay.querySelector('.profile-preview-close')?.focus({ preventScroll: true });
    track('profile-preview-open');
  };

  const create = () => {
    if (document.getElementById('profilePreview')) return;
    overlay = document.createElement('div');
    overlay.id = 'profilePreview';
    overlay.className = 'profile-preview-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="profile-preview-backdrop" data-profile-preview-close></div>
      <section class="profile-preview-sheet">
        <button type="button" class="profile-preview-handle" data-profile-preview-close><span></span></button>
        <button type="button" class="profile-preview-close" data-profile-preview-close>×</button>
        <div class="profile-preview-media">
          <img class="profile-preview-photo" alt="" decoding="async">
          <div class="profile-preview-photo-shade"></div>
          <div class="profile-preview-photo-copy">
            <span class="profile-preview-online"><i></i><span class="profile-preview-online-copy"></span></span>
            <h2 class="profile-preview-title"></h2>
            <p class="profile-preview-location"></p>
          </div>
        </div>
        <div class="profile-preview-content">
          <div class="profile-preview-section">
            <span class="profile-preview-label profile-preview-about-label"></span>
            <p class="profile-preview-bio"></p>
          </div>
          <div class="profile-preview-section profile-preview-voice">
            <div class="profile-preview-section-head">
              <span class="profile-preview-label profile-preview-voice-label"></span>
              <span class="profile-preview-private">♥ RealMeetClub</span>
            </div>
            <div class="profile-preview-audio-row">
              <button type="button" class="profile-preview-play" aria-label="">▶</button>
              <div class="profile-preview-track" aria-hidden="true"><span class="profile-preview-progress"></span></div>
              <span class="profile-preview-time">0:00</span>
            </div>
            <span class="profile-preview-play-copy"></span>
            <audio class="profile-preview-audio" preload="metadata"></audio>
          </div>
          <div class="profile-preview-section profile-preview-message-box">
            <span class="profile-preview-label profile-preview-last-label"></span>
            <p class="profile-preview-message"></p>
          </div>
          <a class="profile-preview-cta js-affiliate" data-slot="profile-preview" href="/api/go?slot=profile-preview">
            <span class="profile-preview-cta-copy"></span><span aria-hidden="true">→</span>
          </a>
        </div>
      </section>`;
    document.body.appendChild(overlay);
    sheet = overlay.querySelector('.profile-preview-sheet');
    audio = overlay.querySelector('.profile-preview-audio');
    audio.src = audioFiles[getLocale()] || audioFiles['en-GB'];

    overlay.addEventListener('click', (event) => {
      if (event.target.closest('[data-profile-preview-close]')) close();
    });

    overlay.querySelector('.profile-preview-play').addEventListener('click', async () => {
      const mainAudio = document.querySelector('.anna-voice-audio');
      if (!audio.paused) {
        audio.pause();
        return;
      }
      mainAudio?.pause();
      try {
        await audio.play();
        track('profile-preview-voice-play');
      } catch (_) {
        setPlayState();
      }
    });

    overlay.querySelector('.profile-preview-cta').addEventListener('click', () => {
      window.setTimeout(close, 0);
    });

    audio.addEventListener('play', setPlayState);
    audio.addEventListener('pause', setPlayState);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setPlayState();
      updateProgress();
      track('profile-preview-voice-complete');
    });

    sheet.addEventListener('touchstart', (event) => {
      if (window.innerWidth > 760 || event.target.closest('button, a, audio')) return;
      startY = event.touches[0].clientY;
      currentY = startY;
      dragging = true;
      sheet.classList.add('is-dragging');
    }, { passive: true });
    sheet.addEventListener('touchmove', (event) => {
      if (!dragging) return;
      currentY = event.touches[0].clientY;
      const delta = Math.max(0, currentY - startY);
      sheet.style.transform = `translateY(${Math.min(delta, 180)}px)`;
    }, { passive: true });
    sheet.addEventListener('touchend', () => {
      if (!dragging) return;
      const delta = currentY - startY;
      dragging = false;
      sheet.classList.remove('is-dragging');
      sheet.style.transform = '';
      if (delta > 90) close();
    });

    updateContent();
  };

  const installTriggers = () => {
    const featured = document.querySelector('.featured-profile');
    const invite = document.querySelector('.invite-preview');
    if (!featured) return;

    featured.classList.add('profile-preview-trigger');
    featured.setAttribute('tabindex', '0');
    featured.setAttribute('role', 'button');
    featured.setAttribute('aria-haspopup', 'dialog');

    if (!featured.querySelector('.profile-preview-open-hint')) {
      const hint = document.createElement('span');
      hint.className = 'profile-preview-open-hint';
      featured.appendChild(hint);
    }

    const activate = (event, trigger) => {
      if (event.target.closest('.heart-button, .js-affiliate')) return;
      event.preventDefault();
      event.stopPropagation();
      open(trigger);
    };

    featured.addEventListener('click', (event) => activate(event, featured));
    featured.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') activate(event, featured);
    });

    if (invite) {
      invite.classList.add('profile-preview-trigger', 'profile-preview-trigger--invite');
      invite.setAttribute('tabindex', '0');
      invite.setAttribute('role', 'button');
      invite.setAttribute('aria-haspopup', 'dialog');
      invite.addEventListener('click', (event) => activate(event, invite));
      invite.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') activate(event, invite);
      });
    }
  };

  const initialise = () => {
    create();
    installTriggers();
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay && !overlay.hidden) close();
    });
    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(updateContent, 40);
    });
    new MutationObserver(() => {
      if (overlay && !overlay.hidden) updateContent();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();
