(()=>{
'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(URL,KEY); if(!sb)return;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const today=()=>new Date().toISOString().slice(0,10);
const time=v=>v?String(v).slice(0,5):'';
let day=today();
async function user(){return (await sb.auth.getUser()).data?.user||null}
async function appointments(){const u=await user();if(!u)return;const r=await sb.from('appointments').select('*').eq('user_id',u.id).order('appointment_date',{ascending:true}).order('start_time',{ascending:true});return r.data||[]}
async function agenda(){const u=await user();if(!u)return;const [a,f,t,r,e,tr]=await Promise.all([
 sb.from('appointments').select('*').eq('user_id',u.id).eq('appointment_date',day),
 sb.from('follow_ups').select('*').eq('user_id',u.id).eq('follow_up_date',day),
 sb.from('planner_tasks').select('*').eq('user_id',u.id).eq('task_date',day),
 sb.from('reminders').select('*').eq('user_id',u.id).eq('reminder_date',day),
 sb.from('calendar_events').select('*').eq('user_id',u.id).eq('event_date',day),
 sb.from('trips').select('*').eq('user_id',u.id).lte('start_date',day).gte('end_date',day)
]);
 const items=[];for(const x of a.data||[])items.push({id:x.id,k:'appointments',s:time(x.start_time),e:time(x.end_time),title:(x.client_name||'Χωρίς πελάτη')+' · '+(x.title||'Ραντεβού')});for(const x of f.data||[])items.push({id:x.id,k:'follow_ups',s:time(x.follow_up_time),e:'',title:'📞 '+(x.title||'Follow-up')});for(const x of t.data||[])items.push({id:x.id,k:'planner_tasks',s:time(x.start_time),e:time(x.end_time),title:'📋 '+(x.title||'Εργασία')});for(const x of r.data||[])items.push({id:x.id,k:'reminders',s:time(x.reminder_time),e:'',title:'🔔 '+(x.title||'Υπενθύμιση')});for(const x of e.data||[])items.push({id:x.id,k:'calendar_events',s:time(x.start_time),e:time(x.end_time),title:'📅 '+(x.title||'Γεγονός')});for(const x of tr.data||[])items.push({id:x.id,k:'trips',s:'00:00',e:'23:59',title:'✈️ '+(x.destination||'Ταξίδι')});items.sort((a,b)=>a.s.localeCompare(b.s));return items}
function menu(){const m=document.querySelector('#menu');if(!m)return;let p=m.querySelector('[data-nikoleta-appointments]');if(!p){p=document.createElement('div');p.dataset.nikoletaAppointments='1';p.style.margin='4px 8px 8px';p.innerHTML='<button type="button" data-v="appointments" style="width:100%;text-align:left">📅 Ραντεβού</button><button type="button" data-v="agenda" style="width:100%;text-align:left;padding-left:32px">↳ Ενιαία Ατζέντα</button>';const old=m.querySelector('[data-v="calendar"]');old?.replaceWith(p);p.querySelector('[data-v="appointments"]').onclick=()=>renderAppointments();p.querySelector('[data-v="agenda"]').onclick=()=>renderAgenda();}}
async function renderAppointments(){const rows=await appointments();const main=document.querySelector('main');if(!main)return;main.innerHTML='<section><div class="pagehead"><div><h1>📅 Ραντεβού</h1><p>Τα ραντεβού σου. Η Ενιαία Ατζέντα βρίσκεται μέσα στον φάκελο.</p></div><button type="button" data-new-appointment>＋ Νέο ραντεβού</button></div>'+rows.map(x=>`<article class="rowcard"><div><b>${esc(x.client_name||'Χωρίς πελάτη')} · ${esc(x.title||'Ραντεβού')}</b><span>${esc(x.appointment_date||'')} · ${time(x.start_time)}${x.end_time?'–'+time(x.end_time):''} · ${esc(x.status||'')}</span></div></article>`).join('')||'<div class="card">Δεν υπάρχουν ραντεβού.</div>'+'</section>';main.querySelector('[data-new-appointment]')?.addEventListener('click',()=>window.NikoletaFinal?.openForm?.('appointments'))}
async function renderAgenda(){const items=await agenda();const main=document.querySelector('main');if(!main)return;main.innerHTML=`<section><div class="pagehead"><div><h1>📅 Ενιαία Ατζέντα</h1><p>Όλα τα ραντεβού, follow-ups, εργασίες, υπενθυμίσεις, γεγονότα και ταξίδια.</p></div></div><div class="calendarbar"><button type="button" data-aday="-1">‹</button><input id="nikoleta-day" type="date" value="${day}"><button type="button" data-aday="1">›</button></div><div class="card"><h3>${esc(day)} · Κατειλημμένα</h3>${items.map(x=>`<div class="event"><b>${esc(x.s)}${x.e?'–'+esc(x.e):''} · ${esc(x.title)}</b></div>`).join('')||'<p>Δεν υπάρχει γεγονός.</p>'}</div></section>`;main.querySelectorAll('[data-aday]').forEach(b=>b.onclick=()=>{const d=new Date(day+'T00:00:00');d.setDate(d.getDate()+Number(b.dataset.aday));day=d.toISOString().slice(0,10);renderAgenda()});main.querySelector('#nikoleta-day').onchange=e=>{day=e.target.value;renderAgenda()}}
function run(){menu()}
new MutationObserver(run).observe(document.body,{subtree:true,childList:true});window.addEventListener('load',run);setTimeout(run,100);window.NikoletaAppointments={renderAppointments,renderAgenda};
})();
