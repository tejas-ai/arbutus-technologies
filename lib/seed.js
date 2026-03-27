const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const url = process.env.TURSO_DATABASE_URL || `file:${path.join(__dirname, '..', 'data', 'database.sqlite')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({ url, authToken });

async function seed() {
    console.log("Seeding database using libsql...");

    // Create tables if not exist
    try {
        await db.batch([
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price TEXT DEFAULT 'Ask Price',
                category TEXT DEFAULT 'Other Products',
                description TEXT,
                status TEXT DEFAULT 'active',
                images TEXT DEFAULT '[]'
            );`,
            `CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, email TEXT, subject TEXT,
                message TEXT, timestamp TEXT, status TEXT DEFAULT 'new'
            );`,
            `CREATE TABLE IF NOT EXISTS site_content (
                key TEXT PRIMARY KEY,
                content TEXT NOT NULL
            );`
        ], "write");
    } catch (e) { console.error('Table creation error:', e.message); }

    // Migrate products
    try {
        const prodFile = path.join(__dirname, '..', 'data', '..', 'products.json');
        const altProdFile = path.join(__dirname, '..', 'products.json');

        let products = [];
        if (fs.existsSync(prodFile)) products = JSON.parse(fs.readFileSync(prodFile, 'utf8'));
        else if (fs.existsSync(altProdFile)) products = JSON.parse(fs.readFileSync(altProdFile, 'utf8'));

        if (products.length > 0) {
            const prodArgs = products.map(p => ({
                sql: 'INSERT OR IGNORE INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)',
                args: [p.id || null, p.name, p.price || 'Ask Price', p.category || 'Other Products', p.description || '']
            }));
            await db.batch(prodArgs, "write");
            console.log(`Migrated ${products.length} products`);
        } else {
            const sample = [
                [null, 'Electronic Integrated Circuits', 'Ask Price', 'Integrated Circuits', 'High quality ICs for industrial use'],
                [null, 'Surge Suppressors', 'Ask Price', 'Other Products', 'Surge protection components'],
                [null, 'Micro-Assemblies Cards', 'Ask Price', 'Other Products', 'PCB micro-assembly cards'],
                [null, 'Plugs & Connectors', 'Ask Price', 'Other Products', 'Industrial grade connectors'],
                [null, 'Sockets', 'Ask Price', 'Other Products', 'IC and component sockets'],
            ];
            const sampleArgs = sample.map(r => ({
                sql: 'INSERT INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)',
                args: r
            }));
            await db.batch(sampleArgs, "write");
            console.log('Seeded 5 sample products');
        }
    } catch (e) { console.error('Products migration error:', e.message); }

    // Migrate messages
    try {
        const msgFile = path.join(__dirname, '..', 'messages.json');
        if (fs.existsSync(msgFile)) {
            const messages = JSON.parse(fs.readFileSync(msgFile, 'utf8'));
            const msgArgs = messages.map(m => ({
                sql: 'INSERT OR IGNORE INTO messages (id, name, email, subject, message, timestamp, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                args: [m.id, m.name, m.email, m.subject, m.message, m.timestamp, m.status || 'new']
            }));
            await db.batch(msgArgs, "write");
            console.log(`Migrated ${messages.length} messages`);
        }
    } catch (e) { console.error('Messages migration error:', e.message); }

    // Migrate site-content
    try {
        const siteFile = path.join(__dirname, '..', 'data', 'site-data.json');
        const altSiteFile = path.join(__dirname, '..', 'site-data.json');
        let siteData = null;
        if (fs.existsSync(siteFile)) siteData = fs.readFileSync(siteFile, 'utf8');
        else if (fs.existsSync(altSiteFile)) siteData = fs.readFileSync(altSiteFile, 'utf8');

        if (siteData) {
            await db.execute({
                sql: 'INSERT OR REPLACE INTO site_content (key, content) VALUES (?, ?)',
                args: ['main', siteData]
            });
            console.log('Migrated site content');
        }
    } catch (e) { console.error('Site content migration error:', e.message); }

    const pCount = await db.execute('SELECT COUNT(*) as c FROM products');
    const mCount = await db.execute('SELECT COUNT(*) as c FROM messages');
    console.log('Final DB state:', { products: pCount.rows[0].c, messages: mCount.rows[0].c });
}

seed();
