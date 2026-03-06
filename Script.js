/*Dark mode*/
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('scentra_theme', isDark ? 'dark' : 'light');
}

// Restore saved theme on every page load
(function applyTheme() {
  if (localStorage.getItem('scentra_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.addEventListener('DOMContentLoaded', function() {
      const icon = document.getElementById('theme-icon');
      if (icon) icon.textContent = '☀️';
    });
  }
})();
/* ── CURSOR ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
cur.style.left = e.clientX + 'px';
cur.style.top = e.clientY + 'px';
ring.style.left = e.clientX + 'px';
ring.style.top = e.clientY + 'px';
});

/* ── PRODUCTS DATA ── */
const products = [
  { id:1, name:'Bourbon Vanilla', image:'Bourbon Vanilla.jpeg', mood:'romantic', price:199, priceRange:'budget', burn:'6hr+', desc:'Vegan soy-coconut wax for a clean burn | Fragrance:French Bourbon, vanilla beans, and creamy woods | Cotton wicks for a natural flame | Added flavour:Mandarin Orange', color:'#fce4ec' },
  { id:2, name:'English Lavender', image:'English Lavender.jpeg', mood:'romantic', price:199, priceRange:'budget', burn:'6hr+', desc:'Includes: gentle bouquet of herbaceous rosemary and earthy sage, complemented by subtle undertones of warm tonka bean and soft musk in the base notes', color:'#f8bbd0' },
  { id:3, name:'Romantic Rose', image:'Romantic Rose.jpeg', mood:'romantic', price:199, priceRange:'budget', burn:'6hr+', desc:'Sun-kissed citrus and fresh florals to lift your spirits instantly.', color:'#fff9c4' },
  { id:4, name:'Royal Oud', image:'Royal Oud.jpeg', mood:'happy', price:199, priceRange:'budget', burn:'6hrs+', desc:'Bergamot, lemon zest, and sweet peach for your brightest days.', color:'#fffde7' },
  { id:5, name:'Very berry strawberry', image:'Strawberry Macrons Candle.jpeg', mood:'happy', price:529, priceRange:'mid', burn:'12hr', desc:'Petrichor and soft musk — a gentle companion on quiet, rainy days.', color:'#e3f2fd' },
  { id:6, name:'tiny love buds', image:'Heart Rose.jpeg', mood:'romantic', price:299, priceRange:'budget', burn:'42hr', desc:'Smoky vetiver, grey amber, and violet for introspective evenings.', color:'#ede7f6' },
  { id:7, name:'Sweet tooth', image:'Laddoo (6pcs).jpeg', mood:'calm', price:299, priceRange:'budget', burn:'40hr', desc:'White sage, eucalyptus, and cedar for a perfectly still mind.', color:'#e8f5e9' },
  { id:8, name:'The love pillar', image:'milky-chocobar.jpeg', mood:'romantic', price:299, priceRange:'budget', burn:'32hr', desc:'Sea salt, driftwood, and light musk to find your inner peace.', color:'#e0f7fa' },
  { id:9, name:'Rubiks Candle', image:'Rubiks candle.jpeg', mood:'energetic', price:299, priceRange:'budget', burn:'38hr', desc:'Peppermint, rosemary, and black pepper to ignite your energy.', color:'#fff3e0' },
  { id:10, name:'Teddy Candles', image:'Teddy Candles.jpeg', mood:'energetic', price:299, priceRange:'budget', burn:'50hr', desc:'Espresso, cardamom, and grapefruit — your perfect morning ritual.', color:'#fbe9e7' },
  { id:11, name:'The Shoreline Shot', image:'Ocean galaxy.jpeg', mood:'happy', price:250, priceRange:'budget', burn:'9hr', desc:'Sacred lotus, frankincense, and camphor for meditation and prayer.', color:'#f3e5f5' },
  { id:12, name:'Petals in Pine', image:'Wooden Candles.jpeg', mood:'spiritual', price:399, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:13, name:'Better Together', image:'better-together.jpeg', mood:'romantic', price:249, priceRange:'budget', burn:'6hr+', desc:'Beautiful male and female sculpture candle together.', color:'#fdf6e3' },
  { id:14, name:'Golden Petal Aroma', image:'golden-petal-aroma.jpeg', mood:'romantic', price:250, priceRange:'budget', burn:'8hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:15, name:'Beauty and Elegance', image:'beauty-and-elegance.jpeg', mood:'spiritual', price:329, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:16, name:'Petal Peony', image:'petal-peony.jpeg', mood:'spiritual', price:250, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:17, name:'Springtime Bundle', image:'springtime-bundle.jpeg', mood:'spiritual', price:299, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:18, name:'Chai & Chill', image:'Chai biscuit Candle.jpeg', mood:'happy', price:199, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:19, name:'Daisy Vibe', image:'Daisy Vibe.jpeg', mood:'calm', price:199, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:20, name:'Cinderella Cart', image:'Cinderellas-cart.jpeg', mood:'energetic', price:399, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:21, name:'Roses and Mogra', image:'rose-and-mogra.jpeg', mood:'spiritual', price:450, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:22, name:'Spooky Friends', image:'Spooky friends.jpeg', mood:'energetic', price:329, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:23, name:'Christmas carousel', image:'Christmas carousel.jpeg', mood:'happy', price:349, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:24, name:'Walk the Plank', image:'walk-the-plank.jpeg', mood:'energetic', price:399, priceRange:'budget', burn:'7hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:25, name:'Blushing Heart Blooms', image:'blushing-heart-blooms.jpeg', mood:'romantic', price:349, priceRange:'budget', burn:'9hr+', desc:'Heart-shaped floral candle designed for gifting, date nights, and special celebrations.', color:'#ffe4ee' },
  { id:26, name:'Sweetheart Stack', image:'sweetheart-stack.jpeg', mood:'happy', price:299, priceRange:'budget', burn:'8hr+', desc:'Layered dessert-inspired design with warm vanilla notes and playful charm.', color:'#fff1e8' },
  { id:27, name:'Flower Petal Signature Jar', image:'Flower petal with jar.jpeg', mood:'calm', price:499, priceRange:'mid', burn:'20hr+', desc:'Premium jar candle with soft floral fragrance and longer burn for cozy evenings.', color:'#f7f0ff' },
  { id:28, name:'Fragrance Discovery Pack (5 pcs)', image:'Fragrance Candles(pack of 5).jpeg', mood:'happy', price:699, priceRange:'mid', burn:'15hr+', desc:'A set of five mini signature candles to explore multiple Scentra moods at once.', color:'#f9f3df' },
];

let activeMood = 'all';
let activePrice = 'all';
let currentProduct = null;

function renderProducts() {
const grid = document.getElementById('products-grid');
grid.innerHTML = '';
const filtered = products.filter(p => {
const moodOk = activeMood === 'all' || p.mood === activeMood;
const priceOk = activePrice === 'all' || p.priceRange === activePrice;
return moodOk && priceOk;
});
if (!filtered.length) {
grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;font-family:Cormorant Garamond,serif;font-size:1.2rem;font-style:italic;color:var(--text-light);padding:60px 0;">No candles match your filters — try a different combination ✦</p>';
return;
}
filtered.forEach(p => {
grid.innerHTML += `
     <div class="product-card reveal">
       <div class="product-img" style="background:${p.color}">
         <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:0;">
         <span class="product-mood-badge">${p.mood}</span>
       </div>
       <div class="product-info">
         <div class="product-name">${p.name}</div>
         <div class="product-desc">${p.desc}</div>
         <div class="product-meta">
           <div class="product-price">₹${p.price}</div>
           <div class="product-burn">🕐 ${p.burn}</div>
         </div>
         <button class="btn-buy" onclick="openModal(${p.id})">Order Now</button>
         <button class="btn-cart-add" data-cart-id="${p.id}" onclick="addToCart(${p.id})">+ Add to Bag</button>
       </div>
     </div>`;
});
observeReveal();
}

/* ── FILTER LOGIC ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', () => {
const type = btn.dataset.filter;
document.querySelectorAll(`.filter-btn[data-filter="${type}"]`).forEach(b => b.classList.remove('active'));
btn.classList.add('active');
if (type === 'mood') activeMood = btn.dataset.value;
if (type === 'price') activePrice = btn.dataset.value;
renderProducts();
});
});

/* ── POPULATE SELECT ── */
function populateReviewSelect() {
const sel = document.getElementById('r-product');
products.forEach(p => {
sel.innerHTML += `<option value="${p.name}">${p.name}</option>`;
});
}

/* ── FIREBASE CONFIG ── */
const FIREBASE_CONFIG = {
apiKey:            'AIzaSyDe3alevwZR4Mb_gqaFzXA9v4Hhkliar70',
authDomain:        'scentra-79d03.firebaseapp.com',
databaseURL:       'https://scentra-79d03-default-rtdb.firebaseio.com',
projectId:         'scentra-79d03',
storageBucket:     'scentra-79d03.firebasestorage.app',
messagingSenderId: '949284857521',
appId:             '1:949284857521:web:8aeff5153d051cc3faa490',
measurement:       'G-Q359FL862T'
};

let selectedStars = 0;
let db = null;

function escapeHtml(value) {
return String(value)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#39;');
}

function initFirebase() {
const scripts = [
'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'
];
let loaded = 0;
scripts.forEach(src => {
const s = document.createElement('script');
s.src = src;
s.onload = () => {
loaded++;
if (loaded === scripts.length) startFirestore();
};
document.head.appendChild(s);
});
}

function startFirestore() {
firebase.initializeApp(FIREBASE_CONFIG);
db = firebase.firestore();
db.collection('reviews')
.orderBy('date', 'desc')
.onSnapshot(snapshot => {
const reviews = snapshot.docs.map(doc => doc.data());
renderReviews(reviews);
}, err => {
console.error('Firestore listen error:', err);
});
}

document.getElementById('star-input').addEventListener('click', e => {
if (!e.target.dataset.val) return;
selectedStars = parseInt(e.target.dataset.val);
document.querySelectorAll('#star-input span').forEach((s, i) => {
s.classList.toggle('active', i < selectedStars);
});
});

async function submitReview() {
const name    = document.getElementById('r-name').value.trim();
const product = document.getElementById('r-product').value;
const text    = document.getElementById('r-text').value.trim();
if (!name || !product || !text || !selectedStars) {
alert('Please fill in all fields and select a star rating!');
return;
}
if (!db) {
alert('Reviews service is still loading — please try again in a moment.');
return;
}
const btn = document.getElementById('submit-review-btn');
if (btn) { btn.textContent = 'Posting…'; btn.disabled = true; }
try {
await db.collection('reviews').add({
name,
product,
text,
stars: selectedStars,
date: firebase.firestore.FieldValue.serverTimestamp()
});
document.getElementById('r-name').value = '';
document.getElementById('r-text').value = '';
document.getElementById('r-product').value = '';
selectedStars = 0;
document.querySelectorAll('#star-input span').forEach(s => s.classList.remove('active'));
} catch (err) {
console.error('Failed to post review:', err);
alert('Could not post review — please try again.');
} finally {
if (btn) { btn.textContent = 'Post Review ✦'; btn.disabled = false; }
}
}

function renderReviews(reviews) {
const list = document.getElementById('reviews-list');
if (!reviews || !reviews.length) {
list.innerHTML = '<div class="no-reviews">Be the first to share your experience ✦</div>';
return;
}
list.innerHTML = reviews.map(r => {
const dateObj = r.date && r.date.toDate ? r.date.toDate() : new Date(r.date || Date.now());
return `
   <div class="review-card">
     <div class="review-header">
       <div class="review-avatar">${escapeHtml(r.name[0].toUpperCase())}</div>
       <div class="review-meta">
         <h4>${escapeHtml(r.name)} — <em style="font-family:Cormorant Garamond,serif;font-style:italic;color:var(--text-light)">${escapeHtml(r.product)}</em></h4>
         <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
       </div>
     </div>
     <p class="review-text">"${escapeHtml(r.text)}"</p>
     <p class="review-date">${dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
   </div>`;
}).join('');
}

/* ── ORDER MODAL ── */
function openModal(id) {
currentProduct = products.find(p => p.id === id);
document.getElementById('modal-product-info').innerHTML = `
   <div>
     <div class="modal-product-name">${currentProduct.name}</div>
     <div class="modal-product-price">₹${currentProduct.price} each</div>
   </div>`;
document.getElementById('order-qty').value = 1;
updateTotal();
document.getElementById('order-modal').classList.add('open');
}

function closeModal() {
document.getElementById('order-modal').classList.remove('open');
}

function updateTotal() {
const qty = parseInt(document.getElementById('order-qty').value) || 1;
document.getElementById('order-total').textContent = `= ₹${currentProduct.price * qty}`;
}

function initiatePayment() {
const name = document.getElementById('order-name').value.trim();
const email = document.getElementById('order-email').value.trim();
const qty = parseInt(document.getElementById('order-qty').value) || 1;
if (!name || !email) { alert('Please enter your name and email.'); return; }
const amount = currentProduct.price * qty * 100;
const options = {
key: 'rzp_live_SMQTjtfUT3u3zz',
amount: amount,
currency: 'INR',
name: 'Scentra Candles',
description: `${currentProduct.name} × ${qty}`,
image: `${currentProduct.image}`,
prefill: { name, email },
theme: { color: '#6b1a2a' },
handler: function(response) {
closeModal();
alert(`✦ Payment successful!\nOrder ID: ${response.razorpay_payment_id}\nThank you for choosing Scentra, ${name}!`);
},
modal: { ondismiss: () => {} }
};
const rzp = new Razorpay(options);
rzp.open();
}

/* ── CONTACT FORM ── */
document.getElementById('contact-form').addEventListener('submit', async function(e) {
e.preventDefault();
const btn = this.querySelector('.btn-contact');
btn.textContent = 'Sending…';
btn.disabled = true;
try {
const res = await fetch(this.action, {
method: 'POST',
body: new FormData(this),
headers: { Accept: 'application/json' }
});
if (res.ok) {
this.reset();
document.getElementById('contact-success').style.display = 'block';
btn.textContent = 'Message Sent ✦';
} else {
btn.textContent = 'Try Again';
btn.disabled = false;
}
} catch {
btn.textContent = 'Try Again';
btn.disabled = false;
}
});

/* ── SCROLL REVEAL ── */
function observeReveal() {
const obs = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* ── INIT ── */
renderProducts();
populateReviewSelect();
observeReveal();
initFirebase();

/* ── HAMBURGER MENU ── */
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
if (!menuToggle || !mobileMenu) return;
mobileMenu.classList.remove('open');
menuToggle.classList.remove('active');
document.body.style.overflow = '';
}

if (menuToggle && mobileMenu) {
menuToggle.addEventListener('click', () => {
const isOpen = mobileMenu.classList.contains('open');
if (isOpen) {
closeMobileMenu();
} else {
mobileMenu.classList.add('open');
menuToggle.classList.add('active');
document.body.style.overflow = 'hidden';
}
});
document.addEventListener('click', (e) => {
if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
closeMobileMenu();
}
});
window.addEventListener('resize', () => {
if (window.innerWidth > 900) closeMobileMenu();
});
}

/* ── CART SYSTEM ── */
const STORE_FORM_ENDPOINT = 'https://formspree.io/f/xykdqggb';
/* ── COUPON CODES ── */
const COUPONS = {
'SCENTRA10':  { discount: 10, type: 'percent',  label: '10% off your order' },
'WELCOME20':  { discount: 20, type: 'percent',  label: '20% off for new customers' },
'FLAT50':     { discount: 50, type: 'flat',     label: '₹50 flat off' },
'MOOD15':    { discount: 15, type: 'percent',  label: '15% off — special code' },
'HOLI100':  { discount: 100, type: 'flat',    label: '₹100 off on festive orders' },
};

let appliedCoupon = null;

function applyCoupon() {
const input = document.getElementById('co-coupon');
const code  = input.value.trim().toUpperCase();
const msgEl = document.getElementById('coupon-msg');
const rowEl = document.getElementById('coupon-discount-row');
const totalEl = document.getElementById('checkout-grand-total');

if (!code) {
showCouponMsg('Please enter a coupon code.', 'error');
return;
}

const coupon = COUPONS[code];

if (!coupon) {
appliedCoupon = null;
input.classList.add('co-error');
showCouponMsg('Invalid coupon code. Please try again.', 'error');
rowEl.style.display = 'none';
recalcTotal();
return;
}

// Valid coupon
appliedCoupon = { code, ...coupon };
input.classList.remove('co-error');
input.classList.add('coupon-valid');
input.readOnly = true;

// Show success message
showCouponMsg('✦ ' + coupon.label + ' applied!', 'success');

// Show discount row
const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
const discountAmt = coupon.type === 'percent'
? Math.round(subtotal * coupon.discount / 100)
: Math.min(coupon.discount, subtotal);

document.getElementById('coupon-discount-amount').textContent = '−₹' + discountAmt;
rowEl.style.display = 'flex';

recalcTotal();
}

function removeCoupon() {
appliedCoupon = null;
const input = document.getElementById('co-coupon');
input.value   = '';
input.readOnly = false;
input.classList.remove('coupon-valid', 'co-error');
document.getElementById('coupon-msg').style.display = 'none';
document.getElementById('coupon-discount-row').style.display = 'none';
recalcTotal();
}

function recalcTotal() {
const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
let discount = 0;
if (appliedCoupon) {
discount = appliedCoupon.type === 'percent'
? Math.round(subtotal * appliedCoupon.discount / 100)
: Math.min(appliedCoupon.discount, subtotal);
}
const final = Math.max(0, subtotal - discount);
const el = document.getElementById('checkout-grand-total');
if (el) el.textContent = '₹' + final;
}

function showCouponMsg(msg, type) {
const el = document.getElementById('coupon-msg');
if (!el) return;
el.textContent  = msg;
el.className    = 'coupon-msg ' + type;
el.style.display = 'block';
}

let cart = JSON.parse(localStorage.getItem('scentra_cart') || '[]');
let selectedPaymentMethod = 'razorpay';

function saveCart() {
localStorage.setItem('scentra_cart', JSON.stringify(cart));
}

function addToCart(productId) {
const product = products.find(p => p.id === productId);
if (!product) return;
const existing = cart.find(i => i.id === productId);
if (existing) {
existing.qty += 1;
} else {
cart.push({ id: product.id, name: product.name, image: product.image,
price: product.price, mood: product.mood, qty: 1 });
}
saveCart();
updateCartUI();
animateCartFab();
const btns = document.querySelectorAll('[data-cart-id="' + productId + '"]');
btns.forEach(btn => {
btn.textContent = 'Added!';
btn.classList.add('added');
setTimeout(() => { btn.textContent = '+ Add to Bag'; btn.classList.remove('added'); }, 1500);
});
}

function updateCartUI() {
const totalQty = cart.reduce((s, i) => s + i.qty, 0);
const totalAmt = cart.reduce((s, i) => s + i.price * i.qty, 0);
const badge = document.getElementById('cart-count');
if (badge) { badge.textContent = totalQty; badge.classList.toggle('visible', totalQty > 0); }
const countLabel = document.getElementById('cart-item-count');
if (countLabel) countLabel.textContent = totalQty > 0 ? '(' + totalQty + ')' : '';
const sub = document.getElementById('cart-subtotal');
const tot = document.getElementById('cart-total-display');
if (sub) sub.textContent = '₹' + totalAmt;
if (tot) tot.textContent = '₹' + totalAmt;
const footer = document.getElementById('cart-footer');
if (footer) footer.style.display = cart.length ? '' : 'none';
renderCartItems();
}

function renderCartItems() {
const list = document.getElementById('cart-items-list');
if (!list) return;
if (!cart.length) {
list.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🕯️</div>Your bag is empty — add a candle to begin.</div>';
return;
}
list.innerHTML = cart.map(item =>
'<div class="cart-item">' +
'<img class="cart-item-img" src="' + item.image + '" alt="' + item.name + '" onerror="this.style.background=\'var(--beige)\';this.src=\'\';">' +
'<div class="cart-item-body">' +
'<div class="cart-item-name">' + item.name + '</div>' +
'<div class="cart-item-mood">' + item.mood + '</div>' +
'<div class="cart-item-controls">' +
'<button class="qty-btn" onclick="changeQty(' + item.id + ', -1)">−</button>' +
'<span class="qty-num">' + item.qty + '</span>' +
'<button class="qty-btn" onclick="changeQty(' + item.id + ', 1)">+</button>' +
'</div></div>' +
'<div class="cart-item-price">' +
'<span>₹' + (item.price * item.qty) + '</span>' +
'<button class="remove-btn" onclick="removeFromCart(' + item.id + ')">✕ Remove</button>' +
'</div></div>'
).join('');
}

function changeQty(id, delta) {
const item = cart.find(i => i.id === id);
if (!item) return;
item.qty += delta;
if (item.qty <= 0) removeFromCart(id);
else { saveCart(); updateCartUI(); }
}

function removeFromCart(id) {
cart = cart.filter(i => i.id !== id);
saveCart();
updateCartUI();
}

function openCart() {
document.getElementById('cart-overlay').classList.add('open');
document.getElementById('cart-drawer').classList.add('open');
document.body.style.overflow = 'hidden';
}

function closeCart() {
document.getElementById('cart-overlay').classList.remove('open');
document.getElementById('cart-drawer').classList.remove('open');
document.body.style.overflow = '';
}

function animateCartFab() {
const fab = document.getElementById('cart-fab');
if (!fab) return;
fab.style.transform = 'scale(1.25)';
setTimeout(() => { fab.style.transform = ''; }, 300);
}

function openCheckout() {
if (!cart.length) return;
closeCart();
populateCheckoutSummary();
recalcTotal();        
document.getElementById('checkout-overlay').classList.add('open');
document.body.style.overflow = 'hidden';
}

function closeCheckout() {
document.getElementById('checkout-overlay').classList.remove('open');
document.body.style.overflow = '';
document.getElementById('order-success').classList.remove('show');
document.getElementById('checkout-form-wrap').style.display = '';
}

function populateCheckoutSummary() {
const container = document.getElementById('checkout-items-rows');
const grandTotal = document.getElementById('checkout-grand-total');
if (!container) return;
const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
container.innerHTML = cart.map(i =>
'<div class="checkout-item-row">' +
'<span>' + i.name + ' <span class="item-qty">× ' + i.qty + '</span></span>' +
'<span>₹' + (i.price * i.qty) + '</span>' +
'</div>'
).join('');
if (grandTotal) grandTotal.textContent = '₹' + total;
}

function selectPayment(method, el) {
selectedPaymentMethod = method;
document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
el.classList.add('selected');
}

function validateCheckout() {
var required = [
['co-fname', 'First name'], ['co-lname', 'Last name'],
['co-email', 'Email address'], ['co-phone', 'Phone number'],
['co-addr1', 'Address line 1'], ['co-city', 'City'],
['co-state', 'State'], ['co-pin', 'PIN code']
];
var firstError = null;
var valid = true;
required.forEach(function(pair) {
var el = document.getElementById(pair[0]);
if (!el) return;
el.classList.remove('co-error');
if (!el.value.trim()) {
el.classList.add('co-error');
if (!firstError) firstError = pair[1];
valid = false;
}
});
var emailEl = document.getElementById('co-email');
if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
emailEl.classList.add('co-error');
if (!firstError) firstError = 'valid email address';
valid = false;
}
var phoneEl = document.getElementById('co-phone');
if (phoneEl && phoneEl.value && phoneEl.value.replace(/\D/g,'').length < 10) {
phoneEl.classList.add('co-error');
if (!firstError) firstError = 'valid 10-digit phone number';
valid = false;
}
var pinEl = document.getElementById('co-pin');
if (pinEl && pinEl.value && !/^\d{6}$/.test(pinEl.value.trim())) {
pinEl.classList.add('co-error');
if (!firstError) firstError = 'valid 6-digit PIN code';
valid = false;
}
if (!valid) showCoError('Please enter a valid ' + firstError + '.');
return valid;
}

function showCoError(msg) {
var el = document.getElementById('co-error');
if (!el) return;
el.textContent = msg;
el.style.display = 'block';
el.scrollIntoView({ behavior: 'smooth', block: 'center' });
setTimeout(function() { el.style.display = 'none'; }, 5000);
}

async function placeOrder() {
if (!validateCheckout()) return;
var btn     = document.getElementById('place-order-btn');
var label   = document.getElementById('po-label');
var spinner = document.getElementById('po-spinner');
btn.disabled = true;
if (label)   label.style.display   = 'none';
if (spinner) spinner.style.display = 'block';

var orderData = {
fname:     document.getElementById('co-fname').value.trim(),
lname:     document.getElementById('co-lname').value.trim(),
email:     document.getElementById('co-email').value.trim(),
phone:     document.getElementById('co-phone').value.trim(),
addr1:     document.getElementById('co-addr1').value.trim(),
addr2:     document.getElementById('co-addr2').value.trim(),
city:      document.getElementById('co-city').value.trim(),
state:     document.getElementById('co-state').value.trim(),
pin:       document.getElementById('co-pin').value.trim(),
country:   document.getElementById('co-country').value.trim(),
notes:     document.getElementById('co-notes').value.trim(),
payment:   selectedPaymentMethod === 'razorpay' ? 'Card / UPI (Razorpay)' : 'Cash on Delivery',
items:     cart,
total:     (function() {
var sub = cart.reduce(function(s, i) { return s + i.price * i.qty; }, 0);
if (!appliedCoupon) return sub;
var disc = appliedCoupon.type === 'percent'
? Math.round(sub * appliedCoupon.discount / 100)
: Math.min(appliedCoupon.discount, sub);
return Math.max(0, sub - disc);
})(),
orderId:   'SCN-' + Date.now().toString().slice(-8).toUpperCase(),
orderDate: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })
};

var itemsList = orderData.items.map(function(i) {
return i.name + ' (' + i.mood + ') x ' + i.qty + ' = Rs.' + (i.price * i.qty);
}).join('\n');

var fullAddress = [orderData.addr1, orderData.addr2, orderData.city,
orderData.state, orderData.pin, orderData.country]
.filter(Boolean).join(', ');

try {
if (selectedPaymentMethod === 'razorpay') {
await handleRazorpayCheckout(orderData, itemsList, fullAddress);
} else {
await fetch(STORE_FORM_ENDPOINT, {
method: 'POST',
headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
body: JSON.stringify({
subject:        'New Order - ' + orderData.orderId,
order_id:       orderData.orderId,
order_date:     orderData.orderDate,
customer_name:  orderData.fname + ' ' + orderData.lname,
customer_email: orderData.email,
customer_phone: orderData.phone,
full_address:   fullAddress,
items_list:     itemsList,
order_total:    'Rs.' + orderData.total,
payment_method: orderData.payment,
order_notes:    orderData.notes || 'None'
})
});
onOrderSuccess(orderData.orderId);
}
} catch (err) {
console.error('Order error:', err);
showCoError('Something went wrong. Please try again or contact us directly.');
btn.disabled = false;
if (label)   label.style.display   = '';
if (spinner) spinner.style.display = 'none';
}
}

async function handleRazorpayCheckout(orderData, itemsList, fullAddress) {
var btn     = document.getElementById('place-order-btn');
var label   = document.getElementById('po-label');
var spinner = document.getElementById('po-spinner');
var options = {
key:         'rzp_live_SMQTjtfUT3u3zz',
amount:      orderData.total * 100,
currency:    'INR',
name:        'Scentra Candles',
description: 'Order ' + orderData.orderId,
prefill: {
name:    orderData.fname + ' ' + orderData.lname,
email:   orderData.email,
contact: orderData.phone
},
theme: { color: '#6b1a2a' },
handler: async function(response) {
try {
await fetch(STORE_FORM_ENDPOINT, {
method: 'POST',
headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
body: JSON.stringify({
subject:        'New Order - ' + orderData.orderId,
order_id:       orderData.orderId,
order_date:     orderData.orderDate,
customer_name:  orderData.fname + ' ' + orderData.lname,
customer_email: orderData.email,
customer_phone: orderData.phone,
full_address:   fullAddress,
items_list:     itemsList,
order_total:    'Rs.' + orderData.total,
payment_method: 'Card / UPI | Payment ID: ' + response.razorpay_payment_id,
order_notes:    orderData.notes || 'None'
})
});
} catch(e) { console.warn('Email send failed but payment succeeded:', e); }
onOrderSuccess(orderData.orderId);
},
modal: {
ondismiss: function() {
btn.disabled = false;
if (label)   label.style.display   = '';
if (spinner) spinner.style.display = 'none';
}
}
};
var rzp = new Razorpay(options);
rzp.open();
}

function onOrderSuccess(orderId) {
cart = [];
saveCart();
updateCartUI();
document.getElementById('checkout-form-wrap').style.display = 'none';
document.getElementById('order-success').classList.add('show');
document.getElementById('success-order-id').textContent = orderId;
}

updateCartUI();
// ── Announcement Carousel ──
(function () {
  const track  = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  if (!track || !dotsEl) return;

  const cards  = track.querySelectorAll('.announcement-card');
  const total  = cards.length;
  let current  = 0;
  let timer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }

  function startAuto() { timer = setInterval(next, 3500); }
  function stopAuto()  { clearInterval(timer); }

  // Pause on hover, resume on leave
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Touch swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : goTo(current - 1);
    startAuto();
  });

  startAuto();
})();






