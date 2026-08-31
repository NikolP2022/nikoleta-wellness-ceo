(()=>{
  const wait=()=>window.supabase&&document.body;
  const getDb=()=>window.supabase?.createClient?.('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');
  const msg=t=>{const el=document.querySelector('#am');if(el)el.textContent=t};
  async function handle(mode){
    const db=getDb();
    if(!db){msg('Δεν φορτώθηκε η σύνδεση. Κάνε ανανέωση της σελίδας.');return}
    const email=document.querySelector('#ae')?.value.trim();
    const password=document.querySelector('#ap')?.value||'';
    if(!email){msg('Γράψε πρώτα το email σου.');return}
    if(mode==='signup' && password.length<6){msg('Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.');return}
    msg(mode==='magic'?'Στέλνω τον σύνδεσμο στο email σου…':mode==='signup'?'Δημιουργώ τον λογαριασμό…':'Γίνεται σύνδεση…');
    try{
      let r;
      if(mode==='magic') r=await db.auth.signInWithOtp({email,options:{emailRedirectTo:location.href}});
      else if(mode==='signup') r=await db.auth.signUp({email,password,options:{emailRedirectTo:location.href}});
      else r=await db.auth.signInWithPassword({email,password});
      if(r.error){msg('❌ '+r.error.message);return}
      if(mode==='magic'){msg('✅ Έτοιμο! Άνοιξε το email σου και πάτησε τον σύνδεσμο σύνδεσης.');return}
      if(mode==='signup' && !r.data.session){msg('✅ Ο λογαριασμός δημιουργήθηκε. Άνοιξε το email σου και πάτησε τον σύνδεσμο επιβεβαίωσης. Μετά κάνε «Σύνδεση».');return}
      if(r.data.session){location.reload();return}
      msg('Η διαδικασία ολοκληρώθηκε.');
    }catch(e){msg('❌ '+(e?.message||'Παρουσιάστηκε σφάλμα.'))}
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('[data-auth]');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    handle(b.dataset.auth);
  },true);
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.account-btn');
    if(!b)return;
    if(!document.querySelector('#auth') && typeof window.openAuth==='function') window.openAuth();
  });
})();
