(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const db=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  if(!db)return;
  let last='';
  async function paint(){
    const b=document.querySelector('.account-btn'); if(!b)return;
    let logged=false,email='';
    try{const s=await db.auth.getSession();if(s?.data?.session?.user){logged=true;email=s.data.session.user.email||'';}}catch(e){}
    const text=logged?'☁️ Συνδεδεμένη':'☁️ Σύνδεση';
    if(last===text && b.textContent.trim()===text)return;
    last=text;b.textContent=text;b.classList.toggle('connected',logged);b.title=logged?(email||'Συνδεδεμένη'):'';b.setAttribute('aria-label',text);
  }
  db.auth.onAuthStateChange(()=>setTimeout(paint,50));
  new MutationObserver(()=>setTimeout(paint,0)).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('focus',paint);window.addEventListener('pageshow',paint);
  const watch=()=>{paint();setTimeout(watch,1000)};watch();
})();