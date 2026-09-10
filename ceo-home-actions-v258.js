(()=>{
'use strict';
if(window.__NWCEO258)return;window.__NWCEO258=true;
const go=h=>{location.hash=h;window.dispatchEvent(new HashChangeEvent('hashchange'))};
const isHome=()=>!!document.querySelector('.ceo-home');
const target=e=>e?.target?.closest?.('.ceo-menu-dot,.ceo-cardhead button,.ceo-empty button,.ceo-quick button,.ceo-event,.ceo-maincard,.ceo-motto');
const route=el=>{
 if(!el)return null;
 if(el.classList.contains('ceo-menu-dot'))return 'MENU';
 if(el.matches('.ceo-cardhead button,.ceo-empty button,#ceo-appts,.ceo-appointment,.ceo-maincard'))return '#appointments';
 if(el.matches('.ceo-followup'))return '#followups';
 if(el.matches('.ceo-task,.ceo-motto'))return '#planner';
 if(el.matches('.ceo-quick button')){
  const s=(el.textContent||'').toLowerCase();
  if(s.includes('ραντεβού'))return '#appointments';
  if(s.includes('πελάτες'))return '#clients';
  if(s.includes('follow'))return '#followups';
 }
 return null;
};
const openMenu=()=>{
 document.getElementById('nw258-menu')?.remove();
 const back=document.createElement('div');back.id='nw258-menu';back.style.cssText='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.42);touch-action:auto';
 const panel=document.createElement('aside');panel.style.cssText='position:absolute;left:0;top:0;bottom:0;width:min(360px,88vw);box-sizing:border-box;background:#fffdf8;padding:28px 18px;box-shadow:20px 0 70px rgba(0,0,0,.35);overflow:auto;font-family:Arial,sans-serif';
 panel.innerHTML='<button type="button" id="nw258-close" style="position:absolute;right:12px;top:8px;border:0;background:none;font-size:32px;color:#245b2b;cursor:pointer">×</button><h2 style="color:#245b2b;margin:10px 4px 4px">Nikoleta Wellness CEO</h2><p style="color:#8b7b55;margin:0 4px 22px">Wellness Touch Point</p>';
 const items=[['📅','Ραντεβού','#appointments'],['👥','Πελάτες','#clients'],['🤝','Συνεργάτες','#partners'],['📞','Follow-ups','#followups'],['🛒','Παραγγελίες','#orders'],['📄','Έγγραφα','#documents'],['✈️','Ταξίδια','#trips'],['📚','Εκπαιδεύσεις','#nw-training'],['📦','Αποθήκη','#nw-inventory'],['📊','Reports','#nw-reports']];
 items.forEach(([icon,label,h])=>{const b=document.createElement('button');b.type='button';b.textContent=`${icon} ${label}  →`;b.style.cssText='display:block;width:100%;padding:15px 12px;margin:6px 0;border:1px solid #e1e6df;border-radius:14px;background:#fff;color:#203326;font:800 15px Arial,sans-serif;text-align:left;cursor:pointer';b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();back.remove();go(h)};panel.appendChild(b)});
 back.appendChild(panel);document.body.appendChild(back);panel.querySelector('#nw258-close').onclick=()=>back.remove();back.onclick=e=>{if(e.target===back)back.remove()};
};
window.addEventListener('pointerdown',e=>{
 if(!isHome())return;
 const el=target(e);const r=route(el);if(!r)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(r==='MENU')openMenu();else go(r);
},true);
window.addEventListener('pointerup',e=>{if(isHome()&&route(target(e))){e.preventDefault();e.stopImmediatePropagation()}},true);
window.addEventListener('click',e=>{if(isHome()&&route(target(e))){e.preventDefault();e.stopImmediatePropagation()}},true);
})();
