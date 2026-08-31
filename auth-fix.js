(()=>{
  const DB_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const DB_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const getDb=()=>window.supabase?.createClient?.(DB_URL,DB_KEY);
  const msg=t=>{const el=document.querySelector('#am');if(el){el.textContent=t;el.style.display='block'}};
  const fields=()=>({email:document.querySelector('#ae')?.value.trim()||'',password:document.querySelector('#ap')?.value||''});
  async function handle(mode){
    const db=getDb();
    if(!db){msg('❌ Δεν φορτώθηκε η σύνδεση. Κλείσε το παράθυρο και κάνε ανανέωση.');return}
    const {email,password}=fields();
    if(!email){msg('⚠️ Γράψε το email σου.');return}
    if((mode==='signup'||mode==='login')&&password.length<6){msg('⚠️ Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.');return}
    msg(mode==='magic'?'⏳ Στέλνω σύνδεσμο στο email σου…':mode==='signup'?'⏳ Δημιουργώ τον λογαριασμό…':'⏳ Γίνεται σύνδεση…');
    try{
      let r;
      if(mode==='magic') r=await db.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.href,shouldCreateUser:true}});
      else if(mode==='signup') r=await db.auth.signUp({email,password,options:{emailRedirectTo:window.location.href}});
      else r=await db.auth.signInWithPassword({email,password});
      if(r?.error){msg('❌ '+(r.error.message||'Η σύνδεση απέτυχε.'));return}
      if(mode==='magic'){msg('✅ Έτοιμο! Άνοιξε το email σου και πάτησε τον σύνδεσμο. Αν δεν το βλέπεις, έλεγξε και τα Ανεπιθύμητα.');return}
      if(mode==='signup'&&!r?.data?.session){msg('✅ Ο λογαριασμός δημιουργήθηκε! Έλεγξε το email σου για επιβεβαίωση και μετά πάτησε «Σύνδεση».');return}
      if(r?.data?.session){window.location.reload();return}
      msg('✅ Η διαδικασία ολοκληρώθηκε.');
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
    if(!document.querySelector('#auth')&&typeof window.openAuth==='function'){e.preventDefault();window.openAuth()}
  },true);
})();
