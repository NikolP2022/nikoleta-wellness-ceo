(()=>{'use strict';
let audioCtx=null;
function unlockAudio(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended') audioCtx.resume()}catch(e){}}
function beep(){try{unlockAudio(); if(!audioCtx)return; const o=audioCtx.createOscillator(),g=audioCtx.createGain(); o.type='sine';o.frequency.value=880;g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.35,audioCtx.currentTime+.03);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.65);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.7)}catch(e){}}
['click','touchstart','keydown'].forEach(ev=>document.addEventListener(ev,unlockAudio,{capture:true,passive:true}));
window.NWPlayReminderSound=beep;
const oldShow=ServiceWorkerRegistration.prototype.showNotification;
ServiceWorkerRegistration.prototype.showNotification=function(title,options={}){options={...options,silent:false,renotify:true}; return oldShow.call(this,title,options)};
window.addEventListener('load',()=>{if('Notification' in window && Notification.permission==='granted') window.NWReminderSoundReady=true});
})();
