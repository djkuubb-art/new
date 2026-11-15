(() => {
 if (window.__pulseTrackerLoaded) return;
 window.__pulseTrackerLoaded = true;
 if (!window.crypto?.randomUUID) return;
 const supplied = new URLSearchParams(location.search).get('pulse_link');
 const validId = value => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value || '');
 // Never infer the originating fanpage from locale, profile or Facebook referrer.
 const linkId = validId(supplied) ? supplied : null;
 const clickId = crypto.randomUUID();
 let sentOutbound = false;
 const send = event => {
  const payload = JSON.stringify({event, link_id:linkId, click_id:clickId});
  try {
   if (navigator.sendBeacon?.('/api/pulse-track', new Blob([payload], {type:'application/json'}))) return;
  } catch (_) {}
  fetch('/api/pulse-track', {method:'POST',body:payload,headers:{'Content-Type':'application/json'},credentials:'omit',keepalive:true}).catch(() => {});
 };
 send('visit');
 // The age-selection flow explicitly announces its committed redirect. Opening
 // a profile, a modal or the age gate does not count as an outbound click.
 document.addEventListener('pulse:outbound', event => {
  if (sentOutbound || !event.detail?.url) return;
  let destination;try { destination = new URL(event.detail.url); } catch (_) { return; }
  if (destination.protocol !== 'https:' || destination.hostname !== 'tikhoty.pl') return;
  sentOutbound = true;send('outbound');
 });
})();
