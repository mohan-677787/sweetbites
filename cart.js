document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const totalEl = document.getElementById('total');
  const msg = document.getElementById('coupon-msg');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let discountAmount = 0;

  function renderCart() {
    cartContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      subtotalEl.textContent = '0';
      discountEl.textContent = '0';
      totalEl.textContent = '0';
      updateCartCount();
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const div = document.createElement('div');
      div.classList.add('cart-item');
      div.innerHTML = `
        <div class="cart-item-content">
          <img src="${item.image || 'default.jpg'}" alt="${item.name}" class="cart-img" />
          <div class="cart-info">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <div class="quantity-controls">
              <button onclick="updateQuantity(${index}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity(${index}, 1)">+</button>
              <button onclick="removeItem(${index})" title="Remove Item">🗑️</button>
            </div>
            <p>Total: ₹${itemTotal}</p>
          </div>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    subtotalEl.textContent = subtotal;
    discountEl.textContent = discountAmount;
    totalEl.textContent = subtotal - discountAmount;
    updateCartCount();
  }

  // Update quantity
  window.updateQuantity = (index, change) => {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  // Remove item
  window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  // Apply coupon
  window.applyCoupon = () => {
    const code = document.getElementById('coupon-code').value.trim().toUpperCase();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (code === 'SWEET10') {
      discountAmount = Math.floor(subtotal * 0.1);
      msg.innerText = '10% discount applied!';
      msg.style.color = 'green';
    } else if (code === 'FLAT50') {
      discountAmount = 50;
      msg.innerText = '₹50 discount applied!';
      msg.style.color = 'green';
    } else {
      discountAmount = 0;
      msg.innerText = 'Invalid coupon code!';
      msg.style.color = 'red';
    }
    renderCart();
  };

  // Show payment section
  window.showPayment = () => {
    document.getElementById('payment-options').style.display = 'block';
  };

  // Process payment
  window.processPayment = () => {
    const paymentOptions = document.getElementsByName("payment");
    let selected = null;

    for (const option of paymentOptions) {
      if (option.checked) {
        selected = option.nextSibling.textContent.trim();
        break;
      }
    }

    if (!selected) {
      alert("Please select a payment method.");
      return;
    }
    if (selected === 'Cash on Delivery') {
      alert(`✅ Order placed successfully! Pay ₹${totalEl.textContent} on delivery.`);
      localStorage.removeItem('cart');
      window.location.href = "menu.html";
      return;
    }
   
  };

  // Clear cart function (if needed)
  window.clearCart = () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      localStorage.removeItem('cart');
      window.location.href = "menu.html";
    }
  };

  // Cart badge update
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = count;
    }
  }

  renderCart();
});

if (option.checked) {
  selected = option.nextSibling.textContent.trim();
  localStorage.setItem('lastPaymentMethod', selected);
}
















<script src="cart.js"></script>
