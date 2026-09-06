(()=>{
'use strict';
if(window.__NWCEO_FORM_STABILITY_175)return;
window.__NWCEO_FORM_STABILITY_175=1;
const norm=s=>String(s??'').trim().replace(/\s+/g,' ').toLocaleLowerCase('el-GR');
const clients=()=>Array.isArray(window.__crudClients)?window.__crudClients:[];
const resolve=v=>{const s=String(v??'').trim();if(!s)return '';if(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s))return s;return clients().find(c=>norm(c.name)===norm(s))?.id||''};
const draftKey=form=>`nwceo-draft-175-${form.querySelector('h2')?.textContent||'form'}`;
function saveDraft(form){const data={};form.querySelectorAll('input,select,textarea').forEach(el=>{if(el.name&&el.type!=='button'&&el.type!=='submit')data[el.name]=el.value});try{sessionStorage.setItem(draftKey(form),JSON.stringify(data))}catch{}}
function restoreDraft(form){try{const raw=sessionStorage.getItem(draftKey(form));if(!raw)return;const data=JSON.parse(raw);Object.entries(data).forEach(([name,value])=>{const el=form.querySelector(`[name="${CSS.escape(name)}"]`);if(el&&(!el.value||el.value!==value))el.value=value})}catch{}}
function clearDraft(form){try{sessionStorage.removeItem(draftKey(form))}catch{}}
function patch(form){
 if(!form||form.dataset.stable175)return;
 const fields=[...form.querySelectorAll('select[name="client_id"],input[name="client_id"]')];
 for(const old of fields){
  if(old.dataset.clientStable175)continue;
  const currentId=old.value||'';
  let currentName='';
  if(old.tagName==='SELECT')currentName=old.options[old.selectedIndex]?.textContent?.trim()||'';
  else currentName=old.value||'';
  if(currentName==='— χωρίς πελάτη —'||currentName==='...')currentName='';
  const input=document.createElement('input');
  input.type='text';input.name='client_name';input.value=currentName;input.placeholder='Γράψε το όνομα του πελάτη';input.autocomplete='name';input.className=old.className;input.setAttribute('list','nw-client-list-175');input.dataset.clientStable175='1';
  const hidden=document.createElement('input');hidden.type='hidden';hidden.name='client_id';hidden.value=currentId||resolve(currentName);hidden.dataset.clientStable175='1';
  old.replaceWith(input);form.appendChild(hidden);
  const sync=()=>{hidden.value=resolve(input.value);saveDraft(form)};
  input.addEventListener('input',sync);input.addEventListener('change',sync);input.addEventListener('blur',sync);
 }
 let dl=document.getElementById('nw-client-list-175');
 if(!dl){dl=document.createElement('datalist');dl.id='nw-client-list-175';document.body.appendChild(dl)}
 dl.innerHTML=clients().filter(c=>c?.name).map(c=>`<option value="${String(c.name).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}"></option>`).join('');
 form.querySelectorAll('input,select,textarea').forEach(el=>{if(el.name&&!el.dataset.draft175){el.dataset.draft175='1';el.addEventListener('input',()=>saveDraft(form));el.addEventListener('change',()=>saveDraft(form))}});
 form.dataset.stable175='1';
 restoreDraft(form);
}
function scan(root=document){root.querySelectorAll?.('.modal form#f').forEach(patch)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>scan());else scan();
const observer=new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches?.('.modal form#f'))patch(n);scan(n)}});
observer.observe(document.body,{childList:true,subtree:true});
document.addEventListener('submit',e=>{const form=e.target?.closest?.('.modal form#f');if(!form)return;const visible=form.querySelector('input[name="client_name"]');const hidden=form.querySelector('input[name="client_id"]');if(visible&&hidden)hidden.value=resolve(visible.value);saveDraft(form)},true);
document.addEventListener('click',e=>{const close=e.target.closest?.('[data-close]');if(close){const form=close.closest('.modal form#f');if(form)clearDraft(form)}},true);
})();
