document.addEventListener('DOMContentLoaded', function() {
    // Предпросмотр изображения
    const imageInput = document.getElementById('productImage');
    const previewImage = document.getElementById('previewImage');

    imageInput.addEventListener('input', function() {
        if (this.value) {
            previewImage.src = this.value;
            previewImage.style.display = 'block';
        } else {
            previewImage.style.display = 'none';
        }
    });

    // Модальное окно для добавления категории
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const modal = document.getElementById('categoryModal');
    const cancelBtn = document.getElementById('cancelAddCategory');
    const confirmBtn = document.getElementById('confirmAddCategory');
    const newCategoryInput = document.getElementById('newCategoryName');
    const categorySelect = document.getElementById('productCategory');

    // Загрузка категорий при загрузке страницы
    function loadCategories() {
        fetch('/api/products/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки категорий');
            }
            return response.json();
        })
        .then(categories => {
            // Очищаем список, кроме первого элемента (заглушка)
            while (categorySelect.options.length > 1) {
                categorySelect.remove(1);
            }

            // Добавляем загруженные категории
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id || category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки категорий:', error);
        });
    }

    // Инициализация загрузки категорий
    loadCategories();

    addCategoryBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        newCategoryInput.value = '';
    });

    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    confirmBtn.addEventListener('click', function() {
        const categoryName = newCategoryInput.value.trim();
        if (!categoryName) {
            alert('Введите название категории');
            return;
        }

        // Отправка новой категории на сервер
        fetch('/api/products/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name: categoryName })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            // Обновляем список категорий после успешного добавления
            loadCategories();

            // Выбираем новую категорию
            categorySelect.value = data.id || data.name;

            // Закрываем модальное окно
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert(`Ошибка при добавлении категории: ${error.message || 'Неизвестная ошибка'}`);
        });
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    const form = document.getElementById('addProductForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const productData = {
            name: document.getElementById('productName').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            price: parseFloat(document.getElementById('productPrice').value),
            imageUrl: imageInput.value.trim(),
            category: {
                id: categorySelect.value,
                name: categorySelect.options[categorySelect.selectedIndex].text
            },
            quantity: parseInt(document.getElementById('productQuantity').value),
            idAccount: 123
        };

        // Валидация данных
        if (!productData.name || !productData.description ||
            isNaN(productData.price) || isNaN(productData.quantity) ||
            !productData.imageUrl || !productData.category) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }

        fetch('/api/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            alert('Товар успешно добавлен!');
            form.reset();
            previewImage.style.display = 'none';

            // Можно добавить редирект или другую логику после успешного добавления
            // window.location.href = '/admin/products';
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert(`Ошибка при добавлении товара: ${error.message || 'Неизвестная ошибка'}`);
        });
    });
});