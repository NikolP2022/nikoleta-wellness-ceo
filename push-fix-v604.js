(()=>{'use strict';
const SUPABASE_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPABASE_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const originalFetch=window.fetch.bind(window);
window.fetch=async function(input,init={}){
  const url=typeof input==='string'?input:(input&&input.url)||'';
  if(url.startsWith(SUPABASE_URL+'/functions/v1/register-push')){
    const headers=new Headers(init.headers||{});
    if(!headers.has('apikey')) headers.set('apikey',SUPABASE_KEY);
    if(!headers.has('Content-Type') && init.body) headers.set('Content-Type','application/json');
    init={...init,headers};
  }
  return originalFetch(input,init);
};
})();
