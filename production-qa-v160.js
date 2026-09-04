(()=>{
'use strict';
const run=()=>{
  const menu=document.querySelector('#menu');
  if(menu){
    const b=menu.querySelector('button[data-v="calendar"]');
    if(b){b.textContent='📅 Ραντεβού';}
  }
  document.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el=>{
    if(el.dataset.qaLock==='true') return;
    if(el.type!=='checkbox'&&el.type!=='radio'){
      el.removeAttribute('readonly');
      el.removeAttribute('disabled');
    }
  });
  const norm=v=>String(v??'').trim().replace('.',':');
  const valid=v=>{const m=norm(v).match(/^(\d{1,2}):(\d{2})$/);if(!m)return '';const h=+m[1],mm=+m[2];return h<24&&mm<60?String(h).padStart(2,'0')+':'+m[2]:''};
  document.querySelectorAll('input[name="start_time"],input[name="end_time"],input[name="follow_up_time"],input[name="reminder_time"],input[type="time"]').forEach(i=>{
    if(i.dataset.qaTime==='true') return;
    i.dataset.qaTime='true';
    i.type='text'; i.inputMode='numeric'; i.maxLength=5; i.placeholder='00:00';
    const v=valid(i.value); if(v)i.value=v;
    i.addEventListener('input',()=>{let x=i.value.replace(/[^0-9:]/g,'');if(x.length===2&&!x.includes(':'))x+=':';i.value=x.slice(0,5)});
    i.addEventListener('blur',()=>{if(i.value&&!valid(i.value)){i.setCustomValidity('Χρησιμοποίησε 24ωρη μορφή, π.χ. 18:30');}else{i.value=valid(i.value);i.setCustomValidity('')}});
  });
  document.querySelectorAll('button,a').forEach(el=>{
    if(el.dataset.qaAgenda==='true')return;
    if(String(el.textContent||'').toLowerCase().includes('ενιαία ατζέντα')){
      el.dataset.qaAgenda='true';
      el.addEventListener('click',e=>{
        const nav=document.querySelector('#menu button[data-v="calendar"]');
        if(nav&&el!==nav){e.preventDefault();nav.click();}
      },true);
    }
  });
};
new MutationObserver(run).observe(document.body,{subtree:true,childList:true});
window.addEventListener('load',run);
run();
})();
