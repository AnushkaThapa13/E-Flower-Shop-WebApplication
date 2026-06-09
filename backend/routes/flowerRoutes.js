const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllFlowers } = require('../controllers/flowerController');

// Protect storefront catalog with JWT verification
router.get('/', authMiddleware.verifyToken, getAllFlowers);

module.exports = router;
