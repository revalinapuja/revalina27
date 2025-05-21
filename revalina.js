// Data produk contoh
const products = [
  {
    id: 1,
    name: "Heals YSL",
    price: 15973000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRhf-5Ccrz_Ffg4CjRs9Ke5d8iHLXHfm87w&s"
  },
  {
    id: 2,
    name: "Heals Loboutin",
    price: 10000000,
    image: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/4/16/00dbd22e-e058-4295-affc-2c9eae266d88.jpg.webp?ect=4g"
  },
  {
    id: 3,
    name: "Heals Channel",
    price: 19000000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfzhQKpDIsSGH7DhsQmgICMDu6PtHqkwF6w&s"
  },
  {
    id: 4,
    name: "Heals Miu Miu",
    price: 500000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  }
];

// Simpan keranjang di localStorage
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Tambah produk ke keranjang
function addToCart(productId) {
  let cart = getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  saveCart(cart);
  alert(`${product.name} berhasil ditambahkan ke keranjang!`);
  updateCartCount();
}

// Update jumlah item di menu (jika ada)
function updateCartCount() {
  const cartCountElem = document.getElementById("cart-count");
  if (!cartCountElem) return;
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElem.textContent = totalCount;
}

// Tampilkan produk di halaman shop
function displayProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString("id-ID")}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    container.appendChild(card);
  });
}

// Tampilkan isi keranjang di halaman cart.html
function displayCartItems() {
  const cartItemsElem = document.getElementById("cart-items");
  const cartTotalElem = document.getElementById("cart-total");
  if (!cartItemsElem || !cartTotalElem) return;

  const cart = getCart();
  cartItemsElem.innerHTML = "";

  if (cart.length === 0) {
    cartItemsElem.innerHTML = "<li>Keranjang kosong.</li>";
    cartTotalElem.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Hapus";
    removeBtn.onclick = () => {
      removeFromCart(item.id);
    };

    li.appendChild(removeBtn);
    cartItemsElem.appendChild(li);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElem.textContent = totalPrice.toLocaleString("id-ID");
}

// Hapus item dari keranjang
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  displayCartItems();
  updateCartCount();
}

// Login sederhana (hanya simulasi)
function handleLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Simulasi login: cek di localStorage user terdaftar
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert("Login berhasil!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Email atau password salah!");
    }
  });
}

// Register sederhana (simpan data user di localStorage)
function handleRegister() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(u => u.email === email);

    if (exists) {
      alert("Email sudah terdaftar!");
      return;
    }

    users.push({name, email, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  });
}

// Handle checkout form
function handleCheckout() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const fullname = form.fullname.value.trim();
    const address = form.address.value.trim();
    const phone = form.phone.value.trim();

    if (!fullname || !address || !phone) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    const cart = getCart();
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    alert(`Terima kasih ${fullname}, pesanan Anda sedang diproses!`);
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}

// Handle contact form (simulasi)
function handleContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    alert("Pesan Anda telah terkirim. Terima kasih!");
    form.reset();
  });
}

// Inisialisasi fungsi berdasarkan halaman
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartCount();
  displayCartItems();
  handleLogin();
  handleRegister();
  handleCheckout();
  handleContact();
});
