import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GLOBAL STYLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#06000b;overflow-x:hidden;font-family:'Jost',sans-serif;}
body,*{cursor:none!important;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(232,121,154,.4);border-radius:4px;}
input,textarea,select{font-family:'Jost',sans-serif;color-scheme:dark;}
input::placeholder,textarea::placeholder{color:rgba(255,255,255,.22);}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px);filter:blur(6px);}to{opacity:1;transform:translateY(0);filter:blur(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes titleSlide{from{opacity:0;transform:translateY(54px) skewY(2.5deg);}to{opacity:1;transform:translateY(0) skewY(0);}}
@keyframes lineGrow{from{transform:scaleX(0);}to{transform:scaleX(1);}}
@keyframes rotateSlow{to{transform:rotate(360deg);}}
@keyframes rotateRev{to{transform:rotate(-360deg);}}
@keyframes blobDrift{0%,100%{transform:translate(0,0) scale(1);opacity:.45;}33%{transform:translate(32px,-22px) scale(1.07);opacity:.6;}66%{transform:translate(-20px,16px) scale(.95);opacity:.35;}}
@keyframes dotPulse{0%,100%{box-shadow:0 0 8px #e8799a,0 0 18px rgba(232,121,154,.5);}50%{box-shadow:0 0 18px #e8799a,0 0 40px rgba(232,121,154,.75),0 0 60px rgba(232,121,154,.25);}}
@keyframes cardIn{from{opacity:0;transform:translateY(36px) scale(.87);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes shimmer{0%{background-position:0% center;}100%{background-position:200% center;}}
@keyframes flicker{0%,100%{opacity:1;}47%{opacity:.92;}48%{opacity:.96;}49%{opacity:.9;}50%{opacity:1;}}
@keyframes scrollBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(7px);}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes noiseShift{0%{transform:translate(0,0);}25%{transform:translate(-2%,-1%);}50%{transform:translate(1%,2%);}75%{transform:translate(-1%,1%);}100%{transform:translate(0,0);}}
@keyframes drawerIn{from{transform:translateX(100%);}to{transform:translateX(0);}}
@keyframes modalIn{from{opacity:0;transform:scale(.93) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
@keyframes successPop{from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);}}

@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr!important;}
  .hero-right{display:none!important;}
  .hero-left{padding:110px 0 70px!important;}
  .about-grid{grid-template-columns:1fr!important;}
  .shop-grid{grid-template-columns:repeat(auto-fill,minmax(250px,1fr))!important;}
  .reviews-grid{grid-template-columns:1fr!important;}
  .contact-grid{grid-template-columns:1fr!important;}
  .checkout-fields{grid-template-columns:1fr 1fr!important;}
  .nav-links{display:none!important;}
  .hamburger{display:flex!important;}
  .section-pad{padding:80px 24px!important;}
}
@media(max-width:600px){
  .checkout-fields{grid-template-columns:1fr!important;}
  .hero-stats{gap:24px!important;}
}
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PRODUCTS = [
  {id:1,  name:"Bourbon Vanilla",    mood:"romantic",  price:199,burn:"6hr+", desc:"French Bourbon, vanilla beans & creamy woods. Vegan soy-coconut wax.",color:"#c0392b",glow:"#e8799a"},
  {id:2,  name:"English Lavender",   mood:"calm",      price:199,burn:"6hr+", desc:"Herbaceous rosemary, earthy sage, tonka bean & soft musk.",            color:"#8e44ad",glow:"#c39bd3"},
  {id:3,  name:"Romantic Rose",      mood:"romantic",  price:199,burn:"6hr+", desc:"Sun-kissed citrus and fresh florals to lift your spirits.",             color:"#c0392b",glow:"#f1948a"},
  {id:4,  name:"Royal Oud",          mood:"spiritual", price:199,burn:"6hr+", desc:"Bergamot, lemon zest & sweet peach for your brightest days.",           color:"#d4a017",glow:"#f7dc6f"},
  {id:5,  name:"Very Berry",         mood:"happy",     price:529,burn:"12hr",  desc:"Strawberry macaron — playful, fruity & impossibly sweet.",             color:"#e91e8c",glow:"#f48fb1"},
  {id:6,  name:"Tiny Love Buds",     mood:"romantic",  price:299,burn:"42hr",  desc:"Smoky vetiver, grey amber & violet for introspective evenings.",        color:"#6c3483",glow:"#bb8fce"},
  {id:7,  name:"Sweet Tooth",        mood:"calm",      price:299,burn:"40hr",  desc:"White sage, eucalyptus & cedar for a perfectly still mind.",           color:"#1e8449",glow:"#82e0aa"},
  {id:8,  name:"The Love Pillar",    mood:"romantic",  price:299,burn:"32hr",  desc:"Sea salt, driftwood & light musk to find your inner peace.",           color:"#1a5276",glow:"#7fb3d3"},
  {id:9,  name:"Rubik's Candle",     mood:"energetic", price:299,burn:"38hr",  desc:"Peppermint, rosemary & black pepper to ignite your energy.",           color:"#ba4a00",glow:"#f0b27a"},
  {id:10, name:"Teddy Candles",      mood:"energetic", price:299,burn:"50hr",  desc:"Espresso, cardamom & grapefruit — your perfect morning ritual.",       color:"#922b21",glow:"#f1948a"},
  {id:11, name:"Shoreline Shot",     mood:"happy",     price:250,burn:"9hr",   desc:"Sacred lotus, frankincense & camphor for meditation.",                 color:"#0e6655",glow:"#76d7c4"},
  {id:12, name:"Petals in Pine",     mood:"spiritual", price:399,burn:"60hr",  desc:"Amber, sandalwood & tuberose — a devotional experience in wax.",       color:"#1d6a27",glow:"#58d68d"},
  {id:13, name:"Better Together",    mood:"romantic",  price:249,burn:"6hr+",  desc:"Beautiful paired sculpture candle for moments shared.",                color:"#922b21",glow:"#f48fb1"},
  {id:14, name:"Golden Petal Aroma", mood:"romantic",  price:250,burn:"8hr+",  desc:"Amber, sandalwood & tuberose — a devotional experience in wax.",       color:"#9a7d0a",glow:"#f9e79f"},
  {id:15, name:"Beauty & Elegance",  mood:"spiritual", price:329,burn:"60hr",  desc:"Refined blend of white florals and warm musk for the soul.",           color:"#6c3483",glow:"#c39bd3"},
  {id:16, name:"Petal Peony",        mood:"spiritual", price:250,burn:"60hr",  desc:"Soft peony petals with sandalwood warmth.",                            color:"#a93226",glow:"#f8c8d4"},
  {id:17, name:"Springtime Bundle",  mood:"spiritual", price:299,burn:"60hr",  desc:"A garden in bloom — layered floral and green accord.",                 color:"#1e8449",glow:"#a9dfbf"},
  {id:18, name:"Chai & Chill",       mood:"happy",     price:199,burn:"4hr+",  desc:"Warm masala chai spices in melted wax form.",                          color:"#935116",glow:"#f0b27a"},
  {id:19, name:"Daisy Vibe",         mood:"calm",      price:199,burn:"4hr+",  desc:"Fresh daisy, clean cotton & light woods.",                             color:"#9a7d0a",glow:"#f9e79f"},
  {id:20, name:"Cinderella Cart",    mood:"energetic", price:399,burn:"4hr+",  desc:"Sparkling citrus and fairy-dust musk — pure whimsy.",                  color:"#1a5276",glow:"#85c1e9"},
  {id:21, name:"Roses & Mogra",      mood:"spiritual", price:450,burn:"4hr+",  desc:"The sacred union of rose and mogra — pure devotion.",                  color:"#922b21",glow:"#f1948a"},
  {id:22, name:"Spooky Friends",     mood:"energetic", price:329,burn:"4hr+",  desc:"Dark woods, smoked cedar & a whisper of mystery.",                     color:"#1e6823",glow:"#58d68d"},
  {id:23, name:"Christmas Carousel", mood:"happy",     price:349,burn:"4hr+",  desc:"Cinnamon, clove & pine — a holiday dream.",                            color:"#922b21",glow:"#f1948a"},
  {id:24, name:"Walk the Plank",     mood:"energetic", price:399,burn:"7hr+",  desc:"Sea salt, oakmoss & driftwood for the adventurous soul.",              color:"#1a5276",glow:"#7fb3d3"},
];

const MOODS_LIST = ["All","romantic","calm","happy","energetic","spiritual"];
const MOOD_LABEL = {romantic:"Romantic",calm:"Calm",happy:"Happy",energetic:"Energetic",spiritual:"Spiritual"};

const COUPONS = {
  SCENTRA10:{discount:10,type:"percent",label:"10% off your order"},
  WELCOME20:{discount:20,type:"percent",label:"20% off for new customers"},
  FLAT50:   {discount:50, type:"flat",  label:"₹50 flat off"},
  MOOD15:   {discount:15,type:"percent",label:"15% off — special code"},
  HOLI100:  {discount:100,type:"flat",  label:"₹100 off on festive orders"},
};

const SEED_REVIEWS = [
  {name:"Priya S.",  product:"Bourbon Vanilla",  stars:5,text:"Absolutely divine! My room smells like a luxury spa. The flame is steady and the throw is incredible.",date:"2 Jan 2025"},
  {name:"Arjun M.",  product:"Royal Oud",         stars:5,text:"Bought this as a gift and the recipient was blown away. Packaging is beautiful and the scent is rich.",date:"15 Dec 2024"},
  {name:"Shreya K.", product:"English Lavender",  stars:4,text:"Perfect for winding down after work. Lavender is realistic and not overpowering. Will buy again!",  date:"3 Nov 2024"},
  {name:"Riya D.",   product:"Petals in Pine",    stars:5,text:"I burn this during meditation sessions. Something about it that just centers me completely.",         date:"28 Oct 2024"},
  {name:"Kabir T.",  product:"Chai & Chill",      stars:5,text:"Smells exactly like cutting chai on a rainy morning. Genuinely comforting — I'm obsessed.",          date:"10 Oct 2024"},
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UTILITY HOOKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useReveal(threshold=0.12){
  const ref=useRef(null);const[vis,setVis]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);o.disconnect();}},{threshold});
    if(ref.current)o.observe(ref.current);return()=>o.disconnect();
  },[threshold]);
  return[ref,vis];
}
function useScrollY(){
  const[y,setY]=useState(0);
  useEffect(()=>{const f=()=>setY(window.scrollY);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);
  return y;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LIVE FLAME CANVAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Flame({w=50,h=72,intensity=1,seed=0}){
  const ref=useRef(null),raf=useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;
    const ctx=c.getContext("2d");c.width=w;c.height=h;
    let t=seed*.8;
    function draw(){
      ctx.clearRect(0,0,w,h);
      const cx=w/2,by=h-4;
      for(let l=3;l>=0;l--){
        const sc=1-l*.19,f1=Math.sin(t*3.9+l)*(5.5*intensity),f2=Math.cos(t*2.5+l*1.7)*(3.8*intensity);
        const fh=h*.82*sc*intensity;
        const g=ctx.createRadialGradient(cx,by-fh*.28,1,cx,by-fh*.54,fh);
        if(l===0){
          g.addColorStop(0,"rgba(255,255,255,.97)");
          g.addColorStop(.15,"rgba(255,228,165,.9)");
          g.addColorStop(.45,"rgba(232,121,154,.72)");
          g.addColorStop(1,"rgba(0,0,0,0)");
        }else{
          const a=(0.13-l*.022)*intensity;
          g.addColorStop(0,`rgba(232,121,154,${a+.05})`);
          g.addColorStop(1,"rgba(0,0,0,0)");
        }
        ctx.beginPath();
        ctx.moveTo(cx+f1,by);
        ctx.bezierCurveTo(cx+w*.38*sc+f2,by-fh*.33,cx+w*.19*sc+f1*.4,by-fh*.67,cx+f1*.22,by-fh);
        ctx.bezierCurveTo(cx-w*.19*sc+f2*.4,by-fh*.67,cx-w*.38*sc+f1,by-fh*.33,cx-f1*.38,by);
        ctx.closePath();ctx.fillStyle=g;ctx.fill();
      }
      t+=.043;raf.current=requestAnimationFrame(draw);
    }
    draw();return()=>cancelAnimationFrame(raf.current);
  },[w,h,intensity,seed]);
  return<canvas ref={ref} style={{display:"block"}}/>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARTICLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Particles(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;const ctx=c.getContext("2d");
    let W=c.width=window.innerWidth,H=c.height=window.innerHeight;
    const pts=Array.from({length:95},()=>({
      x:Math.random()*W,y:H+Math.random()*H*.5,
      vx:(Math.random()-.5)*.44,vy:-(Math.random()*.95+.22),
      r:Math.random()*1.8+.3,a:Math.random()*.52+.1,
      hue:[340,18,272,350][Math.floor(Math.random()*4)],
      life:Math.random(),ml:.5+Math.random()*.5,
      wb:Math.random()*Math.PI*2,ws:(Math.random()-.5)*.023,
    }));
    let raf;
    function tick(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.wb+=p.ws;p.x+=p.vx+Math.sin(p.wb)*.27;p.y+=p.vy;p.life+=.0033;
        if(p.life>p.ml||p.y<-20){p.x=Math.random()*W;p.y=H+10;p.life=0;}
        const alpha=p.a*Math.sin((p.life/p.ml)*Math.PI);
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.hue},54%,76%,${alpha})`;ctx.fill();
      });
      raf=requestAnimationFrame(tick);
    }
    tick();
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return<canvas ref={ref} style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1}}/>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAGNETIC CURSOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MagCursor(){
  const dot=useRef(null),ring=useRef(null);
  const pos=useRef({x:-200,y:-200}),rp=useRef({x:-200,y:-200});
  useEffect(()=>{
    const mv=e=>{pos.current={x:e.clientX,y:e.clientY};};
    window.addEventListener("mousemove",mv);
    let raf;
    function loop(){
      rp.current.x+=(pos.current.x-rp.current.x)*.11;
      rp.current.y+=(pos.current.y-rp.current.y)*.11;
      if(dot.current)dot.current.style.transform=`translate(${pos.current.x-5}px,${pos.current.y-5}px)`;
      if(ring.current)ring.current.style.transform=`translate(${rp.current.x-18}px,${rp.current.y-18}px)`;
      raf=requestAnimationFrame(loop);
    }
    loop();
    return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(raf);};
  },[]);
  return<>
    <div ref={dot} style={{position:"fixed",top:0,left:0,width:10,height:10,background:"#e8799a",borderRadius:"50%",pointerEvents:"none",zIndex:99999,willChange:"transform",boxShadow:"0 0 8px #e8799a,0 0 22px rgba(232,121,154,.55)"}}/>
    <div ref={ring} style={{position:"fixed",top:0,left:0,width:36,height:36,border:"1.5px solid rgba(242,167,187,.4)",borderRadius:"50%",pointerEvents:"none",zIndex:99998,willChange:"transform"}}/>
  </>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MORPH WORD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const HERO_WORDS=["Romance","Calm","Energy","Spirit","Longing","Bliss"];
function MorphWord(){
  const[i,setI]=useState(0),[ph,setPh]=useState("in");
  useEffect(()=>{const t=setTimeout(()=>setPh("out"),2400);return()=>clearTimeout(t);},[i]);
  useEffect(()=>{
    if(ph!=="out")return;
    const t=setTimeout(()=>{setI(v=>(v+1)%HERO_WORDS.length);setPh("in");},480);
    return()=>clearTimeout(t);
  },[ph]);
  return(
    <span style={{
      display:"inline-block",fontStyle:"italic",
      background:"linear-gradient(135deg,#f2a7bb 0%,#e8799a 45%,#c0392b 100%)",
      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
      opacity:ph==="in"?1:0,
      transform:ph==="in"?"translateY(0) scale(1)":"translateY(-18px) scale(.88)",
      filter:ph==="in"?"blur(0)":"blur(9px)",
      transition:"all .47s cubic-bezier(.16,1,.3,1)",
      minWidth:220,
    }}>{HERO_WORDS[i]}</span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COUNTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Counter({to,suffix=""}){
  const[v,setV]=useState(0);const ref=useRef(null);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return;o.disconnect();
      let n=0;const step=Math.ceil(to/50);
      const iv=setInterval(()=>{n+=step;if(n>=to){setV(to);clearInterval(iv);}else setV(n);},26);
    });
    if(ref.current)o.observe(ref.current);return()=>o.disconnect();
  },[to]);
  return<span ref={ref}>{v}{suffix}</span>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D TILT CARD (hero featured)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FEATURED=[
  {name:"Bourbon Vanilla",mood:"Romantic",price:199,color:"#c0392b",glow:"#e8799a"},
  {name:"English Lavender",mood:"Calm",price:199,color:"#8e44ad",glow:"#c39bd3"},
  {name:"Royal Oud",mood:"Spiritual",price:199,color:"#d4a017",glow:"#f7dc6f"},
  {name:"Petals in Pine",mood:"Peaceful",price:399,color:"#27ae60",glow:"#82e0aa"},
  {name:"Shoreline Shot",mood:"Happy",price:250,color:"#2980b9",glow:"#7fb3d3"},
  {name:"Chai & Chill",mood:"Cozy",price:199,color:"#e67e22",glow:"#f0b27a"},
];
function TiltCard({c,delay,seed}){
  const r=useRef(null);
  const[tilt,setTilt]=useState({x:0,y:0}),[hov,setHov]=useState(false);
  const mv=useCallback(e=>{
    const rect=r.current.getBoundingClientRect();
    setTilt({x:((e.clientX-rect.left)/rect.width-.5)*22,y:((e.clientY-rect.top)/rect.height-.5)*-22});
  },[]);
  return(
    <div ref={r} onMouseMove={mv} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setTilt({x:0,y:0});}}
      style={{perspective:580,opacity:0,animation:`cardIn .7s cubic-bezier(.16,1,.3,1) ${delay} forwards`}}>
      <div style={{
        background:hov?"rgba(255,255,255,.09)":"rgba(255,255,255,.04)",
        border:`1px solid ${hov?c.glow+"55":"rgba(255,255,255,.07)"}`,
        borderRadius:20,padding:"18px 14px 15px",
        transform:`rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(${hov?18:0}px)`,
        transition:hov?"transform .08s ease-out,box-shadow .3s,border-color .3s":"all .5s cubic-bezier(.16,1,.3,1)",
        boxShadow:hov?`0 28px 56px rgba(0,0,0,.55),0 0 36px ${c.glow}28`:"0 6px 22px rgba(0,0,0,.3)",
        backdropFilter:"blur(16px)",position:"relative",overflow:"hidden",transformStyle:"preserve-3d",
      }}>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(108deg,transparent 40%,${c.glow}15 50%,transparent 62%)`,transform:hov?"translateX(120%)":"translateX(-120%)",transition:"transform .55s ease"}}/>
        <div style={{display:"flex",justifyContent:"center",height:54,marginBottom:6}}><Flame w={38} h={54} intensity={hov?1.4:.65} seed={seed}/></div>
        <div style={{width:26,height:42,margin:"0 auto 10px",background:`linear-gradient(180deg,${c.color}ee,${c.color}77)`,borderRadius:"3px 3px 5px 5px",boxShadow:`0 0 16px ${c.glow}35`,position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"36%",background:"linear-gradient(180deg,rgba(255,255,255,.18),transparent)",borderRadius:"3px 3px 0 0"}}/>
        </div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".73rem",fontWeight:600,color:"rgba(255,255,255,.92)",textAlign:"center",marginBottom:2,lineHeight:1.2}}>{c.name}</div>
        <div style={{fontSize:".58rem",letterSpacing:".13em",textTransform:"uppercase",textAlign:"center",color:c.glow,marginBottom:6,opacity:.85}}>{c.mood}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:".92rem",fontWeight:700,color:"#fff",textAlign:"center"}}>₹{c.price}</div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Nav({cartCount,onCartOpen}){
  const sy=useScrollY(),[mob,setMob]=useState(false);
  const scrolled=sy>60;
  const links=[["Home","#home"],["About","#about"],["Shop","#shop"],["Reviews","#reviews"],["Contact","#contact"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:68,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 60px",background:scrolled?"rgba(6,0,11,.93)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,.055)":"none",transition:"all .4s ease"}}>
      <a href="#home" style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.5rem",color:"#fff",textDecoration:"none",letterSpacing:".03em",animation:"fadeIn .8s ease .1s both"}}>
        Scentra<span style={{color:"#e8799a"}}>✦</span>
      </a>
      <ul className="nav-links" style={{display:"flex",gap:36,listStyle:"none",alignItems:"center",margin:0,padding:0,animation:"fadeIn .8s ease .3s both"}}>
        {links.map(([l,h])=>(
          <li key={l}>
            <a href={h} style={{fontSize:".73rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",textDecoration:"none",transition:"color .2s,letter-spacing .2s"}}
              onMouseEnter={e=>{e.target.style.color="#f2a7bb";e.target.style.letterSpacing=".18em";}}
              onMouseLeave={e=>{e.target.style.color="rgba(255,255,255,.5)";e.target.style.letterSpacing=".14em";}}>{l}</a>
          </li>
        ))}
        <li>
          <button onClick={onCartOpen} style={{position:"relative",background:"transparent",border:"1px solid rgba(255,255,255,.14)",borderRadius:40,padding:"8px 22px",color:"rgba(255,255,255,.65)",fontFamily:"'Jost',sans-serif",fontSize:".72rem",letterSpacing:".12em",display:"flex",alignItems:"center",gap:8,transition:"all .25s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(242,167,187,.45)";e.currentTarget.style.color="#f2a7bb";e.currentTarget.style.background="rgba(242,167,187,.07)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.14)";e.currentTarget.style.color="rgba(255,255,255,.65)";e.currentTarget.style.background="transparent";}}>
            🛍
            {cartCount>0&&<span style={{position:"absolute",top:-7,right:-7,width:18,height:18,background:"#e8799a",borderRadius:"50%",fontSize:".58rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",animation:"successPop .3s ease"}}>{cartCount}</span>}
          </button>
        </li>
      </ul>
      {/* Hamburger */}
      <button className="hamburger" onClick={()=>setMob(v=>!v)} style={{display:"none",background:"none",border:"none",flexDirection:"column",gap:5,padding:4}}>
        {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:"rgba(255,255,255,.7)",borderRadius:2,transition:"all .3s",
          transform:mob&&i===0?"rotate(45deg) translate(5px,5px)":mob&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:mob&&i===1?0:1}}/>)}
      </button>
      {mob&&<div style={{position:"fixed",top:68,left:0,right:0,background:"rgba(6,0,11,.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.06)",zIndex:999,animation:"fadeIn .2s ease"}}>
        {links.map(([l,h])=><a key={l} href={h} onClick={()=>setMob(false)} style={{display:"block",padding:"15px 40px",fontSize:".95rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.65)",textDecoration:"none",borderBottom:"1px solid rgba(255,255,255,.04)"}}>{l}</a>)}
      </div>}
    </nav>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Hero({onShop}){
  const sy=useScrollY();
  return(
    <section id="home" style={{position:"relative",minHeight:"100vh",background:"#06000b",overflow:"hidden"}}>
      {/* Deep layered background */}
      <div style={{position:"absolute",inset:0,zIndex:0,background:"radial-gradient(ellipse 72% 62% at 14% 44%,rgba(107,26,42,.62) 0%,transparent 68%),radial-gradient(ellipse 52% 72% at 84% 14%,rgba(74,15,26,.46) 0%,transparent 62%),radial-gradient(ellipse 88% 44% at 50% 108%,rgba(18,2,8,1) 0%,transparent 52%),linear-gradient(158deg,#110007 0%,#1b020e 38%,#07000f 100%)"}}/>
      {/* Grain texture */}
      <div style={{position:"absolute",inset:"-18%",width:"136%",height:"136%",zIndex:2,opacity:.03,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"190px",animation:"noiseShift 7s steps(4) infinite"}}/>
      <Particles/>
      {/* Rotating rings */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:1}}>
        <div style={{animation:"rotateSlow 38s linear infinite"}}>
          <svg width={880} height={880} viewBox="0 0 880 880" fill="none">
            <circle cx={440} cy={440} r={410} stroke="rgba(242,167,187,.038)" strokeWidth={1} strokeDasharray="5 15"/>
            <circle cx={440} cy={440} r={365} stroke="rgba(232,121,154,.052)" strokeWidth={.6} strokeDasharray="2 19"/>
            <circle cx={440} cy={440} r={320} stroke="rgba(107,26,42,.09)" strokeWidth={1} strokeDasharray="1 10"/>
          </svg>
        </div>
        <div style={{position:"absolute",top:0,left:0,animation:"rotateRev 24s linear infinite"}}>
          <svg width={880} height={880} viewBox="0 0 880 880" fill="none">
            <circle cx={440} cy={440} r={288} stroke="rgba(242,167,187,.042)" strokeWidth={.5} strokeDasharray="3 22"/>
          </svg>
        </div>
      </div>
      {/* Glow blobs */}
      {[{c:"rgba(107,26,42,.64)",s:600,x:"-7%",y:"7%",d:"0s",t:9},{c:"rgba(232,121,154,.1)",s:370,x:"67%",y:"54%",d:"2s",t:11},{c:"rgba(55,10,22,.5)",s:460,x:"37%",y:"-6%",d:"4s",t:13}].map((b,i)=>(
        <div key={i} style={{position:"absolute",left:b.x,top:b.y,width:b.s,height:b.s,borderRadius:"50%",background:`radial-gradient(circle,${b.c},transparent 70%)`,animation:`blobDrift ${b.t}s ease-in-out ${b.d} infinite`,pointerEvents:"none",zIndex:1}}/>
      ))}

      {/* Layout */}
      <div className="hero-grid" style={{position:"relative",zIndex:10,display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"100vh",maxWidth:1440,margin:"0 auto",padding:"0 60px",alignItems:"center",gap:60,transform:`translateY(${sy*.07}px)`}}>
        {/* LEFT */}
        <div className="hero-left" style={{display:"flex",flexDirection:"column",padding:"120px 0 82px"}}>
          {/* Eyebrow */}
          <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:34,opacity:0,animation:"fadeUp .65s cubic-bezier(.16,1,.3,1) .18s forwards"}}>
            <div style={{width:28,height:1,background:"linear-gradient(90deg,transparent,#e8799a)"}}/>
            <span style={{fontSize:".65rem",letterSpacing:".34em",textTransform:"uppercase",color:"rgba(242,167,187,.58)",fontWeight:300}}>Handcrafted with love · Kolkata</span>
            <div style={{width:5,height:5,background:"#e8799a",borderRadius:"50%",animation:"dotPulse 2.5s ease-in-out infinite"}}/>
          </div>
          {/* Title lines */}
          {["Light a Candle","for Every"].map((line,i)=>(
            <div key={i} style={{overflow:"hidden",marginBottom:4}}>
              <span style={{display:"block",fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.9rem,5.3vw,5.8rem)",lineHeight:1.0,color:"#fff",letterSpacing:"-.015em",opacity:0,animation:`titleSlide .9s cubic-bezier(.16,1,.3,1) ${.32+i*.16}s forwards`}}>{line}</span>
            </div>
          ))}
          <div style={{overflow:"hidden",marginBottom:28}}>
            <span style={{display:"block",fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.9rem,5.3vw,5.8rem)",lineHeight:1.1,opacity:0,animation:"titleSlide .9s cubic-bezier(.16,1,.3,1) .64s forwards"}}><MorphWord/></span>
          </div>
          {/* Divider */}
          <div style={{height:1,background:"linear-gradient(90deg,#e8799a,rgba(232,121,154,.08))",marginBottom:26,transformOrigin:"left",transform:"scaleX(0)",animation:"lineGrow 1.1s cubic-bezier(.16,1,.3,1) .9s forwards"}}/>
          {/* Body */}
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(.96rem,1.3vw,1.18rem)",color:"rgba(255,255,255,.34)",lineHeight:1.84,maxWidth:400,marginBottom:42,fontWeight:300,opacity:0,animation:"fadeUp .7s ease 1.06s forwards"}}>
            From tender romance to quiet solitude — each Scentra candle is poured to match the texture of a feeling. Pure soy wax. Natural wicks. No shortcuts.
          </p>
          {/* CTAs */}
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:52,opacity:0,animation:"fadeUp .7s ease 1.2s forwards"}}>
            <button onClick={onShop} style={{padding:"14px 40px",background:"linear-gradient(135deg,#6b1a2a,#8b2a3e)",color:"#fff",border:"none",borderRadius:50,fontFamily:"'Jost',sans-serif",fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",transition:"transform .3s,box-shadow .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px) scale(1.03)";e.currentTarget.style.boxShadow="0 22px 55px rgba(232,121,154,.42)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>Shop Now ✦</button>
            <a href="#about" style={{padding:"14px 32px",background:"transparent",color:"rgba(255,255,255,.42)",border:"1px solid rgba(255,255,255,.1)",borderRadius:50,fontFamily:"'Jost',sans-serif",fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",textDecoration:"none",display:"inline-block",backdropFilter:"blur(8px)",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="#f2a7bb";e.currentTarget.style.borderColor="rgba(242,167,187,.32)";e.currentTarget.style.background="rgba(242,167,187,.05)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.42)";e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.background="transparent";e.currentTarget.style.transform="";}}>Our Story</a>
          </div>
          {/* Stats */}
          <div className="hero-stats" style={{display:"flex",gap:44,paddingTop:28,borderTop:"1px solid rgba(255,255,255,.052)",opacity:0,animation:"fadeUp .7s ease 1.36s forwards"}}>
            {[{n:24,s:"+",l:"Candle Moods"},{n:100,s:"%",l:"Pure Soy Wax"},{n:50,s:"+",l:"Happy Souls"}].map((st,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",gap:4}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.35rem,2.2vw,1.85rem)",color:"#f2a7bb",fontWeight:700,lineHeight:1,filter:"drop-shadow(0 0 12px rgba(242,167,187,.3))"}}><Counter to={st.n} suffix={st.s}/></span>
                <span style={{fontSize:".6rem",letterSpacing:".17em",textTransform:"uppercase",color:"rgba(255,255,255,.2)",fontWeight:300}}>{st.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Candle card grid */}
        <div className="hero-right" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 0 82px"}}>
          {/* Ambient flame */}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-54%)",zIndex:1,pointerEvents:"none",opacity:.19,filter:"blur(3px)"}}>
            <Flame w={185} h={280} intensity={.52} seed={3}/>
          </div>
          {/* Floating tags */}
          {[
            {t:"🌹 Romantic",s:{top:"5%",left:"-5%"},d:"1.5s"},
            {t:"✨ Spiritual",s:{top:"6%",right:"-1%"},d:"1.9s"},
            {t:"🌿 100% Soy",s:{bottom:"5%",left:"7%"},d:"2.2s"},
          ].map((tag,i)=>(
            <div key={i} style={{position:"absolute",...tag.s,background:"rgba(255,255,255,.038)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:30,padding:"7px 18px",fontSize:".62rem",color:"rgba(255,255,255,.4)",letterSpacing:".12em",textTransform:"uppercase",whiteSpace:"nowrap",zIndex:4,opacity:0,animation:`fadeUp .6s ease ${tag.d} forwards`}}>{tag.t}</div>
          ))}
          {/* 3x2 grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,width:"100%",maxWidth:490,position:"relative",zIndex:2}}>
            {[0,2,4].map((si,col)=>(
              <div key={col} style={{display:"flex",flexDirection:"column",gap:14,marginTop:col===1?26:0}}>
                <TiltCard c={FEATURED[si]} delay={`${.46+si*.1}s`} seed={si}/>
                <TiltCard c={FEATURED[si+1]} delay={`${.56+si*.1}s`} seed={si+1}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:26,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:7,opacity:0,animation:"fadeUp .7s ease 2.1s forwards",zIndex:10}}>
        <span style={{fontSize:".54rem",letterSpacing:".3em",textTransform:"uppercase",color:"rgba(255,255,255,.16)"}}>Scroll</span>
        <div style={{width:1,height:34,background:"linear-gradient(180deg,rgba(232,121,154,.52),transparent)",animation:"scrollBounce 2s ease-in-out infinite"}}/>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:120,background:"linear-gradient(transparent,#06000b)",pointerEvents:"none",zIndex:8}}/>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function About(){
  const[ref,vis]=useReveal();
  return(
    <section id="about" className="section-pad" style={{background:"linear-gradient(135deg,#0c000f 0%,#180208 50%,#09000e 100%)",padding:"120px 80px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"8%",right:"-4%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,26,42,.38),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"4%",left:"-2%",width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,15,26,.28),transparent 70%)",pointerEvents:"none"}}/>
      <div ref={ref} className="about-grid" style={{maxWidth:1220,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:96,alignItems:"center"}}>
        {/* Left visual */}
        <div style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(-44px)",transition:"all .95s cubic-bezier(.16,1,.3,1)"}}>
          <div style={{position:"relative"}}>
            <div style={{background:"linear-gradient(135deg,rgba(107,26,42,.58),rgba(74,15,26,.38))",borderRadius:"28px 28px 76px 28px",height:460,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.055)",overflow:"hidden",boxShadow:"0 44px 100px rgba(0,0,0,.52)"}}>
              <div style={{textAlign:"center",position:"relative",zIndex:1}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><Flame w={84} h={128} intensity={1.1} seed={7}/></div>
                <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.7rem",color:"rgba(255,255,255,.12)",letterSpacing:".05em"}}>est. 2023</div>
              </div>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(242,167,187,.04),transparent 60%)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:120,background:"linear-gradient(transparent,rgba(0,0,0,.3))"}}/>
            </div>
            <div style={{position:"absolute",bottom:-18,right:-18,width:108,height:108,background:"linear-gradient(135deg,#6b1a2a,#8b2a3e)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",boxShadow:"0 18px 48px rgba(107,26,42,.52)"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:".7rem",color:"rgba(255,255,255,.7)",textAlign:"center",lineHeight:1.6}}>Est.<br/>2023<br/><span style={{color:"#e8799a",fontSize:"1rem"}}>✦</span></span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:30}}>
            {[{n:12,s:"+",l:"Mood Collections"},{n:50,s:"+",l:"Happy Customers"},{n:100,s:"%",l:"Natural Soy Wax"},{n:6,s:"hr+",l:"Avg. Burn Time"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.035)",borderRadius:16,padding:"18px",border:"1px solid rgba(255,255,255,.055)",backdropFilter:"blur(12px)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.85rem",color:"#f2a7bb",fontWeight:700}}><Counter to={s.n} suffix={s.s}/></div>
                <div style={{fontSize:".7rem",color:"rgba(255,255,255,.3)",letterSpacing:".06em",marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right text */}
        <div style={{opacity:vis?1:0,transform:vis?"translateX(0)":"translateX(44px)",transition:"all .95s cubic-bezier(.16,1,.3,1) .2s"}}>
          <span style={{display:"inline-block",fontSize:".67rem",letterSpacing:".28em",textTransform:"uppercase",color:"#e8799a",background:"rgba(232,121,154,.09)",padding:"5px 16px",borderRadius:40,marginBottom:20}}>Our Story</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.9rem,3.3vw,3.1rem)",color:"#fff",lineHeight:1.14,marginBottom:18}}>Scent is the language<br/>of the <em style={{fontStyle:"italic",color:"#f2a7bb"}}>soul</em></h2>
          <div style={{width:48,height:2,background:"linear-gradient(90deg,#e8799a,rgba(232,121,154,.08))",marginBottom:30,borderRadius:2}}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.06rem",color:"rgba(255,255,255,.42)",lineHeight:1.86,marginBottom:26,fontWeight:300}}>
            <strong style={{color:"rgba(255,255,255,.68)"}}>Hello!</strong> My name is <em style={{color:"#f2a7bb"}}>Priyasha Dutta</em>, Managing Director & Founder of Scentra Candles. Scentra began in a small bedroom in 2023, born from the belief that the right scent can transform any moment.
          </p>
          {[
            ["🌿","100% Natural Ingredients","Every candle is crafted with pure soy wax, natural wicks, and premium fragrance oils — no synthetics, no shortcuts."],
            ["🎨","Mood-Matched Scents","Our perfumer curates each fragrance to resonate with specific emotional states, creating a genuine sensory experience."],
            ["💝","Handpoured with Care","Each candle is poured in small batches by hand, ensuring consistency and the quality only human attention provides."],
          ].map(([icon,title,text],i)=>(
            <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",background:"rgba(255,255,255,.028)",borderRadius:14,padding:"16px",border:"1px solid rgba(255,255,255,.048)",marginBottom:11,backdropFilter:"blur(8px)"}}>
              <div style={{width:44,height:44,background:"rgba(232,121,154,.11)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{icon}</div>
              <div>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.02rem",color:"rgba(255,255,255,.82)",marginBottom:3}}>{title}</h4>
                <p style={{fontSize:".8rem",color:"rgba(255,255,255,.32)",lineHeight:1.6}}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProductCard({p,onAdd,inCart}){
  const[hov,setHov]=useState(false),[added,setAdded]=useState(false);
  function handleAdd(){onAdd(p);setAdded(true);setTimeout(()=>setAdded(false),1400);}
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"rgba(255,255,255,.062)":"rgba(255,255,255,.028)",border:`1px solid ${hov?p.glow+"3e":"rgba(255,255,255,.055)"}`,borderRadius:22,overflow:"hidden",transition:"all .42s cubic-bezier(.16,1,.3,1)",transform:hov?"translateY(-9px) scale(1.012)":"none",boxShadow:hov?`0 26px 60px rgba(0,0,0,.44),0 0 28px ${p.glow}1a`:"0 4px 18px rgba(0,0,0,.24)",backdropFilter:"blur(12px)"}}>
      <div style={{height:174,background:`linear-gradient(135deg,${p.color}22,${p.color}0e)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",borderBottom:"1px solid rgba(255,255,255,.044)"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
          <Flame w={42} h={62} intensity={hov?1.2:.68} seed={p.id}/>
          <div style={{width:23,height:36,background:`linear-gradient(180deg,${p.color}dd,${p.color}66)`,borderRadius:"3px 3px 5px 5px",boxShadow:`0 0 12px ${p.glow}33`}}/>
        </div>
        <span style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,.46)",backdropFilter:"blur(8px)",padding:"3px 11px",borderRadius:28,fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",color:p.glow,border:`1px solid ${p.glow}28`}}>{p.mood}</span>
        {inCart&&<span style={{position:"absolute",top:10,right:10,background:"rgba(232,121,154,.18)",border:"1px solid rgba(232,121,154,.38)",borderRadius:18,padding:"3px 9px",fontSize:".58rem",color:"#f2a7bb",letterSpacing:".07em"}}>In bag</span>}
      </div>
      <div style={{padding:"18px"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.04rem",color:"rgba(255,255,255,.9)",marginBottom:6}}>{p.name}</div>
        <div style={{fontSize:".76rem",color:"rgba(255,255,255,.28)",lineHeight:1.62,marginBottom:13,minHeight:40}}>{p.desc}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.25rem",color:"#f2a7bb",fontWeight:700}}>₹{p.price}</span>
          <span style={{fontSize:".63rem",color:"rgba(255,255,255,.28)",background:"rgba(255,255,255,.048)",padding:"3px 9px",borderRadius:18}}>🕐 {p.burn}</span>
        </div>
        <button onClick={handleAdd}
          style={{width:"100%",padding:"10px",background:added?"rgba(39,174,96,.13)":"transparent",color:added?"#82e0aa":p.glow,border:`1.5px solid ${added?"rgba(39,174,96,.4)":p.glow+"44"}`,borderRadius:11,fontFamily:"'Jost',sans-serif",fontSize:".72rem",letterSpacing:".1em",textTransform:"uppercase",transition:"all .25s"}}>
          {added?"✓ Added!":"+ Add to Bag"}
        </button>
      </div>
    </div>
  );
}

function Shop({onAdd,cartItems}){
  const[mood,setMood]=useState("All");const[ref,vis]=useReveal();
  const cartIds=useMemo(()=>new Set(cartItems.map(i=>i.id)),[cartItems]);
  const filtered=useMemo(()=>mood==="All"?PRODUCTS:PRODUCTS.filter(p=>p.mood===mood),[mood]);
  return(
    <section id="shop" className="section-pad" style={{background:"linear-gradient(180deg,#06000b 0%,#0c000f 100%)",padding:"100px 60px",position:"relative"}}>
      <div style={{position:"absolute",top:"18%",left:"3%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,26,42,.22),transparent 70%)",pointerEvents:"none"}}/>
      <div ref={ref} style={{maxWidth:1320,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56,opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all .8s ease"}}>
          <span style={{display:"inline-block",fontSize:".67rem",letterSpacing:".28em",textTransform:"uppercase",color:"#e8799a",background:"rgba(232,121,154,.09)",padding:"5px 16px",borderRadius:40,marginBottom:18}}>Our Collection</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.9rem,3.3vw,3.1rem)",color:"#fff",marginBottom:14}}>Find Your Candle</h2>
          <div style={{width:46,height:2,background:"linear-gradient(90deg,#e8799a,rgba(232,121,154,.08))",margin:"0 auto 18px",borderRadius:2}}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.08rem",color:"rgba(255,255,255,.32)",maxWidth:440,margin:"0 auto",fontWeight:300}}>Sort by mood or let your heart decide. Every candle tells a story.</p>
        </div>
        {/* Filters */}
        <div style={{display:"flex",gap:9,flexWrap:"wrap",justifyContent:"center",marginBottom:44}}>
          {MOODS_LIST.map(m=>{
            const k=m==="All"?"All":m;const active=mood===k;
            return<button key={m} onClick={()=>setMood(k)}
              style={{padding:"8px 21px",borderRadius:38,border:`1.5px solid ${active?"#e8799a":"rgba(255,255,255,.11)"}`,background:active?"rgba(232,121,154,.14)":"transparent",color:active?"#f2a7bb":"rgba(255,255,255,.42)",fontFamily:"'Jost',sans-serif",fontSize:".72rem",letterSpacing:".08em",transition:"all .22s"}}>
              {m==="All"?"All ✦":MOOD_LABEL[m]||m}
            </button>;
          })}
        </div>
        <div className="shop-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:22}}>
          {filtered.map((p,i)=>(
            <div key={p.id} style={{opacity:0,animation:`cardIn .6s cubic-bezier(.16,1,.3,1) ${i*.04}s forwards`}}>
              <ProductCard p={p} onAdd={onAdd} inCart={cartIds.has(p.id)}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REVIEWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Reviews(){
  const[reviews,setReviews]=useState(SEED_REVIEWS);
  const[form,setForm]=useState({name:"",product:"",text:"",stars:0});
  const[ok,setOk]=useState(false);const[ref,vis]=useReveal();
  function submit(){
    if(!form.name||!form.product||!form.text||!form.stars){alert("Please fill all fields and pick a star rating.");return;}
    setReviews(v=>[{...form,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})},...v]);
    setForm({name:"",product:"",text:"",stars:0});setOk(true);setTimeout(()=>setOk(false),3200);
  }
  return(
    <section id="reviews" className="section-pad" style={{background:"linear-gradient(135deg,#0c000f 0%,#06000b 100%)",padding:"100px 60px",position:"relative"}}>
      <div style={{position:"absolute",bottom:"8%",right:"4%",width:440,height:440,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,26,42,.18),transparent 70%)",pointerEvents:"none"}}/>
      <div ref={ref} style={{maxWidth:1220,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56,opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all .8s ease"}}>
          <span style={{display:"inline-block",fontSize:".67rem",letterSpacing:".28em",textTransform:"uppercase",color:"#e8799a",background:"rgba(232,121,154,.09)",padding:"5px 16px",borderRadius:40,marginBottom:18}}>Customer Love</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.9rem,3.3vw,3.1rem)",color:"#fff",marginBottom:12}}>What people are saying</h2>
          <div style={{width:46,height:2,background:"linear-gradient(90deg,#e8799a,rgba(232,121,154,.08))",margin:"0 auto",borderRadius:2}}/>
        </div>
        <div className="reviews-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.45fr",gap:54,alignItems:"start"}}>
          {/* Form */}
          <div style={{background:"rgba(255,255,255,.028)",borderRadius:24,padding:"34px",border:"1px solid rgba(255,255,255,.062)",backdropFilter:"blur(12px)",position:"sticky",top:88}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"#fff",marginBottom:6}}>Leave a Review</h3>
            <p style={{fontSize:".78rem",color:"rgba(255,255,255,.28)",marginBottom:22}}>Share your experience with our candles</p>
            <div style={{display:"flex",gap:5,marginBottom:18}}>
              {[1,2,3,4,5].map(s=>(
                <span key={s} onClick={()=>setForm(f=>({...f,stars:s}))} style={{fontSize:"1.9rem",color:s<=form.stars?"#f39c12":"rgba(255,255,255,.14)",transition:"color .15s,transform .15s",transform:s<=form.stars?"scale(1.12)":"scale(1)"}}>★</span>
              ))}
            </div>
            {[["Your Name","text","name","Priya Sharma"],["Your Review","textarea","text","Tell us about your experience…"]].map(([label,type,field,ph])=>(
              <div key={field} style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:5}}>{label}</label>
                {type==="textarea"
                  ?<textarea value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} placeholder={ph} rows={3} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.09)",borderRadius:10,background:"rgba(255,255,255,.045)",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none",resize:"vertical",lineHeight:1.5}}/>
                  :<input type={type} value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.09)",borderRadius:10,background:"rgba(255,255,255,.045)",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none"}}/>}
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:5}}>Product</label>
              <select value={form.product} onChange={e=>setForm(f=>({...f,product:e.target.value}))} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.09)",borderRadius:10,background:"#180208",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none"}}>
                <option value="">Select a candle…</option>
                {PRODUCTS.map(p=><option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <button onClick={submit} style={{width:"100%",padding:"13px",background:ok?"rgba(39,174,96,.18)":"linear-gradient(135deg,#6b1a2a,#8b2a3e)",color:ok?"#82e0aa":"#fff",border:ok?"1px solid rgba(39,174,96,.4)":"none",borderRadius:12,fontFamily:"'Jost',sans-serif",fontSize:".76rem",letterSpacing:".14em",textTransform:"uppercase",transition:"all .3s"}}>
              {ok?"✦ Thank you for your review!":"Post Review ✦"}
            </button>
          </div>
          {/* List */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {reviews.map((r,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.028)",borderRadius:20,padding:"22px",border:"1px solid rgba(255,255,255,.055)",backdropFilter:"blur(10px)",opacity:0,animation:`cardIn .5s ease ${i*.07}s forwards`}}>
                <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:11}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#6b1a2a,#8b2a3e)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"#fff",fontWeight:700,flexShrink:0}}>{r.name[0]}</div>
                  <div>
                    <div style={{fontSize:".88rem",color:"rgba(255,255,255,.82)",fontWeight:500}}>{r.name} <em style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".88rem",color:"rgba(255,255,255,.32)",fontStyle:"italic"}}>— {r.product}</em></div>
                    <span style={{color:"#f39c12",fontSize:13,letterSpacing:1}}>{"★".repeat(r.stars)}{"☆".repeat(5-r.stars)}</span>
                  </div>
                </div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".98rem",color:"rgba(255,255,255,.42)",lineHeight:1.72,fontStyle:"italic"}}>"{r.text}"</p>
                <p style={{fontSize:".66rem",color:"rgba(255,255,255,.18)",marginTop:7}}>{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Contact(){
  const[ref,vis]=useReveal(),[sent,setSent]=useState(false);
  const[form,setForm]=useState({name:"",email:"",subject:"General Enquiry",message:""});
  function send(e){e.preventDefault();setSent(true);setForm({name:"",email:"",subject:"General Enquiry",message:""});}
  return(
    <section id="contact" className="section-pad" style={{background:"linear-gradient(135deg,#04000a 0%,#0c000f 100%)",padding:"100px 60px",position:"relative"}}>
      <div style={{position:"absolute",top:"18%",left:"8%",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,26,42,.28),transparent 70%)",pointerEvents:"none"}}/>
      <div ref={ref} style={{maxWidth:1220,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60,opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all .8s ease"}}>
          <span style={{display:"inline-block",fontSize:".67rem",letterSpacing:".28em",textTransform:"uppercase",color:"#e8799a",background:"rgba(232,121,154,.09)",padding:"5px 16px",borderRadius:40,marginBottom:18}}>Get In Touch</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.9rem,3.3vw,3.1rem)",color:"#fff",marginBottom:14}}>We'd love to hear<br/>from <em style={{fontStyle:"italic",color:"#f2a7bb"}}>you</em></h2>
          <div style={{width:46,height:2,background:"linear-gradient(90deg,#e8799a,rgba(232,121,154,.08))",margin:"0 auto",borderRadius:2}}/>
        </div>
        <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.25fr",gap:76,alignItems:"start",opacity:vis?1:0,transform:vis?"none":"translateY(28px)",transition:"all .8s ease .2s"}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[["📍","Studio","3A, Rabindrapally near Bose Variety Stores, Kolkata, West Bengal 700122"],["📧","Email","priyashad89@gmail.com"],["📞","Phone","+91 8240xxxxxx"],["🕐","Hours","Mon–Sat: 10am–7pm\nSunday: 11am–5pm"]].map(([icon,title,text])=>(
              <div key={title} style={{display:"flex",gap:14,alignItems:"flex-start",background:"rgba(255,255,255,.028)",padding:"18px",borderRadius:16,border:"1px solid rgba(255,255,255,.055)"}}>
                <div style={{width:44,height:44,background:"rgba(232,121,154,.1)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",flexShrink:0}}>{icon}</div>
                <div>
                  <h4 style={{fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",color:"#e8799a",marginBottom:4}}>{title}</h4>
                  <p style={{fontSize:".84rem",color:"rgba(255,255,255,.42)",lineHeight:1.56,whiteSpace:"pre-line"}}>{text}</p>
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:14,paddingTop:4}}>
              {[["Instagram ↗","https://www.instagram.com/scentra_candle"],["LinkedIn ↗","https://www.linkedin.com/company/scentra-candles"]].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{fontSize:".7rem",color:"rgba(242,167,187,.5)",textDecoration:"none",borderBottom:"1px solid rgba(242,167,187,.22)",paddingBottom:1,letterSpacing:".07em",transition:"color .2s"}}
                  onMouseEnter={e=>e.target.style.color="#f2a7bb"} onMouseLeave={e=>e.target.style.color="rgba(242,167,187,.5)"}>{l}</a>
              ))}
            </div>
          </div>
          <form onSubmit={send} style={{background:"rgba(255,255,255,.028)",borderRadius:24,padding:"38px",border:"1px solid rgba(255,255,255,.062)",backdropFilter:"blur(12px)"}}>
            {[["Your Name","text","name","Full name"],["Email","email","email","your@email.com"]].map(([label,type,field,ph])=>(
              <div key={field} style={{marginBottom:14}}>
                <label style={{display:"block",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:5}}>{label}</label>
                <input required type={type} value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:10,background:"rgba(255,255,255,.038)",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none"}}/>
              </div>
            ))}
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:5}}>Subject</label>
              <select value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:10,background:"#180208",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none"}}>
                {["General Enquiry","Custom Order","Bulk Order","Feedback"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:5}}>Message</label>
              <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="How can we help you?" rows={4} style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:10,background:"rgba(255,255,255,.038)",fontFamily:"'Jost',sans-serif",fontSize:".84rem",color:"#fff",outline:"none",resize:"vertical"}}/>
            </div>
            <button type="submit" style={{width:"100%",padding:"14px",background:sent?"rgba(39,174,96,.15)":"linear-gradient(135deg,#e8799a,#c0392b)",color:sent?"#82e0aa":"#fff",border:sent?"1px solid rgba(39,174,96,.38)":"none",borderRadius:12,fontFamily:"'Jost',sans-serif",fontSize:".76rem",letterSpacing:".14em",textTransform:"uppercase",transition:"all .25s"}}>
              {sent?"✦ Message sent! We'll reply soon.":"Send Message ✦"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Footer(){
  return(
    <footer style={{background:"#020006",padding:"36px 60px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,borderTop:"1px solid rgba(255,255,255,.044)"}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.3rem",color:"rgba(255,255,255,.5)"}}>Scentra<span style={{color:"#e8799a"}}>✦</span></div>
      <p style={{fontSize:".72rem",color:"rgba(255,255,255,.18)"}}>© 2023 Scentra Candles. Handcrafted with love in Kolkata, India.</p>
      <p style={{fontSize:".66rem",color:"rgba(255,255,255,.14)"}}>Pure soy · Natural wicks · Made with ❤️</p>
    </footer>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CART DRAWER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CartDrawer({open,onClose,cart,onQty,onRemove,onCheckout}){
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  return(
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.56)",backdropFilter:"blur(5px)",zIndex:2000,opacity:open?1:0,pointerEvents:open?"all":"none",transition:"opacity .32s"}}/>
      <div style={{position:"fixed",top:0,right:0,width:415,maxWidth:"100vw",height:"100vh",background:"linear-gradient(180deg,#0c000f,#06000b)",borderLeft:"1px solid rgba(255,255,255,.07)",zIndex:2001,display:"flex",flexDirection:"column",transform:open?"translateX(0)":"translateX(100%)",transition:"transform .38s cubic-bezier(.4,0,.2,1)",boxShadow:"-16px 0 64px rgba(0,0,0,.4)"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.28rem",color:"#fff"}}>Your Bag <span style={{fontSize:".72rem",fontFamily:"'Jost',sans-serif",color:"rgba(255,255,255,.32)",fontWeight:300}}>({cart.reduce((s,i)=>s+i.qty,0)} items)</span></h2>
          <button onClick={onClose} style={{width:34,height:34,background:"rgba(255,255,255,.055)",border:"none",borderRadius:9,fontSize:"1rem",color:"rgba(255,255,255,.45)"}}> ✕</button>
        </div>
        {/* Items */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 24px"}}>
          {!cart.length
            ?<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:14,paddingBottom:60}}>
              <div style={{opacity:.55}}><Flame w={52} h={76} intensity={.55} seed={99}/></div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.04rem",fontStyle:"italic",color:"rgba(255,255,255,.24)",textAlign:"center"}}>Your bag is empty —<br/>add a candle to begin.</p>
            </div>
            :cart.map(item=>(
              <div key={item.id} style={{display:"flex",gap:13,alignItems:"flex-start",padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.052)"}}>
                <div style={{width:56,height:56,borderRadius:11,background:`linear-gradient(135deg,${item.color}44,${item.color}1a)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid rgba(255,255,255,.055)"}}>
                  <Flame w={28} h={40} intensity={.7} seed={item.id}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"rgba(255,255,255,.86)",marginBottom:2}}>{item.name}</div>
                  <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:item.glow||"#e8799a",marginBottom:8,opacity:.8}}>{item.mood}</div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <button onClick={()=>onQty(item.id,-1)} style={{width:25,height:25,background:"rgba(255,255,255,.062)",border:"none",borderRadius:7,color:"rgba(255,255,255,.65)",fontSize:".88rem",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:".82rem",color:"#fff",minWidth:18,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={()=>onQty(item.id,1)} style={{width:25,height:25,background:"rgba(255,255,255,.062)",border:"none",borderRadius:7,color:"rgba(255,255,255,.65)",fontSize:".88rem",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:16}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"#f2a7bb",fontWeight:700}}>₹{item.price*item.qty}</span>
                  <button onClick={()=>onRemove(item.id)} style={{background:"none",border:"none",fontSize:".7rem",color:"rgba(255,255,255,.22)",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#f1948a"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.22)"}>✕ Remove</button>
                </div>
              </div>
            ))}
        </div>
        {/* Footer */}
        {cart.length>0&&(
          <div style={{padding:"16px 24px 24px",borderTop:"1px solid rgba(255,255,255,.062)",background:"rgba(0,0,0,.18)"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:".76rem",color:"rgba(255,255,255,.32)",marginBottom:5}}><span>Subtotal</span><span>₹{total}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:".74rem",color:"rgba(255,255,255,.22)",marginBottom:11,paddingBottom:11,borderBottom:"1px solid rgba(255,255,255,.062)"}}><span>Shipping</span><span>Calculated at checkout</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Playfair Display',serif",fontSize:"1.08rem",color:"#fff",fontWeight:700,marginBottom:14}}><span>Total</span><span style={{color:"#f2a7bb"}}>₹{total}</span></div>
            <button onClick={onCheckout}
              style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#6b1a2a,#8b2a3e)",color:"#fff",border:"none",borderRadius:13,fontFamily:"'Jost',sans-serif",fontSize:".76rem",letterSpacing:".14em",textTransform:"uppercase",marginBottom:9,transition:"all .22s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#8b2a3e,#a0364e)";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,#6b1a2a,#8b2a3e)";e.currentTarget.style.transform="";}}>Proceed to Checkout ✦</button>
            <button onClick={onClose} style={{width:"100%",background:"none",border:"none",color:"rgba(255,255,255,.22)",fontFamily:"'Jost',sans-serif",fontSize:".68rem",letterSpacing:".12em",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#f2a7bb"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.22)"}>← Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHECKOUT MODAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Checkout({open,onClose,cart,onSuccess}){
  const[coupon,setCoupon]=useState(""),[applied,setApplied]=useState(null),[couponMsg,setCouponMsg]=useState(null);
  const[pay,setPay]=useState("razorpay"),[placing,setPlacing]=useState(false),[orderId,setOrderId]=useState(null);
  const[f,setF]=useState({fname:"",lname:"",email:"",phone:"",addr1:"",addr2:"",city:"",state:"",pin:"",notes:""});

  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const disc=applied?(applied.type==="percent"?Math.round(sub*applied.discount/100):Math.min(applied.discount,sub)):0;
  const total=Math.max(0,sub-disc);

  function applyC(){
    const code=coupon.trim().toUpperCase();
    if(!code){setCouponMsg({t:"Please enter a coupon code.",ok:false});return;}
    const c=COUPONS[code];
    if(!c){setApplied(null);setCouponMsg({t:"Invalid coupon code. Try again.",ok:false});return;}
    setApplied({code,...c});setCouponMsg({t:`✦ ${c.label} applied!`,ok:true});
  }
  function removeC(){setApplied(null);setCoupon("");setCouponMsg(null);}

  function validate(){
    const req=[["fname","first name"],["lname","last name"],["email","email"],["phone","phone"],["addr1","address"],["city","city"],["state","state"],["pin","PIN code"]];
    for(const[k,l] of req){if(!f[k].trim()){alert(`Please enter your ${l}.`);return false;}}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)){alert("Please enter a valid email.");return false;}
    if(f.phone.replace(/\D/g,"").length<10){alert("Please enter a valid 10-digit phone number.");return false;}
    if(!/^\d{6}$/.test(f.pin.trim())){alert("Please enter a valid 6-digit PIN code.");return false;}
    return true;
  }

  async function place(){
    if(!validate())return;
    setPlacing(true);
    await new Promise(r=>setTimeout(r,1900));
    const oid="SCN-"+Date.now().toString().slice(-8).toUpperCase();
    setOrderId(oid);setPlacing(false);onSuccess();
  }

  function reset(){setOrderId(null);setCoupon("");setApplied(null);setCouponMsg(null);setPay("razorpay");setF({fname:"",lname:"",email:"",phone:"",addr1:"",addr2:"",city:"",state:"",pin:"",notes:""});onClose();}

  if(!open)return null;

  const inputStyle={width:"100%",padding:"9px 12px",border:"1.5px solid rgba(255,255,255,.08)",borderRadius:9,background:"rgba(255,255,255,.038)",fontFamily:"'Jost',sans-serif",fontSize:".82rem",color:"#fff",outline:"none"};
  const labelStyle={display:"block",fontSize:".63rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.26)",marginBottom:5};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.72)",backdropFilter:"blur(10px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"linear-gradient(180deg,#0e0012,#080010)",borderRadius:28,width:"100%",maxWidth:570,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 44px 110px rgba(0,0,0,.65)",border:"1px solid rgba(255,255,255,.07)",position:"relative",animation:"modalIn .35s cubic-bezier(.16,1,.3,1)"}}>
        {orderId
          ?<div style={{textAlign:"center",padding:"56px 38px",animation:"successPop .5s ease"}}>
            <div style={{width:82,height:82,background:"linear-gradient(135deg,rgba(107,26,42,.6),rgba(74,15,26,.4))",borderRadius:"50%",margin:"0 auto 22px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Flame w={52} h={76} intensity={1.2} seed={42}/>
            </div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.75rem",color:"#fff",marginBottom:10}}>Order Placed! ✦</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.06rem",color:"rgba(255,255,255,.38)",lineHeight:1.75,fontStyle:"italic",maxWidth:320,margin:"0 auto 28px"}}>Thank you for your order. We'll reach out soon with updates.</p>
            <div style={{background:"rgba(255,255,255,.038)",border:"1px solid rgba(255,255,255,.07)",borderRadius:10,padding:"11px 22px",fontSize:".74rem",color:"rgba(255,255,255,.38)",letterSpacing:".06em",marginBottom:30,display:"inline-block"}}>
              Order ID: <strong style={{color:"#f2a7bb",fontFamily:"'Playfair Display',serif"}}>{orderId}</strong>
            </div>
            <br/>
            <button onClick={reset} style={{padding:"14px 42px",background:"linear-gradient(135deg,#6b1a2a,#8b2a3e)",color:"#fff",border:"none",borderRadius:50,fontFamily:"'Jost',sans-serif",fontSize:".74rem",letterSpacing:".15em",textTransform:"uppercase"}}>Back to Shop ✦</button>
          </div>
          :<>
            {/* Sticky header */}
            <div style={{padding:"24px 28px 16px",borderBottom:"1px solid rgba(255,255,255,.062)",position:"sticky",top:0,background:"#0e0012",zIndex:1}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.42rem",color:"#fff",marginBottom:3}}>Checkout</h2>
              <p style={{fontSize:".74rem",color:"rgba(255,255,255,.28)"}}>Complete your order below</p>
              <button onClick={onClose} style={{position:"absolute",top:20,right:24,width:34,height:34,background:"rgba(255,255,255,.055)",border:"none",borderRadius:9,fontSize:"1rem",color:"rgba(255,255,255,.38)"}}>✕</button>
            </div>

            <div style={{padding:"20px 28px 30px"}}>
              {/* Order summary */}
              <div style={{background:"rgba(255,255,255,.028)",borderRadius:14,padding:"14px",marginBottom:20,border:"1px solid rgba(255,255,255,.055)"}}>
                <div style={{fontSize:".64rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:9}}>Your Order</div>
                {cart.map(i=>(
                  <div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:".8rem",color:"rgba(255,255,255,.62)",padding:"5px 0",borderBottom:"1px dashed rgba(255,255,255,.055)"}}>
                    <span>{i.name} <span style={{color:"rgba(255,255,255,.28)",fontSize:".75rem"}}>×{i.qty}</span></span>
                    <span>₹{i.price*i.qty}</span>
                  </div>
                ))}
                {applied&&<div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",fontSize:".78rem",color:"#82e0aa"}}><span>Discount ({applied.code})</span><span>−₹{disc}</span></div>}
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:9,marginTop:3,borderTop:"1.5px solid rgba(255,255,255,.07)"}}>
                  <span style={{fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.32)"}}>Total</span>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.12rem",color:"#f2a7bb",fontWeight:700}}>₹{total}</span>
                </div>
              </div>

              {/* Coupon */}
              <div style={{marginBottom:18}}>
                <div style={{fontSize:".64rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:9}}>Coupon Code</div>
                <div style={{display:"flex",gap:9}}>
                  <input value={coupon} onChange={e=>setCoupon(e.target.value.toUpperCase())} placeholder="Enter coupon code" readOnly={!!applied}
                    style={{...inputStyle,flex:1,borderColor:applied?"rgba(39,174,96,.5)":couponMsg&&!couponMsg.ok?"rgba(231,76,60,.5)":"rgba(255,255,255,.08)",background:applied?"rgba(39,174,96,.07)":"rgba(255,255,255,.038)",color:applied?"#82e0aa":"#fff",letterSpacing:".08em",textTransform:"uppercase"}}/>
                  {applied
                    ?<button onClick={removeC} style={{padding:"9px 14px",background:"rgba(231,76,60,.1)",border:"1px solid rgba(231,76,60,.28)",borderRadius:9,color:"#f1948a",fontFamily:"'Jost',sans-serif",fontSize:".7rem",letterSpacing:".09em",whiteSpace:"nowrap"}}>✕ Remove</button>
                    :<button onClick={applyC} style={{padding:"9px 18px",background:"rgba(107,26,42,.55)",border:"1px solid rgba(232,121,154,.28)",borderRadius:9,color:"#f2a7bb",fontFamily:"'Jost',sans-serif",fontSize:".7rem",letterSpacing:".09em",whiteSpace:"nowrap"}}>Apply</button>}
                </div>
                {couponMsg&&<div style={{marginTop:7,fontSize:".74rem",padding:"7px 11px",borderRadius:8,background:couponMsg.ok?"rgba(39,174,96,.09)":"rgba(231,76,60,.09)",color:couponMsg.ok?"#82e0aa":"#f1948a",border:`1px solid ${couponMsg.ok?"rgba(39,174,96,.28)":"rgba(231,76,60,.28)"}`}}>{couponMsg.t}</div>}
              </div>

              {/* Delivery */}
              <div style={{fontSize:".64rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>Delivery Details<div style={{flex:1,height:1,background:"rgba(255,255,255,.055)"}}/></div>
              <div className="checkout-fields" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:12}}>
                {[
                  ["First Name","fname","1","Priya"],["Last Name","lname","1","Sharma"],
                  ["Email","email","2","your@email.com"],["Phone","phone","2","+91 98765 43210"],
                  ["Address Line 1","addr1","2","House / Flat No., Street"],["Address Line 2","addr2","2","Landmark (optional)"],
                  ["City","city","1","Kolkata"],["State","state","1","West Bengal"],["PIN Code","pin","1","700001"],
                ].map(([label,field,span,ph])=>(
                  <div key={field} style={{gridColumn:span==="2"?"span 2":"span 1"}}>
                    <label style={labelStyle}>{label}</label>
                    <input type={field==="email"?"email":field==="phone"?"tel":"text"} value={f[field]} onChange={e=>setF(v=>({...v,[field]:e.target.value}))} placeholder={ph} style={inputStyle}/>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:18}}>
                <label style={labelStyle}>Order Notes (optional)</label>
                <textarea value={f.notes} onChange={e=>setF(v=>({...v,notes:e.target.value}))} placeholder="Any special instructions…" rows={3} style={{...inputStyle,resize:"vertical"}}/>
              </div>

              {/* Payment */}
              <div style={{fontSize:".64rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:11,display:"flex",alignItems:"center",gap:10}}>Payment Method<div style={{flex:1,height:1,background:"rgba(255,255,255,.055)"}}/></div>
              <div style={{display:"flex",gap:9,marginBottom:20}}>
                {[["razorpay","💳","Card / UPI"],["cod","💵","Cash on Delivery"]].map(([m,icon,label])=>(
                  <div key={m} onClick={()=>setPay(m)} style={{flex:1,padding:"11px 8px",border:`1.5px solid ${pay===m?"#e8799a66":"rgba(255,255,255,.07)"}`,borderRadius:12,background:pay===m?"rgba(232,121,154,.09)":"rgba(255,255,255,.028)",textAlign:"center",transition:"all .2s"}}>
                    <div style={{fontSize:"1.25rem",marginBottom:3}}>{icon}</div>
                    <div style={{fontSize:".63rem",letterSpacing:".06em",textTransform:"uppercase",color:pay===m?"#f2a7bb":"rgba(255,255,255,.38)"}}>{label}</div>
                  </div>
                ))}
              </div>

              <button onClick={place} disabled={placing}
                style={{width:"100%",padding:"14px",background:placing?"rgba(107,26,42,.45)":"linear-gradient(135deg,#6b1a2a,#8b2a3e)",color:"#fff",border:"none",borderRadius:13,fontFamily:"'Jost',sans-serif",fontSize:".78rem",letterSpacing:".16em",textTransform:"uppercase",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                {placing?<><div style={{width:17,height:17,border:"2px solid rgba(255,255,255,.28)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>Processing…</>:`Place Order ✦  ₹${total}`}
              </button>
              <p style={{textAlign:"center",fontSize:".66rem",color:"rgba(255,255,255,.18)",marginTop:11}}>🔒 Secure checkout · Handcrafted in Kolkata</p>
            </div>
          </>}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROOT APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App(){
  const[cart,setCart]=useState([]);
  const[cartOpen,setCartOpen]=useState(false);
  const[checkOpen,setCheckOpen]=useState(false);

  function addToCart(p){
    setCart(c=>{
      const ex=c.find(i=>i.id===p.id);
      if(ex)return c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return[...c,{...p,qty:1}];
    });
  }
  function changeQty(id,d){setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));}
  function remove(id){setCart(c=>c.filter(i=>i.id!==id));}
  function checkout(){setCartOpen(false);setCheckOpen(true);}
  function success(){setCart([]);}

  return(
    <>
      <style>{GLOBAL_CSS}</style>
      <MagCursor/>
      <Nav cartCount={cart.reduce((s,i)=>s+i.qty,0)} onCartOpen={()=>setCartOpen(true)}/>
      <Hero onShop={()=>document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}/>
      <About/>
      <Shop onAdd={addToCart} cartItems={cart}/>
      <Reviews/>
      <Contact/>
      <Footer/>
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} onQty={changeQty} onRemove={remove} onCheckout={checkout}/>
      <Checkout open={checkOpen} onClose={()=>setCheckOpen(false)} cart={cart} onSuccess={success}/>
    </>
  );
}
