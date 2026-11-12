const products = [
  {
    id: 1,
    sku: "Арт. 849201",
    title: "HP LaserJet M141w",
    subtitle: "МФУ лазерное, A4, Wi-Fi",
    category: "Принтеры",
    price: 18990,
    oldPrice: 22990,
    discount: "-17%",
    rating: 4.8,
    reviews: 124,
    hit: true,
    icon: "🖨️",
    specs: {
      "Технология": "Лазерная, ч/б",
      "Функции": "Принтер, сканер, копир",
      "Подключение": "Wi-Fi, USB",
      "Скорость печати": "20 стр/мин"
    }
  },
  {
    id: 2,
    sku: "Арт. 849305",
    title: "Монитор 27\" QHD Pro",
    subtitle: "IPS, 2560x1440, 100 Гц",
    category: "Мониторы",
    price: 24990,
    oldPrice: 28990,
    discount: "-14%",
    rating: 4.9,
    reviews: 89,
    hit: true,
    icon: "🖥️",
    specs: {
      "Диагональ": "27 дюймов (IPS)",
      "Разрешение": "2560×1440 (2K QHD)",
      "Частота": "100 Гц",
      "Разъемы": "HDMI, DisplayPort, USB-C"
    }
  },
  {
    id: 3,
    sku: "Арт. 901120",
    title: "Ноутбук ProBook 450",
    subtitle: "15.6\", Core i5, 16/512 ГБ",
    category: "Ноутбуки",
    price: 69990,
    oldPrice: 79990,
    discount: "-12%",
    rating: 4.7,
    reviews: 63,
    hit: false,
    icon: "💻",
    specs: {
      "Процессор": "Intel Core i5-1335U",
      "Память": "16 ГБ DDR4 / 512 ГБ SSD",
      "Экран": "15.6\" FHD IPS матовый",
      "Автономность": "До 9 часов"
    }
  },
  {
    id: 4,
    sku: "Арт. 849199",
    title: "HP LaserJet M111a",
    subtitle: "Принтер лазерный компактный",
    category: "Принтеры",
    price: 16490,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    reviews: 42,
    hit: false,
    icon: "🖨️",
    specs: {
      "Технология": "Лазерная, ч/б",
      "Формат": "A4",
      "Подключение": "USB 2.0",
      "Скорость печати": "20 стр/мин"
    }
  },
  {
    id: 5,
    sku: "Арт. 774102",
    title: "Canon Pixma G3420",
    subtitle: "Струйное МФУ с СНПЧ, Wi-Fi",
    category: "Принтеры",
    price: 21500,
    oldPrice: 24900,
    discount: "-13%",
    rating: 4.8,
    reviews: 156,
    hit: true,
    icon: "🖨️",
    specs: {
      "Технология": "Струйная цветная",
      "Ресурс": "До 6000 ч/б страниц",
      "Подключение": "Wi-Fi, AirPrint, USB",
      "Печать фото": "Без полей 10×15"
    }
  },
  {
    id: 6,
    sku: "Арт. 552319",
    title: "Монитор UltraWide 34\"",
    subtitle: "Изогнутый VA, 3440x1440",
    category: "Мониторы",
    price: 38990,
    oldPrice: 44990,
    discount: "-13%",
    rating: 4.9,
    reviews: 74,
    hit: false,
    icon: "🖥️",
    specs: {
      "Диагональ": "34 дюйма (21:9)",
      "Разрешение": "3440×1440 WQHD",
      "Изгиб экрана": "1500R",
      "Частота": "144 Гц"
    }
  },
  {
    id: 7,
    sku: "Арт. 330912",
    title: "Ультрабук AirBook 14",
    subtitle: "Алюминиевый корпус, 1.3 кг",
    category: "Ноутбуки",
    price: 54990,
    oldPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 31,
    hit: true,
    icon: "💻",
    specs: {
      "Процессор": "AMD Ryzen 5 7530U",
      "Память": "16 ГБ / 512 ГБ NVMe",
      "Вес": "1.32 кг",
      "Подсветка": "Клавиатура с подсветкой"
    }
  },
  {
    id: 8,
    sku: "Арт. 110485",
    title: "Картридж HP 150A (W1500A)",
    subtitle: "Оригинальный черный тонер",
    category: "Картриджи",
    price: 4590,
    oldPrice: 5200,
    discount: "-11%",
    rating: 4.9,
    reviews: 210,
    hit: false,
    icon: "🧴",
    specs: {
      "Цвет": "Черный",
      "Ресурс": "975 страниц",
      "Совместимость": "HP LaserJet M111 / M141",
      "Тип": "Оригинальный лазерный"
    }
  }
];

let cart = [
  { id: 1, qty: 1 },
  { id: 2, qty: 1 }
];
let favorites = [1];
let currentCategory = "Все";
let selectedProductId = 1;
let extraPromoDiscount = 0;

function formatPrice(num) {
  return num.toLocaleString("ru-RU") + " ₽";
}

function showToast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

function switchScreen(screenName) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + screenName).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenName);
  });

  if (screenName === "home") renderHome();
  if (screenName === "catalog") renderCatalog();
  if (screenName === "cart") renderCart();
  if (screenName === "fav") renderFavorites();
}

function createProductCardHTML(p) {
  const isFav = favorites.includes(p.id);
  return `
    <div class="product-card" onclick="openProductDetail(${p.id})">
      ${p.discount ? `<span class="badge-discount">${p.discount}</span>` : ""}
      <button class="fav-btn ${isFav ? "active" : ""}" onclick="event.stopPropagation(); toggleFavorite(${p.id})">
        ${isFav ? "♥" : "♡"}
      </button>
      <div class="card-img-wrap">${p.icon}</div>
      <div class="card-rating"><span>★</span> ${p.rating} (${p.reviews})</div>
      <div class="card-title">${p.title}</div>
      <div class="card-sub">${p.subtitle}</div>
      <div class="card-bottom">
        <div>
          <div class="card-price">${formatPrice(p.price)}</div>
          ${p.oldPrice ? `<span class="card-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <button class="btn-add-mini" onclick="event.stopPropagation(); addToCart(${p.id})">+</button>
      </div>
    </div>
  `;
}

function renderHome() {
  const hits = products.filter(p => p.hit);
  document.getElementById("home-hits-grid").innerHTML = hits.map(createProductCardHTML).join("");
}

function selectCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll("#category-chips .chip").forEach(c => c.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderCatalog();
}

function filterAndOpenCatalog(cat) {
  currentCategory = cat;
  switchScreen("catalog");
  document.querySelectorAll("#category-chips .chip").forEach(c => {
    c.classList.toggle("active", c.textContent === cat);
  });
  renderCatalog();
}

function handleSearch(val) {
  if (val.trim().length > 0) {
    document.getElementById("catalog-search-input").value = val;
    switchScreen("catalog");
  }
}

function renderCatalog() {
  const query = document.getElementById("catalog-search-input").value.toLowerCase().trim();
  const filtered = products.filter(p => {
    const matchCat = currentCategory === "Все" || p.category === currentCategory;
    const matchQuery = p.title.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  document.getElementById("catalog-count").textContent = `${filtered.length} товаров`;
  document.getElementById("catalog-grid").innerHTML = filtered.map(createProductCardHTML).join("");
}

function openProductDetail(id) {
  selectedProductId = id;
  const p = products.find(item => item.id === id);
  const isFav = favorites.includes(p.id);
  document.getElementById("detail-fav-btn").textContent = isFav ? "♥" : "♡";
  document.getElementById("detail-fav-btn").style.color = isFav ? "var(--accent)" : "inherit";

  const specsHTML = Object.entries(p.specs)
    .map(([k, v]) => `<div class="spec-row"><span class="spec-key">${k}</span><span class="spec-val">${v}</span></div>`)
    .join("");

  document.getElementById("detail-content").innerHTML = `
    <div class="detail-hero">
      ${p.discount ? `<span class="badge-discount">${p.discount}</span>` : ""}
      ${p.icon}
    </div>
    <div class="detail-sku">${p.sku}</div>
    <div class="detail-title">${p.title}</div>
    <div class="detail-meta">
      <span>★ <b>${p.rating}</b> (${p.reviews} отзывов)</span>
      <span class="in-stock">● В наличии</span>
    </div>
    <div class="detail-price-row">
      <span class="detail-price">${formatPrice(p.price)}</span>
      ${p.oldPrice ? `<span class="detail-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
    </div>
    <div class="delivery-box">
      <span style="font-size:20px;">📦</span>
      <div>
        <div style="font-weight:700;">Доставим завтра, 13 ноября</div>
        <div style="color:var(--text-muted); font-size:11px;">Бесплатно от 10 000 ₽</div>
      </div>
    </div>
    <div class="specs-title">Характеристики</div>
    ${specsHTML}
    <button class="btn-primary-full" onclick="addToCart(${p.id})">
      <span>В корзину</span>
      <span>${formatPrice(p.price)}</span>
    </button>
  `;

  switchScreen("detail");
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    showToast("Удалено из избранного");
  } else {
    favorites.push(id);
    showToast("Добавлено в избранное");
  }
  renderHome();
  renderCatalog();
  renderFavorites();
}

function toggleDetailFav() {
  toggleFavorite(selectedProductId);
  openProductDetail(selectedProductId);
}

function renderFavorites() {
  const favProducts = products.filter(p => favorites.includes(p.id));
  document.getElementById("fav-count").textContent = `${favProducts.length} товаров`;
  document.getElementById("fav-grid").innerHTML = favProducts.length
    ? favProducts.map(createProductCardHTML).join("")
    : `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px 0;">Список избранного пуст</div>`;
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  updateCartBadge();
  showToast("Товар добавлен в корзину");
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("nav-cart-badge");
  badge.textContent = totalCount;
  badge.style.display = totalCount > 0 ? "flex" : "none";
}

function applyPromo() {
  const code = document.getElementById("promo-input").value.trim().toUpperCase();
  if (code === "OFFICE10") {
    extraPromoDiscount = 3000;
    showToast("Промокод применен: −3 000 ₽");
    renderCart();
  } else {
    showToast("Попробуйте промокод OFFICE10");
  }
}

function renderCart() {
  const listEl = document.getElementById("cart-items-list");
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-header-count").textContent = `${totalCount} товара`;

  if (cart.length === 0) {
    listEl.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:30px 0;">Корзина пуста</div>`;
    document.getElementById("cart-summary").innerHTML = "";
    return;
  }

  let rawSum = 0;
  let totalDiscount = extraPromoDiscount;

  listEl.innerHTML = cart.map(c => {
    const p = products.find(prod => prod.id === c.id);
    const itemTotal = p.price * c.qty;
    const oldTotal = (p.oldPrice || p.price) * c.qty;
    rawSum += oldTotal;
    totalDiscount += (oldTotal - itemTotal);

    return `
      <div class="cart-item">
        <div class="cart-item-icon">${p.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${p.title}</div>
          <div class="cart-item-sub">${p.subtitle}</div>
          <div class="cart-item-price">${formatPrice(itemTotal)}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${p.id}, -1)">−</button>
          <span>${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join("");

  const finalSum = Math.max(0, rawSum - totalDiscount);

  document.getElementById("cart-summary").innerHTML = `
    <div class="summary-row">
      <span>Товары (${totalCount})</span>
      <span>${formatPrice(rawSum)}</span>
    </div>
    <div class="summary-row discount">
      <span>Скидка</span>
      <span>−${formatPrice(totalDiscount)}</span>
    </div>
    <div class="summary-row">
      <span>Доставка</span>
      <span style="color:var(--green); font-weight:600;">Бесплатно</span>
    </div>
    <div class="summary-total">
      <span>Итого</span>
      <span>${formatPrice(finalSum)}</span>
    </div>
  `;
}

function checkoutOrder() {
  if (cart.length === 0) {
    showToast("Сначала добавьте товары в корзину");
    return;
  }
  showToast("Заказ успешно оформлен!");
  cart = [];
  extraPromoDiscount = 0;
  updateCartBadge();
  renderCart();
}

renderHome();
updateCartBadge();
