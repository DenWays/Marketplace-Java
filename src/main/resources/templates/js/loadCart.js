async function loadCart() {
  const response = await fetch('/api/cart/');
  const cart = await response.json();
  const cartList = document.getElementById('cartList');
  const totalAmount = document.getElementById('totalAmount');
  let total = 0;

  // Очищаем список перед добавлением новых данных
  cartList.innerHTML = '';

  // Добавляем каждый товар в корзине
  cart.items.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <img src="${item.product.imageUrl}" alt="${item.product.name}"/>
          <h3>${item.product.name}</h3>
          <p>Цена: ${item.product.price} ₽</p>
          <div class="quantity-controls">
              <button class="decrease-quantity" data-cart-detail-id="${item.id}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase-quantity" data-cart-detail-id="${item.id}">+</button>
          </div>
          <button class="remove-from-cart" data-product-id="${item.product.id}">Удалить</button>
      `;
      cartList.appendChild(cartItem);

      // Считаем общую сумму
      total += item.product.price * item.quantity;
  });

  // Обновляем общую сумму
  totalAmount.textContent = total;
}