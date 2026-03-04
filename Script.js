<script>
/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const PRODUCTS=[
  {id:1,name:"Bourbon Vanilla",mood:"romantic",price:199,burn:"6hr+",desc:"French Bourbon, vanilla beans & creamy woods. Vegan soy-coconut wax.",color:"#c0392b",glow:"#e8799a"},
  {id:2,name:"English Lavender",mood:"calm",price:199,burn:"6hr+",desc:"Herbaceous rosemary, earthy sage, tonka bean & soft musk.",color:"#8e44ad",glow:"#c39bd3"},
  {id:3,name:"Romantic Rose",mood:"romantic",price:199,burn:"6hr+",desc:"Sun-kissed citrus and fresh florals to lift your spirits.",color:"#c0392b",glow:"#f1948a"},
  {id:4,name:"Royal Oud",mood:"spiritual",price:199,burn:"6hr+",desc:"Bergamot, lemon zest & sweet peach for your brightest days.",color:"#d4a017",glow:"#f7dc6f"},
  {id:5,name:"Very Berry",mood:"happy",price:529,burn:"12hr",desc:"Strawberry macaron — playful, fruity & impossibly sweet.",color:"#e91e8c",glow:"#f48fb1"},
  {id:6,name:"Tiny Love Buds",mood:"romantic",price:299,burn:"42hr",desc:"Smoky vetiver, grey amber & violet for introspective evenings.",color:"#6c3483",glow:"#bb8fce"},
  {id:7,name:"Sweet Tooth",mood:"calm",price:299,burn:"40hr",desc:"White sage, eucalyptus & cedar for a perfectly still mind.",color:"#1e8449",glow:"#82e0aa"},
  {id:8,name:"The Love Pillar",mood:"romantic",price:299,burn:"32hr",desc:"Sea salt, driftwood & light musk to find your inner peace.",color:"#1a5276",glow:"#7fb3d3"},
  {id:9,name:"Rubik's Candle",mood:"energetic",price:299,burn:"38hr",desc:"Peppermint, rosemary & black pepper to ignite your energy.",color:"#ba4a00",glow:"#f0b27a"},
  {id:10,name:"Teddy Candles",mood:"energetic",price:299,burn:"50hr",desc:"Espresso, cardamom & grapefruit — your perfect morning ritual.",color:"#922b21",glow:"#f1948a"},
  {id:11,name:"Shoreline Shot",mood:"happy",price:250,burn:"9hr",desc:"Sacred lotus, frankincense & camphor for meditation.",color:"#0e6655",glow:"#76d7c4"},
  {id:12,name:"Petals in Pine",mood:"spiritual",price:399,burn:"60hr",desc:"Amber, sandalwood & tuberose — a devotional experience in wax.",color:"#1d6a27",glow:"#58d68d"},
  {id:13,name:"Better Together",mood:"romantic",price:249,burn:"6hr+",desc:"Beautiful paired sculpture candle for moments shared.",color:"#922b21",glow:"#f48fb1"},
  {id:14,name:"Golden Petal Aroma",mood:"romantic",price:250,burn:"8hr+",desc:"Amber, sandalwood & tuberose — a devotional experience in wax.",color:"#9a7d0a",glow:"#f9e79f"},
  {id:15,name:"Beauty & Elegance",mood:"spiritual",price:329,burn:"60hr",desc:"Refined blend of white florals and warm musk for the soul.",color:"#6c3483",glow:"#c39bd3"},
  {id:16,name:"Petal Peony",mood:"spiritual",price:250,burn:"60hr",desc:"Soft peony petals with sandalwood warmth.",color:"#a93226",glow:"#f8c8d4"},
  {id:17,name:"Springtime Bundle",mood:"spiritual",price:299,burn:"60hr",desc:"A garden in bloom — layered floral and green accord.",color:"#1e8449",glow:"#a9dfbf"},
  {id:18,name:"Chai & Chill",mood:"happy",price:199,burn:"4hr+",desc:"Warm masala chai spices in melted wax form.",color:"#935116",glow:"#f0b27a"},
  {id:19,name:"Daisy Vibe",mood:"calm",price:199,burn:"4hr+",desc:"Fresh daisy, clean cotton & light woods.",color:"#9a7d0a",glow:"#f9e79f"},
  {id:20,name:"Cinderella Cart",mood:"energetic",price:399,burn:"4hr+",desc:"Sparkling citrus and fairy-dust musk — pure whimsy.",color:"#1a5276",glow:"#85c1e9"},
  {id:21,name:"Roses & Mogra",mood:"spiritual",price:450,burn:"4hr+",desc:"The sacred union of rose and mogra — pure devotion.",color:"#922b21",glow:"#f1948a"},
  {id:22,name:"Spooky Friends",mood:"energetic",price:329,burn:"4hr+",desc:"Dark woods, smoked cedar & a whisper of mystery.",color:"#1e6823",glow:"#58d68d"},
  {id:23,name:"Christmas Carousel",mood:"happy",price:349,burn:"4hr+",desc:"Cinnamon, clove & pine — a holiday dream.",color:"#922b21",glow:"#f1948a"},
  {id:24,name:"Walk the Plank",mood:"energetic",price:399,burn:"7hr+",desc:"Sea salt, oakmoss & driftwood for the adventurous soul.",color:"#1a5276",glow:"#7fb3d3"},
];

const FEATURED=[
  {name:"Bourbon Vanilla",mood:"Romantic",price:199,color:"#c0392b",glow:"#e8799a"},
  {name:"English Lavender",mood:"Calm",price:199,color:"#8e44ad",glow:"#c39bd3"},
  {name:"Royal Oud",mood:"Spiritual",price:199,color:"#d4a017",glow:"#f7dc6f"},
  {name:"Petals in Pine",mood:"Peaceful",price:399,color:"#27ae60",glow:"#82e0aa"},
  {name:"Shoreline Shot",mood:"Happy",price:250,color:"#2980b9",glow:"#7fb3d3"},
  {name:"Chai & Chill",mood:"Cozy",price:199,color:"#e67e22",glow:"#f0b27a"},
];

const COUPONS={
  SCENTRA10:{discount:10,type:"percent",label:"10% off your order"},
  WELCOME20:{discount:20,type:"percent",label:"20% off for new customers"},
  FLAT50:{discount:50,type:"flat",label:"₹50 flat off"},
  MOOD15:{discount:15,type:"percent",label:"15% off — special code"},
  HOLI100:{discount:100,type:"flat",label:"₹100 off on festive orders"},
};

const SEED_REVIEWS=[
  {name:"Priya S.",product:"Bourbon Vanilla",stars:5,text:"Absolutely divine! My room smells like a luxury spa. The flame is steady and the throw is incredible.",date:"2 Jan 2025"},
  {name:"Arjun M.",product:"Royal Oud",stars:5,text:"Bought this as a gift and the recipient was blown away. Packaging is beautiful and the scent is rich.",date:"15 Dec 2024"},
  {name:"Shreya K.",product:"English Lavender",stars:4,text:"Perfect for winding down after work. Lavender is realistic and not overpowering. Will buy again!",date:"3 Nov 2024"},
  {name:"Riya D.",product:"Petals in Pine",stars:5,text:"I burn this during meditation sessions. Something about it that just centers me completely.",date:"28 Oct 2024"},
  {name:"Kabir T.",product:"Chai & Chill",stars:5,text:"Smells exactly like cutting chai on a rainy morning. Genuinely comforting — I'm obsessed.",date:"10 Oct 2024"},
];

/* ══════════════════════════════════════════════════════
   FLAME ENGINE
══════════════════════════════════════════════════════ */
const flameRAFs=new Map();
function drawFlame(canvas,w,h,intensity,seed){
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  canvas.width=w;canvas.height=h;
  let t=(seed||0)*.8;
  const id=canvas.id||Math.random();
  if(flameRAFs.has(id))cancelAnimationFrame(flameRAFs.get(id));
  function draw(){
    ctx.clearRect(0,0,w,h);
    const cx=w/2,by=h-4;
    for(let l=3;l>=0;l--){
      const sc=1-l*.19,f1=Math.sin(t*3.9+l)*(5.5*intensity),f2=Math.cos(t*2.5+l*1.7)*(3.8*intensity);
      const fh=h*.82*sc*intensity;
      const g=ctx.createRadialGradient(cx,by-fh*.28,1,cx,by-fh*.54,fh);
      if(l===0){g.addColorStop(0,"rgba(255,255,255,.97)");g.addColorStop(.15,"rgba(255,228,165,.9)");g.addColorStop(.45,"rgba(232,121,154,.72)");g.addColorStop(1,"rgba(0,0,0,0)");}
      else{const a=(0.13-l*.022)*intensity;g.addColorStop(0,`rgba(232,121,154,${a+.05})`);g.addColorStop(1,"rgba(0,0,0,0)");}
      ctx.beginPath();
      ctx.moveTo(cx+f1,by);
      ctx.bezierCurveTo(cx+w*.38*sc+f2,by-fh*.33,cx+w*.19*sc+f1*.4,by-fh*.67,cx+f1*.22,by-fh);
      ctx.bezierCurveTo(cx-w*.19*sc+f2*.4,by-fh*.67,cx-w*.38*sc+f1,by-fh*.33,cx-f1*.38,by);
      ctx.closePath();ctx.fillStyle=g;ctx.fill();
    }
    t+=.043;
    flameRAFs.set(id,requestAnimationFrame(draw));
  }
  draw();
}

/* ══════════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════════ */
function initParticles(){
  const c=document.getElementById("particles-canvas");
  const ctx=c.getContext("2d");
  let W=c.width=window.innerWidth,H=c.height=window.innerHeight;
  const pts=Array.from({length:95},()=>({
    x:Math.random()*W,y:H+Math.random()*H*.5,
    vx:(Math.random()-.5)*.44,vy:-(Math.random()*.95+.22),
    r:Math.random()*1.8+.3,a:Math.random()*.52+.1,
    hue:[340,18,272,350][Math.floor(Math.random()*4)],
    life:Math.random(),ml:.5+Math.random()*.5,
    wb:Math.random()*Math.PI*2,ws:(Math.random()-.5)*.023,
  }));
  function tick(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.wb+=p.ws;p.x+=p.vx+Math.sin(p.wb)*.27;p.y+=p.vy;p.life+=.0033;
      if(p.life>p.ml||p.y<-20){p.x=Math.random()*W;p.y=H+10;p.life=0;}
      const alpha=p.a*Math.sin((p.life/p.ml)*Math.PI);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.hue},54%,76%,${alpha})`;ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
  window.addEventListener("resize",()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;});
}

/* ══════════════════════════════════════════════════════
   MAGNETIC CURSOR
══════════════════════════════════════════════════════ */
const dot=document.getElementById("cursor-dot"),ring=document.getElementById("cursor-ring");
const pos={x:-200,y:-200},rp={x:-200,y:-200};
window.addEventListener("mousemove",e=>{pos.x=e.clientX;pos.y=e.clientY;});
(function loop(){
  rp.x+=(pos.x-rp.x)*.11;rp.y+=(pos.y-rp.y)*.11;
  dot.style.transform=`translate(${pos.x-5}px,${pos.y-5}px)`;
  ring.style.transform=`translate(${rp.x-18}px,${rp.y-18}px)`;
  requestAnimationFrame(loop);
})();

/* ══════════════════════════════════════════════════════
   MORPH WORD
══════════════════════════════════════════════════════ */
const WORDS=["Romance","Calm","Energy","Spirit","Longing","Bliss"];
let wi=0,morphTimeout;
function morphNext(){
  const el=document.getElementById("morph-word");
  if(!el)return;
  el.classList.remove("in");el.classList.add("out");
  morphTimeout=setTimeout(()=>{wi=(wi+1)%WORDS.length;el.textContent=WORDS[wi];el.classList.remove("out");el.classList.add("in");morphTimeout=setTimeout(morphNext,2400);},480);
}
setTimeout(morphNext,2400);

/* ══════════════════════════════════════════════════════
   COUNTER
══════════════════════════════════════════════════════ */
function animateCounter(el){
  const to=parseInt(el.dataset.count),suffix=el.dataset.suffix||"";
  let n=0;const step=Math.ceil(to/50);
  const iv=setInterval(()=>{n+=step;if(n>=to){el.textContent=to+suffix;clearInterval(iv);}else el.textContent=n+suffix;},26);
}
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);counterObs.unobserve(e.target);}});
},{threshold:.2});
document.querySelectorAll("[data-count]").forEach(el=>counterObs.observe(el));

/* ══════════════════════════════════════════════════════
   NAV SCROLL
══════════════════════════════════════════════════════ */
const nav=document.getElementById("main-nav");
window.addEventListener("scroll",()=>{
  nav.classList.toggle("scrolled",window.scrollY>60);
});

/* ══════════════════════════════════════════════════════
   HAMBURGER
══════════════════════════════════════════════════════ */
let menuOpen=false;
document.getElementById("hamburger").onclick=()=>{
  menuOpen=!menuOpen;
  document.getElementById("mobile-menu").style.display=menuOpen?"block":"none";
};
function closeMobile(){menuOpen=false;document.getElementById("mobile-menu").style.display="none";}

/* ══════════════════════════════════════════════════════
   PARALLAX HERO
══════════════════════════════════════════════════════ */
const heroGrid=document.getElementById("hero-grid");
window.addEventListener("scroll",()=>{
  heroGrid.style.transform=`translateY(${window.scrollY*.07}px)`;
});

/* ══════════════════════════════════════════════════════
   HERO CARDS (3D Tilt)
══════════════════════════════════════════════════════ */
function buildHeroCards(){
  const grid=document.getElementById("hero-cards");
  const cols=[[0,1],[2,3],[4,5]];
  cols.forEach((pair,ci)=>{
    const col=document.createElement("div");col.className="cards-col";
    if(ci===1)col.style.marginTop="26px";
    pair.forEach((fi,ri)=>{
      const c=FEATURED[fi];
      const wrap=document.createElement("div");wrap.className="tilt-card";
      wrap.style.animation=`cardIn .7s cubic-bezier(.16,1,.3,1) ${.46+(fi*.1)}s forwards`;
      wrap.innerHTML=`
        <div class="tilt-inner" id="tilt-${fi}">
          <div class="tilt-shimmer"></div>
          <div style="display:flex;justify-content:center;height:54px;margin-bottom:6px"><canvas id="hc-flame-${fi}" width="38" height="54"></canvas></div>
          <div class="tilt-candle-body" style="width:26px;height:42px;background:linear-gradient(180deg,${c.color}ee,${c.color}77);box-shadow:0 0 16px ${c.glow}35">
            <div class="tilt-candle-shine"></div>
          </div>
          <div class="tilt-name">${c.name}</div>
          <div class="tilt-mood" style="color:${c.glow}">${c.mood}</div>
          <div class="tilt-price">₹${c.price}</div>
        </div>`;
      col.appendChild(wrap);
      // Flame
      setTimeout(()=>{drawFlame(document.getElementById(`hc-flame-${fi}`),38,54,.65,fi);},200+fi*60);
      // 3D tilt
      const inner=()=>document.getElementById(`tilt-${fi}`);
      wrap.addEventListener("mousemove",e=>{
        const rect=wrap.getBoundingClientRect();
        const x=((e.clientX-rect.left)/rect.width-.5)*22;
        const y=((e.clientY-rect.top)/rect.height-.5)*-22;
        inner().style.transform=`rotateY(${x}deg) rotateX(${y}deg) translateZ(18px)`;
        inner().style.transition="transform .08s ease-out";
        inner().style.borderColor=c.glow+"55";
        inner().style.boxShadow=`0 28px 56px rgba(0,0,0,.55),0 0 36px ${c.glow}28`;
        drawFlame(document.getElementById(`hc-flame-${fi}`),38,54,1.4,fi);
      });
      wrap.addEventListener("mouseleave",()=>{
        inner().style.transform="";inner().style.transition="all .5s cubic-bezier(.16,1,.3,1)";
        inner().style.borderColor="rgba(255,255,255,.07)";inner().style.boxShadow="0 6px 22px rgba(0,0,0,.3)";
        drawFlame(document.getElementById(`hc-flame-${fi}`),38,54,.65,fi);
      });
    });
    grid.appendChild(col);
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════ */
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");}});
},{threshold:.1});
["about-header","about-left","about-right","shop-header","reviews-header","contact-header","contact-grid"].forEach(id=>{
  const el=document.getElementById(id);if(el)revealObs.observe(el);
});

/* ══════════════════════════════════════════════════════
   SHOP
══════════════════════════════════════════════════════ */
let cart=[];
let currentMood="All";

function renderShop(){
  const grid=document.getElementById("shop-grid");
  const filtered=currentMood==="All"?PRODUCTS:PRODUCTS.filter(p=>p.mood===currentMood);
  grid.innerHTML="";
  filtered.forEach((p,i)=>{
    const inCart=cart.some(c=>c.id===p.id);
    const card=document.createElement("div");
    card.className="product-card";
    card.style.cssText=`opacity:0;animation:cardIn .6s cubic-bezier(.16,1,.3,1) ${i*.04}s forwards`;
    card.innerHTML=`
      <div class="product-img" style="background:linear-gradient(135deg,${p.color}22,${p.color}0e)">
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px">
          <canvas id="pc-flame-${p.id}" width="42" height="62"></canvas>
          <div style="width:23px;height:36px;background:linear-gradient(180deg,${p.color}dd,${p.color}66);border-radius:3px 3px 5px 5px;box-shadow:0 0 12px ${p.glow}33"></div>
        </div>
        <span class="product-mood-tag" style="color:${p.glow};border:1px solid ${p.glow}28">${p.mood}</span>
        ${inCart?`<span class="product-incart">In bag</span>`:""}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-row">
          <span class="product-price">₹${p.price}</span>
          <span class="product-burn">🕐 ${p.burn}</span>
        </div>
        <button class="btn-add" id="add-${p.id}" onclick="addToCart(${p.id})" style="color:${p.glow};border:1.5px solid ${p.glow}44">+ Add to Bag</button>
      </div>`;
    grid.appendChild(card);
    setTimeout(()=>drawFlame(document.getElementById(`pc-flame-${p.id}`),42,62,.68,p.id),100+i*20);
    // Hover flame
    card.addEventListener("mouseenter",()=>drawFlame(document.getElementById(`pc-flame-${p.id}`),42,62,1.2,p.id));
    card.addEventListener("mouseleave",()=>drawFlame(document.getElementById(`pc-flame-${p.id}`),42,62,.68,p.id));
  });
}

document.getElementById("mood-filters").addEventListener("click",e=>{
  if(!e.target.classList.contains("mood-btn"))return;
  document.querySelectorAll(".mood-btn").forEach(b=>b.classList.remove("active"));
  e.target.classList.add("active");
  currentMood=e.target.dataset.mood;
  renderShop();
});

// Populate review product select
function populateSelect(){
  const sel=document.getElementById("rev-product");
  PRODUCTS.forEach(p=>{const o=document.createElement("option");o.value=p.name;o.textContent=p.name;sel.appendChild(o);});
}

/* ══════════════════════════════════════════════════════
   CART
══════════════════════════════════════════════════════ */
function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const ex=cart.find(i=>i.id===id);
  if(ex)ex.qty++;else cart.push({...p,qty:1});
  updateCartUI();renderShop();
  const btn=document.getElementById(`add-${id}`);
  if(btn){btn.textContent="✓ Added!";btn.classList.add("added");setTimeout(()=>{btn.textContent="+ Add to Bag";btn.classList.remove("added");},1400);}
}

function changeQty(id,delta){
  const i=cart.findIndex(x=>x.id===id);if(i<0)return;
  cart[i].qty+=delta;if(cart[i].qty<=0)cart.splice(i,1);
  updateCartUI();renderShop();renderCartItems();
}

function removeItem(id){cart=cart.filter(x=>x.id!==id);updateCartUI();renderShop();renderCartItems();}

function updateCartUI(){
  const total=cart.reduce((s,i)=>s+i.qty,0);
  const badge=document.getElementById("cart-badge");
  badge.textContent=total;badge.style.display=total>0?"flex":"none";
  document.getElementById("cart-item-count").textContent=`(${cart.reduce((s,i)=>s+i.qty,0)} items)`;
  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById("cart-subtotal-val").textContent=`₹${sub}`;
  document.getElementById("cart-total-val").textContent=`₹${sub}`;
  document.getElementById("cart-footer").style.display=cart.length?"block":"none";
  document.getElementById("cart-empty").style.display=cart.length?"none":"flex";
}

function renderCartItems(){
  const list=document.getElementById("cart-items-list");
  // Clear non-empty children
  [...list.children].forEach(c=>{if(!c.id||c.id!=="cart-empty")c.remove();});
  if(!cart.length){document.getElementById("cart-empty").style.display="flex";return;}
  document.getElementById("cart-empty").style.display="none";
  cart.forEach(item=>{
    const div=document.createElement("div");div.className="cart-item";
    div.innerHTML=`
      <div class="cart-item-img" style="background:linear-gradient(135deg,${item.color}44,${item.color}1a)">
        <canvas id="ci-flame-${item.id}" width="28" height="40"></canvas>
      </div>
      <div style="flex:1">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-mood" style="color:${item.glow||'#e8799a'}">${item.mood}</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:16px">
        <span class="cart-item-price">₹${item.price*item.qty}</span>
        <button class="btn-remove" onclick="removeItem(${item.id})">✕ Remove</button>
      </div>`;
    list.insertBefore(div,document.getElementById("cart-empty"));
    setTimeout(()=>drawFlame(document.getElementById(`ci-flame-${item.id}`),28,40,.7,item.id),80);
  });
}

function openCart(){
  renderCartItems();
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
}
function closeCart(){
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
}
document.getElementById("cart-open-btn").onclick=openCart;

// Cart empty flame
setTimeout(()=>drawFlame(document.getElementById("cart-empty-flame"),52,76,.55,99),300);

/* ══════════════════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════════════════ */
let appliedCoupon=null;
let selectedPay="razorpay";

function calcTotal(){
  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  let disc=0;
  if(appliedCoupon){disc=appliedCoupon.type==="percent"?Math.round(sub*appliedCoupon.discount/100):Math.min(appliedCoupon.discount,sub);}
  return{sub,disc,total:Math.max(0,sub-disc)};
}

function openCheckout(){
  closeCart();
  appliedCoupon=null;selectedPay="razorpay";
  renderCheckout();
  document.getElementById("checkout-modal").classList.add("open");
}
function closeCheckout(){document.getElementById("checkout-modal").classList.remove("open");}

function renderCheckout(){
  const{sub,disc,total}=calcTotal();
  const box=document.getElementById("modal-box");
  box.innerHTML=`
    <div class="modal-header">
      <div class="modal-title">Checkout</div>
      <div class="modal-sub">Complete your order below</div>
      <button class="btn-modal-close" onclick="closeCheckout()">✕</button>
    </div>
    <div class="modal-body">
      <div class="order-summary">
        <div style="font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:9px">Your Order</div>
        ${cart.map(i=>`<div class="order-row"><span>${i.name} <span style="color:rgba(255,255,255,.28);font-size:.75rem">×${i.qty}</span></span><span>₹${i.price*i.qty}</span></div>`).join("")}
        ${appliedCoupon?`<div style="display:flex;justify-content:space-between;padding:7px 0;font-size:.78rem;color:#82e0aa"><span>Discount (${appliedCoupon.code})</span><span>−₹${disc}</span></div>`:""}
        <div class="order-total-row"><span class="order-total-label">Total</span><span class="order-total-val">₹${total}</span></div>
      </div>
      <!-- Coupon -->
      <div style="margin-bottom:18px">
        <div style="font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:9px">Coupon Code</div>
        <div class="coupon-row">
          <input class="coupon-input ${appliedCoupon?"valid":""}" id="coupon-field" value="${appliedCoupon?appliedCoupon.code:""}" placeholder="Enter coupon code" ${appliedCoupon?"readonly":""} oninput="this.value=this.value.toUpperCase()"/>
          ${appliedCoupon
            ?`<button class="btn-remove-coupon" onclick="removeCoupon()">✕ Remove</button>`
            :`<button class="btn-coupon" onclick="applyCoupon()">Apply</button>`}
        </div>
        <div id="coupon-msg"></div>
      </div>
      <!-- Delivery -->
      <div class="section-sep">Delivery Details<div class="section-sep-line"></div></div>
      <div class="checkout-fields">
        <div class="field-group"><label class="field-label">First Name</label><input class="field-input" id="f-fname" placeholder="Priya"/></div>
        <div class="field-group"><label class="field-label">Last Name</label><input class="field-input" id="f-lname" placeholder="Sharma"/></div>
        <div class="field-group span2"><label class="field-label">Email</label><input class="field-input" id="f-email" type="email" placeholder="your@email.com"/></div>
        <div class="field-group span2"><label class="field-label">Phone</label><input class="field-input" id="f-phone" type="tel" placeholder="+91 98765 43210"/></div>
        <div class="field-group span2"><label class="field-label">Address Line 1</label><input class="field-input" id="f-addr1" placeholder="House / Flat No., Street"/></div>
        <div class="field-group span2"><label class="field-label">Address Line 2</label><input class="field-input" id="f-addr2" placeholder="Landmark (optional)"/></div>
        <div class="field-group"><label class="field-label">City</label><input class="field-input" id="f-city" placeholder="Kolkata"/></div>
        <div class="field-group"><label class="field-label">State</label><input class="field-input" id="f-state" placeholder="West Bengal"/></div>
        <div class="field-group"><label class="field-label">PIN Code</label><input class="field-input" id="f-pin" placeholder="700001"/></div>
      </div>
      <div style="margin-bottom:18px"><label class="field-label">Order Notes (optional)</label><textarea class="field-input" id="f-notes" rows="3" placeholder="Any special instructions…" style="resize:vertical"></textarea></div>
      <!-- Payment -->
      <div class="section-sep">Payment Method<div class="section-sep-line"></div></div>
      <div class="payment-options">
        <div class="pay-option ${selectedPay==="razorpay"?"active":""}" onclick="selectPay('razorpay')">
          <div class="pay-icon">💳</div><div class="pay-label">Card / UPI</div>
        </div>
        <div class="pay-option ${selectedPay==="cod"?"active":""}" onclick="selectPay('cod')">
          <div class="pay-icon">💵</div><div class="pay-label">Cash on Delivery</div>
        </div>
      </div>
      <button class="btn-place-order" id="btn-place" onclick="placeOrder()">Place Order ✦  ₹${total}</button>
      <p class="checkout-secure">🔒 Secure checkout · Handcrafted in Kolkata</p>
    </div>`;
}

function applyCoupon(){
  const code=(document.getElementById("coupon-field").value||"").trim().toUpperCase();
  const msg=document.getElementById("coupon-msg");
  if(!code){msg.className="coupon-msg err";msg.textContent="Please enter a coupon code.";return;}
  const c=COUPONS[code];
  if(!c){appliedCoupon=null;msg.className="coupon-msg err";msg.textContent="Invalid coupon code. Try again.";return;}
  appliedCoupon={code,...c};renderCheckout();
  setTimeout(()=>{const m=document.getElementById("coupon-msg");if(m){m.className="coupon-msg ok";m.textContent=`✦ ${c.label} applied!`;}},50);
}
function removeCoupon(){appliedCoupon=null;renderCheckout();}
function selectPay(m){selectedPay=m;document.querySelectorAll(".pay-option").forEach(el=>el.classList.remove("active"));event.currentTarget.classList.add("active");}

function placeOrder(){
  const fields={fname:"first name",lname:"last name",email:"email",phone:"phone",addr1:"address",city:"city",state:"state",pin:"PIN code"};
  for(const[k,l] of Object.entries(fields)){
    const v=(document.getElementById(`f-${k}`)?.value||"").trim();
    if(!v){alert(`Please enter your ${l}.`);return;}
  }
  const email=document.getElementById("f-email").value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){alert("Please enter a valid email.");return;}
  const phone=document.getElementById("f-phone").value.replace(/\D/g,"");
  if(phone.length<10){alert("Please enter a valid 10-digit phone number.");return;}
  const pin=document.getElementById("f-pin").value.trim();
  if(!/^\d{6}$/.test(pin)){alert("Please enter a valid 6-digit PIN code.");return;}

  const btn=document.getElementById("btn-place");
  btn.disabled=true;btn.innerHTML=`<div class="spinner"></div>Processing…`;
  setTimeout(()=>{
    const oid="SCN-"+Date.now().toString().slice(-8).toUpperCase();
    cart=[];updateCartUI();renderShop();
    const box=document.getElementById("modal-box");
    box.innerHTML=`
      <div class="order-success">
        <div class="success-flame-wrap"><canvas id="success-flame" width="52" height="76"></canvas></div>
        <div class="success-title">Order Placed! ✦</div>
        <p class="success-body">Thank you for your order. We'll reach out soon with updates.</p>
        <div class="success-order-id">Order ID: <strong>${oid}</strong></div>
        <br>
        <button class="btn-back-shop" onclick="closeCheckout()">Back to Shop ✦</button>
      </div>`;
    setTimeout(()=>drawFlame(document.getElementById("success-flame"),52,76,1.2,42),100);
  },1900);
}

/* ══════════════════════════════════════════════════════
   REVIEWS
══════════════════════════════════════════════════════ */
let reviewStars=0;
let reviews=[...SEED_REVIEWS];

document.getElementById("star-input").addEventListener("click",e=>{
  if(!e.target.classList.contains("star-btn"))return;
  reviewStars=parseInt(e.target.dataset.star);
  document.querySelectorAll(".star-btn").forEach((b,i)=>b.classList.toggle("active",i<reviewStars));
});

function renderReviews(){
  const list=document.getElementById("reviews-list");
  list.innerHTML="";
  reviews.forEach((r,i)=>{
    const div=document.createElement("div");div.className="review-card";
    div.style.animationDelay=`${i*.07}s`;
    div.innerHTML=`
      <div style="display:flex;align-items:center;gap:13px;margin-bottom:11px">
        <div class="review-avatar">${r.name[0]}</div>
        <div>
          <div style="font-size:.88rem;color:rgba(255,255,255,.82);font-weight:500">${r.name} <em style="font-family:'Cormorant Garamond',serif;font-size:.88rem;color:rgba(255,255,255,.32);font-style:italic">— ${r.product}</em></div>
          <div class="review-stars">${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</div>
        </div>
      </div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-date">${r.date}</p>`;
    list.appendChild(div);
    setTimeout(()=>div.classList.add("visible"),i*80);
  });
}

function submitReview(){
  const name=document.getElementById("rev-name").value.trim();
  const text=document.getElementById("rev-text").value.trim();
  const product=document.getElementById("rev-product").value;
  if(!name||!text||!product||!reviewStars){alert("Please fill all fields and pick a star rating.");return;}
  reviews.unshift({name,text,product,stars:reviewStars,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})});
  renderReviews();
  document.getElementById("rev-name").value="";document.getElementById("rev-text").value="";
  document.getElementById("rev-product").value="";reviewStars=0;
  document.querySelectorAll(".star-btn").forEach(b=>b.classList.remove("active"));
  const btn=document.getElementById("btn-submit-review");
  btn.textContent="✦ Thank you for your review!";btn.classList.add("ok");
  setTimeout(()=>{btn.textContent="Post Review ✦";btn.classList.remove("ok");},3200);
}

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
function sendContact(e){
  e.preventDefault();
  const btn=document.getElementById("btn-send");
  btn.textContent="✦ Message sent! We'll reply soon.";btn.classList.add("sent");
  document.getElementById("contact-form").reset();
  setTimeout(()=>{btn.textContent="Send Message ✦";btn.classList.remove("sent");},4000);
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
window.addEventListener("DOMContentLoaded",()=>{
  initParticles();
  drawFlame(document.getElementById("ambient-flame"),185,280,.52,3);
  setTimeout(()=>drawFlame(document.getElementById("about-flame"),84,128,1.1,7),400);
  buildHeroCards();
  renderShop();
  populateSelect();
  renderReviews();
});
