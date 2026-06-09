const express = require('express');
const router = express.Router();

// 1. Import your authentication controller handlers
const { signup, login } = require('../controllers/authController');

// 2. Import the destructuring pattern for your updated role-checking middleware guards
const { requireSuperAdmin } = require('../middleware/authMiddleware');

// ==========================================
// PUBLIC ENDPOINTS (Anyone can access these)
// ==========================================
router.post('/signup', signup);
router.post('/login', login);

// ==========================================
// SUPER ADMIN PROTECTED ENDPOINTS
// ==========================================
// Only a user holding a verified 'super_admin' JWT session token can access this route
router.post('/add-admin', requireSuperAdmin, signup);

// CRITICAL: Make sure this exact line is at the absolute bottom!
module.exports = router;