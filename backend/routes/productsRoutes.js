const express = require('express');
const db = require('../config/db');

const router = express.Router();

// GET /products - used by Flower_shop/Products.html
router.get('/', async (req, res) => {
    try {
        const [products] = await db.execute(
            'SELECT id, name, price FROM products ORDER BY name'
        );
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /products - used by Flower_shop/Add-product.html
router.post('/', async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined || price === null) {
            return res.status(400).json({ message: 'Missing required fields (name, price).' });
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice)) {
            return res.status(400).json({ message: 'Invalid price value.' });
        }

        await db.execute(
            'INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)',
            [name, null, numericPrice, null, 0]
        );

        res.status(201).json({ message: 'Product Added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

