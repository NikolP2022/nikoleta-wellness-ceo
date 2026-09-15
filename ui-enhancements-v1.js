(()=>{'use strict';
const TZ='Europe/Athens';
const pad=n=>String(n).padStart(2,'0');
function athensTime(){const p=new Intl.DateTimeFormat('el-GR',{timeZone:TZ,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(new Date());const g=Object.fromEntries(p.map(x=>[x.type,x.value]));return `${g.hour}:${g.minute}:${g.second}`}
function enhance(){
  if(!document.getElementById('athens-clock')){const c=document.createElement('div');c.id='athens-clock';c.innerHTML='<span>🇬🇷 ΕΛΛΑΔΑ</span><b></b>';document.body.appendChild(c)}
  const clock=document.querySelector('#athens-clock b');if(clock)clock.textContent=athensTime();
  document.querySelectorAll('.grid .card').forEach(c=>c.classList.add('ceo-big-card'));
  document.querySelectorAll('button').forEach(b=>{if(!b.dataset.ceoReady){b.dataset.ceoReady='1';b.classList.add('ceo-big-button')}});
}
const style=document.createElement('style');style.textContent=`#athens-clock{position:fixed;right:12px;top:76px;z-index:45;background:#fffdf8;border:1px solid #c9a45b;color:#245b2b;border-radius:14px;padding:7px 11px;box-shadow:0 5px 18px #0002;display:flex;align-items:center;gap:8px;font-size:15px}#athens-clock span{font-size:11px;letter-spacing:1px;color:#8a6b2f;font-weight:800}#athens-clock b{font-size:20px;letter-spacing:1px}.ceo-big-card{padding:23px!important;min-height:118px}.ceo-big-card b{font-size:21px!important}.ceo-big-card small{font-size:15px!important}.ceo-big-button{min-height:46px!important;font-size:16px!important}.card{transition:transform .12s,box-shadow .12s}.card:active{transform:scale(.98)}button:active{transform:scale(.98)}@media(max-width:600px){#athens-clock{top:74px;right:9px}.ceo-big-card{min-height:125px;padding:20px!important}.ceo-big-card b{font-size:20px!important}.ceo-big-button{font-size:16px!important}}`;
document.head.appendChild(style);
new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
setInterval(enhance,1000);enhance();
})();
