(()=>{
'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(URL,KEY);
const b64u=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');s+='='.repeat((4-s.length%4)%4);const x=atob(s);return Uint8Array.from(x,c=>c.charCodeAt(0))};
async function enable(){
  if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window)){alert('Το κινητό δεν υποστηρίζει ειδοποιήσεις push.');return}
  const p=await Notification.requestPermission();
  if(p!=='granted'){alert('Επίτρεψε τις ειδοποιήσεις για το Nikoleta Wellness CEO από τις ρυθμίσεις του κινητού.');return}
  const s=await sb?.auth.getSession();
  if(!s?.data?.session){alert('Συνδέσου πρώτα στον λογαριασμό cloud.');return}
  try{
    const reg=await navigator.serviceWorker.ready;
    let sub=await reg.pushManager.getSubscription();
    let pub=null;
    const r=await sb.functions.invoke('register-push',{body:sub?sub.toJSON():{}});
    if(r.error)throw r.error;
    pub=r.data?.publicKey;
    if(!sub){
      if(!pub)throw new Error('Δεν βρέθηκε VAPID public key');
      sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(pub)});
      const r2=await sb.functions.invoke('register-push',{body:sub.toJSON()});
      if(r2.error)throw r2.error;
    }
    await reg.showNotification('🔔 Nikoleta Wellness CEO',{body:'Δοκιμή ειδοποίησης — οι υπενθυμίσεις θα έρχονται με ήχο σύμφωνα με τις ρυθμίσεις του κινητού.',tag:'nwceo-test-'+Date.now(),renotify:true,requireInteraction:true,silent:false,vibrate:[250,100,250],data:{url:'./'}});
    alert('🔔 Οι ειδοποιήσεις ενεργοποιήθηκαν και στάλθηκε δοκιμαστική ειδοποίηση.');
  }catch(err){alert('Δεν ενεργοποιήθηκαν οι ειδοποιήσεις: '+(err?.message||err))}
}
document.addEventListener('click',e=>{if(e.target.closest('#bell')){e.stopImmediatePropagation();enable()}},true);
})();
