import { productsApi } from './productsApi.js';

const productsContainer = document.getElementById('products');
const addProductButton = document.querySelector('.allure_nav_form__enviar');

const nombreInput = document.querySelector('.allure_nav_form__nombre');
const precioInput = document.querySelector('.allure_nav_form__precio');
const imagenInput = document.querySelector('.allure_nav_form__imagen');

let productos = [];

export function createProductCard(product) {
    const cardElement = document.createElement("div");
    cardElement.className = 'product-item zoom';

    const { name, url, price } = product;

    cardElement.innerHTML = `<img class="product-item__image" src="${url}" alt="logo canal alura">
                            <div class="product-item__information">
                                <span class="product-item__name">${name}</span>
                                <div class="product-item__price-info">
                                    <span class="product-item__price">${price}</span>
                                    <img class="product-item__delete" src="http://localhost:5500/images/trash2.jpeg" >
                                </div>
                            </div>`;
    return cardElement;
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export function formatPrice(price) {
    const normalizedPrice = price.replace(',', '.');
      
    return formatter.format(Number(normalizedPrice));
}

export async function getProducts() {
    try {
        productos = await productsApi.getProducts();

        console.log(productos);

        productos.forEach(product => {
           product.price = formatPrice(product.price);
           const productCard = createProductCard(product);
           productsContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log('ha sucedido un error', error);
    }
}

function agregarProducto() {
    const nombre = nombreInput.value;
    const precio = precioInput.value;
    const imagenUrl = imagenInput.value;

    const nuevoProducto = {
        name: nombre,
        price: formatPrice(precio),
        url: imagenUrl
    };

    const productCard = createProductCard(nuevoProducto);
    productsContainer.appendChild(productCard);
    limpiarInputs();
}

function limpiarInputs() {
    nombreInput.value = '';
    precioInput.value = '';
    imagenInput.value = '';
}


addProductButton.addEventListener('click', agregarProducto);

getProducts();