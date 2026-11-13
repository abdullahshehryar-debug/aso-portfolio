/* Motion layer v1: Lenis smooth scroll + GSAP ScrollTrigger. Falls back silently if libs are missing. */
(function(){
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduce||!window.gsap||!window.ScrollTrigger||!window.Lenis)return;
gsap.registerPlugin(ScrollTrigger);
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var css=document.createElement("style");css.textContent=[
"html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:hidden}",
".ln{display:block;overflow:hidden;padding:.06em .04em .1em;margin:-.06em -.04em -.1em}.lni{display:block;will-change:transform}",
".clk{position:fixed;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;border:2px solid #b9ff3c;pointer-events:none;z-index:9999;box-shadow:0 0 24px rgba(185,255,60,.45)}",
".band{position:relative;overflow:hidden;padding:clamp(40px,6vw,80px) 0;z-index:2}",
".band__in{display:flex;white-space:nowrap;width:max-content;transform:rotate(-2deg);margin:0 -6vw;padding:clamp(14px,2vw,24px) 0;background:#b9ff3c;color:#07090a;font:900 clamp(30px,5.4vw,76px)/1 Archivo,Inter,sans-serif;font-stretch:112%;letter-spacing:-.03em;text-transform:uppercase;box-shadow:0 20px 70px rgba(185,255,60,.18)}",
".band__in span{padding:0 .5em;display:inline-flex;align-items:center;gap:.5em}.band__in em{font-style:normal;font-size:.55em}",
".band--o .band__in{background:transparent;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.5);transform:rotate(1.5deg);box-shadow:none}",
".band--o .band__in span.s{color:#b9ff3c;-webkit-text-stroke:0}"
].join("");document.head.appendChild(css);
/* smooth scroll */
document.documentElement.style.scrollBehavior="auto";
var lenis=new Lenis({lerp:0.085,smoothWheel:true,wheelMultiplier:1});window.__lenis=lenis;
lenis.on("scroll",ScrollTrigger.update);
gsap.ticker.add(function(t){lenis.raf(t*1000);});gsap.ticker.lagSmoothing(0);
function sync(){var lock=document.body.classList.contains("is-loading")||document.querySelector(".lb.on")||document.querySelector(".menu.open");if(lock)lenis.stop();else lenis.start();}
sync();new MutationObserver(sync).observe(document.body,{attributes:true,subtree:true,attributeFilter:["class"]});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href^='#']");if(!a)return;var id=a.getAttribute("href");var t=id.length>1?document.querySelector(id):null;if(id==="#top"||id==="#"){e.preventDefault();lenis.scrollTo(0,{duration:1.6,easing:function(x){return 1-Math.pow(1-x,4);}});return;}if(!t)return;e.preventDefault();setTimeout(function(){lenis.scrollTo(t,{offset:-10,duration:1.6,easing:function(x){return 1-Math.pow(1-x,4);}});},60);});
/* headings: each line rises out of a mask */
$$("h2.display").forEach(function(h){if(h.closest(".contact"))return;var parts=h.innerHTML.split(/<br\s*\/?>/i);h.innerHTML=parts.map(function(p){return "<span class=\"ln\"><span class=\"lni\">"+p+"</span></span>";}).join("");var ins=$$(".lni",h);gsap.from(ins,{yPercent:115,rotate:3,duration:1.25,ease:"expo.out",stagger:.14,scrollTrigger:{trigger:h,start:"top 88%",once:true}});});
/* bands */
function band(txt,cls,before,dir){var el=document.createElement("div");el.className="band "+(cls||"");el.setAttribute("aria-hidden","true");var one=txt.map(function(w,i){return "<span"+(i%2?" class=\"s\"":"")+">"+w+"<em>✦</em></span>";}).join("");el.innerHTML="<div class=\"band__in\">"+one+one+one+"</div>";var ref=document.querySelector(before);if(!ref)return;ref.parentNode.insertBefore(el,ref);var inn=el.firstChild;gsap.fromTo(inn,{x:dir>0?"-34%":"0%"},{x:dir>0?"0%":"-34%",ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:true}});}
band(["ASO","Keywords","Store listing CRO","UAC","Localization","Rank #1"],"","#reviews",-1);
band(["Rank higher","Get more installs","Earn more"],"band--o","#about",1);
/* scroll-linked depth */
var hg=document.querySelector(".hero__grid");if(hg)gsap.to(hg,{yPercent:-9,opacity:.35,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
var pt=document.querySelector("#aboutMe");if(pt){var pi=pt.querySelector("img");if(pi)gsap.fromTo(pi,{yPercent:-7,scale:1.16},{yPercent:7,scale:1.16,ease:"none",scrollTrigger:{trigger:pt,start:"top bottom",end:"bottom top",scrub:true}});}
var cp=document.querySelector("#casePanel");if(cp)gsap.fromTo(cp,{clipPath:"inset(7% 4% 0% 4% round 32px)"},{clipPath:"inset(0% 0% 0% 0% round 28px)",ease:"power2.out",scrollTrigger:{trigger:cp,start:"top 96%",end:"top 50%",scrub:.6}});
/* speed skew on grids + marquee speeds up with scroll velocity */
var lean=$$("#wall,.svc-grid,.ins-grid,.steps");var sets=lean.map(function(el){return gsap.quickTo(el,"skewY",{duration:.6,ease:"power3"});});
var mt=document.querySelector(".marquee__track");var manim=mt&&mt.getAnimations&&mt.getAnimations()[0];var rate=1;
ScrollTrigger.create({onUpdate:function(self){var v=gsap.utils.clamp(-1.2,1.2,self.getVelocity()/-900);sets.forEach(function(s){s(v);});if(manim){var tgt=1+Math.min(Math.abs(self.getVelocity())/350,6);rate+= (tgt-rate)*.2;manim.playbackRate=rate;}}});
gsap.ticker.add(function(){if(manim&&rate>1.02){rate+=(1-rate)*.04;manim.playbackRate=rate;}});
/* click ring */
document.addEventListener("pointerdown",function(e){var r=document.createElement("i");r.className="clk";r.style.left=e.clientX+"px";r.style.top=e.clientY+"px";document.body.appendChild(r);gsap.fromTo(r,{scale:.1,opacity:1},{scale:1,opacity:0,duration:.75,ease:"power3.out",onComplete:function(){r.remove();}});});
window.addEventListener("load",function(){setTimeout(function(){ScrollTrigger.refresh();},600);});
})();
