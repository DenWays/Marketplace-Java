document.addEventListener('DOMContentLoaded', () => {
  getLogin();
  loadCart();

// Обработчики для кнопок увеличения, уменьшения количества и удаления
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('increase-quantity')) {
      const cartDetailId = event.target.getAttribute('data-cart-detail-id');
      changeQuantity(cartDetailId, 1); // Увеличить количество на 1
  } else if (event.target.classList.contains('decrease-quantity')) {
      const cartDetailId = event.target.getAttribute('data-cart-detail-id');
      changeQuantity(cartDetailId, -1); // Уменьшить количество на 1
  } else if (event.target.classList.contains('remove-from-cart')) {
      const productId = event.target.getAttribute('data-product-id');
      removeFromCart(productId); // Удалить товар из корзины
  }
});

// Обработчик для кнопки "Заказать"
document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
});