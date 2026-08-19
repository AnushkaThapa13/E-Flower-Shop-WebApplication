const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables early
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 1. IMPORT ROUTES
const authRoutes = require('./routes/authRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const customersRoutes = require('./routes/customersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); 

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// ========================================================
// 2. SERVE STATIC FRONTEND FILES
// ========================================================
// If your HTML/CSS/JS files are inside a 'public' folder:
app.use(express.static(path.join(__dirname, 'public')));

// (If your HTML files are directly in your project root, use this instead:)
// app.use(express.static(__dirname));

// ========================================================
// 3. BIND API ENDPOINTS
// ========================================================
app.use('/api/auth', authRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/inventory', inventoryRoutes);

// ========================================================
// 4. SERVE HOMEPAGE (HTML)
// ========================================================
app.get('/', (req, res) => {
    // Points to public/index.html (adjust path if index.html is in root or another folder)
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start listening for connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Server is flying ahead smoothly on port ${PORT}`);
    console.log(`===============================================`);
});