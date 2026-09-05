(()=>{
'use strict';
if(window.__NWCEO_FORM143)return; window.__NWCEO_FORM143=true;
function blankNewForm(root){
  const h=root?.querySelector?.('h2')?.textContent||'';
  if(!/^\s*(＋\s*)?Νέο\b|^\s*Νέα\b/.test(h)) return;
  root.querySelectorAll('input,textarea,select').forEach(el=>{
    if(el.type==='hidden'||el.type==='submit'||el.type==='button'||el.type==='reset'||el.disabled)return;
    if(el.tagName==='SELECT'){
      if(!el.querySelector('option[value=""]')){
        const o=document.createElement('option'); o.value=''; o.textContent=''; el.insertBefore(o,el.firstChild);
      }
      el.value='';
    }else{
      el.value='';
      el.defaultValue='';
    }
  });
}
function sweep(){document.querySelectorAll('.modal,.ap130-modal').forEach(blankNewForm)}
document.addEventListener('click',()=>setTimeout(sweep,0));
window.addEventListener('load',()=>setTimeout(sweep,0),{once:true});
window.addEventListener('hashchange',()=>setTimeout(sweep,0));
})();
