async function loadProfile() {
    const login = window.location.pathname.split('/').pop();
    const response = await fetch(`/api/account/${login}`);
    const account = await response.json();
    document.getElementById('profileLogin').textContent = account?.login || 'Не указано';
    document.getElementById('profileLogin').value = account?.id;
    document.getElementById('profileRole').textContent = account?.role === 'ROLE_USER' ? 'Покупатель' :
      account?.role === 'ROLE_CONSUMER' ? 'Продавец' : 'Админ';
    document.getElementById('profileFirstName').textContent = account?.firstName || 'Не указано';
    document.getElementById('profileLastName').textContent = account?.lastName || 'Не указано';
    document.getElementById('profileMiddleName').textContent = account?.middleName || 'Не указано';
    document.getElementById('profileEmail').textContent = account?.email || 'Не указано';
    document.getElementById('creatingDate').textContent = account?.creatingDate || 'Не указано';

    if (account?.role == 'ROLE_CONSUMER') {
          loadConsumerProducts();
    }

    const responseAccount = await fetch('/api/account');
    const fetchedAccount = await responseAccount.json();

    if (fetchedAccount?.login == account?.login) {
        editProfileButton.style.display = "inline";
    }
}