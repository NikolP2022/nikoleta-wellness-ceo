(()=>{
  const css=`
  @media(max-width:600px){
    body{font-size:22px!important}
    .top{height:auto!important;min-height:78px!important;padding:16px 14px!important}
    .brand b{font-size:22px!important}
    .brand small{font-size:15px!important}
    .menu{font-size:26px!important;padding:12px 16px!important;min-width:58px!important;min-height:54px!important}
    .page{padding:16px 12px 100px!important}
    .hero{padding:26px 20px!important;border-radius:22px!important}
    .hero small{font-size:15px!important}
    .hero h1{font-size:34px!important;line-height:1.15!important}
    .hero p{font-size:21px!important;line-height:1.45!important}
    .grid{grid-template-columns:1fr!important;gap:14px!important}
    .card{padding:23px!important;min-height:92px!important}
    .card b{font-size:24px!important;line-height:1.3!important}
    .card small{font-size:19px!important;line-height:1.4!important}
    .item{padding:22px!important}
    .item b{font-size:23px!important;line-height:1.35!important}
    .muted{font-size:19px!important;line-height:1.45!important}
    .bar{font-size:21px!important;padding:14px 0!important;gap:12px!important}
    button,.primary,.gold,.danger,.ghost{font-size:21px!important;line-height:1.25!important;padding:16px 19px!important;min-height:56px!important}
    input,select,textarea{font-size:21px!important;line-height:1.35!important;padding:16px!important;min-height:56px!important}
    label{font-size:21px!important;line-height:1.35!important;margin:14px 0!important}
    textarea{min-height:120px!important}
    .drawer{font-size:21px!important;width:min(340px,88vw)!important;padding:20px!important}
    .drawer h2{font-size:25px!important}
    .drawer button{font-size:21px!important;padding:17px!important;min-height:58px!important}
    .bottom{height:78px!important}
    .bottom button{font-size:16px!important;min-height:70px!important;padding:7px!important}
    .bottom span{font-size:26px!important}
    .bottom small{font-size:13px!important}
    .box{padding:22px!important}
  }`;
  function apply(){let old=document.getElementById('mobile-font-v618');if(old)old.remove();let s=document.createElement('style');s.id='mobile-font-v618';s.textContent=css;document.head.appendChild(s)}
  apply();
  window.addEventListener('resize',apply);
})();
