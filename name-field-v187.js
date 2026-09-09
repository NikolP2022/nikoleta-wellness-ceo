(()=>{
'use strict';
if(window.__NWCEO_NAME187)return;window.__NWCEO_NAME187=1;
function cleanNewAppointment(m){
  const form=m.querySelector('#ap130-form');if(!form)return;
  const heading=m.querySelector('.crud-head h2')?.textContent||'';
  if(!heading.includes('Νέο ραντεβού'))return;
  const name=form.elements.client_name,id=form.elements.client_id;
  if(name){name.value='';name.placeholder='Γράψε το όνομα του πελάτη';}
  if(id)id.value='';
}
function cleanNewClient(m){
  const form=m.querySelector('form');if(!form)return;
  const heading=m.querySelector('h2')?.textContent||'';
  if(!heading.includes('Νέος πελάτης'))return;
  const name=form.elements.name;
  if(name){name.value='';name.placeholder='Γράψε το όνομα του πελάτη';name.removeAttribute('value');}
}
function scan(root=document){
  root.querySelectorAll?.('.ap130-modal,.nw218 .modal,.nw186-modal,.crud-modal').forEach(m=>{cleanNewAppointment(m);cleanNewClient(m)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
new MutationObserver(()=>scan()).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>setTimeout(scan,0));
})();
