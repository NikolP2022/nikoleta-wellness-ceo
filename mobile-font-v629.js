(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=600;
  if(!mobile()) return;
  const apply=()=>{
    let s=document.getElementById('mobile-font-v630');
    if(!s){s=document.createElement('style');s.id='mobile-font-v630';document.head.appendChild(s)}
    s.textContent=`@media screen and (max-width:600px){
      html{font-size:24px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body{font-size:24px!important;line-height:1.4!important;overflow-x:hidden!important}
      #app,#app *{line-height:1.3!important}
      .top{height:auto!important;min-height:82px!important;padding:20px 16px!important}
      .brand b{font-size:30px!important;line-height:1.2!important}.brand small{font-size:21px!important}
      .menu{font-size:30px!important;min-width:58px!important;min-height:58px!important}
      .hero{padding:30px 20px!important}.hero h1{font-size:42px!important;line-height:1.15!important}.hero p{font-size:26px!important;line-height:1.4!important}.hero small{font-size:23px!important}
      .card{padding:26px!important;margin-bottom:20px!important}.card b{font-size:30px!important;line-height:1.25!important}.card small{font-size:23px!important}
      .item{padding:24px!important}.item b{font-size:29px!important;line-height:1.3!important}.muted{font-size:23px!important}
      .bar,.bar *{font-size:26px!important}.bar{padding:19px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:26px!important;font-weight:800!important;min-height:60px!important;padding:18px 20px!important}
      input,select,textarea{font-size:26px!important;min-height:60px!important;padding:18px!important}
      label{font-size:25px!important;margin-bottom:10px!important}
      input::placeholder,textarea::placeholder{font-size:23px!important}
      .drawer{font-size:26px!important}.drawer h2{font-size:32px!important}
      .bottom{padding:12px 8px!important}.bottom button{font-size:21px!important;min-height:56px!important}.bottom span{font-size:25px!important}.bottom small{font-size:19px!important}
      .head h2{font-size:30px!important}.notice{font-size:23px!important}.empty{font-size:23px!important}
    }`;
  };
  apply();
  window.setTimeout(apply,250);
  window.setTimeout(apply,1000);
  window.setTimeout(apply,2500);
})();
