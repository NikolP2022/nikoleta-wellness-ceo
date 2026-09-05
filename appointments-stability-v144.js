(()=>{
'use strict';
if(window.__NWCEO_AP144)return; window.__NWCEO_AP144=true;
const isAppointments=()=>/📅\s*Ραντεβού/.test(document.querySelector('main h1')?.textContent||'');
const style=document.createElement('style');
style.id='nwceo-ap144-style';
style.textContent='body.nwceo-appointments .crud-new,body.nwceo-appointments .crud-actions{display:none!important}';
(document.head||document.documentElement).appendChild(style);
function clean(){
  const ap=isAppointments();
  document.body.classList.toggle('nwceo-appointments',ap);
  if(!ap)return;
  document.querySelectorAll('.crud-modal:not(.ap130-modal)').forEach(x=>x.remove());
  const m=document.querySelector('.ap130-modal');
  if(!m)return;
  const h=m.querySelector('h2')?.textContent||'';
  if(/^\s*＋?\s*Νέο\s+ραντεβού/.test(h)){
    m.querySelectorAll('input,textarea,select').forEach(el=>{
      if(el.type==='hidden'||el.type==='button'||el.type==='submit')return;
      if(el.tagName==='SELECT')el.value='';
      else{el.value='';el.defaultValue='';}
    });
  }
}
document.addEventListener('click',e=>{
  if(isAppointments()&&e.target.closest('.crud-new')){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
},true);
new MutationObserver(()=>{clearTimeout(window.__nw144t);window.__nw144t=setTimeout(clean,0)}).observe(document.body,{childList:true,subtree:true});
window.addEventListener('load',clean,{once:true});
window.addEventListener('hashchange',clean);
clean();
})();
