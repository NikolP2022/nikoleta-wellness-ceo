(()=>{
'use strict';
if(window.__NWCEO_FORM_STABILITY_174)return;window.__NWCEO_FORM_STABILITY_174=1;
const norm=s=>String(s??'').trim().replace(/\s+/g,' ').toLocaleLowerCase('el-GR');
const clients=()=>Array.isArray(window.__crudClients)?window.__crudClients:[];
const resolve=v=>{const s=String(v??'').trim();if(!s)return '';if(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s))return s;return clients().find(c=>norm(c.name)===norm(s))?.id||''};
function patch(form){
 if(!form||form.dataset.stable174)return;
 const fields=[...form.querySelectorAll('select[name="client_id"],input[name="client_id"]')];
 for(const old of fields){
  if(old.dataset.clientStable174)return;
  const wrap=old.closest('label');
  const currentId=old.value||'';
  let currentName='';
  if(old.tagName==='SELECT') currentName=old.options[old.selectedIndex]?.textContent?.trim()||'';
  else currentName=old.value||'';
  if(currentName==='— χωρίς πελάτη —'||currentName==='...')currentName='';
  const input=document.createElement('input');
  input.type='text'; input.name='client_name'; input.value=currentName; input.placeholder='Γράψε το όνομα του πελάτη'; input.autocomplete='name'; input.className=old.className; input.setAttribute('list','nw-client-list-174'); input.dataset.clientStable174='1';
  const hidden=document.createElement('input'); hidden.type='hidden'; hidden.name='client_id'; hidden.value=currentId||resolve(currentName); hidden.dataset.clientStable174='1';
  old.replaceWith(input); form.appendChild(hidden);
  const sync=()=>{hidden.value=resolve(input.value)};
  input.addEventListener('input',sync); input.addEventListener('change',sync); input.addEventListener('blur',sync);
  if(wrap)wrap.insertBefore(input,wrap.firstChild===old?input:wrap.firstChild);
 }
 let dl=document.getElementById('nw-client-list-174');
 if(!dl){dl=document.createElement('datalist');dl.id='nw-client-list-174';document.body.appendChild(dl)}
 dl.innerHTML=clients().filter(c=>c?.name).map(c=>`<option value="${String(c.name).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}"></option>`).join('');
 form.dataset.stable174='1';
}
function patchAll(){document.querySelectorAll('.crud-modal .crud-box form').forEach(patch)}
function afterUI(){setTimeout(patchAll,0);setTimeout(patchAll,80)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterUI);else afterUI();
document.addEventListener('click',afterUI,true);
document.addEventListener('submit',e=>{const form=e.target?.closest?.('.crud-modal .crud-box form');if(!form)return;const visible=form.querySelector('input[name="client_name"]');const hidden=form.querySelector('input[name="client_id"]');if(visible&&hidden)hidden.value=resolve(visible.value);},true);
})();
