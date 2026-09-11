(()=>{
'use strict';
if(window.__NWCEO_HASH_ROUTER270)return;
window.__NWCEO_HASH_ROUTER270=true;

const core={
  '#appointments':'calendar',
  '#clients':'clients',
  '#partners':'partners',
  '#measurements':'measurements',
  '#programs':'programs',
  '#followups':'followups',
  '#orders':'orders',
  '#finance':'finance',
  '#planner':'planner',
  '#success':'success',
  '#documents':'documents',
  '#trips':'trips'
};

let last='';
function route(){
  const hash=location.hash||'';
  if(!hash || hash.startsWith('#client/')) return;
  const key=core[hash];
  if(!key || last===hash) return;
  const button=document.querySelector(`#menu button[data-v="${key}"]`);
  if(button){
    last=hash;
    button.click();
  }
}

window.addEventListener('hashchange',()=>setTimeout(route,0));
window.addEventListener('load',()=>setTimeout(route,80));
setTimeout(route,400);
})();
