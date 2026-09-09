(()=>{
'use strict';
if(window.__NWCEO_MENU240)return;
window.__NWCEO_MENU240=true;
const $=(s,r=document)=>r.querySelector(s);
const go=h=>{if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'))};
const items=[
 ['calendar','📅 Ραντεβού','#appointments'],
 ['clients','👥 Πελάτες','#clients'],
 ['partners','🤝 Συνεργάτες','#partners'],
 ['followups','📞 Follow-ups','#followups'],
 ['orders','🛒 Παραγγελίες','#orders'],
 ['documents','📄 Έγγραφα','#documents'],
 ['trips','✈️ Ταξίδια','#trips'],
 ['training','📚 Εκπαιδεύσεις','#nw-training'],
 ['inventory','📦 Αποθήκη','#nw-inventory'],
 ['reports','📊 Reports','#nw-reports'],
 ['sound','🔊 Ήχος και Ειδοποιήσεις',null],
 ['account','👤 Λογαριασμός',null]
];
const css=document.createElement('style');
css.textContent=`#nw240-menu{padding:8px 0 18px}#nw240-menu .nw240-title{font-size:11px;font-weight:900;letter-spacing:.08em;color:#78917c;padding:8px 12px}#nw240-menu button{display:block;width:100%;text-align:left;margin:4px 0;padding:11px 12px;border:0;border-radius:12px;background:transparent;color:#203322;font-weight:800;cursor:pointer;font:inherit}#nw240-menu button:hover{background:#eef6ec}`;
document.head.appendChild(css);
function hideOld(menu){menu.querySelectorAll('#nw234-menu,.nw233-menu,.nw231-added').forEach(x=>{if(x.id!=='nw240-menu')x.style.display='none'});}
function install(){
 const menu=$('#menu');if(!menu)return false;
 hideOld(menu);
 let box=$('#nw240-menu',menu);
 if(!box){
  box=document.createElement('div');box.id='nw240-menu';
  const title=document.createElement('div');title.className='nw240-title';title.textContent='⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ';box.appendChild(title);
  items.forEach(([key,label,route])=>{
   const b=document.createElement('button');b.type='button';b.dataset.nw240=key;b.textContent=label;
   b.addEventListener('click',()=>{
    if(route){go(route);return;}
    if(key==='sound'){$('#bell')?.click();return;}
    if(key==='account'){$('#login')?.click();return;}
   });
   box.appendChild(b);
  });
  menu.appendChild(box);
 }
 return true;
}
function start(){
 let tries=0;
 const run=()=>{if(install())return;if(++tries<30)setTimeout(run,100)};
 run();
 const mo=new MutationObserver(()=>{const menu=$('#menu');if(menu){hideOld(menu);if(!$('#nw240-menu',menu))install()}});
 mo.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
