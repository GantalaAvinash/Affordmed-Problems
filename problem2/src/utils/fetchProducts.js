const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/test/companies';

async function fetchProducts(company, category, minPrice, maxPrice, top) {
    try {
        const response = await axios.get(`${BASE_URL}/${company}/categories/${category}/products`, {
            params: { top, minPrice, maxPrice }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

module.exports = fetchProducts;
