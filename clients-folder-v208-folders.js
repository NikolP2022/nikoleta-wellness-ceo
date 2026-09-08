(()=>{
'use strict';
if(window.__NWCEO_CF208)return;window.__NWCEO_CF208=1;
const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
const css=document.createElement('style');css.textContent=`
.nw208-folders{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:14px;margin-top:13px}
.nw208-folder{position:relative;background:linear-gradient(145deg,#fffdf8,#f8fbf7);border:1px solid #e0e7dc;border-radius:20px;padding:16px;box-shadow:0 8px 26px rgba(36,91,43,.08);min-height:168px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.nw208-folder:before{content:'';position:absolute;left:16px;top:0;width:58px;height:6px;border-radius:0 0 8px 8px;background:#b59a52}
.nw208-folder-head{display:flex;gap:12px;align-items:center;min-width:0;padding-top:5px}
.nw208-folder-icon{width:54px;height:46px;border-radius:13px;background:#edf6ee;display:grid;place-items:center;font-size:27px;flex:none;border:1px solid #d7e5d7}
.nw208-folder-info{min-width:0}.nw208-folder-info b{display:block;color:#245b2b;font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.nw208-folder-info span{display:block;color:#667085;font-size:12px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nw208-folder-meta{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.nw208-folder-chip{padding:5px 8px;border-radius:999px;background:#edf6ee;color:#245b2b;font-size:11px;font-weight:900}
.nw208-folder-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px}.nw208-folder-actions button{flex:1;min-width:82px}.nw208-folder-actions button[data-open]{background:#245b2b!important;color:#fff!important;border-color:#245b2b!important}
@media(max-width:650px){.nw208-folders{grid-template-columns:1fr}.nw208-folder{min-height:0}.nw208-folder-actions button{flex:0 0 auto}}
`;
document.head.appendChild(css);
function transform(){
  if(location.hash!=='#clients'&&location.hash!=='#clients/')return;
  const list=document.querySelector('.nw206 .clientlist');
  if(!list)return;
  if(list.dataset.nw208==='1')return;
  const rows=[...list.querySelectorAll('.clientrow')];
  if(!rows.length)return;
  list.classList.add('nw208-folders');
  rows.forEach(row=>{
    const open=row.querySelector('[data-open]'),edit=row.querySelector('[data-edit-client]'),del=row.querySelector('[data-delete-client]');
    if(!open)return;
    const info=row.querySelector('.clientinfo');
    const avatar=info?.querySelector('.miniavatar');
    const name=info?.querySelector('b')?.textContent||'Πελάτης';
    const muted=[...info?.querySelectorAll('.muted')||[]].map(x=>x.textContent.trim()).filter(Boolean).join('');
    const chips=[...info?.querySelectorAll('.chip')||[]].map(x=>x.textContent.trim()).filter(Boolean);
    const folder=document.createElement('article');
    folder.className='nw208-folder';
    folder.innerHTML=`<div><div class="nw208-folder-head"><div class="nw208-folder-icon">📁</div><div class="nw208-folder-info"><b>${esc(name)}</b><span>${esc(muted||'Πλήρης ψηφιακός φάκελος')}</span></div></div><div class="nw208-folder-meta">${chips.map(x=>`<span class="nw208-folder-chip">${esc(x)}</span>`).join('')}</div></div><div class="nw208-folder-actions"><button type="button" data-open="${esc(open.dataset.open)}">📂 Άνοιγμα φακέλου</button><button type="button" data-edit-client="${esc(edit?.dataset.editClient||'')}">✏️ Επεξεργασία</button><button type="button" class="danger" data-delete-client="${esc(del?.dataset.deleteClient||'')}">🗑️ Διαγραφή</button></div>`;
    list.replaceChild(folder,row);
  });
  list.dataset.nw208='1';
}
function boot(){setTimeout(transform,120);setTimeout(transform,500);}
window.addEventListener('hashchange',boot);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(()=>transform()).observe(document.body,{childList:true,subtree:true});
})();
