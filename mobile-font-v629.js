(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!mobile()) return;
  const apply=()=>{
    let s=document.getElementById('mobile-font-v629');
    if(!s){s=document.createElement('style');s.id='mobile-font-v629';document.head.appendChild(s)}
    s.textContent=`@media screen and (max-width:900px){
      html{font-size:56px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body,#app,#app *{font-size:56px!important;line-height:1.35!important}
      .brand b{font-size:56px!important}.brand small{font-size:38px!important}
      .menu{font-size:60px!important;min-width:100px!important;min-height:100px!important}
      .hero h1{font-size:70px!important}.hero p{font-size:54px!important}.hero small{font-size:40px!important}
      .card b{font-size:60px!important}.card small{font-size:50px!important}
      .item b{font-size:58px!important}.muted{font-size:50px!important}.bar,.bar *{font-size:56px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:54px!important;font-weight:800!important;min-height:110px!important}
      input,select,textarea{font-size:54px!important;min-height:110px!important}
      label{font-size:50px!important}
      input::placeholder,textarea::placeholder{font-size:46px!important}
      .drawer{font-size:54px!important}.drawer h2{font-size:64px!important}
      .bottom button{font-size:40px!important}.bottom span{font-size:56px!important}.bottom small{font-size:38px!important}
      .head h2{font-size:56px!important}.notice{font-size:50px!important}.empty{font-size:50px!important}
    }`;
  };
  apply();
  window.setTimeout(apply,500);
  window.setTimeout(apply,1500);
})();
