# HeartMatch multilingual affiliate landing.

Static Vercel landing page with native dictionary-based translations, country/language detection and a central affiliate redirect.

## Affiliate URL
Set `AFFILIATE_URL` in Vercel Environment Variables. The fallback is `https://www.realmeetclub.com/`.

## Language selection priority
1. `?lang=de` URL parameter
2. Visitor's saved manual choice
3. Vercel country header (`/api/geo`)
4. Browser language
5. `en-GB`

## Main files
- `index.html` — page structure
- `styles.css` — all styling
- `app.js` — dictionaries and localization logic
- `api/geo.js` — country lookup
- `api/go.js` — affiliate redirect preserving tracking parameters
