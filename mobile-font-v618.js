(()=>{
  const isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!isMobile)return;
  document.documentElement.classList.add('mobile-device');
  const css=`
    /* NIKO LETA WELLNESS CEO — EXTRA LARGE MOBILE MODE */
    html.mobile-device{font-size:28px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
    html.mobile-device body{font-size:28px!important;line-height:1.5!important;font-family:Arial,sans-serif!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
    html.mobile-device .top{height:auto!important;min-height:88px!important;padding:16px 14px!important}
    html.mobile-device .brand b{font-size:30px!important;line-height:1.2!important}
    html.mobile-device .brand small{font-size:19px!important;line-height:1.3!important;letter-spacing:1.5px!important}
    html.mobile-device .menu{font-size:34px!important;min-width:68px!important;min-height:64px!important;padding:12px 16px!important}
    html.mobile-device .page{padding:20px 14px 125px!important;max-width:none!important}
    html.mobile-device .hero{padding:28px 20px!important;border-radius:24px!important}
    html.mobile-device .hero small{font-size:20px!important;line-height:1.3!important}
    html.mobile-device .hero h1{font-size:42px!important;line-height:1.18!important}
    html.mobile-device .hero p{font-size:28px!important;line-height:1.45!important}
    html.mobile-device .grid{grid-template-columns:1fr!important;gap:18px!important}
    html.mobile-device .card{padding:26px!important;min-height:120px!important}
    html.mobile-device .card b{font-size:30px!important;line-height:1.3!important}
    html.mobile-device .card small{font-size:24px!important;line-height:1.45!important}
    html.mobile-device .item{padding:26px!important}
    html.mobile-device .item b{font-size:30px!important;line-height:1.35!important}
    html.mobile-device .muted{font-size:24px!important;line-height:1.5!important}
    html.mobile-device .bar{font-size:27px!important;padding:18px 0!important;line-height:1.35!important}
    html.mobile-device button,html.mobile-device .primary,html.mobile-device .gold,html.mobile-device .danger,html.mobile-device .ghost{font-size:27px!important;font-weight:800!important;line-height:1.25!important;padding:18px 21px!important;min-height:68px!important}
    html.mobile-device input,html.mobile-device select,html.mobile-device textarea{font-size:27px!important;line-height:1.35!important;padding:18px!important;min-height:68px!important}
    html.mobile-device label{font-size:25px!important;font-weight:800!important;line-height:1.35!important;margin:16px 0!important}
    html.mobile-device input::placeholder,html.mobile-device textarea::placeholder{font-size:24px!important}
    html.mobile-device textarea{min-height:150px!important}
    html.mobile-device .drawer{font-size:27px!important;width:min(400px,92vw)!important;padding:24px!important}
    html.mobile-device .drawer h2{font-size:34px!important}
    html.mobile-device .drawer button{font-size:27px!important;padding:19px!important;min-height:68px!important}
    html.mobile-device .bottom{height:94px!important}
    html.mobile-device .bottom button{font-size:18px!important;min-height:84px!important;padding:8px 5px!important}
    html.mobile-device .bottom span{font-size:32px!important}
    html.mobile-device .bottom small{font-size:17px!important}
    html.mobile-device .box{padding:26px!important}
  `;
  function apply(){
    let old=document.getElementById('mobile-font-v618');
    if(old)old.remove();
    let s=document.createElement('style');
    s.id='mobile-font-v618';
    s.textContent=css;
    document.head.appendChild(s);
  }
  apply();
  window.addEventListener('resize',apply);
})();
