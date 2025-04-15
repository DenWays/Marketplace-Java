document.addEventListener('DOMContentLoaded', () => {
  getLogin();
  loadCart();

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('increase-quantity')) {
      const cartDetailId = event.target.getAttribute('data-cart-detail-id');
      changeQuantity(cartDetailId, 1);
  } else if (event.target.classList.contains('decrease-quantity')) {
      const cartDetailId = event.target.getAttribute('data-cart-detail-id');
      changeQuantity(cartDetailId, -1);
  } else if (event.target.classList.contains('remove-from-cart')) {
      const productId = event.target.getAttribute('data-product-id');
      removeFromCart(productId);
  }
});

document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
});