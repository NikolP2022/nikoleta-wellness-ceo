(()=>{
'use strict';
if(window.__NWCEO_MENU_HOME254)return;window.__NWCEO_MENU_HOME254=true;
const goHome=()=>{if(location.hash)location.hash='';else window.dispatchEvent(new HashChangeEvent('hashchange'));window.scrollTo({top:0,behavior:'smooth'});};
const install=()=>{
 const menu=document.getElementById('menu');
 if(!menu)return false;
 let box=document.getElementById('nw254-home');
 if(!box){
  box=document.createElement('div');
  box.id='nw254-home';
  box.style.cssText='padding:8px 0 4px;border-bottom:1px solid #e5eadf;margin-bottom:6px';
  const b=document.createElement('button');
  b.type='button';
  b.textContent='⌂ Αρχική';
  b.setAttribute('aria-label','Αρχική σελίδα');
  b.style.cssText='display:block;width:100%;text-align:left;margin:4px 0;padding:12px;border:0;border-radius:12px;background:#eef6ec;color:#245b2b;font-weight:900;font:inherit;cursor:pointer';
  b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();goHome();});
  box.appendChild(b);
  menu.prepend(box);
 }
 return true;
};
const start=()=>{let n=0;const run=()=>{if(install())return;if(++n<50)setTimeout(run,100)};run();new MutationObserver(()=>install()).observe(document.body,{childList:true,subtree:true});};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
