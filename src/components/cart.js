// ===== CART STATE & LOGIC =====

let cart = [];

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.contains('open');

  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function addToCart(item) {
  // Check if identical item exists
  const existingIdx = cart.findIndex(ci =>
    ci.productId === item.productId &&
    ci.size === item.size &&
    JSON.stringify(ci.toppings) === JSON.stringify(item.toppings) &&
    ci.sugar === item.sugar &&
    ci.ice === item.ice
  );

  if (existingIdx >= 0) {
    cart[existingIdx].qty += item.qty;
  } else {
    cart.push({ ...item, cartId: Date.now() });
  }

  updateCartUI();
  bumpCartIcon();
  showToast(`🧋 ${item.name} added to cart!`);
}

function removeFromCart(cartId) {
  cart = cart.filter(ci => ci.cartId !== cartId);
  updateCartUI();
}

function updateCartItemQty(cartId, delta) {
  const idx = cart.findIndex(ci => ci.cartId === cartId);
  if (idx < 0) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, ci) => sum + ci.price * ci.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, ci) => sum + ci.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Update count badge
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);

  // Update cart items
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🧋</div>
        <p>Your cart is empty</p>
        <span>Add something delicious!</span>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  totalEl.textContent = formatPrice(total);

  itemsEl.innerHTML = cart.map(ci => {
    const toppingStr = ci.toppings.length
      ? ci.toppings.join(', ')
      : 'No toppings';
    return `
      <div class="cart-item" data-id="${ci.cartId}">
        <div class="cart-item-img">${ci.emoji || '🧋'}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${ci.name}</div>
          <div class="cart-item-details">
            Size: ${ci.size} &bull; Sugar: ${ci.sugar} &bull; Ice: ${ci.ice}<br/>
            Toppings: ${toppingStr}
          </div>
          <div class="cart-item-footer">
            <span class="cart-item-price">${formatPrice(ci.price * ci.qty)}</span>
            <div class="cart-item-controls">
              <button class="ci-btn" onclick="updateCartItemQty(${ci.cartId}, -1)">−</button>
              <span class="ci-qty">${ci.qty}</span>
              <button class="ci-btn" onclick="updateCartItemQty(${ci.cartId}, 1)">+</button>
              <button class="cart-item-remove" onclick="removeFromCart(${ci.cartId})">Remove</button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function checkout() {
  if (cart.length === 0) return;

  toggleCart();
  setTimeout(() => {
    const overlay = document.createElement('div');
    overlay.className = 'checkout-success';
    overlay.innerHTML = `
      <div class="success-card">
        <div class="success-icon">🎉</div>
        <h2>Order Placed!</h2>
        <p>Your delicious order is being prepared with love. It'll be ready soon! ☕</p>
        <button class="btn btn-primary" onclick="this.closest('.checkout-success').remove()">
          Back to Menu
        </button>
      </div>`;
    document.body.appendChild(overlay);
    cart = [];
    updateCartUI();
  }, 300);
}