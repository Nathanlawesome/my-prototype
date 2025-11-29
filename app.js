// Category info
const CATEGORY_INFO = {
  contact: {
    label: 'Contact',
    icon: '📞',
    info: 'Phone: (555) 123-4567\nEmail: info@viberacing.com',
  },
  social: {
    label: 'Social Media',
    icon: '📸',
    info: 'Instagram: @viberacing',
  },
  address: {
    label: 'Address',
    icon: '📍',
    info: '123 Motorsport Ave, Speed City, USA',
  },
};

function renderCategories() {
  const container = document.createElement('div');
  container.id = 'categories';
  container.style.position = 'fixed';
  container.style.left = '50%';
  container.style.bottom = '30px';
  container.style.transform = 'translateX(-50%)';
  container.style.display = 'flex';
  container.style.gap = '2rem';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.zIndex = '1000';

  Object.entries(CATEGORY_INFO).forEach(([key, cat]) => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.style.background = '#222';
    btn.style.color = '#39ff14';
    btn.style.border = '1px solid #39ff14';
    btn.style.borderRadius = '8px';
    btn.style.padding = '0.7rem 1.2rem';
    btn.style.fontSize = '1rem';
    btn.style.cursor = 'pointer';
    btn.innerHTML = `${cat.icon} ${cat.label}`;
    btn.onclick = () => {
      alert(cat.info);
    };
    container.appendChild(btn);
  });
  return container;
}
// Sample dataset
const PRODUCTS = [
  { id: 1, name: 'T-shirt', emoji: '👕', description: 'Soft cotton tee', price: 25 },
  { id: 2, name: 'Jacket', emoji: '🧥', description: 'Warm motorsport jacket', price: 60 },
  { id: 3, name: 'Gloves', emoji: '🧤', description: 'Grip racing gloves', price: 20 },
  { id: 4, name: 'Shoes', emoji: '👟', description: 'Track shoes', price: 45 },
  { id: 5, name: 'Cap', emoji: '🧢', description: 'Motorsport cap', price: 15 },
  { id: 6, name: 'Helmet', emoji: '🪖', description: 'Safety helmet', price: 120 },
  { id: 7, name: 'Socks', emoji: '🧦', description: 'Racing socks', price: 10 },
  { id: 8, name: 'Keychain', emoji: '🔑', description: 'Motorsport keychain', price: 8 },
  { id: 9, name: 'Sticker', emoji: '🏁', description: 'Track sticker', price: 5 },
  { id: 10, name: 'Water Bottle', emoji: '🚰', description: 'Hydration bottle', price: 12 }
];

const SIZES = ['S', 'M', 'L', 'XL'];


let state = {
  page: 'signup',
  cart: [],
  selectedProduct: null,
  menuOpen: false,
};


function renderMenuToggle() {
  const btn = document.createElement('button');
  btn.id = 'menu-toggle';
  btn.style.position = 'absolute';
  btn.style.top = '20px';
  btn.style.right = '40px';
  btn.style.zIndex = '1000';
  btn.textContent = '☰ Menu';
  btn.onclick = () => {
    state.menuOpen = !state.menuOpen;
    render();
  };
  return btn;
}

function renderDropdownMenu() {
  if (!state.menuOpen) return document.createElement('div');
  const menu = document.createElement('div');
  menu.id = 'dropdown-menu';
  menu.style.position = 'absolute';
  menu.style.top = '60px';
  menu.style.right = '40px';
  menu.style.background = '#222';
  menu.style.border = '1px solid #39ff14';
  menu.style.borderRadius = '8px';
  menu.style.boxShadow = '0 2px 8px #000';
  menu.style.padding = '1rem';
  menu.style.display = 'flex';
  menu.style.flexDirection = 'column';
  menu.style.gap = '1rem';
  menu.style.minWidth = '180px';
    menu.innerHTML = `
      <div class="menu-item" style="cursor:pointer;" onclick="window.menuNavigate('signup')"><span style="font-size:1.5rem;">📝</span> Sign-Up</div>
      <div class="menu-item" style="cursor:pointer;" onclick="window.menuNavigate('products')"><span style="font-size:1.5rem;">👕</span> Products</div>
      <div class="menu-item" style="cursor:pointer;" onclick="window.menuNavigate('cart')"><span style="font-size:1.5rem;">🛒</span> Cart <span class="cart-count" id="cart-count-menu"></span></div>
      <div class="menu-item" style="cursor:pointer;" onclick="window.menuNavigate('checkout')"><span style="font-size:1.5rem;">💳</span> Checkout</div>
      <div style="margin-top:1rem; border-top:1px solid #39ff14; padding-top:1rem;"><strong>About</strong></div>
      <div class="menu-item" style="cursor:pointer; color:#39ff14;" onclick="window.showCategoryInfo('contact')">📞 Contact</div>
      <div class="menu-item" style="cursor:pointer; color:#39ff14;" onclick="window.showCategoryInfo('social')">📸 Social Media</div>
      <div class="menu-item" style="cursor:pointer; color:#39ff14;" onclick="window.showCategoryInfo('address')">📍 Address</div>
    `;
  window.showCategoryInfo = function(key) {
    const cat = CATEGORY_INFO[key];
    if (cat) alert(cat.info);
  };
  return menu;
}

window.menuNavigate = function(page) {
  state.page = page;
  state.selectedProduct = null;
  state.menuOpen = false;
  render();
};


function updateCartCount() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count > 0 ? count : '';
  const elMenu = document.getElementById('cart-count-menu');
  if (elMenu) elMenu.textContent = count > 0 ? count : '';
}

function navigate(page) {
  state.page = page;
  state.selectedProduct = null;
  render();
}


function render() {
  // Remove old nav if present
  const oldNav = document.querySelector('.nav');
  if (oldNav) oldNav.remove();
  // Remove old menu toggle if present
  const oldToggle = document.getElementById('menu-toggle');
  if (oldToggle) oldToggle.remove();
  // Remove old dropdown menu if present
  const oldDropdown = document.getElementById('dropdown-menu');
  if (oldDropdown) oldDropdown.remove();

  let main = document.getElementById('main');
  if (!main) {
    main = document.createElement('div');
    main.id = 'main';
    document.getElementById('app').appendChild(main);
  }
  main.innerHTML = '';
  // Add menu toggle and dropdown
  document.body.appendChild(renderMenuToggle());
  document.body.appendChild(renderDropdownMenu());
  // Add categories at bottom center
  const oldCategories = document.getElementById('categories');
  if (oldCategories) oldCategories.remove();
  document.body.appendChild(renderCategories());

  // Center the app content
  main.style.display = 'flex';
  main.style.flexDirection = 'column';
  main.style.alignItems = 'center';
  main.style.justifyContent = 'center';
  main.style.minHeight = '100vh';

  main.appendChild(renderTitle());
  if (state.page === 'signup') main.appendChild(renderSignup());
  else if (state.page === 'products') main.appendChild(renderProducts());
  else if (state.page === 'productdetails') main.appendChild(renderProductDetails());
  else if (state.page === 'cart') main.appendChild(renderCart());
  else if (state.page === 'checkout') main.appendChild(renderCheckout());
  updateCartCount();
}

function renderTitle() {
  const titleBtn = document.createElement('button');
  titleBtn.id = 'title';
  titleBtn.textContent = 'VIBE RACING';
  titleBtn.style.background = 'none';
  titleBtn.style.color = '#39ff14';
  titleBtn.style.fontSize = '2rem';
  titleBtn.style.border = 'none';
  titleBtn.style.cursor = 'pointer';
  titleBtn.style.textAlign = 'center';
  titleBtn.style.margin = '1rem 0';
  titleBtn.style.letterSpacing = '2px';
  titleBtn.onclick = () => {
    state.page = 'signup';
    state.selectedProduct = null;
    render();
  };
  return titleBtn;
}

function renderSignup() {
  const form = document.createElement('form');
  form.innerHTML = `
    <h2>📝 Sign-Up</h2>
    <input type="text" placeholder="First Name" required />
    <input type="text" placeholder="Last Name" required />
    <input type="email" placeholder="Email Address" required />
    <input type="tel" placeholder="Phone Number" required />
    <input type="text" placeholder="License Number" required />
    <input type="text" placeholder="License Expiration" required />
    <input type="number" min="1" placeholder="How many in your party?" required />
    <input type="text" placeholder="Vehicle Make/Model/Year/Color" />
    <input type="text" placeholder="Instagram (optional)" />
    <button type="submit">Submit</button>
  `;
  form.onsubmit = e => {
    e.preventDefault();
    alert('Sign-up submitted!');
  };
  return form;
}

function renderProducts() {
  const div = document.createElement('div');
  div.innerHTML = `<h2>👕 Products</h2>`;
  // Search bar
  const searchDiv = document.createElement('div');
  searchDiv.style.margin = '1rem 0';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'What are you lookin for?';
  searchInput.style.padding = '0.5rem';
  searchInput.style.fontSize = '1rem';
  searchInput.style.width = '60%';
  searchInput.style.border = '1px solid #39ff14';
  searchInput.style.borderRadius = '6px';
  searchDiv.appendChild(searchInput);
  div.appendChild(searchDiv);

  // Container for product list
  const productsListDiv = document.createElement('div');
  div.appendChild(productsListDiv);

  function renderFilteredProducts(query) {
    productsListDiv.innerHTML = '';
    const filtered = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length === 0) {
      productsListDiv.innerHTML = '<div style="color:#999;">No products found.</div>';
      return;
    }
    filtered.forEach(product => {
      const prodDiv = document.createElement('div');
      prodDiv.style.borderBottom = '1px solid #333';
      prodDiv.style.padding = '1rem 0';
      prodDiv.innerHTML = `
        <span style="font-size:1.5rem;">${product.emoji}</span>
        <strong>${product.name}</strong> - $${product.price}
        <div>${product.description}</div>
        <select class="size-dropdown">
          ${SIZES.map(s => `<option value='${s}'>${s}</option>`).join('')}
        </select>
        <input type="number" min="1" value="1" style="width:50px;" />
        <button>Add to Cart</button>
        <button onclick="showProductDetails(${product.id})">Details</button>
      `;
      prodDiv.querySelector('button').onclick = () => {
        const size = prodDiv.querySelector('.size-dropdown').value;
        const qty = parseInt(prodDiv.querySelector('input[type=number]').value);
        addToCart(product, size, qty);
      };
      productsListDiv.appendChild(prodDiv);
    });
  }

  // Initial render
  renderFilteredProducts('');
  // Listen for search input
  searchInput.addEventListener('input', e => {
    renderFilteredProducts(e.target.value);
  });
  return div;
}

window.showProductDetails = function(id) {
  state.selectedProduct = PRODUCTS.find(p => p.id === id);
  state.page = 'productdetails';
  render();
};

function renderProductDetails() {
  const p = state.selectedProduct;
  if (!p) return document.createTextNode('No product selected.');
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>${p.emoji} ${p.name}</h2>
    <div>${p.description}</div>
    <div>Price: $${p.price}</div>
    <select class="size-dropdown">
      ${SIZES.map(s => `<option value='${s}'>${s}</option>`).join('')}
    </select>
    <input type="number" min="1" value="1" style="width:50px;" />
    <button>Add to Cart</button>
    <button onclick="navigate('products')">Back</button>
  `;
  div.querySelector('button').onclick = () => {
    const size = div.querySelector('.size-dropdown').value;
    const qty = parseInt(div.querySelector('input[type=number]').value);
    addToCart(p, size, qty);
  };
  return div;
}

function addToCart(product, size, qty) {
  const existing = state.cart.find(item => item.product.id === product.id && item.size === size);
  if (existing) existing.qty += qty;
  else state.cart.push({ product, size, qty });
  updateCartCount();
  alert('Added to cart!');
}

function renderCart() {
  const div = document.createElement('div');
  div.innerHTML = `<h2>🛒 Shopping Cart</h2>`;
  if (state.cart.length === 0) {
    div.innerHTML += '<p>Your cart is empty.</p>';
    return div;
  }
  const table = document.createElement('table');
  table.style.width = '100%';
  table.innerHTML = `<tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th><th>Remove</th></tr>`;
  state.cart.forEach((item, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.product.emoji} ${item.product.name}</td>
      <td>${item.size}</td>
      <td><input type="number" min="1" value="${item.qty}" style="width:50px;" /></td>
      <td>$${item.product.price}</td>
      <td>$${item.product.price * item.qty}</td>
      <td><button>Remove</button></td>
    `;
    row.querySelector('input').onchange = e => {
      item.qty = parseInt(e.target.value);
      updateCartCount();
      render();
    };
    row.querySelector('button').onclick = () => {
      state.cart.splice(idx, 1);
      updateCartCount();
      render();
    };
    table.appendChild(row);
  });
  div.appendChild(table);
  const checkoutBtn = document.createElement('button');
  checkoutBtn.textContent = 'Proceed to Checkout';
  checkoutBtn.onclick = () => navigate('checkout');
  div.appendChild(checkoutBtn);
  return div;
}

function renderCheckout() {
  const div = document.createElement('div');
  div.innerHTML = `<h2>💳 Checkout</h2>`;
  if (state.cart.length === 0) {
    div.innerHTML += '<p>No items to checkout.</p>';
    return div;
  }
  let total = 0;
  const table = document.createElement('table');
  table.style.width = '100%';
  table.innerHTML = `<tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th><th>Total</th></tr>`;
  state.cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.product.emoji} ${item.product.name}</td>
      <td>${item.size}</td>
      <td>${item.qty}</td>
      <td>$${item.product.price}</td>
      <td>$${item.product.price * item.qty}</td>
    `;
    table.appendChild(row);
    total += item.product.price * item.qty;
  });
  div.appendChild(table);
  div.innerHTML += `<h3>Total: $${total}</h3>`;
  const processBtn = document.createElement('button');
  processBtn.textContent = 'Process Order';
  processBtn.onclick = () => {
    alert('Order processed!');
    state.cart = [];
    updateCartCount();
    navigate('products');
  };
  div.appendChild(processBtn);
  return div;
}


// Initial render
render();
