(()=>{'use strict';
const APPT_KEY='nw_ceo_appointments_local';
const PREFILL_KEY='nw_appt_client_prefill_v280';
const loadAppts=()=>{try{return JSON.parse(localStorage.getItem(APPT_KEY)||'[]')}catch{return[]}};
const savePrefill=name=>localStorage.setItem(PREFILL_KEY,JSON.stringify({name:String(name||'')}));
const getPrefill=()=>{try{return JSON.parse(localStorage.getItem(PREFILL_KEY)||'null')}catch{return null}};
const clearPrefill=()=>localStorage.removeItem(PREFILL_KEY);
function enhanceFolder(){
 const h=[...document.querySelectorAll('h1')].find(x=>x.textContent.trim() && x.closest('.topbar'));
 if(!h || !document.querySelector('.foldergrid')) return;
 const name=h.textContent.trim();
 const card=[...document.querySelectorAll('.foldergrid .card')].find(x=>x.querySelector('h3')?.textContent.includes('📅'));
 if(!card || card.dataset.v280==='1') return;
 card.dataset.v280='1';
 const appts=loadAppts().filter(a=>String(a.client_name||'').trim().toLowerCase()===name.toLowerCase()).sort((a,b)=>(a.appointment_date+a.start_time).localeCompare(b.appointment_date+b.start_time));
 const old=card.querySelector('.muted'); if(old) old.remove();
 const list=document.createElement('div'); list.className='v280-appt-list';
 list.innerHTML=appts.length?appts.map(a=>`<div class="v280-appt"><b>📅 ${a.appointment_date||'—'} · ${String(a.start_time||'').slice(0,5)}${a.end_time?'–'+String(a.end_time).slice(0,5):''}</b><div>${a.title||'Ραντεβού'}</div>${a.notes?`<small>${a.notes}</small>`:''}</div>`).join(''):'<div class="muted">Δεν υπάρχουν ακόμη ραντεβού για αυτόν τον πελάτη.</div>';
 const btn=card.querySelector('#newAppt'); if(btn){btn.onclick=()=>{savePrefill(name);location.hash='appointments';};}
 card.insertBefore(list,btn||null);
}
function enhanceAppointmentModal(){
 const p=getPrefill(); if(!p)return;
 const input=document.querySelector('input[name="client_name"]');
 if(input && !input.dataset.v280){input.value=p.name;input.dataset.v280='1';input.dispatchEvent(new Event('input',{bubbles:true}));
   const form=input.closest('form'); if(form){form.addEventListener('submit',()=>clearPrefill(),{once:true});}
 }
}
function css(){if(document.getElementById('v280css'))return;const s=document.createElement('style');s.id='v280css';s.textContent='.v280-appt-list{display:grid;gap:7px;margin:10px 0}.v280-appt{background:#f5faf3;border:1px solid #dfe9dc;border-radius:10px;padding:9px;font-size:13px}.v280-appt small{display:block;margin-top:4px;color:#66806b}';document.head.appendChild(s)}
function scan(){css();enhanceFolder();enhanceAppointmentModal()}
new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>setTimeout(scan,50));
setInterval(scan,500);
})();
