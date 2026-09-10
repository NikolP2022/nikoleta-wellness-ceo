(()=>{'use strict';
if(window.__NWCEO253)return;window.__NWCEO253=true;
const go=h=>{if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'))};
const routes=[['📅 Ραντεβού','#appointments'],['👥 Πελάτες','#clients'],['🤝 Συνεργάτες','#partners'],['📞 Follow-ups','#followups'],['🛒 Παραγγελίες','#orders'],['📄 Έγγραφα','#documents'],['✈️ Ταξίδια','#trips'],['📚 Εκπαιδεύσεις','#nw-training'],['📦 Αποθήκη','#nw-inventory'],['📊 Reports','#nw-reports']];
function ensureMenu(){
 let menu=document.getElementById('menu');
 if(!menu){menu=document.createElement('aside');menu.id='menu';menu.className='nw253-menu';document.body.appendChild(menu)}
 let box=menu.querySelector('.nw253-box');
 if(!box){box=document.createElement('div');box.className='nw253-box';box.innerHTML='<div class="nw253-title">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div>';routes.forEach(([label,hash])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.route=hash;b.onclick=()=>{go(hash);menu.classList.remove('open')};box.appendChild(b)});menu.appendChild(box)}
 return menu;
}
function toggleMenu(){const m=ensureMenu();m.classList.toggle('open')}
function routeTarget(t){
 if(t.closest?.('.ceo-menu-dot,#ceo-hamb')){toggleMenu();return true}
 if(t.closest?.('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-maincard')){go('#appointments');return true}
 const q=t.closest?.('.ceo-quick button');if(q){const s=q.textContent.toLowerCase();if(s.includes('ραντεβού'))go('#appointments');else if(s.includes('πελάτες'))go('#clients');else if(s.includes('follow'))go('#followups');return true}
 if(t.closest?.('.ceo-followup')){go('#followups');return true}
 if(t.closest?.('.ceo-task,.ceo-motto')){go('#planner');return true}
 return false;
}
const style=document.createElement('style');style.textContent=`#menu.nw253-menu{position:fixed;left:12px;top:70px;z-index:999999;display:none;width:min(310px,calc(100vw - 24px));background:#fffdf8;border:1px solid #dce7d9;border-radius:18px;box-shadow:0 20px 55px #173b1930;padding:10px}.nw253-menu.open{display:block!important}.nw253-box{display:flex;flex-direction:column;gap:5px}.nw253-title{padding:9px 10px;color:#245b2b;font-size:11px;font-weight:900;letter-spacing:.08em}.nw253-box button{border:0;border-radius:12px;background:transparent;color:#203322;text-align:left;padding:12px;font:inherit;font-weight:800;cursor:pointer}.nw253-box button:hover{background:#eef6ec}.ceo-menu-dot,#ceo-hamb,.ceo-quick button,#ceo-new-appt,#ceo-empty-appt,.ceo-event,.ceo-motto,.ceo-maincard{cursor:pointer}`;document.head.appendChild(style);
document.addEventListener('click',e=>{routeTarget(e.target)},true);
document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;if(routeTarget(e.target))e.preventDefault()},true);
window.addEventListener('load',()=>{ensureMenu();setTimeout(ensureMenu,500);setTimeout(ensureMenu,1500)});
new MutationObserver(()=>ensureMenu()).observe(document.body,{childList:true,subtree:true});
})();
