const jwt = require('jsonwebtoken');

// 1. BASE VERIFICATION (Verifies if the user is logged in at all)
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        // Decode the payload info (id, email, role) and attach it to the request object
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};

// 2. ADMIN GUARD (Allows both regular admins AND the main super admin to pass)
const requireAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin' || req.user.role === 'super_admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied: Administrative Clearance Required.' });
        }
    });
};

// 3. SUPER ADMIN GUARD (Only allows the single Main Admin to pass)
const requireSuperAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'super_admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied: Only the Main Admin can perform this action.' });
        }
    });
};

// Export all three guards so they can be mixed and matched across your backend routing system
module.exports = {
    verifyToken,
    requireAdmin,
    requireSuperAdmin
};
