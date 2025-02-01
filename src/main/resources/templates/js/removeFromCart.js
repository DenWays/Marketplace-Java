async function removeFromCart(productId) {
  const response = await fetch(`/api/cart/deleteItem/${productId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  if (response.ok) {
      loadCart(); // Перезагрузить корзину после удаления товара
  }
}