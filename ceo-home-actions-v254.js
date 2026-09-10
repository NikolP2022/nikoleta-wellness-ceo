(()=>{
'use strict';
if(window.__NWCEO254)return;window.__NWCEO254=true;
const routes={appointments:'#appointments',clients:'#clients',followups:'#followups',partners:'#partners',orders:'#orders',documents:'#documents',trips:'#trips',training:'#nw-training',inventory:'#nw-inventory',reports:'#nw-reports'};
const go=h=>{if(location.hash!==h){location.hash=h}else{window.dispatchEvent(new HashChangeEvent('hashchange'))}};
function ensureMenu(){
 let m=document.getElementById('nw254-menu');
 if(m)return m;
 m=document.createElement('aside');m.id='nw254-menu';
 m.innerHTML='<div class="nw254-head"><b>☰ Nikoleta Wellness CEO</b><button type="button" data-close>×</button></div><div class="nw254-title">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div>'+[['appointments','📅 Ραντεβού'],['clients','👥 Πελάτες'],['followups','📞 Follow-ups'],['partners','🤝 Συνεργάτες'],['orders','🛒 Παραγγελίες'],['documents','📄 Έγγραφα'],['trips','✈️ Ταξίδια'],['training','📚 Εκπαιδεύσεις'],['inventory','📦 Αποθήκη'],['reports','📊 Reports']].map(x=>`<button type="button" data-route="${x[0]}">${x[1]}<span>›</span></button>`).join('');
 document.body.appendChild(m);
 m.querySelector('[data-close]').onclick=()=>m.classList.remove('open');
 m.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{m.classList.remove('open');go(routes[b.dataset.route])});
 return m;
}
const css=document.createElement('style');css.textContent='#nw254-menu{position:fixed;top:0;left:0;bottom:0;width:min(340px,88vw);z-index:2147483000;background:#fffdf8;box-shadow:18px 0 50px #173b1940;padding:18px;transform:translateX(-105%);transition:transform .22s ease;overflow:auto;font-family:inherit}#nw254-menu.open{transform:translateX(0)}#nw254-menu .nw254-head{display:flex;justify-content:space-between;align-items:center;color:#245b2b;font-size:18px;margin-bottom:18px}#nw254-menu .nw254-head button{border:0;background:#eef5ec;border-radius:50%;width:38px;height:38px;font-size:24px;cursor:pointer}#nw254-menu .nw254-title{font-size:11px;font-weight:900;letter-spacing:.08em;color:#78917c;margin:8px 0}#nw254-menu>[data-route]{display:flex;justify-content:space-between;align-items:center;width:100%;padding:14px 12px;margin:6px 0;border:0;border-radius:13px;background:transparent;color:#203322;font:800 16px inherit;text-align:left;cursor:pointer}#nw254-menu>[data-route]:hover{background:#e7f2e5;color:#245b2b}.ceo-home .ceo-menu-dot,.ceo-home #ceo-hamb,.ceo-home .ceo-quick button,.ceo-home .ceo-event,.ceo-home .ceo-maincard,.ceo-home .ceo-motto{cursor:pointer}';document.head.appendChild(css);
function openMenu(){ensureMenu().classList.add('open')}
function routeFrom(el){if(el.closest?.('.ceo-menu-dot,#ceo-hamb'))return'menu';if(el.closest?.('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment'))return'appointments';if(el.closest?.('[data-v="clients"]'))return'clients';if(el.closest?.('[data-v="followups'],.ceo-followup'))return'followups';if(el.closest?.('.ceo-task,.ceo-motto,.ceo-maincard'))return'appointments';return null}
document.addEventListener('click',e=>{const t=e.target.closest?.('.ceo-menu-dot,#ceo-hamb,#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-quick button,.ceo-event,.ceo-motto,.ceo-maincard');if(!t)return;const r=routeFrom(t);if(!r)return;e.preventDefault();e.stopImmediatePropagation();if(r==='menu'){openMenu();return}const m=document.getElementById('nw254-menu');if(m)m.classList.remove('open');go(routes[r])},true);
ensureMenu();
})();
