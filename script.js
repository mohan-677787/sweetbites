function increaseQty(button) {
  const qtySpan = button.parentElement.querySelector('.qty');
  let qty = parseInt(qtySpan.textContent);
  qtySpan.textContent = qty + 1;
}

function decreaseQty(button) {
  const qtySpan = button.parentElement.querySelector('.qty');
  let qty = parseInt(qtySpan.textContent);
  if (qty > 1) qtySpan.textContent = qty - 1;
}

function addToCartWithQty(button, itemName) {
  const card = button.parentElement;
  const qty = parseInt(card.querySelector('.qty').textContent);

  // Save to localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === itemName);
  if (index >= 0) {
    cart[index].quantity += qty;
  } else {
    cart.push({ name: itemName, quantity: qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Redirect to cart.html
  window.location.href = 'cart.html';
}



document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.innerText = totalItems;
  }
});


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}



document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const item = {
      name: card.querySelector('h3').innerText,
      price: parseInt(card.querySelector('p').innerText.replace(/[^0-9]/g, '')),
      image: card.querySelector('img').getAttribute('src'),
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart.`);
    updateCartCount();
  });
});


