const express = require('express');
const db = require('../config/db');

const router = express.Router();

// GET /orders - used by Flower_shop/Orders.html
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.execute(
            'SELECT id, product, quantity, total, status FROM orders ORDER BY id DESC'
        );
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /orders - used by Flower_shop/Add-order.html
router.post('/', async (req, res) => {
    try {
        const { product, quantity, total, status } = req.body;

        if (!product || quantity === undefined || total === undefined) {
            return res.status(400).json({ message: 'Missing required fields (product, quantity, total).' });
        }

        const numericQuantity = Number(quantity);
        const numericTotal = Number(total);

        if (Number.isNaN(numericQuantity) || Number.isNaN(numericTotal)) {
            return res.status(400).json({ message: 'Invalid quantity/total values.' });
        }

        await db.execute(
            'INSERT INTO orders (product, quantity, total, status) VALUES (?, ?, ?, ?)',
            [product, numericQuantity, numericTotal, status ?? 'pending']
        );

        res.status(201).json({ message: 'Order Added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

