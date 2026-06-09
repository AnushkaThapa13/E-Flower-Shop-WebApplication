const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAdmin } = require('../middleware/authMiddleware');

// Dashboard statistics endpoint protected by your role-checking middleware
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        // Query your live MySQL tables to count rows dynamically
        const [products] = await db.execute('SELECT COUNT(*) as count FROM products');
        const [customers] = await db.execute('SELECT COUNT(*) as count FROM customers WHERE role = "user"');
        const [orders] = await db.execute('SELECT COUNT(*) as count FROM orders');
        const [payments] = await db.execute('SELECT SUM(amount) as total FROM payments WHERE status = "Completed"');

        res.json({
            totalFlowers: products[0].count,
            totalCustomers: customers[0].count,
            totalOrders: orders[0].count,
            revenue: payments[0].total || 0.00
        });
    } catch (err) {
        res.status(500).json({ message: 'Error aggregating dashboard analytics.', error: err.message });
    }
});

module.exports = router;