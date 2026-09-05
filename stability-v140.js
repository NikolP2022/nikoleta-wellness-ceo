(()=>{
'use strict';
const pad=n=>String(n).padStart(2,'0');
function addAgendaFolder(){
  const menu=document.querySelector('#menu'); if(!menu||menu.dataset.v140==='1')return;
  const cal=menu.querySelector('button[data-v="calendar"]'); if(!cal)return;
  menu.dataset.v140='1';
  const folder=document.createElement('div'); folder.className='v140-folder';
  const title=document.createElement('button'); title.type='button'; title.className='v140-folder-title'; title.textContent='📁 Ραντεβού';
  const sub=document.createElement('div'); sub.className='v140-folder-sub';
  const agenda=document.createElement('button'); agenda.type='button'; agenda.dataset.v='calendar'; agenda.textContent='📅 Ενιαία Ατζέντα';
  sub.appendChild(agenda); folder.append(title,sub); cal.replaceWith(folder);
  title.addEventListener('click',()=>folder.classList.toggle('open'));
}
function clickableStats(){
  document.querySelectorAll('.stats article').forEach((a,i)=>{
    if(a.dataset.v140==='1')return; a.dataset.v140='1'; a.classList.add('v140-click');
    const target=['calendar','clients','partners','finance'][i]; if(!target)return;
    a.addEventListener('click',()=>{const b=document.querySelector(`#menu [data-v="${target}"]`); if(b)b.click();});
    a.setAttribute('role','button'); a.tabIndex=0;
    a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();a.click();}});
  });
}
function loginBadge(){
  try{
    const client=window.supabase?.createClient?.('https://vbkuvexyqehmpeeejqbh.supabase.co','sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk');
    if(!client)return;
    client.auth.getSession().then(({data})=>{
      const connected=!!data?.session?.user;
      document.querySelectorAll('header').forEach(h=>{
        let b=h.querySelector('#v140-login-state');
        if(!b){b=document.createElement('small');b.id='v140-login-state';h.querySelector('div')?.appendChild(b)}
        b.textContent=connected?'🟢 Συνδεδεμένη':'🔴 Δεν είσαι συνδεδεμένη';
      });
    }).catch(()=>{});
  }catch(_){ }
}
function style(){
  if(document.getElementById('v140-css'))return;
  const s=document.createElement('style'); s.id='v140-css'; s.textContent=`
    .v140-folder-title{width:100%;text-align:left;border:0;background:none;padding:13px;border-radius:10px;font-weight:800;color:inherit}
    .v140-folder-sub{display:none;padding-left:14px}.v140-folder.open .v140-folder-sub{display:block}
    .v140-folder-sub button{width:100%;text-align:left;border:0;background:none;padding:11px;border-radius:10px;color:inherit}
    .v140-click{cursor:pointer}.v140-click:focus{outline:2px solid #b99b55;outline-offset:2px}
    #v140-login-state{display:block;margin-top:3px;font-size:12px;font-weight:800}
  `; document.head.appendChild(s);
}
function run(){style();addAgendaFolder();clickableStats();loginBadge();}
run();
const obs=new MutationObserver(()=>run()); obs.observe(document.documentElement,{childList:true,subtree:true});
})();
