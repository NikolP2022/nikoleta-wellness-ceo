(()=>{
'use strict';
if(window.__NWCEO_CLEAN241)return;
window.__NWCEO_CLEAN241=true;
const forbidden=[
  'wellness touch point',
  'marketing',
  'αποθήκη',
  'academy',
  'reports'
];
const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
const isForbidden=v=>forbidden.some(x=>norm(v).includes(x));
const clean=()=>{
  document.querySelectorAll('#menu button,#menu a,#menu [role="button"],.nw233-menu button,.nw240-menu button,.nw231-added button').forEach(el=>{
    const text=norm(el.textContent);
    if(isForbidden(text)) el.remove();
  });
  document.querySelectorAll('#menu .nw233-title,#menu .nw240-title,.nw233-title').forEach(el=>{
    const text=norm(el.textContent);
    if(isForbidden(text)) el.remove();
  });
  const blocked={
    '#nw-wellness':'#',
    '#nw-marketing':'#',
    '#nw-inventory':'#',
    '#nw-academy':'#',
    '#nw-reports':'#'
  };
  const h=location.hash;
  if(Object.prototype.hasOwnProperty.call(blocked,h)){
    history.replaceState(null,'',location.pathname+location.search+'#');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
};
const start=()=>{
  let n=0;
  const run=()=>{clean();if(++n<20)setTimeout(run,150)};
  run();
  new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('hashchange',()=>setTimeout(clean,20));
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
