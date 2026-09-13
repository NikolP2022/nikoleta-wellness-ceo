(()=>{'use strict';
function mount(){if((location.hash||'').slice(1).split('/')[0]==='inventory'&&typeof window.renderInventory==='function'){window.renderInventory();}}
window.addEventListener('hashchange',()=>setTimeout(mount,0));
window.addEventListener('load',()=>setTimeout(mount,80));
setTimeout(mount,120);
})();
