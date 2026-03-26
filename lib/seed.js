const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'database.sqlite');
const db = new Database(DB_PATH);

// Create tables if not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT DEFAULT 'Ask Price',
    category TEXT DEFAULT 'Other Products',
    description TEXT,
    status TEXT DEFAULT 'active',
    image TEXT
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, email TEXT, subject TEXT,
    message TEXT, timestamp TEXT, status TEXT DEFAULT 'new'
  );
  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    content TEXT NOT NULL
  );
`);

// Migrate products
try {
    const prodFile = path.join(__dirname, '..', 'data', '..', 'products.json');
    const altProdFile = path.join(__dirname, '..', 'products.json');

    let products = [];
    if (fs.existsSync(prodFile)) {
        products = JSON.parse(fs.readFileSync(prodFile, 'utf8'));
        console.log('Found products.json at root');
    } else if (fs.existsSync(altProdFile)) {
        products = JSON.parse(fs.readFileSync(altProdFile, 'utf8'));
        console.log('Found products.json at alt path');
    }

    if (products.length > 0) {
        const ins = db.prepare('INSERT OR IGNORE INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)');
        const tx = db.transaction((prods) => {
            for (const p of prods) {
                ins.run(p.id || null, p.name, p.price || 'Ask Price', p.category || 'Other Products', p.description || '');
            }
        });
        tx(products);
        console.log(`Migrated ${products.length} products`);
    } else {
        // Seed sample products if no JSON found
        const sample = [
            [null, 'Electronic Integrated Circuits', 'Ask Price', 'Integrated Circuits', 'High quality ICs for industrial use'],
            [null, 'Surge Suppressors', 'Ask Price', 'Other Products', 'Surge protection components'],
            [null, 'Micro-Assemblies Cards', 'Ask Price', 'Other Products', 'PCB micro-assembly cards'],
            [null, 'Plugs & Connectors', 'Ask Price', 'Other Products', 'Industrial grade connectors'],
            [null, 'Sockets', 'Ask Price', 'Other Products', 'IC and component sockets'],
        ];
        const ins2 = db.prepare('INSERT INTO products (id, name, price, category, description) VALUES (?, ?, ?, ?, ?)');
        db.transaction((rows) => { for (const r of rows) ins2.run(...r); })(sample);
        console.log('Seeded 5 sample products');
    }
} catch (e) {
    console.error('Products migration error:', e.message);
}

// Migrate messages
try {
    const msgFile = path.join(__dirname, '..', 'messages.json');
    if (fs.existsSync(msgFile)) {
        const messages = JSON.parse(fs.readFileSync(msgFile, 'utf8'));
        const ins = db.prepare('INSERT OR IGNORE INTO messages (id, name, email, subject, message, timestamp, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
        db.transaction((msgs) => { for (const m of msgs) ins.run(m.id, m.name, m.email, m.subject, m.message, m.timestamp, m.status || 'new'); })(messages);
        console.log(`Migrated ${messages.length} messages`);
    }
} catch (e) {
    console.error('Messages migration error:', e.message);
}

// Migrate site-content
try {
    const siteFile = path.join(__dirname, '..', 'data', 'site-data.json');
    const altSiteFile = path.join(__dirname, '..', 'site-data.json');
    let siteData = null;
    if (fs.existsSync(siteFile)) siteData = fs.readFileSync(siteFile, 'utf8');
    else if (fs.existsSync(altSiteFile)) siteData = fs.readFileSync(altSiteFile, 'utf8');

    if (siteData) {
        db.prepare('INSERT OR REPLACE INTO site_content (key, content) VALUES (?, ?)').run('main', siteData);
        console.log('Migrated site content');
    }
} catch (e) {
    console.error('Site content migration error:', e.message);
}

const counts = {
    products: db.prepare('SELECT COUNT(*) as c FROM products').get().c,
    messages: db.prepare('SELECT COUNT(*) as c FROM messages').get().c,
};
console.log('Final DB state:', counts);
db.close();
