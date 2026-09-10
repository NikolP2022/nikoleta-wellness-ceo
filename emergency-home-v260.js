(()=>{'use strict';
if(window.__NWCEO260)return;window.__NWCEO260=true;
const go=h=>{location.hash=h};
const menu=()=>document.getElementById('nw-static-menu');
const open=()=>{const m=menu();if(m){m.classList.add('open');m.style.display='block';m.setAttribute('aria-hidden','false')}};
const close=()=>{const m=menu();if(m){m.classList.remove('open');m.style.display='none';m.setAttribute('aria-hidden','true')}};
window.addEventListener('click',e=>{
 const t=e.target.closest?.('.ceo-menu-dot,.ceo-quick a,.ceo-event,.ceo-maincard,.ceo-motto,#nw-static-menu a');
 if(!t)return;
 if(t.classList.contains('ceo-menu-dot')){e.preventDefault();e.stopImmediatePropagation();open();return}
 if(t.id==='ceo-day-card'||t.classList.contains('ceo-maincard')){if(e.target.closest('a,button'))return;e.preventDefault();e.stopImmediatePropagation();go('#appointments');return}
 if(t.classList.contains('ceo-event')){e.stopImmediatePropagation();return}
 if(t.closest('#nw-static-menu')){setTimeout(close,0);return}
},true);
const css=document.createElement('style');css.textContent='.ceo-menu-dot,.ceo-quick a,.ceo-event,.ceo-maincard,.ceo-motto{cursor:pointer!important;pointer-events:auto!important}';document.head.appendChild(css);
})();
