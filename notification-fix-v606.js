(()=>{'use strict';
const SUPABASE_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPABASE_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
function b64urlToBytes(s){let x=s.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';const b=atob(x),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);return a}
async function call(body,token){
 const r=await fetch(SUPABASE_URL+'/functions/v1/register-push',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':'Bearer '+token},body:JSON.stringify(body||{})});
 const text=await r.text();let data;try{data=JSON.parse(text)}catch{data={raw:text}};
 if(!r.ok||data?.error)throw new Error((data?.error||data?.message||('HTTP '+r.status))+' ['+r.status+']');
 return data;
}
async function run(){
 try{
  if(!window.supabase?.createClient)throw new Error('Δεν φορτώθηκε το Supabase. Κάνε μία ανανέωση της σελίδας.');
  if(!('serviceWorker'in navigator)||!('PushManager'in window)||!('Notification'in window))throw new Error('Η συσκευή/το πρόγραμμα περιήγησης δεν υποστηρίζει Push Notifications.');
  const permission=await Notification.requestPermission();
  if(permission!=='granted')throw new Error('Η άδεια ειδοποιήσεων δεν δόθηκε.');
  const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
  const session=(await sb.auth.getSession()).data.session;
  if(!session?.access_token)throw new Error('Δεν υπάρχει ενεργή σύνδεση στον λογαριασμό. Συνδέσου πρώτα στην εφαρμογή.');
  const reg=await navigator.serviceWorker.register('./sw-v602.js',{scope:'./',updateViaCache:'none'});await reg.update();
  const ready=await navigator.serviceWorker.ready;
  const first=await call({},session.access_token);
  const publicKey=first?.publicKey;
  if(!publicKey)throw new Error('Το Supabase δεν επέστρεψε VAPID public key.');
  let sub=await ready.pushManager.getSubscription();
  if(!sub)sub=await ready.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64urlToBytes(publicKey)});
  const json=sub.toJSON();
  if(!json.endpoint||!json.keys?.p256dh||!json.keys?.auth)throw new Error('Το πρόγραμμα περιήγησης δεν επέστρεψε πλήρη Push subscription.');
  await call({endpoint:json.endpoint,keys:json.keys},session.access_token);
  alert('🔔 Οι ειδοποιήσεις ενεργοποιήθηκαν επιτυχώς στη συσκευή.');
 }catch(e){console.error('Notification fix v606',e);alert('❌ Δεν ενεργοποιήθηκαν οι ειδοποιήσεις.\n\n'+(e?.message||e));}
}
document.addEventListener('click',e=>{const el=e.target?.closest?.('#notif,#enableR');if(!el)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();run()},true);
})();
