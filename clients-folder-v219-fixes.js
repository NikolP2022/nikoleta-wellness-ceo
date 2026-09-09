(()=>{
'use strict';
if(window.__NWCEO_CF219)return;window.__NWCEO_CF219=1;
const go=h=>{if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'))};
function bind(){
 if(location.hash!=='#clients')return;
 document.querySelectorAll('[data-open]').forEach(b=>{if(b.__bound)return;b.__bound=1;b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();go('#client/'+encodeURIComponent(b.dataset.open))}});
 document.querySelectorAll('[data-edit]').forEach(b=>{if(b.__bound)return;b.__bound=1;b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();go('#client/'+encodeURIComponent(b.dataset.edit)+'/overview')}});
}
window.addEventListener('hashchange',()=>setTimeout(bind,80));
window.addEventListener('load',()=>setTimeout(bind,250));
new MutationObserver(()=>setTimeout(bind,20)).observe(document.body,{childList:true,subtree:true});
})();
