(()=>{
'use strict';
if(window.__NWCEO_HOME265)return;window.__NWCEO_HOME265=true;
const HOME=()=>location.assign(location.origin+location.pathname+'?v=265');
const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
const isHome=el=>{if(!el)return false;const key=norm(el.dataset?.nwHome262||el.dataset?.nwHome||el.dataset?.nw244);if(key==='home'||key==='1')return true;const txt=norm(el.textContent);return txt==='⌂ αρχική'||txt==='αρχική'||txt.includes('⌂ αρχική')};
document.addEventListener('click',e=>{const el=e.target.closest?.('a,button,[role="button"]');if(!el||!isHome(el))return;e.preventDefault();e.stopImmediatePropagation();HOME()},true);
})();
