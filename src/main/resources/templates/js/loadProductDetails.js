async function loadProductDetails() {
    const productId = window.location.pathname.split('/').pop();
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();
    document.getElementById('productImage').src = product.imageUrl || '#';
    document.getElementById('productName').textContent = product.name || 'Название недоступно';
    document.getElementById('productAccount').querySelector('span').textContent = product.account?.login || 'Не указан';
    document.getElementById('productAccount').querySelector('span').value = product.account?.id || -1;
    document.getElementById('productCategory').querySelector('span').textContent = product.category?.name || 'Не указана';
    document.getElementById('productQuantity').querySelector('span').textContent = product.quantity || 'Не указано';
    document.getElementById('productDescription').textContent = product.description || 'Описание недоступно';
    document.getElementById('productPrice').textContent = `Цена: ${product.price} ₽`;
    document.getElementById('addToCartButton').addEventListener('click', () => {
        console.log('Товар добавлен в корзину:', productId);
        // Реализуйте логику добавления товара в корзину
    });

    const sellerLogin = product.account?.login || 'Не указан';
    const sellerLink = document.getElementById('sellerLogin');
    sellerLink.href = `/account/${sellerLogin}`;
}