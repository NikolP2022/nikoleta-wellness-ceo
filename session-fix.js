(()=>{
  const badge=()=>document.querySelector('.sync-badge');
  const account=()=>document.querySelector('.account-btn');
  const set=(text,cls='')=>{const b=badge();if(b){b.className='sync-badge '+cls;b.textContent=text}};
  const markOnline=()=>{try{window.dispatchEvent(new Event('online'))}catch(e){}};
  const run=async()=>{
    const c=window.supabase?.createClient?.('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk',{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    if(!c)return;
    const check=async()=>{
      try{
        const {data}=await c.auth.getSession();
        if(data?.session?.user){
          markOnline();
          const a=account();if(a)a.textContent='☁️ Συνδεδεμένη';
          set('↻ Έλεγχος σύνδεσης…','sync');
          setTimeout(()=>{try{if(typeof window.sync==='function')window.sync()}catch(e){}},200);
        }else{
          const a=account();if(a)a.textContent='☁️ Σύνδεση';
          set('🔐 Απαιτείται σύνδεση','offline');
          setTimeout(()=>{try{if(typeof window.openAuth==='function'&&!document.querySelector('#auth'))window.openAuth()}catch(e){}},500);
        }
      }catch(e){set('🔐 Απαιτείται σύνδεση','offline')}
    };
    c.auth.onAuthStateChange((_event,session)=>{
      if(session?.user){markOnline();const a=account();if(a)a.textContent='☁️ Συνδεδεμένη';setTimeout(()=>{try{if(typeof window.sync==='function')window.sync()}catch(e){}},250)}
      else {const a=account();if(a)a.textContent='☁️ Σύνδεση';set('🔐 Απαιτείται σύνδεση','offline')}
    });
    check();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
