async function loadOrders() {
  const response = await fetch('/api/orders/');
  const orders = await response.json();
  const orderList = document.getElementById('orderList');
  orderList.innerHTML = '';

  let totalSum = 0;

  orders.forEach(order => {
      const totalPrice = order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
      totalSum += totalPrice;

      const orderCard = document.createElement('div');
      orderCard.classList.add('order-card');
      orderCard.innerHTML = `
          <h3>Заказ #${order.id}</h3>
          <p>Дата заказа: ${order.creatingDate}</p>
          <p>Статус: ${order.status.name}</p>
          <p><strong>Общая сумма: ${totalPrice} ₽</strong></p>
          <div class="order-details">
              ${order.items.map(item => `
                  <div class="product-item">
                      <a href="/products/${item.product.id}">${item.product.name}</a>
                      <span>${item.quantity} x ${item.product.price} ₽</span>
                  </div>
              `).join('')}
          </div>
      `;
      orderList.appendChild(orderCard);

      orderCard.addEventListener('click', function() {
          const details = this.querySelector('.order-details');
          details.classList.toggle('active');
      });
  });

  const totalSumElement = document.createElement('h3');
  totalSumElement.innerHTML = `Общая сумма всех заказов: <strong>${totalSum} ₽</strong>`;
  orderList.prepend(totalSumElement);
}