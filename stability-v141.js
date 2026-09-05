(()=>{
'use strict';
/* v141: lightweight navigation safety layer. No MutationObserver, no repeated Supabase clients. */
const $=(s,r=document)=>r.querySelector(s);
function closeMenu(){const m=$('#menu');if(m)m.classList.remove('open','show');}
function toggleMenu(){const m=$('#menu');if(m)m.classList.toggle('open');}
function ensureMenu(){const m=$('#menu');if(!m)return; if(!m.querySelector('[data-v="calendar"]'))return;}
function enhance(){ensureMenu();}
if(window.__NWCEOV141)return; window.__NWCEOV141=true;
document.addEventListener('click',e=>{
  const hamb=e.target.closest?.('#hamb');
  if(hamb){e.preventDefault();e.stopPropagation();toggleMenu();return;}
  const menuItem=e.target.closest?.('#menu [data-v]');
  if(menuItem){closeMenu();return;}
  if(e.target.closest?.('#menu'))return;
  const menu=$('#menu');
  if(menu?.classList.contains('open') && !e.target.closest('#menu'))closeMenu();
},{capture:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('load',enhance,{once:true});
setTimeout(enhance,250);
})();
