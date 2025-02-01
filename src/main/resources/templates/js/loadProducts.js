async function loadProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    const productList = document.getElementById('productList');
    // Очищаем список перед добавлением новых данных
    productList.innerHTML = '';
    // Добавляем каждую книгу в виде карточки
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <a href="products/${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}"/> <!-- Фото товара -->
            </a>
            <a href="products/${product.id}">
                <h3>${product.name}</h3> <!-- Название товара -->
            </a>
            <p class="aag">${product.category.name}</p>
            <p>Цена: ${product.price} ₽</p>
            <button class="add-to-cart" data-product-id="${product.id}">Добавить в корзину</button>
        `;
        productList.appendChild(productCard);
    });

    if (window.userRole !== "ROLE_USER") {
        document.querySelectorAll('.add-to-cart').forEach(btn => btn.style.display = 'none');
    }

    // Обработчик кнопки "Добавить в корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.getAttribute('data-product-id');
            try {
                const response = await fetch(`/api/cart/addtocart/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Если требуется авторизация, добавьте токен в заголовки
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include' // Если используете куки для аутентификации
                });

                if (response.ok) {
                    console.log('Книга добавлена в корзину:', productId);
                    alert('Книга успешно добавлена в корзину!');
                } else {
                    console.error('Ошибка при добавлении книги в корзину:', response.statusText);
                    alert('Произошла ошибка при добавлении книги в корзину.');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
                alert('Произошла ошибка при отправке запроса.');
            }
        });
    });
}