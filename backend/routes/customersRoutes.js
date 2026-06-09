const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

// GET /customers - used by Flower_shop/Customers.html
router.get('/', async (req, res) => {
    try {
        const [customers] = await db.execute(
            'SELECT id, name, email, phone FROM customers ORDER BY id DESC'
        );
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /customers - used by Flower_shop/Add-customer.html
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields (name, email, password).' });
        }

        const [existing] = await db.execute('SELECT id FROM customers WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ message: 'Email already exists.' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.execute(
            'INSERT INTO customers (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, 'user', phone ?? null]
        );

        res.status(201).json({ message: 'Customer Added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;

