async function changeQuantity(cartDetailId, quantity) {
  const response = await fetch(`/api/cart/changeQuantity/${cartDetailId}/${quantity}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
  });
  if (response.ok) {
      loadCart();
  }
}