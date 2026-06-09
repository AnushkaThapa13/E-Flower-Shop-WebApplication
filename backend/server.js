const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables early (before routes/db are imported).
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 1. IMPORT ROUTES (Added your missing admin route module!)
const authRoutes = require('./routes/authRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const adminRoutes = require('./routes/adminRoutes'); // <-- FIXED: Added this import line
const customersRoutes = require('./routes/customersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Admin CRUD for inventory

const app = express();

// Enable Cross-Origin Resource Sharing so your frontend can talk to port 5000
app.use(cors({ origin: '*' }));
app.use(express.json()); // Allows parsing of raw incoming JSON data packets

// ========================================================
// 2. BIND ENDPOINTS (Mounted your /api/admin tracking base)
// ========================================================
app.use('/api/auth', authRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/admin', adminRoutes); // <-- FIXED: Connected your admin routes here!

// ========================================================
// 3. ADMIN CRUD ENDPOINTS (Used by your HTML admin pages)
// ========================================================
app.use('/customers', customersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/payments', paymentsRoutes);
app.use('/inventory', inventoryRoutes);

// Simple health check route to test in your web browser
app.get('/', (req, res) => {
    res.send('Flower Shop Backend Server is Live and Active! 🌸');
});

// Start listening for connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Server is flying ahead smoothly on port ${PORT}`);
    console.log(`===============================================`);
});