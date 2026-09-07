(()=>{'use strict';
function clean(){if(location.hash!=='#appointments')return;document.querySelectorAll('main .rowcard .crud-actions').forEach(x=>x.remove())}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',clean);else clean();
window.addEventListener('hashchange',clean);
new MutationObserver(()=>{if(location.hash==='#appointments')clean()}).observe(document.body,{childList:true,subtree:true});
})();
