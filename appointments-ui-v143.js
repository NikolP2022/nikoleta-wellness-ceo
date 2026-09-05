(()=>{
'use strict';
if(window.__NWCEO_AP143)return; window.__NWCEO_AP143=1;
function isAppointments(){return /Ραντεβού/.test(document.querySelector('main h1')?.textContent||'')}
function clean(){if(!isAppointments())return;document.querySelectorAll('.crud-new,.crud-actions').forEach(el=>el.remove())}
window.addEventListener('load',()=>setTimeout(clean,0),{once:true});
window.addEventListener('hashchange',()=>setTimeout(clean,0));
document.addEventListener('click',e=>{if(!isAppointments())return;if(e.target.closest('#ap130-new'))setTimeout(clean,0)});
clean();
})();
