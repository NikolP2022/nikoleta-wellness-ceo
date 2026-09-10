(()=>{
'use strict';
if(window.__NWCEO254)return;window.__NWCEO254=true;
const routes={
 'Ραντεβού':'#appointments','📅 Ραντεβού':'#appointments','ραντεβού':'#appointments',
 'Πελάτες':'#clients','👥 Πελάτες':'#clients','πελάτες':'#clients',
 'Follow-ups':'#followups','📞 Follow-ups':'#followups','follow-ups':'#followups',
 'Παραγγελίες':'#orders','🛒 Παραγγελίες':'#orders','orders':'#orders',
 'Συνεργάτες':'#partners','🤝 Συνεργάτες':'#partners',
 'Έγγραφα':'#documents','📄 Έγγραφα':'#documents',
 'Ταξίδια':'#trips','✈️ Ταξίδια':'#trips',
 'Εκπαιδεύσεις':'#nw-training','📚 Εκπαιδεύσεις':'#nw-training',
 'Αποθήκη':'#nw-inventory','📦 Αποθήκη':'#nw-inventory',
 'Reports':'#nw-reports','📊 Reports':'#nw-reports'
};
const go=h=>{if(location.hash!==h){location.hash=h}else{window.dispatchEvent(new HashChangeEvent('hashchange'))}};
function openMenu(){
 let m=document.getElementById('nw254-menu');
 if(m){m.remove();return}
 m=document.createElement('div');m.id='nw254-menu';
 m.innerHTML=`<div class="nw254-backdrop"></div><aside class="nw254-panel"><button class="nw254-close">×</button><div class="nw254-title">Nikoleta Wellness CEO</div><div class="nw254-sub">Wellness Touch Point</div><div class="nw254-list"></div></aside>`;
 const list=m.querySelector('.nw254-list');
 Object.entries(routes).filter(([k])=>!k.includes('📅')&&!k.includes('👥')&&!k.includes('📞')&&!k.includes('🛒')&&!k.includes('🤝')&&!k.includes('📄')&&!k.includes('✈️')&&!k.includes('📚')&&!k.includes('📦')&&!k.includes('📊')&&!['Ραντεβού','Πελάτες','Follow-ups','Παραγγελίες','Συνεργάτες','Έγγραφα','Ταξίδια','Εκπαιδεύσεις','Αποθήκη','Reports'].includes(k)).forEach(()=>{});
 const items=[['📅','Ραντεβού','#appointments'],['👥','Πελάτες','#clients'],['📞','Follow-ups','#followups'],['🤝','Συνεργάτες','#partners'],['🛒','Παραγγελίες','#orders'],['📄','Έγγραφα','#documents'],['✈️','Ταξίδια','#trips'],['📚','Εκπαιδεύσεις','#nw-training'],['📦','Αποθήκη','#nw-inventory'],['📊','Reports','#nw-reports']];
 items.forEach(([icon,label,hash])=>{const b=document.createElement('button');b.type='button';b.className='nw254-item';b.innerHTML=`<span>${icon}</span><b>${label}</b><i>›</i>`;b.onclick=e=>{e.preventDefault();e.stopPropagation();m.remove();go(hash)};list.appendChild(b)});
 document.body.appendChild(m);m.querySelector('.nw254-close').onclick=()=>m.remove();m.querySelector('.nw254-backdrop').onclick=()=>m.remove();
}
const css=document.createElement('style');css.textContent=`#nw254-menu{position:fixed;inset:0;z-index:2147483000}.nw254-backdrop{position:absolute;inset:0;background:#0007}.nw254-panel{position:absolute;left:0;top:0;bottom:0;width:min(360px,88vw);background:#fffdf8;padding:26px 18px;box-shadow:20px 0 60px #0005;overflow:auto}.nw254-close{position:absolute;right:14px;top:10px;border:0;background:none;font-size:32px;color:#245b2b;cursor:pointer}.nw254-title{font:800 24px Georgia,serif;color:#245b2b;margin-top:22px}.nw254-sub{color:#8b7b55;margin:4px 0 22px}.nw254-list{display:grid;gap:9px}.nw254-item{display:grid;grid-template-columns:34px 1fr 24px;align-items:center;text-align:left;width:100%;padding:15px;border:1px solid #e3e0d5;border-radius:15px;background:white;color:#245b2b;cursor:pointer;font-size:16px}.nw254-item span{font-size:21px}.nw254-item i{font-size:24px;font-style:normal}.ceo-menu-dot,.ceo-quick button,.ceo-event,.ceo-maincard,.ceo-date,.ceo-motto{cursor:pointer!important}`;document.head.appendChild(css);
function targetFor(el){
 const text=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
 if(text.includes('ραντεβού'))return '#appointments';
 if(text.includes('πελάτες'))return '#clients';
 if(text.includes('follow'))return '#followups';
 if(text.includes('παραγγε'))return '#orders';
 if(text.includes('συνεργά'))return '#partners';
 if(text.includes('έγγρα'))return '#documents';
 if(text.includes('ταξίδ'))return '#trips';
 if(text.includes('εκπαιδε'))return '#nw-training';
 if(text.includes('αποθήκ'))return '#nw-inventory';
 if(text.includes('report'))return '#nw-reports';
 return null;
}
document.addEventListener('click',e=>{
 const el=e.target.closest?.('.ceo-menu-dot,.ceo-quick button,.ceo-event,.ceo-maincard,[data-v],#ceo-appts,#ceo-new-appt,#ceo-empty-appt');
 if(!el)return;
 if(el.classList.contains('ceo-menu-dot')){e.preventDefault();e.stopImmediatePropagation();openMenu();return}
 const r=targetFor(el)||({clients:'#clients',followups:'#followups',appointments:'#appointments'}[el.dataset?.v]||null);
 if(r){e.preventDefault();e.stopImmediatePropagation();go(r)}
},true);
})();
