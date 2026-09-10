(()=>{
'use strict';
if(window.__NW_INTERACTION_RESCUE_254)return;
window.__NW_INTERACTION_RESCUE_254=true;

const routes={
  appointments:'#appointments',clients:'#clients',partners:'#partners',followups:'#followups',orders:'#orders',documents:'#documents',trips:'#trips',training:'#nw-training',inventory:'#nw-inventory',reports:'#nw-reports',planner:'#planner'
};
const go=hash=>{
  if(location.hash!==hash) location.hash=hash;
  else window.dispatchEvent(new HashChangeEvent('hashchange'));
};

function menu(){
  let m=document.getElementById('menu');
  if(!m){
    m=document.createElement('aside');
    m.id='menu';
    document.body.appendChild(m);
  }
  m.classList.toggle('open');
  m.style.cssText=`position:fixed;left:12px;top:70px;z-index:2147483000;display:block!important;width:min(320px,calc(100vw - 24px));background:#fffdf8;border:1px solid #dce7d9;border-radius:18px;box-shadow:0 20px 55px #173b1930;padding:10px;`;
  if(!m.querySelector('[data-rescue-menu]')){
    const box=document.createElement('div');
    box.dataset.rescueMenu='1';
    box.style.cssText='display:flex;flex-direction:column;gap:5px;';
    const title=document.createElement('div');
    title.textContent='⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ';
    title.style.cssText='padding:9px 10px;color:#245b2b;font-size:11px;font-weight:900;';
    box.appendChild(title);
    const items=[['📅 Ραντεβού','appointments'],['👥 Πελάτες','clients'],['🤝 Συνεργάτες','partners'],['📞 Follow-ups','followups'],['🛒 Παραγγελίες','orders'],['📄 Έγγραφα','documents'],['✈️ Ταξίδια','trips'],['📚 Εκπαιδεύσεις','training'],['📦 Αποθήκη','inventory'],['📊 Reports','reports']];
    items.forEach(([label,key])=>{
      const b=document.createElement('button');
      b.type='button';b.textContent=label;b.dataset.rescueRoute=key;
      b.style.cssText='border:0;border-radius:12px;background:transparent;color:#203322;text-align:left;padding:12px;font:inherit;font-weight:800;cursor:pointer;';
      b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(routes[key]);m.classList.remove('open');m.style.display='none';});
      box.appendChild(b);
    });
    m.appendChild(box);
  }
  if(!m.classList.contains('open'))m.style.display='none';
}

function action(target){
  const t=target?.closest?.('button,a,[role="button"],.ceo-event,.ceo-maincard,.ceo-motto');
  if(!t)return false;
  if(t.matches('.ceo-menu-dot,#ceo-hamb')){menu();return true;}
  if(t.matches('#ceo-new-appt,#ceo-empty-appt,#ceo-appts,.ceo-appointment,.ceo-maincard')){go(routes.appointments);return true;}
  if(t.matches('[data-v="clients"]')){go(routes.clients);return true;}
  if(t.matches('[data-v="followups"]')){go(routes.followups);return true;}
  if(t.matches('.ceo-followup')){go(routes.followups);return true;}
  if(t.matches('.ceo-task,.ceo-motto')){go(routes.planner);return true;}
  if(t.matches('.ceo-quick button')){
    const s=(t.textContent||'').toLowerCase();
    if(s.includes('ραντεβ'))go(routes.appointments);
    else if(s.includes('πελάτ'))go(routes.clients);
    else if(s.includes('follow'))go(routes.followups);
    else return false;
    return true;
  }
  return false;
}

document.addEventListener('click',e=>{if(action(e.target)){e.preventDefault();e.stopImmediatePropagation();}},true);
document.addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;
  if(action(e.target)){e.preventDefault();e.stopImmediatePropagation();}
},true);

const style=document.createElement('style');
style.textContent='.ceo-menu-dot,#ceo-hamb,.ceo-quick button,#ceo-new-appt,#ceo-empty-appt,.ceo-event,.ceo-maincard,.ceo-motto{cursor:pointer!important;pointer-events:auto!important}.nw253-menu,.nw233-menu{z-index:2147482000!important}';
document.head.appendChild(style);

window.addEventListener('load',()=>{setTimeout(()=>{const m=document.getElementById('menu');if(m)m.style.zIndex='2147483000';},50);}, {once:true});
})();
