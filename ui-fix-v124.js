(()=>{'use strict';
const routes={
 'Σήμερα':'calendar','Πελάτες':'clients','Συνεργάτες':'partners','Καθαρό':'finance'
};
function go(v){const b=[...document.querySelectorAll('[data-v]')].find(x=>x.getAttribute('data-v')===v);if(b)b.click();else if(typeof window.render==='function'){try{window.view=v;window.render()}catch(e){}}}
function fixHome(){
 const main=document.querySelector('main'); if(!main)return;
 const h=main.querySelector('h1'); if(!h||!h.textContent.includes('Καλώς'))return;
 const cards=[...main.querySelectorAll('.stats article')];
 cards.forEach(card=>{const text=card.textContent.trim();const key=Object.keys(routes).find(k=>text.includes(k));if(!key)return;card.setAttribute('role','button');card.tabIndex=0;card.style.cursor='pointer';card.title='Άνοιγμα '+key;card.onclick=()=>go(routes[key]);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go(routes[key])}}});
}
function removeDuplicateNewButtons(){
 const groups=new Map();
 document.querySelectorAll('button[data-new]').forEach(b=>{const label=b.textContent.trim();const parent=b.closest('section')||b.parentElement;const key=parent+'|'+label;if(!groups.has(key))groups.set(key,b);else b.remove()});
 // Tanita/list pages: if the original and overlay both say the same thing, keep only one visible button.
 const seen=new Map();
 document.querySelectorAll('button').forEach(b=>{const t=b.textContent.trim();if(!t||!/^＋\s*Νέα εγγραφή$/.test(t))return;const sec=b.closest('section')||b.parentElement;if(seen.has(sec)){b.remove()}else seen.set(sec,b)});
}
function markPageCards(){
 // Make list cards actionable without changing their existing content.
 document.querySelectorAll('.rowcard').forEach(card=>{
   if(card.dataset.ui124)return;
   const edit=card.querySelector('[data-edit]');
   const del=card.querySelector('[data-delete]');
   const open=card.querySelector('[data-client]');
   if(edit||del||open)return;
   const heading=document.querySelector('main h1')?.textContent||'';
   const map=heading.includes('Συνεργάτες')?'partners':heading.includes('Tanita')?'measurements':heading.includes('Προγράμματα')?'programs':heading.includes('Follow-ups')?'followups':heading.includes('Παραγγελίες')?'orders':heading.includes('Οικονομικά')?'finance':heading.includes('Planner')?'tasks':heading.includes('Daily Success')?'success':heading.includes('Έγγραφα')?'documents':heading.includes('Ταξίδια')?'trips':null;
   if(!map)return;
   card.dataset.ui124='1'; card.style.cursor='pointer'; card.title='Άνοιγμα / επεξεργασία';
   card.addEventListener('click',e=>{if(e.target.closest('button,input,a,textarea,select'))return;const btn=card.querySelector(`button[data-edit],button[data-open],button[data-client],button[data-new]`);if(btn)btn.click()});
 });
}
function run(){removeDuplicateNewButtons();fixHome();markPageCards()}
new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
setTimeout(run,300);setInterval(run,1200);
})();
