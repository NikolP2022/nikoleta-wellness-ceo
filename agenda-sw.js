const CACHE='healthy-life-planner-v3';
const SHELL=['./agenda.html','./agenda-manifest.json','./agenda-icon.svg'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.all(SHELL.map(async url=>{try{const response=await fetch(url);if(response.ok)await cache.put(url,response)}catch(_){}}));try{const response=await fetch('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');if(response.ok)await cache.put('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',response)}catch(_){}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('healthy-life-planner-')&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(request.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE);await cache.put('./agenda.html',response.clone())}return response}catch(_){return (await caches.match('./agenda.html'))||Response.error()}})());return}if(url.origin===self.location.origin||url.href==='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'){event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(request);if(cached){fetch(request).then(response=>{if(response.ok)cache.put(request,response.clone())}).catch(()=>{});return cached}try{const response=await fetch(request);if(response.ok)cache.put(request,response.clone());return response}catch(_){return Response.error()}})())}});

self.addEventListener('push',event=>{
  let data={};
  try{data=event.data?event.data.json():{}}catch(_){try{data={body:event.data?.text()||''}}catch(__){}}
  const title=data.title||'Nikoleta Healthy Life';
  const options={body:data.body||'Έχεις μια προγραμματισμένη υπενθύμιση.',icon:'./agenda-icon.svg',badge:'./agenda-icon.svg',tag:data.tag||'healthy-life-reminder',renotify:true,requireInteraction:true,vibrate:[250,100,250],data:{url:data.url||'./agenda.html'}};
  event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=new URL(event.notification.data?.url||'./agenda.html',self.registration.scope).href;
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of windows){if('focus'in client){if('navigate'in client&&client.url!==target)await client.navigate(target);return client.focus()}}
    if(self.clients.openWindow)return self.clients.openWindow(target);
  })());
});
