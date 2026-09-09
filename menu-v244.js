(()=>{
'use strict';
if(window.__NWCEO_MENU244)return;
window.__NWCEO_MENU244=true;
const $=(s,r=document)=>r.querySelector(s);
const go=h=>{if(location.hash!==h)location.hash=h;else window.dispatchEvent(new HashChangeEvent('hashchange'))};
const keep=[
 ['calendar','📅 Ραντεβού','#appointments'],
 ['clients','👥 Πελάτες','#clients'],
 ['partners','🤝 Συνεργάτες','#partners'],
 ['followups','📞 Follow-ups','#followups'],
 ['orders','🛒 Παραγγελίες','#orders'],
 ['documents','📄 Έγγραφα','#documents'],
 ['trips','✈️ Ταξίδια','#trips'],
 ['training','📚 Εκπαιδεύσεις','#nw-training'],
 ['academy','🎓 Academy','#nw-academy'],
 ['inventory','📦 Αποθήκη','#nw-inventory'],
 ['reports','📊 Reports','#nw-reports'],
 ['sound','🔊 Ήχος & Ειδοποιήσεις',null],
 ['account','👤 Λογαριασμός',null]
];
const removeText=['tanita','⚖️ tanita','προγράμματα','🥤 προγράμματα','οικονομικά','💰 οικονομικά','planner','📋 planner','daily success','🏆 daily success','wellness touch point','🌿 wellness touch point','marketing','📣 marketing'];
const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
const forbidden=v=>removeText.some(x=>norm(v).includes(norm(x)));
const css=document.createElement('style');
css.textContent=`#nw244-menu{padding:8px 0 18px}#nw244-menu .nw244-title{font-size:11px;font-weight:900;letter-spacing:.08em;color:#78917c;padding:8px 12px}#nw244-menu button{display:block;width:100%;text-align:left;margin:4px 0;padding:11px 12px;border:0;border-radius:12px;background:transparent;color:#203322;font-weight:800;cursor:pointer;font:inherit}#nw244-menu button:hover{background:#eef6ec}`;
document.head.appendChild(css);
function cleanOld(menu){menu.querySelectorAll('#nw240-menu,#nw234-menu,.nw233-menu,.nw231-added').forEach(x=>x.style.display='none');menu.querySelectorAll('button,a,[role="button"]').forEach(el=>{if(forbidden(el.textContent))el.remove()});}
function install(){
 const menu=$('#menu');if(!menu)return false;
 cleanOld(menu);
 let box=$('#nw244-menu',menu);
 if(!box){
  box=document.createElement('div');box.id='nw244-menu';
  const title=document.createElement('div');title.className='nw244-title';title.textContent='⭐ ΚΥΡΙΕΣ ΕΝΟΤΗΤΕΣ';box.appendChild(title);
  keep.forEach(([key,label,route])=>{
   const b=document.createElement('button');b.type='button';b.dataset.nw244=key;b.textContent=label;
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
 const run=()=>{if(install())return;if(++tries<40)setTimeout(run,100)};
 run();
 const mo=new MutationObserver(()=>{const menu=$('#menu');if(menu){cleanOld(menu);if(!$('#nw244-menu',menu))install()}});
 mo.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('hashchange',()=>setTimeout(install,20));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
