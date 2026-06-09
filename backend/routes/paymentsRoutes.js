const express = require('express');
const db = require('../config/db');

const router = express.Router();

// GET /payments - used by Flower_shop/Payments.html
router.get('/', async (req, res) => {
    try {
        const [payments] = await db.execute(
            'SELECT id, orderId, amount, method, status FROM payments ORDER BY id DESC'
        );
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /payments - used by Flower_shop/Add-payment.html
router.post('/', async (req, res) => {
    try {
        const { orderId, amount, method, status } = req.body;

        if (orderId === undefined || amount === undefined) {
            return res.status(400).json({ message: 'Missing required fields (orderId, amount).' });
        }

        const numericOrderId = Number(orderId);
        const numericAmount = Number(amount);

        if (Number.isNaN(numericOrderId) || Number.isNaN(numericAmount)) {
            return res.status(400).json({ message: 'Invalid orderId/amount values.' });
        }

        await db.execute(
            'INSERT INTO payments (orderId, amount, method, status) VALUES (?, ?, ?, ?)',
            [numericOrderId, numericAmount, method ?? null, status ?? 'pending']
        );

        res.status(201).json({ message: 'Payment Added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

