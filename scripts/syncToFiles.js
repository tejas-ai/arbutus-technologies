const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

async function sync() {
    console.log("--- Exporting SQLite to JSON ---");
    const dbPath = path.resolve(__dirname, '../data/database.sqlite');
    const db = new Database(dbPath);
    
    try {
        // 1. Export Products
        const products = db.prepare('SELECT * FROM products').all();
        fs.writeFileSync(path.resolve(__dirname, '../products.json'), JSON.stringify(products, null, 2));
        console.log(`Exported ${products.length} products to products.json`);

        // 2. Export Site Content
        const rows = db.prepare('SELECT * FROM site_content WHERE key = ?').all('main');
        if (rows.length > 0) {
            fs.writeFileSync(path.resolve(__dirname, '../site-data.json'), rows[0].content);
            console.log("Exported site content to site-data.json");
        }

        console.log("--- Export Successful ---");
        return true;
    } catch (err) {
        console.error("--- Export Failed ---");
        console.error(err.message);
        return false;
    } finally {
        db.close();
    }
}

if (require.main === module) {
    sync();
}

module.exports = sync;
