(()=>{
'use strict';
if(window.__NWCEO_HOME254)return;window.__NWCEO_HOME254=true;
const sb=window.supabase?.createClient?.('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCxH_Gk');
const ATHENS='Europe/Athens';
const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
const tm=v=>String(v||'').slice(0,5);
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:ATHENS,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dateText=()=>new Intl.DateTimeFormat('el-GR',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:ATHENS}).format(new Date());
const go=h=>{location.hash=h};
function clock(){const e=document.getElementById('ceo-clock');if(e)e.textContent=new Intl.DateTimeFormat('el-GR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:ATHENS}).format(new Date());const d=document.getElementById('ceo-date-text');if(d)d.textContent=dateText()}
function renderShell(){
 const root=document.querySelector('#app');if(!root||location.hash)return;
 root.innerHTML=`<section class="ceo-home"><div class="ceo-brand"><button class="ceo-menu-dot" id="ceo-hamb" type="button" aria-label="Μενού">☰</button><div><div class="ceo-kicker">WELLNESS TOUCH POINT</div><h1>Nikoleta Wellness CEO</h1><p>Το προσωπικό σου Wellness Business Dashboard</p></div><div class="ceo-live"><span></span> LIVE</div></div><div class="ceo-date"><div><span>MY DAY</span><strong id="ceo-date-text">${esc(dateText())}</strong></div><div class="ceo-greece-time"><small>🇬🇷 ΩΡΑ ΕΛΛΑΔΟΣ</small><strong id="ceo-clock">--:--</strong></div></div><div class="ceo-grid"><div class="ceo-maincard" id="ceo-day-card"><div class="ceo-cardhead"><div><span class="eyebrow">ΗΜΕΡΗΣΙΟ ΠΡΟΓΡΑΜΜΑ</span><h2>Σήμερα</h2></div><button id="ceo-new-appt" type="button">＋ Ραντεβού</button></div><div class="ceo-timeline" id="ceo-timeline"><div class="ceo-empty"><div>🌿</div><b>Φόρτωση ημέρας…</b><span>Το πρόγραμμα εμφανίζεται αμέσως.</span></div></div></div><aside class="ceo-side"><div class="ceo-quick"><span class="eyebrow">ΓΡΗΓΟΡΗ ΠΡΟΣΒΑΣΗ</span><button id="ceo-appts" type="button">📅 Ραντεβού <em>→</em></button><button id="ceo-clients" type="button">👥 Πελάτες <em>→</em></button><button id="ceo-followups" type="button">📞 Follow-ups <em>→</em></button></div><button class="ceo-motto" id="ceo-planner" type="button"><span>✦</span><p>Οργάνωσε τη μέρα σου.<br><b>Χτίσε το Wellness Business σου.</b></p></button></aside></div><div class="ceo-botanical botanical-a">❧</div><div class="ceo-botanical botanical-b">❧</div></section>`;
 document.getElementById('ceo-new-appt')?.addEventListener('click',()=>go('#appointments'));
 document.getElementById('ceo-appts')?.addEventListener('click',()=>go('#appointments'));
 document.getElementById('ceo-clients')?.addEventListener('click',()=>go('#clients'));
 document.getElementById('ceo-followups')?.addEventListener('click',()=>go('#followups'));
 document.getElementById('ceo-planner')?.addEventListener('click',()=>go('#planner'));
 document.getElementById('ceo-day-card')?.addEventListener('click',e=>{if(e.target.closest('button'))return;go('#appointments')});
 document.getElementById('ceo-hamb')?.addEventListener('click',openMenu);
 clock();clearInterval(window.__ceoClock254);window.__ceoClock254=setInterval(clock,1000);
}
function openMenu(){let menu=document.getElementById('menu');if(!menu){menu=document.createElement('div');menu.id='menu';document.body.appendChild(menu)}menu.classList.add('open');menu.style.display='block';menu.setAttribute('aria-hidden','false');window.dispatchEvent(new Event('nw-menu-open'))}
async function loadDay(){
 const timeline=document.getElementById('ceo-timeline');if(!timeline||!sb)return;
 try{
  const {data:{user}}=await sb.auth.getSession();
  if(!user){timeline.innerHTML='<div class="ceo-empty"><div>🌿</div><b>Η ημέρα σου είναι ελεύθερη</b><span>Πρόσθεσε το πρώτο σου ραντεβού.</span><button id="ceo-empty-appt" type="button">＋ Νέο ραντεβού</button></div>';document.getElementById('ceo-empty-appt')?.addEventListener('click',()=>go('#appointments'));return}
  const [a,c,t,f]=await Promise.all([
   sb.from('appointments').select('id,title,appointment_date,start_time,end_time,client_name,client_id').eq('user_id',user.id).eq('appointment_date',today()).order('start_time'),
   sb.from('clients').select('id,name').eq('user_id',user.id),
   sb.from('planner_tasks').select('id,title,task_date,start_time,end_time').eq('user_id',user.id).eq('task_date',today()).order('start_time'),
   sb.from('follow_ups').select('id,title,follow_up_date,follow_up_time,client_id').eq('user_id',user.id).eq('follow_up_date',today()).order('follow_up_time')
  ]);
  const names=Object.fromEntries((c.data||[]).map(x=>[x.id,x.name]));let items=[];
  (a.data||[]).forEach(x=>items.push({time:tm(x.start_time),end:tm(x.end_time),kind:'appointment',icon:'📅',title:x.title||'Ραντεβού',who:x.client_name||names[x.client_id]||''}));
  (f.data||[]).forEach(x=>items.push({time:tm(x.follow_up_time),kind:'followup',icon:'📞',title:x.title||'Follow-up',who:names[x.client_id]||''}));
  (t.data||[]).forEach(x=>items.push({time:tm(x.start_time),end:tm(x.end_time),kind:'task',icon:'✓',title:x.title||'Εργασία'}));items.sort((x,y)=>x.time.localeCompare(y.time));
  timeline.innerHTML=items.length?items.map(x=>`<div class="ceo-event ceo-${x.kind}" tabindex="0" role="button"><div class="ceo-time">${esc(x.time)}</div><div class="ceo-line"><i></i></div><div class="ceo-eventbody"><div class="ceo-eventtitle"><b>${x.icon} ${esc(x.title)}</b>${x.end?`<small>${esc(x.time)}–${esc(x.end)}</small>`:''}</div>${x.who?`<span>👤 ${esc(x.who)}</span>`:''}</div></div>`).join(''):'<div class="ceo-empty"><div>🌿</div><b>Η ημέρα σου είναι ελεύθερη</b><span>Πρόσθεσε το πρώτο σου ραντεβού για σήμερα.</span><button id="ceo-empty-appt" type="button">＋ Νέο ραντεβού</button></div>';
  timeline.querySelectorAll('.ceo-event').forEach(x=>{x.addEventListener('click',()=>go(x.classList.contains('ceo-followup')?'#followups':x.classList.contains('ceo-task')?'#planner':'#appointments'));x.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();x.click()}})});
  document.getElementById('ceo-empty-appt')?.addEventListener('click',()=>go('#appointments'));
 }catch(e){console.warn('CEO day load failed',e);timeline.innerHTML='<div class="ceo-empty"><div>🌿</div><b>Η ημέρα σου είναι έτοιμη</b><span>Μπορείς να ανοίξεις τα Ραντεβού από εδώ.</span><button id="ceo-empty-appt" type="button">＋ Ραντεβού</button></div>';document.getElementById('ceo-empty-appt')?.addEventListener('click',()=>go('#appointments'))}
}
function boot(){if(location.hash)return;renderShell();loadDay()}
window.addEventListener('load',()=>setTimeout(boot,50));
window.addEventListener('hashchange',()=>{if(!location.hash)setTimeout(boot,50)});
if(document.readyState!=='loading')setTimeout(boot,50);else document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,50));
})();
