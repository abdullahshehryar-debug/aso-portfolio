/* v5 layer v2: hero portrait + name stage, rank climb, popup, grid bg, blur words, reviews autoplay */
(function(){
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;var lite=matchMedia("(max-width: 900px), (hover: none)").matches;var G=window.gsap&&window.ScrollTrigger;
function maskH2(h){var parts=h.innerHTML.split(/<br\s*\/?>/i);h.innerHTML=parts.map(function(p){return "<span class=\"ln\"><span class=\"lni\">"+p+"</span></span>";}).join("");if(G&&!reduce)gsap.from($$(".lni",h),{yPercent:115,duration:1.1,ease:"expo.out",stagger:.12,scrollTrigger:{trigger:h,start:"top 90%",once:true}});}
/* ---------- keyword rank climb (real positions from the rank trackers) ---------- */
var R=[["ai essay writer","AI Essay Writer",78,2,"#8f7cff"],["pdf to word converter","PDF to Word Converter",59,9,"#3ddcff"],["docx to pdf converter","PDF to Word Converter",31,1,"#3ddcff"],["screen mirroring","Screen Mirroring App",239,9,"#ff8f4a"],["miracast","Screen Mirroring App",93,3,"#ff8f4a"],["universal tv remote","Universal TV Remote",109,27,"#ff5c9e"],["all smart tv remote","Universal TV Remote",68,8,"#ff5c9e"],["mobile number tracker app","Mobile Number Tracker",56,3,"#4dff9a"]];
var MAXR=260;function xp(r){return 100*(1-Math.log(r)/Math.log(MAXR));}
var work=document.getElementById("work");
if(work){var sec=document.createElement("section");sec.className="section ranks";sec.id="ranks";
var rows=R.map(function(r){return "<div class=\"rk__row\" style=\"--ac:"+r[4]+"\"><div class=\"rk__k\"><b>“"+r[0]+"”</b><span>"+r[1]+"</span></div><div class=\"rk__track\"><i class=\"rk__top\" style=\"left:"+xp(10)+"%;right:0\"></i><i class=\"rk__ln\" style=\"left:"+xp(r[2])+"%;width:0\"></i><i class=\"rk__d rk__d--b\" style=\"left:"+xp(r[2])+"%\"></i><i class=\"rk__d rk__d--a\" style=\"left:"+xp(r[2])+"%\"></i></div><div class=\"rk__n\"><s>#"+r[2]+"</s><em>→</em><b>#"+r[2]+"</b></div></div>";}).join("");
sec.innerHTML="<div class=\"wrap\"><div class=\"sec-head\"><p class=\"eyebrow\"><span></span>Keyword rankings</p><h2 class=\"display h2\">Keywords that<br><span class=\"accent\">climb.</span></h2><p class=\"sec-sub\">Real store positions from rank trackers, before ASO and after. Left is buried, right is page one.</p></div><div class=\"rk\"><div class=\"rk__head\"><span>Keyword</span><span>Position in the store</span><span>Before → after</span></div>"+rows+"</div><p class=\"rk__note\">US Google Play positions · taken from the rank-tracker screenshots in each case study</p></div>";
work.parentNode.insertBefore(sec,work);maskH2(sec.querySelector("h2"));
$$(".rk__row",sec).forEach(function(row,i){var d=R[i],ln=row.querySelector(".rk__ln"),da=row.querySelector(".rk__d--a"),nb=row.querySelector(".rk__n b"),x0=xp(d[2]);var done=false;
function setV(v){var x=xp(v);da.style.left=x+"%";ln.style.width=Math.max(0,x-x0)+"%";nb.textContent="#"+Math.round(v);}
function run(){if(done)return;done=true;if(reduce){setV(d[3]);return;}var t0=null,dur=1900;setTimeout(function(){requestAnimationFrame(function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;setV(d[2]+(d[3]-d[2])*e);if(p<1)requestAnimationFrame(step);});},i*140);}
function chk(){if(row.getBoundingClientRect().top<innerHeight*.85){run();removeEventListener("scroll",chk);}}addEventListener("scroll",chk,{passive:true});chk();});}
/* ---------- hero: portrait card + name stage with eyes ---------- */
var hero=document.querySelector(".hero");var hg=hero&&hero.querySelector(".hero__grid");
if(hg){var fig=document.createElement("figure");fig.className="hero__me";fig.innerHTML="<img alt=\"Abdullah Shehrayar\" decoding=\"async\"><svg class=\"hero__badge\" viewBox=\"0 0 120 120\" aria-hidden=\"true\"><defs><path id=\"hb\" d=\"M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0\"/></defs><text><textPath href=\"#hb\">APP STORE ✦ GOOGLE PLAY ✦ ASO ✦ </textPath></text></svg><span class=\"hero__badge-c\">✦</span><figcaption><span>Punjab, Pakistan</span><span>Working worldwide</span></figcaption>";hg.appendChild(fig);
var img=fig.querySelector("img"),tries=0;(function fill(){var s=document.getElementById("heroMe");if(s&&s.src&&s.src.length>20){img.src=s.src;}else if(tries++<40)setTimeout(fill,150);})();}
if(hero){var nm=document.createElement("div");nm.className="nm";nm.setAttribute("aria-hidden","true");var bt=["Google Play","App Store","Keywords","Conversion","Rankings","Installs","Revenue"].map(function(w){return "<span>"+w+" ✦</span>";}).join("");
nm.innerHTML="<div class=\"nm__r nm__r1\"><span>Abdullah</span><i class=\"nm__eye\"><b></b></i></div><div class=\"nm__band\"><div>"+bt+bt+"</div></div><div class=\"nm__r nm__r2\"><i class=\"nm__eye\"><b></b></i><span>Shehrayar</span></div>";hero.appendChild(nm);
var eyes=$$(".nm__eye",nm),px=innerWidth/2,py=innerHeight/2,auto=lite,vis=false;
addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;px=e.clientX;py=e.clientY;auto=false;},{passive:true});
new IntersectionObserver(function(es){vis=es[0].isIntersecting;},{}).observe(nm);
(function look(t){if(vis){eyes.forEach(function(eye){var r=eye.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,tx=px,ty=py;if(auto){tx=cx+Math.sin(t/900)*400;ty=cy+Math.cos(t/1300)*120;}var dx=tx-cx,dy=ty-cy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/380);eye.firstChild.style.transform="translate("+(dx/d)*k*r.width*.3+"px,"+(dy/d)*k*r.height*.12+"px)";});}requestAnimationFrame(look);})(0);
if(G&&!reduce&&!lite){gsap.fromTo(nm.querySelector(".nm__r1"),{xPercent:-7},{xPercent:5,ease:"none",scrollTrigger:{trigger:nm,start:"top bottom",end:"bottom top",scrub:true}});gsap.fromTo(nm.querySelector(".nm__r2"),{xPercent:7},{xPercent:-5,ease:"none",scrollTrigger:{trigger:nm,start:"top bottom",end:"bottom top",scrub:true}});}}
/* ---------- glowing grid background (desktop only) ---------- */
if(!lite&&!reduce){var gb=document.createElement("div");gb.className="gbg";gb.setAttribute("aria-hidden","true");var cells=[];for(var c=0;c<10;c++){var el=document.createElement("i");gb.appendChild(el);cells.push(el);}document.body.insertBefore(gb,document.body.firstChild);
setInterval(function(){var el=cells[Math.floor(Math.random()*cells.length)];var cols=Math.ceil(innerWidth/72),rws=Math.ceil(innerHeight/72);el.style.left=Math.floor(Math.random()*cols)*72+"px";el.style.top=Math.floor(Math.random()*rws)*72+"px";el.classList.add("on");setTimeout(function(){el.classList.remove("on");},1500+Math.random()*1500);},800);}
/* ---------- words sharpen out of a blur (desktop only) ---------- */
if(G&&!reduce&&!lite){$$(".sec-sub,#about p").forEach(function(p){if(p.children.length||p.classList.contains("eyebrow")||p.classList.contains("mono")||p.textContent.trim().length<40)return;var words=p.textContent.trim().split(/\s+/);p.innerHTML=words.map(function(w){return "<span class=\"bw\" style=\"display:inline-block\">"+w+"</span>";}).join(" ");gsap.fromTo($$(".bw",p),{opacity:.12,filter:"blur(7px)"},{opacity:1,filter:"blur(0px)",ease:"none",stagger:.05,scrollTrigger:{trigger:p,start:"top 90%",end:"bottom 58%",scrub:true}});});}
/* ---------- reviews rotate by themselves ---------- */
(function(){var rv=document.getElementById("reviews"),nx=document.getElementById("revNext"),tr=document.getElementById("revTrack");if(!rv||!nx||!tr)return;var hover=false;tr.addEventListener("mouseenter",function(){hover=true;});tr.addEventListener("mouseleave",function(){hover=false;});tr.addEventListener("touchstart",function(){hover=true;},{passive:true});tr.addEventListener("touchend",function(){setTimeout(function(){hover=false;},2500);},{passive:true});
setInterval(function(){if(hover||document.hidden||reduce)return;var r=rv.getBoundingClientRect();if(r.bottom<80||r.top>innerHeight-80)return;nx.click();},1500);})();
/* ---------- welcome popup ---------- */
(function(){var seen=false;try{seen=sessionStorage.getItem("popSeen")==="1";}catch(e){}if(seen)return;var ph=document.querySelector("#aboutMe img");var pop=document.createElement("div");pop.className="pop";pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Quick contact");
pop.innerHTML=(ph?"<img alt=\"\" src=\""+ph.src+"\">":"")+"<div><b>Launching or stuck on an app?</b><p>Send me your store link and get a free ASO audit.</p><div class=\"pop__a\"><a href=\"https://wa.me/923277594301?text=Hi%20Abdullah%2C%20I%20need%20an%20ASO%20audit\" target=\"_blank\" rel=\"noopener\">WhatsApp</a><a href=\"#results\">See results →</a></div></div><button class=\"pop__x\" type=\"button\" aria-label=\"Close\">×</button>";document.body.appendChild(pop);
function close(){pop.classList.remove("on");try{sessionStorage.setItem("popSeen","1");}catch(e){}}pop.querySelector(".pop__x").addEventListener("click",close);pop.querySelector("a[href^=\"#\"]").addEventListener("click",close);
setTimeout(function(){pop.classList.add("on");},lite?14000:9000);})();
window.addEventListener("load",function(){setTimeout(function(){if(window.ScrollTrigger)ScrollTrigger.refresh();},700);});
})();

/* v5.3 cleanup */
(function(){var c=document.querySelectorAll(".rating-card .mono.dim");if(c.length){c[0].textContent="Verified client reviews";for(var i=1;i<c.length;i++)c[i].remove();}var n=document.querySelector(".rev-note");if(n)n.remove();})();

/* v5.6 combined results + case detail */
(function(){var res=document.getElementById("results"),list=document.getElementById("caseList");if(!res||!list)return;
var firstWr=res.querySelector(".wr");if(!firstWr)return;var wall=firstWr.parentElement;
var host=document.createElement("div");host.id="caseDetail";host.className="cd";wall.insertAdjacentElement("afterend",host);
var rk=document.getElementById("ranks");if(rk){var box=document.createElement("div");box.className="cd-ranks";[].slice.call(rk.querySelectorAll(".wrap > *")).forEach(function(n){box.appendChild(n);});res.querySelector(".wrap").appendChild(box);rk.style.display="none";}
var cache={},busy=false;
function q(p,s){return p.querySelector(s);}
function snap(i,cb){if(cache[i])return cb(cache[i]);var bs=list.querySelectorAll("button");if(!bs[i])return;if(busy)return;busy=true;bs[i].click();setTimeout(function(){var p=document.getElementById("casePanel");var d={};
d.name=(q(p,".cp-app__n")||{}).textContent||"";var ap=q(p,".cp-app");d.icon=ap&&q(ap,"img")?q(ap,"img").outerHTML:"";d.sub=ap&&ap.querySelectorAll("p")[1]?ap.querySelectorAll("p")[1].textContent:"";
d.tags=[].map.call(p.querySelectorAll(".cp-head .tag"),function(x){return x.textContent.trim();});d.sum=(q(p,".cp-sum")||{}).textContent||"";
d.big=[].map.call(p.querySelectorAll(".cp-big > div"),function(x){return [q(x,"b").textContent,q(x,"span").textContent];});
d.m=[].map.call(p.querySelectorAll(".cp-metrics .m"),function(m){return {l:q(m,".m__l").textContent,v:q(m,".m__v").innerHTML};});
d.figs=[].map.call(p.querySelectorAll(".px__fig"),function(f){var b=q(f,".px__cap b");return {s:q(f,"img").src,t:b.textContent,c:q(f,".px__cap").textContent.replace(b.textContent,"").trim()};});
d.steps=[].map.call(p.querySelectorAll(".cp-steps span"),function(x){return x.textContent;});d.ins=(q(p,".cp-insight")||{}).textContent||"";
cache[i]=d;busy=false;cb(d);},900);}
function render(d){var h='<div class="cd__bar"><span class="mono dim">Case study</span><button class="cd__x" type="button">Close \u2715</button></div>';
h+='<h3 class="display cd__t">'+d.name+'</h3><div class="c5__head">'+d.icon+'<div><span class="mono dim">'+d.sub+'</span></div></div>';
h+='<div class="c5__chips">'+d.tags.map(function(x){return "<span>"+x+"</span>";}).join("")+'</div><p class="c5__d">'+d.sum+'</p>';
h+='<div class="cd__big">'+d.big.map(function(b){return "<div><b>"+b[0]+"</b><span>"+b[1]+"</span></div>";}).join("")+'</div>';
h+='<div class="c5__stats cd__stats">'+d.m.map(function(c){return '<div class="c5__card"><h4>'+c.l+'</h4><div class="c5__v">'+c.v+'</div></div>';}).join("")+'</div>';
h+='<div class="c5__grid">'+d.figs.map(function(f){return '<figure class="c5__fig"><img src="'+f.s+'" alt="'+f.t+'" loading="lazy"><figcaption><b>'+f.t+'</b>'+f.c+'</figcaption></figure>';}).join("")+'</div>';
if(d.steps.length)h+='<p class="mono dim cd__sub">The playbook</p><div class="c5__chips">'+d.steps.map(function(x){return "<span>"+x+"</span>";}).join("")+'</div>';
if(d.ins)h+='<p class="c5__d">'+d.ins+'</p>';return h;}
function open(i){snap(i,function(d){host.innerHTML=render(d);host.classList.add("on");var y=host.getBoundingClientRect().top+window.scrollY-90;if(window.__lenis)window.__lenis.scrollTo(y);else window.scrollTo({top:y,behavior:"smooth"});});}
document.addEventListener("click",function(e){var w=e.target.closest&&e.target.closest("#results .wr");if(w){e.preventDefault();e.stopImmediatePropagation();open(+w.getAttribute("data-i")||0);return;}
if(e.target.closest&&e.target.closest(".cd__x")){host.classList.remove("on");host.innerHTML="";var y=wall.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:y,behavior:"smooth"});return;}
var f=e.target.closest&&e.target.closest("#caseDetail .c5__fig");var lb=document.querySelector(".lb");if(f&&lb){lb.querySelector("img").src=f.querySelector("img").src;lb.querySelector(".lb__cap").textContent=f.querySelector("b").textContent+" \u00b7 tap anywhere to close";lb.classList.add("on");}},true);
document.addEventListener("keydown",function(e){if(e.key!=="Enter"&&e.key!==" ")return;var w=e.target.closest&&e.target.closest("#results .wr");if(w){e.preventDefault();e.stopImmediatePropagation();open(+w.getAttribute("data-i")||0);}},true);
})();
