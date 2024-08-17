const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fetchProducts = require('../utils/fetchProducts');

const router = express.Router();

router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, minPrice = 0, maxPrice = 10000, sortBy = 'price', order = 'asc', page = 1 } = req.query;

    if (!categoryname || !n) {
        return res.status(400).json({ error: 'Category name and number of products are required' });
    }

    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    let products = [];

    for (const company of companies) {
        const companyProducts = await fetchProducts(company, categoryname, minPrice, maxPrice, n);
        products = products.concat(companyProducts);
    }

    let processedProducts = products.map(product => ({
        id: uuidv4(),
        ...product
    }));

    processedProducts.sort((a, b) => {
        const sortOrder = order === 'asc' ? 1 : -1;
        if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
        if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
        return 0;
    });

    const startIndex = (page - 1) * n;
    const endIndex = page * n;
    const paginatedProducts = processedProducts.slice(startIndex, endIndex);

    res.json(paginatedProducts);
});

router.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { productid } = req.params;

    res.json({
        id: productid,
        productName: 'Sample Product',
        price: 100,
        rating: 4.5,
        discount: 10,
        availability: 'yes'
    });
});

module.exports = router;
