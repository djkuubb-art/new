(() => {
  const BRAND = 'RealMeetClub';
  const OLD_BRAND = 'HeartMatch';

  const applyBranding = () => {
    if (document.title.includes(OLD_BRAND)) {
      document.title = document.title.replaceAll(OLD_BRAND, BRAND);
    }
  };

  applyBranding();
  window.addEventListener('load', applyBranding);
  document.addEventListener('languagechange', applyBranding);

  const observer = new MutationObserver(applyBranding);
  const title = document.querySelector('title');
  if (title) observer.observe(title, { childList: true, characterData: true, subtree: true });
})();
