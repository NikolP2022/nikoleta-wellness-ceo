(()=>{
  const KEY='nwceo_notifications_v1';
  const pad=n=>String(n).padStart(2,'0');
  const now=()=>new Date();
  const parse=(date,time)=>{if(!date)return null;const [y,m,d]=String(date).slice(0,10).split('-').map(Number);const [hh,mm]=String(time||'09:00').slice(0,5).split(':').map(Number);const x=new Date(y,m-1,d,hh||0,mm||0,0,0);return isNaN(x)?null:x};
  const notify=async(title,body)=>{try{if(!('Notification'in window))return false;if(Notification.permission!=='granted')return false;new Notification(title,{body,tag:'nwceo-'+title});return true}catch(e){return false}};
  async function request(){if(!('Notification'in window))return 'unsupported'; if(Notification.permission==='default') return await Notification.requestPermission(); return Notification.permission}
  const getData=()=>{try{return JSON.parse(localStorage.getItem('nwceo_final_v1')||'{}')}catch(e){return {}}};
  const collect=()=>{const d=getData(),out=[];const push=(arr,type)=>{if(!Array.isArray(arr))return;arr.forEach(x=>{if(x?.reminder||x?.reminderAt||x?.notifyAt||x?.reminderDate){const date=x.date||x.start_date||x.reminderDate||String(x.reminderAt||x.notifyAt||'').slice(0,10);const time=x.time||x.start_time||String(x.reminderAt||x.notifyAt||'').slice(11,16)||'09:00';const at=parse(date,time);if(at)out.push({id:x.id||type+'-'+date+'-'+time,title:x.title||x.name||type,body:x.notes||x.description||x.client_name||'',at,type})}})};push(d.reminders,'Υπενθύμιση');push(d.appointments,'Ραντεβού');push(d.followups,'Follow-up');push(d.tasks,'Εργασία');return out};
  const sent=new Set(JSON.parse(localStorage.getItem(KEY)||'[]'));
  const tick=()=>{const t=Date.now();collect().forEach(r=>{if(r.at.getTime()<=t+30000&&r.at.getTime()>t-90000&&!sent.has(String(r.id))){notify('Nikoleta Wellness CEO',`${r.title}${r.body?' — '+r.body:''}`);sent.add(String(r.id))}});localStorage.setItem(KEY,JSON.stringify([...sent].slice(-500)))};
  window.NWNotifications={request,refresh:tick};
  document.addEventListener('click',e=>{if(e.target.closest('[data-view="reminders"],[data-view="appointments"],[data-view="followups"]'))request()},{once:false});
  request();tick();setInterval(tick,15000);
})();