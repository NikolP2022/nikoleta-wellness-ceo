(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!mobile()) return;
  const apply=()=>{
    let s=document.getElementById('mobile-font-v630');
    if(!s){s=document.createElement('style');s.id='mobile-font-v630';document.head.appendChild(s)}
    s.textContent=`@media screen and (max-width:900px){
      html{font-size:22px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body{font-size:22px!important;line-height:1.35!important}
      #app,#app *{line-height:1.3!important}
      .top{height:auto!important;min-height:82px!important;padding:14px!important}
      .brand b{font-size:28px!important}.brand small{font-size:18px!important}
      .menu{font-size:30px!important;min-width:58px!important;min-height:58px!important}
      .hero h1{font-size:38px!important;line-height:1.1!important}.hero p{font-size:24px!important}.hero small{font-size:20px!important}
      .card{padding:20px!important}.card b{font-size:28px!important;line-height:1.2!important}.card small{font-size:21px!important}
      .item b{font-size:27px!important}.muted{font-size:21px!important}.bar,.bar *{font-size:24px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:24px!important;font-weight:800!important;min-height:58px!important}
      input,select,textarea{font-size:24px!important;min-height:58px!important}
      label{font-size:22px!important}
      input::placeholder,textarea::placeholder{font-size:21px!important}
      .drawer{font-size:24px!important}.drawer h2{font-size:32px!important}
      .bottom button{font-size:18px!important}.bottom span{font-size:25px!important}.bottom small{font-size:16px!important}
      .head h2{font-size:30px!important}.notice{font-size:21px!important}.empty{font-size:21px!important}
    }`;
  };
  apply();
  window.setTimeout(apply,250);
  window.setTimeout(apply,1000);
  window.setTimeout(apply,2500);
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();
