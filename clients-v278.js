(function(){
'use strict';
const KEY='nw_clients_v278';
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
const save=x=>localStorage.setItem(KEY,JSON.stringify(x));
function render(){
 const app=document.getElementById('app'); if(!app)return;
 const clients=load();
 app.innerHTML=`<header class="topbar"><div><div class="eyebrow">WELLNESS TOUCH POINT</div><h1>Nikoleta Wellness CEO</h1></div><button id="homeBtn" class="iconbtn">⌂</button></header>
 <main class="page"><div class="pagehead"><div><h2>👥 Πελάτες</h2><p>Ο προσωπικός σου ψηφιακός φάκελος πελατών.</p></div><button id="newClient" class="primary">＋ Νέος πελάτης</button></div>
 <input id="clientSearch" class="search" placeholder="🔎 Αναζήτηση ονόματος ή τηλεφώνου…">
 <div id="clientList" class="cards">${clients.length?clients.map((c,i)=>`<article class="card"><div class="cardtitle">${esc(c.name)}</div><div>${esc(c.phone||'—')} · ${esc(c.email||'—')}</div><div class="muted">Εγγραφή: ${esc(c.registered||'—')}</div><div class="actions"><button data-edit="${i}">✏️ Επεξεργασία</button><button data-delete="${i}">🗑️ Διαγραφή</button></div></article>`).join(''):'<div class="empty">Δεν υπάρχουν ακόμη πελάτες.<br>Πάτησε «＋ Νέος πελάτης» για να δημιουργήσεις τον πρώτο φάκελο.</div>'}</div></main>
 <nav class="bottom"><button data-nav="home">⌂<span>Αρχική</span></button><button data-nav="appointments">📅<span>Ραντεβού</span></button><button class="active">👥<span>Πελάτες</span></button><button data-nav="planner">✓<span>Planner</span></button><button data-nav="more">☰<span>Περισσότερα</span></button></nav>`;
 document.getElementById('homeBtn').onclick=()=>location.hash='home';
 document.getElementById('newClient').onclick=()=>form();
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>form(Number(b.dataset.edit)));
 document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{const a=load(); if(confirm('Να διαγραφεί ο φάκελος αυτού του πελάτη;')){a.splice(Number(b.dataset.delete),1);save(a);render()}});
 document.getElementById('clientSearch').oninput=e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.card').forEach(x=>x.style.display=x.textContent.toLowerCase().includes(q)?'':'none')};
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>location.hash=b.dataset.nav);
}
function form(idx=null){
 const a=load(), c=idx==null?{name:'',phone:'',email:'',registered:new Date().toISOString().slice(0,10),notes:'',tanita:'',followup:''}:a[idx];
 const wrap=document.createElement('div');wrap.className='modal';wrap.innerHTML=`<div class="modalbox"><h2>${idx==null?'＋ Νέος πελάτης':'✏️ Επεξεργασία πελάτη'}</h2><label>Ονοματεπώνυμο<input id="cname" value="${esc(c.name)}"></label><label>Τηλέφωνο<input id="cphone" value="${esc(c.phone)}" inputmode="tel"></label><label>Email<input id="cemail" value="${esc(c.email)}" type="email"></label><label>Ημερομηνία εγγραφής<input id="creg" value="${esc(c.registered)}" type="date"></label><label>Tanita / Wellness σημειώσεις<textarea id="ctanita">${esc(c.tanita)}</textarea></label><label>Follow-up<textarea id="cfollow">${esc(c.followup)}</textarea></label><label>Γενικές σημειώσεις<textarea id="cnotes">${esc(c.notes)}</textarea></label><div class="modalactions"><button id="cancel">Άκυρο</button><button id="save" class="primary">Αποθήκευση</button></div></div>`;
 document.body.appendChild(wrap); wrap.querySelector('#cancel').onclick=()=>wrap.remove(); wrap.querySelector('#save').onclick=()=>{const name=wrap.querySelector('#cname').value.trim();if(!name){alert('Γράψε πρώτα το ονοματεπώνυμο.');return}const item={name,phone:wrap.querySelector('#cphone').value.trim(),email:wrap.querySelector('#cemail').value.trim(),registered:wrap.querySelector('#creg').value,tanita:wrap.querySelector('#ctanita').value,followup:wrap.querySelector('#cfollow').value,notes:wrap.querySelector('#cnotes').value};if(idx==null)a.unshift(item);else a[idx]=item;save(a);wrap.remove();render()};
}
function boot(){if(location.hash==='#clients'){render()}}
window.addEventListener('hashchange',boot); if(location.hash==='#clients')render();
})();