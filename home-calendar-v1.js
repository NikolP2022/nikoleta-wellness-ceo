(()=>{
'use strict';
const KEY='nikoleta-wellness-myday-v1';
const HOURS=Array.from({length:15},(_,i)=>String(i+8).padStart(2,'0')+':00');
const esc=s=>String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
const dateKey=()=>new Date().toLocaleDateString('en-CA');
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY+'-'+dateKey())||'{}')}catch{return {}}};
const save=v=>localStorage.setItem(KEY+'-'+dateKey(),JSON.stringify(v));
function todayGreek(){return new Intl.DateTimeFormat('el-GR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());}
function injectStyle(){
 if(document.getElementById('myday-style-v1'))return;
 const s=document.createElement('style');s.id='myday-style-v1';s.textContent=`
 .myday-v1{margin:22px 0 90px;background:#fffdf8;border:1px solid #e5ddce;border-radius:25px;box-shadow:0 7px 22px rgba(38,57,45,.08);overflow:hidden}
 .myday-head-v1{padding:20px 22px 15px;background:linear-gradient(135deg,#16441f,#245b2b);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}
 .myday-head-v1 .eyebrow{font-size:12px;letter-spacing:2px;color:#f0d58e;font-weight:700}
 .myday-head-v1 h2{margin:5px 0 3px;font-size:25px}
 .myday-head-v1 .date{font-size:14px;opacity:.92;text-transform:capitalize}
 .myday-head-v1 .clock{font-size:29px;font-weight:800;color:#f5df9b;white-space:nowrap}
 .myday-body-v1{padding:10px 16px 18px}
 .myday-row-v1{display:grid;grid-template-columns:74px 1fr;min-height:51px;border-bottom:1px solid #ece5d9;align-items:center}
 .myday-row-v1:last-child{border-bottom:0}
 .myday-time-v1{font-weight:800;color:#245b2b;font-size:15px;padding-left:4px}
 .myday-input-v1{width:100%;border:0;outline:0;background:transparent;padding:13px 8px;font-size:15px;color:#24352d}
 .myday-input-v1::placeholder{color:#b2b0aa}
 .myday-footer-v1{padding:12px 18px;background:#f4f0e7;color:#245b2b;font-size:12px;text-align:center}
 @media(max-width:600px){.myday-head-v1{padding:18px}.myday-head-v1 h2{font-size:22px}.myday-head-v1 .clock{font-size:24px}.myday-row-v1{grid-template-columns:64px 1fr}.myday-body-v1{padding:8px 12px 14px}}
 `;document.head.appendChild(s);
}
function build(){
 const page=document.querySelector('.page');
 if(!page)return;
 if(document.getElementById('myday-v1'))return;
 injectStyle();
 const data=load();
 const box=document.createElement('section');box.id='myday-v1';box.className='myday-v1';
 box.innerHTML=`<div class="myday-head-v1"><div><div class="eyebrow">WELLNESS TOUCH POINT</div><h2>⏰ MY DAY · Ημερολόγιο Ημέρας</h2><div class="date">${esc(todayGreek())}</div></div><div class="clock" id="myday-clock-v1"></div></div><div class="myday-body-v1">${HOURS.map(h=>`<div class="myday-row-v1"><div class="myday-time-v1">${h}</div><input class="myday-input-v1" data-hour="${h}" value="${esc(data[h]||'')}" placeholder="Γράψε εδώ το ραντεβού ή την εργασία σου…"></div>`).join('')}</div><div class="myday-footer-v1">💚 Τα σημειώματα αποθηκεύονται αυτόματα για τη σημερινή ημέρα.</div>`;
 page.appendChild(box);
 box.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{const d=load();d[inp.dataset.hour]=inp.value;save(d)}));
 const clock=box.querySelector('#myday-clock-v1');
 const tick=()=>{clock.textContent=new Intl.DateTimeFormat('el-GR',{hour:'2-digit',minute:'2-digit'}).format(new Date())};tick();setInterval(tick,30000);
}
function watch(){
 let tries=0;
 const run=()=>{build();if(++tries<30)setTimeout(run,500)};
 run();
 const mo=new MutationObserver(()=>{if(!document.getElementById('myday-v1'))build()});
 mo.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
})();
