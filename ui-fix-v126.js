(()=>{'use strict';
function cleanup(){
  const main=document.querySelector('main'); if(!main)return;
  // Keep exactly one CRUD action group per record.
  document.querySelectorAll('.crud-actions').forEach(group=>{
    const parent=group.parentElement;
    if(parent) [...parent.querySelectorAll(':scope > .crud-actions')].slice(1).forEach(x=>x.remove());
  });
  // Keep exactly one "Νέα εγγραφή" button per page.
  const news=[...main.querySelectorAll('button')].filter(b=>b.textContent.trim()==='＋ Νέα εγγραφή');
  news.slice(1).forEach(b=>b.remove());
  // Follow-ups: status is free text, not a forced "active" selector.
  const modal=[...document.querySelectorAll('.crud-modal')].at(-1);
  if(modal && /Follow-ups/.test(modal.textContent)){
    const sel=modal.querySelector('select[name="status"]');
    if(sel){
      const input=document.createElement('input'); input.name='status'; input.type='text'; input.value=sel.value||''; input.placeholder='Κατάσταση'; sel.replaceWith(input);
    }
  }
}
new MutationObserver(()=>{clearTimeout(window.__ui126);window.__ui126=setTimeout(cleanup,60)}).observe(document.body,{childList:true,subtree:true});
setTimeout(cleanup,300);setInterval(cleanup,700);
})();
