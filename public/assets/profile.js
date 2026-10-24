const viewport=document.querySelector('.helix-scroll');
if(viewport){
 const controls=[...document.querySelectorAll('[data-helix-step]')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 for(const button of controls)button.addEventListener('click',()=>viewport.scrollBy({top:Number(button.dataset.helixStep)*230,behavior:reduced.matches?'instant':'smooth'}));
 function update(){controls[0].disabled=viewport.scrollTop<2;controls[1].disabled=viewport.scrollTop+viewport.clientHeight>=viewport.scrollHeight-2;}
 viewport.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(viewport);update();
}
