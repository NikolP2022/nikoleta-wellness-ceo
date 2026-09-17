/* Keeps the mobile drawer fully hidden when closed. Does not touch sync/notifications. */
(()=>{
  function attach(){
    const dr=document.getElementById('dr');
    if(!dr) return false;
    dr.classList.remove('open');
    const close=document.getElementById('cl');
    if(close && !close.dataset.drawerFix){
      close.dataset.drawerFix='1';
      close.addEventListener('click',()=>dr.classList.remove('open'),true);
    }
    document.addEventListener('click',e=>{
      if(dr.classList.contains('open') && !dr.contains(e.target) && !e.target.closest('.menu')) dr.classList.remove('open');
    },true);
    return true;
  }
  const timer=setInterval(()=>{if(attach())clearInterval(timer)},100);
  setTimeout(()=>clearInterval(timer),15000);
})();
