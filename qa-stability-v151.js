(()=>{
'use strict';
const run=()=>{
  const main=document.querySelector('main'); if(!main) return;
  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
  const time24=v=>{v=String(v||'').trim().replace('.',':');const m=v.match(/^(\d{1,2}):(\d{2})$/);if(!m)return '';const h=+m[1],n=+m[2];return h<24&&n<60?String(h).padStart(2,'0')+':'+m[2]:''};
  // 1. Navigation: keep Ραντεβού as the main folder and the agenda as its helper view.
  const menu=[...document.querySelectorAll('#menu button[data-v]')];
  let cal=menu.find(b=>b.dataset.v==='calendar');
  if(cal){cal.textContent='📅 Ραντεβού';cal.dataset.qa='appointments-nav';}
  // 2. Make dashboard KPI cards actually clickable.
  [...document.querySelectorAll('main .stats article')].forEach(a=>{
    if(a.dataset.qa)return;
    const t=norm(a.textContent).toLowerCase();
    const v=t.includes('πελάτες')?'clients':t.includes('συνεργάτες')?'partners':t.includes('καθαρό')?'finance':t.includes('σήμερα')?'calendar':'';
    if(v){a.dataset.qa='kpi';a.setAttribute('role','button');a.tabIndex=0;a.onclick=()=>{const b=document.querySelector(`#menu button[data-v="${v}"]`);if(b)b.click();};a.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();a.click();}}}
  });
  // 3. Never leave editable controls disabled/readonly by an old patch.
  document.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el=>{
    if(el.dataset.qa==='locked')return;
    if(el.type!=='checkbox' && el.type!=='radio'){el.removeAttribute('readonly');el.removeAttribute('disabled');}
  });
  // 4. All time fields use 24-hour text entry, consistently on every device.
  document.querySelectorAll('input[type="time"],input[name$="_time"],input[name="start_time"],input[name="end_time"]').forEach(i=>{
    if(i.dataset.qaTime)return;
    i.dataset.qaTime='1';i.type='text';i.inputMode='numeric';i.maxLength=5;i.placeholder='00:00';
    i.value=time24(i.value);
    i.addEventListener('input',()=>{let x=i.value.replace(/[^0-9:]/g,'');if(x.length===2&&!x.includes(':'))x+=':';i.value=x.slice(0,5);});
    i.addEventListener('blur',()=>{if(i.value&&!time24(i.value)){i.setCustomValidity('Χρησιμοποίησε 24ωρη ώρα, π.χ. 18:30');}else{i.value=time24(i.value);i.setCustomValidity('');}});
  });
  // 5. Remove duplicate action buttons inside the same record/card.
  document.querySelectorAll('main .rowcard, main .card').forEach(box=>{
    const seen=new Set();
    [...box.querySelectorAll('button')].forEach(b=>{
      const t=norm(b.textContent).toLowerCase();
      if(!t)return;
      if(/επεξεργασία|διαγραφή/.test(t)){
        if(seen.has(t))b.remove();else seen.add(t);
      }
    });
  });
  // 6. Make the agenda helper button always route to the live calendar view.
  document.querySelectorAll('button,a').forEach(b=>{
    if(b.dataset.qaAgenda)return;
    const t=norm(b.textContent).toLowerCase();
    if(t.includes('ενιαία ατζέντα')){
      b.dataset.qaAgenda='1';
      b.addEventListener('click',e=>{
        const nav=document.querySelector('#menu button[data-v="calendar"]');
        if(nav && nav!==b){e.preventDefault();nav.click();}
      },true);
    }
  });
  // 7. Ensure forms have a usable submit action and visible save button.
  document.querySelectorAll('form').forEach(f=>{
    if(f.dataset.qaForm)return;
    f.dataset.qaForm='1';
    const hasSubmit=f.querySelector('button[type="submit"],button:not([type])');
    if(!hasSubmit){const b=document.createElement('button');b.type='submit';b.className='primary';b.textContent='💾 Αποθήκευση';f.appendChild(b);}
    f.querySelectorAll('button').forEach(b=>{if(norm(b.textContent).toLowerCase().includes('αποθήκευση')){b.removeAttribute('disabled');b.removeAttribute('readonly');}});
  });
};
new MutationObserver(()=>run()).observe(document.body,{childList:true,subtree:true});
run();
})();
