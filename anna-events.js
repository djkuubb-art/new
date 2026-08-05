(() => {
  const ANNA_IMAGE = 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:eco,c_fill,g_face,w_112,h_112/v1785806218/5_1_casfeq.png';
  const SESSION_KEY = 'rmc_anna_voice_notice_seen_v1';
  const FIRST_DELAY_MS = 8000;
  const VISIBLE_MS = 5200;
  const MOBILE_QUERY = '(max-width: 760px)';

  const copy = {
    'en-GB': { name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning for your reply...', voice: 'Sent you a voice note' },
    'en-US': { name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning to hear back from you...', voice: 'Sent you a voice message' },
    'en-SG': { name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning for your reply...', voice: 'Sent you a voice message' },
    de: { name: 'Anna', recently: 'Gerade eben', followUp: 'Gehst du mir aus dem Weg? Ich warte schon seit heute Morgen auf deine Antwort...', voice: 'Hat dir eine Sprachnachricht geschickt' },
    nl: { name: 'Anna', recently: 'Zojuist', followUp: 'Ontwijk je me? Ik wacht al sinds vanochtend op je reactie...', voice: 'Heeft je een spraakbericht gestuurd' },
    fr: { name: 'Anna', recently: 'À l’instant', followUp: 'Vous m’évitez ? J’attends votre réponse depuis ce matin...', voice: 'Vous a envoyé un message vocal' },
    it: { name: 'Anna', recently: 'Proprio ora', followUp: 'Mi stai evitando? Aspetto una tua risposta da stamattina...', voice: 'Ti ha inviato un messaggio vocale' },
    es: { name: 'Anna', recently: 'Ahora mismo', followUp: '¿Me estás evitando? Llevo toda la mañana esperando tu respuesta...', voice: 'Te ha enviado un mensaje de voz' },
    pt: { name: 'Anna', recently: 'Agora mesmo', followUp: 'Estás a evitar-me? Estou à espera da tua resposta desde esta manhã...', voice: 'Enviou-te uma mensagem de voz' },
    pl: { name: 'Anna', recently: 'Przed chwilą', followUp: 'Unikasz mnie? Czekam od rana na odpowiedź...', voice: 'Wysłała Ci wiadomość głosową' },
    sv: { name: 'Anna', recently: 'Precis nu', followUp: 'Undviker du mig? Jag har väntat på ditt svar hela morgonen...', voice: 'Har skickat ett röstmeddelande till dig' },
    no: { name: 'Anna', recently: 'Akkurat nå', followUp: 'Unngår du meg? Jeg har ventet på svar fra deg hele morgenen...', voice: 'Har sendt deg en talemelding' },
    da: { name: 'Anna', recently: 'Lige nu', followUp: 'Undgår du mig? Jeg har ventet på dit svar hele morgenen...', voice: 'Har sendt dig en talebesked' },
    fi: { name: 'Anna', recently: 'Juuri nyt', followUp: 'Vältteletkö minua? Olen odottanut vastaustasi koko aamun...', voice: 'Lähetti sinulle ääniviestin' },
    el: { name: 'Άννα', recently: 'Μόλις τώρα', followUp: 'Με αποφεύγεις; Περιμένω την απάντησή σου από το πρωί...', voice: 'Σου έστειλε φωνητικό μήνυμα' },
    hr: { name: 'Anna', recently: 'Upravo sada', followUp: 'Izbjegavaš me? Od jutros čekam tvoj odgovor...', voice: 'Poslala ti je glasovnu poruku' },
    sl: { name: 'Anna', recently: 'Pravkar', followUp: 'Se me izogibaš? Že od jutra čakam na tvoj odgovor...', voice: 'Poslala ti je glasovno sporočilo' },
    sk: { name: 'Anna', recently: 'Práve teraz', followUp: 'Vyhýbaš sa mi? Od rána čakám na tvoju odpoveď...', voice: 'Poslala ti hlasovú správu' },
    cs: { name: 'Anna', recently: 'Právě teď', followUp: 'Vyhýbáš se mi? Od rána čekám na tvoji odpověď...', voice: 'Poslala ti hlasovou zprávu' },
    hu: { name: 'Anna', recently: 'Épp most', followUp: 'Kerülsz engem? Reggel óta várom a válaszod...', voice: 'Hangüzenetet küldött neked' },
    he: { name: 'אנה', recently: 'עכשיו', followUp: 'אתה מתחמק ממני? אני מחכה לתשובה שלך מאז הבוקר...', voice: 'שלחה לך הודעה קולית' }
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

  const getCurrentCopy = () => copy[getLocale()] || copy['en-GB'];
  const mobileMedia = window.matchMedia(MOBILE_QUERY);
  let showTimer = 0;
  let hideTimer = 0;
  let notification = null;

  const hasBeenSeen = () => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; }
    catch (_) { return false; }
  };

  const markSeen = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1'); }
    catch (_) {}
  };

  const applyFollowUp = () => {
    const node = document.querySelector('.mini-message [data-i18n="messagePreview"], .mini-message p span:last-child');
    if (!node) return;
    node.removeAttribute('data-i18n');
    node.setAttribute('data-role', 'anna-follow-up');
    node.textContent = getCurrentCopy().followUp;
  };

  const hideNotification = () => {
    window.clearTimeout(hideTimer);
    notification?.classList.remove('is-visible');
  };

  const createNotification = () => {
    if (mobileMedia.matches || notification) return notification;

    const region = document.createElement('div');
    region.className = 'anna-notification-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');

    notification = document.createElement('article');
    notification.className = 'anna-notification';
    notification.tabIndex = 0;
    notification.setAttribute('role', 'button');
    notification.dataset.eventType = 'voice';
    notification.style.setProperty('--anna-visible-time', `${VISIBLE_MS}ms`);
    notification.innerHTML = `
      <span class="anna-notification-avatar">
        <img src="${ANNA_IMAGE}" alt="Anna" width="112" height="112" loading="lazy" decoding="async" />
        <span class="anna-notification-icon" aria-hidden="true">▶</span>
      </span>
      <span class="anna-notification-copy">
        <strong></strong>
        <p></p>
        <span class="anna-notification-time"></span>
      </span>
      <button class="anna-notification-close" type="button" aria-label="Close">×</button>
    `;

    const openAnnaFlow = () => {
      markSeen();
      hideNotification();
      const heroCta = document.querySelector('.hero-actions .js-affiliate');
      if (heroCta instanceof HTMLElement) heroCta.click();
    };

    notification.addEventListener('click', (event) => {
      if (event.target.closest('.anna-notification-close')) return;
      openAnnaFlow();
    });

    notification.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openAnnaFlow();
    });

    notification.querySelector('.anna-notification-close')?.addEventListener('click', (event) => {
      event.stopPropagation();
      markSeen();
      hideNotification();
    });

    region.appendChild(notification);
    document.body.appendChild(region);
    return notification;
  };

  const renderNotification = () => {
    const current = getCurrentCopy();
    const node = createNotification();
    if (!node) return;

    const title = node.querySelector('strong');
    const text = node.querySelector('p');
    const time = node.querySelector('.anna-notification-time');
    const image = node.querySelector('img');

    if (title) title.textContent = `${current.name}, 41`;
    if (text) text.textContent = current.voice;
    if (time) time.textContent = current.recently;
    if (image) image.alt = current.name;
  };

  const scheduleNotification = (delay = FIRST_DELAY_MS) => {
    window.clearTimeout(showTimer);
    if (mobileMedia.matches || hasBeenSeen()) return;
    showTimer = window.setTimeout(showNotification, delay);
  };

  const showNotification = () => {
    window.clearTimeout(showTimer);
    if (mobileMedia.matches || hasBeenSeen()) return;

    if (document.hidden || document.querySelector('dialog[open]')) {
      scheduleNotification(2500);
      return;
    }

    renderNotification();
    if (!notification) return;
    markSeen();
    requestAnimationFrame(() => notification?.classList.add('is-visible'));
    hideTimer = window.setTimeout(hideNotification, VISIBLE_MS);
  };

  const updateLanguage = () => {
    applyFollowUp();
    if (notification?.classList.contains('is-visible')) renderNotification();
  };

  const handleViewportChange = () => {
    if (mobileMedia.matches) {
      window.clearTimeout(showTimer);
      hideNotification();
      notification?.parentElement?.remove();
      notification = null;
      return;
    }
    if (!hasBeenSeen()) scheduleNotification(2000);
  };

  const initialise = () => {
    applyFollowUp();

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(updateLanguage, 0);
    });

    new MutationObserver(() => window.setTimeout(updateLanguage, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    if (typeof mobileMedia.addEventListener === 'function') {
      mobileMedia.addEventListener('change', handleViewportChange);
    } else if (typeof mobileMedia.addListener === 'function') {
      mobileMedia.addListener(handleViewportChange);
    }

    if (!mobileMedia.matches && !hasBeenSeen()) {
      createNotification();
      scheduleNotification();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
