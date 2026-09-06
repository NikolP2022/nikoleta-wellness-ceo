(()=>{
'use strict';
if(window.__NWCEO_FORM_STABILITY_173)return;window.__NWCEO_FORM_STABILITY_173=1;
const PREFIX='nwceo:draft:v173:';
let seq=0;
const esc=s=>String(s??'');
function keyFor(form){
 const modal=form?.closest('.crud-modal');
 const title=modal?.querySelector('.crud-head h2')?.textContent?.trim()||'form';
 const m=title.match(/·\s*(.*)$/); const section=(m?.[1]||title).replace(/[^\p{L}\p{N}]+/gu,'_').slice(0,80);
 const edit=/Επεξεργασία/i.test(title);
 const row=modal?.querySelector('[data-row-id]')?.getAttribute('data-row-id')||'';
 return PREFIX+section+':'+(edit?'edit:'+row:'new');
}
function snapshot(form){
 const out={};
 form.querySelectorAll('input[name],select[name],textarea[name]').forEach(el=>{
   if(el.type==='checkbox')out[el.name]={type:'checkbox',value:!!el.checked};
   else out[el.name]={type:el.type||'text',value:el.value??''};
 });
 return out;
}
function restore(form){
 const key=keyFor(form),raw=sessionStorage.getItem(key); if(!raw)return;
 let data;try{data=JSON.parse(raw)}catch{return}
 for(const [name,v] of Object.entries(data||{})){
   const el=form.elements[name]; if(!el)continue;
   if(v?.type==='checkbox')el.checked=!!v.value; else if(typeof v?.value==='string')el.value=v.value;
 }
}
function save(form){try{sessionStorage.setItem(keyFor(form),JSON.stringify(snapshot(form)))}catch{}}
function clear(form){try{sessionStorage.removeItem(keyFor(form))}catch{}}
function attach(form){
 if(!form||form.dataset.draft173)return; form.dataset.draft173='1';
 restore(form);
 const handler=()=>save(form);
 form.addEventListener('input',handler,true);
 form.addEventListener('change',handler,true);
 form.addEventListener('blur',handler,true);
 form.addEventListener('submit',()=>{
   try{sessionStorage.setItem(PREFIX+'pending-reload','1')}catch{}
 },true);
}
function scan(){document.querySelectorAll('.crud-modal .crud-box form').forEach(attach)}
if(sessionStorage.getItem(PREFIX+'pending-reload')==='1'){
 try{sessionStorage.removeItem(PREFIX+'pending-reload');for(const k of Object.keys(sessionStorage))if(k.startsWith(PREFIX)&&k!==(PREFIX+'pending-reload'))sessionStorage.removeItem(k)}catch{}
}
scan();
new MutationObserver(()=>scan()).observe(document.body,{childList:true,subtree:true});
window.addEventListener('pagehide',()=>{document.querySelectorAll('.crud-modal .crud-box form').forEach(save)});
})();
