(()=>{'use strict';
function pad(n){return String(n).padStart(2,'0')}
function makeTimeSelect(input){
  if(!input||input.dataset.mobileTimeFixed)return;
  const wrap=input.parentElement; if(!wrap)return;
  const value=(input.value||'').slice(0,5); const [vh,vm]=value.split(':');
  const box=document.createElement('div'); box.style.cssText='display:flex;gap:10px;width:100%;margin-top:6px';
  const h=document.createElement('select'), m=document.createElement('select');
  h.name=input.name+'Hour'; m.name=input.name+'Minute'; h.setAttribute('aria-label','Ώρα');m.setAttribute('aria-label','Λεπτά');
  for(let i=0;i<24;i++){const o=document.createElement('option');o.value=pad(i);o.textContent=pad(i);if(pad(i)===vh)o.selected=true;h.appendChild(o)}
  for(let i=0;i<60;i++){const o=document.createElement('option');o.value=pad(i);o.textContent=pad(i);if(pad(i)===(vm||'00'))o.selected=true;m.appendChild(o)}
  [h,m].forEach(s=>s.style.cssText='flex:1;min-width:0;box-sizing:border-box;padding:15px;border:1px solid #bbb;border-radius:10px;background:#fff;color:#111;font-size:24px;font-weight:700;min-height:58px');
  const sync=()=>{input.value=h.value+':'+m.value;input.dispatchEvent(new Event('input',{bubbles:true}));};h.onchange=sync;m.onchange=sync;
  input.style.display='none'; input.dataset.mobileTimeFixed='1'; wrap.appendChild(box); sync();
}
function fix(){const modal=document.getElementById('appt613');if(!modal)return;
  const name=modal.querySelector('input[name="name"]');
  if(name){name.removeAttribute('readonly');name.removeAttribute('disabled');name.style.cssText='display:block;width:100%;box-sizing:border-box;padding:16px;margin-top:8px;border:2px solid #777;border-radius:12px;font-size:28px!important;background:#fff;color:#111;min-height:62px;pointer-events:auto;touch-action:manipulation';}
  makeTimeSelect(modal.querySelector('input[name="start"]'));makeTimeSelect(modal.querySelector('input[name="end"]'));
}
new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});setInterval(fix,500);
})();
