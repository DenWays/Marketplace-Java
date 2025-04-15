async function loadProducts(searchTerm = '', sortField = 'name', sortDirection = 'asc', categories = []) {
    try {
        let url = '/api/products';
        const params = [];

        if (searchTerm) {
            params.push(`search=${encodeURIComponent(searchTerm)}`);
        }

        if (categories.length) params.push(`categories=${encodeURIComponent(categories.join(','))}`);

        params.push(`sortBy=${sortField}`);
        params.push(`direction=${sortDirection}`);

        if (params.length) {
            url += `?${params.join('&')}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки товаров');

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('productList').innerHTML = '<p>Произошла ошибка при загрузке товаров</p>';
    }
}

function renderProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>Товары не найдены</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <a href="products/${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}"/>
                <h3>${product.name}</h3>
            </a>
            <p class="aag">${product.category?.name || 'Без категории'}</p>
            <p><strong>Цена: </strong><b style="color: #4CAF50">${product.price} ₽</b></p>
            <button class="add-to-cart" data-product-id="${product.id}">Добавить в корзину</button>
        `;
        productList.appendChild(card);
    });

    if (window.userRole !== "ROLE_USER") {
        document.querySelectorAll('.add-to-cart').forEach(btn => btn.style.display = 'none');
    }

    setupCartButtons();
}

function setupCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async function () {
            const productId = this.getAttribute('data-product-id');
            try {
                const response = await fetch(`/api/cart/addtocart/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Книга успешно добавлена в корзину!');
                } else {
                    alert(result.message || 'Произошла ошибка при добавлении книги в корзину.');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке запроса.');
            }
        });
    });
}

async function loadCategories() {
    try {
        const response = await fetch('api/products/categories');
        if (!response.ok) throw new Error('Ошибка загрузки категорий');
        const categories = await response.json();
        const categoryList = document.getElementById('categoryList');

        categories.forEach(category => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${category.name}" class="category-checkbox" checked> ${category.name}`;
            categoryList.appendChild(label);
        });

        const selectAllCheckbox = document.getElementById('selectAllCategories');
        selectAllCheckbox.checked = true;
        selectAllCheckbox.addEventListener('change', () => {
            const checkboxes = document.querySelectorAll('.category-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
            updateCategories();
        });

        const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = document.querySelectorAll('.category-checkbox:checked').length === categoryCheckboxes.length;
                selectAllCheckbox.checked = allChecked;
                updateCategories();
            });
        });

    } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
    }
}

function updateCategories() {
    const selectedCategories = [];
    const checkboxes = document.querySelectorAll('.category-checkbox:checked');

    checkboxes.forEach(checkbox => selectedCategories.push(checkbox.value));

    if (selectedCategories.length === 0) {
        categoryDropdownBtn.textContent = 'Выберите категорию';
    } else {
        categoryDropdownBtn.textContent = selectedCategories.join(', ');
    }

    currentCategories = selectedCategories;
    updateProducts();
}

let currentSearch = '';
let currentSortField = 'name';
let currentSortDirection = 'asc';
let currentCategories = [];

function updateProducts() {
    loadProducts(currentSearch, currentSortField, currentSortDirection, currentCategories);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const sortField = document.getElementById('sortField');
    const sortDirection = document.getElementById('sortDirection');
    const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');

    loadCategories();

    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.trim();
        updateProducts();
    });

    sortField.addEventListener('change', () => {
        currentSortField = sortField.value;
        updateProducts();
    });

    sortDirection.addEventListener('change', () => {
        currentSortDirection = sortDirection.value;
        updateProducts();
    });

    updateProducts();
});
