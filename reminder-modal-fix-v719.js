(()=>{'use strict';
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';let sb;const client=()=>sb||(sb=window.supabase.createClient(URL,KEY));
const pad=n=>String(n).padStart(2,'0');
const parts=v=>{const p=String(v||'').trim().slice(0,5).split(':');return [Math.max(0,Math.min(23,parseInt(p[0],10)||0)),Math.max(0,Math.min(59,parseInt(p[1],10)||0))]};
const norm=v=>{const [h,m]=parts(v);return pad(h)+':'+pad(m)};
function isReminder(m){const t=(m.textContent||'').toLowerCase();return t.includes('αποθήκευση υπενθύμισης')&&t.includes('πόσα λεπτά πριν')}
function getDate(m){const d=m.querySelector('input[type="date"]')?.value;if(d)return d;const x=(m.textContent||'').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);return x?x[3]+'-'+pad(x[2])+'-'+pad(x[1]):''}
function getName(m){const t=(m.textContent||'').replace(/\s+/g,' ').trim();const x=t.match(/Υπενθύμιση\s*×?\s*(.*?)\s+Ημερομηνία/i);return x?.[1]?.trim()||''}
function cleanup(m){
 m.querySelectorAll('[data-reminder-single24]').forEach(x=>x.remove());
 m.querySelectorAll('[data-reminder-time-box]').forEach(x=>x.remove());
 const times=[...m.querySelectorAll('input[type="time"]')];if(!times.length)return null;
 const first=times[0];times.slice(1).forEach(x=>{const l=x.closest('label');if(l)l.remove();else x.remove()});
 return first;
}
function makeOne(m,old){if(!old)return null;if(old.dataset.single24==='1')return old;const input=document.createElement('input');input.type='text';input.inputMode='numeric';input.autocomplete='off';input.maxLength=5;input.placeholder='HH:MM';input.value=norm(old.value||old.getAttribute('value')||'00:00');input.dataset.single24='1';input.dataset.reminderSingle24='1';input.setAttribute('aria-label','Ώρα 24 ωρών');input.style.cssText='display:block;width:100%;box-sizing:border-box;padding:13px;margin-top:6px;border:2px solid #245b2b;border-radius:10px;font-size:22px;font-weight:800;background:#fff;color:#111;text-align:center;letter-spacing:1px';
 const sync=()=>{let v=input.value.replace(/[^0-9:]/g,'');if(v.length===4&&!v.includes(':'))v=v.slice(0,2)+':'+v.slice(2);input.value=norm(v);old.value=input.value;old.setAttribute('value',input.value);old.dispatchEvent(new Event('input',{bubbles:true}));old.dispatchEvent(new Event('change',{bubbles:true}))};
 input.addEventListener('input',()=>{input.value=input.value.replace(/[^0-9:]/g,'').slice(0,5)});input.addEventListener('blur',sync);input.addEventListener('change',sync);old.style.display='none';old.setAttribute('aria-hidden','true');old.parentElement.appendChild(input);return input}
async function findRow(m){const date=getDate(m);if(!date)return null;const name=getName(m).toLowerCase();const r=await client().from('appointments').select('id,client_name,appointment_date,start_time,reminder_minutes,created_at').eq('appointment_date',date).order('created_at',{ascending:false}).limit(50);if(r.error||!r.data?.length)return null;if(name){const exact=r.data.find(x=>String(x.client_name||'').trim().toLowerCase()===name);if(exact)return exact;const part=r.data.find(x=>String(x.client_name||'').toLowerCase().includes(name)||name.includes(String(x.client_name||'').toLowerCase()));if(part)return part}return r.data[0]}
async function load(m,input){try{const row=await findRow(m);if(!row)return;m.dataset.appointmentId=row.id;if(row.start_time)input.value=norm(row.start_time);const num=m.querySelector('input[type="number"]');if(num&&row.reminder_minutes!=null){num.value=String(row.reminder_minutes);num.setAttribute('value',num.value)}}catch(e){console.warn('Reminder load',e)}}
function bind(m){if(!isReminder(m))return;const old=cleanup(m);if(!old)return;const input=makeOne(m,old);if(!input)return;if(m.dataset.reminderFinalBound==='1'){load(m,input);return}m.dataset.reminderFinalBound='1';const save=[...m.querySelectorAll('button')].find(b=>/αποθήκευση υπενθύμισης/i.test(b.textContent||''));if(save)save.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const id=m.dataset.appointmentId;if(!id)return;const num=m.querySelector('input[type="number"]');const time=norm(input.value);input.value=time;const r=await client().from('appointments').update({start_time:time,reminder_minutes:Number(num?.value||0)}).eq('id',id);if(r.error)console.error('Reminder save',r.error)},true);load(m,input)}
function scan(){document.querySelectorAll('.modal,#appt613').forEach(m=>{if(isReminder(m))bind(m)})}new MutationObserver(scan).observe(document.documentElement,{subtree:true,childList:true});scan();setInterval(scan,300);
})();
