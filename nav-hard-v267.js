(()=>{'use strict';
if(window.__NWCEO_NAV267)return;window.__NWCEO_NAV267=true;
const go=h=>{try{location.hash=h}catch(_){location.assign('./'+h)}};
const menuItems=[['⌂ Αρχική','./?v=267'],['📅 Ραντεβού','#appointments'],['👥 Πελάτες','#clients'],['🤝 Συνεργάτες','#partners'],['📞 Follow-ups','#followups'],['🛒 Παραγγελίες','#orders'],['📄 Έγγραφα','#documents'],['✈️ Ταξίδια','#trips'],['📚 Εκπαιδεύσεις','#nw-training'],['📦 Αποθήκη','#nw-inventory'],['📊 Reports','#nw-reports']];
const css=document.createElement('style');css.textContent=`#nw267-menu{position:fixed;left:12px;top:72px;z-index:2147483647;width:min(330px,calc(100vw - 24px));display:none;background:#fffdf8;border:1px solid #dce7d9;border-radius:18px;box-shadow:0 20px 60px #0004;padding:10px;box-sizing:border-box}#nw267-menu.open{display:block!important}#nw267-menu button,#nw267-menu a{display:block;width:100%;box-sizing:border-box;border:0;border-radius:12px;background:transparent;color:#203322;text-align:left;padding:13px 12px;margin:3px 0;font:inherit;font-weight:800;text-decoration:none;cursor:pointer}#nw267-menu button:hover,#nw267-menu a:hover{background:#eef6ec}.ceo-menu-dot,.ceo-quick button,.ceo-quick a,.ceo-event,.ceo-maincard,.ceo-motto{cursor:pointer!important;pointer-events:auto!important;touch-action:manipulation!important}`;document.head.appendChild(css);
function menu(){let m=document.getElementById('nw267-menu');if(m)return m;m=document.createElement('div');m.id='nw267-menu';m.setAttribute('role','menu');m.innerHTML='<div style="padding:10px 12px;color:#245b2b;font-size:11px;font-weight:900;letter-spacing:.08em">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div>'+menuItems.map(([l,h])=>h.startsWith('#')?`<button type="button" data-go="${h}">${l}<span style="float:right">→</span></button>`:`<a href="${h}">${l}<span style="float:right">→</span></a>`).join('');document.body.appendChild(m);return m}
function openMenu(){const m=menu();m.classList.add('open');m.style.display='block'}
function closeMenu(){const m=document.getElementById('nw267-menu');if(m){m.classList.remove('open');m.style.display='none'}}
function handle(e){const t=e.target?.closest?.('.ceo-menu-dot,.ceo-quick button,.ceo-quick a,#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-followup,.ceo-task,.ceo-motto,.ceo-maincard,#nw267-menu [data-go]');if(!t)return;
 if(t.classList.contains('ceo-menu-dot')){e.preventDefault();e.stopImmediatePropagation();openMenu();return}
 const route=t.dataset?.go;if(route){e.preventDefault();e.stopImmediatePropagation();closeMenu();go(route);return}
 if(t.matches('.ceo-quick button,.ceo-quick a')){const s=t.textContent.toLowerCase();e.preventDefault();e.stopImmediatePropagation();if(s.includes('ραντεβού'))go('#appointments');else if(s.includes('πελάτες'))go('#clients');else if(s.includes('follow'))go('#followups');return}
 if(t.matches('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-maincard')){e.preventDefault();e.stopImmediatePropagation();go('#appointments');return}
 if(t.matches('.ceo-followup')){e.preventDefault();e.stopImmediatePropagation();go('#followups');return}
 if(t.matches('.ceo-task,.ceo-motto')){e.preventDefault();e.stopImmediatePropagation();go('#planner');return}
}
window.addEventListener('pointerdown',handle,true);window.addEventListener('click',handle,true);
window.addEventListener('load',()=>{menu();setTimeout(menu,300);setTimeout(menu,1000)});
new MutationObserver(()=>{if(!document.getElementById('nw267-menu'))menu()}).observe(document.documentElement,{childList:true,subtree:true});
})();
