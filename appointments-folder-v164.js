(()=>{
'use strict';
function normalizeAppointmentsMenu(){
  const menu=document.querySelector('#menu');
  if(!menu)return;
  const btn=menu.querySelector('[data-v="calendar"]');
  if(!btn)return;
  let sub=menu.querySelector('[data-nikoleta-appointments-sub]');
  if(!sub){
    sub=document.createElement('div');
    sub.dataset.nikoletaAppointmentsSub='1';
    sub.style.cssText='display:none;padding:0 0 4px 18px;margin-top:-2px';
    sub.innerHTML='<button type="button" data-nikoleta-agenda style="padding:10px 14px;font-size:14px">↳ Ενιαία Ατζέντα</button>';
    btn.insertAdjacentElement('afterend',sub);
  }
  btn.textContent='📅 Ραντεβού';
  btn.dataset.nikoletaFolder='1';
  btn.setAttribute('aria-expanded',sub.style.display!=='none'?'true':'false');
  btn.onclick=function(e){
    e.preventDefault();e.stopPropagation();
    sub.style.display=sub.style.display==='none'?'block':'none';
    btn.setAttribute('aria-expanded',sub.style.display!=='none'?'true':'false');
    if(window.NikoletaAppointments?.renderAppointments)window.NikoletaAppointments.renderAppointments();
  };
  const agenda=sub.querySelector('[data-nikoleta-agenda]');
  if(agenda)agenda.onclick=function(e){
    e.preventDefault();e.stopPropagation();
    sub.style.display='block';btn.setAttribute('aria-expanded','true');
    if(window.NikoletaAppointments?.renderAgenda)window.NikoletaAppointments.renderAgenda();
  };
}
new MutationObserver(normalizeAppointmentsMenu).observe(document.body,{childList:true,subtree:true});
window.addEventListener('load',normalizeAppointmentsMenu);
setTimeout(normalizeAppointmentsMenu,100);
setTimeout(normalizeAppointmentsMenu,500);
})();
