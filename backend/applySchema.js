const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Ensure DB_* env vars exist before importing db.js (db.js creates the MySQL pool at import time)
dotenv.config({ path: path.resolve(__dirname, '.env') });

const db = require('./config/db');

const schemaPath = path.resolve(__dirname, 'database', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

// Naive but sufficient for this schema file: it uses statement-terminating semicolons.
const statements = schemaSql
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

async function apply() {
    console.log(`Applying schema from ${schemaPath}`);
    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        const preview = stmt.replace(/\s+/g, ' ').slice(0, 90);
        console.log(`Executing ${i + 1}/${statements.length}: ${preview}...`);
        // mysql2 supports promises for pool.query
        await db.query(stmt);
    }
    console.log('✅ Schema applied successfully');
}

apply().catch((err) => {
    console.error('❌ Schema apply failed:', err?.message || err);
    process.exit(1);
});

