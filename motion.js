/* Motion layer v2: Lenis + GSAP on desktop; light mode on phones/touch so scrolling stays native and smooth */
(function(){
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduce||!window.gsap||!window.ScrollTrigger)return;
var lite=matchMedia("(max-width: 900px), (hover: none)").matches;
gsap.registerPlugin(ScrollTrigger);
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var css=document.createElement("style");css.textContent=[
"html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:hidden}",
".ln{display:block;overflow:hidden;padding:.1em .08em .26em;margin:-.1em -.08em -.26em}.lni{display:block;will-change:transform}",
".clk{position:fixed;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;border:2px solid #b9ff3c;pointer-events:none;z-index:9999;box-shadow:0 0 24px rgba(185,255,60,.45)}",
".band{position:relative;overflow:hidden;padding:clamp(36px,6vw,80px) 0;z-index:2}",
".band__in{display:flex;white-space:nowrap;width:max-content;transform:rotate(-2deg);margin:0 -6vw;padding:clamp(12px,2vw,24px) 0;background:#b9ff3c;color:#07090a;font:900 clamp(26px,5.4vw,76px)/1 Archivo,Inter,sans-serif;font-stretch:112%;letter-spacing:-.03em;text-transform:uppercase}",
".band__in span{padding:0 .5em;display:inline-flex;align-items:center;gap:.5em}.band__in em{font-style:normal;font-size:.55em}"
].join("");document.head.appendChild(css);
var lenis=null;
if(!lite&&window.Lenis){document.documentElement.style.scrollBehavior="auto";lenis=new Lenis({lerp:0.085,smoothWheel:true,wheelMultiplier:1});window.__lenis=lenis;lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000);});gsap.ticker.lagSmoothing(0);
function sync(){var lock=document.body.classList.contains("is-loading")||document.querySelector(".lb.on")||document.querySelector(".menu.open");if(lock)lenis.stop();else lenis.start();}
sync();new MutationObserver(sync).observe(document.body,{attributes:true,subtree:true,attributeFilter:["class"]});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href^='#']");if(!a)return;var id=a.getAttribute("href");var t=id.length>1?document.querySelector(id):null;if(id==="#top"||id==="#"){e.preventDefault();lenis.scrollTo(0,{duration:1.6,easing:function(x){return 1-Math.pow(1-x,4);}});return;}if(!t)return;e.preventDefault();setTimeout(function(){lenis.scrollTo(t,{offset:-10,duration:1.6,easing:function(x){return 1-Math.pow(1-x,4);}});},60);});}
$$("h2.display").forEach(function(h){if(h.closest(".contact"))return;var parts=h.innerHTML.split(/<br\s*\/?>/i);h.innerHTML=parts.map(function(p){return "<span class=\"ln\"><span class=\"lni\">"+p+"</span></span>";}).join("");var ins=$$(".lni",h);gsap.from(ins,{yPercent:115,rotate:lite?0:3,duration:1.1,ease:"expo.out",stagger:.12,scrollTrigger:{trigger:h,start:"top 90%",once:true}});});
function band(txt,before,dir){var el=document.createElement("div");el.className="band";el.setAttribute("aria-hidden","true");var one=txt.map(function(w){return "<span>"+w+"<em>✦</em></span>";}).join("");el.innerHTML="<div class=\"band__in\">"+one+one+one+"</div>";var ref=document.querySelector(before);if(!ref)return;ref.parentNode.insertBefore(el,ref);var inn=el.firstChild;gsap.fromTo(inn,{x:dir>0?"-34%":"0%"},{x:dir>0?"0%":"-34%",ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:true}});}
band(["ASO","Keywords","Store listing CRO","UAC","Localization","Rank #1"],"#reviews",-1);
if(!lite){
var pt=document.querySelector("#aboutMe");if(pt){var pi=pt.querySelector("img");if(pi)gsap.fromTo(pi,{yPercent:-7,scale:1.16},{yPercent:7,scale:1.16,ease:"none",scrollTrigger:{trigger:pt,start:"top bottom",end:"bottom top",scrub:true}});}
var cp=document.querySelector("#casePanel");if(cp)gsap.fromTo(cp,{clipPath:"inset(7% 4% 0% 4% round 32px)"},{clipPath:"inset(0% 0% 0% 0% round 28px)",ease:"power2.out",scrollTrigger:{trigger:cp,start:"top 96%",end:"top 50%",scrub:.6}});
var lean=$$("#wall,.svc-grid,.steps");var sets=lean.map(function(el){return gsap.quickTo(el,"skewY",{duration:.6,ease:"power3"});});
ScrollTrigger.create({onUpdate:function(self){var v=gsap.utils.clamp(-1.2,1.2,self.getVelocity()/-900);sets.forEach(function(s){s(v);});}});
document.addEventListener("pointerdown",function(e){var r=document.createElement("i");r.className="clk";r.style.left=e.clientX+"px";r.style.top=e.clientY+"px";document.body.appendChild(r);gsap.fromTo(r,{scale:.1,opacity:1},{scale:1,opacity:0,duration:.75,ease:"power3.out",onComplete:function(){r.remove();}});});
}
window.addEventListener("load",function(){setTimeout(function(){ScrollTrigger.refresh();},600);});
})();
