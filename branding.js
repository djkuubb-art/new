(() => {
  const BRAND = 'RealMeetClub';
  const OLD_BRAND = 'HeartMatch';
  const TIMER_SECONDS = 10 * 60;
  const TIMER_KEY = 'realmeetclub_invite_deadline';

  const copy = {
    'en-GB': { name: 'Anna', label: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', cta: 'Open Anna’s message', expired: 'Last chance' },
    'en-US': { name: 'Anna', label: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', cta: 'Open Anna’s message', expired: 'Last chance' },
    'en-SG': { name: 'Anna', label: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', cta: 'Open Anna’s message', expired: 'Last chance' },
    de: { name: 'Anna', label: 'Läuft ab in', waiting: 'Anna wartet auf deine Antwort.', message: 'Hallo 😊 Ich habe dir eine private Nachricht hinterlassen.', cta: 'Annas Nachricht öffnen', expired: 'Letzte Chance' },
    nl: { name: 'Anna', label: 'Verloopt over', waiting: 'Anna wacht op je antwoord.', message: 'Hoi 😊 Ik heb je een privébericht gestuurd.', cta: 'Open Anna’s bericht', expired: 'Laatste kans' },
    fr: { name: 'Anna', label: 'Expire dans', waiting: 'Anna attend votre réponse.', message: 'Bonjour 😊 Je vous ai laissé un message privé.', cta: 'Ouvrir le message d’Anna', expired: 'Dernière chance' },
    it: { name: 'Anna', label: 'Scade tra', waiting: 'Anna aspetta la tua risposta.', message: 'Ciao 😊 Ti ho lasciato un messaggio privato.', cta: 'Apri il messaggio di Anna', expired: 'Ultima occasione' },
    es: { name: 'Anna', label: 'Caduca en', waiting: 'Anna espera tu respuesta.', message: 'Hola 😊 Te he dejado un mensaje privado.', cta: 'Abrir el mensaje de Anna', expired: 'Última oportunidad' },
    pt: { name: 'Anna', label: 'Expira em', waiting: 'A Anna está à espera da tua resposta.', message: 'Olá 😊 Deixei-te uma mensagem privada.', cta: 'Abrir a mensagem da Anna', expired: 'Última oportunidade' },
    pl: { name: 'Anna', label: 'Wygasa za', waiting: 'Anna czeka na Twoją odpowiedź.', message: 'Hej 😊 Zostawiłam Ci prywatną wiadomość.', cta: 'Otwórz wiadomość Anny', expired: 'Ostatnia szansa' },
    sv: { name: 'Anna', label: 'Går ut om', waiting: 'Anna väntar på ditt svar.', message: 'Hej 😊 Jag har lämnat ett privat meddelande till dig.', cta: 'Öppna Annas meddelande', expired: 'Sista chansen' },
    no: { name: 'Anna', label: 'Utløper om', waiting: 'Anna venter på svaret ditt.', message: 'Hei 😊 Jeg har lagt igjen en privat melding til deg.', cta: 'Åpne Annas melding', expired: 'Siste sjanse' },
    da: { name: 'Anna', label: 'Udløber om', waiting: 'Anna venter på dit svar.', message: 'Hej 😊 Jeg har lagt en privat besked til dig.', cta: 'Åbn Annas besked', expired: 'Sidste chance' },
    fi: { name: 'Anna', label: 'Vanhenee', waiting: 'Anna odottaa vastaustasi.', message: 'Hei 😊 Jätin sinulle yksityisviestin.', cta: 'Avaa Annan viesti', expired: 'Viimeinen mahdollisuus' },
    el: { name: 'Άννα', label: 'Λήγει σε', waiting: 'Η Άννα περιμένει την απάντησή σου.', message: 'Γεια 😊 Σου άφησα ένα προσωπικό μήνυμα.', cta: 'Άνοιξε το μήνυμα της Άννας', expired: 'Τελευταία ευκαιρία' },
    hr: { name: 'Anna', label: 'Istječe za', waiting: 'Anna čeka tvoj odgovor.', message: 'Bok 😊 Ostavila sam ti privatnu poruku.', cta: 'Otvori Anninu poruku', expired: 'Posljednja prilika' },
    sl: { name: 'Anna', label: 'Poteče čez', waiting: 'Anna čaka na tvoj odgovor.', message: 'Živjo 😊 Pustila sem ti zasebno sporočilo.', cta: 'Odpri Annino sporočilo', expired: 'Zadnja priložnost' },
    sk: { name: 'Anna', label: 'Vyprší o', waiting: 'Anna čaká na tvoju odpoveď.', message: 'Ahoj 😊 Nechala som ti súkromnú správu.', cta: 'Otvoriť správu od Anny', expired: 'Posledná šanca' },
    cs: { name: 'Anna', label: 'Vyprší za', waiting: 'Anna čeká na tvoji odpověď.', message: 'Ahoj 😊 Nechala jsem ti soukromou zprávu.', cta: 'Otevřít zprávu od Anny', expired: 'Poslední šance' },
    hu: { name: 'Anna', label: 'Lejár ennyi idő múlva', waiting: 'Anna várja a válaszodat.', message: 'Szia 😊 Hagytam neked egy privát üzenetet.', cta: 'Anna üzenetének megnyitása', expired: 'Utolsó esély' },
    he: { name: 'אנה', label: 'יפוג בעוד', waiting: 'אנה מחכה לתשובה שלך.', message: 'היי 😊 השארתי לך הודעה פרטית.', cta: 'פתיחת ההודעה של אנה', expired: 'הזדמנות אחרונה' }
  };

  const normaliseLocale = (value = '') => {
    if (copy[value]) return value;
    const short = String(value).toLowerCase().split('-')[0];
    if (short === 'en') return 'en-GB';
    return copy[short] ? short : 'en-GB';
  };

  const getLocale = () => {
    const select = document.getElementById('languageSelect');
    return normaliseLocale(select?.value || document.documentElement.lang || navigator.language);
  };

  const applyBrand = () => {
    document.title = document.title.replaceAll(OLD_BRAND, BRAND);
    document.querySelectorAll('.brand span:last-child, .mini-brand, .footer-brand strong').forEach((node) => {
      node.textContent = node.classList.contains('mini-brand') ? `♥ ${BRAND}` : BRAND;
    });
  };

  const ensureElements = () => {
    const phone = document.querySelector('.phone-card');
    const phoneTop = phone?.querySelector('.phone-top');
    const featured = phone?.querySelector('.featured-profile');
    const miniMessage = phone?.querySelector('.mini-message');
    if (!phone || !phoneTop || !featured || !miniMessage) return null;

    let timer = phoneTop.querySelector('.expiry-pill');
    if (!timer) {
      timer = document.createElement('div');
      timer.className = 'expiry-pill';
      timer.innerHTML = '<span class="expiry-copy"></span><strong class="expiry-time">10:00</strong>';
      phoneTop.appendChild(timer);
    }

    let strip = phone.querySelector('.urgency-strip');
    if (!strip) {
      strip = document.createElement('div');
      strip.className = 'urgency-strip';
      strip.innerHTML = '<span class="urgency-dot" aria-hidden="true"></span><span class="urgency-copy"></span>';
      featured.insertAdjacentElement('afterend', strip);
    }

    let cta = phone.querySelector('.phone-cta');
    if (!cta) {
      cta = document.createElement('a');
      cta.className = 'phone-cta js-affiliate';
      cta.dataset.slot = 'phone-message';
      cta.href = '/api/go?slot=phone-message';
      cta.innerHTML = '<span class="phone-cta-copy"></span><span aria-hidden="true">→</span>';
      miniMessage.insertAdjacentElement('afterend', cta);
    }

    return { phone, timer, strip, cta, miniMessage };
  };

  const syncAvatar = () => {
    const heroImage = document.querySelector('.featured-profile img');
    const avatar = document.querySelector('.mini-message img');
    if (heroImage && avatar) {
      avatar.src = heroImage.src;
      avatar.alt = 'Anna';
    }
  };

  const applyCopy = () => {
    applyBrand();
    const elements = ensureElements();
    if (!elements) return;

    const t = copy[getLocale()] || copy['en-GB'];
    const heroHeading = document.querySelector('.featured-profile .profile-overlay h2');
    if (heroHeading) heroHeading.textContent = `${t.name}, 41`;

    const messageName = elements.miniMessage.querySelector('strong');
    const messageText = elements.miniMessage.querySelector('p span:not(.message-time), [data-i18n="messagePreview"]');
    if (messageName) {
      messageName.removeAttribute('data-profile');
      messageName.textContent = t.name;
    }
    if (messageText) {
      messageText.removeAttribute('data-i18n');
      messageText.textContent = t.message;
    }

    elements.timer.querySelector('.expiry-copy').textContent = t.label;
    elements.strip.querySelector('.urgency-copy').textContent = t.waiting;
    elements.cta.querySelector('.phone-cta-copy').textContent = t.cta;

    const sticky = document.querySelector('.mobile-sticky span:first-child');
    if (sticky) {
      sticky.removeAttribute('data-i18n');
      sticky.textContent = t.cta;
    }

    syncAvatar();
  };

  const getDeadline = () => {
    const stored = Number(sessionStorage.getItem(TIMER_KEY));
    if (Number.isFinite(stored) && stored > Date.now()) return stored;
    const deadline = Date.now() + TIMER_SECONDS * 1000;
    sessionStorage.setItem(TIMER_KEY, String(deadline));
    return deadline;
  };

  const deadline = getDeadline();

  const updateTimer = () => {
    const time = document.querySelector('.expiry-time');
    const pill = document.querySelector('.expiry-pill');
    if (!time || !pill) return;

    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    time.textContent = `${minutes}:${seconds}`;

    pill.classList.toggle('is-urgent', remaining > 0 && remaining <= 60);
    if (remaining === 0) {
      pill.classList.add('is-expired');
      const label = pill.querySelector('.expiry-copy');
      if (label) label.textContent = (copy[getLocale()] || copy['en-GB']).expired;
    }
  };

  const initialise = () => {
    applyCopy();
    updateTimer();
    setInterval(updateTimer, 1000);

    document.getElementById('languageSelect')?.addEventListener('change', () => setTimeout(applyCopy, 0));

    new MutationObserver(() => setTimeout(applyCopy, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    const title = document.querySelector('title');
    if (title) {
      new MutationObserver(applyBrand).observe(title, { childList: true, characterData: true, subtree: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
