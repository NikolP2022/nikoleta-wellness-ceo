(()=>{
'use strict';
if(window.__NWCEO254)return; window.__NWCEO254=true;
const pad=n=>String(n).padStart(2,'0');
const go=h=>{if(location.hash!==h) location.hash=h; else window.dispatchEvent(new HashChangeEvent('hashchange'));};
const nowTime=()=>{const d=new Date();return `${pad(d.getHours())}:${pad(d.getMinutes())}`};
function clock(){const el=document.getElementById('ceo-clock');if(el)el.textContent=nowTime();}
function ensureMenu(){
 let m=document.getElementById('nw-final-menu');
 if(!m){
  m=document.createElement('aside');m.id='nw-final-menu';
  m.innerHTML='<div class="nw-final-title">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div>'+[
   ['📅 Ραντεβού','#appointments'],['👥 Πελάτες','#clients'],['🤝 Συνεργάτες','#partners'],['📞 Follow-ups','#followups'],['🛒 Παραγγελίες','#orders'],['📄 Έγγραφα','#documents'],['✈️ Ταξίδια','#trips'],['📚 Εκπαιδεύσεις','#nw-training'],['📦 Αποθήκη','#nw-inventory'],['📊 Reports','#nw-reports']
  ].map(x=>`<button type="button" data-route="${x[1]}">${x[0]}</button>`).join('');
  document.body.appendChild(m);
  m.addEventListener('click',e=>{const b=e.target.closest('[data-route]');if(!b)return;go(b.dataset.route);m.classList.remove('open')});
 }
 return m;
}
function renderFallbackHome(){
 if(location.hash) return;
 const app=document.getElementById('app'); if(!app)return;
 const existing=app.querySelector('.ceo-home');
 if(existing && !existing.querySelector('#ceo-clock')) return;
 if(!existing || existing.textContent.includes('φορτώνεται')){
  app.innerHTML=`<section class="ceo-home nw-final-home"><div class="ceo-brand"><button class="ceo-menu-dot" id="nw-final-hamb" type="button">☰</button><div><div class="ceo-kicker">WELLNESS TOUCH POINT</div><h1>Nikoleta Wellness CEO</h1><p>Το προσωπικό σου Wellness Business Dashboard</p></div><div class="ceo-live"><span></span> LIVE</div></div><div class="ceo-date"><div><span>MY DAY</span><strong>Η σημερινή σου ημέρα</strong></div><div class="ceo-greece-time"><small>🇬🇷 ΩΡΑ ΕΛΛΑΔΟΣ</small><strong id="ceo-clock">--:--</strong></div></div><div class="ceo-grid"><div class="ceo-maincard" id="nw-final-day"><div class="ceo-cardhead"><div><span class="eyebrow">ΗΜΕΡΗΣΙΟ ΠΡΟΓΡΑΜΜΑ</span><h2>Σήμερα</h2></div><button id="ceo-new-appt" type="button">＋ Ραντεβού</button></div><div class="ceo-empty"><div>🌿</div><b>Το Wellness Business Dashboard είναι έτοιμο.</b><span>Πάτησε Ραντεβού για να συνεχίσουμε.</span><button id="ceo-empty-appt" type="button">＋ Νέο ραντεβού</button></div></div><aside class="ceo-side"><div class="ceo-quick"><span class="eyebrow">ΓΡΗΓΟΡΗ ΠΡΟΣΒΑΣΗ</span><button type="button" data-home-route="#appointments">📅 Ραντεβού <em>→</em></button><button type="button" data-home-route="#clients">👥 Πελάτες <em>→</em></button><button type="button" data-home-route="#followups">📞 Follow-ups <em>→</em></button></div><div class="ceo-motto" data-home-route="#planner"><span>✦</span><p>Οργάνωσε τη μέρα σου.<br><b>Χτίσε το Wellness Business σου.</b></p></div></aside></div></section>`;
 }
 const h=document.getElementById('nw-final-hamb'); if(h)h.onclick=()=>ensureMenu().classList.toggle('open');
 document.querySelectorAll('[data-home-route]').forEach(b=>b.onclick=()=>go(b.dataset.homeRoute));
 ['ceo-new-appt','ceo-empty-appt'].forEach(id=>{const b=document.getElementById(id);if(b)b.onclick=()=>go('#appointments')});
 clock();
}
function homeClicks(e){
 const t=e.target.closest?.('.ceo-menu-dot,#ceo-hamb,#nw-final-hamb,[data-home-route],#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-followup,.ceo-task,.ceo-maincard');
 if(!t)return;
 if(t.id==='nw-final-hamb'||t.classList.contains('ceo-menu-dot')||t.id==='ceo-hamb'){e.preventDefault();e.stopImmediatePropagation();ensureMenu().classList.toggle('open');return}
 if(t.matches('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-maincard')){e.preventDefault();e.stopImmediatePropagation();go('#appointments');return}
 const r=t.dataset.homeRoute;if(r){e.preventDefault();e.stopImmediatePropagation();go(r);return}
 if(t.classList.contains('ceo-followup')){e.preventDefault();e.stopImmediatePropagation();go('#followups');return}
 if(t.classList.contains('ceo-task')){e.preventDefault();e.stopImmediatePropagation();go('#planner');return}
}
document.addEventListener('click',homeClicks,true);
function timePicker(input){
 if(document.getElementById('nw-final-clock'))return;
 let m=/^(\d{1,2}):(\d{2})$/.exec(input.value||'');let h=m?Math.min(23,+m[1]):new Date().getHours();let min=m?Math.min(59,+m[2]):0;
 const ov=document.createElement('div');ov.id='nw-final-clock';ov.innerHTML='<div class="nw-final-clock-box"><h2>⏰ Ώρα — 24ωρο</h2><div class="nw-final-preview"></div><div class="nw-final-face"></div><div class="nw-final-minutes">'+[0,5,10,15,20,25,30,35,40,45,50,55].map(x=>`<button type="button" data-min="${x}">${pad(x)}</button>`).join('')+'</div><button type="button" data-cancel>Ακύρωση</button></div>';
 document.body.appendChild(ov);
 const face=ov.querySelector('.nw-final-face'),preview=ov.querySelector('.nw-final-preview');
 const draw=()=>{preview.textContent=`${pad(h)}:${pad(min)}`;face.querySelectorAll('[data-hour]').forEach(b=>b.classList.toggle('sel',+b.dataset.hour===h))};
 for(let i=0;i<24;i++){const a=i*15*Math.PI/180-Math.PI/2,b=document.createElement('button');b.type='button';b.dataset.hour=i;b.textContent=pad(i);b.style.left=`calc(50% + ${Math.cos(a)*115}px - 24px)`;b.style.top=`calc(50% + ${Math.sin(a)*115}px - 20px)`;b.onclick=()=>{h=i;draw()};face.appendChild(b)}
 ov.querySelectorAll('[data-min]').forEach(b=>b.onclick=()=>{min=+b.dataset.min;input.value=`${pad(h)}:${pad(min)}`;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));ov.remove()});
 ov.querySelector('[data-cancel]').onclick=()=>ov.remove();draw();
}
document.addEventListener('pointerdown',e=>{const i=e.target.closest?.('input[name="start_time"],input[name="end_time"],input[name="follow_up_time"]');if(!i)return;e.preventDefault();e.stopImmediatePropagation();timePicker(i)},true);
const s=document.createElement('style');s.textContent=`#nw-final-menu{position:fixed;left:12px;top:72px;z-index:2147483000;display:none;width:min(320px,calc(100vw - 24px));padding:12px;background:#fffdf8;border:1px solid #d9e5d7;border-radius:18px;box-shadow:0 22px 70px #0004}#nw-final-menu.open{display:block!important}.nw-final-title{font-weight:900;color:#245b2b;padding:8px}.nw-final-menu{}.nw-final-title+button{}.nw-final-clock{font-size:28px}.nw-final-clock-box{width:min(390px,94vw);background:#fffdf8;border-radius:24px;padding:18px;text-align:center}.nw-final-clock-box h2{color:#245b2b}.nw-final-preview{font-size:32px;font-weight:900;color:#245b2b;margin:8px}.nw-final-face{width:300px;height:300px;max-width:78vw;max-height:78vw;margin:auto;border-radius:50%;background:#f1f6ef;border:7px solid #dbe8d8;position:relative}.nw-final-face button{position:absolute;width:48px;height:40px;border:0;border-radius:999px;background:transparent;font-weight:900;color:#245b2b;cursor:pointer}.nw-final-face button.sel{background:#245b2b;color:#fff}.nw-final-minutes{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:12px}.nw-final-minutes button{border:1px solid #cbd9ca;background:#fff;border-radius:999px;padding:8px 11px;font-weight:800;color:#245b2b}.nw-final-clock-box>[data-cancel]{border:0;background:#eee;border-radius:10px;padding:10px 18px;font-weight:800}.nw-final-home .ceo-maincard,.nw-final-home .ceo-event,.nw-final-home .ceo-motto,.nw-final-home .ceo-quick button{cursor:pointer}`;document.head.appendChild(s);
function boot(){renderFallbackHome();ensureMenu();clock();clearInterval(window.__NWFINALCLOCK);window.__NWFINALCLOCK=setInterval(clock,1000);setTimeout(renderFallbackHome,1500);setTimeout(renderFallbackHome,3500)}
window.addEventListener('load',boot);if(document.readyState!=='loading')setTimeout(boot,100);else document.addEventListener('DOMContentLoaded',boot);
})();
