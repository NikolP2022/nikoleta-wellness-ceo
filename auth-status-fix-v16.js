(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const db=window.supabase?.createClient?.(URL,KEY);
  if(!db)return;
  let current=null;
  const paint=()=>{
    const b=document.querySelector('.account-btn');
    if(!b)return;
    if(current){
      b.textContent='☁️ Συνδεδεμένη';
      b.classList.add('connected');
      b.title=current.email||'Συνδεδεμένη';
      b.setAttribute('aria-label','Συνδεδεμένη');
    }else{
      b.textContent='☁️ Σύνδεση';
      b.classList.remove('connected');
      b.removeAttribute('title');
      b.setAttribute('aria-label','Σύνδεση');
    }
  };
  const load=async()=>{
    try{const r=await db.auth.getSession();current=r.data?.session?.user||null;paint()}catch(e){paint()}
  };
  load();
  db.auth.onAuthStateChange((event,session)=>{
    current=session?.user||null;
    setTimeout(paint,0);
  });
  new MutationObserver(paint).observe(document.body,{childList:true,subtree:true});
  window.addEventListener('focus',load);
})();
