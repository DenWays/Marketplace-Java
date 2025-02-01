async function getLogin() {
    const response = await fetch('/api/account');
    const fetchedAccount = await response.json();
    const login = document.getElementById('login');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const middleName = document.getElementById('middleName');
    const role = document.getElementById('role');
    const email = document.getElementById('email');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const cartButton = document.getElementById('cartButton'); // Get cart button
    const accountLink = document.querySelector('.user-info a'); // Находим ссылку на профиль

    // Привязываем данные пользователя к полям
    login.textContent = fetchedAccount?.login || 'Не авторизован';
    firstName.textContent = fetchedAccount?.firstName || 'Не указано';
    lastName.textContent = fetchedAccount?.lastName || 'Не указано';
    middleName.textContent = fetchedAccount?.middleName || 'Не указано';
    email.textContent = fetchedAccount?.email || 'Не указано';
    role.textContent = 'Не указано';
    if (fetchedAccount?.role == "ROLE_USER") {
        role.textContent = 'Покупатель';
    }
    else if (fetchedAccount?.role == "ROLE_CONSUMER") {
        role.textContent = 'Продавец';
    }
    else {
        role.textContent = 'Админ';
    }

    window.userRole = fetchedAccount?.role || null;

    // Логика отображения кнопок
    if (fetchedAccount?.login) {
        accountLink.href = `/account/${fetchedAccount.login}`;
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'inline';
        cartButton.style.display = 'inline'; // Show cart button for logged-in users
    } else {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
        cartButton.style.display = 'none'; // Hide cart button for non-logged-in users
    }

    if (fetchedAccount?.role === "ROLE_USER") {
        cartButton.style.display = 'inline';
        ordersButton.style.display = 'inline';
    } else {
        cartButton.style.display = 'none';
        ordersButton.style.display = 'none';
    }
}