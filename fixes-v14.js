(()=>{
  const APP_URL='https://nikolp2022.github.io/nikoleta-wellness-ceo/';
  const realCreate=window.supabase?.createClient;
  if(realCreate&&!window.__nwceoProxyInstalled){
    window.__nwceoProxyInstalled=true;
    const map={
      'Ραντεβού':'appointments','Συνεργάτες':'partners','Προγράμματα':'programs','Παραγγελίες':'orders','Υπενθυμίσεις':'reminders','Έγγραφα':'documents',
      'όνομα':'όνομα','τηλέφωνο':'τηλέφωνο','email':'email','διεύθυνση':'διεύθυνση','σημειώσεις':'σημειώσεις','κατάσταση':'κατάσταση','Τίτλος':'Τίτλος','Κατάσταση':'Κατάσταση','Επιχείρηση':'Επιχείρηση','Βάρος':'Βάρος','Πρωτεΐνη':'Πρωτεΐνη','Περιγραφή':'Περιγραφή','Ποσότητα':'Ποσότητα','Ποσό':'Ποσό','Κατηγορία':'Κατηγορία','Εργασία':'Εργασία','ολοκληρώθηκε':'ολοκληρώθηκε','Προτεραιότητα':'Προτεραιότητα','θερμίδες':'θερμίδες','Σημειώσεις':'Σημειώσεις'
    };
    window.supabase.createClient=(...args)=>{
      const c=realCreate(...args);
      const from=c.from.bind(c);
      c.from=(name)=>from(map[name]||name);
      return c;
    };
  }

  const ensureForgot=()=>{
    const auth=document.querySelector('#auth');
    if(!auth)return;
    if(!auth.querySelector('[data-auth="forgot"]')){
      const btn=document.createElement('button');btn.type='button';btn.className='link-button';btn.dataset.auth='forgot';btn.textContent='🔑 Ξέχασα τον κωδικό μου';
      auth.querySelector('.modal-actions')?.insertAdjacentElement('afterend',btn);
    }
  };

  async function resetPassword(){
    const email=document.querySelector('#ae')?.value.trim();
    const msg=document.querySelector('#am');
    if(!email){if(msg)msg.textContent='⚠️ Γράψε πρώτα το email σου.';return;}
    if(msg)msg.textContent='⏳ Στέλνω email για αλλαγή κωδικού…';
    try{
      const db=window.supabase?.createClient?.('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');
      const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo:APP_URL+'?password-reset=1'});
      if(msg)msg.textContent=error?'❌ '+error.message:'✅ Έστειλα email. Πάτησε «Reset password» και θα επιστρέψεις στην εφαρμογή για νέο κωδικό.';
    }catch(e){if(msg)msg.textContent='❌ '+(e?.message||'Σφάλμα');}
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest?.('[data-auth="forgot"]');
    if(b){e.preventDefault();e.stopImmediatePropagation();resetPassword();return;}
  },true);

  const clientPatch=()=>{
    const form=document.querySelector('#editor form[data-form="appointments"]');
    if(!form||form.dataset.clientPatched==='1')return;
    const select=form.querySelector('select[name="client_id"]');
    if(!select)return;
    form.dataset.clientPatched='1';
    const wrap=select.closest('label');
    if(wrap){
      const current=select.value||'';
      const clients=JSON.parse(localStorage.getItem('nwceo_final_v1')||'{"clients":[]}').clients||[];
      const currentName=clients.find(c=>c.id===current)?.name||'';
      wrap.innerHTML=`Ονοματεπώνυμο πελάτη *<input name="client_name" type="text" value="${String(currentName).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}" placeholder="Γράψε το ονοματεπώνυμο" autocomplete="off" required><input type="hidden" name="client_id" value="${current}">`;
    }
  };

  document.addEventListener('click',()=>setTimeout(clientPatch,0),true);
  document.addEventListener('submit',e=>{
    const form=e.target.closest?.('#editor form[data-form="appointments"]');
    if(!form)return;
    const name=form.querySelector('[name="client_name"]')?.value.trim();
    if(!name)return;
    const st=JSON.parse(localStorage.getItem('nwceo_final_v1')||'{"clients":[]}');
    st.clients=st.clients||[];
    let c=st.clients.find(x=>String(x.name||'').trim().toLowerCase()===name.toLowerCase());
    if(!c){c={id:crypto.randomUUID(),name,status:'Ενεργός',phone:'',email:'',address:'',birth_date:'',notes:''};st.clients.unshift(c);localStorage.setItem('nwceo_final_v1',JSON.stringify(st));}
    let hidden=form.querySelector('[name="client_id"]');
    if(!hidden){hidden=document.createElement('input');hidden.type='hidden';hidden.name='client_id';form.appendChild(hidden)}
    hidden.value=c.id;
    const p=JSON.parse(localStorage.getItem('nwceo_pending_final')||'[]');
    if(!p.some(o=>o.k==='clients'&&o.data?.id===c.id)){p.push({type:'upsert',k:'clients',data:c});localStorage.setItem('nwceo_pending_final',JSON.stringify(p));}
  },true);

  const recovery=()=>{
    if(!location.search.includes('password-reset=1'))return;
    const open=()=>{
      const btn=document.querySelector('.account-btn');
      if(btn){btn.click();setTimeout(()=>{
        const auth=document.querySelector('#auth');
        if(!auth)return;
        const card=auth.querySelector('.auth-card');
        if(!card)return;
        card.querySelector('h2').textContent='Νέος κωδικός';
        card.querySelector('p').textContent='Βάλε τον νέο σου κωδικό.';
        const password=card.querySelector('#ap');
        password.value='';password.placeholder='Νέος κωδικός';
        const actions=card.querySelector('.modal-actions');
        if(actions)actions.innerHTML='<button type="button" class="primary" id="save-new-password">Αποθήκευση νέου κωδικού</button>';
        card.querySelector('[data-auth="forgot"]')?.remove();
        card.querySelector('[data-auth="magic"]')?.remove();
        const b=card.querySelector('#save-new-password');
        b?.addEventListener('click',async()=>{
          const pw=password.value||'';const msg=card.querySelector('#am');
          if(pw.length<6){msg.textContent='⚠️ Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.';return}
          const db=window.supabase.createClient('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');
          const {error}=await db.auth.updateUser({password:pw});
          msg.textContent=error?'❌ '+error.message:'✅ Ο κωδικός άλλαξε. Τώρα μπορείς να συνδεθείς.';
          if(!error)setTimeout(()=>location.href=APP_URL,1200);
        });
      },100);
    }
    setTimeout(open,500);
  };
  recovery();
  new MutationObserver(()=>{ensureForgot();clientPatch()}).observe(document.body,{childList:true,subtree:true});
})();
