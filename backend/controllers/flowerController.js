const db = require('../config/db');

exports.getAllFlowers = async (req, res) => {
    try {
        const [flowers] = await db.execute(
            'SELECT id, name, description, price, image_url, stock FROM products ORDER BY name'
        );
        res.status(200).json(flowers);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
