const viewport=document.querySelector('.orbit-viewport');
if(viewport){
 const cards=[...viewport.querySelectorAll('.helix-card')],n=cards.length;
 let position=2,start=null,moved=false,wheelAt=0;
 function render(){const small=viewport.clientWidth<470;cards.forEach((card,i)=>{let d=((i-position+n*20+n/2)%n)-n/2;const a=d*.87,x=Math.sin(a)*(small?76:135),y=d*(small?76:89),z=Math.cos(a)*130;card.style.transform=`translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${-Math.sin(a)*26}deg) rotateZ(${Math.sin(a)*4}deg)`;card.style.opacity=Math.abs(d)>3.15?'0':String(Math.max(.22,1-Math.abs(d)*.22));card.style.zIndex=String(Math.round(100-Math.abs(d)*20));card.style.pointerEvents=Math.abs(d)>3.15?'none':'auto';card.tabIndex=Math.abs(d)<.5?0:-1;});}
 function step(delta){position=Math.round(position)+delta;render();}
 document.querySelectorAll('[data-orbit-step]').forEach(b=>b.addEventListener('click',()=>step(Number(b.dataset.orbitStep))));
 viewport.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();step(['ArrowRight','ArrowDown'].includes(e.key)?1:-1);}});
 viewport.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<4)return;if(Date.now()-wheelAt>200){wheelAt=Date.now();step(Math.sign(e.deltaY));}e.preventDefault();},{passive:false});
 viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;start={x:e.clientX,y:e.clientY,p:position,id:e.pointerId};moved=false;});
 viewport.addEventListener('pointermove',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.max(Math.abs(dx),Math.abs(dy))>7){moved=true;viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');position=start.p-(Math.abs(dx)>Math.abs(dy)?dx:dy)/100;render();}});
 function finish(){if(!start)return;start=null;viewport.classList.remove('dragging');position=Math.round(position);render();}
 viewport.addEventListener('pointerup',finish);viewport.addEventListener('pointercancel',finish);viewport.addEventListener('lostpointercapture',finish);
 viewport.addEventListener('click',e=>{if(moved){e.preventDefault();moved=false;}});
 viewport.addEventListener('dragstart',e=>e.preventDefault());
 new ResizeObserver(render).observe(viewport);render();
}
