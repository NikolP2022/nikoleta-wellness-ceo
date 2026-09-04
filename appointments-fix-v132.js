(()=>{
'use strict';
const pad=v=>String(v||'').trim().replace('.',':');
const normalize=v=>{const m=pad(v).match(/^(\d{1,2}):(\d{2})$/);if(!m)return '';const h=Number(m[1]),n=Number(m[2]);return h>=0&&h<=23&&n>=0&&n<=59?`${String(h).padStart(2,'0')}:${m[2]}`:''};
function fixTimeInputs(root=document){root.querySelectorAll('input[type="time"]').forEach(i=>{if(i.dataset.twentyfour==='1')return;i.dataset.twentyfour='1';i.type='text';i.inputMode='numeric';i.autocomplete='off';i.maxLength=5;i.placeholder='00:00';i.setAttribute('pattern','(?:[01]\\d|2[0-3]):[0-5]\\d');const n=normalize(i.value);if(n)i.value=n;i.addEventListener('blur',()=>{const x=normalize(i.value);if(i.value.trim()&&!x){i.setCustomValidity('Χρησιμοποίησε 24ωρη μορφή ΩΩ:ΛΛ, π.χ. 18:30.')}else{i.value=x;i.setCustomValidity('')}});i.addEventListener('input',()=>i.setCustomValidity(''))});}
function watch(){fixTimeInputs();document.querySelectorAll('.crud-modal').forEach(fixTimeInputs);}
new MutationObserver(watch).observe(document.body,{childList:true,subtree:true});window.addEventListener('load',watch);watch();
})();
