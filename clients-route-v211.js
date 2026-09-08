(()=>{
'use strict';
if(window.__NWCEO_ROUTE211)return;window.__NWCEO_ROUTE211=1;
const go=hash=>{if(location.hash!==hash)location.hash=hash;else window.dispatchEvent(new HashChangeEvent('hashchange'));};
const onClick=e=>{
  const t=e.target.closest?.('[data-v="clients"],[data-new="clients"],[data-client],[data-app]');
  if(!t)return;
  if(t.matches('[data-v="clients"],[data-new="clients"]')){e.preventDefault();e.stopImmediatePropagation();go('#clients');return;}
  if(t.matches('[data-client]')){e.preventDefault();e.stopImmediatePropagation();go('#client/'+encodeURIComponent(t.getAttribute('data-client')));return;}
  if(t.matches('[data-app]')){e.preventDefault();e.stopImmediatePropagation();go('');setTimeout(()=>window.dispatchEvent(new HashChangeEvent('hashchange')),0);}
};
document.addEventListener('click',onClick,true);
})();
