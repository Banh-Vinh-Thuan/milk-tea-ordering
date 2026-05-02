// ===== MODAL LOGIC =====

let currentProduct = null;
let modalState = {
  size: 'M',
  toppings: [],
  sugar: '50%',
  ice: 'Regular',
  qty: 1
};

function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  modalState = { size: 'M', toppings: [], sugar: '50%', ice: 'Regular', qty: 1 };

  renderModal(product);

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modalOverlay') && !event.currentTarget.classList?.contains('modal-close')) {
    if (event.target !== document.getElementById('modalOverlay')) return;
  }
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  currentProduct = null;
}

function renderModal(product) {
  const content = document.getElementById('modalContent');

  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.modal-emoji').style.display='flex'" /><div class="modal-emoji" style="display:none; position:absolute; inset:0; align-items:center; justify-content:center; font-size:5rem">${product.emoji}</div>`
    : `<div style="font-size:5rem">${product.emoji}</div>`;

  const toppingRows = TOPPINGS.map(t => `
    <button class="topping-option" data-id="${t.id}" onclick="toggleTopping('${t.id}', this)">
      <span class="topping-icon">${t.icon}</span>
      ${t.name} <small style="color:var(--color-text-light)">+${formatPrice(t.price)}</small>
    </button>`).join('');

  const sugarRows = SUGAR_LEVELS.map(s => `
    <button class="sugar-option ${s === modalState.sugar ? 'selected' : ''}" onclick="selectSugar('${s}', this)">
      ${s}
    </button>`).join('');

  const iceRows = ICE_LEVELS.map(i => `
    <button class="ice-option ${i === modalState.ice ? 'selected' : ''}" onclick="selectIce('${i}', this)">
      ${i}
    </button>`).join('');

  const sizeRows = SIZES.map(s => `
    <button class="size-option ${s.label === modalState.size ? 'selected' : ''}" onclick="selectSize('${s.label}', this)">
      <span class="size-label">${s.label}</span>
      <span class="size-vol">${s.volume}</span>
      <span class="size-price">${s.priceAdd > 0 ? '+' + formatPrice(s.priceAdd) : 'Base price'}</span>
    </button>`).join('');

  content.innerHTML = `
    <div class="modal-product-header" style="position:relative; display:flex; align-items:center; justify-content:center;">
      ${imgContent}
    </div>
    <div class="modal-body">
      <div class="modal-product-name">${product.name}</div>
      <div class="modal-product-desc">${product.desc}</div>

      <!-- Size -->
      <div class="modal-section">
        <div class="modal-section-label">Choose Size</div>
        <div class="size-options" id="sizeOptions">${sizeRows}</div>
      </div>

      <!-- Toppings -->
      <div class="modal-section">
        <div class="modal-section-label">Add Toppings <small style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--color-text-muted)">(optional)</small></div>
        <div class="topping-options" id="toppingOptions">${toppingRows}</div>
      </div>

      <!-- Sugar -->
      <div class="modal-section">
        <div class="modal-section-label">Sugar Level</div>
        <div class="sugar-options" id="sugarOptions">${sugarRows}</div>
      </div>

      <!-- Ice -->
      <div class="modal-section">
        <div class="modal-section-label">Ice Level</div>
        <div class="ice-options" id="iceOptions">${iceRows}</div>
      </div>

      <!-- Qty -->
      <div class="qty-row">
        <span class="qty-label">Quantity</span>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <span class="qty-val" id="modalQty">1</span>
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div class="modal-total">
          <span class="modal-total-label">Total</span>
          <span class="modal-total-price" id="modalTotalPrice">${formatPrice(product.price)}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCartFromModal()">
          Add to Cart
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
    </div>`;
}

function calcModalTotal() {
  if (!currentProduct) return 0;
  const sizeData = SIZES.find(s => s.label === modalState.size);
  const toppingCost = modalState.toppings.reduce((sum, tid) => {
    const t = TOPPINGS.find(t => t.id === tid);
    return sum + (t ? t.price : 0);
  }, 0);
  return (currentProduct.price + (sizeData?.priceAdd || 0) + toppingCost) * modalState.qty;
}

function updateModalTotal() {
  const el = document.getElementById('modalTotalPrice');
  if (el) el.textContent = formatPrice(calcModalTotal());
}

function selectSize(size, el) {
  modalState.size = size;
  document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  updateModalTotal();
}

function toggleTopping(id, el) {
  const idx = modalState.toppings.indexOf(id);
  if (idx >= 0) {
    modalState.toppings.splice(idx, 1);
    el.classList.remove('selected');
  } else {
    modalState.toppings.push(id);
    el.classList.add('selected');
  }
  updateModalTotal();
}

function selectSugar(val, el) {
  modalState.sugar = val;
  document.querySelectorAll('.sugar-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function selectIce(val, el) {
  modalState.ice = val;
  document.querySelectorAll('.ice-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function changeQty(delta) {
  modalState.qty = Math.max(1, modalState.qty + delta);
  const el = document.getElementById('modalQty');
  if (el) el.textContent = modalState.qty;
  updateModalTotal();
}

function addToCartFromModal() {
  if (!currentProduct) return;

  const toppingNames = modalState.toppings.map(tid => {
    const t = TOPPINGS.find(t => t.id === tid);
    return t ? `${t.icon} ${t.name}` : '';
  }).filter(Boolean);

  addToCart({
    productId: currentProduct.id,
    name: currentProduct.name,
    emoji: currentProduct.emoji,
    size: modalState.size,
    toppings: toppingNames,
    sugar: modalState.sugar,
    ice: modalState.ice,
    qty: modalState.qty,
    price: calcModalTotal() / modalState.qty,
  });

  closeModal({ target: document.getElementById('modalOverlay') });
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal({ target: document.getElementById('modalOverlay') });
});