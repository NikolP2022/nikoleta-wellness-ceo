(()=>{
'use strict';
if(window.__NWCEO_BOOT248)return;
window.__NWCEO_BOOT248=true;
const recover=()=>{
  if(location.hash)return;
  const app=document.getElementById('app');
  if(!app)return;
  if(app.querySelector('.ceo-home'))return;
  const s=document.createElement('script');
  s.src='./ceo-home-v247.js?v=248-recovery';
  s.onload=()=>console.log('Nikoleta Wellness CEO: home recovery loaded');
  s.onerror=()=>{
    app.innerHTML='<section style="min-height:100vh;display:grid;place-items:center;padding:32px;background:#f8f6ef;font-family:system-ui;color:#245b2b"><div style="max-width:680px;text-align:center;background:white;border-radius:28px;padding:36px;box-shadow:0 12px 40px #0001"><div style="font-size:42px">🌿</div><h1>Nikoleta Wellness CEO</h1><p>Wellness Touch Point</p><p style="color:#666">Η αρχική οθόνη φορτώνεται ξανά. Κάνε μία ανανέωση της σελίδας.</p></div></section>';
  };
  document.body.appendChild(s);
};
window.addEventListener('load',()=>setTimeout(recover,1200));
setTimeout(recover,2500);
})();
