(()=>{
'use strict';
if(window.__NWCEO_LAYOUT245)return;
window.__NWCEO_LAYOUT245=true;
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.__NWCEO_DB||window.supabase?.createClient(URL,KEY);
const $=(s,r=document)=>r.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const time=v=>String(v||'').slice(0,5)||'—';
const today=()=>new Date().toISOString().slice(0,10);
const greekDate=d=>new Date(`${d}T00:00:00`).toLocaleDateString('el-GR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const routes=[
 ['home','🏠','Αρχική','#'],
 ['appointments','📅','Ραντεβού','#appointments'],
 ['clients','👥','Πελάτες','#clients'],
 ['partners','🤝','Συνεργάτες','#partners'],
 ['followups','📞','Follow-ups','#followups'],
 ['orders','🛒','Παραγγελίες','#orders'],
 ['documents','📄','Έγγραφα','#documents'],
 ['trips','✈️','Ταξίδια','#trips'],
 ['training','📚','Εκπαιδεύσεις','#nw-training'],
 ['academy','🎓','Academy','#nw-academy'],
 ['inventory','📦','Αποθήκη','#nw-inventory'],
 ['reports','📊','Reports','#nw-reports'],
 ['sound','🔊','Ήχος & Ειδοποιήσεις',null],
 ['account','👤','Λογαριασμός',null]
];
const css=document.createElement('style');css.textContent=`
#nw245-top{position:fixed;top:0;left:0;right:0;height:68px;z-index:910000;display:flex;align-items:center;gap:12px;padding:8px 14px;box-sizing:border-box;background:rgba(255,253,248,.97);border-bottom:1px solid #dfe8df;box-shadow:0 5px 22px #173b1912;backdrop-filter:blur(12px);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
#nw245-top button{border:1px solid #d6e0d5;background:#fff;border-radius:13px;min-width:44px;height:44px;font-size:22px;cursor:pointer;color:#245b2b}
#nw245-brand{flex:1;min-width:0}.nw245-brand-main{display:block;color:#19351f;font-weight:950;font-size:17px;line-height:1.1}.nw245-brand-sub{display:block;color:#78917c;font-size:10px;font-weight:800;margin-top:3px;letter-spacing:.04em}
#nw245-drawer{position:fixed;top:0;left:0;bottom:0;width:min(330px,88vw);z-index:920000;transform:translateX(-105%);transition:transform .22s ease;background:#fffdf8;box-shadow:18px 0 45px #173b1930;padding:82px 14px 18px;box-sizing:border-box;overflow:auto;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
#nw245-drawer.open{transform:translateX(0)}
#nw245-overlay{position:fixed;inset:0;z-index:915000;background:#173b1948;display:none}#nw245-overlay.open{display:block}
.nw245-menu-title{font-size:10px;font-weight:950;color:#78917c;letter-spacing:.12em;padding:4px 8px 8px}.nw245-menu-group{display:grid;gap:5px}.nw245-item{width:100%;display:flex;align-items:center;gap:12px;text-align:left;border:0;background:transparent;color:#203322;padding:11px 12px;border-radius:13px;font:inherit;font-weight:850;cursor:pointer}.nw245-item:hover,.nw245-item.active{background:#edf6ee;color:#245b2b}.nw245-icon{width:27px;text-align:center;font-size:19px}.nw245-divider{height:1px;background:#e5eadf;margin:12px 6px}
#app{padding-top:68px!important;min-height:100vh;box-sizing:border-box}#app>header,#app>aside#menu{display:none!important}#nw242-recovery{display:none!important}
#nw245-home{max-width:1080px;margin:0 auto;padding:22px 16px 90px;box-sizing:border-box;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#203322}.nw245-welcome{background:linear-gradient(135deg,#f4f8f0,#fffdf8);border:1px solid #dce8da;border-radius:24px;padding:22px;box-shadow:0 12px 35px #173b1910}.nw245-kicker{font-size:10px;letter-spacing:.13em;font-weight:950;color:#78917c}.nw245-welcome h1{margin:7px 0 5px;font-size:27px;color:#19351f}.nw245-welcome p{margin:0;color:#667267}.nw245-date{margin-top:14px;font-weight:850;color:#245b2b;text-transform:capitalize}.nw245-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}.nw245-stat{background:#fffdf8;border:1px solid #e1e8df;border-radius:17px;padding:13px;box-shadow:0 6px 20px #173b190a}.nw245-stat b{display:block;font-size:22px;color:#245b2b}.nw245-stat span{font-size:11px;color:#6d786f;font-weight:800}.nw245-day{background:#fff;border:1px solid #e1e8df;border-radius:20px;padding:17px;box-shadow:0 8px 25px #173b1910}.nw245-day h2{margin:0;color:#245b2b}.nw245-day-sub{color:#7b867d;font-size:12px;margin-top:3px}.nw245-timeline{margin-top:15px;display:grid;gap:8px}.nw245-entry{display:grid;grid-template-columns:58px 1fr;gap:10px;align-items:start}.nw245-hour{font-size:12px;font-weight:950;color:#78917c;padding-top:10px;text-align:right}.nw245-entry-card{border-left:3px solid #8caf8e;background:#f7faf5;border-radius:0 13px 13px 0;padding:9px 11px}.nw245-entry-card strong{display:block;color:#19351f}.nw245-entry-card small{display:block;color:#68746b;margin-top:3px}.nw245-empty{padding:22px;text-align:center;color:#7b867d;background:#fafcf9;border:1px dashed #ccd8cc;border-radius:14px}.nw245-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.nw245-action{border:1px solid #d4dfd3;background:#fff;border-radius:12px;padding:10px 12px;font-weight:850;color:#245b2b;cursor:pointer}.nw245-footer-note{margin-top:14px;color:#8a948c;font-size:11px;text-align:center}
@media(max-width:700px){.nw245-stats{grid-template-columns:repeat(2,1fr)}.nw245-welcome h1{font-size:23px}.nw245-entry{grid-template-columns:50px 1fr}}
`;
document.head.appendChild(css);
function go(h){if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'))}
function hideLegacy(){document.getElementById('nw242-recovery')?.remove();document.querySelectorAll('#app>header,#app>aside#menu').forEach(x=>x.style.display='none');}
function shell(){if($('#nw245-top'))return;const top=document.createElement('div');top.id='nw245-top';top.innerHTML=`<button id="nw245-hamb" aria-label="Μενού">☰</button><div id="nw245-brand"><span class="nw245-brand-main">Nikoleta Wellness CEO</span><span class="nw245-brand-sub">WELLNESS BUSINESS SYSTEM</span></div><button id="nw245-bell" aria-label="Ειδοποιήσεις">🔔</button>`;document.body.appendChild(top);const overlay=document.createElement('div');overlay.id='nw245-overlay';document.body.appendChild(overlay);const drawer=document.createElement('aside');drawer.id='nw245-drawer';drawer.innerHTML=`<div class="nw245-menu-title">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div><div class="nw245-menu-group">${routes.map(([key,icon,label,route])=>`<button type="button" class="nw245-item" data-nw245="${key}" data-route="${route||''}"><span class="nw245-icon">${icon}</span><span>${label}</span></button>`).join('')}</div><div class="nw245-divider"></div><div style="font-size:11px;color:#7a857c;padding:0 8px;line-height:1.45">Όλες οι ενότητες ανοίγουν από εδώ. Η <b>Αρχική</b> κρατά στο κέντρο το πρόγραμμα της ημέρας σου.</div>`;document.body.appendChild(drawer);
 const close=()=>{drawer.classList.remove('open');overlay.classList.remove('open')};
 $('#nw245-hamb').onclick=()=>{drawer.classList.toggle('open');overlay.classList.toggle('open')};overlay.onclick=close;
 drawer.querySelectorAll('.nw245-item').forEach(b=>b.onclick=()=>{const k=b.dataset.nw245,r=b.dataset.route;close();if(k==='sound'){setTimeout(()=>$('#bell')?.click(),20);return}if(k==='account'){setTimeout(()=>$('#login')?.click(),20);return}go(r||'#')});
 $('#nw245-bell').onclick=()=>{$('#bell')?.click()};
}
async function getUser(){try{return (await sb?.auth?.getUser())?.data?.user||null}catch(e){return null}}
async function rows(table,userId,filter){if(!sb||!userId)return[];let q=sb.from(table).select('*').eq('user_id',userId);if(filter)q=q.eq(filter[0],filter[1]);const r=await q;return r.error?[]:(r.data||[])}
async function renderHome(){if(location.hash && location.hash!=='#')return;hideLegacy();const app=$('#app');if(!app)return;const u=await getUser();if(!u){app.innerHTML=`<section id="nw245-home"><div class="nw245-welcome"><div class="nw245-kicker">WELLNESS BUSINESS SYSTEM</div><h1>Καλώς ήρθες στο Nikoleta Wellness CEO</h1><p>Η αρχική οθόνη είναι έτοιμη. Πάτησε τις ☰ τρεις γραμμές για να ανοίξεις όλους τους φακέλους.</p><div class="nw245-actions"><button class="nw245-action" id="nw245-login">👤 Σύνδεση</button></div></div></section>`;$('#nw245-login')?.addEventListener('click',()=>$('#login')?.click());return}
 const date=today();const [ap,fu,tasks,ev]=await Promise.all([rows('appointments',u.id,['appointment_date',date]),rows('follow_ups',u.id,['follow_up_date',date]),rows('planner_tasks',u.id,['task_date',date]),rows('calendar_events',u.id,['event_date',date])]);
 const entries=[];ap.forEach(x=>entries.push({time:time(x.start_time),title:x.title||'Ραντεβού',sub:`📅 Ραντεβού${x.client_name?' · '+x.client_name:''}`,sort:time(x.start_time)}));fu.forEach(x=>entries.push({time:time(x.follow_up_time),title:x.title||'Follow-up',sub:'📞 Follow-up',sort:time(x.follow_up_time)}));tasks.filter(x=>!x.completed).forEach(x=>entries.push({time:time(x.start_time),title:x.title||x.task||'Εργασία',sub:'📋 Planner',sort:time(x.start_time)}));ev.forEach(x=>entries.push({time:time(x.start_time),title:x.title||'Γεγονός',sub:'📅 Ημερολόγιο',sort:time(x.start_time)}));entries.sort((a,b)=>a.sort.localeCompare(b.sort));
 const clients=(await rows('clients',u.id)).length;const partners=(await rows('partners',u.id)).length;const openTasks=tasks.filter(x=>!x.completed).length;const followCount=fu.length;
 app.innerHTML=`<section id="nw245-home"><div class="nw245-welcome"><div class="nw245-kicker">MY DAY · NIKOleta WELLNESS CEO</div><h1>Το πρόγραμμα της ημέρας μου</h1><p>Όλα τα σημαντικά της ημέρας σε ένα σημείο.</p><div class="nw245-date">${esc(greekDate(date))}</div><div class="nw245-stats"><div class="nw245-stat"><b>${ap.length+ev.length}</b><span>Ραντεβού / γεγονότα</span></div><div class="nw245-stat"><b>${followCount}</b><span>Follow-ups</span></div><div class="nw245-stat"><b>${openTasks}</b><span>Εργασίες</span></div><div class="nw245-stat"><b>${clients}</b><span>Πελάτες · ${partners} συνεργάτες</span></div></div></div><div class="nw245-day" style="margin-top:12px"><h2>📅 Πρόγραμμα ημέρας</h2><div class="nw245-day-sub">Χρονολογική σειρά · από το πρωί έως το βράδυ</div><div class="nw245-timeline">${entries.length?entries.map(x=>`<div class="nw245-entry"><div class="nw245-hour">${x.time}</div><div class="nw245-entry-card"><strong>${esc(x.title)}</strong><small>${esc(x.sub)}</small></div></div>`).join(''):'<div class="nw245-empty">Δεν υπάρχει προγραμματισμένο γεγονός για σήμερα.</div>'}</div><div class="nw245-actions"><button class="nw245-action" data-nw245quick="appointments">📅 Νέο ραντεβού</button><button class="nw245-action" data-nw245quick="clients">👥 Νέος πελάτης</button><button class="nw245-action" data-nw245quick="planner">📋 Νέα εργασία</button></div></div><div class="nw245-footer-note">Άνοιξε ☰ για τους πλήρεις φακέλους και τις ενότητες της επιχείρησης.</div></section>`;
 app.querySelectorAll('[data-nw245quick]').forEach(b=>b.onclick=()=>go('#'+b.dataset.nw245quick));
}
function route(){shell();hideLegacy();if(!location.hash||location.hash==='#')setTimeout(renderHome,30)}
window.addEventListener('hashchange',route);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',route);else route();
setTimeout(()=>{shell();if(!location.hash||location.hash==='#')renderHome()},500);
})();
