(()=>{
'use strict';
if(window.__NWCEO_CLIENT_NAME_171)return;window.__NWCEO_CLIENT_NAME_171=1;
const listId='nw-client-name-list-171';
function clients(){return Array.isArray(window.data?.clients)?window.data.clients:[]}
function installList(){let dl=document.getElementById(listId);if(!dl){dl=document.createElement('datalist');dl.id=listId;document.body.appendChild(dl)}dl.innerHTML=clients().map(c=>`<option value="${String(c.name||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}"></option>`).join('');return dl}
function replace(){const dl=installList();document.querySelectorAll('select[name="client_id"]').forEach(sel=>{
 if(sel.dataset.clientName171)return;
 const label=sel.closest('label');const text=label?.textContent||'';
 if(!/πελάτη|client/i.test(text))return;
 const input=document.createElement('input');input.type='text';input.name='client_id';input.placeholder='Γράψε το όνομα του πελάτη';input.autocomplete='name';input.setAttribute('list',listId);input.setAttribute('enterkeyhint','done');input.value=sel.options[sel.selectedIndex]?.text==='...'?'':(sel.options[sel.selectedIndex]?.text||'');
 input.className=sel.className;input.dataset.clientName171='1';
 sel.replaceWith(input);
 });
 document.querySelectorAll('input[name="client_id"]').forEach(i=>{i.placeholder=i.placeholder||'Γράψε το όνομα του πελάτη';i.autocomplete='name';i.setAttribute('list',listId);});
}
function refresh(){installList();replace()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh);else refresh();
new MutationObserver(refresh).observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
document.addEventListener('focusin',e=>{const i=e.target?.closest?.('input[name="client_id"]');if(i){installList();i.removeAttribute('readonly');i.focus()}},true);
})();
