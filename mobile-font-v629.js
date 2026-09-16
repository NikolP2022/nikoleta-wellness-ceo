(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!mobile()) return;
  const css=`
    @media screen and (max-width:900px){
      html,html body{font-size:40px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body,#app,#app *{font-size:40px!important;line-height:1.45!important}
      .brand b{font-size:40px!important}.brand small{font-size:27px!important}
      .menu{font-size:46px!important;min-width:86px!important;min-height:86px!important}
      .hero h1{font-size:54px!important}.hero p{font-size:40px!important}.hero small{font-size:29px!important}
      .card b{font-size:44px!important}.card small{font-size:38px!important}
      .item b{font-size:43px!important}.muted{font-size:38px!important}.bar,.bar *{font-size:40px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:40px!important;font-weight:800!important;min-height:96px!important}
      input,select,textarea{font-size:40px!important;min-height:96px!important}
      label{font-size:38px!important}
      input::placeholder,textarea::placeholder{font-size:34px!important}
      .drawer{font-size:40px!important}.drawer h2{font-size:48px!important}
      .bottom button{font-size:30px!important}.bottom span{font-size:46px!important}.bottom small{font-size:27px!important}
      .head h2{font-size:42px!important}.notice{font-size:38px!important}.empty{font-size:38px!important}
    }
  `;
  let s=document.getElementById('mobile-font-v629');
  if(!s){s=document.createElement('style');s.id='mobile-font-v629';document.head.appendChild(s)}
  s.textContent=css;
})();
