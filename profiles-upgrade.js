(() => {
  const profileCopy = {
    'en-GB': { cta: 'View profile', hint: 'Swipe to see more profiles', modalCta: 'Message her', close: 'Close profile', bios: ['I like honest conversations and men who know what they want.', 'I’m looking for someone mature, kind and easy to talk to.', 'I appreciate confidence, humour and genuine interest.'], distances: ['7.6 miles from you', '5.0 miles from you', '3.5 miles from you'] },
    'en-US': { cta: 'View profile', hint: 'Swipe to see more profiles', modalCta: 'Message her', close: 'Close profile', bios: ['I like honest conversations and men who know what they want.', 'I’m looking for someone mature, kind, and easy to talk to.', 'I appreciate confidence, humor, and genuine interest.'], distances: ['7.6 miles from you', '5.0 miles from you', '3.5 miles from you'] },
    'en-SG': { cta: 'View profile', hint: 'Swipe to see more profiles', modalCta: 'Message her', close: 'Close profile', bios: ['I enjoy honest conversations and men who know what they want.', 'I’m looking for someone mature, kind and easy to talk to.', 'I value confidence, humour and genuine interest.'], distances: ['12.3 km from you', '8.1 km from you', '5.7 km from you'] },
    de: { cta: 'Profil ansehen', hint: 'Wische, um weitere Profile zu sehen', modalCta: 'Ihr schreiben', close: 'Profil schließen', bios: ['Ich mag ehrliche Gespräche und Männer, die wissen, was sie wollen.', 'Ich suche einen reifen, sympathischen Mann, mit dem man gut reden kann.', 'Ich schätze Selbstbewusstsein, Humor und echtes Interesse.'], distances: ['12,3 km von dir entfernt', '8,1 km von dir entfernt', '5,7 km von dir entfernt'] },
    nl: { cta: 'Profiel bekijken', hint: 'Veeg om meer profielen te zien', modalCta: 'Stuur haar een bericht', close: 'Profiel sluiten', bios: ['Ik hou van eerlijke gesprekken en mannen die weten wat ze willen.', 'Ik zoek een volwassen, lieve man met wie je goed kunt praten.', 'Ik waardeer zelfvertrouwen, humor en oprechte interesse.'], distances: ['12,3 km bij je vandaan', '8,1 km bij je vandaan', '5,7 km bij je vandaan'] },
    fr: { cta: 'Voir le profil', hint: 'Faites glisser pour voir d’autres profils', modalCta: 'Lui écrire', close: 'Fermer le profil', bios: ['J’aime les conversations sincères et les hommes qui savent ce qu’ils veulent.', 'Je cherche un homme mature, gentil et agréable à qui parler.', 'J’apprécie la confiance en soi, l’humour et l’intérêt sincère.'], distances: ['à 12,3 km de chez vous', 'à 8,1 km de chez vous', 'à 5,7 km de chez vous'] },
    it: { cta: 'Vedi il profilo', hint: 'Scorri per vedere altri profili', modalCta: 'Scrivile', close: 'Chiudi il profilo', bios: ['Mi piacciono le conversazioni sincere e gli uomini che sanno cosa vogliono.', 'Cerco un uomo maturo, gentile e con cui sia facile parlare.', 'Apprezzo sicurezza, umorismo e interesse sincero.'], distances: ['a 12,3 km da te', 'a 8,1 km da te', 'a 5,7 km da te'] },
    es: { cta: 'Ver perfil', hint: 'Desliza para ver más perfiles', modalCta: 'Escríbele', close: 'Cerrar perfil', bios: ['Me gustan las conversaciones sinceras y los hombres que saben lo que quieren.', 'Busco a un hombre maduro, amable y con quien sea fácil hablar.', 'Valoro la seguridad, el humor y el interés de verdad.'], distances: ['a 12,3 km de ti', 'a 8,1 km de ti', 'a 5,7 km de ti'] },
    pt: { cta: 'Ver perfil', hint: 'Desliza para ver mais perfis', modalCta: 'Enviar mensagem', close: 'Fechar perfil', bios: ['Gosto de conversas sinceras e de homens que sabem o que querem.', 'Procuro um homem maduro, simpático e com quem seja fácil conversar.', 'Valorizo confiança, humor e interesse verdadeiro.'], distances: ['a 12,3 km de ti', 'a 8,1 km de ti', 'a 5,7 km de ti'] },
    pl: { cta: 'Zobacz profil', hint: 'Przesuń, aby zobaczyć kolejne profile', modalCta: 'Napisz do niej', close: 'Zamknij profil', bios: ['Lubię szczere rozmowy i mężczyzn, którzy wiedzą, czego chcą.', 'Szukam dojrzałego, sympatycznego faceta, z którym można normalnie porozmawiać.', 'Cenię pewność siebie, poczucie humoru i prawdziwe zainteresowanie.'], distances: ['12,3 km od Ciebie', '8,1 km od Ciebie', '5,7 km od Ciebie'] },
    sv: { cta: 'Visa profil', hint: 'Svep för att se fler profiler', modalCta: 'Skriv till henne', close: 'Stäng profilen', bios: ['Jag gillar ärliga samtal och män som vet vad de vill.', 'Jag söker en mogen, omtänksam man som är lätt att prata med.', 'Jag uppskattar självförtroende, humor och genuint intresse.'], distances: ['12,3 km från dig', '8,1 km från dig', '5,7 km från dig'] },
    no: { cta: 'Se profil', hint: 'Sveip for å se flere profiler', modalCta: 'Skriv til henne', close: 'Lukk profilen', bios: ['Jeg liker ærlige samtaler og menn som vet hva de vil.', 'Jeg ser etter en moden og hyggelig mann det er lett å snakke med.', 'Jeg setter pris på selvtillit, humor og ekte interesse.'], distances: ['12,3 km fra deg', '8,1 km fra deg', '5,7 km fra deg'] },
    da: { cta: 'Se profil', hint: 'Swipe for at se flere profiler', modalCta: 'Skriv til hende', close: 'Luk profilen', bios: ['Jeg kan lide ærlige samtaler og mænd, der ved, hvad de vil.', 'Jeg søger en moden og sød mand, som er nem at tale med.', 'Jeg sætter pris på selvtillid, humor og ægte interesse.'], distances: ['12,3 km fra dig', '8,1 km fra dig', '5,7 km fra dig'] },
    fi: { cta: 'Katso profiili', hint: 'Pyyhkäise nähdäksesi lisää profiileja', modalCta: 'Lähetä viesti', close: 'Sulje profiili', bios: ['Pidän rehellisistä keskusteluista ja miehistä, jotka tietävät mitä haluavat.', 'Etsin kypsää ja mukavaa miestä, jonka kanssa on helppo jutella.', 'Arvostan itsevarmuutta, huumoria ja aitoa kiinnostusta.'], distances: ['12,3 km päässä sinusta', '8,1 km päässä sinusta', '5,7 km päässä sinusta'] },
    el: { cta: 'Δες το προφίλ', hint: 'Σύρε για περισσότερα προφίλ', modalCta: 'Στείλε της μήνυμα', close: 'Κλείσιμο προφίλ', bios: ['Μου αρέσουν οι ειλικρινείς συζητήσεις και οι άντρες που ξέρουν τι θέλουν.', 'Ψάχνω έναν ώριμο και ευγενικό άντρα με τον οποίο να μιλάμε άνετα.', 'Εκτιμώ την αυτοπεποίθηση, το χιούμορ και το αληθινό ενδιαφέρον.'], distances: ['12,3 χλμ. από εσένα', '8,1 χλμ. από εσένα', '5,7 χλμ. από εσένα'] },
    hr: { cta: 'Pogledaj profil', hint: 'Prijeđi prstom za više profila', modalCta: 'Pošalji joj poruku', close: 'Zatvori profil', bios: ['Volim iskrene razgovore i muškarce koji znaju što žele.', 'Tražim zrelog i simpatičnog muškarca s kojim je lako razgovarati.', 'Cijenim samopouzdanje, humor i iskreno zanimanje.'], distances: ['12,3 km od tebe', '8,1 km od tebe', '5,7 km od tebe'] },
    sl: { cta: 'Poglej profil', hint: 'Podrsaj za več profilov', modalCta: 'Piši ji', close: 'Zapri profil', bios: ['Rada imam iskrene pogovore in moške, ki vedo, kaj si želijo.', 'Iščem zrelega in prijaznega moškega, s katerim se je prijetno pogovarjati.', 'Cenim samozavest, humor in iskreno zanimanje.'], distances: ['12,3 km od tebe', '8,1 km od tebe', '5,7 km od tebe'] },
    sk: { cta: 'Zobraziť profil', hint: 'Potiahni a zobraz ďalšie profily', modalCta: 'Napíš jej', close: 'Zavrieť profil', bios: ['Mám rada úprimné rozhovory a mužov, ktorí vedia, čo chcú.', 'Hľadám zrelého a milého muža, s ktorým sa dá dobre porozprávať.', 'Cením si sebavedomie, humor a úprimný záujem.'], distances: ['12,3 km od teba', '8,1 km od teba', '5,7 km od teba'] },
    cs: { cta: 'Zobrazit profil', hint: 'Přejeď a zobraz další profily', modalCta: 'Napiš jí', close: 'Zavřít profil', bios: ['Mám ráda upřímné rozhovory a muže, kteří vědí, co chtějí.', 'Hledám zralého a milého muže, se kterým se dá dobře povídat.', 'Cením si sebevědomí, humoru a opravdového zájmu.'], distances: ['12,3 km od tebe', '8,1 km od tebe', '5,7 km od tebe'] },
    hu: { cta: 'Profil megtekintése', hint: 'Húzd el további profilokért', modalCta: 'Írj neki', close: 'Profil bezárása', bios: ['Szeretem az őszinte beszélgetéseket és azokat a férfiakat, akik tudják, mit akarnak.', 'Érett, kedves férfit keresek, akivel könnyű beszélgetni.', 'Nagyra értékelem az önbizalmat, a humort és az őszinte érdeklődést.'], distances: ['12,3 km-re tőled', '8,1 km-re tőled', '5,7 km-re tőled'] },
    he: { cta: 'לצפייה בפרופיל', hint: 'החליקו כדי לראות פרופילים נוספים', modalCta: 'שלח לה הודעה', close: 'סגירת פרופיל', bios: ['אני אוהבת שיחות כנות וגברים שיודעים מה הם רוצים.', 'אני מחפשת גבר בוגר ונעים שקל לדבר איתו.', 'אני מעריכה ביטחון עצמי, הומור ועניין אמיתי.'], distances: ['במרחק 12.3 ק״מ ממך', 'במרחק 8.1 ק״מ ממך', 'במרחק 5.7 ק״מ ממך'] }
  };

  const normaliseLocale = (value = '') => {
    if (profileCopy[value]) return value;
    const raw = String(value).toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return profileCopy[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const currentCopy = () => profileCopy[getLocale()] || profileCopy['en-GB'];

  const setCopy = () => {
    const current = currentCopy();
    document.querySelectorAll('[data-profile-bio]').forEach((node, index) => {
      node.textContent = current.bios[index] || current.bios[0];
    });
    document.querySelectorAll('[data-profile-distance]').forEach((node, index) => {
      node.textContent = current.distances[index] || current.distances[0];
    });
    document.querySelectorAll('[data-profile-cta]').forEach((node) => {
      node.textContent = current.cta;
    });
    const hint = document.querySelector('[data-profile-swipe-hint]');
    if (hint) hint.textContent = current.hint;
  };

  const createProfileModal = () => {
    let modal = document.getElementById('profileDetailModal');
    if (modal) return modal;

    modal = document.createElement('dialog');
    modal.id = 'profileDetailModal';
    modal.className = 'profile-detail-modal';
    modal.innerHTML = `
      <article class="profile-detail-card">
        <button class="profile-detail-close" type="button">×</button>
        <div class="profile-detail-photo">
          <img src="" alt="" />
          <div class="profile-detail-photo-gradient"></div>
          <div class="profile-detail-heading">
            <h2></h2>
            <p class="profile-detail-distance"><span aria-hidden="true">⌖</span><span></span></p>
          </div>
        </div>
        <div class="profile-detail-body">
          <div class="profile-detail-status"><i></i><span></span></div>
          <p class="profile-detail-bio"></p>
          <button class="profile-detail-cta" type="button"><span aria-hidden="true">♥</span><span class="profile-detail-cta-copy"></span></button>
        </div>
      </article>
    `;
    document.body.appendChild(modal);

    const close = () => {
      if (!modal.open) return;
      modal.classList.add('is-closing');
      setTimeout(() => {
        modal.classList.remove('is-closing');
        modal.close();
      }, 140);
    };

    modal.querySelector('.profile-detail-close').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    modal.addEventListener('cancel', (event) => {
      event.preventDefault();
      close();
    });
    modal.querySelector('.profile-detail-cta').addEventListener('click', () => {
      close();
      setTimeout(() => document.querySelector('.mobile-sticky.js-affiliate')?.click(), 160);
    });
    return modal;
  };

  const openProfile = (card) => {
    const modal = createProfileModal();
    const current = currentCopy();
    const image = card.querySelector('.image-wrap > img');
    const heading = card.querySelector('h3');
    const distance = card.querySelector('[data-profile-distance]');
    const bio = card.querySelector('[data-profile-bio]');
    const status = card.querySelector('.status-pill span');

    const modalImage = modal.querySelector('.profile-detail-photo img');
    modalImage.src = image?.currentSrc || image?.src || '';
    modalImage.alt = heading?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-heading h2').textContent = heading?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-distance span:last-child').textContent = distance?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-bio').textContent = bio?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-status span').textContent = status?.textContent?.trim() || '';
    modal.querySelector('.profile-detail-status').classList.toggle('is-muted', card.querySelector('.status-pill')?.classList.contains('muted'));
    modal.querySelector('.profile-detail-cta-copy').textContent = current.modalCta;
    modal.querySelector('.profile-detail-close').setAttribute('aria-label', current.close);

    if (!modal.open) modal.showModal();
    setTimeout(() => modal.querySelector('.profile-detail-close')?.focus(), 30);
  };

  const initialiseCards = () => {
    const cards = [...document.querySelectorAll('.profile-card-premium')];
    cards.forEach((card, index) => {
      card.classList.remove('js-affiliate');
      card.dataset.profileIndex = String(index);
      card.setAttribute('aria-haspopup', 'dialog');
      card.addEventListener('click', () => openProfile(card));
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openProfile(card);
      });
    });
  };

  const initialiseSwipe = () => {
    const track = document.getElementById('profileSwipeTrack');
    if (!track) return;
    const cards = [...track.querySelectorAll('.profile-card-premium')];
    const dots = [...document.querySelectorAll('.profile-swipe-dot')];

    const setActiveDot = () => {
      if (!cards.length || !dots.length) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let active = 0;
      let smallest = Infinity;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < smallest) {
          smallest = distance;
          active = index;
        }
      });
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === active));
    };

    track.addEventListener('scroll', () => requestAnimationFrame(setActiveDot), { passive: true });
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
    });
    setActiveDot();
  };

  const initialise = () => {
    setCopy();
    initialiseCards();
    initialiseSwipe();
    document.getElementById('languageSelect')?.addEventListener('change', () => setTimeout(setCopy, 0));
    new MutationObserver(() => setTimeout(setCopy, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();
