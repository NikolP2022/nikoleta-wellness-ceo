const CACHE='nwceo-v618';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={title:'Nikoleta Wellness CEO',body:'Έχεις μια υπενθύμιση.',url:'./index-v617.html'};try{d={...d,...e.data?.json()}}catch(_){try{d.body=e.data?.text()||d.body}catch(__){}}e.waitUntil(self.registration.showNotification(d.title,{body:d.body||'',tag:d.tag||'nwceo-reminder',icon:'./icon-192.png',badge:'./icon-192.png',requireInteraction:true,renotify:true,silent:false,vibrate:[200,100,200],data:{url:d.url||'./index-v617.html'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus'in c){c.focus();if('navigate'in c)c.navigate(e.notification.data?.url||'./index-v617.html');return c}}return clients.openWindow(e.notification.data?.url||'./index-v617.html')}))});
