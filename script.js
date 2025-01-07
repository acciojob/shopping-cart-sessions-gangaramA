// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Function to render the product list
function renderProducts() {
  products.forEach(function (product) {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to render the cart list from sessionStorage
function renderCart() {
  // Retrieve the cart from sessionStorage
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
  cartList.innerHTML = ""; // Clear the cart list in case of re-render

  cart.forEach(function (item) {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Function to add item to the cart
function addToCart(productId) {
  const product = products.find(function (product) {
    return product.id === productId;
  });

  if (!product) return;

  // Retrieve the current cart from sessionStorage
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add product to the cart
  cart.push(product);

  // Save the updated cart in sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart list
  renderCart();
}

// Function to remove item from the cart
function removeFromCart(productId) {
  // Retrieve the current cart from sessionStorage
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Remove the item with the given productId
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });

  // Save the updated cart in sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart list
  renderCart();
}

// Function to clear the cart
function clearCart() {
  // Clear the cart in sessionStorage
  sessionStorage.removeItem("cart");

  // Re-render the cart list (will be empty now)
  renderCart();
}

// Event listeners for buttons
productList.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

cartList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
