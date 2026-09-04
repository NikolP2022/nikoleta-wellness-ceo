(()=>{
'use strict';
const pad=n=>String(n).padStart(2,'0');
const norm=v=>{v=String(v||'').replace(/[^0-9]/g,'').slice(0,4);if(v.length===4){let h=Math.min(23,Number(v.slice(0,2)));let m=Math.min(59,Number(v.slice(2,4)));return `${pad(h)}:${pad(m)}`}return ''};
function enhanceTimeInput(input){
  if(!input||input.dataset.timeEnhanced==='1')return;
  input.dataset.timeEnhanced='1';
  const name=input.name, initial=(input.value||'').slice(0,5);
  const wrap=document.createElement('div'); wrap.className='time24-picker';
  const hour=document.createElement('select'); hour.className='time24-hour'; hour.setAttribute('aria-label','Ώρα');
  const minute=document.createElement('select'); minute.className='time24-minute'; minute.setAttribute('aria-label','Λεπτά');
  hour.innerHTML='<option value="">HH</option>'+Array.from({length:24},(_,i)=>`<option value="${pad(i)}">${pad(i)}</option>`).join('');
  minute.innerHTML='<option value="">MM</option>'+Array.from({length:60},(_,i)=>`<option value="${pad(i)}">${pad(i)}</option>`).join('');
  const sep=document.createElement('span'); sep.textContent=':'; sep.className='time24-sep';
  const hidden=document.createElement('input'); hidden.type='hidden'; hidden.name=name; hidden.value=initial;
  if(initial){hour.value=initial.slice(0,2);minute.value=initial.slice(3,5)}
  const sync=()=>{hidden.value=(hour.value&&minute.value)?`${hour.value}:${minute.value}`:''};
  hour.addEventListener('change',sync);minute.addEventListener('change',sync);
  wrap.append(hour,sep,minute,hidden);input.replaceWith(wrap);
}
function enhanceTimes(root=document){root.querySelectorAll('input[type="time"]').forEach(enhanceTimeInput)}
function professionalize(){
  document.querySelectorAll('main section').forEach(s=>s.classList.add('professional-folder'));
  document.querySelectorAll('.rowcard').forEach((r,i)=>{r.classList.add('professional-row');r.style.setProperty('--row-index',i)});
  document.querySelectorAll('.pagehead').forEach(h=>h.classList.add('professional-pagehead'));
  enhanceTimes(document);
}
const obs=new MutationObserver(m=>{for(const x of m)for(const n of x.addedNodes)if(n.nodeType===1){enhanceTimes(n);professionalize()}});
obs.observe(document.documentElement,{childList:true,subtree:true});
const style=document.createElement('style');
style.textContent=`
:root{--pro-green:#214f2a;--pro-gold:#b99b55;--pro-line:#ded8c8;--pro-paper:#fffdf8}
.professional-folder{animation:proIn .18s ease-out}.professional-pagehead{padding-bottom:14px;border-bottom:1px solid var(--pro-line)}
.professional-pagehead h1{letter-spacing:-.02em}.professional-row{position:relative;overflow:hidden;border-radius:18px!important;border:1px solid var(--pro-line)!important;background:linear-gradient(135deg,#fffdf8,#fbfaf4)!important;transition:transform .16s,box-shadow .16s,border-color .16s!important}
.professional-row:before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--pro-gold);opacity:.8}.professional-row:hover{transform:translateY(-1px);box-shadow:0 10px 25px rgba(40,58,42,.10)!important;border-color:#cfc5aa!important}
.time24-picker{display:grid;grid-template-columns:1fr auto 1fr;gap:7px;align-items:center;width:100%}.time24-picker select{width:100%;min-height:44px;padding:10px 11px;border:1px solid #d6d4c8;border-radius:13px;background:#fffefa;color:#24352a;font-weight:700;appearance:auto}.time24-sep{font-size:20px;font-weight:900;color:#245b2b}
@keyframes proIn{from{opacity:.55;transform:translateY(3px)}to{opacity:1;transform:none}}
@media(max-width:560px){.time24-picker{grid-template-columns:1fr auto 1fr;max-width:240px}.time24-picker select{font-size:16px}.professional-row{padding:15px 14px!important}}
`;
document.head.appendChild(style);
window.addEventListener('load',professionalize);
})();
