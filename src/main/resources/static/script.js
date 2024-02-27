function addProduct() {
    const productName = document.getElementById('productName').value;
    const productValue = document.getElementById('productValue').value;
    fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName, value: productValue }) // Substitua 'name' e 'value' pelos nomes dos campos adequados no DTO
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to add product');
    })
    .then(data => {
        console.log('Product added:', data);
        getProductList(); // Atualiza a lista de produtos após adicionar um novo
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getProductList() {
    fetch('/products')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to fetch product list');
    })
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpa a lista atual antes de atualizar
        data.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.value}`; // Substitua 'name' e 'value' pelos nomes dos campos adequados no modelo
            productList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateProduct() {
    const productId = document.getElementById('updateProductId').value;
    const updatedProductName = document.getElementById('updatedProductName').value;
    const updatedProductValue = document.getElementById('updatedProductValue').value;
    fetch(`/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: updatedProductName, value: updatedProductValue }) // Substitua 'name' e 'value' pelos nomes dos campos adequados no DTO
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to update product');
    })
    .then(data => {
        console.log('Product updated:', data);
        getProductList(); // Atualiza a lista de produtos após atualizar
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteProduct() {
    const productId = document.getElementById('deleteProductId').value;
    fetch(`/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Failed to delete product');
    })
    .then(data => {
        console.log('Product deleted:', data);
        getProductList(); // Atualiza a lista de produtos após excluir
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getProductById() {
    const productId = document.getElementById('getProductId').value;
    fetch(`/products/${productId}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Product not found');
    })
    .then(data => {
        console.log('Product:', data);
        document.getElementById('productById').innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('productById').innerText = 'Product not found';
    });
}

// Carrega a lista de produtos quando a página é carregada
window.onload = getProductList;