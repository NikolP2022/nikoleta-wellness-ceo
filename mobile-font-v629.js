(()=>{
  const mobile=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||window.innerWidth<=900;
  if(!mobile()) return;
  const css=`
    @media screen and (max-width:900px){
      html,html body{font-size:40px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body{line-height:1.55!important}
      .brand b{font-size:40px!important}.brand small{font-size:27px!important}
      .menu{font-size:46px!important;min-width:86px!important;min-height:86px!important}
      .hero h1{font-size:54px!important}.hero p{font-size:38px!important}.hero small{font-size:29px!important}
      .card b{font-size:42px!important}.card small{font-size:35px!important}
      .item b{font-size:41px!important}.muted{font-size:35px!important}.bar{font-size:38px!important}
      button,.primary,.gold,.danger,.ghost,.drawer button{font-size:38px!important;font-weight:800!important;min-height:92px!important}
      input,select,textarea{font-size:38px!important;min-height:92px!important}
      label{font-size:36px!important}
      input::placeholder,textarea::placeholder{font-size:32px!important}
      .drawer{font-size:38px!important}.drawer h2{font-size:46px!important}
      .bottom button{font-size:28px!important}.bottom span{font-size:44px!important}.bottom small{font-size:25px!important}
    }
  `;
  let s=document.getElementById('mobile-font-v629');
  if(!s){s=document.createElement('style');s.id='mobile-font-v629';document.head.appendChild(s)}
  s.textContent=css;
})();
