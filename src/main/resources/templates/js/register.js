async function register() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const middleName = document.getElementById('middleName').value;
    const email = document.getElementById('email').value;
    const creatingDate = new Date().toISOString().split('T')[0];

    if (!login || !password) {
        alert("Please fill out both fields.");
        return;
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