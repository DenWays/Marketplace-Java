fetch('/api/csrf-token', {
method: 'GET',
headers: {
  'Accept': 'application/json'
}
})
.then(response => response.json())
.then(data => {
// Добавляем CSRF-токен в форму
const csrfToken = data.token;
document.getElementById('csrf-token').value = csrfToken;
});