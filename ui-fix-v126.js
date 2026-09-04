(()=>{'use strict';
function loadAppointments(){
  if(document.getElementById('appointments-v127-loader'))return;
  const s=document.createElement('script');s.id='appointments-v127-loader';s.src='./appointments-v127.js?v=127';s.defer=true;document.head.appendChild(s);
}
function cleanup(){
  const main=document.querySelector('main'); if(!main)return;
  document.querySelectorAll('.crud-actions').forEach(group=>{
    const parent=group.parentElement;
    if(parent) [...parent.querySelectorAll(':scope > .crud-actions')].slice(1).forEach(x=>x.remove());
  });
  const news=[...main.querySelectorAll('button')].filter(b=>b.textContent.trim()==='＋ Νέα εγγραφή');
  news.slice(1).forEach(b=>b.remove());
  const modal=[...document.querySelectorAll('.crud-modal')].at(-1);
  if(modal && /Follow-ups/.test(modal.textContent)){
    const sel=modal.querySelector('select[name="status"]');
    if(sel){const input=document.createElement('input');input.name='status';input.type='text';input.value=sel.value||'';input.placeholder='Κατάσταση';sel.replaceWith(input);}
  }
}
loadAppointments();
new MutationObserver(()=>{clearTimeout(window.__ui126);window.__ui126=setTimeout(cleanup,60)}).observe(document.body,{childList:true,subtree:true});
setTimeout(cleanup,300);setInterval(cleanup,700);
})();
