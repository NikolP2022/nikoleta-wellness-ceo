(()=>{'use strict';
const app=()=>document.getElementById('app');
const euro=v=>Number(v||0).toLocaleString('el-GR',{style:'currency',currency:'EUR'});
async function load(){
 const h=app(); if(!h)return;
 h.innerHTML=`<section class="reports-premium page"><div class="reports-hero"><div><div class="eyebrow">👑 CEO BUSINESS INTELLIGENCE</div><h1>📊 Αναφορές & Στατιστικά</h1><p>Μια καθαρή εικόνα της επιχείρησής σου, συγκεντρωμένη σε ένα σημείο.</p></div><button id="reportsRefresh" class="primary">🔄 Ανανέωση στοιχείων</button></div><div class="reports-cards"><article><span>💰</span><small>Έσοδα</small><b id="repIncome">—</b></article><article><span>🔻</span><small>Έξοδα</small><b id="repExpense">—</b></article><article><span>✨</span><small>Καθαρό αποτέλεσμα</small><b id="repNet">—</b></article><article><span>🛒</span><small>Παραγγελίες</small><b id="repOrders">—</b></article></div><div class="reports-grid"><article class="reports-panel"><div class="panel-title"><span>📈</span><h2>Επισκόπηση επιχείρησης</h2></div><div class="bar-chart"><div><label>Έσοδα</label><i id="barIncome"></i></div><div><label>Έξοδα</label><i id="barExpense"></i></div><div><label>Καθαρό</label><i id="barNet"></i></div></div></article><article class="reports-panel"><div class="panel-title"><span>👥</span><h2>Βασικοί δείκτες</h2></div><div class="mini-stats"><div><b id="repClients">—</b><span>Πελάτες</span></div><div><b id="repPartners">—</b><span>Συνεργάτες</span></div><div><b id="repAppointments">—</b><span>Ραντεβού</span></div><div><b id="repInventory">—</b><span>Προϊόντα αποθήκης</span></div></div></article></div></section>`;
 document.getElementById('reportsRefresh').onclick=load;
 try{
  const sb=window.NWDB; if(!sb)return; const u=(await sb.auth.getUser()).data?.user; if(!u)return;
  const q=async t=>{try{return (await sb.from(t).select('*').eq('user_id',u.id)).data||[]}catch(e){return[]}};
  const [finance,orders,clients,partners,appointments,inventory]=await Promise.all([q('finance'),q('orders'),q('clients'),q('partners'),q('appointments'),q('inventory')]);
  let income=0,expense=0; finance.forEach(x=>{const amount=Number(x.amount||x.total||x.value||0);const type=String(x.type||x.category||x.kind||'').toLowerCase();if(type.includes('expense')||type.includes('έξο')||type.includes('δαπάν'))expense+=amount;else income+=amount});
  if(!finance.length)orders.forEach(x=>income+=Number(x.total||x.amount||0)); const net=income-expense,max=Math.max(income,expense,Math.abs(net),1);
  repIncome.textContent=euro(income);repExpense.textContent=euro(expense);repNet.textContent=euro(net);repOrders.textContent=orders.length;repClients.textContent=clients.length;repPartners.textContent=partners.length;repAppointments.textContent=appointments.length;repInventory.textContent=inventory.length;
  barIncome.style.width=Math.max(4,income/max*100)+'%';barExpense.style.width=Math.max(4,expense/max*100)+'%';barNet.style.width=Math.max(4,Math.abs(net)/max*100)+'%';
 }catch(e){console.warn(e)}
}
function maybe(){if(location.hash==='#reports')load()} window.addEventListener('hashchange',maybe);window.addEventListener('load',maybe);maybe();
})();
