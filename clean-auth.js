(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const APP='https://nikolp2022.github.io/nikoleta-wellness-ceo/';
  const client=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const $=s=>document.querySelector(s);
  const msg=t=>{const e=$('#am');if(e){e.textContent=t;e.style.display='block'}};
  const fields=()=>({email:$('#ae')?.value.trim()||'',password:$('#ap')?.value||''});
  const status=async()=>{const b=$('.account-btn');if(!b||!client)return;try{const {data}=await client.auth.getSession();const ok=!!data.session?.user;b.textContent=ok?'☁️ Συνδεδεμένη':'☁️ Σύνδεση';b.dataset.authState=ok?'signed-in':'signed-out';b.classList.toggle('connected',ok)}catch{b.textContent='☁️ Σύνδεση'}};
  const addForgot=()=>{const box=$('#auth .modal-actions');if(box&&!$('#auth [data-auth="forgot"]'))box.insertAdjacentHTML('afterend','<button type="button" class="link-button" data-auth="forgot">🔑 Ξέχασα τον κωδικό μου</button>')};
  async function act(mode){
    if(!client)return msg('❌ Δεν φορτώθηκε η σύνδεση. Κάνε ανανέωση.');
    const {email,password}=fields();
    if(!email)return msg('⚠️ Γράψε πρώτα το email σου.');
    if((mode==='login'||mode==='signup')&&password.length<6)return msg('⚠️ Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.');
    try{
      if(mode==='forgot'){
        msg('⏳ Στέλνω email…');
        const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:APP+'?password-reset=1'});
        if(error)throw error; return msg('✅ Έλεγξε το email σου για αλλαγή κωδικού.');
      }
      msg('⏳ Γίνεται σύνδεση…');
      let r;
      if(mode==='magic') r=await client.auth.signInWithOtp({email,options:{emailRedirectTo:APP,shouldCreateUser:true}});
      else if(mode==='signup') r=await client.auth.signUp({email,password,options:{emailRedirectTo:APP}});
      else r=await client.auth.signInWithPassword({email,password});
      if(r.error)throw r.error;
      if(mode==='magic')return msg('✅ Έλεγξε το email σου και πάτησε τον σύνδεσμο.');
      if(mode==='signup'&&!r.data.session)return msg('✅ Ο λογαριασμός δημιουργήθηκε. Έλεγξε το email σου.');
      if(r.data.session){msg('✅ Συνδέθηκες!');document.querySelector('#auth')?.remove();await status();window.dispatchEvent(new Event('nwceo-auth-updated'));if(typeof window.render==='function')window.render();}
    }catch(e){msg('❌ '+(e?.message||'Η σύνδεση απέτυχε.'));}
  }
  document.addEventListener('click',e=>{const b=e.target.closest?.('.account-btn');if(b){e.preventDefault();if(typeof window.openAuth==='function')window.openAuth();setTimeout(addForgot,0)}},true);
  document.addEventListener('click',e=>{const b=e.target.closest?.('[data-auth]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();act(b.dataset.auth)},true);
  new MutationObserver(addForgot).observe(document.body,{childList:true,subtree:true});
  client?.auth.onAuthStateChange(()=>setTimeout(status,50));
  window.addEventListener('focus',status);window.addEventListener('load',status);window.addEventListener('nwceo-auth-updated',status);
  status();
})();