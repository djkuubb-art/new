(() => {
  const PROFILES = Object.freeze({
    natalie: { name: 'Natalie', age: 44, image: '/images/test-au/natalie.jpg' },
    melissa: { name: 'Melissa', age: 43, image: '/images/test-au/melissa.jpg' },
    rachel: { name: 'Rachel', age: 47, image: '/images/test-au/rachel.jpg' },
    claire: { name: 'Claire', age: 45, image: '/images/test-au/claire.jpg' }
  });

  const parts = location.pathname.toLowerCase().split('/').filter(Boolean);
  const market = window.__rmcMarketContext?.market || parts[0] || '';
  const key = new URLSearchParams(location.search).get('p')?.toLowerCase() || '';
  const profile = PROFILES[key];

  if (market !== 'au' || !profile) return;

  document.documentElement.dataset.featuredProfile = key;
  window.__rmcFeaturedProfile = Object.freeze({ key, ...profile, market: 'au' });

  const setImage = (image) => {
    if (!(image instanceof HTMLImageElement)) return;
    if (image.getAttribute('src') !== profile.image) image.setAttribute('src', profile.image);
    if (image.hasAttribute('srcset')) image.removeAttribute('srcset');
    if (image.hasAttribute('sizes')) image.removeAttribute('sizes');
    if (image.alt !== profile.name) image.alt = profile.name;
  };

  const setHeadingIdentity = (heading) => {
    if (!(heading instanceof HTMLElement)) return;

    const nameNode = heading.querySelector('[data-profile="0-name"]');
    if (nameNode) {
      if (nameNode.textContent !== profile.name) nameNode.textContent = profile.name;
      let ageFound = false;
      [...heading.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .forEach((node) => {
          if (!/,\s*\d+/.test(node.textContent || '')) return;
          ageFound = true;
          const next = (node.textContent || '').replace(/,\s*\d+/, `, ${profile.age}`);
          if (node.textContent !== next) node.textContent = next;
        });
      if (!ageFound && !heading.textContent.includes(String(profile.age))) {
        heading.append(document.createTextNode(`, ${profile.age}`));
      }
      return;
    }

    const wanted = `${profile.name}, ${profile.age}`;
    if (heading.textContent !== wanted) heading.textContent = wanted;
  };

  const replaceAnnaText = (root) => {
    if (!(root instanceof Element)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const raw = node.textContent || '';
      const next = raw.replace(/\bAnna\b/g, profile.name);
      if (raw !== next) node.textContent = next;
    });
  };

  const sync = () => {
    // Main profile imagery only. Lower gallery is intentionally excluded.
    [
      document.querySelector('.invite-avatar img'),
      document.querySelector('.hero-invite .featured-profile > img'),
      document.querySelector('.hero-invite .avatar-small img'),
      document.querySelector('.anna-notification-avatar img')
    ].forEach(setImage);

    const inviteIdentity = document.querySelector('.invite-preview strong');
    if (inviteIdentity) {
      const wanted = `${profile.name}, ${profile.age}`;
      if (inviteIdentity.textContent !== wanted) inviteIdentity.textContent = wanted;
    }

    setHeadingIdentity(document.querySelector('.hero-invite .featured-profile h2'));

    const miniName = document.querySelector('.hero-invite .mini-message strong');
    if (miniName && miniName.textContent !== profile.name) miniName.textContent = profile.name;

    const notificationName = document.querySelector('.anna-notification strong');
    if (notificationName) {
      const wanted = `${profile.name}, ${profile.age}`;
      if (notificationName.textContent !== wanted) notificationName.textContent = wanted;
    }

    // Replace Anna only inside main-profile UI; never touch the lower gallery.
    replaceAnnaText(document.querySelector('.personal-invite'));
    replaceAnnaText(document.querySelector('.phone-card'));
    replaceAnnaText(document.querySelector('.anna-notification'));
  };

  let queued = false;
  const queueSync = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sync();
    });
  };

  const initialise = () => {
    sync();

    const roots = [
      document.querySelector('.personal-invite'),
      document.querySelector('.phone-card')
    ].filter(Boolean);

    roots.forEach((root) => {
      new MutationObserver(queueSync).observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
      });
    });

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(sync, 0);
      window.setTimeout(sync, 350);
    });

    // Cover late profile/localisation scripts and the delayed desktop voice notice.
    [0, 120, 350, 800, 1600, 3200, 8100, 8600, 9500].forEach((delay) => {
      window.setTimeout(sync, delay);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
