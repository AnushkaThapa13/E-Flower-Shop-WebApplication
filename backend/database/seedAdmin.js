const dotenv = require('dotenv');
const path = require('path');

// Load env vars before importing db.js (db.js creates the MySQL pool at import time)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function seedAdmin() {
    try {
        console.log('🔄 Connecting to database...');
        
        // Test connection
        await db.execute('SELECT 1');
        console.log('✅ Database connection successful');

        // Check if admin already exists
        const [existing] = await db.execute('SELECT * FROM customers WHERE email = ?', ['mainadmin@florian.com']);
        
        if (existing.length > 0) {
            console.log('⚠️  Master Admin already exists!');
            process.exit(0);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin@123', salt);

        // Insert Master Admin
        await db.execute(
            'INSERT INTO customers (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Master Admin', 'mainadmin@florian.com', hashedPassword, 'super_admin']
        );

        console.log('✅ Master Admin account seeded successfully!');
        console.log('📧 Email: mainadmin@florian.com');
        console.log('🔑 Password: Admin@123');
        console.log('👤 Role: super_admin');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        console.error('\n💡 Make sure:');
        console.error('   1. MySQL server is running');
        console.error('   2. Database "flower_shop" exists');
        console.error('   3. Run schema.sql first: mysql -u root -p flower_shop < database/schema.sql');
        process.exit(1);
    }
}

seedAdmin();
