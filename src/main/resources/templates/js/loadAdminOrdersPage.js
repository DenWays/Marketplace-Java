document.addEventListener('DOMContentLoaded', function() {
    loadAdminOrders();
    getLogin();
});

document.addEventListener('DOMContentLoaded', function() {
  const userList = document.getElementById('userList');

  userList.addEventListener('click', function(event) {
      if (event.target.classList.contains('user-name')) {
          const orderList = event.target.parentElement.querySelector('.order-list');
          orderList.classList.toggle('active');
      } else if (event.target.classList.contains('order-name')) {
          const productList = event.target.parentElement.querySelector('.product-list');
          productList.classList.toggle('active');
      }
  });
});

let currentOrderId = null;

function openStatusModal(orderId) {
    currentOrderId = orderId;
    loadStatuses();
    const modal = document.getElementById('statusModal');
    modal.style.display = 'block';
}

document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('statusModal');
    modal.style.display = 'none';
});

document.getElementById('confirmStatusChange').addEventListener('click', function() {
    const statusSelect = document.getElementById('statusSelect');
    const selectedStatusId = statusSelect.value;

    if (currentOrderId && selectedStatusId) {
        changeStatus(currentOrderId, selectedStatusId);
    }

    const modal = document.getElementById('statusModal');
    modal.style.display = 'none';
});