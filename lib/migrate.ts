import db from './db';
import fs from 'fs';
import path from 'path';

async function migrate() {
    console.log("Starting migration from JSON to SQLite...");

    // 1. Migrate Products
    try {
        const prodPath = path.join(process.cwd(), 'products.json');
        if (fs.existsSync(prodPath)) {
            const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
            const insertProd = db.prepare('INSERT OR IGNORE INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)');

            db.transaction(() => {
                for (const p of products) {
                    insertProd.run(p.id, p.name, p.price, p.category, p.description || '');
                }
            })();
            console.log(`Migrated ${products.length} products.`);
        }
    } catch (e) { console.error("Product migration failed:", e); }

    // 2. Migrate Messages
    try {
        const msgPath = path.join(process.cwd(), 'messages.json');
        if (fs.existsSync(msgPath)) {
            const data = JSON.parse(fs.readFileSync(msgPath, 'utf8'));
            const inquiries = data.inquiries || [];
            const insertMsg = db.prepare('INSERT OR IGNORE INTO messages (name, email, subject, message, timestamp, status) VALUES (?, ?, ?, ?, ?, ?)');

            db.transaction(() => {
                for (const m of inquiries) {
                    insertMsg.run(m.name, m.email, m.subject, m.message, m.timestamp, m.status || 'new');
                }
            })();
            console.log(`Migrated ${inquiries.length} messages.`);
        }
    } catch (e) { console.error("Message migration failed:", e); }

    // 3. Migrate Site Content
    try {
        const sitePath = path.join(process.cwd(), 'site-data.json');
        if (fs.existsSync(sitePath)) {
            const siteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
            const insertContent = db.prepare('INSERT OR REPLACE INTO site_content (key, content) VALUES (?, ?)');

            // We'll store about, partners, capabilities separately for easier access if needed, 
            // but for now let's just store the whole blob as 'main' to maintain direct sync
            insertContent.run('main', JSON.stringify(siteData));
            console.log("Migrated site content.");
        }
    } catch (e) { console.error("Site content migration failed:", e); }

    console.log("Migration complete.");
}

migrate();
