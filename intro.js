(function(){
var P="https://play-lh.googleusercontent.com/";
var IDS=["a4BTzaql_JwNzoNuzeQUEicZOaPULVqxRyqWz_1lVuu6qDpdCCGwWdCVOF1xk093UyiVBcikDieq4zNYVKmUY24","x1_PBEHUi5MxIyL3ibm6j5oklLQ57mrKsSCOifI-0aDHnjl8EW9E7aF-PVrH7QLiqD7Cd7qsiw1BNW3eVw2W7g","kwLytJcDJ1GSt8uZcYa1eIQ4NDe2y--e_7v7QKd5XlasqOaLe0LvnX8-Z25gnY_fjOg6p6qAAwZMYoayTzDV","OX-P7GJCsDKhecH4Dc1MV89R4EnG41PAYVe5_iw7C8FNa4wsZuUj4ZIf8WCCLkHwLqVsZCCTBwjJLy_m_ReTUQ"];
var A=[
{n:"AI Essay Writer",b:"16",a:"120",u:"/day",k:"#78 → #2",c:"#8f7cff",x:"6%",y:"12%",r:-5,d:300},
{n:"PDF to Word",b:"100",a:"1,000",u:"/day",k:"#59 → #9",c:"#3ddcff",x:"66%",y:"8%",r:4,d:550},
{n:"Screen Mirroring",b:"4",a:"3,000+",u:"/day",k:"#239 → #9",c:"#ff8f4a",x:"4%",y:"64%",r:4,d:800},
{n:"Universal TV Remote",b:"60",a:"2,100+",u:" visitors",k:"#109 → #27",c:"#ff5c9e",x:"64%",y:"66%",r:-4,d:1050}
];
var K=[{t:"ai essay writer",v:"#2",x:"38%",y:"4%",d:1300},{t:"pdf to word",v:"#1",x:"40%",y:"90%",d:1450},{t:"screen mirroring",v:"#3",x:"1.5%",y:"40%",d:1600},{t:"all smart tv remote",v:"#8",x:"78%",y:"42%",d:1750}];
var css=[".intro-stage{position:absolute;inset:0;overflow:hidden;pointer-events:none}",
".intro-stage:before{content:'';position:absolute;left:50%;top:50%;width:min(64vw,640px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:1px dashed rgba(185,255,60,.35);box-shadow:0 0 90px rgba(185,255,60,.1) inset;animation:icspin 30s linear infinite}",
".intro-stage:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,rgba(143,124,255,.2),transparent 40%),radial-gradient(circle at 85% 80%,rgba(255,92,158,.16),transparent 40%),radial-gradient(circle at 80% 15%,rgba(61,220,255,.14),transparent 35%)}",
"@keyframes icspin{to{transform:translate(-50%,-50%) rotate(360deg)}}",
"@keyframes icin{from{opacity:0;transform:translateY(46px) scale(.7) rotate(calc(var(--r,0deg)*3))}to{opacity:1;transform:rotate(var(--r,0deg))}}",
"@keyframes icfloat{from{transform:rotate(var(--r,0deg)) translateY(0)}to{transform:rotate(var(--r,0deg)) translateY(-16px)}}",
".ic,.ick{position:absolute;left:var(--x);top:var(--y);z-index:1;opacity:0;animation:icin .8s cubic-bezier(.2,.8,.2,1) var(--d) forwards,icfloat 4.6s ease-in-out calc(var(--d) + .8s) infinite alternate}",
".ic{display:flex;align-items:center;gap:12px;padding:12px 14px 12px 12px;border-radius:20px;background:rgba(16,20,22,.82);border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.55),0 0 46px -8px var(--c);backdrop-filter:blur(8px)}",
".ic img{width:48px;height:48px;border-radius:13px;object-fit:cover;background:#1b2022;flex:none}",
".ic b{display:block;font:700 14px/1.2 Archivo,Inter,sans-serif;color:#fff;white-space:nowrap}",
".ic span{display:block;font:600 13px/1.2 JetBrains Mono,monospace;margin-top:5px;white-space:nowrap;color:#9aa5a0}",
".ic s{color:#ff6b6b;text-decoration:none}.ic em{color:#5dff8f;font-style:normal}",
".ic i{font:700 11px JetBrains Mono,monospace;font-style:normal;color:var(--c);padding:4px 9px;border-radius:999px;border:1px solid var(--c);white-space:nowrap}",
".ick{padding:8px 14px;border-radius:999px;font:600 12px JetBrains Mono,monospace;color:#cfd8d3;background:rgba(16,20,22,.75);border:1px solid rgba(255,255,255,.14);white-space:nowrap}",
".ick b{color:#b9ff3c;margin-left:6px}",
".loader__inner{position:relative;z-index:2}",
"@media(max-width:760px){.ick{display:none}.ic{padding:8px 10px;gap:8px;border-radius:14px}.ic img{width:34px;height:34px;border-radius:9px}.ic b{font-size:11px}.ic span{font-size:11px;margin-top:3px}.ic i{display:none}.ic0{left:4%!important;top:9%!important}.ic1{left:auto!important;right:4%;top:19%!important}.ic2{left:4%!important;top:auto!important;bottom:19%}.ic3{left:auto!important;right:4%;top:auto!important;bottom:8%}}",
"@media(prefers-reduced-motion:reduce){.ic,.ick{animation:none;opacity:1}.intro-stage:before{animation:none}}"].join("");
var ld=document.getElementById("loader");if(!ld)return;
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var h="";
A.forEach(function(a,i){h+="<div class=\"ic ic"+i+"\" style=\"--x:"+a.x+";--y:"+a.y+";--r:"+a.r+"deg;--c:"+a.c+";--d:"+a.d+"ms\"><img src=\""+P+IDS[i]+"=w128-h128-rw\" alt=\"\" referrerpolicy=\"no-referrer\"><div><b>"+a.n+"</b><span><s>"+a.b+"</s> → <em>"+a.a+"</em>"+a.u+"</span></div><i>"+a.k+"</i></div>";});
K.forEach(function(k){h+="<div class=\"ick\" style=\"--x:"+k.x+";--y:"+k.y+";--r:0deg;--d:"+k.d+"ms\">"+k.t+"<b>"+k.v+"</b></div>";});
var st=document.createElement("div");st.className="intro-stage";st.setAttribute("aria-hidden","true");st.innerHTML=h;ld.insertBefore(st,ld.firstChild);
})();
