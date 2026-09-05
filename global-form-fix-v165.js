(()=>{
'use strict';

const CLIENT_KEYS=/client|customer|πελατ/i;
const TIME_KEYS=/time|ώρα|start|end|begin|finish|follow.?up/i;
let clock=null;

function normalizeTime(v){
  if(!v) return '';
  const s=String(v).trim();
  const m=s.match(/^(\d{1,2})(?::|\.)?(\d{2})?$/);
  if(!m) return '';
  const h=Math.min(23,Math.max(0,Number(m[1])));
  const min=Math.min(59,Math.max(0,Number(m[2]||0)));
  return String(h).padStart(2,'0')+':'+String(min).padStart(2,'0');
}

function makeClientInput(sel){
  if(sel.dataset.clientPicker==='1') return;
  const key=((sel.name||'')+' '+(sel.id||'')).toLowerCase();
  if(!CLIENT_KEYS.test(key)) return;
  sel.dataset.clientPicker='1';
  const wrap=document.createElement('div');
  wrap.className='client-search-wrap';
  wrap.style.cssText='display:block;width:100%;position:relative';
  const input=document.createElement('input');
  input.type='text';
  input.className='client-search-input';
  input.placeholder='';
  input.autocomplete='off';
  input.value=sel.options[sel.selectedIndex]?.textContent?.trim()||'';
  input.style.cssText='width:100%;box-sizing:border-box';
  const list=document.createElement('div');
  list.className='client-search-list';
  list.style.cssText='display:none;position:absolute;left:0;right:0;top:100%;z-index:10000;background:#fff;border:1px solid #ddd;border-radius:12px;max-height:220px;overflow:auto;box-shadow:0 8px 24px rgba(0,0,0,.12)';
  function options(){return [...sel.options].filter(o=>o.value && o.textContent.trim());}
  function renderList(q){
    const query=q.trim().toLocaleLowerCase('el-GR');
    const arr=options().filter(o=>!query||o.textContent.toLocaleLowerCase('el-GR').includes(query));
    list.innerHTML=arr.map(o=>`<button type="button" data-client-value="${String(o.value).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" style="display:block;width:100%;padding:10px 12px;border:0;background:#fff;text-align:left">${o.textContent}</button>`).join('');
    list.style.display=arr.length?'block':'none';
  }
  input.addEventListener('input',()=>{
    const match=options().find(o=>o.textContent.trim().toLocaleLowerCase('el-GR')===input.value.trim().toLocaleLowerCase('el-GR'));
    if(match){sel.value=match.value;sel.dispatchEvent(new Event('change',{bubbles:true}));}
    renderList(input.value);
  });
  input.addEventListener('focus',()=>renderList(input.value));
  list.addEventListener('click',e=>{
    const b=e.target.closest('[data-client-value]'); if(!b) return;
    sel.value=b.dataset.clientValue;
    input.value=sel.options[sel.selectedIndex]?.textContent?.trim()||'';
    sel.dispatchEvent(new Event('change',{bubbles:true}));
    list.style.display='none';
  });
  sel.style.display='none';
  sel.parentNode.insertBefore(wrap,sel);
  wrap.append(input,list);
}

function patchClientFields(root=document){
  root.querySelectorAll?.('select').forEach(makeClientInput);
  root.querySelectorAll?.('input,textarea').forEach(el=>{
    const key=((el.name||'')+' '+(el.id||'')+' '+(el.placeholder||'')).toLowerCase();
    if(CLIENT_KEYS.test(key) && el.value===undefined) el.value='';
  });
}

function createClock(input){
  if(clock){clock.remove();clock=null;}
  const current=normalizeTime(input.value)||'09:00';
  let [hour,minute]=current.split(':').map(Number);
  const overlay=document.createElement('div');
  overlay.className='clock24-overlay';
  overlay.innerHTML=`<div class="clock24" role="dialog" aria-label="Επιλογή ώρας"><div class="clock24-head"><b>Επιλογή ώρας</b><button type="button" data-close>×</button></div><div class="clock24-value"><span data-hour>${String(hour).padStart(2,'0')}</span><b>:</b><span data-minute>${String(minute).padStart(2,'0')}</span></div><div class="clock24-face" data-face></div><div class="clock24-minutes" data-minutes></div><div class="clock24-actions"><button type="button" data-cancel>Άκυρο</button><button type="button" data-ok>Επιλογή</button></div></div>`;
  document.body.appendChild(overlay); clock=overlay;
  const face=overlay.querySelector('[data-face]');
  const hr=overlay.querySelector('[data-hour]');
  const mn=overlay.querySelector('[data-minute]');
  const minutes=overlay.querySelector('[data-minutes]');
  const renderHours=()=>{
    face.innerHTML='';
    for(let h=0;h<24;h++){
      const a=(h/24)*Math.PI*2-Math.PI/2;
      const x=50+40*Math.cos(a),y=50+40*Math.sin(a);
      const b=document.createElement('button'); b.type='button'; b.className='clock-hour'+(h===hour?' selected':''); b.textContent=String(h).padStart(2,'0');
      b.style.left=x+'%'; b.style.top=y+'%'; b.onclick=()=>{hour=h;hr.textContent=String(hour).padStart(2,'0');renderHours();}; face.appendChild(b);
    }
  };
  const renderMinutes=()=>{
    minutes.innerHTML='';
    for(let m=0;m<60;m++){
      const b=document.createElement('button'); b.type='button'; b.textContent=String(m).padStart(2,'0'); b.className=m===minute?'selected':''; b.onclick=()=>{minute=m;mn.textContent=String(minute).padStart(2,'0');renderMinutes();}; minutes.appendChild(b);
    }
  };
  renderHours();renderMinutes();
  const close=()=>{overlay.remove();if(clock===overlay)clock=null;};
  overlay.querySelector('[data-close]').onclick=close;
  overlay.querySelector('[data-cancel]').onclick=close;
  overlay.querySelector('[data-ok]').onclick=()=>{input.value=String(hour).padStart(2,'0')+':'+String(minute).padStart(2,'0');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));close();};
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
}

function patchTimeField(input){
  if(input.dataset.clock24==='1') return;
  const key=((input.name||'')+' '+(input.id||'')+' '+(input.placeholder||'')).toLowerCase();
  if(!(input.type==='time'||TIME_KEYS.test(key))) return;
  input.dataset.clock24='1';
  input.type='text';
  input.inputMode='none';
  input.autocomplete='off';
  input.placeholder='';
  input.readOnly=true;
  input.value=normalizeTime(input.value);
  input.style.cursor='pointer';
  input.addEventListener('click',e=>{e.preventDefault();createClock(input);});
}

function patchTimeFields(root=document){
  root.querySelectorAll?.('input').forEach(patchTimeField);
}

function patch(){patchClientFields();patchTimeFields();}

const css=document.createElement('style');
css.textContent=`
.clock24-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}.clock24{width:min(390px,100%);background:#fff;border-radius:24px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.25);font-family:system-ui,sans-serif}.clock24-head{display:flex;justify-content:space-between;align-items:center;font-size:18px}.clock24-head button{border:0;background:transparent;font-size:28px}.clock24-value{display:flex;justify-content:center;gap:4px;font-size:36px;font-weight:800;padding:8px}.clock24-face{position:relative;width:min(300px,78vw);height:min(300px,78vw);margin:0 auto;border-radius:50%;background:#f1f5f2;border:8px solid #e4ece5}.clock-hour{position:absolute;transform:translate(-50%,-50%);width:38px;height:38px;border:0;border-radius:50%;background:transparent;font-weight:700}.clock-hour.selected{background:#245b2b;color:#fff}.clock24-minutes{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin:12px 0;max-height:120px;overflow:auto}.clock24-minutes button{border:0;border-radius:8px;padding:7px;background:#f3f4f6}.clock24-minutes button.selected{background:#245b2b;color:#fff}.clock24-actions{display:flex;justify-content:flex-end;gap:8px}.clock24-actions button{border:0;border-radius:10px;padding:10px 14px}.clock24-actions [data-ok]{background:#245b2b;color:#fff}.client-search-wrap{margin:0 0 8px}.client-search-list button:hover{background:#f0f7f1!important}`;
document.head.appendChild(css);

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',patch); else patch();
// Targeted observer: only patches newly rendered form controls; it never rewrites the app DOM.
const mo=new MutationObserver(m=>{for(const x of m) for(const n of x.addedNodes) if(n.nodeType===1) {patchClientFields(n);patchTimeFields(n);}});
mo.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
})();
