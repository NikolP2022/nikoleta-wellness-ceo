(()=>{
  const css=`@media screen and (max-width:900px){
    html{font-size:30px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
    body{font-size:30px!important;line-height:1.35!important}
    #app{font-size:30px!important}
    #app h1{font-size:44px!important;line-height:1.08!important}
    #app h2{font-size:38px!important;line-height:1.12!important}
    #app h3{font-size:34px!important;line-height:1.15!important}
    #app p,#app div,#app span,#app small,#app label,#app li{font-size:30px!important;line-height:1.3!important}
    #app .brand b{font-size:38px!important}
    #app .brand small{font-size:25px!important}
    #app button,#app input,#app select,#app textarea{font-size:30px!important;min-height:68px!important}
    #app .hero h1{font-size:44px!important}
    #app .hero p{font-size:30px!important}
    #app .card b,#app .item b{font-size:34px!important}
    #app .bottom button{font-size:24px!important}
  }`;
  function install(){
    let s=document.getElementById('mobile-force-font-v642');
    if(!s){s=document.createElement('style');s.id='mobile-force-font-v642';s.textContent=css;document.documentElement.appendChild(s);}
    else s.textContent=css;
  }
  install();
  new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
})();
