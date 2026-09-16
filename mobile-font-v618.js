(()=>{
  const isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!isMobile)return;
  document.documentElement.classList.add('mobile-device');
  const css=`
    html.mobile-device{font-size:18px!important}
    html.mobile-device body{font-size:18px!important}
    html.mobile-device .top{height:auto!important;min-height:70px!important;padding:12px 14px!important}
    html.mobile-device .brand b{font-size:20px!important}
    html.mobile-device .brand small{font-size:13px!important}
    html.mobile-device .menu{font-size:24px!important;min-width:52px!important;min-height:50px!important;padding:10px 14px!important}
    html.mobile-device .page{padding:14px 12px 96px!important}
    html.mobile-device .hero{padding:20px 16px!important}
    html.mobile-device .hero small{font-size:14px!important}
    html.mobile-device .hero h1{font-size:28px!important;line-height:1.2!important}
    html.mobile-device .hero p{font-size:18px!important;line-height:1.45!important}
    html.mobile-device .grid{grid-template-columns:1fr!important;gap:12px!important}
    html.mobile-device .card{padding:18px!important;min-height:78px!important}
    html.mobile-device .card b{font-size:20px!important;line-height:1.3!important}
    html.mobile-device .card small{font-size:16px!important;line-height:1.4!important}
    html.mobile-device .item{padding:18px!important}
    html.mobile-device .item b{font-size:20px!important;line-height:1.35!important}
    html.mobile-device .muted{font-size:16px!important;line-height:1.45!important}
    html.mobile-device .bar{font-size:18px!important;padding:12px 0!important}
    html.mobile-device button,html.mobile-device .primary,html.mobile-device .gold,html.mobile-device .danger,html.mobile-device .ghost{font-size:18px!important;line-height:1.25!important;padding:13px 16px!important;min-height:50px!important}
    html.mobile-device input,html.mobile-device select,html.mobile-device textarea{font-size:18px!important;line-height:1.35!important;padding:13px!important;min-height:50px!important}
    html.mobile-device label{font-size:17px!important;line-height:1.35!important;margin:10px 0!important}
    html.mobile-device textarea{min-height:110px!important}
    html.mobile-device .drawer{font-size:18px!important;width:min(340px,88vw)!important;padding:18px!important}
    html.mobile-device .drawer h2{font-size:23px!important}
    html.mobile-device .drawer button{font-size:18px!important;padding:14px!important;min-height:52px!important}
    html.mobile-device .bottom{height:74px!important}
    html.mobile-device .bottom button{font-size:14px!important;min-height:66px!important;padding:6px!important}
    html.mobile-device .bottom span{font-size:24px!important}
    html.mobile-device .bottom small{font-size:12px!important}
    html.mobile-device .box{padding:18px!important}
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
