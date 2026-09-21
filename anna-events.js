(() => {
  const ANNA_IMAGE_URL = '/api/anna-image?v=20260921-maria1';
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
    'en-GB': { name: 'Maria', recently: 'Just now', followUp: 'I cried last night. Am I really so ugly that you won’t even say hi to me?', voice: 'Sent you a voice note' },
    'en-US': { name: 'Maria', recently: 'Just now', followUp: 'I cried last night. Am I really so ugly that you won’t even say hi to me?', voice: 'Sent you a voice message' },
    'en-SG': { name: 'Maria', recently: 'Just now', followUp: 'I cried last night. Am I really so ugly that you won’t even say hi to me?', voice: 'Sent you a voice message' },
    de: { name: 'Maria', recently: 'Gerade eben', followUp: 'Ich habe letzte Nacht geweint. Bin ich wirklich so hässlich, dass du mir nicht mal Hallo schreibst?', voice: 'Hat dir eine Sprachnachricht geschickt' },
    nl: { name: 'Maria', recently: 'Zojuist', followUp: 'Ik heb vannacht gehuild. Ben ik echt zo lelijk dat je me niet eens hoi schrijft?', voice: 'Heeft je een spraakbericht gestuurd' },
    fr: { name: 'Marie', recently: 'À l’instant', followUp: 'J’ai pleuré cette nuit. Je suis vraiment si moche que tu ne peux même pas me dire bonjour ?', voice: 'Vous a envoyé un message vocal' },
    it: { name: 'Maria', recently: 'Proprio ora', followUp: 'Ho pianto stanotte. Sono davvero così brutta che non mi scrivi neanche ciao?', voice: 'Ti ha inviato un messaggio vocale' },
    es: { name: 'María', recently: 'Ahora mismo', followUp: 'Anoche lloré. ¿De verdad soy tan fea que ni siquiera me dices hola?', voice: 'Te ha enviado un mensaje de voz' },
    pt: { name: 'Maria', recently: 'Agora mesmo', followUp: 'Chorei esta noite. Sou assim tão feia que nem sequer me dizes olá?', voice: 'Enviou-te uma mensagem de voz' },
    pl: { name: 'Maria', recently: 'Przed chwilą', followUp: 'Płakałam w nocy. Jestem tak brzydka, że nawet nie napiszesz mi cześć?', voice: 'Wysłała Ci wiadomość głosową' },
    sv: { name: 'Maria', recently: 'Precis nu', followUp: 'Jag grät i natt. Är jag verkligen så ful att du inte ens skriver hej till mig?', voice: 'Har skickat ett röstmeddelande till dig' },
    no: { name: 'Maria', recently: 'Akkurat nå', followUp: 'Jeg gråt i natt. Er jeg virkelig så stygg at du ikke engang skriver hei til meg?', voice: 'Har sendt deg en talemelding' },
    da: { name: 'Maria', recently: 'Lige nu', followUp: 'Jeg græd i nat. Er jeg virkelig så grim, at du ikke engang skriver hej til mig?', voice: 'Har sendt dig en talebesked' },
    fi: { name: 'Maria', recently: 'Juuri nyt', followUp: 'Itkin viime yönä. Olenko oikeasti niin ruma, ettet edes kirjoita minulle hei?', voice: 'Lähetti sinulle ääniviestin' },
    el: { name: 'Μαρία', recently: 'Μόλις τώρα', followUp: 'Έκλαψα χθες το βράδυ. Είμαι στ’ αλήθεια τόσο άσχημη που δεν μου γράφεις ούτε ένα «γεια»;', voice: 'Σου έστειλε φωνητικό μήνυμα' },
    hr: { name: 'Marija', recently: 'Upravo sada', followUp: 'Plakala sam noćas. Zar sam stvarno toliko ružna da mi nećeš ni napisati bok?', voice: 'Poslala ti je glasovnu poruku' },
    sl: { name: 'Marija', recently: 'Pravkar', followUp: 'Ponoči sem jokala. Sem res tako grda, da mi ne napišeš niti živjo?', voice: 'Poslala ti je glasovno sporočilo' },
    sk: { name: 'Mária', recently: 'Práve teraz', followUp: 'V noci som plakala. Som naozaj taká škaredá, že mi nenapíšeš ani ahoj?', voice: 'Poslala ti hlasovú správu' },
    cs: { name: 'Marie', recently: 'Právě teď', followUp: 'V noci jsem plakala. Jsem opravdu tak ošklivá, že mi nenapíšeš ani ahoj?', voice: 'Poslala ti hlasovou zprávu' },
    hu: { name: 'Mária', recently: 'Épp most', followUp: 'Éjjel sírtam. Tényleg olyan csúnya vagyok, hogy még annyit sem írsz nekem, hogy szia?', voice: 'Hangüzenetet küldött neked' },
    he: { name: 'מריה', recently: 'עכשיו', followUp: 'בכיתי בלילה. אני באמת כל כך מכוערת שאתה אפילו לא כותב לי היי?', voice: 'שלחה לך הודעה קולית' }
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
        <img src="${annaUrl('f_auto,q_auto:eco,c_fill,g_face,w_112,h_112')}" alt="Maria" width="112" height="112" loading="lazy" decoding="async" />
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
