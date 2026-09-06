(()=>{
'use strict';
function boot(){
  if(document.getElementById('wellness-mobile-nav')) return;
  const nav=document.createElement('nav');
  nav.id='wellness-mobile-nav';
  nav.innerHTML=`
    <button data-v="home"><span>⌂</span><small>Αρχική</small></button>
    <button data-v="calendar"><span>▣</span><small>Ραντεβού</small></button>
    <button data-v="clients"><span>♙</span><small>Πελάτες</small></button>
    <button data-v="more"><span>⋯</span><small>Περισσότερα</small></button>`;
  document.body.appendChild(nav);
  nav.addEventListener('click',e=>{
    const b=e.target.closest('button[data-v]'); if(!b) return;
    const v=b.dataset.v;
    if(v==='more'){ document.getElementById('hamb')?.click(); return; }
    document.querySelector(`#menu button[data-v="${v}"]`)?.click();
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
