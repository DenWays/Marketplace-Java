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
    const cartButton = document.getElementById('cartButton');
    const accountLink = document.querySelector('.user-info a');

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

    if (fetchedAccount?.login) {
        accountLink.href = `/account/${fetchedAccount.login}`;
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'inline';
        cartButton.style.display = 'inline';
    } else {
        loginButton.style.display = 'inline';
        registerButton.style.display = 'inline';
        logoutButton.style.display = 'none';
        cartButton.style.display = 'none';
        ordersButton.style.display = 'none';
        adminOrdersButton.style.display = 'none';
    }

    if (fetchedAccount?.role === "ROLE_USER") {
        cartButton.style.display = 'inline';
        ordersButton.style.display = 'inline';
        adminOrdersButton.style.display = 'none';
    }
    else if (fetchedAccount?.role === "ROLE_ADMIN") {
        cartButton.style.display = 'none';
        ordersButton.style.display = 'none';
        adminOrdersButton.style.display = 'inline';
    }
    else {
        cartButton.style.display = 'none';
        ordersButton.style.display = 'none';
        adminOrdersButton.style.display = 'none';
        addProductButton.style.display = 'inline';
    }
}