(()=>{'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
let sb; const D='nikoleta_appt_v612';
const client=()=>sb||(sb=window.supabase.createClient(URL,KEY));
const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function draft(){try{return JSON.parse(sessionStorage.getItem(D)||'{}')}catch{return{}}}
function saveDraft(v){try{sessionStorage.setItem(D,JSON.stringify(v))}catch{}}
function clearDraft(){try{sessionStorage.removeItem(D)}catch{}}
function close(){document.getElementById('appt612')?.remove()}
function open(editId=null,row=null){
 close(); const d=row?{name:row.client_name||'',phone:row.phone||'',date:row.appointment_date||'',start:(row.start_time||'').slice(0,5),end:(row.end_time||'').slice(0,5),type:row.appointment_type||'office',rem:row.reminder_minutes??60,notes:row.notes||'',editId}:{...draft()};
 const today=new Date().toISOString().slice(0,10); if(!d.date)d.date=today;
 const m=document.createElement('div');m.id='appt612';m.className='modal';m.style.cssText='position:fixed;inset:0;background:#10261c99;z-index:9999;display:flex;align-items:center;justify-content:center;padding:14px';
 m.innerHTML=`<div style="background:#fffdf8;border-radius:22px;width:min(680px,100%);max-height:94vh;overflow:auto;padding:20px;box-shadow:0 15px 45px #0004"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="color:#245b2b;margin:0">📅 ${editId?'Επεξεργασία ραντεβού':'Νέο ραντεβού'}</h2><button id="a612x" type="button" style="border:0;border-radius:9px;padding:8px 12px">×</button></div><form id="a612f"><label>👤 Ονοματεπώνυμο<input name="name" required autocomplete="name" value="${esc(d.name)}" placeholder="Ονοματεπώνυμο"></label><label>📞 Τηλέφωνο<input name="phone" type="tel" autocomplete="tel" value="${esc(d.phone)}" placeholder="Τηλέφωνο"></label><label>📅 Ημερομηνία<input name="date" type="date" required value="${esc(d.date)}"></label><label>⏰ Ώρα έναρξης<input name="start" type="time" required value="${esc(d.start)}"></label><label>⏰ Ώρα λήξης<input name="end" type="time" value="${esc(d.end)}"></label><label>📌 Τύπος ραντεβού<input name="type" value="${esc(d.type||'office')}" placeholder="Tanita / Wellness / Follow-up"></label><label>🔔 Υπενθύμιση λεπτά πριν<input name="rem" type="number" min="0" value="${esc(d.rem??60)}"></label><label>📝 Σημειώσεις<textarea name="notes" placeholder="Σημειώσεις...">${esc(d.notes)}</textarea></label><div id="a612msg" style="margin:10px 0;color:#a43b3b;font-weight:700"></div><button type="submit" style="width:100%;border:0;border-radius:11px;padding:13px;background:#245b2b;color:white;font-weight:800">💾 Αποθήκευση ραντεβού</button></form></div>`;
 document.body.appendChild(m); const f=m.querySelector('#a612f');
 f.addEventListener('input',()=>{const v=Object.fromEntries(new FormData(f));v.rem=Number(v.rem||60);saveDraft(v)});
 m.querySelector('#a612x').onclick=close;
 m.addEventListener('click',e=>{if(e.target===m)close()});
 f.addEventListener('submit',async e=>{e.preventDefault();const b=Object.fromEntries(new FormData(f));const msg=m.querySelector('#a612msg');msg.textContent='Αποθήκευση…';const s=client(),u=(await s.auth.getUser()).data.user;if(!u){msg.textContent='Η σύνδεση έχει λήξει.';return}
 let clientId=null;const cq=await s.from('clients').select('id,name').eq('user_id',u.id);if(cq.error){msg.textContent='Σφάλμα φόρτωσης πελατών: '+cq.error.message;return}const found=(cq.data||[]).find(c=>String(c.name||'').trim().toLowerCase()===String(b.name||'').trim().toLowerCase());if(found)clientId=found.id;
 const data={user_id:u.id,client_id:clientId,client_name:String(b.name||'').trim(),phone:String(b.phone||'').trim()||null,title:'Ραντεβού — '+String(b.name||'').trim(),appointment_date:b.date,start_time:b.start,end_time:b.end||null,appointment_type:b.type||'office',status:'scheduled',reminder_minutes:Number(b.rem||60),notes:String(b.notes||'').trim()||null};
 let r;if(editId)r=await s.from('appointments').update(data).eq('id',editId).eq('user_id',u.id);else r=await s.from('appointments').insert(data);
 if(r.error){msg.textContent='❌ '+r.error.message;console.error('appointment v612',r.error);return} clearDraft();close();location.reload();
 });
}
function text(el){return (el?.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}
document.addEventListener('click',async e=>{if(location.hash!=='#appointments')return;const el=e.target.closest('button,a,[data-edit]');if(!el)return;const t=text(el);const id=el.dataset.edit||el.closest('[data-edit]')?.dataset.edit||null;
 if(id){e.preventDefault();e.stopImmediatePropagation();const s=client(),u=(await s.auth.getUser()).data.user;if(!u)return;const r=await s.from('appointments').select('*').eq('id',id).eq('user_id',u.id).single();if(r.error){alert('Δεν μπορώ να ανοίξω το ραντεβού: '+r.error.message);return}open(id,r.data);return}
 if(t.includes('νέο ραντεβού')||t.includes('νέο ραντεβου')||t.includes('προσθήκη ραντεβού')||t.includes('προσθηκη ραντεβου')||t==='＋ νέο'||t==='＋ νεο'){e.preventDefault();e.stopImmediatePropagation();open();}
},true);
})();
