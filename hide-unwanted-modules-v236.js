(()=>{'use strict';
if(window.__NWCEO_HIDE236)return;window.__NWCEO_HIDE236=true;
const forbiddenRoutes=new Set(['measurements','programs','finance','planner','success','nw-wellness','nw-marketing','nw-academy']);
const forbiddenText=['tanita','προγράμματα','οικονομικά','planner','daily success','wellness touch point','marketing','academy'];
const norm=v=>String(v||'').toLocaleLowerCase('el-GR').replace(/\s+/g,' ').trim();
const blockedText=v=>{const t=norm(v);return forbiddenText.some(x=>t===x||t.includes(x));};
const clean=()=>{
  document.querySelectorAll('[data-v],[data-nw-route]').forEach(el=>{const r=el.getAttribute('data-v')||el.getAttribute('data-nw-route')||'';if(forbiddenRoutes.has(r))el.remove();});
  document.querySelectorAll('button,a').forEach(el=>{if(blockedText(el.textContent))el.remove();});
  document.querySelectorAll('.nw233-menu,.nw234-menu,#menu').forEach(menu=>{
    menu.querySelectorAll('button,a').forEach(el=>{const r=el.getAttribute('data-v')||el.getAttribute('data-nw-route')||'';if(forbiddenRoutes.has(r)||blockedText(el.textContent))el.remove();});
  });
  document.querySelectorAll('h1,h2,h3,h4').forEach(h=>{if(!blockedText(h.textContent))return;const box=h.closest('.nw234-card,.nw233-card,.card,.rowcard');if(box)box.remove();});
};
const guard=e=>{const b=e.target?.closest?.('[data-v],[data-nw-route],button,a');if(!b)return;const r=b.getAttribute('data-v')||b.getAttribute('data-nw-route')||'';if(forbiddenRoutes.has(r)||blockedText(b.textContent)){e.preventDefault();e.stopImmediatePropagation();location.hash='#clients';}};
document.addEventListener('click',guard,true);
const redirect=()=>{if(forbiddenRoutes.has((location.hash||'').replace(/^#/,'').split('/')[0]))location.hash='#clients';};
window.addEventListener('hashchange',()=>{redirect();setTimeout(clean,0);setTimeout(clean,150);});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{redirect();clean();});else{redirect();clean();}
new MutationObserver(()=>clean()).observe(document.body,{childList:true,subtree:true});
})();