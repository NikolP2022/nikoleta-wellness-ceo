(()=>{'use strict';
function inject(){
 const app=document.getElementById('app'); if(!app || !location.hash || location.hash!=='#home') return;
 if(document.getElementById('premiumProductShelf')) return;
 const hero=app.querySelector('.hero'); if(!hero) return;
 const shelf=document.createElement('section'); shelf.id='premiumProductShelf'; shelf.className='visual-shelf';
 shelf.innerHTML=`
 <article class="visual-product photo-shake"><div class="vp-icon">🥤</div><b>Formula 1</b><small>Nutrition • Daily Wellness</small></article>
 <article class="visual-product photo-pdm"><div class="vp-icon">🍓</div><b>Protein Drink Mix</b><small>Protein • Balanced Nutrition</small></article>
 <article class="visual-product photo-tea"><div class="vp-icon">🍵</div><b>Herbal Beverage</b><small>Hydration • Wellness Ritual</small></article>
 <article class="visual-product photo-aloe"><div class="vp-icon">🌿</div><b>Aloe</b><small>Wellness • Daily Routine</small></article>`;
 hero.insertAdjacentElement('afterend',shelf);
}
let tries=0;const watch=setInterval(()=>{inject();if(document.getElementById('premiumProductShelf')||tries++>30)clearInterval(watch)},250);
window.addEventListener('hashchange',()=>setTimeout(inject,120));
})();
