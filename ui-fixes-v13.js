(()=>{
const SUPABASE_URL='https://vbkuvexyqehmpeeejqbh.supabase.co';
const SUPABASE_KEY='sb_publishable__nczNPWr3do_hqi6MCS0AQ_fjYCXhGk';
const sb=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
const uid=()=>crypto.randomUUID();
const localKey='nwceo_final_v1';
const getLocal=()=>{try{return JSON.parse(localStorage.getItem(localKey)||'{}')}catch{return{}}};
const putLocal=s=>{try{localStorage.setItem(localKey,JSON.stringify(s))}catch{}};
function close(id){document.getElementById(id)?.remove()}
function authUI(){
 if(document.getElementById('auth-v13'))return;
 document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="auth-v13"><div class="modal-card auth-card">
 <button class="x" id="auth-x">×</button><div class="logo-mark">HL</div><div class="eyebrow">HEALTHY LIFE • WELLNESS CEO</div>
 <h2>Σύνδεση</h2><p>Ο ίδιος λογαριασμός = ίδια δεδομένα σε όλες τις συσκευές.</p>
 <label>Email<input id="v13-email" type="email" autocomplete="email" placeholder="Το email σου"></label>
 <label>Κωδικός<input id="v13-pass" type="password" autocomplete="current-password" placeholder="Ο κωδικός σου"></label>
 <div class="modal-actions"><button class="primary" id="v13-login">Σύνδεση</button><button id="v13-signup">Δημιουργία λογαριασμού</button></div>
 <button class="link-button" id="v13-magic">✉️ Σύνδεση με σύνδεσμο email</button>
 <button class="link-button" id="v13-forgot">🔑 Ξέχασα τον κωδικό μου</button><div id="v13-msg" class="authmsg"></div>
 </div></div>`);
 const msg=t=>document.getElementById('v13-msg').textContent=t;
 document.getElementById('auth-x').onclick=()=>close('auth-v13');
 document.getElementById('v13-login').onclick=async()=>{const email=document.getElementById('v13-email').value.trim(),password=document.getElementById('v13-pass').value;if(!email||!password){msg('Γράψε email και κωδικό.');return}msg('Γίνεται σύνδεση…');const r=await sb.auth.signInWithPassword({email,password});if(r.error){msg('Δεν έγινε σύνδεση: '+r.error.message);return}msg('Επιτυχία! Φορτώνω την εφαρμογή…');setTimeout(()=>location.reload(),500)};
 document.getElementById('v13-signup').onclick=async()=>{const email=document.getElementById('v13-email').value.trim(),password=document.getElementById('v13-pass').value;if(!email||password.length<6){msg('Βάλε email και κωδικό τουλάχιστον 6 χαρακτήρων.');return}msg('Δημιουργία λογαριασμού…');const r=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.href}});if(r.error){msg('Δεν δημιουργήθηκε: '+r.error.message);return}if(!r.data.session){msg('Ο λογαριασμός δημιουργήθηκε. Έλεγξε το email σου για επιβεβαίωση και μετά ξαναμπες.');return}msg('Έτοιμο!');setTimeout(()=>location.reload(),500)};
 document.getElementById('v13-magic').onclick=async()=>{const email=document.getElementById('v13-email').value.trim();if(!email){msg('Γράψε πρώτα το email σου.');return}msg('Στέλνω σύνδεσμο…');const r=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.href}});msg(r.error?'Σφάλμα: '+r.error.message:'Έλεγξε το email σου και πάτησε τον σύνδεσμο.');};
 document.getElementById('v13-forgot').onclick=async()=>{const email=document.getElementById('v13-email').value.trim();if(!email){msg('Γράψε πρώτα το email σου.');return}msg('Στέλνω email επαναφοράς…');const r=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname+'?reset=1'});msg(r.error?'Σφάλμα: '+r.error.message:'Σου έστειλα email για να ορίσεις νέο κωδικό.');};
}
async function resetUI(){if(!sb)return;const s=await sb.auth.getSession();if(!s.data.session)return;const hash=location.hash||'';if(new URLSearchParams(location.search).get('reset')==='1'||hash.includes('type=recovery')){
 if(document.getElementById('reset-v13'))return;document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="reset-v13"><div class="modal-card auth-card"><div class="logo-mark">HL</div><div class="eyebrow">HEALTHY LIFE</div><h2>Νέος κωδικός</h2><label>Νέος κωδικός<input id="newpass-v13" type="password" minlength="6"></label><label>Ξανά ο κωδικός<input id="newpass2-v13" type="password" minlength="6"></label><button class="primary" id="savepass-v13">Αποθήκευση νέου κωδικού</button><div id="resetmsg-v13" class="authmsg"></div></div></div>`);
 document.getElementById('savepass-v13').onclick=async()=>{const a=document.getElementById('newpass-v13').value,b=document.getElementById('newpass2-v13').value,m=document.getElementById('resetmsg-v13');if(a.length<6||a!==b){m.textContent='Οι δύο κωδικοί πρέπει να είναι ίδιοι και τουλάχιστον 6 χαρακτήρες.';return}const r=await sb.auth.updateUser({password:a});m.textContent=r.error?'Σφάλμα: '+r.error.message:'Ο κωδικός άλλαξε. Τώρα μπορείς να συνδεθείς κανονικά.';if(!r.error)setTimeout(()=>location.href=location.pathname,900)};
 }
}
window.openAuth=authUI;
document.addEventListener('click',e=>{const b=e.target.closest?.('.account-btn');if(b){e.preventDefault();e.stopImmediatePropagation();authUI()}},{capture:true});
function appointmentModal(existing={}){
 const local=getLocal(),clients=Array.isArray(local.clients)?local.clients:[];
 document.getElementById('appointment-v13')?.remove();
 document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="appointment-v13"><form class="modal-card form-card" id="appointment-form-v13"><button type="button" class="x" id="apx-v13">×</button><div class="form-head"><div class="logo-mark">HL</div><div><div class="eyebrow">HEALTHY LIFE</div><h2>${existing.id?'Επεξεργασία ραντεβού':'Νέο ραντεβού'}</h2><p>Συμπλήρωσε τα στοιχεία της συνάντησης.</p></div></div><div class="form-grid">
 <label>Ονοματεπώνυμο πελάτη *<input id="ap-name-v13" required list="client-list-v13" value="${esc(existing.client_name||existing.name||'')}"><datalist id="client-list-v13">${clients.map(c=>`<option value="${esc(c.name)}">`).join('')}</datalist></label>
 <label>Ημερομηνία *<input id="ap-date-v13" type="date" required value="${esc(existing.appointment_date||existing.date||new Date().toISOString().slice(0,10))}"></label>
 <label>Ώρα έναρξης *<input id="ap-start-v13" type="time" required value="${esc(existing.start_time||existing.time||'')}"></label>
 <label>Ώρα λήξης<input id="ap-end-v13" type="time" value="${esc(existing.end_time||'')}"></label>
 <label>Τίτλος<input id="ap-title-v13" value="${esc(existing.title||'Ραντεβού')}"></label>
 <label>Τύπος<input id="ap-type-v13" value="${esc(existing.appointment_type||existing.type||'')}"></label>
 <label>Υπενθύμιση (λεπτά)<input id="ap-rem-v13" type="number" min="0" step="5" value="${esc(existing.reminder_minutes??15)}"></label>
 <label>Κατάσταση<select id="ap-status-v13"><option>Προγραμματισμένο</option><option>Ολοκληρώθηκε</option><option>Ακυρώθηκε</option></select></label>
 <label class="wide">Σημειώσεις<textarea id="ap-notes-v13">${esc(existing.notes||'')}</textarea></label>
 </div><div class="modal-actions"><button type="submit" class="primary">${existing.id?'Αποθήκευση αλλαγών':'Αποθήκευση ραντεβού'}</button><button type="button" id="apcancel-v13">Άκυρο</button></div><div id="apmsg-v13" class="authmsg"></div></form></div>`);
 if(existing.status)document.getElementById('ap-status-v13').value=existing.status;
 const close=()=>document.getElementById('appointment-v13')?.remove();document.getElementById('apx-v13').onclick=close;document.getElementById('apcancel-v13').onclick=close;
 document.getElementById('appointment-form-v13').onsubmit=async e=>{e.preventDefault();const name=document.getElementById('ap-name-v13').value.trim(),date=document.getElementById('ap-date-v13').value,start=document.getElementById('ap-start-v13').value;if(!name||!date||!start){document.getElementById('apmsg-v13').textContent='Συμπλήρωσε ονοματεπώνυμο, ημερομηνία και ώρα.';return}const m=document.getElementById('apmsg-v13');m.textContent='Αποθήκευση…';let sess=null;if(sb){try{sess=(await sb.auth.getSession()).data.session}catch{}}
 let clientId=existing.client_id||null;let all=getLocal();all.clients=Array.isArray(all.clients)?all.clients:[];let c=all.clients.find(x=>String(x.name||'').trim().toLowerCase()===name.toLowerCase());
 if(!clientId&&c)clientId=c.id;
 if(!clientId&&sess){clientId=uid();const cr={id:clientId,user_id:sess.user.id,όνομα:name,τηλέφωνο:null,email:null,διεύθυνση:null,birth_date:null,σημειώσεις:null,κατάσταση:'Ενεργός'};const rr=await sb.from('clients').insert(cr);if(rr.error){m.textContent='Δεν μπόρεσα να δημιουργήσω τον πελάτη: '+rr.error.message;return}all.clients.unshift({id:clientId,name,phone:'',email:'',address:'',birth_date:'',notes:'',status:'Ενεργός'});}
 if(!clientId){clientId=uid();all.clients.unshift({id:clientId,name,phone:'',email:'',address:'',birth_date:'',notes:'',status:'Ενεργός'});}
 const id=existing.id||uid();const ap={id,client_id:clientId,title:document.getElementById('ap-title-v13').value.trim()||'Ραντεβού',appointment_date:date,start_time:start,end_time:document.getElementById('ap-end-v13').value||null,appointment_type:document.getElementById('ap-type-v13').value.trim()||null,Κατάσταση:document.getElementById('ap-status-v13').value,Σημειώσεις:document.getElementById('ap-notes-v13').value.trim()||null,reminder_minutes:Number(document.getElementById('ap-rem-v13').value||0)};
 if(sess){const dbrow={...ap,user_id:sess.user.id};if(existing.id){delete dbrow.user_id;const rr=await sb.from('Ραντεβού').update(dbrow).eq('id',id).eq('user_id',sess.user.id);if(rr.error){m.textContent='Σφάλμα αποθήκευσης: '+rr.error.message;return}}else{const rr=await sb.from('Ραντεβού').insert(dbrow);if(rr.error){m.textContent='Σφάλμα αποθήκευσης: '+rr.error.message;return}}}
 all.appointments=Array.isArray(all.appointments)?all.appointments:[];const ui={id,client_id:clientId,client_name:name,title:ap.title,date:date,start_time:start,end_time:ap.end_time,type:ap.appointment_type,status:ap.Κατάσταση,notes:ap.Σημειώσεις,reminder_minutes:ap.reminder_minutes};all.appointments=existing.id?all.appointments.map(x=>x.id===id?ui:x):[ui,...all.appointments];putLocal(all);m.textContent='Αποθηκεύτηκε ✓';setTimeout(()=>location.reload(),350)};
}
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-new="appointments"]');if(b){e.preventDefault();e.stopImmediatePropagation();appointmentModal()}},{capture:true});
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-edit="appointments"]');if(b){e.preventDefault();e.stopImmediatePropagation();const s=getLocal(),x=(s.appointments||[]).find(a=>a.id===b.dataset.id);if(x)appointmentModal(x)}},{capture:true});
resetUI();
})();
