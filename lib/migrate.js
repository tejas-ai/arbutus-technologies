const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), 'data', 'database.sqlite')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({ url, authToken });

async function migrate() {
    console.log("Starting migration from JSON to SQLite (using libsql)...");

    // 1. Migrate Products
    try {
        const prodPath = path.join(process.cwd(), 'products.json');
        if (fs.existsSync(prodPath)) {
            const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
            const prodArgs = products.map(p => ({
                sql: 'INSERT OR IGNORE INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)',
                args: [p.id, p.name, p.price, p.category, p.description || '']
            }));
            await db.batch(prodArgs, "write");
            console.log(`Migrated ${products.length} products.`);
        }
    } catch (e) { console.error("Product migration failed:", e); }

    // 2. Migrate Messages
    try {
        const msgPath = path.join(process.cwd(), 'messages.json');
        if (fs.existsSync(msgPath)) {
            const data = JSON.parse(fs.readFileSync(msgPath, 'utf8'));
            const inquiries = data.inquiries || [];
            const msgArgs = inquiries.map(m => ({
                sql: 'INSERT OR IGNORE INTO messages (name, email, subject, message, timestamp, status) VALUES (?, ?, ?, ?, ?, ?)',
                args: [m.name, m.email, m.subject, m.message, m.timestamp, m.status || 'new']
            }));
            await db.batch(msgArgs, "write");
            console.log(`Migrated ${inquiries.length} messages.`);
        }
    } catch (e) { console.error("Message migration failed:", e); }

    // 3. Migrate Site Content
    try {
        const sitePath = path.join(process.cwd(), 'site-data.json');
        if (fs.existsSync(sitePath)) {
            const siteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
            await db.execute({
                sql: 'INSERT OR REPLACE INTO site_content (key, content) VALUES (?, ?)',
                args: ['main', JSON.stringify(siteData)]
            });
            console.log("Migrated site content.");
        }
    } catch (e) { console.error("Site content migration failed:", e); }

    console.log("Migration complete.");
}

migrate();
node 
