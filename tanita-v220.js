(()=>{
'use strict';
if(window.__NWCEO_TANITA220)return;window.__NWCEO_TANITA220=1;
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCxH_Gk';
const sb=window.__NWCEO_DB||window.supabase?.createClient(URL,KEY);if(!sb)return;
const F=[['weight','Βάρος','kg'],['body_fat','Λίπος %','%'],['muscle_mass','Μυϊκή μάζα','kg'],['water_percent','Νερό %','%'],['bone_mass','Οστική μάζα','kg'],['visceral_fat','Σπλαχνικό λίπος',''],['calories','Θερμίδες','kcal'],['metabolic_age','Μεταβολική ηλικία',''],['fitness_score','Fitness score','']];
const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(/\s+/g,' ').toLowerCase();
const time=v=>String(v||'').slice(0,5),today=()=>new Date().toISOString().slice(0,10),nowTime=()=>new Date().toTimeString().slice(0,5);
const standalone=()=>{if(location.hash.startsWith('#client/'))return false;const h=(document.querySelector('main h1')?.textContent||'').toLowerCase();return h.includes('tanita')||h.includes('μετρήσεις')||h.includes('measurements')};
async function user(){return(await sb.auth.getUser()).data?.user||null}
async function clients(){const u=await user();if(!u)return[];const r=await sb.from('clients').select('id,name').eq('user_id',u.id).order('name');return r.error?[]:(r.data||[])}
async function rows(){const u=await user();if(!u)return[];const r=await sb.from('tanita_measurements').select('*').eq('user_id',u.id).order('created_at',{ascending:false});return r.error?[]:(r.data||[])}
const css=document.createElement('style');css.textContent=`.nw220-modal{position:fixed;inset:0;z-index:4000000;background:#0008;display:grid;place-items:center;padding:14px}.nw220-box{width:min(760px,96vw);max-height:94vh;overflow:auto;background:#fff;border-radius:20px;padding:20px;box-shadow:0 22px 80px #0008}.nw220-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.nw220-head h2{margin:0;color:#245b2b}.nw220-form{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:15px}.nw220-field{display:flex;flex-direction:column;gap:5px;font-weight:800;color:#344054}.nw220-full{grid-column:1/-1}.nw220-field input,.nw220-field select,.nw220-field textarea{width:100%;box-sizing:border-box;padding:11px;border:1px solid #cbd5cb;border-radius:10px;font:inherit;color:#182018;background:#fff;pointer-events:auto!important;user-select:text!important;caret-color:#245b2b}.nw220-field select{min-height:46px}.nw220-field textarea{min-height:90px}.nw220-hint{font-size:11px;color:#667085;font-weight:500}.nw220-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:8px}.nw220-btn{border:1px solid #d5ddd5;background:#fff;border-radius:10px;padding:10px 13px;font:inherit;font-weight:800;color:#245b2b;cursor:pointer}.nw220-primary{background:#245b2b;color:#fff;border-color:#245b2b}.nw220-error{grid-column:1/-1;background:#fff3f3;border:1px solid #eccaca;color:#a40000;padding:10px;border-radius:10px;font-weight:700}.nw220-status{grid-column:1/-1;background:#f4f8f4;border:1px solid #dce7dc;color:#245b2b;padding:9px;border-radius:10px;font-weight:700}@media(max-width:700px){.nw220-form{grid-template-columns:1fr}.nw220-full,.nw220-actions,.nw220-error,.nw220-status{grid-column:1}}`;
document.head.appendChild(css);
function openEditor(existing,clientsList){
 const m=document.createElement('div');m.className='nw220-modal';
 const opts=clientsList.map(c=>`<option value="${esc(c.id)}" ${existing?.client_id===c.id?'selected':''}>${esc(c.name)}</option>`).join('');
 m.innerHTML=`<div class="nw220-box"><div class="nw220-head"><h2>${existing?'✏️ Επεξεργασία Tanita':'⚖️ Νέα εγγραφή · Tanita'}</h2><button class="nw220-btn" type="button" data-close>×</button></div><form class="nw220-form"><label class="nw220-field nw220-full">Πελάτης *<select name="client_id"><option value="">— επίλεξε πελάτη —</option>${opts}</select><span class="nw220-hint">Το όνομα εμφανίζεται από τον φάκελο Πελάτες. Η μέτρηση αποθηκεύεται με το πραγματικό ID του πελάτη.</span></label><label class="nw220-field">Ημερομηνία μέτρησης *<input name="measurement_date" type="date" value="${esc(existing?.measurement_date||today())}"></label><label class="nw220-field">Ώρα μέτρησης<input name="measurement_time" type="text" inputmode="numeric" placeholder="HH:MM" maxlength="5" value="${esc(time(existing?.measurement_time)||nowTime())}"><span class="nw220-hint">24ωρη μορφή, π.χ. 14:05</span></label>${F.map(([k,l,u])=>`<label class="nw220-field">${l}${u?' ('+u+')':''}<input name="${k}" type="number" step="any" value="${esc(existing?.[k]??'')}"></label>`).join('')}<label class="nw220-field nw220-full">Σημειώσεις<textarea name="notes">${esc(existing?.notes||'')}</textarea></label><div class="nw220-actions"><button class="nw220-btn" type="button" data-close>Άκυρο</button><button class="nw220-btn nw220-primary" type="submit">Αποθήκευση</button></div></form></div>`;
 document.body.appendChild(m);
 m.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>m.remove());
 const ti=m.querySelector('[name=measurement_time]');
 ti.oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+':'+v.slice(2);e.target.value=v};
 m.querySelector('form').onsubmit=async e=>{
  e.preventDefault();e.stopImmediatePropagation();
  const f=e.currentTarget,u=await user(),errs=[];
  if(!u)return;
  if(!f.client_id.value)errs.push('Πρέπει να επιλέξεις πελάτη.');
  if(!f.measurement_date.value)errs.push('Η ημερομηνία μέτρησης είναι υποχρεωτική.');
  if(f.measurement_time.value&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(f.measurement_time.value))errs.push('Η ώρα πρέπει να είναι HH:MM.');
  if(errs.length){m.querySelector('.nw220-error')?.remove();f.insertAdjacentHTML('afterbegin',`<div class="nw220-error">${errs.map(esc).join('<br>')}</div>`);return}
  const p={user_id:u.id,client_id:f.client_id.value,measurement_date:f.measurement_date.value,measurement_time:f.measurement_time.value||null,notes:f.notes.value||null};
  F.forEach(([k])=>p[k]=f[k].value===''?null:Number(f[k].value));
  const r=existing?await sb.from('tanita_measurements').update(p).eq('id',existing.id).eq('user_id',u.id):await sb.from('tanita_measurements').insert(p);
  if(r.error){m.querySelector('.nw220-error')?.remove();f.insertAdjacentHTML('afterbegin',`<div class="nw220-error">Δεν αποθηκεύτηκε: ${esc(r.error.message)}</div>`);return}
  m.querySelector('.nw220-error')?.remove();f.insertAdjacentHTML('afterbegin','<div class="nw220-status">✓ Αποθηκεύτηκε σωστά με τον σωστό πελάτη.</div>');
  setTimeout(()=>{m.remove();location.reload()},350);
 };
}
async function intercept(e){
 if(!standalone())return;
 const t=e.target;
 const isNew=t.closest?.('.crud-new');
 const editBtn=t.closest?.('.crud-actions button:first-child');
 if(!isNew&&!editBtn)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const [list,data]=await Promise.all([clients(),rows()]);
 if(isNew){openEditor(null,list);return}
 const card=editBtn.closest('.rowcard');
 const cards=[...document.querySelectorAll('main .rowcard')].filter(x=>x.querySelector('.crud-actions'));
 const idx=cards.indexOf(card);const row=data[idx]||null;
 if(row)openEditor(row,list);else alert('Δεν εντοπίστηκε η μέτρηση Tanita.');
}
document.addEventListener('click',intercept,true);
})();
