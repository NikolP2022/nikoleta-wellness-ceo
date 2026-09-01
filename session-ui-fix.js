(()=>{
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const c=window.supabase?.createClient?.(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
function localSignedIn(){try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(!k.includes('auth-token'))continue;const raw=localStorage.getItem(k);if(!raw)continue;const x=JSON.parse(raw);if(x?.access_token&&x?.user?.id)return true;if(x?.currentSession?.access_token&&x?.currentSession?.user?.id)return true}}catch{}return false}
async function paint(){const b=document.querySelector('.account-btn');if(!b)return;let yes=localSignedIn();try{if(c){const r=await c.auth.getSession();yes=!!r?.data?.session?.user||yes}}catch{}b.textContent=yes?'☁️ Συνδεδεμένη':'☁️ Σύνδεση';b.dataset.authState=yes?'signed-in':'signed-out';b.classList.toggle('connected',yes)}
function watch(){paint();setTimeout(paint,300);setTimeout(paint,1000);setTimeout(paint,2500)}
window.addEventListener('load',watch);window.addEventListener('pageshow',watch);window.addEventListener('focus',watch);document.addEventListener('visibilitychange',watch);window.addEventListener('storage',paint);setInterval(paint,1500);c?.auth.onAuthStateChange(()=>setTimeout(paint,50));
})();
