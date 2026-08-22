const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const KEY='nwceo_v2';
const today=()=>new Date().toISOString().slice(0,10);
const defaultState={clients:[],tasks:[],income:[],expenses:[],measurements:[]};
let state=load();
function load(){try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaultState}}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function nav(view){$$('nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));render(view)}
function money(n){return Number(n||0).toFixed(2)+' €'}
function render(view='dashboard'){
 const app=$('#app');
 const pages={dashboard,clients,tanita,planner,finance,backup};
 app.innerHTML=(pages[view]||dashboard)();
 bind();
}
function dashboard(){
 const active=state.clients.length;
 const tasks=state.tasks.filter(t=>t.date===today()&&!t.done).length;
 const income=state.income.reduce((a,x)=>a+Number(x.amount||0),0);
 const expenses=state.expenses.reduce((a,x)=>a+Number(x.amount||0),0);
 const due=state.clients.filter(c=>c.nextFollowUp&&c.nextFollowUp<=today()).length;
 return `<h1>Καλώς ήρθες, Nikoleta ✨</h1><p class="muted">Το προσωπικό σου Wellness CEO dashboard.</p>
 <div class="grid">
 <div class="card"><span class="muted">Πελάτες</span><div class="stat">${active}</div><span class="pill">CRM</span></div>
 <div class="card"><span class="muted">Σημερινές εργασίες</span><div class="stat">${tasks}</div></div>
 <div class="card"><span class="muted">Καθαρό αποτέλεσμα</span><div class="stat">${money(income-expenses)}</div></div>
 <div class="card"><span class="muted">Follow-ups</span><div class="stat">${due}</div>${due?'<span class="pill">Χρειάζονται επικοινωνία</span>':'<span class="pill">Όλα τακτοποιημένα</span>'}</div>
 </div>
 <div class="card" style="margin-top:20px"><div class="row"><h2>Γρήγορες ενέργειες</h2><div class="actions-inline"><button class="primary" id="quickClient">＋ Πελάτης</button><button class="secondary" data-go="tanita">Tanita</button><button class="secondary" data-go="planner">Planner</button></div></div>
 <p>Πελάτες, μετρήσεις, follow-ups, καθημερινές εργασίες και οικονομικά — σε ένα σημείο.</p></div>`;
}
function clients(){
 return `<div class="row"><div><h1>Πελάτες</h1><p class="muted">CRM, σημειώσεις και follow-ups</p></div><button class="primary" id="quickClient">＋ Νέος πελάτης</button></div>
 <div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Πελάτης</th><th>Επικοινωνία</th><th>Follow-up</th><th>Μετρήσεις</th><th></th></tr></thead><tbody>
 ${state.clients.length?state.clients.map((c,i)=>{const m=state.measurements.filter(x=>x.clientId===c.id).length;const overdue=c.nextFollowUp&&c.nextFollowUp<=today();return `<tr><td><b>${esc(c.name)}</b><br><span class="muted">${esc(c.notes||'')}</span></td><td>${esc(c.phone||'-')}<br>${esc(c.email||'-')}</td><td class="${overdue?'warning':'success'}">${c.nextFollowUp?esc(c.nextFollowUp):'-'}</td><td>${m}</td><td><button class="dangerBtn" data-del-client="${i}">Διαγραφή</button></td></tr>`}).join(''):`<tr><td colspan="5" class="empty">Δεν υπάρχουν πελάτες ακόμη.</td></tr>`}</tbody></table></div></div>`;
}
function tanita(){
 return `<h1>Tanita</h1><p class="muted">Καταγραφή και ιστορικό σωματομετρήσεων ανά πελάτη.</p>
 <div class="card"><form id="tanitaForm"><select name="clientId" required><option value="">Επίλεξε πελάτη</option>${state.clients.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
 <input name="date" type="date" value="${today()}" required><div class="grid">
 <input name="weight" type="number" step=".1" placeholder="Βάρος (kg)" required><input name="fat" type="number" step=".1" placeholder="Λίπος (%)">
 <input name="muscle" type="number" step=".1" placeholder="Μυϊκή μάζα (kg)"><input name="water" type="number" step=".1" placeholder="Νερό (%)">
 <input name="visceral" type="number" step=".1" placeholder="Σπλαχνικό λίπος"><input name="metabolicAge" type="number" step="1" placeholder="Μεταβολική ηλικία">
 </div><button class="primary">Αποθήκευση μέτρησης</button></form></div>
 <div class="card" style="margin-top:16px"><h2>Ιστορικό</h2>${state.measurements.length?`<div class="table-wrap"><table class="table"><thead><tr><th>Ημερομηνία</th><th>Πελάτης</th><th>Βάρος</th><th>Λίπος</th><th>Μύες</th><th></th></tr></thead><tbody>${state.measurements.slice().reverse().map((m,i)=>{const c=state.clients.find(c=>c.id===m.clientId);return `<tr><td>${esc(m.date)}</td><td>${esc(c?.name||'Άγνωστος')}</td><td>${esc(m.weight)} kg</td><td>${esc(m.fat||'-')}%</td><td>${esc(m.muscle||'-')} kg</td><td><button class="dangerBtn" data-del-measure="${state.measurements.length-1-i}">Διαγραφή</button></td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty">Δεν υπάρχουν μετρήσεις ακόμη.</div>'}</div>`;
}
function planner(){
 return `<h1>CEO Planner</h1><p class="muted">Οργάνωσε τις καθημερινές ενέργειές σου.</p>
 <div class="card"><form id="taskForm"><input name="task" placeholder="Νέα εργασία..." required><input name="date" type="date" value="${today()}" required><button class="primary">＋ Προσθήκη</button></form></div>
 <div class="card" style="margin-top:16px"><h2>Εργασίες</h2>${state.tasks.length?state.tasks.slice().sort((a,b)=>a.date.localeCompare(b.date)).map((t,i)=>`<div class="check"><input type="checkbox" data-task="${state.tasks.indexOf(t)}" ${t.done?'checked':''}><span>${esc(t.task)} <span class="muted">— ${esc(t.date)}</span></span></div>`).join(''):'<div class="empty">Δεν έχεις εργασίες ακόμη.</div>'}</div>`;
}
function finance(){
 const income=state.income.reduce((a,x)=>a+Number(x.amount||0),0), expenses=state.expenses.reduce((a,x)=>a+Number(x.amount||0),0);
 return `<h1>Οικονομικά</h1><p class="muted">Έσοδα, έξοδα και καθαρό αποτέλεσμα.</p><div class="grid"><div class="card"><span class="muted">Έσοδα</span><div class="stat">${money(income)}</div></div><div class="card"><span class="muted">Έξοδα</span><div class="stat">${money(expenses)}</div></div><div class="card"><span class="muted">Καθαρό</span><div class="stat">${money(income-expenses)}</div></div></div>
 <div class="grid" style="margin-top:16px"><div class="card"><h2>＋ Έσοδο</h2><form id="incomeForm"><input name="description" placeholder="Περιγραφή" required><input name="amount" type="number" step=".01" placeholder="Ποσό €" required><button class="primary">Καταχώρηση</button></form></div>
 <div class="card"><h2>− Έξοδο</h2><form id="expenseForm"><input name="description" placeholder="Περιγραφή" required><input name="amount" type="number" step=".01" placeholder="Ποσό €" required><button class="primary">Καταχώρηση</button></form></div></div>`;
}
function backup(){
 return `<h1>Αντίγραφο ασφαλείας</h1><p class="muted">Τα δεδομένα της εφαρμογής αποθηκεύονται τοπικά στον browser.</p><div class="card"><div class="actions-inline"><button class="primary" id="exportBtn">⬇ Εξαγωγή δεδομένων</button><label class="secondary" style="display:inline-block;cursor:pointer">⬆ Εισαγωγή δεδομένων<input id="importFile" type="file" accept=".json" hidden></label><button class="dangerBtn" id="clearData">Διαγραφή όλων</button></div><p class="mini muted">Κράτησε το αρχείο JSON σε ασφαλές σημείο. Η εισαγωγή αντικαθιστά τα τρέχοντα δεδομένα.</p></div>`;
}
function bind(){
 $('#quickClient')?.addEventListener('click',()=>$('#clientDialog').showModal());
 $('#addClientTop')?.addEventListener('click',()=>$('#clientDialog').showModal());
 $$('[data-go]').forEach(b=>b.onclick=()=>nav(b.dataset.go));
 $$('[data-del-client]').forEach(b=>b.onclick=()=>{if(confirm('Διαγραφή πελάτη;')){state.clients.splice(+b.dataset.delClient,1);save();render('clients')}});
 $('#tanitaForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);state.measurements.push({id:crypto.randomUUID(),...Object.fromEntries(f)});save();render('tanita')});
 $$('[data-del-measure]').forEach(b=>b.onclick=()=>{state.measurements.splice(+b.dataset.delMeasure,1);save();render('tanita')});
 $('#taskForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);state.tasks.push({id:crypto.randomUUID(),task:f.get('task'),date:f.get('date'),done:false});save();render('planner')});
 $$('[data-task]').forEach(x=>x.onchange=()=>{state.tasks[+x.dataset.task].done=x.checked;save();render('planner')});
 $('#incomeForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);state.income.push({id:crypto.randomUUID(),description:f.get('description'),amount:f.get('amount'),date:today()});save();render('finance')});
 $('#expenseForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);state.expenses.push({id:crypto.randomUUID(),description:f.get('description'),amount:f.get('amount'),date:today()});save();render('finance')});
 $('#exportBtn')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='nikoleta-wellness-ceo-backup.json';a.click();URL.revokeObjectURL(a.href)});
 $('#importFile')?.addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{state={...defaultState,...JSON.parse(r.result)};save();render('backup');alert('Η εισαγωγή ολοκληρώθηκε.')}catch{alert('Μη έγκυρο αρχείο backup.')}};r.readAsText(file)});
 $('#clearData')?.addEventListener('click',()=>{if(confirm('Να διαγραφούν ΟΛΑ τα δεδομένα;')){state={...defaultState};save();render('backup')}});
}
$('#clientForm').addEventListener('submit',e=>{if(e.submitter?.value!=='ok')return;e.preventDefault();const f=new FormData(e.target);state.clients.push({id:crypto.randomUUID(),...Object.fromEntries(f)});save();$('#clientDialog').close();render('clients')});
$$('nav button').forEach(b=>b.onclick=()=>nav(b.dataset.view));
render();
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));