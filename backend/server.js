const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const customersRoutes = require('./routes/customersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); 

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ========================================================
// 1. SERVE FRONTEND (Sibling Directory: ../Flower_shop)
// ========================================================
const frontendPath = path.join(__dirname, '..', 'Flower_shop');

// Serve all static assets (CSS, JS, images, other HTML pages)
app.use(express.static(frontendPath));

// ========================================================
// 2. API ENDPOINTS
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
// 3. HOMEPAGE ROUTE
// ========================================================
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'Dashboard.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`===============================================`);
});