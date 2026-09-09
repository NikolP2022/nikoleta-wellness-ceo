(()=>{
'use strict';
if(window.__NWCEO_TANITA217)return;window.__NWCEO_TANITA217=1;
const URL='https://vbkuvexyqehmpeeejqbh.supabase.co',KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCxH_Gk';
const sb=window.__NWCEO_DB||window.supabase?.createClient(URL,KEY);if(!sb)return;
const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
const cid=()=>location.hash.startsWith('#client/')?decodeURIComponent(location.hash.slice(8).split('/')[0]):'';
const active=()=>location.hash.startsWith('#client/')&&decodeURIComponent(location.hash.slice(8).split('/')[1]||'')==='tanita';
const today=()=>new Date().toISOString().slice(0,10),nowTime=()=>new Date().toTimeString().slice(0,5),time=v=>String(v||'').slice(0,5);
const F=[['weight','Βάρος','kg'],['body_fat','Σωματικό λίπος','%'],['muscle_mass','Μυϊκή μάζα','kg'],['water_percent','Νερό','%'],['visceral_fat','Σπλαχνικό λίπος',''],['metabolic_age','Μεταβολική ηλικία',''],['bone_mass','Οστική μάζα','kg'],['calories','Θερμίδες','kcal'],['fitness_score','Fitness Score','']];
const css=document.createElement('style');css.textContent=`.nw217-modal{position:fixed;inset:0;z-index:3000000;background:#0008;display:grid;place-items:center;padding:14px}.nw217-box{width:min(760px,96vw);max-height:94vh;overflow:auto;background:#fff;border-radius:20px;padding:18px;box-shadow:0 22px 80px #0008}.nw217-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.nw217-head h2{margin:0;color:#245b2b}.nw217-form{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.nw217-field{display:flex;flex-direction:column;gap:5px;font-weight:800;color:#344054}.nw217-full{grid-column:1/-1}.nw217-field input,.nw217-field textarea{width:100%;box-sizing:border-box;padding:11px;border:1px solid #cbd5cb;border-radius:10px;font:inherit;color:#182018;background:#fff;pointer-events:auto!important;user-select:text!important;caret-color:#245b2b}.nw217-field textarea{min-height:90px}.nw217-name{font-size:16px;min-height:46px}.nw217-hint{font-size:11px;color:#667085;font-weight:500}.nw217-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:8px}.nw217-btn{border:1px solid #d5ddd5;background:#fff;border-radius:10px;padding:10px 13px;font:inherit;font-weight:800;color:#245b2b;cursor:pointer}.nw217-primary{background:#245b2b;color:#fff;border-color:#245b2b}.nw217-error{grid-column:1/-1;background:#fff3f3;border:1px solid #eccaca;color:#a40000;padding:10px;border-radius:10px;font-weight:700}.nw217-status{grid-column:1/-1;background:#f4f8f4;border:1px solid #dce7dc;color:#245b2b;padding:9px;border-radius:10px;font-weight:700}@media(max-width:700px){.nw217-form{grid-template-columns:1fr}.nw217-full,.nw217-actions,.nw217-error,.nw217-status{grid-column:1}}`;
document.head.appendChild(css);
async function user(){return(await sb.auth.getUser()).data?.user||null}
async function clients(){const u=await user();if(!u)return[];const r=await sb.from('clients').select('id,name').eq('user_id',u.id).order('name');return r.data||[]}
async function currentClient(){const u=await user();if(!u||!cid())return null;const r=await sb.from('clients').select('id,name').eq('id',cid()).eq('user_id',u.id).maybeSingle();return r.data||null}
async function resolveOrCreateClient(name,list,current,existing,u){const q=String(name||'').trim();if(!q)return{error:'Το ονοματεπώνυμο είναι υποχρεωτικό.'};const low=q.toLowerCase();const exact=list.filter(x=>String(x.name||'').trim().toLowerCase()===low);if(exact.length===1)return{id:exact[0].id};const partial=list.filter(x=>String(x.name||'').toLowerCase().includes(low));if(partial.length===1)return{id:partial[0].id};if(exact.length>1||partial.length>1)return{error:'Βρέθηκαν περισσότεροι από ένας πελάτες με παρόμοιο όνομα. Διάλεξε τον σωστό από τη λίστα.'};if(existing?.client_id&&current?.id===existing.client_id){const r=await sb.from('clients').update({name:q,updated_at:new Date().toISOString()}).eq('id',current.id).eq('user_id',u.id);if(r.error)return{error:'Δεν διορθώθηκε το όνομα του πελάτη: '+r.error.message};return{id:current.id,renamed:true};}const r=await sb.from('clients').insert({user_id:u.id,name:q,status:'active'}).select('id,name').maybeSingle();if(r.error)return{error:'Δεν δημιουργήθηκε ο νέος πελάτης: '+r.error.message};return{id:r.data?.id,created:true};}
function openEditor(existing,current,list){
 const m=document.createElement('div');m.className='nw217-modal';
 const opts=list.map(x=>`<option value="${esc(x.name)}"></option>`).join('');
 m.innerHTML=`<div class="nw217-box"><div class="nw217-head"><h2>${existing?'✏️ Επεξεργασία Tanita':'⚖️ Νέα εγγραφή · Tanita'}</h2><button class="nw217-btn" type="button" data-close>×</button></div><form class="nw217-form"><label class="nw217-field nw217-full">Πελάτης / Ονοματεπώνυμο *<input class="nw217-name" name="client_name" type="text" value="${esc(existing?.client_name||current?.name||'')}" autocomplete="off" autocapitalize="words" spellcheck="false" list="nw217-client-list"><datalist id="nw217-client-list">${opts}</datalist><span class="nw217-hint">Μπορείς να διορθώσεις το όνομα. Σε υπάρχουσα μέτρηση, αν το όνομα δεν υπάρχει, διορθώνεται ο ίδιος πελάτης. Σε νέα μέτρηση, αν δεν υπάρχει, δημιουργείται νέος πελάτης.</span></label><label class="nw217-field">Ημερομηνία μέτρησης *<input name="measurement_date" type="date" value="${esc(existing?.measurement_date||today())}"></label><label class="nw217-field">Ώρα μέτρησης<input name="measurement_time" type="text" inputmode="numeric" placeholder="HH:MM" maxlength="5" value="${esc(time(existing?.measurement_time)||nowTime())}"><span class="nw217-hint">24ωρη μορφή, π.χ. 14:05</span></label>${F.map(([k,l,u])=>`<label class="nw217-field">${l}${u?' ('+u+')':''}<input name="${k}" type="number" step="any" value="${esc(existing?.[k]??'')}"></label>`).join('')}<label class="nw217-field nw217-full">Σημειώσεις<textarea name="notes">${esc(existing?.notes||'')}</textarea></label><div class="nw217-actions"><button class="nw217-btn" type="button" data-close>Άκυρο</button><button class="nw217-btn nw217-primary" type="submit">Αποθήκευση</button></div></form></div>`;
 document.body.appendChild(m);
 m.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>m.remove());
 const name=m.querySelector('[name=client_name]');name.readOnly=false;name.disabled=false;name.tabIndex=0;name.style.pointerEvents='auto';name.addEventListener('keydown',e=>e.stopPropagation());
 setTimeout(()=>{name.focus({preventScroll:true});name.setSelectionRange(name.value.length,name.value.length)},80);
 const ti=m.querySelector('[name=measurement_time]');ti.oninput=e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+':'+v.slice(2);e.target.value=v};
 m.querySelector('form').onsubmit=async e=>{
   e.preventDefault();e.stopImmediatePropagation();
   const f=e.currentTarget,u=await user();if(!u)return;
   const result=await resolveOrCreateClient(f.client_name.value,list,current,existing,u),errs=[];
   if(result.error)errs.push(result.error);
   if(f.measurement_time.value&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(f.measurement_time.value))errs.push('Η ώρα πρέπει να είναι HH:MM.');
   if(!f.measurement_date.value)errs.push('Η ημερομηνία μέτρησης είναι υποχρεωτική.');
   if(errs.length){m.querySelector('.nw217-error')?.remove();f.insertAdjacentHTML('afterbegin',`<div class="nw217-error">${errs.map(esc).join('<br>')}</div>`);return}
   const p={user_id:u.id,client_id:result.id,measurement_date:f.measurement_date.value,measurement_time:f.measurement_time.value||nowTime(),notes:f.notes.value||null};
   F.forEach(([k])=>p[k]=f[k].value===''?null:Number(f[k].value));
   const r=existing?await sb.from('tanita_measurements').update(p).eq('id',existing.id).eq('user_id',u.id):await sb.from('tanita_measurements').insert(p);
   if(r.error){m.querySelector('.nw217-error')?.remove();f.insertAdjacentHTML('afterbegin',`<div class="nw217-error">Δεν αποθηκεύτηκε: ${esc(r.error.message)}</div>`);return}
   m.querySelector('.nw217-error')?.remove();f.insertAdjacentHTML('afterbegin','<div class="nw217-status">✓ Αποθηκεύτηκε σωστά.</div>');
   setTimeout(()=>{m.remove();location.reload()},350);
 };
}
async function rows(){const u=await user();if(!u)return[];const r=await sb.from('tanita_measurements').select('*').eq('user_id',u.id).order('created_at',{ascending:false});return r.error?[]:(r.data||[])}
async function intercept(e){
 if(!active())return;
 const t=e.target;
 const isNew=t.closest?.('.crud-new');
 const editBtn=t.closest?.('.crud-actions button:first-child');
 const tableEdit=t.closest?.('.nw213 .rowactions button:first-child');
 if(!isNew&&!editBtn&&!tableEdit)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const [c,list]=await Promise.all([currentClient(),clients()]);
 if(isNew){openEditor(null,c,list);return}
 let row=null;
 if(tableEdit){const tr=tableEdit.closest('tr');const trs=[...document.querySelectorAll('.nw213 tbody tr')];const idx=trs.indexOf(tr);const data=await rows();row=data[idx]||null}
 if(!row&&editBtn){const card=editBtn.closest('.rowcard');const cards=[...document.querySelectorAll('main .rowcard')].filter(x=>x.querySelector('.crud-actions'));const idx=cards.indexOf(card);const data=await rows();row=data[idx]||null}
 if(row){const owner=list.find(x=>x.id===row.client_id);openEditor({...row,client_name:owner?.name||''},owner||c,list);return}
 alert('Δεν εντοπίστηκε η μέτρηση για επεξεργασία.');
}
document.addEventListener('click',intercept,true);
})();
