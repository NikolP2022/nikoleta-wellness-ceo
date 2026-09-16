(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!mobile()) return;
  const apply=()=>{
    let s=document.getElementById('mobile-font-v629');
    if(!s){s=document.createElement('style');s.id='mobile-font-v629';document.head.appendChild(s)}
    s.textContent=`@media screen and (max-width:900px){
      html{font-size:72px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body,#app,#app *{font-size:72px!important;line-height:1.25!important}
      .top{height:auto!important;min-height:110px!important}
      .brand b{font-size:72px!important}.brand small{font-size:48px!important}
      .menu{font-size:76px!important;min-width:120px!important;min-height:120px!important}
      .hero h1{font-size:88px!important}.hero p{font-size:68px!important}.hero small{font-size:52px!important}
      .card b{font-size:76px!important}.card small{font-size:62px!important}
      .item b{font-size:74px!important}.muted{font-size:62px!important}.bar,.bar *{font-size:72px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:68px!important;font-weight:800!important;min-height:130px!important}
      input,select,textarea{font-size:68px!important;min-height:130px!important}
      label{font-size:64px!important}
      input::placeholder,textarea::placeholder{font-size:58px!important}
      .drawer{font-size:68px!important}.drawer h2{font-size:78px!important}
      .bottom button{font-size:50px!important}.bottom span{font-size:66px!important}.bottom small{font-size:44px!important}
      .head h2{font-size:72px!important}.notice{font-size:62px!important}.empty{font-size:62px!important}
    }`;
  };
  apply();
  window.setTimeout(apply,250);
  window.setTimeout(apply,1000);
  window.setTimeout(apply,2500);
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();
