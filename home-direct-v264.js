(()=>{'use strict';if(window.__NWCEO_HOME264)return;window.__NWCEO_HOME264=true;
const goHome=()=>{const url=location.origin+location.pathname+'?v=264';location.assign(url)};
const wire=()=>{document.querySelectorAll('[data-nw-home262],[data-nw-home],a[href="#"]').forEach(a=>{if(a.__nw264)return;a.__nw264=true;a.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();goHome()},true)});};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
