const express = require('express');
const db = require('../config/db');

const router = express.Router();

// GET /inventory - used by Flower_shop/Inventory.html
router.get('/', async (req, res) => {
    try {
        const [inventory] = await db.execute(
            'SELECT id, item, stock, price FROM inventory ORDER BY id DESC'
        );
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /inventory - used by Flower_shop/Add-inventory.html
router.post('/', async (req, res) => {
    try {
        const { item, stock, price } = req.body;

        if (!item || stock === undefined || price === undefined) {
            return res.status(400).json({ message: 'Missing required fields (item, stock, price).' });
        }

        const numericStock = Number(stock);
        const numericPrice = Number(price);

        if (Number.isNaN(numericStock) || Number.isNaN(numericPrice)) {
            return res.status(400).json({ message: 'Invalid stock/price values.' });
        }

        await db.execute(
            'INSERT INTO inventory (item, stock, price) VALUES (?, ?, ?)',
            [item, numericStock, numericPrice]
        );

        res.status(201).json({ message: 'Inventory Added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

