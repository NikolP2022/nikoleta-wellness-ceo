(()=>{
'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(URL,KEY);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const tm=v=>String(v||'').slice(0,5);
const today=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Athens'});
const dateText=()=>new Intl.DateTimeFormat('el-GR',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
let mounted=false;
function clock(){const e=document.getElementById('ceo-clock');if(e)e.textContent=new Intl.DateTimeFormat('el-GR',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'Europe/Athens'}).format(new Date());}
async function renderHome(){
 const root=document.querySelector('#app');
 if(!root||location.hash==='#appointments')return;
 let items=[];
 try{const u=sb?(await sb.auth.getUser()).data?.user:null;if(u){const [a,c,t,f]=await Promise.all([
  sb.from('appointments').select('id,title,appointment_date,start_time,end_time,client_name,client_id').eq('user_id',u.id).eq('appointment_date',today()).order('start_time'),
  sb.from('clients').select('id,name').eq('user_id',u.id),
  sb.from('planner_tasks').select('id,title,task_date,start_time,end_time').eq('user_id',u.id).eq('task_date',today()).order('start_time'),
  sb.from('follow_ups').select('id,title,follow_up_date,follow_up_time,client_id').eq('user_id',u.id).eq('follow_up_date',today()).order('follow_up_time')]);
  const names=Object.fromEntries((c.data||[]).map(x=>[x.id,x.name]));
  (a.data||[]).forEach(x=>items.push({time:tm(x.start_time),end:tm(x.end_time),kind:'appointment',icon:'📅',title:x.title||'Ραντεβού',who:x.client_name||names[x.client_id]||''}));
  (f.data||[]).forEach(x=>items.push({time:tm(x.follow_up_time),kind:'followup',icon:'📞',title:x.title||'Follow-up',who:names[x.client_id]||''}));
  (t.data||[]).forEach(x=>items.push({time:tm(x.start_time),end:tm(x.end_time),kind:'task',icon:'✓',title:x.title||'Εργασία'}));
 }}catch(e){console.warn('Home data load:',e)}
 items.sort((x,y)=>x.time.localeCompare(y.time));
 root.innerHTML=`<section class="ceo-home"><div class="ceo-brand"><button class="ceo-menu-dot" id="ceo-hamb">☰</button><div><div class="ceo-kicker">WELLNESS TOUCH POINT</div><h1>Nikoleta Wellness CEO</h1><p>Το προσωπικό σου Wellness Business Dashboard</p></div><div class="ceo-live"><span></span> LIVE</div></div><div class="ceo-date"><div><span>MY DAY</span><strong>${esc(dateText())}</strong></div><div id="ceo-clock">--:--:--</div></div><div class="ceo-grid"><div class="ceo-maincard"><div class="ceo-cardhead"><div><span class="eyebrow">ΗΜΕΡΗΣΙΟ ΠΡΟΓΡΑΜΜΑ</span><h2>Σήμερα</h2></div><button id="ceo-new-appt">＋ Ραντεβού</button></div><div class="ceo-timeline">${items.length?items.map(x=>`<div class="ceo-event ceo-${x.kind}"><div class="ceo-time">${esc(x.time)}</div><div class="ceo-line"><i></i></div><div class="ceo-eventbody"><div class="ceo-eventtitle"><b>${x.icon} ${esc(x.title)}</b>${x.end?`<small>${esc(x.time)}–${esc(x.end)}</small>`:''}</div>${x.who?`<span>👤 ${esc(x.who)}</span>`:''}</div></div>`).join(''):`<div class="ceo-empty"><div>🌿</div><b>Η ημέρα σου είναι ελεύθερη</b><span>Πρόσθεσε το πρώτο σου ραντεβού για σήμερα.</span><button id="ceo-empty-appt">＋ Νέο ραντεβού</button></div>`}</div></div><aside class="ceo-side"><div class="ceo-quick"><span class="eyebrow">ΓΡΗΓΟΡΗ ΠΡΟΣΒΑΣΗ</span><button id="ceo-appts">📅 Ραντεβού <em>→</em></button><button data-v="clients">👥 Πελάτες <em>→</em></button><button data-v="followups">📞 Follow-ups <em>→</em></button></div><div class="ceo-motto"><span>✦</span><p>Οργάνωσε τη μέρα σου.<br><b>Χτίσε το Wellness Business σου.</b></p></div></aside></div><div class="ceo-botanical botanical-a">❧</div><div class="ceo-botanical botanical-b">❧</div></section>`;
 const go=()=>{location.hash='appointments'};
 ['ceo-new-appt','ceo-empty-appt','ceo-appts'].forEach(id=>document.getElementById(id)?.addEventListener('click',go));
 document.getElementById('ceo-hamb')?.addEventListener('click',()=>document.getElementById('menu')?.classList.toggle('open'));
 clock();clearInterval(window.__ceoClock);window.__ceoClock=setInterval(clock,1000);mounted=true;
}
function tryRender(){if(!location.hash)renderHome()}
window.addEventListener('load',()=>setTimeout(tryRender,800));
window.addEventListener('hashchange',()=>{if(!location.hash){mounted=false;setTimeout(tryRender,300)}});
new MutationObserver(()=>{if(!mounted&&!location.hash&&document.querySelector('#app'))setTimeout(renderHome,100)}).observe(document.body,{childList:true,subtree:true});
})();