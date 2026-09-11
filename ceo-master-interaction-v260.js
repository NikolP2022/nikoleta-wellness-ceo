(()=>{
'use strict';
if(window.__NWCEO_MASTER260)return;
window.__NWCEO_MASTER260=true;

const routes={
  home:'',appointments:'#appointments',clients:'#clients',partners:'#partners',followups:'#followups',orders:'#orders',documents:'#documents',trips:'#trips',training:'#nw-training',inventory:'#nw-inventory',reports:'#nw-reports'
};
const go=h=>{if(location.hash!==h){location.hash=h}else{window.dispatchEvent(new HashChangeEvent('hashchange'))}};

const css=document.createElement('style');
css.textContent=`
#nw-master-menu{position:fixed;left:12px;top:72px;z-index:2147483647;width:min(320px,calc(100vw - 24px));display:none;background:#fffdf8;border:1px solid #d7e4d5;border-radius:20px;padding:12px;box-shadow:0 24px 70px #0005;font-family:inherit}
#nw-master-menu.open{display:block}
#nw-master-menu .nw-title{padding:8px 10px 10px;color:#245b2b;font-size:12px;font-weight:900;letter-spacing:.08em}
#nw-master-menu button{display:block;width:100%;border:0;border-radius:13px;background:transparent;text-align:left;padding:12px 13px;margin:3px 0;color:#203322;font:inherit;font-weight:800;cursor:pointer}
#nw-master-menu button:hover{background:#eef6ec}
.ceo-menu-dot,#ceo-hamb,.ceo-quick button,#ceo-new-appt,#ceo-empty-appt,.ceo-event,.ceo-maincard,.ceo-motto{cursor:pointer!important}
`;
document.head.appendChild(css);

function menu(){
  let m=document.getElementById('nw-master-menu');
  if(m)return m;
  m=document.createElement('aside');m.id='nw-master-menu';
  m.innerHTML='<div class="nw-title">⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ</div>';
  const items=[
    ['📅 Ραντεβού','appointments'],['👥 Πελάτες','clients'],['🤝 Συνεργάτες','partners'],['📞 Follow-ups','followups'],['🛒 Παραγγελίες','orders'],['📄 Έγγραφα','documents'],['✈️ Ταξίδια','trips'],['📚 Εκπαιδεύσεις','training'],['📦 Αποθήκη','inventory'],['📊 Reports','reports']
  ];
  items.forEach(([label,key])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(routes[key]);m.classList.remove('open')});m.appendChild(b)});
  document.body.appendChild(m);return m;
}
function toggle(e){e?.preventDefault();e?.stopImmediatePropagation();menu().classList.toggle('open')}
function routeFor(target,e){
  const t=target?.closest?.('.ceo-menu-dot,#ceo-hamb');if(t){toggle(e);return true}
  if(target?.closest?.('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-maincard')){e?.preventDefault();e?.stopImmediatePropagation();go('#appointments');return true}
  const q=target?.closest?.('.ceo-quick button');
  if(q){const s=q.textContent.toLowerCase();e?.preventDefault();e?.stopImmediatePropagation();if(s.includes('ραντεβού'))go('#appointments');else if(s.includes('πελάτες'))go('#clients');else if(s.includes('follow'))go('#followups');return true}
  if(target?.closest?.('.ceo-followup')){e?.preventDefault();e?.stopImmediatePropagation();go('#followups');return true}
  if(target?.closest?.('.ceo-task')){e?.preventDefault();e?.stopImmediatePropagation();go('#planner');return true}
  return false;
}
document.addEventListener('click',e=>routeFor(e.target,e),true);
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&routeFor(e.target,e))e.preventDefault()},true);

function ensure(){menu();document.querySelectorAll('.ceo-menu-dot,#ceo-hamb,.ceo-quick button,#ceo-new-appt,#ceo-empty-appt,.ceo-event,.ceo-maincard,.ceo-motto').forEach(x=>x.style.cursor='pointer')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensure);else ensure();
window.addEventListener('load',()=>{ensure();setTimeout(ensure,300);setTimeout(ensure,1000)});
new MutationObserver(()=>{if(!document.getElementById('nw-master-menu'))ensure()}).observe(document.body,{childList:true,subtree:true});
})();
