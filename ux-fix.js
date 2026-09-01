(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const uid=()=>crypto.randomUUID();
  const today=()=>new Date().toISOString().slice(0,10);
  const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  function openAppointment(id=''){
    if(typeof window.modal!=='function')return;
    document.body.insertAdjacentHTML('beforeend',window.modal('appointments',id));
    const form=$('#editor form[data-form="appointments"]');if(!form)return;
    const state=read('nwceo_final_v1',{clients:[],appointments:[]});
    const old=form.querySelector('[name="client_id"]');
    const currentId=old?.value||'';
    const client=(state.clients||[]).find(c=>c.id===currentId);
    const label=old?.closest('label');
    if(label)label.outerHTML='<label>Ονοματεπώνυμο πελάτη<input name="client_name" type="text" autocomplete="name" placeholder="Γράψε ονοματεπώνυμο" value="'+String(client?.name||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"></label><input name="client_id" type="hidden" value="'+currentId+'">';
    ['start_time','end_time'].forEach(n=>{
      const i=form.querySelector('[name="'+n+'"]');if(!i)return;
      const v=i.value||'';const l=i.closest('label');
      if(l)l.outerHTML='<label>'+(n==='start_time'?'Ώρα έναρξης (24ωρο)':'Ώρα λήξης (24ωρο)')+'<input name="'+n+'" type="text" inputmode="numeric" autocomplete="off" placeholder="09:30" value="'+v+'" pattern="([01]\\d|2[0-3]):[0-5]\\d" title="Ώρα σε μορφή 24ώρου, π.χ. 09:30"></label>';
    });
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('[data-new="appointments"],[data-edit="appointments"]');if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();openAppointment(b.dataset.id||'');
  },true);
  document.addEventListener('submit',e=>{
    const f=e.target.closest?.('form[data-form="appointments"]');if(!f||!f.querySelector('[name="client_name"]'))return;
    e.preventDefault();e.stopImmediatePropagation();
    const fd=new FormData(f),state=read('nwceo_final_v1',{clients:[],appointments:[]}),pending=read('nwceo_pending_final',[]);
    const id=f.dataset.id||uid(),name=String(fd.get('client_name')||'').trim();
    let clientId=String(fd.get('client_id')||'');
    if(name){let c=(state.clients||[]).find(x=>(x.name||'').trim().toLocaleLowerCase('el-GR')===name.toLocaleLowerCase('el-GR'));if(!c){c={id:uid(),name,phone:'',email:'',address:'',birth_date:'',notes:'',status:'Ενεργός'};state.clients=state.clients||[];state.clients.unshift(c);pending.push({type:'upsert',k:'clients',data:c})}clientId=c.id}else clientId='';
    const appointment={id,client_id:clientId,title:String(fd.get('title')||'Ραντεβού'),date:String(fd.get('date')||today()),start_time:String(fd.get('start_time')||''),end_time:String(fd.get('end_time')||''),type:String(fd.get('type')||'Ραντεβού'),status:String(fd.get('status')||'Προγραμματισμένο'),notes:String(fd.get('notes')||''),reminder_minutes:Number(fd.get('reminder_minutes')||30)};
    state.appointments=state.appointments||[];const i=state.appointments.findIndex(x=>x.id===id);if(i>=0)state.appointments[i]=appointment;else state.appointments.unshift(appointment);
    pending.push({type:'upsert',k:'appointments',data:appointment});write('nwceo_final_v1',state);write('nwceo_pending_final',pending);f.closest('.modal')?.remove();location.reload();
  },true);
  document.addEventListener('click',e=>{
    const s=e.target.closest?.('.stat');if(!s)return;
    const text=s.querySelector('small')?.textContent||'';
    const target=text.includes('Ραντεβού')?'appointments':text.includes('Πελάτες')?'clients':text.includes('Μετρήσεις')?'measurements':text.includes('Καθαρό')?'finance':'';
    if(target){e.preventDefault();e.stopImmediatePropagation();document.querySelector('#nav [data-view="'+target+'"]')?.click();}
  },true);
  document.addEventListener('input',e=>{if(!e.target.matches('[name="start_time"],[name="end_time"]'))return;let v=e.target.value.replace(/[^0-9:]/g,'');if(v.length===2&&!v.includes(':'))v+=':';e.target.value=v.slice(0,5)},true);
})();
