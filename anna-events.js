(() => {
  const ANNA_IMAGE = 'https://res.cloudinary.com/r8lomm2b/image/upload/f_auto,q_auto:eco,c_fill,g_face,w_112,h_112/v1785806218/5_1_casfeq.png';
  const SESSION_KEY = 'rmc_anna_voice_notice_seen_v1';
  const FIRST_DELAY_MS = 8000;
  const VISIBLE_MS = 5200;
  const MOBILE_QUERY = '(max-width: 760px)';

  const copy = {
    'en-GB': { name: 'Anna', recently: 'Just now', followUp: 'You really didn’t like my lingerie photo? I can see you didn’t even click to look at it. That makes me sad :(', voice: 'Sent you a voice note' },
    'en-US': { name: 'Anna', recently: 'Just now', followUp: 'You really didn’t like my lingerie photo? I can see you didn’t even click to look at it. That makes me sad :(', voice: 'Sent you a voice message' },
    'en-SG': { name: 'Anna', recently: 'Just now', followUp: 'You really didn’t like my lingerie photo? I can see you didn’t even click to look at it. That makes me sad :(', voice: 'Sent you a voice message' },
    de: { name: 'Anna', recently: 'Gerade eben', followUp: 'Hat dir mein Foto in Dessous wirklich nicht gefallen? Ich sehe, dass du nicht einmal darauf geklickt hast, um es anzusehen. Das macht mich traurig :(', voice: 'Hat dir eine Sprachnachricht geschickt' },
    nl: { name: 'Anna', recently: 'Zojuist', followUp: 'Vond je mijn foto in lingerie echt niet leuk? Ik zie dat je niet eens hebt geklikt om hem te bekijken. Daar word ik verdrietig van :(', voice: 'Heeft je een spraakbericht gestuurd' },
    fr: { name: 'Anna', recently: 'À l’instant', followUp: 'Ma photo en lingerie ne vous a vraiment pas plu ? Je vois que vous n’avez même pas cliqué pour la regarder. Ça me rend triste :(', voice: 'Vous a envoyé un message vocal' },
    it: { name: 'Anna', recently: 'Proprio ora', followUp: 'Davvero non ti è piaciuta la mia foto in lingerie? Vedo che non hai nemmeno cliccato per guardarla. Mi rende triste :(', voice: 'Ti ha inviato un messaggio vocale' },
    es: { name: 'Anna', recently: 'Ahora mismo', followUp: '¿De verdad no te gustó mi foto en lencería? Veo que ni siquiera hiciste clic para verla. Me pone triste :(', voice: 'Te ha enviado un mensaje de voz' },
    pt: { name: 'Anna', recently: 'Agora mesmo', followUp: 'Não gostaste mesmo da minha foto em lingerie? Vejo que nem sequer clicaste para a ver. Fico triste :(', voice: 'Enviou-te uma mensagem de voz' },
    pl: { name: 'Anna', recently: 'Przed chwilą', followUp: 'Naprawdę moje zdjęcie w bieliźnie Ci się nie spodobało? Widzę, że nawet nie kliknąłeś, żeby je zobaczyć. Smutno mi :(', voice: 'Wysłała Ci wiadomość głosową' },
    sv: { name: 'Anna', recently: 'Precis nu', followUp: 'Gillade du verkligen inte min bild i underkläder? Jag ser att du inte ens klickade för att titta på den. Det gör mig ledsen :(', voice: 'Har skickat ett röstmeddelande till dig' },
    no: { name: 'Anna', recently: 'Akkurat nå', followUp: 'Likte du virkelig ikke bildet mitt i undertøy? Jeg ser at du ikke engang klikket for å se på det. Det gjør meg trist :(', voice: 'Har sendt deg en talemelding' },
    da: { name: 'Anna', recently: 'Lige nu', followUp: 'Kunne du virkelig ikke lide mit billede i undertøj? Jeg kan se, at du ikke engang klikkede for at se det. Det gør mig ked af det :(', voice: 'Har sendt dig en talebesked' },
    fi: { name: 'Anna', recently: 'Juuri nyt', followUp: 'Etkö todella pitänyt kuvastani alusvaatteissa? Näen, ettet edes klikannut katsoaksesi sitä. Se tekee minut surulliseksi :(', voice: 'Lähetti sinulle ääniviestin' },
    el: { name: 'Άννα', recently: 'Μόλις τώρα', followUp: 'Δεν σου άρεσε πραγματικά η φωτογραφία μου με εσώρουχα; Βλέπω ότι δεν πάτησες καν για να τη δεις. Με στενοχωρεί :(', voice: 'Σου έστειλε φωνητικό μήνυμα' },
    hr: { name: 'Anna', recently: 'Upravo sada', followUp: 'Zar ti se stvarno nije svidjela moja fotografija u donjem rublju? Vidim da nisi ni kliknuo da je pogledaš. To me rastužuje :(', voice: 'Poslala ti je glasovnu poruku' },
    sl: { name: 'Anna', recently: 'Pravkar', followUp: 'Ti moja fotografija v spodnjem perilu res ni bila všeč? Vidim, da nisi niti kliknil, da bi jo pogledal. To me žalosti :(', voice: 'Poslala ti je glasovno sporočilo' },
    sk: { name: 'Anna', recently: 'Práve teraz', followUp: 'Naozaj sa ti nepáčila moja fotka v spodnej bielizni? Vidím, že si ani neklikol, aby si si ju pozrel. Je mi z toho smutno :(', voice: 'Poslala ti hlasovú správu' },
    cs: { name: 'Anna', recently: 'Právě teď', followUp: 'Opravdu se ti nelíbila moje fotka ve spodním prádle? Vidím, že jsi ani neklikl, abys se na ni podíval. Je mi z toho smutno :(', voice: 'Poslala ti hlasovou zprávu' },
    hu: { name: 'Anna', recently: 'Épp most', followUp: 'Tényleg nem tetszett a fehérneműs képem? Látom, még csak rá sem kattintottál, hogy megnézd. Ez elszomorít :(', voice: 'Hangüzenetet küldött neked' },
    he: { name: 'אנה', recently: 'עכשיו', followUp: 'באמת לא אהבת את התמונה שלי בהלבשה תחתונה? אני רואה שאפילו לא לחצת כדי לראות אותה. זה מעציב אותי :(', voice: 'שלחה לך הודעה קולית' }
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
