async function loadAdminOrders() {
  const response = await fetch('/api/admin/orders');
  const orders = await response.json();
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  let totalSum = 0;

  const usersMap = new Map();

  orders.forEach(order => {
    const userId = order.account.id;
    if (!usersMap.has(userId)) {
      usersMap.set(userId, {
        login: order.account.login,
        totalUserSum: 0,
        statusMap: new Map()
      });
    }

    const statusId = order.status.id;
    if (!usersMap.get(userId).statusMap.has(statusId)) {
      usersMap.get(userId).statusMap.set(statusId, {
        statusName: order.status.name,
        orders: []
      });
    }

    const totalPrice = order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    usersMap.get(userId).totalUserSum += totalPrice;
    usersMap.get(userId).statusMap.get(statusId).orders.push(order);
  });

  usersMap.forEach(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      <div class="user-header">
        <span class="user-name">${user.login}</span>
        <button class="profile-button">Перейти к профилю</button>
      </div>
      <p class="user-total-sum" style="display: none;">Общая сумма заказов: <strong>${user.totalUserSum} ₽</strong></p>
    `;

    const statusList = document.createElement('ul');
    statusList.classList.add('status-list');
    statusList.style.display = 'none';

    const sortedStatuses = Array.from(user.statusMap).sort((a, b) => a[0] - b[0]);

    sortedStatuses.forEach(([statusId, status]) => {
      const statusItem = document.createElement('li');
      statusItem.innerHTML = `
        <span class="status-name">${status.statusName}</span>
        <ul class="order-list" style="display: none;"> <!-- Скрываем заказы по умолчанию -->
          ${status.orders.map(order => {
            const totalPrice = order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
            totalSum += totalPrice;

            return `
              <li>
                <span class="order-name">Заказ ${order.id}</span>
                <p>Дата заказа: ${order.creatingDate}</p>
                <p><strong>Общая сумма: ${totalPrice} ₽</strong></p>
                <button class="status-button" onclick="openStatusModal(${order.id})">Изменить статус</button>
                <div class="order-details" style="display: none;"> <!-- Скрываем детали заказа по умолчанию -->
                  ${order.items.map(item => `
                    <div class="product-item">
                      <a href="/products/${item.product.id}">${item.product.name}</a>
                      <span>${item.quantity} x ${item.product.price} ₽</span>
                    </div>
                  `).join('')}
                </div>
              </li>
            `;
          }).join('')}
        </ul>
      `;
      statusList.appendChild(statusItem);
    });

    userItem.appendChild(statusList);
    userList.appendChild(userItem);

    userItem.querySelector('.user-header').addEventListener('click', function (event) {
      if (!event.target.classList.contains('profile-button')) {
        const userTotalSum = this.nextElementSibling;
        const statusList = this.parentElement.querySelector('.status-list');

        userTotalSum.style.display = userTotalSum.style.display === 'none' ? 'block' : 'none';
        statusList.style.display = statusList.style.display === 'none' ? 'block' : 'none';
      }
    });

    userItem.querySelector('.profile-button').addEventListener('click', function (event) {
      event.stopPropagation();
      window.location.href = `/account/${user.login}`;
    });

    statusList.querySelectorAll('.status-list li').forEach(statusItem => {
      statusItem.addEventListener('click', function () {
        if (!event.target.classList.contains('order-list li')) {
          const orderList = this.querySelector('.order-list');
          orderList.style.display = orderList.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

    statusList.querySelectorAll('.order-list li').forEach(orderItem => {
      orderItem.addEventListener('click', function (event) {
        if (!event.target.classList.contains('status-button')) {
          event.stopPropagation();
          const details = this.querySelector('.order-details');
          details.style.display = details.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
  });

  const totalSumElement = document.createElement('h3');
  totalSumElement.innerHTML = `Общая сумма всех заказов: <strong>${totalSum} ₽</strong>`;
  userList.prepend(totalSumElement);
}