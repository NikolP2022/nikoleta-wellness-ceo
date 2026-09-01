(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const uid=()=>crypto.randomUUID();
  function editAppointment(id=''){
    if(typeof window.modal!=='function')return;
    document.body.insertAdjacentHTML('beforeend',window.modal('appointments',id));
    const form=$('#editor form[data-form="appointments"]'); if(!form)return;
    const old=form.querySelector('[name="client_id"]');
    const currentId=old?.value||'';
    const client=(window.state?.clients||[]).find(c=>c.id===currentId);
    const label=old?.closest('label');
    if(label)label.outerHTML='<label>Ονοματεπώνυμο πελάτη<input name="client_name" type="text" autocomplete="name" placeholder="Γράψε ονοματεπώνυμο"></label><input name="client_id" type="hidden" value="'+currentId+'">';
    ['start_time','end_time'].forEach(n=>{
      const i=form.querySelector('[name="'+n+'"]');if(!i)return;
      const v=i.value||'';const l=i.closest('label');
      if(l)l.outerHTML='<label>'+ (n==='start_time'?'Ώρα έναρξης (24ωρο)':'Ώρα λήξης (24ωρο)') +'<input name="'+n+'" type="text" inputmode="numeric" autocomplete="off" placeholder="09:30" value="'+v+'" pattern="([01]\\d|2[0-3]):[0-5]\\d" title="Ώρα σε μορφή 24ώρου, π.χ. 09:30"></label>';
    });
    const name=form.querySelector('[name="client_name"]');if(name)name.value=client?.name||'';
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('[data-new="appointments"],[data-edit="appointments"]');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    editAppointment(b.dataset.id||'');
  },true);
  document.addEventListener('submit',e=>{
    const f=e.target.closest?.('form[data-form="appointments"]');if(!f)return;
    const name=f.querySelector('[name="client_name"]');if(!name)return;
    const value=name.value.trim();
    let hidden=f.querySelector('[name="client_id"]');
    if(!hidden){hidden=document.createElement('input');hidden.type='hidden';hidden.name='client_id';f.appendChild(hidden)}
    if(value){
      let c=(window.state?.clients||[]).find(x=>(x.name||'').trim().toLocaleLowerCase('el-GR')===value.toLocaleLowerCase('el-GR'));
      if(!c){c={id:uid(),name:value,phone:'',email:'',address:'',birth_date:'',notes:'',status:'Ενεργός'};window.state.clients.unshift(c);window.save?.();window.queue?.({type:'upsert',k:'clients',data:c});}
      hidden.value=c.id;
    }else hidden.value='';
  },true);
  document.addEventListener('click',e=>{
    const s=e.target.closest?.('.stat');if(!s)return;
    const n=s.querySelector('small')?.textContent||'';
    const map=n.includes('Ραντεβού')?'appointments':n.includes('Πελάτες')?'clients':n.includes('Μετρήσεις')?'measurements':n.includes('Καθαρό')?'finance':null;
    if(map&&typeof window.render==='function'){e.preventDefault();window.view=map;window.render();}
  });
  document.addEventListener('click',e=>{
    const q=e.target.closest?.('.quick-grid button');if(!q)return;
    const span=q.querySelector('span')?.textContent||'';
    const map=span.includes('Νέο ραντεβού')?'appointments':span.includes('Νέος πελάτης')?'clients':span.includes('Tanita')?'measurements':span.includes('Οικονομικά')?'finance':span.includes('Planner')?'tasks':span.includes('Υπενθύμιση')?'reminders':null;
    if(map&&typeof window.render==='function'&&typeof window.view!=='undefined'){e.preventDefault();window.view=map;window.render();}
  },true);
})();
