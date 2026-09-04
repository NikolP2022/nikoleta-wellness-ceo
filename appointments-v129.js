(()=>{
'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(URL,KEY); if(!sb)return;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const today=()=>new Date().toISOString().slice(0,10);
const tm=v=>String(v||'').slice(0,5);
async function user(){return (await sb.auth.getUser()).data?.user||null}
async function clients(u){return (await sb.from('clients').select('id,name').eq('user_id',u.id).order('name')).data||[]}
async function render(){
 const main=document.querySelector('main'); const u=await user(); if(!main||!u)return;
 const r=await sb.from('appointments').select('*').eq('user_id',u.id).order('appointment_date',{ascending:true}).order('start_time',{ascending:true});
 if(r.error){main.innerHTML='<section><h1>📅 Ραντεβού</h1><div class="card">Δεν ήταν δυνατή η φόρτωση των ραντεβού.</div></section>';return}
 const cs=await clients(u); const names=Object.fromEntries(cs.map(c=>[c.id,c.name]));
 main.innerHTML=`<section class="appointments-page"><div class="pagehead"><div><h1>📅 Ραντεβού</h1><p>Τα ραντεβού σου σε ένα σημείο. Η <b>Ενιαία Ατζέντα</b> είναι διαθέσιμη μέσα από εδώ.</p></div><div class="actions"><button id="ap-new">＋ Νέο ραντεβού</button><button id="ap-agenda">📅 Ενιαία Ατζέντα</button></div></div><div class="card"><h3>Τα ραντεβού</h3>${(r.data||[]).map(x=>`<article class="ap-row"><div><b>${esc(x.title||'Ραντεβού')}</b><span>📅 ${esc(x.appointment_date||'—')} · 🕐 ${esc(tm(x.start_time))}${x.end_time?'–'+esc(tm(x.end_time)):''}</span><span>👤 ${esc(x.client_name||names[x.client_id]||'— χωρίς πελάτη —')} · ${esc(x.appointment_type||'')} ${x.status?'· '+esc(x.status):''}</span>${x.notes?`<span>📝 ${esc(x.notes)}</span>`:''}</div><div class="ap-actions"><button data-edit="${x.id}">✏️ Επεξεργασία</button><button class="danger" data-del="${x.id}">🗑️ Διαγραφή</button></div></article>`).join('')||'<p>Δεν υπάρχουν ραντεβού.</p>'}</div></section>`;
 main.querySelector('#ap-new').onclick=()=>openForm();
 main.querySelector('#ap-agenda').onclick=()=>openAgenda();
 main.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const x=(r.data||[]).find(y=>y.id===b.dataset.edit);if(x)openForm(x)});
 main.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm('Να διαγραφεί οριστικά το ραντεβού;'))return;const z=await sb.from('appointments').delete().eq('id',b.dataset.del).eq('user_id',u.id);if(z.error){alert('Δεν διαγράφηκε: '+z.error.message);return}render()});
}
async function conflict(u,date,start,end,id){
 let q=sb.from('appointments').select('id,title,start_time,end_time').eq('user_id',u.id).eq('appointment_date',date); if(id)q=q.neq('id',id);
 const rows=(await q).data||[]; const s=String(start||''); const e=String(end||start||'');
 return rows.find(x=>{const xs=String(x.start_time||'');const xe=String(x.end_time||x.start_time||'');return xs<e && xe>s});
}
async function openForm(row=null){
 const u=await user(); if(!u)return alert('Συνδέσου πρώτα στον λογαριασμό.');
 const cs=await clients(u); const m=document.createElement('div');m.className='crud-modal ap-modal';
 const clientOptions=cs.map(c=>`<option value="${esc(c.name)}" data-id="${esc(c.id)}"></option>`).join('');
 m.innerHTML=`<div class="crud-box"><div class="crud-head"><h2>${row?'✏️ Επεξεργασία ραντεβού':'＋ Νέο ραντεβού'}</h2><button type="button" data-x>×</button></div><form id="ap-form">
 <label class="full">Πελάτης<input name="client_name" list="ap-client-list" autocomplete="off" placeholder="Γράψε το όνομα του πελάτη" value="${esc(row?.client_name||cs.find(c=>c.id===row?.client_id)?.name||'')}"><datalist id="ap-client-list">${clientOptions}</datalist><input type="hidden" name="client_id" value="${esc(row?.client_id||'')}"></label>
 <label>Τίτλος<input name="title" required value="${esc(row?.title||'')}"></label>
 <label>Ημερομηνία<input name="appointment_date" type="date" required value="${esc(row?.appointment_date||today())}"></label>
 <label>Ώρα έναρξης<input name="start_time" type="time" required value="${esc(tm(row?.start_time))}"></label>
 <label>Ώρα λήξης<input name="end_time" type="time" value="${esc(tm(row?.end_time))}"></label>
 <label>Τύπος ραντεβού<input name="appointment_type" value="${esc(row?.appointment_type||'office')}"></label>
 <label>Κατάσταση<input name="status" value="${esc(row?.status||'scheduled')}"></label>
 <label>Υπενθύμιση (λεπτά)<input name="reminder_minutes" type="number" min="0" value="${esc(row?.reminder_minutes??60)}"></label>
 <label class="full">Σημειώσεις<textarea name="notes">${esc(row?.notes||'')}</textarea></label>
 <div class="crud-foot"><button type="button" data-x>Άκυρο</button><button class="primary" id="ap-save">Αποθήκευση</button></div></form></div>`;
 document.body.appendChild(m);m.querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>m.remove());
 const f=m.querySelector('form'),cn=f.elements.client_name,ci=f.elements.client_id;
 const sync=()=>{const hit=cs.find(c=>c.name.trim().toLowerCase()===cn.value.trim().toLowerCase());ci.value=hit?.id||''};cn.addEventListener('input',sync);cn.addEventListener('change',sync);sync();
 f.onsubmit=async e=>{e.preventDefault();sync();const p={user_id:u.id,client_id:ci.value||null,client_name:cn.value.trim()||null,title:f.elements.title.value.trim(),appointment_date:f.elements.appointment_date.value,start_time:f.elements.start_time.value,end_time:f.elements.end_time.value||null,appointment_type:f.elements.appointment_type.value.trim()||'office',status:f.elements.status.value.trim()||'scheduled',reminder_minutes:Number(f.elements.reminder_minutes.value||0),notes:f.elements.notes.value.trim()||null};
 if(!p.title||!p.appointment_date||!p.start_time){alert('Συμπλήρωσε τίτλο, ημερομηνία και ώρα έναρξης.');return} if(p.end_time&&p.end_time<=p.start_time){alert('Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης.');return}
 const hit=await conflict(u,p.appointment_date,p.start_time,p.end_time,row?.id);if(hit){alert(`Η ώρα είναι ήδη κατειλημμένη από: ${hit.title||'άλλο ραντεβού'}.`);return}
 const z=row?await sb.from('appointments').update(p).eq('id',row.id).eq('user_id',u.id):await sb.from('appointments').insert(p);if(z.error){alert('Δεν αποθηκεύτηκε: '+z.error.message);return}m.remove();render();};
}
async function openAgenda(){
 const u=await user();if(!u)return;const [a,f,t,e,tr]=await Promise.all([
  sb.from('appointments').select('id,title,appointment_date,start_time,end_time,client_name,client_id').eq('user_id',u.id),
  sb.from('follow_ups').select('id,title,follow_up_date,follow_up_time,client_id').eq('user_id',u.id),
  sb.from('planner_tasks').select('id,title,task_date,start_time,end_time').eq('user_id',u.id),
  sb.from('calendar_events').select('id,title,event_date,start_time,end_time').eq('user_id',u.id),
  sb.from('trips').select('id,destination,start_date,end_date').eq('user_id',u.id)
 ]);const cs=await clients(u),names=Object.fromEntries(cs.map(c=>[c.id,c.name]));
 const items=[];(a.data||[]).forEach(x=>items.push({date:x.appointment_date,start:tm(x.start_time),end:tm(x.end_time),title:'📅 '+(x.title||'Ραντεβού'),who:x.client_name||names[x.client_id]||''}));(f.data||[]).forEach(x=>items.push({date:x.follow_up_date,start:tm(x.follow_up_time),title:'📞 '+x.title,who:names[x.client_id]||''}));(t.data||[]).forEach(x=>items.push({date:x.task_date,start:tm(x.start_time),end:tm(x.end_time),title:'📋 '+x.title}));(e.data||[]).forEach(x=>items.push({date:x.event_date,start:tm(x.start_time),end:tm(x.end_time),title:'📌 '+x.title}));(tr.data||[]).forEach(x=>items.push({date:x.start_date,end:x.end_date,title:'✈️ '+x.destination}));items.sort((x,y)=>(x.date||'').localeCompare(y.date||'')||(x.start||'').localeCompare(y.start||''));
 const m=document.createElement('div');m.className='crud-modal';m.innerHTML=`<div class="crud-box"><div class="crud-head"><h2>📅 Ενιαία Ατζέντα</h2><button data-x>×</button></div><p>Όλα τα προγραμματισμένα γεγονότα μαζί.</p><div>${items.map(x=>`<article class="rowcard"><b>${esc(x.date||'—')} ${esc(x.start||'')}</b><span>${esc(x.title)}</span>${x.end?`<span>έως ${esc(x.end)}</span>`:''}${x.who?`<span>👤 ${esc(x.who)}</span>`:''}</article>`).join('')||'<p>Δεν υπάρχουν προγραμματισμένα γεγονότα.</p>'}</div><div class="crud-foot"><button type="button" data-x>Κλείσιμο</button></div></div>`;document.body.appendChild(m);m.querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>m.remove());
}
function install(){
 const menu=document.getElementById('menu');if(menu){let b=menu.querySelector('[data-v="appointments"]');if(!b){b=document.createElement('button');b.setAttribute('data-v','appointments');b.textContent='📅 Ραντεβού';const old=menu.querySelector('[data-v="calendar"]');if(old)old.replaceWith(b);else menu.appendChild(b);b.onclick=e=>{e.preventDefault();render()}}const old=menu.querySelector('[data-v="calendar"]');if(old)old.remove()}
 if(document.querySelector('main h1')?.textContent?.includes('Ραντεβού')){document.querySelectorAll('.crud-new,.crud-actions').forEach(x=>x.remove())}
}
new MutationObserver(()=>install()).observe(document.body,{childList:true,subtree:true});
window.addEventListener('load',()=>{install();if(location.hash==='#appointments')render()});
window.addEventListener('hashchange',()=>{if(location.hash==='#appointments')render()});
install();
})();