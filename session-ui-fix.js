(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const c=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  async function paint(){
    const b=document.querySelector('.account-btn'); if(!b||!c)return;
    try{const {data}=await c.auth.getSession(); const yes=!!data?.session?.user;
      b.textContent=yes?'☁️ Συνδεδεμένη':'☁️ Σύνδεση'; b.dataset.authState=yes?'signed-in':'signed-out'; b.classList.toggle('connected',yes);
    }catch{}
  }
  c?.auth.onAuthStateChange(()=>setTimeout(paint,0));
  window.addEventListener('load',paint); window.addEventListener('pageshow',paint); window.addEventListener('focus',paint); document.addEventListener('visibilitychange',paint);
  setTimeout(paint,100); setTimeout(paint,1000); setInterval(paint,2000);
})();
