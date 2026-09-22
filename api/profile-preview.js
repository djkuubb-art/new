const TITLES = {
  uk: 'Click to accept the invitation',
  gb: 'Click to accept the invitation',
  ie: 'Click to accept the invitation',
  au: 'Click to accept the invitation',
  nz: 'Click to accept the invitation',
  us: 'Click to accept the invitation',
  ca: 'Click to accept the invitation',
  sg: 'Click to accept the invitation',
  de: 'Klicke, um die Einladung anzunehmen',
  at: 'Klicke, um die Einladung anzunehmen',
  ch: 'Klicke, um die Einladung anzunehmen',
  nl: 'Klik om de uitnodiging te accepteren',
  be: 'Klik om de uitnodiging te accepteren',
  fr: 'Clique pour accepter l’invitation',
  it: 'Clicca per accettare l’invito',
  es: 'Haz clic para aceptar la invitación',
  pt: 'Clica para aceitar o convite',
  pl: 'Kliknij, aby odebrać zaproszenie',
  se: 'Klicka för att acceptera inbjudan',
  no: 'Klikk for å godta invitasjonen',
  dk: 'Klik for at acceptere invitationen',
  fi: 'Klikkaa hyväksyäksesi kutsun',
  gr: 'Κάνε κλικ για να αποδεχτείς την πρόσκληση',
  cy: 'Κάνε κλικ για να αποδεχτείς την πρόσκληση',
  hr: 'Klikni za prihvaćanje pozivnice',
  si: 'Klikni za sprejem povabila',
  sk: 'Klikni a prijmi pozvanie',
  cz: 'Klikni a přijmi pozvání',
  hu: 'Kattints a meghívás elfogadásához',
  bg: 'Кликни, за да приемеш поканата',
  ro: 'Apasă pentru a accepta invitația',
  ee: 'Klõpsa kutse vastuvõtmiseks',
  lt: 'Spustelėk, kad priimtum kvietimą',
  lv: 'Noklikšķini, lai pieņemtu uzaicinājumu',
  ua: 'Натисни, щоб прийняти запрошення',
  il: 'לחץ כדי לקבל את ההזמנה'
};

const LOCALES = {
  uk: 'en_GB', gb: 'en_GB', ie: 'en_IE', au: 'en_AU', nz: 'en_NZ',
  us: 'en_US', ca: 'en_CA', sg: 'en_SG',
  de: 'de_DE', at: 'de_AT', ch: 'de_CH',
  nl: 'nl_NL', be: 'nl_BE', fr: 'fr_FR', it: 'it_IT', es: 'es_ES',
  pt: 'pt_PT', pl: 'pl_PL', se: 'sv_SE', no: 'nb_NO', dk: 'da_DK',
  fi: 'fi_FI', gr: 'el_GR', cy: 'el_CY', hr: 'hr_HR', si: 'sl_SI',
  sk: 'sk_SK', cz: 'cs_CZ', hu: 'hu_HU', bg: 'bg_BG', ro: 'ro_RO',
  ee: 'et_EE', lt: 'lt_LT', lv: 'lv_LV', ua: 'uk_UA', il: 'he_IL'
};

const HTML_LANG = {
  uk: 'en-GB', gb: 'en-GB', ie: 'en-IE', au: 'en-AU', nz: 'en-NZ',
  us: 'en-US', ca: 'en-CA', sg: 'en-SG',
  de: 'de', at: 'de', ch: 'de', nl: 'nl', be: 'nl', fr: 'fr',
  it: 'it', es: 'es', pt: 'pt', pl: 'pl', se: 'sv', no: 'no',
  dk: 'da', fi: 'fi', gr: 'el', cy: 'el', hr: 'hr', si: 'sl',
  sk: 'sk', cz: 'cs', hu: 'hu', bg: 'bg', ro: 'ro', ee: 'et',
  lt: 'lt', lv: 'lv', ua: 'uk', il: 'he'
};

const IMAGE = 'https://realmeetclub.com/pobrane%20(1).jpg?v=20260921-maria4';

const esc = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

module.exports = function handler(req, res) {
  const market = String(req.query?.market || '').toLowerCase();
  const profile = String(req.query?.profile || '').toLowerCase();
  const title = TITLES[market];

  if (!title || profile !== `maria${market}`) {
    const fallbackMarket = TITLES[market] ? market : 'uk';
    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(302, `/${fallbackMarket}/post`);
  }

  const canonical = `https://realmeetclub.com/${market}/profile/${profile}`;
  const target = `/${market}/post`;
  const lang = HTML_LANG[market] || 'en';
  const locale = LOCALES[market] || 'en_GB';
  const dir = market === 'il' ? 'rtl' : 'ltr';

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=600');
  res.setHeader('X-Robots-Tag', 'noindex, follow, noarchive');

  res.end(`<!doctype html>
<html lang="${esc(lang)}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow,noarchive">
  <title>${esc(title)}</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="RealMeetClub">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:locale" content="${esc(locale)}">
  <meta property="og:image" content="${IMAGE}">
  <meta property="og:image:secure_url" content="${IMAGE}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="Maria">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:image" content="${IMAGE}">
</head>
<body>
  <p><a href="${esc(target)}">${esc(title)}</a></p>
  <script>
    (function () {
      var suffix = window.location.search + window.location.hash;
      window.location.replace(${JSON.stringify(target)} + suffix);
    }());
  </script>
</body>
</html>`);
};
