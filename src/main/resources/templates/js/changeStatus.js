function changeStatus(orderId, statusId) {
    fetch(`/api/admin/changestatus/${orderId}/${statusId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Статус успешно изменен');
            loadAdminOrders();
        } else {
            alert('Ошибка при изменении статуса');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}