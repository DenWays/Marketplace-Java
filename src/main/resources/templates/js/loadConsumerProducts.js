async function loadConsumerProducts() {
    const accountId = document.getElementById('profileLogin').value;
    const response = await fetch(`/api/products/account/${accountId}`);
    const products = await response.json();
    const productList = document.getElementById('productList');
    if (products.length > 0) {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.imageUrl || 'placeholder.jpg'}" alt="${product.name}" />
          <h4>${product.name}</h4>
          <p><strong>Категория: </strong> ${product.category?.name || 'Не указано'}</p>
          <p><strong>Количество: </strong> ${product.quantity || '0'}</p>
          <p><strong>Цена: </strong><span class="price"> ${product.price || '0'} ₽</span></p>
        `;
        productList.appendChild(productCard);
      });
      document.getElementById('sellerProducts').style.display = 'block';
    }
}