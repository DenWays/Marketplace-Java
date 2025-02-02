function loadStatuses() {
    fetch('/api/admin/statuses')
        .then(response => response.json())
        .then(statuses => {
            const statusSelect = document.getElementById('statusSelect');
            statusSelect.innerHTML = statuses.map(status => `<option value="${status.id}">${status.name}</option>`).join('');
        })
        .catch(error => console.error('Ошибка загрузки статусов:', error));
}