(() => {
  const ANNA_IMAGE_URL = '/api/anna-image?v=1788273455';
  const SESSION_KEY = 'rmc_anna_voice_notice_seen_v1';
  const FIRST_DELAY_MS = 8000;
  const VISIBLE_MS = 5200;
  const MOBILE_QUERY = '(max-width: 760px)';

  // Always use the same-origin image proxy. It retries the Cloudinary fetch
  // server-side and Vercel caches the successful image response.
  const annaUrl = (_transform) => ANNA_IMAGE_URL;
  const annaHeroUrl = (_transform) => ANNA_IMAGE_URL;
  const pathname = location.pathname.toLowerCase();
  const testProfile = new URLSearchParams(location.search).get('p')?.toLowerCase() || '';
  const isAuProfileTest = pathname.startsWith('/au/') && ['natalie', 'melissa', 'rachel', 'claire'].includes(testProfile);

  const copy = {
    'en-GB': { name: 'Anna', recently: 'Just now', followUp: 'Fancy meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…', voice: 'Sent you a voice note' },
    'en-US': { name: 'Anna', recently: 'Just now', followUp: 'How about meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…', voice: 'Sent you a voice message' },
    'en-SG': { name: 'Anna', recently: 'Just now', followUp: 'How about meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…', voice: 'Sent you a voice message' },
    de: { name: 'Anna', recently: 'Gerade eben', followUp: 'Wie wäre es, wenn wir uns diese Woche treffen? Ich glaube langsam, du hast kein Interesse, weil du dich gar nicht meldest …', voice: 'Hat dir eine Sprachnachricht geschickt' },
    nl: { name: 'Anna', recently: 'Zojuist', followUp: 'Zullen we deze week afspreken? Ik begin te denken dat je niet geïnteresseerd bent, want je laat helemaal nichts van je hören…', voice: 'Heeft je een spraakbericht gestuurd' },
    fr: { name: 'Anna', recently: 'À l’instant', followUp: 'Ça te dirait qu’on se voie cette semaine ? Je commence à croire que ça ne t’intéresse pas, puisque tu ne m’écris pas…', voice: 'Vous a envoyé un message vocal' },
    it: { name: 'Anna', recently: 'Proprio ora', followUp: 'Che ne dici di vederci questa settimana? Comincio a pensare che non ti interessi, visto che non mi scrivi…', voice: 'Ti ha inviato un messaggio vocale' },
    es: { name: 'Anna', recently: 'Ahora mismo', followUp: '¿Qué te parece si nos vemos esta semana? Empiezo a pensar que no te interesa, porque no me escribes…', voice: 'Te ha enviado un mensaje de voz' },
    pt: { name: 'Anna', recently: 'Agora mesmo', followUp: 'Que tal encontrarmo-nos esta semana? Já começo a achar que não estás interessado, porque não me escreves…', voice: 'Enviou-te uma mensagem de voz' },
    pl: { name: 'Anna', recently: 'Przed chwilą', followUp: 'Co powiesz na spotkanie w tym tygodniu? Chyba nie jesteś zainteresowany, bo nie piszesz…', voice: 'Wysłała Ci wiadomość głosową' },
    sv: { name: 'Anna', recently: 'Precis nu', followUp: 'Vad säger du om att ses någon gång den här veckan? Jag börjar tro att du inte är intresserad eftersom du inte skriver…', voice: 'Har skickat ett röstmeddelande till dig' },
    no: { name: 'Anna', recently: 'Akkurat nå', followUp: 'Hva sier du til å møtes en gang denne uka? Jeg begynner å tro at du ikke er interessert siden du ikke skriver…', voice: 'Har sendt deg en talemelding' },
    da: { name: 'Anna', recently: 'Lige nu', followUp: 'Hvad siger du til, at vi ses en dag i denne uge? Jeg begynder at tro, at du ikke er interesseret, når du ikke skriver…', voice: 'Har sendt dig en talebesked' },
    fi: { name: 'Anna', recently: 'Juuri nyt', followUp: 'Mitä jos nähtäisiin tällä viikolla? Alan jo ajatella, ettet ole kiinnostunut, kun et kirjoita…', voice: 'Lähetti sinulle ääniviestin' },
    el: { name: 'Άννα', recently: 'Μόλις τώρα', followUp: 'Τι λες να βρεθούμε κάποια μέρα αυτή την εβδομάδα; Αρχίζω να πιστεύω ότι δεν ενδιαφέρεσαι, αφού δεν μου γράφεις…', voice: 'Σου έστειλε φωνητικό μήνυμα' },
    hr: { name: 'Anna', recently: 'Upravo sada', followUp: 'Što kažeš da se vidimo ovaj tjedan? Počinjem misliti da nisi zainteresiran jer mi se uopće ne javljaš…', voice: 'Poslala ti je glasovnu poruku' },
    sl: { name: 'Anna', recently: 'Pravkar', followUp: 'Kaj praviš, da se dobiva enkrat ta teden? Začenjam misliti, da te ne zanima, ker mi nič ne pišeš…', voice: 'Poslala ti je glasovno sporočilo' },
    sk: { name: 'Anna', recently: 'Práve teraz', followUp: 'Čo povieš na to, keby sme sa niekedy tento týždeň stretli? Začínam si myslieť, že nemáš záujem, keď mi vôbec nepíšeš…', voice: 'Poslala ti hlasovú správu' },
    cs: { name: 'Anna', recently: 'Právě teď', followUp: 'Co říkáš na to, že bychom se někdy tento týden potkali? Začínám si myslet, že nemáš zájem, když mi vůbec nepíšeš…', voice: 'Poslala ti hlasovou zprávu' },
    hu: { name: 'Anna', recently: 'Épp most', followUp: 'Mit szólnál, ha találkoznánk valamikor a héten? Kezdem azt hinni, hogy nem is érdekellek, mert egyáltalán nem írsz…', voice: 'Hangüzenetet küldött neked' },
    he: { name: 'אנה', recently: 'עכשיו', followUp: 'מה דעתך שניפגש השבוע? אני מתחילה לחשוב שאתה לא באמת בעניין, כי אתה בכלל לא כותב לי…', voice: 'שלחה לך הודעה קולית' }
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
  let notification = null;
  let showTimer = 0;
  let hideTimer = 0;

  const syncAnnaImages = () => {
    const setImage = (image, src, srcset = '') => {
      if (!(image instanceof HTMLImageElement)) return;
      if (image.getAttribute('src') !== src) image.src = src;
      if (srcset) {
        if (image.getAttribute('srcset') !== srcset) image.srcset = srcset;
      } else if (image.hasAttribute('srcset')) {
        image.removeAttribute('srcset');
      }
    };

    setImage(
      document.querySelector('.invite-avatar img'),
      annaUrl('f_auto,q_auto:eco,c_fill,g_face,w_160,h_160')
    );

    if (!isAuProfileTest) {
      const heroSrc = annaHeroUrl('f_auto,q_auto:good,c_fill,g_auto,w_540,h_735');
      setImage(document.querySelector('.hero-invite .featured-profile > img'), heroSrc);
    }

    setImage(
      document.querySelector('.hero-invite .avatar-small img'),
      annaUrl('f_auto,q_auto:eco,c_fill,g_face,w_96,h_96')
    );
  };

  const applyFollowUp = () => {
    const node = document.querySelector('.mini-message [data-i18n="messagePreview"], .mini-message [data-role="anna-follow-up"], .mini-message p span:last-child');
    if (!node) return;

    const message = getCurrentCopy().followUp;
    if (node.textContent !== message) node.textContent = message;
    node.removeAttribute('data-i18n');
    node.setAttribute('data-role', 'anna-follow-up');
  };

  const hasBeenSeen = () => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; }
    catch (_) { return false; }
  };

  const markSeen = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1'); }
    catch (_) {}
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
        <img src="${annaUrl('f_auto,q_auto:eco,c_fill,g_face,w_112,h_112')}" alt="Anna" width="112" height="112" loading="lazy" decoding="async" />
        <span class="anna-notification-icon" aria-hidden="true">▶</span>
      </span>
      <span class="anna-notification-copy">
        <strong></strong>
        <p></p>
        <span class="anna-notification-time"></span>
      </span>
      <button class="anna-notification-close" type="button" aria-label="Close">×</button>
    `;

    notification.addEventListener('click', (event) => {
      if (event.target.closest('.anna-notification-close')) return;
      markSeen();
      hideNotification();
      const heroCta = document.querySelector('.hero-actions .js-affiliate');
      if (heroCta instanceof HTMLElement) heroCta.click();
    });

    notification.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      notification.click();
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
    const node = createNotification();
    if (!node) return;

    const current = getCurrentCopy();
    const title = node.querySelector('strong');
    const text = node.querySelector('p');
    const time = node.querySelector('.anna-notification-time');
    const image = node.querySelector('img');

    if (title && title.textContent !== `${current.name}, 41`) title.textContent = `${current.name}, 41`;
    if (text && text.textContent !== current.voice) text.textContent = current.voice;
    if (time && time.textContent !== current.recently) time.textContent = current.recently;
    if (image && image.alt !== current.name) image.alt = current.name;
  };

  const scheduleNotification = (delay = FIRST_DELAY_MS) => {
    window.clearTimeout(showTimer);
    if (mobileMedia.matches || hasBeenSeen()) return;
    showTimer = window.setTimeout(() => {
      if (document.hidden || document.querySelector('dialog[open]')) {
        scheduleNotification(2500);
        return;
      }

      renderNotification();
      if (!notification) return;
      markSeen();
      requestAnimationFrame(() => notification?.classList.add('is-visible'));
      hideTimer = window.setTimeout(hideNotification, VISIBLE_MS);
    }, delay);
  };

  const refresh = () => {
    syncAnnaImages();
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
    refresh();

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(refresh, 0);
    });

    new MutationObserver(() => window.setTimeout(refresh, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    if (typeof mobileMedia.addEventListener === 'function') {
      mobileMedia.addEventListener('change', handleViewportChange);
    } else if (typeof mobileMedia.addListener === 'function') {
      mobileMedia.addListener(handleViewportChange);
    }

    if (!mobileMedia.matches && !hasBeenSeen()) scheduleNotification();

    window.setTimeout(refresh, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
