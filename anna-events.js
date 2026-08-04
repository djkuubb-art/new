(() => {
  const ANNA_IMAGE = 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:eco,c_fill,g_face,w_112,h_112/v1785806218/5_1_casfeq.png';
  const VISIBLE_MS = 6200;
  const FIRST_DELAY_MS = 4500;
  const NEXT_DELAY_MS = 9000;

  const copy = {
    'en-GB': {
      name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning for your reply...',
      events: [
        { type: 'voice', icon: '▶', text: 'Sent you a voice note' },
        { type: 'photo', icon: '▣', text: 'Sent you a photo' },
        { type: 'date', icon: '♥', text: 'Invited you on a date' }
      ]
    },
    'en-US': {
      name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning to hear back from you...',
      events: [
        { type: 'voice', icon: '▶', text: 'Sent you a voice message' },
        { type: 'photo', icon: '▣', text: 'Sent you a photo' },
        { type: 'date', icon: '♥', text: 'Invited you on a date' }
      ]
    },
    'en-SG': {
      name: 'Anna', recently: 'Just now', followUp: 'Are you avoiding me? I’ve been waiting all morning for your reply...',
      events: [
        { type: 'voice', icon: '▶', text: 'Sent you a voice message' },
        { type: 'photo', icon: '▣', text: 'Sent you a photo' },
        { type: 'date', icon: '♥', text: 'Invited you on a date' }
      ]
    },
    de: {
      name: 'Anna', recently: 'Gerade eben', followUp: 'Gehst du mir aus dem Weg? Ich warte schon seit heute Morgen auf deine Antwort...',
      events: [
        { type: 'voice', icon: '▶', text: 'Hat dir eine Sprachnachricht geschickt' },
        { type: 'photo', icon: '▣', text: 'Hat dir ein Foto geschickt' },
        { type: 'date', icon: '♥', text: 'Hat dich zu einem Date eingeladen' }
      ]
    },
    nl: {
      name: 'Anna', recently: 'Zojuist', followUp: 'Ontwijk je me? Ik wacht al sinds vanochtend op je reactie...',
      events: [
        { type: 'voice', icon: '▶', text: 'Heeft je een spraakbericht gestuurd' },
        { type: 'photo', icon: '▣', text: 'Heeft je een foto gestuurd' },
        { type: 'date', icon: '♥', text: 'Heeft je voor een date uitgenodigd' }
      ]
    },
    fr: {
      name: 'Anna', recently: 'À l’instant', followUp: 'Vous m’évitez ? J’attends votre réponse depuis ce matin...',
      events: [
        { type: 'voice', icon: '▶', text: 'Vous a envoyé un message vocal' },
        { type: 'photo', icon: '▣', text: 'Vous a envoyé une photo' },
        { type: 'date', icon: '♥', text: 'Vous a proposé un rendez-vous' }
      ]
    },
    it: {
      name: 'Anna', recently: 'Proprio ora', followUp: 'Mi stai evitando? Aspetto una tua risposta da stamattina...',
      events: [
        { type: 'voice', icon: '▶', text: 'Ti ha inviato un messaggio vocale' },
        { type: 'photo', icon: '▣', text: 'Ti ha inviato una foto' },
        { type: 'date', icon: '♥', text: 'Ti ha invitato a uscire' }
      ]
    },
    es: {
      name: 'Anna', recently: 'Ahora mismo', followUp: '¿Me estás evitando? Llevo toda la mañana esperando tu respuesta...',
      events: [
        { type: 'voice', icon: '▶', text: 'Te ha enviado un mensaje de voz' },
        { type: 'photo', icon: '▣', text: 'Te ha enviado una foto' },
        { type: 'date', icon: '♥', text: 'Te ha invitado a una cita' }
      ]
    },
    pt: {
      name: 'Anna', recently: 'Agora mesmo', followUp: 'Estás a evitar-me? Estou à espera da tua resposta desde esta manhã...',
      events: [
        { type: 'voice', icon: '▶', text: 'Enviou-te uma mensagem de voz' },
        { type: 'photo', icon: '▣', text: 'Enviou-te uma fotografia' },
        { type: 'date', icon: '♥', text: 'Convidou-te para um encontro' }
      ]
    },
    pl: {
      name: 'Anna', recently: 'Przed chwilą', followUp: 'Unikasz mnie? Czekam od rana na odpowiedź...',
      events: [
        { type: 'voice', icon: '▶', text: 'Wysłała Ci wiadomość głosową' },
        { type: 'photo', icon: '▣', text: 'Wysłała Ci zdjęcie' },
        { type: 'date', icon: '♥', text: 'Wysłała Ci zaproszenie na randkę' }
      ]
    },
    sv: {
      name: 'Anna', recently: 'Precis nu', followUp: 'Undviker du mig? Jag har väntat på ditt svar hela morgonen...',
      events: [
        { type: 'voice', icon: '▶', text: 'Har skickat ett röstmeddelande till dig' },
        { type: 'photo', icon: '▣', text: 'Har skickat en bild till dig' },
        { type: 'date', icon: '♥', text: 'Har bjudit ut dig på en dejt' }
      ]
    },
    no: {
      name: 'Anna', recently: 'Akkurat nå', followUp: 'Unngår du meg? Jeg har ventet på svar fra deg hele morgenen...',
      events: [
        { type: 'voice', icon: '▶', text: 'Har sendt deg en talemelding' },
        { type: 'photo', icon: '▣', text: 'Har sendt deg et bilde' },
        { type: 'date', icon: '♥', text: 'Har invitert deg på date' }
      ]
    },
    da: {
      name: 'Anna', recently: 'Lige nu', followUp: 'Undgår du mig? Jeg har ventet på dit svar hele morgenen...',
      events: [
        { type: 'voice', icon: '▶', text: 'Har sendt dig en talebesked' },
        { type: 'photo', icon: '▣', text: 'Har sendt dig et billede' },
        { type: 'date', icon: '♥', text: 'Har inviteret dig på en date' }
      ]
    },
    fi: {
      name: 'Anna', recently: 'Juuri nyt', followUp: 'Vältteletkö minua? Olen odottanut vastaustasi koko aamun...',
      events: [
        { type: 'voice', icon: '▶', text: 'Lähetti sinulle ääniviestin' },
        { type: 'photo', icon: '▣', text: 'Lähetti sinulle kuvan' },
        { type: 'date', icon: '♥', text: 'Kutsui sinut treffeille' }
      ]
    },
    el: {
      name: 'Άννα', recently: 'Μόλις τώρα', followUp: 'Με αποφεύγεις; Περιμένω την απάντησή σου από το πρωί...',
      events: [
        { type: 'voice', icon: '▶', text: 'Σου έστειλε φωνητικό μήνυμα' },
        { type: 'photo', icon: '▣', text: 'Σου έστειλε μια φωτογραφία' },
        { type: 'date', icon: '♥', text: 'Σε προσκάλεσε σε ραντεβού' }
      ]
    },
    hr: {
      name: 'Anna', recently: 'Upravo sada', followUp: 'Izbjegavaš me? Od jutros čekam tvoj odgovor...',
      events: [
        { type: 'voice', icon: '▶', text: 'Poslala ti je glasovnu poruku' },
        { type: 'photo', icon: '▣', text: 'Poslala ti je fotografiju' },
        { type: 'date', icon: '♥', text: 'Pozvala te na spoj' }
      ]
    },
    sl: {
      name: 'Anna', recently: 'Pravkar', followUp: 'Se me izogibaš? Že od jutra čakam na tvoj odgovor...',
      events: [
        { type: 'voice', icon: '▶', text: 'Poslala ti je glasovno sporočilo' },
        { type: 'photo', icon: '▣', text: 'Poslala ti je fotografijo' },
        { type: 'date', icon: '♥', text: 'Povabila te je na zmenek' }
      ]
    },
    sk: {
      name: 'Anna', recently: 'Práve teraz', followUp: 'Vyhýbaš sa mi? Od rána čakám na tvoju odpoveď...',
      events: [
        { type: 'voice', icon: '▶', text: 'Poslala ti hlasovú správu' },
        { type: 'photo', icon: '▣', text: 'Poslala ti fotografiu' },
        { type: 'date', icon: '♥', text: 'Pozvala ťa na rande' }
      ]
    },
    cs: {
      name: 'Anna', recently: 'Právě teď', followUp: 'Vyhýbáš se mi? Od rána čekám na tvoji odpověď...',
      events: [
        { type: 'voice', icon: '▶', text: 'Poslala ti hlasovou zprávu' },
        { type: 'photo', icon: '▣', text: 'Poslala ti fotku' },
        { type: 'date', icon: '♥', text: 'Pozvala tě na rande' }
      ]
    },
    hu: {
      name: 'Anna', recently: 'Épp most', followUp: 'Kerülsz engem? Reggel óta várom a válaszod...',
      events: [
        { type: 'voice', icon: '▶', text: 'Hangüzenetet küldött neked' },
        { type: 'photo', icon: '▣', text: 'Fényképet küldött neked' },
        { type: 'date', icon: '♥', text: 'Randira hívott' }
      ]
    },
    he: {
      name: 'אנה', recently: 'עכשיו', followUp: 'אתה מתחמק ממני? אני מחכה לתשובה שלך מאז הבוקר...',
      events: [
        { type: 'voice', icon: '▶', text: 'שלחה לך הודעה קולית' },
        { type: 'photo', icon: '▣', text: 'שלחה לך תמונה' },
        { type: 'date', icon: '♥', text: 'הזמינה אותך לדייט' }
      ]
    }
  };

  const normaliseLocale = (value = '') => {
    if (copy[value]) return value;
    const raw = String(value).toLowerCase();
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
  let eventIndex = 0;
  let showTimer = 0;
  let hideTimer = 0;
  let notification = null;

  const applyFollowUp = () => {
    const node = document.querySelector('.mini-message [data-i18n="messagePreview"], .mini-message p span:last-child');
    if (!node) return;
    node.removeAttribute('data-i18n');
    node.setAttribute('data-role', 'anna-follow-up');
    node.textContent = getCurrentCopy().followUp;
  };

  const createNotification = () => {
    if (notification) return notification;

    const region = document.createElement('div');
    region.className = 'anna-notification-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');

    notification = document.createElement('article');
    notification.className = 'anna-notification';
    notification.tabIndex = 0;
    notification.setAttribute('role', 'button');
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
      hideNotification();
      scheduleNext(NEXT_DELAY_MS);
    });

    region.appendChild(notification);
    document.body.appendChild(region);
    return notification;
  };

  const renderNotification = () => {
    const current = getCurrentCopy();
    const event = current.events[eventIndex % current.events.length];
    eventIndex += 1;

    const node = createNotification();
    const title = node.querySelector('strong');
    const text = node.querySelector('p');
    const time = node.querySelector('.anna-notification-time');
    const icon = node.querySelector('.anna-notification-icon');
    const image = node.querySelector('img');

    if (title) title.textContent = `${current.name}, 41`;
    if (text) text.textContent = event.text;
    if (time) time.textContent = current.recently;
    if (icon) icon.textContent = event.icon;
    if (image) image.alt = current.name;
    node.dataset.eventType = event.type;
  };

  const showNotification = () => {
    window.clearTimeout(showTimer);
    window.clearTimeout(hideTimer);

    if (document.hidden || document.querySelector('dialog[open]')) {
      scheduleNext(3500);
      return;
    }

    renderNotification();
    requestAnimationFrame(() => notification?.classList.add('is-visible'));
    hideTimer = window.setTimeout(() => {
      hideNotification();
      scheduleNext(NEXT_DELAY_MS);
    }, VISIBLE_MS);
  };

  function hideNotification() {
    window.clearTimeout(hideTimer);
    notification?.classList.remove('is-visible');
  }

  function scheduleNext(delay) {
    window.clearTimeout(showTimer);
    showTimer = window.setTimeout(showNotification, delay);
  }

  const updateLanguage = () => {
    applyFollowUp();
    if (notification?.classList.contains('is-visible')) renderNotification();
  };

  const initialise = () => {
    applyFollowUp();
    createNotification();
    scheduleNext(FIRST_DELAY_MS);

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      setTimeout(updateLanguage, 0);
    });

    new MutationObserver(() => setTimeout(updateLanguage, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) hideNotification();
      else scheduleNext(2500);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
