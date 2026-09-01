const CACHE='nwceo-v25';
const FILES=['./','./index.html','./styles.css?v=35','./app-final.js?v=35','./db-table-fix.js?v=35','./db-schema-compat.js?v=35','./clean-auth.js?v=35','./session-ui-fix.js?v=35','./cloud-sync-fix.js?v=35','./manifest.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(u.pathname.endsWith('/app-final.js')||u.pathname.endsWith('/clean-auth.js')||u.pathname.endsWith('/cloud-sync-fix.js')){e.respondWith(fetch(e.request).then(async r=>{if(!r.ok)return r;const text=await r.text();return new Response(text,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'no-store'}})}).catch(()=>caches.match(e.request)));return}
 if(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')){e.respondWith(fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r})));
});