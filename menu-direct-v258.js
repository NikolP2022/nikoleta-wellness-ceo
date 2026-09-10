(()=>{
'use strict';
if(window.__NWCEO_MENUDIRECT258)return;window.__NWCEO_MENUDIRECT258=true;
const open=()=>{const m=document.getElementById('nw-static-menu');if(m){m.classList.add('open');m.style.display='block';m.setAttribute('aria-hidden','false')}};
const close=()=>{const m=document.getElementById('nw-static-menu');if(m){m.classList.remove('open');m.style.display='none';m.setAttribute('aria-hidden','true')}};
window.__NWCEO_OPEN_MENU258=open;
window.__NWCEO_CLOSE_MENU258=close;
function wire(){
 const b=document.getElementById('ceo-hamb');
 if(b&&!b.__nw258){b.__nw258=true;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open()});}
 const menu=document.getElementById('nw-static-menu');
 if(menu&&!menu.__nwHome262){
  menu.__nwHome262=true;
  const panel=menu.querySelector('.panel');
  if(panel){
   let home=panel.querySelector('[data-nw-home]');
   if(!home){
    home=document.createElement('a');
    home.href='#';
    home.dataset.nwHome='1';
    home.textContent='⌂ Αρχική';
    home.style.cssText='display:flex;justify-content:space-between;margin:7px 0;padding:14px;border-radius:13px;background:#e7f2e5;color:#245b2b;text-decoration:none;font-weight:900;font-size:16px';
    home.addEventListener('click',e=>{e.preventDefault();close();if(location.hash)location.hash='';else window.dispatchEvent(new HashChangeEvent('hashchange'));window.scrollTo({top:0,behavior:'smooth'});});
    const title=panel.querySelector('div[style*="ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ"]');
    if(title)title.after(home);else panel.prepend(home);
   }
  }
 }
 document.querySelectorAll('#nw-static-menu a').forEach(a=>{if(!a.__nw258){a.__nw258=true;a.addEventListener('click',()=>setTimeout(close,0));}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(wire,80));else setTimeout(wire,80);
window.addEventListener('load',()=>setTimeout(wire,120));
new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
