(()=>{
'use strict';
if(window.__NWCEO_CLIENT_ID_BRIDGE_172)return;window.__NWCEO_CLIENT_ID_BRIDGE_172=1;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const norm=s=>String(s??'').trim().replace(/\s+/g,' ').toLocaleLowerCase('el-GR');
function clients(){return Array.isArray(window.__crudClients)?window.__crudClients:[]}
function resolve(value){
 const s=String(value??'').trim();
 if(!s)return null;
 if(UUID.test(s))return s;
 const hit=clients().find(c=>norm(c.name)===norm(s));
 return hit?.id||null;
}
function isCrudForm(form){return !!form?.closest?.('.crud-box')}
function prepare(form){
 if(!isCrudForm(form))return;
 const fields=[...form.querySelectorAll('input[name="client_id"],select[name="client_id"]')];
 for(const el of fields){
   const uuid=resolve(el.value);
   if(el.tagName==='SELECT'){
     el.value=uuid||'';
   }else if(el.type==='text'){
     el.value=uuid||'';
   }
 }
}
// Generic CRUD forms use UUID foreign keys. The visible client-name field may contain Greek text;
// convert it to the real client UUID immediately before the CRUD handler reads FormData.
document.addEventListener('submit',e=>prepare(e.target),true);
// Safety net for forms opened after navigation.
const scan=()=>document.querySelectorAll('.crud-box form').forEach(f=>{
  const i=f.querySelector('input[name="client_id"]');
  if(i&&!UUID.test(i.value||'')){
    const uuid=resolve(i.value);
    if(uuid)i.dataset.resolvedClientId=uuid;
  }
});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
new MutationObserver(scan).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
})();
