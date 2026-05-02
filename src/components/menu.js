// ===== MENU / PRODUCT GRID =====

let activeCategory = 'milk-tea';

function filterCategory(cat, el) {
  activeCategory = cat;

  // Update tabs
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');

  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const filtered = PRODUCTS.filter(p => p.category === activeCategory);

  grid.innerHTML = filtered.map(product => createCardHTML(product)).join('');

  // Re-init reveal for new cards
  setTimeout(initReveal, 50);
}

function createCardHTML(product) {
  const badgeMap = {
    best: '<span class="card-badge best">⭐ Best Seller</span>',
    new: '<span class="card-badge new">🌟 New</span>',
  };

  const badge = product.badge ? badgeMap[product.badge] || '' : '';

  const imgContent = product.image
    ? `<img class="card-img" src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.card-emoji').style.display='flex'" />
       <div class="card-emoji" style="display:none; position:absolute; inset:0; align-items:center; justify-content:center; font-size:3.5rem">${product.emoji}</div>`
    : `<div class="card-emoji" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:3.5rem">${product.emoji}</div>`;

  return `
    <div class="product-card" onclick="openModal(${product.id})">
      <div class="card-img-wrap">
        ${badge}
        ${imgContent}
      </div>
      <div class="card-body">
        <div class="card-category">${categoryLabel(product.category)}</div>
        <h3 class="card-name">${product.name}</h3>
        <p class="card-desc">${product.desc}</p>
        <div class="card-footer">
          <div class="card-price">
            ${formatPrice(product.price)} <span>from</span>
          </div>
          <div class="card-add-btn" onclick="event.stopPropagation(); openModal(${product.id})">+</div>
        </div>
      </div>
    </div>`;
}

function categoryLabel(cat) {
  const map = {
    'milk-tea': 'Milk Tea',
    'tea': 'Tea',
    'cheese': 'Cheese Foam',
  };
  return map[cat] || cat;
}