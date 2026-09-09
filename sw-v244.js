const CACHE='nwceo-v244';
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));}return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data?.json()||{}}catch(_){try{d={body:e.data?.text()||''}}catch(__){}}
const title=d.title||'🔔 Nikoleta Wellness CEO',body=d.body||'Έχεις μια νέα υπενθύμιση.',tag=d.tag||('nwceo-'+Date.now());e.waitUntil(self.registration.showNotification(title,{body,tag,renotify:true,requireInteraction:true,silent:false,vibrate:[250,100,250],data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=e.notification?.data?.url||'./';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus'in c){c.focus();if('navigate'in c)c.navigate(url);return}}if(clients.openWindow)return clients.openWindow(url)}))});
