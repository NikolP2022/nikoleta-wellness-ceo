(()=>{
'use strict';
if(window.__NWCEO_CLEAN244)return;
window.__NWCEO_CLEAN244=true;
const forbidden=['tanita','προγράμματα','οικονομικά','planner','daily success','wellness touch point','marketing'];
const blockedRoutes=new Set(['#tanita','#measurements','#programs','#finance','#planner','#success','#nw-wellness','#nw-marketing']);
const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
const isForbidden=v=>forbidden.some(x=>norm(v).includes(x));
const clean=()=>{
  document.querySelectorAll('#menu button,#menu a,#menu [role="button"],.nw233-menu button,.nw240-menu button,.nw231-added button').forEach(el=>{
    if(isForbidden(el.textContent))el.remove();
  });
  document.querySelectorAll('#menu .nw233-title,#menu .nw240-title,.nw233-title').forEach(el=>{
    if(isForbidden(el.textContent))el.remove();
  });
  if(blockedRoutes.has(location.hash)){
    history.replaceState(null,'',location.pathname+location.search+'#');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
};
const start=()=>{
 let n=0;
 const run=()=>{clean();if(++n<30)setTimeout(run,150)};
 run();
 new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
 window.addEventListener('hashchange',()=>setTimeout(clean,20));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
