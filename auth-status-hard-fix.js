(()=>{
  const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
  const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
  const button=()=>document.querySelector('.account-btn');
  const client=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  async function update(){
    const b=button(); if(!b)return;
    let signed=false;
    try{const r=await client?.auth.getSession(); signed=!!r?.data?.session?.user}catch(e){}
    if(!signed){
      try{const raw=localStorage.getItem('sb-vbkuvexyqehmpeeejqbh-auth-token'); signed=!!JSON.parse(raw||'null')?.access_token}catch(e){}
    }
    b.textContent=signed?'☁️ Συνδεδεμένη':'☁️ Σύνδεση';
    b.classList.toggle('connected',signed);
    b.dataset.authState=signed?'signed-in':'signed-out';
  }
  window.addEventListener('load',update);
  window.addEventListener('focus',update);
  document.addEventListener('visibilitychange',update);
  client?.auth.onAuthStateChange(()=>setTimeout(update,100));
  setInterval(update,500);
  update();
})();