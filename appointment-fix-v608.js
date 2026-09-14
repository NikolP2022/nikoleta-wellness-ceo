(()=>{'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
let sb=null;
function client(){if(sb)return sb;sb=window.supabase?.createClient?.(URL,KEY);return sb}
function install(){document.addEventListener('submit',async e=>{const f=e.target;if(!f||f.id!=='ef'||location.hash!=='#appointments')return;const box=f.closest('.box');if(!box)return;const h=box.querySelector('h2')?.textContent||'';if(!h.includes('Νέα εγγραφή'))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const s=client(); const {data:{user}}=await s.auth.getUser(); if(!user){alert('Η σύνδεση έληξε. Κάνε ξανά σύνδεση.');return}
 const val=n=>f.elements[n]?.value??'';
 const data={user_id:user.id,client_id:val('client_id')||null,title:val('title').trim(),appointment_date:val('appointment_date'),start_time:val('start_time'),end_time:val('end_time')||null,appointment_type:val('appointment_type')||'office',status:val('status')||'scheduled',reminder_minutes:val('reminder_minutes')===''?60:Number(val('reminder_minutes')),notes:val('notes')||null};
 if(!data.title||!data.appointment_date||!data.start_time){alert('Συμπλήρωσε Τίτλο, Ημερομηνία και Ώρα έναρξης.');return}
 const c=(window.__ceoCache?.clients||[]).find(x=>x.id===data.client_id);data.client_name=c?.name||'';
 const r=await s.from('appointments').insert(data).select().single();
 if(r.error){alert('❌ Δεν αποθηκεύτηκε το ραντεβού:\n'+r.error.message);return}
 box.closest('.modal')?.remove(); location.hash='#appointments'; window.dispatchEvent(new HashChangeEvent('hashchange')); alert('✅ Το ραντεβού αποθηκεύτηκε κανονικά.');
 },true);
 const mo=new MutationObserver(()=>{try{const x=window.cache;if(x)window.__ceoCache=x}catch{}});mo.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();