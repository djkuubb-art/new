(() => {
  const COPY = {
    'en-GB': { ctaListen:'Listen to Anna’s message', ctaComplete:'Continue with Anna', ctaReturn:'Continue where you left off', waiting:'Anna is waiting for your reply.', active:'Active now', nearby:'Near you', resume:'You have an unfinished message from Anna.', ageNote:'Your age choice opens the profile selection and offer intended for your age group.', variants:{A:'I left you a private voice note 😊',B:'You caught my attention. I’d like to get to know you.',C:'I’m still waiting for your reply…'} },
    'en-US': { ctaListen:'Listen to Anna’s message', ctaComplete:'Continue with Anna', ctaReturn:'Continue where you left off', waiting:'Anna is waiting for your reply.', active:'Active now', nearby:'Near you', resume:'You have an unfinished message from Anna.', ageNote:'Your age choice opens the profile selection and offer intended for your age group.', variants:{A:'I left you a private voice message 😊',B:'You caught my attention. I’d like to get to know you.',C:'I’m still waiting for your reply…'} },
    'en-SG': { ctaListen:'Listen to Anna’s message', ctaComplete:'Continue with Anna', ctaReturn:'Continue where you left off', waiting:'Anna is waiting for your reply.', active:'Active now', nearby:'Near you', resume:'You have an unfinished message from Anna.', ageNote:'Your age choice opens the profile selection and offer intended for your age group.', variants:{A:'I left you a private voice message 😊',B:'You caught my attention. I’d like to get to know you.',C:'I’m still waiting for your reply…'} },
    de: { ctaListen:'Annas Nachricht anhören', ctaComplete:'Mit Anna weitermachen', ctaReturn:'Dort weitermachen, wo du aufgehört hast', waiting:'Anna wartet auf deine Antwort.', active:'Jetzt aktiv', nearby:'In deiner Nähe', resume:'Du hast noch eine Nachricht von Anna offen.', ageNote:'Deine Altersauswahl öffnet die Profile und das Angebot, die für deine Altersgruppe vorgesehen sind.', variants:{A:'Ich habe dir eine private Sprachnachricht hinterlassen 😊',B:'Du bist mir aufgefallen. Ich würde dich gern kennenlernen.',C:'Ich warte noch auf deine Antwort…'} },
    nl: { ctaListen:'Luister naar Anna’s bericht', ctaComplete:'Verder met Anna', ctaReturn:'Ga verder waar je gebleven was', waiting:'Anna wacht op je antwoord.', active:'Nu actief', nearby:'Bij jou in de buurt', resume:'Je hebt nog een bericht van Anna openstaan.', ageNote:'Je leeftijdskeuze opent de profielen en het aanbod die bij jouw leeftijdsgroep horen.', variants:{A:'Ik heb een privéspraakbericht voor je achtergelaten 😊',B:'Je viel me op. Ik wil je graag leren kennen.',C:'Ik wacht nog steeds op je antwoord…'} },
    fr: { ctaListen:'Écouter le message d’Anna', ctaComplete:'Continuer avec Anna', ctaReturn:'Reprendre là où vous vous êtes arrêté', waiting:'Anna attend votre réponse.', active:'En ligne maintenant', nearby:'Près de chez vous', resume:'Un message d’Anna vous attend encore.', ageNote:'Votre choix d’âge ouvre les profils et l’offre prévus pour votre tranche d’âge.', variants:{A:'Je vous ai laissé un message vocal privé 😊',B:'Vous avez attiré mon attention. J’aimerais faire votre connaissance.',C:'J’attends toujours votre réponse…'} },
    it: { ctaListen:'Ascolta il messaggio di Anna', ctaComplete:'Continua con Anna', ctaReturn:'Riprendi da dove avevi lasciato', waiting:'Anna aspetta la tua risposta.', active:'Attiva ora', nearby:'Vicino a te', resume:'Hai ancora un messaggio di Anna da completare.', ageNote:'La scelta dell’età apre i profili e l’offerta previsti per la tua fascia d’età.', variants:{A:'Ti ho lasciato un messaggio vocale privato 😊',B:'Mi hai incuriosita. Mi piacerebbe conoscerti.',C:'Sto ancora aspettando la tua risposta…'} },
    es: { ctaListen:'Escuchar el mensaje de Anna', ctaComplete:'Continuar con Anna', ctaReturn:'Continuar donde lo dejaste', waiting:'Anna espera tu respuesta.', active:'Activa ahora', nearby:'Cerca de ti', resume:'Tienes un mensaje de Anna sin terminar.', ageNote:'Tu elección de edad abre los perfiles y la oferta previstos para tu grupo de edad.', variants:{A:'Te he dejado un mensaje de voz privado 😊',B:'Me llamaste la atención. Me gustaría conocerte.',C:'Sigo esperando tu respuesta…'} },
    pt: { ctaListen:'Ouvir a mensagem da Anna', ctaComplete:'Continuar com a Anna', ctaReturn:'Continuar de onde paraste', waiting:'A Anna está à espera da tua resposta.', active:'Ativa agora', nearby:'Perto de ti', resume:'Tens uma mensagem da Anna por terminar.', ageNote:'A tua escolha de idade abre os perfis e a oferta destinados à tua faixa etária.', variants:{A:'Deixei-te uma mensagem de voz privada 😊',B:'Chamaste-me a atenção. Gostava de te conhecer.',C:'Ainda estou à espera da tua resposta…'} },
    pl: { ctaListen:'Odsłuchaj wiadomość Anny', ctaComplete:'Kontynuuj rozmowę z Anną', ctaReturn:'Kontynuuj od ostatniego miejsca', waiting:'Anna czeka na Twoją odpowiedź.', active:'Aktywna teraz', nearby:'W Twojej okolicy', resume:'Masz niedokończoną wiadomość od Anny.', ageNote:'Wybór wieku otwiera zestaw profili i ofertę przeznaczoną dla Twojej grupy wiekowej.', variants:{A:'Zostawiłam Ci prywatną wiadomość głosową 😊',B:'Zwróciłeś moją uwagę. Chciałabym Cię poznać.',C:'Ciągle czekam na Twoją odpowiedź…'} },
    sv: { ctaListen:'Lyssna på Annas meddelande', ctaComplete:'Fortsätt med Anna', ctaReturn:'Fortsätt där du slutade', waiting:'Anna väntar på ditt svar.', active:'Aktiv nu', nearby:'Nära dig', resume:'Du har ett oavslutat meddelande från Anna.', ageNote:'Ditt åldersval öppnar profilerna och erbjudandet för din åldersgrupp.', variants:{A:'Jag har lämnat ett privat röstmeddelande till dig 😊',B:'Du fångade min uppmärksamhet. Jag vill gärna lära känna dig.',C:'Jag väntar fortfarande på ditt svar…'} },
    no: { ctaListen:'Hør Annas melding', ctaComplete:'Fortsett med Anna', ctaReturn:'Fortsett der du slapp', waiting:'Anna venter på svaret ditt.', active:'Aktiv nå', nearby:'I nærheten av deg', resume:'Du har en uferdig melding fra Anna.', ageNote:'Aldersvalget ditt åpner profilene og tilbudet for din aldersgruppe.', variants:{A:'Jeg har lagt igjen en privat talemelding til deg 😊',B:'Du fanget oppmerksomheten min. Jeg vil gjerne bli kjent med deg.',C:'Jeg venter fortsatt på svaret ditt…'} },
    da: { ctaListen:'Lyt til Annas besked', ctaComplete:'Fortsæt med Anna', ctaReturn:'Fortsæt, hvor du slap', waiting:'Anna venter på dit svar.', active:'Aktiv nu', nearby:'I nærheden af dig', resume:'Du har en ufærdig besked fra Anna.', ageNote:'Dit aldersvalg åbner profilerne og tilbuddet for din aldersgruppe.', variants:{A:'Jeg har lagt en privat talebesked til dig 😊',B:'Du fangede min opmærksomhed. Jeg vil gerne lære dig at kende.',C:'Jeg venter stadig på dit svar…'} },
    fi: { ctaListen:'Kuuntele Annan viesti', ctaComplete:'Jatka Annan kanssa', ctaReturn:'Jatka siitä, mihin jäit', waiting:'Anna odottaa vastaustasi.', active:'Aktiivinen nyt', nearby:'Lähellä sinua', resume:'Sinulla on keskeneräinen viesti Annalta.', ageNote:'Ikävalintasi avaa ikäryhmällesi tarkoitetut profiilit ja tarjouksen.', variants:{A:'Jätin sinulle yksityisen ääniviestin 😊',B:'Kiinnitit huomioni. Haluaisin tutustua sinuun.',C:'Odotan yhä vastaustasi…'} },
    el: { ctaListen:'Άκουσε το μήνυμα της Άννας', ctaComplete:'Συνέχισε με την Άννα', ctaReturn:'Συνέχισε από εκεί που σταμάτησες', waiting:'Η Άννα περιμένει την απάντησή σου.', active:'Ενεργή τώρα', nearby:'Κοντά σου', resume:'Έχεις ένα ημιτελές μήνυμα από την Άννα.', ageNote:'Η επιλογή ηλικίας ανοίγει τα προφίλ και την προσφορά για την ηλικιακή σου ομάδα.', variants:{A:'Σου άφησα ένα ιδιωτικό φωνητικό μήνυμα 😊',B:'Μου τράβηξες την προσοχή. Θα ήθελα να σε γνωρίσω.',C:'Ακόμα περιμένω την απάντησή σου…'} },
    hr: { ctaListen:'Poslušaj Anninu poruku', ctaComplete:'Nastavi s Annom', ctaReturn:'Nastavi gdje si stao', waiting:'Anna čeka tvoj odgovor.', active:'Aktivna sada', nearby:'U tvojoj blizini', resume:'Imaš nedovršenu poruku od Anne.', ageNote:'Odabir dobi otvara profile i ponudu namijenjene tvojoj dobnoj skupini.', variants:{A:'Ostavila sam ti privatnu glasovnu poruku 😊',B:'Privukao si moju pažnju. Voljela bih te upoznati.',C:'Još uvijek čekam tvoj odgovor…'} },
    sl: { ctaListen:'Poslušaj Annino sporočilo', ctaComplete:'Nadaljuj z Anno', ctaReturn:'Nadaljuj, kjer si končal', waiting:'Anna čaka na tvoj odgovor.', active:'Aktivna zdaj', nearby:'V tvoji bližini', resume:'Imaš nedokončano sporočilo od Anne.', ageNote:'Izbira starosti odpre profile in ponudbo za tvojo starostno skupino.', variants:{A:'Pustila sem ti zasebno glasovno sporočilo 😊',B:'Pritegnil si mojo pozornost. Rada bi te spoznala.',C:'Še vedno čakam na tvoj odgovor…'} },
    sk: { ctaListen:'Vypočuť si Anninu správu', ctaComplete:'Pokračovať s Annou', ctaReturn:'Pokračovať tam, kde si skončil', waiting:'Anna čaká na tvoju odpoveď.', active:'Aktívna teraz', nearby:'V tvojej blízkosti', resume:'Máš nedokončenú správu od Anny.', ageNote:'Výber veku otvorí profily a ponuku určené pre tvoju vekovú skupinu.', variants:{A:'Nechala som ti súkromnú hlasovú správu 😊',B:'Zaujal si ma. Rada by som ťa spoznala.',C:'Stále čakám na tvoju odpoveď…'} },
    cs: { ctaListen:'Poslechnout si Anninu zprávu', ctaComplete:'Pokračovat s Annou', ctaReturn:'Pokračovat tam, kde jsi skončil', waiting:'Anna čeká na tvoji odpověď.', active:'Aktivní nyní', nearby:'Ve tvém okolí', resume:'Máš nedokončenou zprávu od Anny.', ageNote:'Výběr věku otevře profily a nabídku určené pro tvoji věkovou skupinu.', variants:{A:'Nechala jsem ti soukromou hlasovou zprávu 😊',B:'Zaujal jsi mě. Ráda bych tě poznala.',C:'Pořád čekám na tvoji odpověď…'} },
    hu: { ctaListen:'Hallgasd meg Anna üzenetét', ctaComplete:'Folytatás Annával', ctaReturn:'Folytasd onnan, ahol abbahagytad', waiting:'Anna várja a válaszod.', active:'Most aktív', nearby:'A közeledben', resume:'Van egy befejezetlen üzeneted Annától.', ageNote:'Az életkor kiválasztása megnyitja a korcsoportodnak megfelelő profilokat és ajánlatot.', variants:{A:'Hagytam neked egy privát hangüzenetet 😊',B:'Felkeltetted a figyelmem. Szeretnélek megismerni.',C:'Még mindig várom a válaszod…'} },
    he: { ctaListen:'הקשב להודעה של אנה', ctaComplete:'המשך עם אנה', ctaReturn:'המשך מהמקום שבו עצרת', waiting:'אנה מחכה לתשובה שלך.', active:'פעילה עכשיו', nearby:'קרוב אליך', resume:'יש לך הודעה לא גמורה מאנה.', ageNote:'בחירת הגיל פותחת את הפרופילים וההצעה המיועדים לקבוצת הגיל שלך.', variants:{A:'השארתי לך הודעה קולית פרטית 😊',B:'משכת את תשומת לבי. אשמח להכיר אותך.',C:'אני עדיין מחכה לתשובה שלך…'} }
  };

  const STATE_KEY = 'rmc_voice_state_v2';
  const VARIANT_KEY = 'rmc_ab_variant_v1';
  const DISTANCE_KEY = 'rmc_local_distance_v1';
  const MILE_COUNTRIES = new Set(['US','GB']);
  let geo = { country:'', city:'' };
  let returning = false;
  let applying = false;

  const locale = () => {
    const raw = String(document.getElementById('languageSelect')?.value || document.documentElement.lang || navigator.language || 'en-GB').replace('_','-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return COPY[short] ? short : 'en-GB';
  };
  const t = () => COPY[locale()] || COPY['en-GB'];
  const state = () => {
    try { return { stage:'unseen', percent:0, ...JSON.parse(localStorage.getItem(STATE_KEY) || '{}') }; }
    catch (_) { return { stage:'unseen', percent:0 }; }
  };
  const save = patch => {
    const next = { ...state(), ...patch, updatedAt:Date.now() };
    try { localStorage.setItem(STATE_KEY, JSON.stringify(next)); } catch (_) {}
    return next;
  };
  const variant = () => {
    let value = '';
    try { value = localStorage.getItem(VARIANT_KEY) || ''; } catch (_) {}
    if (!['A','B','C'].includes(value)) {
      value = ['A','B','C'][Math.floor(Math.random()*3)];
      try { localStorage.setItem(VARIANT_KEY, value); } catch (_) {}
    }
    return value;
  };
  const distance = () => {
    let value = 0;
    try { value = Number(localStorage.getItem(DISTANCE_KEY) || 0); } catch (_) {}
    if (value < 4 || value > 10) {
      value = 4 + Math.floor(Math.random()*7);
      try { localStorage.setItem(DISTANCE_KEY, String(value)); } catch (_) {}
    }
    return value;
  };
  const track = (name, details={}) => {
    const payload = { event:name, locale:locale(), variant:variant(), placement:'main-profile', ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') window.gtag('event', name, payload);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, payload);
  };
  const elements = () => {
    const phone = document.querySelector('.hero-invite .phone-card');
    return { phone, panel:phone?.querySelector('.anna-voice-panel'), audio:phone?.querySelector('.anna-voice-audio'), play:phone?.querySelector('.anna-voice-play'), cta:phone?.querySelector('.phone-cta'), ctaCopy:phone?.querySelector('.phone-cta-copy'), message:phone?.querySelector('.mini-message') };
  };

  const injectStyles = () => {
    if (document.getElementById('rmc-upgrade-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-upgrade-styles';
    style.textContent = `
      .rmc-ab-line{margin:0 0 11px;padding:10px 12px;border:1px solid rgba(255,255,255,.09);border-radius:13px;background:rgba(255,255,255,.035);color:#f3f3f4;font-size:.78rem;line-height:1.4}
      .rmc-resume-note{display:none;margin:9px 0 0;color:#ff9aae;font-size:.72rem;font-weight:750}.anna-voice-panel.rmc-returning .rmc-resume-note{display:block}
      .mini-message.rmc-waiting{border-color:rgba(43,205,117,.25)!important}.mini-message.rmc-waiting::after{content:'';width:7px;height:7px;border-radius:50%;background:#35d77c;box-shadow:0 0 0 4px rgba(53,215,124,.12)}
      .anna-local-line{display:flex!important;align-items:center;gap:5px;flex-wrap:wrap}.anna-local-distance{color:#fff;font-weight:750}.anna-local-city{color:rgba(255,255,255,.76)}
      .age-campaign-note{margin:12px auto 0;max-width:420px;color:#8c8c91;font-size:.73rem;line-height:1.42}
      .phone-card.rmc-cta-ready .phone-cta{animation:rmcUpgradePulse 1.15s ease 1;box-shadow:0 18px 42px rgba(225,22,63,.42)}
      @keyframes rmcUpgradePulse{0%,100%{transform:scale(1)}45%{transform:scale(1.025)}}
      @media(max-width:640px){.rmc-ab-line{font-size:.73rem}.anna-local-line{font-size:.69rem}}
    `;
    document.head.appendChild(style);
  };

  const updateLocation = () => {
    const row = document.querySelector('.hero-invite .profile-overlay p');
    if (!row) return;
    const online = row.querySelector('[data-i18n="online"]')?.textContent || t().active;
    const country = String(geo.country || '').toUpperCase();
    const useMiles = MILE_COUNTRIES.has(country) && locale().startsWith('en');
    const amount = useMiles ? Math.max(2, Math.round(distance()*.62)) : distance();
    const city = String(geo.city || '').trim();
    row.classList.add('anna-local-line');
    row.replaceChildren();
    const dot = document.createElement('span'); dot.className='online-dot';
    const place = document.createElement('span'); place.className='anna-local-city'; place.textContent = city || t().nearby;
    const sep1 = document.createElement('span'); sep1.textContent='·';
    const dist = document.createElement('span'); dist.className='anna-local-distance'; dist.textContent = `~${amount} ${useMiles ? 'mi' : 'km'}`;
    const sep2 = document.createElement('span'); sep2.textContent='·';
    const status = document.createElement('span'); status.textContent = state().stage === 'unseen' ? online : t().active;
    row.append(dot,place,sep1,dist,sep2,status);
  };

  const ensureExtraNodes = () => {
    const { panel } = elements();
    if (!panel) return false;
    if (!panel.querySelector('.rmc-ab-line')) {
      const line = document.createElement('div'); line.className='rmc-ab-line';
      panel.insertAdjacentElement('afterbegin', line);
    }
    if (!panel.querySelector('.rmc-resume-note')) {
      const note = document.createElement('p'); note.className='rmc-resume-note';
      panel.querySelector('.anna-voice-hint')?.insertAdjacentElement('afterend',note);
    }
    return true;
  };

  const updateAgeNote = () => {
    const modal = document.getElementById('ageGateModal');
    if (!modal) return;
    let note = modal.querySelector('.age-campaign-note');
    if (!note) {
      note = document.createElement('p'); note.className='age-campaign-note';
      modal.querySelector('.age-gate-options')?.insertAdjacentElement('afterend',note);
    }
    note.textContent = t().ageNote;
    modal.querySelectorAll('.age-option').forEach((option,index) => {
      if (option.dataset.rmcAgeBound) return;
      option.dataset.rmcAgeBound='1';
      option.addEventListener('click', () => {
        const ageBand = index === 0 ? '18-44' : '45+';
        save({ ageBand, ageSelectedAt:Date.now() });
        track('age_group_selected',{ageBand});
      });
    });
  };

  const apply = () => {
    if (applying || !ensureExtraNodes()) return;
    applying = true;
    const { phone,panel,ctaCopy,message } = elements();
    const s = state();
    const copy = t();
    panel.querySelector('.rmc-ab-line').textContent = s.stage === 'unseen' ? copy.variants[variant()] : copy.waiting;
    panel.querySelector('.rmc-resume-note').textContent = copy.resume;
    panel.classList.toggle('rmc-returning', returning && s.stage !== 'unseen');
    message?.classList.toggle('rmc-waiting', s.stage !== 'unseen');
    phone?.classList.toggle('rmc-cta-ready', s.stage !== 'unseen');
    if (ctaCopy) {
      if (s.stage === 'complete') ctaCopy.textContent = copy.ctaComplete;
      else if (s.stage === 'started' && returning) ctaCopy.textContent = copy.ctaReturn;
      else if (s.stage === 'unseen') ctaCopy.textContent = copy.ctaListen;
    }
    updateLocation();
    updateAgeNote();
    applying = false;
  };

  const bind = () => {
    const { audio,play,cta } = elements();
    if (!audio || !play || !cta || audio.dataset.rmcUpgraded) return false;
    audio.dataset.rmcUpgraded='1';

    cta.addEventListener('click', event => {
      if (state().stage !== 'unseen') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      elements().panel?.scrollIntoView({behavior:'smooth',block:'center'});
      play.click();
      track('voice_cta_play');
    }, true);

    audio.addEventListener('play', () => {
      const s = state();
      if (s.stage === 'unseen') save({stage:'started',startedAt:Date.now(),percent:Math.max(1,s.percent||0)});
      apply();
      track('voice_stage_started');
    });
    audio.addEventListener('timeupdate', () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const percent = Math.min(100,Math.round(audio.currentTime/audio.duration*100));
      const s = state();
      if (percent > (s.percent||0)) save({percent});
      [25,50,90].forEach(mark => {
        const key=`tracked${mark}`;
        if (percent >= mark && !s[key]) { save({[key]:true,percent}); track(`voice_message_${mark}`); }
      });
    });
    audio.addEventListener('ended', () => {
      save({stage:'complete',percent:100,completedAt:Date.now()});
      apply();
      track('voice_stage_complete');
    });
    return true;
  };

  const fetchGeo = async () => {
    try {
      const response = await fetch('/api/geo',{cache:'no-store',credentials:'same-origin'});
      if (response.ok) geo = {...geo,...await response.json()};
    } catch (_) {}
    updateLocation();
  };

  const initialise = () => {
    injectStyles();
    returning = state().stage !== 'unseen';
    variant();
    if (!bind()) {
      const observer = new MutationObserver(() => { if (bind()) { apply(); observer.disconnect(); } });
      observer.observe(document.body,{childList:true,subtree:true});
    }
    apply();
    fetchGeo();
    document.getElementById('languageSelect')?.addEventListener('change',()=>setTimeout(apply,80));
    new MutationObserver(() => {
      updateAgeNote();
      const modal = document.getElementById('ageGateModal');
      if (modal?.open && !modal.dataset.rmcProgressSaved) {
        modal.dataset.rmcProgressSaved='1';
        save({ageOpened:true,ageOpenedAt:Date.now()});
        track('age_modal_open',{voiceStage:state().stage});
      }
      if (modal && !modal.open) delete modal.dataset.rmcProgressSaved;
    }).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialise,{once:true});
  else initialise();
})();
