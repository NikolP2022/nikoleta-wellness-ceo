(()=>{
'use strict';
if(window.__NWCEO_HOME_CLICKS251)return;window.__NWCEO_HOME_CLICKS251=true;
const go=h=>{if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'));};
const routeFor=t=>{
 if(t.matches('[data-v="clients"]'))return '#clients';
 if(t.matches('[data-v="followups"]'))return '#followups';
 if(t.matches('#ceo-appts,#ceo-new-appt,#ceo-empty-appt'))return '#appointments';
 if(t.matches('.ceo-motto'))return '#planner';
 const ev=t.closest('.ceo-event');
 if(ev){if(ev.classList.contains('ceo-appointment'))return '#appointments';if(ev.classList.contains('ceo-followup'))return '#followups';if(ev.classList.contains('ceo-task'))return '#planner';}
 return null;
};
const click=e=>{const t=e.target.closest?.('[data-v="clients"],[data-v="followups"],#ceo-appts,#ceo-new-appt,#ceo-empty-appt,.ceo-event,.ceo-motto');if(!t)return;const r=routeFor(t);if(r){e.preventDefault();e.stopPropagation();go(r)}};
document.addEventListener('click',click,true);
const key=e=>{if(e.key!=='Enter'&&e.key!==' ')return;const t=e.target.closest?.('.ceo-event,.ceo-motto');if(!t)return;const r=routeFor(t);if(r){e.preventDefault();go(r)}};
document.addEventListener('keydown',key,true);
const enhance=()=>{document.querySelectorAll('.ceo-event,.ceo-motto').forEach(x=>{x.tabIndex=0;x.setAttribute('role','button')})};
window.addEventListener('load',enhance);new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
})();
