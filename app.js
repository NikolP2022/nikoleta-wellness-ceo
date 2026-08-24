const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const KEY="nwceo_final_v1";
const today=()=>new Date().toISOString().slice(0,10);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const money=n=>Number(n||0).toFixed(2)+" €";
const empty={clients:[],appointments:[],partners:[],measurements:[],programs:[],tasks:[],income:[],expenses:[]};
let state=load();
function load(){try{return {...empty,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...empty}}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function nav(view){$$("nav button").forEach(b=>b.classList.toggle("active",b.dataset.view===view));render(view)}
function render(view="dashboard"){
 const pages={dashboard,appointments,clients,partners,tanita,programs,followups,finance,planner};
 $("#app").innerHTML=(pages[view]||dashboard)(); bind(view);
}
function dashboard(){
 const due=state.clients.filter(c=>c.follow&&c.follow<=today()).length;
 const income=state.income.reduce((a,x)=>a+Number(x.amount||0),0);
 const expenses=state.expenses.reduce((a,x)=>a+Number(x.amount||0),0);
 const ap=state.appointments.filter(x=>x.date===today()).length;
 return `<section class="hero"><h1>Καλώς ήρθες, Nikoleta ✨</h1><p>Το προσωπικό σου Wellness CEO.</p></section>
 <div class="cards">
 <div class="card"><span>👥 Πελάτες</span><b>${state.clients.length}</b></div>
 <div class="card"><span>📅 Ραντεβού σήμερα</span><b>${ap}</b></div>
 <div class="card"><span>📞 Follow-ups</span><b>${due}</b></div>
 <div class="card"><span>💰 Καθαρό αποτέλεσμα</span><b>${money(income-expenses)}</b></div>
 </div>
 <div class="card"><h2>Γρήγορες ενέργειες</h2><div class="actions">
 <button class="primary" data-action="new-client">＋ Νέος πελάτης</button>
 <button data-go="appointments">＋ Ραντεβού</button><button data-go="tanita">⚖️ Νέα Tanita</button>
 <button data-go="programs">🥤 Πρόγραμμα</button>
 </div></div>`;
}
function clients(){
 return `<div class="row"><div><h1>Πελάτες</h1><p>Πλήρης καρτέλα πελάτη, επικοινωνία και παρακολούθηση.</p></div><button class="primary" data-action="new-client">＋ Νέος πελάτης</button></div>
 <div class="list">${state.clients.length?state.clients.map(c=>`<article class="card item"><div><h3>${esc(c.name)}</h3><p>📞 ${esc(c.phone||"-")} · ✉️ ${esc(c.email||"-")}</p><p>${esc(c.notes||"")}</p><p>📞 Επόμενο follow-up: <b>${esc(c.follow||"-")}</b></p></div><div class="actions"><button data-client="${c.id}">Άνοιγμα</button><button class="danger" data-del-client="${c.id}">Διαγραφή</button></div></article>`).join(""):`<div class="card empty">Δεν υπάρχουν πελάτες ακόμη.</div>`}</div>`;
}
function appointments(){
 return `<div class="row"><div><h1>Ραντεβού</h1><p>Οργάνωσε τα ραντεβού σου.</p></div><button class="primary" data-action="new-appointment">＋ Νέο ραντεβού</button></div>
 <div class="list">${state.appointments.length?state.appointments.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).map(a=>`<article class="card item"><div><h3>${esc(a.date)} · ${esc(a.time||"")}</h3><p><b>${esc(a.client)}</b></p><p>${esc(a.type||"Ραντεβού")} · ${esc(a.notes||"")}</p></div><button class="danger" data-del-ap="${a.id}">Διαγραφή</button></article>`).join(""):`<div class="card empty">Δεν υπάρχουν ραντεβού.</div>`}</div>`;
}
function partners(){
 return `<div class="row"><div><h1>Συνεργάτες</h1><p>Γυμναστήρια, κομμωτήρια, κέντρα ομορφιάς, φαρμακεία κ.ά.</p></div><button class="primary" data-action="new-partner">＋ Νέος συνεργάτης</button></div>
 <div class="list">${state.partners.length?state.partners.map(p=>`<article class="card item"><div><h3>${esc(p.name)}</h3><p>${esc(p.type||"")} · 📞 ${esc(p.phone||"-")}</p><p>${esc(p.notes||"")}</p></div><button class="danger" data-del-partner="${p.id}">Διαγραφή</button></article>`).join(""):`<div class="card empty">Δεν υπάρχουν συνεργάτες.</div>`}</div>`;
}
function tanita(){
 const clients=state.clients.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("");
 return `<div class="row"><div><h1>⚖️ Tanita</h1><p>Καταγραφή και ιστορικό μετρήσεων.</p></div><button class="primary" data-action="new-tanita">＋ Νέα μέτρηση</button></div>
 <div class="card"><h2>Ιστορικό</h2>${state.measurements.length?`<div class="tablewrap"><table><tr><th>Ημ/νία</th><th>Πελάτης</th><th>Βάρος</th><th>Λίπος</th><th>Μύες</th><th>Νερό</th><th>Σπλαχνικό</th></tr>${state.measurements.sort((a,b)=>b.date.localeCompare(a.date)).map(m=>{let c=state.clients.find(x=>x.id===m.clientId);return `<tr><td>${esc(m.date)}</td><td>${esc(c?.name||"")}</td><td>${esc(m.weight||"-")}</td><td>${esc(m.fat||"-")}%</td><td>${esc(m.muscle||"-")}</td><td>${esc(m.water||"-")}%</td><td>${esc(m.visceral||"-")}</td></tr>`}).join("")}</table></div>`:`<p class="empty">Δεν υπάρχουν μετρήσεις.</p>`}</div>`;
}
function programs(){
 return `<div class="row"><div><h1>🥤 Διατροφικά προγράμματα</h1><p>Πρόγραμμα, στόχος, θερμίδες, πρωτεΐνη και σημειώσεις.</p></div><button class="primary" data-action="new-program">＋ Νέο πρόγραμμα</button></div>
 <div class="list">${state.programs.length?state.programs.map(p=>`<article class="card item"><div><h3>${esc(p.title)}</h3><p>Πελάτης: ${esc(p.client||"-")} · ${esc(p.calories||"-")} kcal · ${esc(p.protein||"-")} g πρωτεΐνη</p><p>${esc(p.notes||"")}</p></div><button class="danger" data-del-program="${p.id}">Διαγραφή</button></article>`).join(""):`<div class="card empty">Δεν υπάρχουν προγράμματα.</div>`}</div>`;
}
function followups(){
 const list=state.clients.filter(c=>c.follow).sort((a,b)=>a.follow.localeCompare(b.follow));
 return `<div class="row"><div><h1>📞 Follow-ups</h1><p>Ποιον πρέπει να επικοινωνήσεις και πότε.</p></div></div>
 <div class="list">${list.length?list.map(c=>`<article class="card item"><div><h3>${esc(c.name)}</h3><p>${c.follow<=today()?"🔴 Χρειάζεται επικοινωνία":"🟢 Προγραμματισμένο"} · ${esc(c.follow)}</p></div><button data-client="${c.id}">Άνοιγμα</button></article>`).join(""):`<div class="card empty">Δεν υπάρχουν follow-ups.</div>`}</div>`;
}
function finance(){
 const inc=state.income.reduce((a,x)=>a+Number(x.amount||0),0), exp=state.expenses.reduce((a,x)=>a+Number(x.amount||0),0);
 return `<div class="row"><div><h1>💰 Οικονομικά</h1><p>Έσοδα, έξοδα και καθαρό αποτέλεσμα.</p></div><div class="actions"><button class="primary" data-action="income">＋ Έσοδο</button><button data-action="expense">＋ Έξοδο</button></div></div>
 <div class="cards"><div class="card"><span>Έσοδα</span><b>${money(inc)}</b></div><div class="card"><span>Έξοδα</span><b>${money(exp)}</b></div><div class="card"><span>Καθαρό</span><b>${money(inc-exp)}</b></div></div>
 <div class="card"><h2>Κινήσεις</h2>${[...state.income.map(x=>({...x,kind:"Έσοδο"})),...state.expenses.map(x=>({...x,kind:"Έξοδο"}))].sort((a,b)=>b.date.localeCompare(a.date)).map(x=>`<p>📅 ${esc(x.date)} · <b>${esc(x.kind)}</b> · ${money(x.amount)} · ${esc(x.note||"")}</p>`).join("")||`<p class="empty">Καμία κίνηση.</p>`}</div>`;
}
function planner(){
 const pending=state.tasks.filter(t=>!t.done);
 return `<div class="row"><div><h1>📝 CEO Planner</h1><p>Οι καθημερινές εργασίες σου.</p></div><button class="primary" data-action="new-task">＋ Εργασία</button></div>
 <div class="list">${pending.length?pending.map(t=>`<article class="card item"><div><h3>${esc(t.title)}</h3><p>${esc(t.date||today())}</p></div><button data-done-task="${t.id}">✓ Ολοκληρώθηκε</button></article>`).join(""):`<div class="card empty">Δεν υπάρχουν εκκρεμείς εργασίες.</div>`}</div>`;
}
function modal(title,fields,cb){
 const box=document.createElement("div");box.className="modal";
 box.innerHTML=`<div class="modalbox"><h2>${title}</h2><form>${fields.map(f=>`<label>${f.label}<input name="${f.name}" type="${f.type||"text"}" value="${esc(f.value||"")}" ${f.required?"required":""} ${f.step?`step="${f.step}"`:""}></label>`).join("")}<div class="actions"><button type="button" data-cancel>Άκυρο</button><button class="primary">Αποθήκευση</button></div></form></div>`;
 document.body.appendChild(box);box.querySelector("[data-cancel]").onclick=()=>box.remove();
 box.querySelector("form").onsubmit=e=>{e.preventDefault();cb(Object.fromEntries(new FormData(e.target)));box.remove();save();render(currentView);}
}
let currentView="dashboard";
function newClient(){modal("Νέος πελάτης",[
 {label:"Ονοματεπώνυμο",name:"name",required:true},{label:"Τηλέφωνο",name:"phone"},{label:"Email",name:"email"},{label:"Επόμενο follow-up",name:"follow",type:"date"},{label:"Σημειώσεις",name:"notes"}],v=>state.clients.push({id:uid(),...v}));}
function bind(view){
 currentView=view;
 $$("[data-go]").forEach(b=>b.onclick=()=>nav(b.dataset.go));
 $$("nav button").forEach(b=>b.onclick=()=>nav(b.dataset.view));
 $$("[data-action]").forEach(b=>b.onclick=()=>actions(b.dataset.action));
 $$("[data-del-client]").forEach(b=>b.onclick=()=>{if(confirm("Διαγραφή πελάτη;")){state.clients=state.clients.filter(x=>x.id!==b.dataset.delClient);save();render(view)}});
 $$("[data-del-ap]").forEach(b=>b.onclick=()=>{state.appointments=state.appointments.filter(x=>x.id!==b.dataset.delAp);save();render(view)});
 $$("[data-del-partner]").forEach(b=>b.onclick=()=>{state.partners=state.partners.filter(x=>x.id!==b.dataset.delPartner);save();render(view)});
 $$("[data-del-program]").forEach(b=>b.onclick=()=>{state.programs=state.programs.filter(x=>x.id!==b.dataset.delProgram);save();render(view)});
 $$("[data-done-task]").forEach(b=>b.onclick=()=>{let t=state.tasks.find(x=>x.id===b.dataset.doneTask);if(t)t.done=true;save();render(view)});
 $$("[data-client]").forEach(b=>b.onclick=()=>{let c=state.clients.find(x=>x.id===b.dataset.client);if(c)alert(`Πελάτης: ${c.name}\nΤηλέφωνο: ${c.phone||"-"}\nEmail: ${c.email||"-"}\nFollow-up: ${c.follow||"-"}\n\n${c.notes||""}`)});
 $("#quickClient")?.addEventListener("click",newClient);
}
function actions(a){
 if(a==="new-client")return newClient();
 if(a==="new-appointment")return modal("Νέο ραντεβού",[
  {label:"Πελάτης",name:"client",required:true},{label:"Ημερομηνία",name:"date",type:"date",value:today(),required:true},{label:"Ώρα",name:"time",type:"time"},{label:"Τύπος",name:"type"},{label:"Σημειώσεις",name:"notes"}],v=>state.appointments.push({id:uid(),...v}));
 if(a==="new-partner")return modal("Νέος συνεργάτης",[
  {label:"Όνομα / επιχείρηση",name:"name",required:true},{label:"Κατηγορία",name:"type"},{label:"Τηλέφωνο",name:"phone"},{label:"Σημειώσεις",name:"notes"}],v=>state.partners.push({id:uid(),...v}));
 if(a==="new-tanita")return modal("Νέα μέτρηση Tanita",[
  {label:"ID πελάτη",name:"clientId",required:true},{label:"Ημερομηνία",name:"date",type:"date",value:today(),required:true},{label:"Βάρος (kg)",name:"weight",type:"number",step:"0.1"},{label:"Λίπος (%)",name:"fat",type:"number",step:"0.1"},{label:"Μυϊκή μάζα (kg)",name:"muscle",type:"number",step:"0.1"},{label:"Νερό (%)",name:"water",type:"number",step:"0.1"},{label:"Σπλαχνικό λίπος",name:"visceral",type:"number",step:"0.1"}],v=>state.measurements.push({id:uid(),...v}));
 if(a==="new-program")return modal("Νέο διατροφικό πρόγραμμα",[
  {label:"Τίτλος",name:"title",required:true},{label:"Πελάτης",name:"client"},{label:"Θερμίδες",name:"calories",type:"number"},{label:"Πρωτεΐνη (g)",name:"protein",type:"number"},{label:"Σημειώσεις",name:"notes"}],v=>state.programs.push({id:uid(),...v}));
 if(a==="new-task")return modal("Νέα εργασία",[{label:"Εργασία",name:"title",required:true},{label:"Ημερομηνία",name:"date",type:"date",value:today()}],v=>state.tasks.push({id:uid(),done:false,...v}));
 if(a==="income"||a==="expense")return modal(a==="income"?"Νέο έσοδο":"Νέο έξοδο",[{label:"Ποσό (€)",name:"amount",type:"number",step:"0.01",required:true},{label:"Ημερομηνία",name:"date",type:"date",value:today(),required:true},{label:"Περιγραφή",name:"note"}],v=>(a==="income"?state.income:state.expenses).push({id:uid(),...v}));
}
$("#backupBtn").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="nikoleta-wellness-backup.json";a.click()};
nav("dashboard");
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
