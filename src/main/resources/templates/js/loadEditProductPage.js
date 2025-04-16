document.addEventListener("DOMContentLoaded", () => {
    getLogin();
    const form = document.getElementById("editProductForm");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");

    priceInput.addEventListener("input", () => {
        if (parseFloat(priceInput.value) < 0) {
            priceInput.value = 0;
        }
    });

    quantityInput.addEventListener("input", () => {
        if (parseInt(quantityInput.value) < 0) {
            quantityInput.value = 0;
        }
    });

    const productId = getProductIdFromUrl();
    form.dataset.productId = productId;
    const categorySelect = document.getElementById("productCategory");
    const previewImage = document.getElementById("previewImage");

    loadCategories().then(() => {
        return fetch(`/api/products/${productId}`);
    })
    .then(response => {
        if (!response.ok) throw new Error("Не удалось загрузить товар");
        return response.json();
    })
    .then(product => {
        document.getElementById("name").value = product.name || "";
        document.getElementById("description").value = product.description || "";
        document.getElementById("price").value = product.price || 0;
        document.getElementById("quantity").value = product.quantity || 0;
        document.getElementById("imageUrl").value = product.imageUrl || "";
        if (product.imageUrl) {
            previewImage.src = product.imageUrl;
            previewImage.style.display = "block";
        }
        if (product.category && product.category.id) {
            categorySelect.value = product.category.id.toString();
        }
    })
    .catch(error => {
        console.error("Ошибка при загрузке товара:", error);
        alert("Ошибка при загрузке товара");
    });
});

function getProductIdFromUrl() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1];
}

function loadCategories() {
    const categorySelect = document.getElementById("productCategory");
    return fetch('/api/products/categories', {
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
        while (categorySelect.options.length > 1) {
            categorySelect.remove(1);
        }
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editProductForm");
    const productId = form.dataset.productId;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const categorySelect = document.getElementById("productCategory");
        const selectedCategory = categorySelect.options[categorySelect.selectedIndex];
        const updatedProduct = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            category: {
                id: selectedCategory.value,
                name: selectedCategory.textContent
            },
            price: parseFloat(document.getElementById("price").value),
            quantity: parseInt(document.getElementById("quantity").value),
            imageUrl: document.getElementById("imageUrl").value,
        };

        fetch(`/api/products/edit/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => {
            if (!response.ok) throw new Error("Ошибка при сохранении товара");
            return response.json();
        })
        .then(updatedProduct => {
            alert("Товар успешно обновлен!");
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Ошибка при сохранении товара");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");

    priceInput.addEventListener("input", () => {
        if (priceInput.value.startsWith("-")) {
            priceInput.value = priceInput.value.slice(1);
        }

        if (priceInput.value.startsWith("0") && priceInput.value.length > 1) {
            priceInput.value = priceInput.value.slice(1);
        }

        if (/--/.test(priceInput.value)) {
            priceInput.value = priceInput.value.replace(/--/, '-');
        }
    });

    quantityInput.addEventListener("input", () => {
        if (quantityInput.value.startsWith("-")) {
            quantityInput.value = quantityInput.value.slice(1);
        }

        if (quantityInput.value.startsWith("0") && quantityInput.value.length > 1) {
            quantityInput.value = quantityInput.value.slice(1);
        }

        if (/--/.test(quantityInput.value)) {
            quantityInput.value = quantityInput.value.replace(/--/, '-');
        }
    });
});