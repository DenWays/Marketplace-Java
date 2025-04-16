async function loadConsumerProducts() {
    let response;
    try {
        const accountId = document.getElementById('profileLogin').value;
        response = await fetch(`/api/products/account/${accountId}`);
    }
    catch {
        response = await fetch('/api/products/consumer');
    }

    const products = await response.json();
    const productList = document.getElementById('productList');

    const currentUserLogin = document.getElementById('login').textContent;

    if (products.length > 0) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.imageUrl || 'placeholder.jpg'}" alt="${product.name}" />
                <h4>${product.name}</h4>
                <p><strong>Категория: </strong> ${product.category?.name || 'Не указано'}</p>
                <p><strong>Количество: </strong> <span class="product-quantity">${product.quantity || '0'}</span></p>
                <p><strong>Цена: </strong><span class="price">${product.price || '0'} ₽</span></p>
            `;

            const isOwner = product.account?.login === currentUserLogin;
            const isSeller = window.userRole === "ROLE_CONSUMER";

            const currentPath = window.location.pathname;

            if (isSeller && isOwner && currentPath.includes('/products/consumer')) {
//                const controlPanel = document.createElement('div');
//                controlPanel.style.marginTop = "10px";
//                controlPanel.style.display = "flex";
//                controlPanel.style.justifyContent = "center";
//                controlPanel.style.gap = "10px";
//
//                const decreaseBtn = document.createElement('button');
//                decreaseBtn.textContent = "−";
//                decreaseBtn.classList.add('decrease-btn');
//
//                const increaseBtn = document.createElement('button');
//                increaseBtn.textContent = "+";
//                increaseBtn.classList.add('increase-btn');
//
//                const customChangeBtn = document.createElement('button');
//                customChangeBtn.textContent = "Изменить количество";
//                customChangeBtn.classList.add('custom-change-btn');
//
                const editButton = document.createElement('a');
                editButton.textContent = 'Редактировать';
                editButton.href = `/products/edit/${product.id}`;
                editButton.classList.add('edit-btn');
                editButton.style.textAlign = 'center';
                editButton.style.marginTop = '10px';
                productCard.appendChild(editButton);
//
//                controlPanel.appendChild(decreaseBtn);
//                controlPanel.appendChild(increaseBtn);
//                controlPanel.appendChild(customChangeBtn);
//                productCard.appendChild(controlPanel);
//
//                const quantitySpan = productCard.querySelector('.product-quantity');
//
//                increaseBtn.addEventListener('click', () => {
//                    let quantity = parseInt(quantitySpan.textContent, 10);
//                    changeQuantityProduct(product.id, 1);
//                    quantitySpan.textContent = ++quantity;
//                });
//
//                decreaseBtn.addEventListener('click', async () => {
//                    let quantity = parseInt(quantitySpan.textContent, 10);
//                    try {
//                        await changeQuantityProduct(product.id, -1);
//                        quantitySpan.textContent = --quantity;
//                    }
//                    catch (e) {
//                        alert(e.message);
//                    }
//                });
//
//                customChangeBtn.addEventListener('click', () => {
//                    const modal = document.createElement('div');
//                    modal.classList.add('modal');
//
//                    const modalContent = document.createElement('div');
//                    modalContent.classList.add('modal-content');
//
//                    const inputLabel = document.createElement('label');
//                    inputLabel.textContent = "Введите новое количество:";
//                    const inputField = document.createElement('input');
//                    inputField.type = 'number';
//                    inputField.min = 0;
//                    inputField.value = quantitySpan.textContent;
//
//                    const saveButton = document.createElement('button');
//                    saveButton.textContent = 'Сохранить';
//                    saveButton.classList.add('save-btn');
//
//                    const cancelButton = document.createElement('button');
//                    cancelButton.textContent = 'Отмена';
//                    cancelButton.classList.add('cancel-btn');
//
//                    modalContent.appendChild(inputLabel);
//                    modalContent.appendChild(inputField);
//                    modalContent.appendChild(saveButton);
//                    modalContent.appendChild(cancelButton);
//                    modal.appendChild(modalContent);
//                    document.body.appendChild(modal);
//
//                    saveButton.addEventListener('click', async () => {
//                        const newQuantity = parseInt(inputField.value, 10);
//                        if (!isNaN(newQuantity)) {
//                            try {
//                                await changeQuantityProduct(product.id, newQuantity);
//                                quantitySpan.textContent = newQuantity;
//                                document.body.removeChild(modal); // Закрыть окно
//                            } catch (e) {
//                                alert(e.message);
//                            }
//                        } else {
//                            alert("Неверное значение количества.");
//                        }
//                    });
//
//                    cancelButton.addEventListener('click', () => {
//                        document.body.removeChild(modal);
//                    });
//
//                    modal.addEventListener('click', (e) => {
//                        if (e.target === modal) {
//                            document.body.removeChild(modal);
//                        }
//                    });
//                });
            }

            productList.appendChild(productCard);
        });

        document.getElementById('sellerProducts').style.display = 'block';
    }
}

//async function changeQuantityProduct(productId, quantity) {
//    const response = await fetch(`/api/products/changeQuantity/${productId}/${quantity}`, {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//    });
//
//    if (!response.ok) {
//        const errorText = await response.text();
//        throw new Error(errorText);
//    }
//}