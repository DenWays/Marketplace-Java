fetch('/api/csrf-token', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const csrfToken = data.token;
    document.getElementById('csrf-token').value = csrfToken;
});