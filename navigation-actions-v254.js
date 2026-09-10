(()=>{
'use strict';
if(window.__NWCEO_NAV254)return;window.__NWCEO_NAV254=true;
const routes={calendar:'#appointments',clients:'#clients',partners:'#partners',followups:'#followups',orders:'#orders',documents:'#documents',trips:'#trips',training:'#nw-training',academy:'#nw-academy',inventory:'#nw-inventory',reports:'#nw-reports'};
function go(hash){
  if(location.hash===hash){window.dispatchEvent(new HashChangeEvent('hashchange'));return;}
  location.hash=hash;
}
function home(){
  const url=location.pathname+location.search;
  if(location.hash){location.replace(url);return;}
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
function click(e){
  const b=e.target.closest?.('#nw244-menu button[data-nw244],#menu button[data-v],#menu a[data-nw244]');
  if(!b)return;
  const key=b.dataset.nw244||b.dataset.v;
  if(key==='home'){
    e.preventDefault();e.stopImmediatePropagation();home();return;
  }
  if(routes[key]){
    e.preventDefault();e.stopImmediatePropagation();go(routes[key]);return;
  }
}
document.addEventListener('click',click,true);
})();
