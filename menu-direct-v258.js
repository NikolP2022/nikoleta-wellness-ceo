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
 document.querySelectorAll('#nw-static-menu a').forEach(a=>{if(!a.__nw258){a.__nw258=true;a.addEventListener('click',()=>setTimeout(close,0));}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(wire,80));else setTimeout(wire,80);
window.addEventListener('load',()=>setTimeout(wire,120));
new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
