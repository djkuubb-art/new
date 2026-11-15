// Cloudflare Pages Function. No credentials belong in this public repository.
const VERSION = 'pulse-collector-v1';
const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const response = (value, status = 200) => new Response(value === null ? null : JSON.stringify(value), {status, headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function tokenMatches(actual, expected) {
 if (typeof expected !== 'string' || !/^[a-f0-9]{64}$/i.test(expected) || typeof actual !== 'string') return false;
 const digest = s => crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
 const [a,b] = await Promise.all([digest(actual),digest(expected)]);const x=new Uint8Array(a),y=new Uint8Array(b);let diff=0;for(let i=0;i<x.length;i++)diff|=x[i]^y[i];return diff===0;
}
async function smallJson(request) {
 const reader=request.body?.getReader();if(!reader)throw new Error('body');const chunks=[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>4096){await reader.cancel();throw new Error('size');}chunks.push(value);}
 const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}return JSON.parse(new TextDecoder().decode(bytes));
}
export async function onRequest({request,env}) {
 const url=new URL(request.url);
 if(!['GET','POST'].includes(request.method))return response({error:'Method not allowed'},405);
 if(request.method==='GET') {
  if(!await tokenMatches(request.headers.get('X-Pulse-Token'),env.PULSE_EXPORT_KEY))return response({error:'Unauthorized'},401);
  if(!env.PULSE_DB)return response({error:'Collector storage not configured'},503);
  const after=Number(url.searchParams.get('after')??0),limit=Number(url.searchParams.get('limit')??200);
  if(!Number.isSafeInteger(after)||after<0||!Number.isSafeInteger(limit)||limit<1||limit>200)return response({error:'Invalid cursor or limit'},400);
  try {
   // Sequence belongs to ALL events; untagged events still advance the cursor.
   const result=await env.PULSE_DB.prepare('SELECT id,event,link_id,click_id,occurred_at FROM pulse_events WHERE id>? ORDER BY id ASC LIMIT ?').bind(after,limit+1).all();
   const rows=result.results.slice(0,limit),events=rows.filter(r=>r.link_id).map(r=>({event_id:`${r.event}:${r.click_id}`,event:r.event,link_id:r.link_id,click_id:r.click_id,occurred_at:r.occurred_at,lead_id:'',amount:'',currency:'',status:''}));
   const summary=await env.PULSE_DB.prepare("SELECT substr(occurred_at,1,10) day,event,CASE WHEN link_id IS NULL THEN 0 ELSE 1 END tagged,COUNT(*) count FROM pulse_events WHERE occurred_at>=? GROUP BY day,event,tagged ORDER BY day").bind(new Date(Date.now()-90*86400000).toISOString().slice(0,10)).all();
   return response({version:VERSION,events,nextCursor:rows.at(-1)?.id??after,hasMore:result.results.length>limit,summary:{version:1,capturedAt:new Date().toISOString(),timezone:'UTC',days:summary.results}});
  }catch{return response({error:'Collector storage unavailable; cursor unchanged'},503);}
 }
 const allowed=new Set(['https://realmeetclub.com','https://www.realmeetclub.com']);
 if(env.PULSE_ORIGIN)allowed.add(env.PULSE_ORIGIN);
 if(!allowed.has(url.origin)||request.headers.get('Origin')!==url.origin||request.headers.get('Sec-Fetch-Site')==='cross-site')return response({error:'Forbidden origin'},403);
 if(env.PULSE_ENABLED!=='true'||!env.PULSE_DB||!/^[a-f0-9]{64}$/i.test(env.PULSE_EXPORT_KEY??''))return response({error:'Collector not enabled'},503);
 let data;try{data=await smallJson(request);}catch{return response({error:'Invalid payload'},400);}
 if(!['visit','outbound'].includes(data.event)||!uuid(data.click_id)||(data.link_id!==null&&!uuid(data.link_id)))return response({error:'Invalid event'},400);
 // One browser navigation, two possible event types. No IP, email, UA, full URL,
 // age choice, cookie ID or form contents are stored. Browser events are not leads.
 try {
  const prior=await env.PULSE_DB.prepare('SELECT link_id FROM pulse_events WHERE click_id=? LIMIT 1').bind(data.click_id).first();
  if(prior&&prior.link_id!==data.link_id)return response({error:'Conflicting source'},409);
  await env.PULSE_DB.prepare('INSERT INTO pulse_events(event_id,event,link_id,click_id,occurred_at) VALUES(?,?,?,?,?) ON CONFLICT(event_id) DO NOTHING').bind(`${data.event}:${data.click_id}`,data.event,data.link_id,data.click_id,new Date().toISOString()).run();
  return response(null,204);
 }catch{return response({error:'Collector storage unavailable'},503);}
}
