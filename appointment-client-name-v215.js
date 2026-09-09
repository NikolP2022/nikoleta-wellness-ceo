(()=>{
'use strict';
if(window.__NWCEO_CLIENTNAME215)return;window.__NWCEO_CLIENTNAME215=1;
function fix(root=document){
  const forms=root.querySelectorAll?.('#ap130-form')||[];
  forms.forEach(form=>{
    const modal=form.closest('.ap130-modal');
    let name=form.querySelector('input[name="client_name"]');
    const hidden=form.querySelector('input[name="client_id"]');
    if(!name)return;
    // Keep the field as a normal editable text input on every device.
    name.disabled=false;
    name.readOnly=false;
    name.removeAttribute('disabled');
    name.removeAttribute('readonly');
    name.removeAttribute('aria-disabled');
    name.removeAttribute('tabindex');
    name.type='text';
    name.placeholder='Γράψε το όνομα του πελάτη';
    name.autocomplete='name';
    // New registration: always start with an empty customer name.
    if(!modal?.dataset?.id && !form.dataset.nw215New){
      name.value='';
      if(hidden)hidden.value='';
      form.dataset.nw215New='1';
    }
    if(!name.dataset.nw215Bound){
      name.dataset.nw215Bound='1';
      const clearClientId=()=>{if(hidden)hidden.value=''};
      name.addEventListener('input',clearClientId,false);
      name.addEventListener('change',clearClientId,false);
    }
  });
}
function scan(){fix(document)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
new MutationObserver(muts=>muts.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)fix(n)}))).observe(document.body,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>setTimeout(scan,0));
})();
