(()=>{
'use strict';
if(window.__NWCEO_EMERGENCY254)return;window.__NWCEO_EMERGENCY254=true;
const route=h=>{window.location.hash=h;window.dispatchEvent(new Event('hashchange'));};
const css=document.createElement('style');css.textContent=`#nw254-drawer{position:fixed;inset:0;z-index:999999;display:none;background:rgba(0,0,0,.38)}#nw254-drawer.open{display:block}#nw254-panel{position:absolute;left:0;top:0;bottom:0;width:min(340px,88vw);background:#fffdf8;padding:22px 18px;box-shadow:20px 0 60px rgba(0,0,0,.2);overflow:auto}#nw254-panel h2{color:#245b2b;margin:0 0 18px;font-size:22px}#nw254-panel button{display:block;width:100%;border:0;border-radius:14px;background:#fff;padding:14px;margin:7px 0;text-align:left;font:800 15px Arial,sans-serif;color:#203326;cursor:pointer;box-shadow:0 2px 10px rgba(36,91,43,.08)}#nw254-panel button:hover{background:#eef6ec}#nw254-close{background:#245b2b!important;color:#fff!important;text-align:center!important}.ceo-home .ceo-menu-dot,.ceo-home .ceo-quick button,.ceo-home #ceo-new-appt,.ceo-home #ceo-empty-appt,.ceo-home .ceo-event,.ceo-home .ceo-motto,.ceo-home .ceo-maincard{cursor:pointer!important}`;document.head.appendChild(css);
function drawer(){let d=document.getElementById('nw254-drawer');if(d)return d;d=document.createElement('div');d.id='nw254-drawer';d.innerHTML=`<aside id="nw254-panel"><h2>🌿 Nikoleta Wellness CEO</h2><button id="nw254-close">× Κλείσιμο</button><button data-r="#appointments">📅 Ραντεβού</button><button data-r="#clients">👥 Πελάτες</button><button data-r="#partners">🤝 Συνεργάτες</button><button data-r="#followups">📞 Follow-ups</button><button data-r="#orders">🛒 Παραγγελίες</button><button data-r="#documents">📄 Έγγραφα</button><button data-r="#trips">✈️ Ταξίδια</button><button data-r="#nw-training">📚 Εκπαιδεύσεις</button><button data-r="#nw-inventory">📦 Αποθήκη</button><button data-r="#nw-reports">📊 Reports</button></aside>`;document.body.appendChild(d);d.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-r]');if(!b)return;e.preventDefault();e.stopPropagation();d.classList.remove('open');route(b.dataset.r)},true);document.getElementById('nw254-close').onclick=()=>d.classList.remove('open');d.addEventListener('pointerdown',e=>{if(e.target===d)d.classList.remove('open')});return d}
function goHomeTarget(t){
 if(t.closest('.ceo-menu-dot')){drawer().classList.add('open');return true}
 if(t.closest('#ceo-new-appt,#ceo-empty-appt,#ceo-appts')||t.closest('.ceo-appointment')){route('#appointments');return true}
 if(t.closest('[data-v="clients"]')){route('#clients');return true}
 if(t.closest('[data-v="followups"]')){route('#followups');return true}
 if(t.closest('.ceo-followup')){route('#followups');return true}
 if(t.closest('.ceo-task,.ceo-motto,.ceo-maincard')){route('#planner');return true}
 return false;
}
function bind(){if(!document.body)return;drawer();document.addEventListener('pointerdown',e=>{const t=e.target;if(!t.closest)return;if(goHomeTarget(t))e.preventDefault()},true);document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;if(goHomeTarget(t)){e.preventDefault();e.stopImmediatePropagation()}},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
