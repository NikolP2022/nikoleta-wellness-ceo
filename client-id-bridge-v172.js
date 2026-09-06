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
// IMPORTANT: never replace the visible client name with the UUID while the user is typing.
// The visible field stays as the name. Only the value presented to the existing CRUD handler
// is temporarily converted at submit time.
document.addEventListener('submit',e=>{
 const form=e.target;
 if(!isCrudForm(form))return;
 const fields=[...form.querySelectorAll('input[name="client_id"],select[name="client_id"]')];
 for(const el of fields){
   if(el.dataset.clientBridgeBusy==='1')continue;
   const uuid=resolve(el.value);
   if(!uuid)continue;
   const original=el.value;
   el.dataset.clientBridgeBusy='1';
   el.value=uuid;
   setTimeout(()=>{el.value=original;delete el.dataset.clientBridgeBusy},0);
 }
},true);
})();
