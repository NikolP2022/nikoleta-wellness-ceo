(()=>{
'use strict';
if(window.__NWCEO_FORM_GUARD_178)return;
window.__NWCEO_FORM_GUARD_178=1;
const KEY='nwceo-form-draft-178';
let writing=false;
function formKey(form){
  return String(form?.querySelector('h2')?.textContent||form?.getAttribute('data-form')||'form').trim();
}
function fields(form){
  const out={};
  form.querySelectorAll('input,select,textarea').forEach(el=>{
    if(!el.name||el.type==='button'||el.type==='submit')return;
    if(el.type==='checkbox'||el.type==='radio') out[el.name]={v:el.value,c:el.checked,t:el.type};
    else out[el.name]={v:el.value,t:el.type};
  });
  return out;
}
function store(form){
  if(writing)return;
  try{
    const all=JSON.parse(sessionStorage.getItem(KEY)||'{}');
    all[formKey(form)]={time:Date.now(),fields:fields(form)};
    sessionStorage.setItem(KEY,JSON.stringify(all));
  }catch{}
}
function restore(form){
  try{
    const all=JSON.parse(sessionStorage.getItem(KEY)||'{}');
    const d=all[formKey(form)];
    if(!d||!d.fields)return;
    writing=true;
    Object.entries(d.fields).forEach(([name,x])=>{
      const el=form.querySelector(`[name="${CSS.escape(name)}"]`);
      if(!el)return;
      if(x.t==='checkbox'||x.t==='radio')el.checked=!!x.c;
      else if((el.value===''||el.value===null)&&x.v!=='')el.value=x.v;
    });
    writing=false;
  }catch{writing=false}
}
function attach(form){
  if(!form||form.dataset.guard178)return;
  form.dataset.guard178='1';
  restore(form);
  form.addEventListener('input',()=>store(form),true);
  form.addEventListener('change',()=>store(form),true);
}
function scan(root=document){
  if(root.matches?.('.modal form#f'))attach(root);
  root.querySelectorAll?.('.modal form#f').forEach(attach);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan());else scan();
new MutationObserver(records=>{
  for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)scan(n);
}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('input',e=>{const f=e.target?.closest?.('.modal form#f');if(f)store(f)},true);
document.addEventListener('change',e=>{const f=e.target?.closest?.('.modal form#f');if(f)store(f)},true);
document.addEventListener('submit',e=>{const f=e.target?.closest?.('.modal form#f');if(f)restore(f)},true);
window.addEventListener('beforeunload',()=>{document.querySelectorAll('.modal form#f').forEach(store)});
})();
