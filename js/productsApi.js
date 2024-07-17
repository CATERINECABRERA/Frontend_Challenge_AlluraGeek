export async function getProducts() {
    const response = await fetch("http://localhost:5500/productos");

    const products = response.json();

    return products;
}

export const productsApi = {
    getProducts
};