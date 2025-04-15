async function placeOrder() {
  try {
      const response = await fetch('/api/orders/addorder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include'
      });

      if (response.ok) {
          const order = await response.json();
          alert('Заказ успешно создан!');
          loadCart();
      } else {
          console.error('Ошибка при создании заказа:', response.statusText);
          alert('Произошла ошибка при создании заказа.');
      }
  } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      alert('Произошла ошибка при отправке запроса.');
  }
}