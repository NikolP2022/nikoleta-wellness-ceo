(()=>{
'use strict';
const SUPA_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPA_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(SUPA_URL,SUPA_KEY);
if(!sb)return;
const pad=n=>String(n).padStart(2,'0');
function enhanceTime(input){
  if(!input||input.dataset.v137==='1'||input.type!=='time')return;
  const name=input.name;
  const value=String(input.value||'').slice(0,5);
  input.dataset.v137='1';
  const wrap=document.createElement('div');
  wrap.className='time24-picker v137-time';
  const h=document.createElement('select');h.name='__v137_hour';h.setAttribute('aria-label','Ώρα');
  const m=document.createElement('select');m.name='__v137_minute';m.setAttribute('aria-label','Λεπτά');
  h.innerHTML='<option value="">Ώρα</option>'+Array.from({length:24},(_,i)=>`<option value="${pad(i)}">${pad(i)}</option>`).join('');
  m.innerHTML='<option value="">Λεπτά</option>'+Array.from({length:60},(_,i)=>`<option value="${pad(i)}">${pad(i)}</option>`).join('');
  const hidden=document.createElement('input');hidden.type='hidden';hidden.name=name;hidden.value=value;
  if(/^\d{2}:\d{2}$/.test(value)){h.value=value.slice(0,2);m.value=value.slice(3,5)}
  const sync=()=>hidden.value=h.value&&m.value?`${h.value}:${m.value}`:'';
  h.addEventListener('change',sync);m.addEventListener('change',sync);
  const sep=document.createElement('span');sep.className='time24-sep';sep.textContent=':';
  wrap.append(h,sep,m,hidden);input.replaceWith(wrap);
}
function enhance(root=document){root.querySelectorAll('input[type="time"]').forEach(enhanceTime)}
function fixFollowupStatus(root=document){
  root.querySelectorAll('.crud-modal').forEach(modal=>{
    const heading=modal.querySelector('.crud-head h2')?.textContent||'';
    if(!heading.includes('Follow-ups'))return;
    const s=modal.querySelector('input[name="status"]');
    if(s&&s.value==='active'){s.value='';s.placeholder='Γράψε την κατάσταση';}
  });
}
async function loginBadge(){
  const {data}=await sb.auth.getSession();
  const connected=!!data?.session?.user;
  document.querySelectorAll('header').forEach(header=>{
    let b=header.querySelector('#v137-login-state');
    if(!b){b=document.createElement('span');b.id='v137-login-state';header.querySelector('div')?.appendChild(b)}
    b.textContent=connected?'🟢 Συνδεδεμένη':'🔴 Δεν είσαι συνδεδεμένη';
    b.title=connected?(data.session.user.email||'Συνδεδεμένη'):'Δεν υπάρχει ενεργή σύνδεση';
  });
  const account=document.querySelector('#login');
  if(account)account.textContent=connected?'☁️ Λογαριασμός · 🟢 Συνδεδεμένη':'☁️ Λογαριασμός · 🔴 Σύνδεση';
}
function css(){
 if(document.getElementById('v137-css'))return;
 const s=document.createElement('style');s.id='v137-css';s.textContent=`#v137-login-state{display:block;font-size:12px;font-weight:800;margin-top:3px;letter-spacing:.01em}.v137-time{display:grid!important;grid-template-columns:1fr auto 1fr;gap:7px;align-items:center;width:100%}.v137-time select{width:100%;min-height:44px;padding:10px 11px;border:1px solid #d6d4c8;border-radius:13px;background:#fffefa;color:#24352a;font-weight:700;font-size:16px}.v137-time .time24-sep{font-size:20px;font-weight:900;color:#245b2b}`;document.head.appendChild(s)
}
css();
enhance();fixFollowupStatus();loginBadge();
const obs=new MutationObserver(muts=>{for(const mu of muts){for(const n of mu.addedNodes){if(n.nodeType===1){enhance(n);fixFollowupStatus(n)}}}loginBadge()});
obs.observe(document.documentElement,{childList:true,subtree:true});
sb.auth.onAuthStateChange(()=>setTimeout(loginBadge,0));
setInterval(()=>{enhance();fixFollowupStatus();loginBadge()},500);
})();