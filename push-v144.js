(()=>{
'use strict';
if(window.__NWCEO_PUSH144)return; window.__NWCEO_PUSH144=true;
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(URL,KEY);
const b64u=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');s+='='.repeat((4-s.length%4)%4);const x=atob(s);return Uint8Array.from(x,c=>c.charCodeAt(0))};
function beep(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=880;g.gain.value=.08;o.connect(g);g.connect(c.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.35);o.stop(c.currentTime+.35)}catch(_){}}
async function enable(){
  if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window)){alert('Το κινητό/πρόγραμμα περιήγησης δεν υποστηρίζει ειδοποιήσεις push.');return}
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent)&&!window.matchMedia('(display-mode: standalone)').matches){alert('Στο iPhone/iPad πρέπει πρώτα να προσθέσεις την εφαρμογή στην Αρχική οθόνη. Μετά άνοιξέ την από εκεί και ξαναπάτησε 🔔.');return}
  const p=await Notification.requestPermission();
  if(p!=='granted'){alert('Οι ειδοποιήσεις είναι μπλοκαρισμένες. Ενεργοποίησέ τες από τις ρυθμίσεις ειδοποιήσεων του κινητού.');return}
  beep();
  const s=await sb?.auth.getSession();
  if(!s?.data?.session){alert('Συνδέσου πρώτα στον λογαριασμό cloud.');return}
  try{
    const reg=await navigator.serviceWorker.ready;
    let sub=await reg.pushManager.getSubscription();
    const r=await sb.functions.invoke('register-push',{body:sub?sub.toJSON():{}});
    if(r.error)throw r.error;
    const pub=r.data?.publicKey;
    if(!sub){
      if(!pub)throw new Error('Δεν βρέθηκε VAPID public key.');
      sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(pub)});
      const r2=await sb.functions.invoke('register-push',{body:sub.toJSON()});
      if(r2.error)throw r2.error;
    }
    await reg.showNotification('🔔 Nikoleta Wellness CEO',{body:'Δοκιμή ειδοποίησης. Αν δεν ακούστηκε ήχος, έλεγξε τον ήχο ειδοποιήσεων του Chrome/της εφαρμογής στις ρυθμίσεις του κινητού.',tag:'nwceo-test-v144-'+Date.now(),renotify:true,requireInteraction:true,silent:false,vibrate:[250,100,250],data:{url:'./'}});
    alert('Η δοκιμή ειδοποίησης στάλθηκε. Ο ήχος της ειδοποίησης ελέγχεται από τις ρυθμίσεις του κινητού/browser.');
  }catch(err){alert('Δεν ενεργοποιήθηκαν οι ειδοποιήσεις: '+(err?.message||err))}
}
document.addEventListener('click',e=>{if(e.target.closest('#bell')){e.preventDefault();e.stopImmediatePropagation();enable()}},true);
})();
