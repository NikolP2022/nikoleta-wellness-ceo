(()=>{
'use strict';
if(window.__NWCEO_AP142)return; window.__NWCEO_AP142=1;
function isAppointments(){return /Ραντεβού/.test(document.querySelector('main h1')?.textContent||'')}
function fix(){
  if(!isAppointments())return;
  document.querySelectorAll('.crud-new,.crud-actions').forEach(el=>{el.style.display='none'});
}
document.addEventListener('click',e=>{
  if(!isAppointments())return;
  const b=e.target.closest('.crud-new');
  if(b){e.preventDefault();e.stopImmediatePropagation();document.getElementById('ap130-new')?.click();return false;}
},true);
window.addEventListener('load',fix);
window.addEventListener('hashchange',()=>setTimeout(fix,0));
setInterval(fix,800);
fix();
})();
