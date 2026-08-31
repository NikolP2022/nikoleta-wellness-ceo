const CACHE='nwceo-v9';
const FILES=['./','./index.html','./styles.css?v=8','./app-final.js?v=8','./manifest.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{const network=fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>cached);return cached||network}))});
