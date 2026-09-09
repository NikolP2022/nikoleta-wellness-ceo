(()=>{
'use strict';
if(window.__NWCEO_REMOVE238)return;window.__NWCEO_REMOVE238=true;
const FORBIDDEN_TEXT=[
 'Tanita','Προγράμματα','Οικονομικά','Planner','Daily Success','Success','Wellness Touch Point','Marketing','Academy'
];
const FORBIDDEN_ROUTES=new Set(['#measurements','#programs','#finance','#planner','#success','#nw-wellness','#nw-marketing','#nw-academy']);
const clean=()=>{
  document.querySelectorAll('#menu button').forEach(b=>{
    const text=(b.textContent||'').replace(/\s+/g,' ').trim();
    const route=(b.dataset?.v?('#'+b.dataset.v):'') || (b.dataset?.nwRoute?('#'+b.dataset.nwRoute):'');
    if(FORBIDDEN_ROUTES.has(route) || FORBIDDEN_TEXT.some(x=>text.toLowerCase().includes(x.toLowerCase()))) b.remove();
  });
  document.querySelectorAll('a,button').forEach(el=>{
    const href=el.getAttribute('href')||'';
    const text=(el.textContent||'').replace(/\s+/g,' ').trim();
    if(FORBIDDEN_ROUTES.has(href) || (el.closest('#menu')===null && FORBIDDEN_TEXT.some(x=>text.toLowerCase()===x.toLowerCase()))) el.remove();
  });
};
const guard=()=>{
  if(FORBIDDEN_ROUTES.has(location.hash)){
    location.hash='#clients';
    return;
  }
  clean();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{setTimeout(guard,50);setTimeout(guard,500);setTimeout(guard,1500)});
else {setTimeout(guard,50);setTimeout(guard,500);setTimeout(guard,1500)}
window.addEventListener('hashchange',()=>setTimeout(guard,30));
new MutationObserver(()=>clean()).observe(document.body,{childList:true,subtree:true});
})();
