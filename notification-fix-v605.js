(()=>{'use strict';
const SUPABASE_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPABASE_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
let client;
function b64urlToBytes(s){let x=s.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';const b=atob(x),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a}
async function runPush(){
 try{
  if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window))throw new Error('Η συσκευή/το πρόγραμμα περιήγησης δεν υποστηρίζει Push Notifications.');
  const permission=await Notification.requestPermission();
  if(permission!=='granted')throw new Error('Η άδεια ειδοποιήσεων δεν δόθηκε.');
  if(!client){
   const m=window.supabase||await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.0/+esm');
   client=(m.createClient?m.createClient:window.supabase.createClient)(SUPABASE_URL,SUPABASE_KEY);
  }
  const session=(await client.auth.getSession()).data.session;
  if(!session)throw new Error('Δεν υπάρχει ενεργή σύνδεση στον λογαριασμό.');
  const reg=await navigator.serviceWorker.register('./sw-v602.js',{updateViaCache:'none'});await reg.update();
  const first=await client.functions.invoke('register-push',{body:{}});
  if(first.error)throw new Error('Supabase: '+first.error.message);
  const publicKey=first.data?.publicKey;
  if(!publicKey)throw new Error(first.data?.error||'Το Supabase δεν επέστρεψε VAPID public key.');
  let sub=await reg.pushManager.getSubscription();
  if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64urlToBytes(publicKey)});
  const json=sub.toJSON();
  const second=await client.functions.invoke('register-push',{body:{endpoint:json.endpoint,keys:json.keys}});
  if(second.error)throw new Error('Αποθήκευση συσκευής: '+second.error.message);
  alert('🔔 Οι ειδοποιήσεις ενεργοποιήθηκαν επιτυχώς στη συσκευή.');
 }catch(e){alert('❌ Δεν ενεργοποιήθηκαν οι ειδοποιήσεις.\n\n'+(e?.message||e));console.error('Notification fix v605',e)}
}
document.addEventListener('click',e=>{const el=e.target?.closest?.('#notif,#enableR');if(!el)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();runPush()},true);
})();
