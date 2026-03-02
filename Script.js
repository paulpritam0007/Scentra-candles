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
  { id:3, name:'Romantic Rose', image:'Romantic Rose.jpeg', mood:'Romantic', price:199, priceRange:'budget', burn:'6hr+', desc:'Sun-kissed citrus and fresh florals to lift your spirits instantly.', color:'#fff9c4' },
  { id:4, name:'Royal Oud', image:'Royal Oud.jpeg', mood:'happy', price:199, priceRange:'budget', burn:'6hrs+', desc:'Bergamot, lemon zest, and sweet peach for your brightest days.', color:'#fffde7' },
  { id:5, name:'Very berry strawberry', image:'Strawberry Macrons Candle.jpeg', mood:'Happy', price:529, priceRange:'mid', burn:'12hr', desc:'Petrichor and soft musk — a gentle companion on quiet, rainy days.', color:'#e3f2fd' },
  { id:6, name:'tiny love buds', image:'Heart Rose.jpeg', mood:'romantic', price:299, priceRange:'budget', burn:'42hr', desc:'Smoky vetiver, grey amber, and violet for introspective evenings.', color:'#ede7f6' },
  { id:7, name:'Sweet tooth', image:'Laddoo (6pcs).jpeg', mood:'calm', price:299, priceRange:'budget', burn:'40hr', desc:'White sage, eucalyptus, and cedar for a perfectly still mind.', color:'#e8f5e9' },
  { id:8, name:'The love pillar', image:'milky-chocobar.jpeg', mood:'romantic', price:299, priceRange:'budget', burn:'32hr', desc:'Sea salt, driftwood, and light musk to find your inner peace.', color:'#e0f7fa' },
  { id:9, name:'Rubiks Candle', image:'Rubiks candle.jpeg', mood:'energetic', price:299, priceRange:'budget', burn:'38hr', desc:'Peppermint, rosemary, and black pepper to ignite your energy.', color:'#fff3e0' },
  { id:10, name:'Teddy Candles', image:'Teddy Candles.jpeg', mood:'energetic', price:299, priceRange:'budget', burn:'50hr', desc:'Espresso, cardamom, and grapefruit — your perfect morning ritual.', color:'#fbe9e7' },
  { id:11, name:'The Shoreline Shot', image:'Ocean galaxy.jpeg', mood:'happy', price:250, priceRange:'budget', burn:'9hr', desc:'Sacred lotus, frankincense, and camphor for meditation and prayer.', color:'#f3e5f5' },
  { id:12, name:'Petals in Pine', image:'Wooden Candles.jpeg', mood:'spiritual', price:399, priceRange:'mid', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:13, name:'Better Together', image:'better-together.jpeg', mood:'romantic', price:249, priceRange:'budget', burn:'6hr+', desc:'Beautiful male and female sculpture candle together.', color:'#fdf6e3' },
  { id:14, name:'Golden Petal Aroma', image:'golden-petal-aroma.jpeg', mood:'romantic', price:250, priceRange:'mid', burn:'8hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:15, name:'Beauty and Elegance', image:'beauty-and-elegance.jpeg', mood:'spiritual', price:329, priceRange:'premium', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:16, name:'Petal Peony', image:'petal-peony.jpeg', mood:'spiritual', price:250, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:17, name:'Springtime Bundle', image:'springtime-bundle.jpeg', mood:'spiritual', price:299, priceRange:'budget', burn:'60hr', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:18, name:'Chai & Chill', image:'Chai biscuit Candle.jpeg', mood:'happy', price:199, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:19, name:'Daisy Vibe', image:'Daisy Vibe.jpeg', mood:'calm', price:199, priceRange:'budget', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:20, name:'Cinderella Cart', image:'Cinderellas-cart.jpeg', mood:'energetic', price:399, priceRange:'mid', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:21, name:'Roses and Mogra', image:'rose-and-mogra.jpeg', mood:'spiritual', price:450, priceRange:'mid', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:22, name:'Spooky Friends', image:'Spooky friends.jpeg', mood:'energetic', price:329, priceRange:'mid', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:23, name:'Christmas carousel', image:'Christmas carousel.jpeg', mood:'happy', price:349, priceRange:'mid', burn:'4hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
  { id:24, name:'Walk the Plank', image:'walk-the-plank.jpeg', mood:'energetic', price:399, priceRange:'mid', burn:'7hr+', desc:'Amber, sandalwood, and tuberose — a devotional experience in wax.', color:'#fdf6e3' },
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
    sel.innerHTML += `<option value="${p.name}">${p.emoji} ${p.name}</option>`;
  });
}

/* ── REVIEWS ── */
let selectedStars = 0;
const reviews = [];

document.getElementById('star-input').addEventListener('click', e => {
  if (!e.target.dataset.val) return;
  selectedStars = parseInt(e.target.dataset.val);
  document.querySelectorAll('#star-input span').forEach((s, i) => {
    s.classList.toggle('active', i < selectedStars);
  });
});

function submitReview() {
  const name = document.getElementById('r-name').value.trim();
  const product = document.getElementById('r-product').value;
  const text = document.getElementById('r-text').value.trim();
  if (!name || !product || !text || !selectedStars) {
    alert('Please fill in all fields and select a star rating!');
    return;
  }
  reviews.unshift({ name, product, text, stars: selectedStars, date: new Date() });
  renderReviews();
  document.getElementById('r-name').value = '';
  document.getElementById('r-text').value = '';
  document.getElementById('r-product').value = '';
  selectedStars = 0;
  document.querySelectorAll('#star-input span').forEach(s => s.classList.remove('active'));
}

function renderReviews() {
  const list = document.getElementById('reviews-list');
  if (!reviews.length) {
    list.innerHTML = '<div class="no-reviews">Be the first to share your experience ✦</div>';
    return;
  }
  list.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.name[0].toUpperCase()}</div>
        <div class="review-meta">
          <h4>${r.name} — <em style="font-family:Cormorant Garamond,serif;font-style:italic;color:var(--text-light)">${r.product}</em></h4>
          <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
        </div>
      </div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-date">${r.date.toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}</p>
    </div>`).join('');
}

/* ── ORDER MODAL ── */
function openModal(id) {
  currentProduct = products.find(p => p.id === id);
  document.getElementById('modal-product-info').innerHTML = `
    <div class="modal-product-emoji">${currentProduct.emoji}</div>
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
  const amount = currentProduct.price * qty * 100; // paise

  const options = {
    key: 'rzp_live_SMQTjtfUT3u3zz', // 🔑 API KEY
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






















