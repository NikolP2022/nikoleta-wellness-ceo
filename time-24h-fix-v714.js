(()=>{'use strict';
function pad(n){return String(n).padStart(2,'0')}
function enhance(input){
  if(!input||input.dataset.time24Fixed==='1')return;
  const wrap=input.parentElement;if(!wrap)return;
  const initial=(input.value||'').slice(0,5);const [ih,im]=initial.split(':');
  const box=document.createElement('span');box.style.cssText='display:flex!important;gap:8px!important;width:100%!important;box-sizing:border-box!important;margin-top:6px!important';
  const h=document.createElement('select'),m=document.createElement('select');
  h.setAttribute('aria-label','Ώρα 24 ωρών');m.setAttribute('aria-label','Λεπτά');
  for(let i=0;i<24;i++){const o=document.createElement('option');o.value=pad(i);o.textContent=pad(i);if(o.value===(ih||'00'))o.selected=true;h.appendChild(o)}
  for(let i=0;i<60;i++){const o=document.createElement('option');o.value=pad(i);o.textContent=pad(i);if(o.value===(im||'00'))o.selected=true;m.appendChild(o)}
  [h,m].forEach(s=>s.style.cssText='flex:1!important;min-width:0!important;box-sizing:border-box!important;padding:12px!important;border:2px solid #777!important;border-radius:10px!important;background:#fff!important;color:#111!important;font-size:22px!important;font-weight:800!important;min-height:54px!important');
  const sync=()=>{input.value=h.value+':'+m.value;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}))};
  input.style.display='none';input.dataset.time24Fixed='1';wrap.appendChild(box);box.append(h,m);sync();
}
function scan(){document.querySelectorAll('input[type="time"]').forEach(enhance)}
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();setInterval(scan,1000);
})();
