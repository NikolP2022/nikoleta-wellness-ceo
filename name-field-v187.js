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
function scan(root=document){root.querySelectorAll?.('.ap130-modal').forEach(cleanNewAppointment)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
new MutationObserver(()=>scan()).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>setTimeout(scan,0));
})();
