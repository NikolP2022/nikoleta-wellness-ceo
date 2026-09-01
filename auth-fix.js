(()=>{
  const DB_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const DB_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const APP_URL='https://nikolp2022.github.io/nikoleta-wellness-ceo/';
  const getDb=()=>window.supabase?.createClient?.(DB_URL,DB_KEY);
  const msg=t=>{const el=document.querySelector('#am');if(el){el.textContent=t;el.style.display='block'}};
  const fields=()=>({email:document.querySelector('#ae')?.value.trim()||'',password:document.querySelector('#ap')?.value||''});
  const ensureButton=()=>{const box=document.querySelector('#auth .modal-actions');if(box&&!box.parentElement.querySelector('[data-auth="forgot"]'))box.insertAdjacentHTML('afterend','<button type="button" class="link-button" data-auth="forgot">🔑 Ξέχασα τον κωδικό μου</button>')};
  async function handle(mode){
    const db=getDb(); if(!db){msg('❌ Δεν φορτώθηκε η σύνδεση. Κάνε ανανέωση της σελίδας.');return}
    const {email,password}=fields(); if(!email){msg('⚠️ Γράψε πρώτα το email σου.');return}
    if((mode==='signup'||mode==='login')&&password.length<6){msg('⚠️ Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.');return}
    if(mode==='forgot'){
      msg('⏳ Στέλνω email για αλλαγή κωδικού…');
      try{const r=await db.auth.resetPasswordForEmail(email,{redirectTo:APP_URL+'?password-reset=1'});if(r.error){msg('❌ '+r.error.message);return}msg('✅ Έστειλα email. Πάτησε «Reset password» για να επιστρέψεις στην εφαρμογή και να βάλεις νέο κωδικό.')}catch(e){msg('❌ '+(e?.message||'Παρουσιάστηκε σφάλμα.'))}return;
    }
    msg(mode==='magic'?'⏳ Στέλνω σύνδεσμο στο email σου…':mode==='signup'?'⏳ Δημιουργώ τον λογαριασμό…':'⏳ Γίνεται σύνδεση…');
    try{let r;if(mode==='magic')r=await db.auth.signInWithOtp({email,options:{emailRedirectTo:APP_URL,shouldCreateUser:true}});else if(mode==='signup')r=await db.auth.signUp({email,password,options:{emailRedirectTo:APP_URL}});else r=await db.auth.signInWithPassword({email,password});if(r?.error){msg('❌ '+(r.error.message||'Η σύνδεση απέτυχε.'));return}if(mode==='magic'){msg('✅ Έτοιμο! Άνοιξε το email σου και πάτησε τον σύνδεσμο.');return}if(mode==='signup'&&!r?.data?.session){msg('✅ Ο λογαριασμός δημιουργήθηκε! Έλεγξε το email σου για επιβεβαίωση.');return}if(r?.data?.session){window.location.reload();return}}catch(e){msg('❌ '+(e?.message||'Παρουσιάστηκε σφάλμα.'))}
  }
  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-auth]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();handle(b.dataset.auth)},true);
  document.addEventListener('click',e=>{const b=e.target.closest?.('.account-btn');if(!b)return;if(!document.querySelector('#auth')&&typeof window.openAuth==='function'){e.preventDefault();window.openAuth();setTimeout(ensureButton,0)}},true);
  new MutationObserver(()=>{if(document.querySelector('#auth'))ensureButton()}).observe(document.body,{childList:true,subtree:true});
})();