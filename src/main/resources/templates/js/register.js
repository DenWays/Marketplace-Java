async function register() {
    const login = document.getElementById('login').value.toLowerCase();
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const middleName = document.getElementById('middleName').value;
    const email = document.getElementById('email').value;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const creatingDate = `${year}-${month}-${day}`;

    if (!login || !password) {
        alert("Заполните все поля.");
        return;
    }

    try {
        const responseAccount = await fetch(`/api/account/${login}`);
        const fetchedAccount = await responseAccount.json();
        if (fetchedAccount?.login == login) {
            alert("Логин уже занят. Попробуйте другой.");
            return;
        }
    }
    catch {
    }


    const response = await fetch('api/addaccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password,
            role: "ROLE_USER",
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            email: email,
            creatingDate: creatingDate
        })
    });

    if (response.ok) {
        window.location.href = 'login';
    } else {
        alert("Ошибка регистрации. Попробуйте ещё раз.");
    }
}