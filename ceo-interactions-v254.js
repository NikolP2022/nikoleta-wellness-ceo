(()=>{
'use strict';
if(window.__NWCEO_INTERACTIONS254)return;
window.__NWCEO_INTERACTIONS254=true;

const routeMap={
  home:'',calendar:'#appointments',clients:'#clients',partners:'#partners',followups:'#followups',orders:'#orders',documents:'#documents',trips:'#trips',training:'#nw-training',academy:'#nw-academy',inventory:'#nw-inventory',reports:'#nw-reports',
  tanita:'#measurements',measurements:'#measurements',programs:'#programs',finance:'#finance',planner:'#planner',success:'#success',wellness:'#nw-wellness',marketing:'#nw-marketing'
};
const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
const go=h=>{
  if(location.hash!==h) location.hash=h;
  else window.dispatchEvent(new HashChangeEvent('hashchange'));
};
const actionFor=el=>{
  if(!el)return null;
  const key=el.dataset?.nw244||el.dataset?.v||el.dataset?.nwRoute;
  if(key&&routeMap[key]!==undefined)return {type:'route',value:routeMap[key]};
  const id=el.id||'';
  if(id==='ceo-new-appt'||id==='ceo-empty-appt'||id==='ceo-appts')return {type:'route',value:'#appointments'};
  const text=norm(el.textContent);
  if(text.includes('ραντεβού')||text.includes('ατζέντα'))return {type:'route',value:'#appointments'};
  if(text.includes('πελάτες'))return {type:'route',value:'#clients'};
  if(text.includes('συνεργάτες')||text.includes('team'))return {type:'route',value:'#partners'};
  if(text.includes('follow-up')||text.includes('follow ups')||text.includes('followups'))return {type:'route',value:'#followups'};
  if(text.includes('παραγγελί'))return {type:'route',value:'#orders'};
  if(text.includes('έγγραφα'))return {type:'route',value:'#documents'};
  if(text.includes('ταξίδια'))return {type:'route',value:'#trips'};
  if(text.includes('εκπαιδεύσεις'))return {type:'route',value:'#nw-training'};
  if(text.includes('academy'))return {type:'route',value:'#nw-academy'};
  if(text.includes('αποθήκη'))return {type:'route',value:'#nw-inventory'};
  if(text.includes('reports'))return {type:'route',value:'#nw-reports'};
  if(text.includes('tanita'))return {type:'route',value:'#measurements'};
  if(text.includes('προγράμματα'))return {type:'route',value:'#programs'};
  if(text.includes('οικονομικά'))return {type:'route',value:'#finance'};
  if(text.includes('planner'))return {type:'route',value:'#planner'};
  if(text.includes('daily success'))return {type:'route',value:'#success'};
  if(text.includes('wellness touch point'))return {type:'route',value:'#nw-wellness'};
  if(text.includes('marketing'))return {type:'route',value:'#nw-marketing'};
  if(text.includes('ήχος')||text.includes('ειδοποιήσεις'))return {type:'click',selector:'#bell'};
  if(text.includes('λογαριασμός'))return {type:'click',selector:'#login'};
  if(text.includes('αρχική')||text==='home')return {type:'route',value:''};
  return null;
};

const handle=e=>{
  const t=e.target?.closest?.('button,a,[role="button"]');
  if(!t)return;
  const inHome=!!t.closest('.ceo-home');
  const inMenu=!!t.closest('#menu,#nw244-menu,#nw233-menu,#nw234-menu');
  if(!inHome&&!inMenu)return;
  if(t.classList.contains('ceo-menu-dot')||t.id==='ceo-hamb')return;
  const a=actionFor(t);
  if(!a)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if(a.type==='route'){
    if(inMenu) document.getElementById('menu')?.classList.remove('open');
    go(a.value);
  }else if(a.type==='click'){
    document.querySelector(a.selector)?.click();
  }
};

document.addEventListener('click',handle,true);

const enhance=()=>{
  document.querySelectorAll('.ceo-home button,#menu button,#menu a,[role="button"]').forEach(el=>{
    if(el.classList.contains('ceo-menu-dot')||el.id==='ceo-hamb')return;
    if(actionFor(el)){
      el.style.cursor='pointer';
      el.setAttribute('data-functional','true');
    }
  });
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);
else enhance();
new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>setTimeout(enhance,30));
})();
