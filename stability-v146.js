(()=>{
'use strict';
if(window.__NWCEO_STABILITY146)return;window.__NWCEO_STABILITY146=true;
function clearNewForm(){
 const modal=document.querySelector('.crud-modal');
 if(!modal)return;
 const title=modal.querySelector('h2')?.textContent||'';
 if(!/Νέα εγγραφή|Νέο ραντεβού|Νέα υπενθύμιση/.test(title))return;
 modal.querySelectorAll('input,textarea,select').forEach(el=>{
   if(el.type==='hidden'||el.type==='button'||el.type==='submit'||el.type==='reset')return;
   if(el.tagName==='SELECT'){
     const blank=el.querySelector('option[value=""]');
     if(!blank){const o=document.createElement('option');o.value='';o.textContent='';el.insertBefore(o,el.firstChild)}
     el.value='';
   }else if(el.type==='checkbox'){
     el.checked=false;
   }else{
     el.value='';
     el.defaultValue='';
   }
 });
}
document.addEventListener('click',e=>{
 if(e.target.closest('.crud-new'))setTimeout(clearNewForm,0);
},true);
window.addEventListener('hashchange',()=>setTimeout(clearNewForm,0));
})();
