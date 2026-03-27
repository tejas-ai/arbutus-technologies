import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const url = process.env.TURSO_DATABASE_URL || `file:${path.join(process.cwd(), 'data', 'database.sqlite')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Ensure data directory exists for local file mode
if (url.startsWith('file:')) {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

const db = createClient({
    url,
    authToken,
});

// Initialize Tables (Async for libsql)
const initDb = async () => {
    try {
        await db.batch([
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price TEXT,
                category TEXT,
                description TEXT,
                status TEXT DEFAULT 'active',
                images TEXT DEFAULT '[]'
            );`,
            `CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new'
            );`,
            `CREATE TABLE IF NOT EXISTS site_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT UNIQUE NOT NULL,
                content TEXT NOT NULL
            );`
        ], "write");
        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Database initialization failed:", err);
    }
};

// Site content already has images column in migrate.js, 
// so I added it to products table here for consistency with admin-app.

if (typeof window === 'undefined') {
    initDb();
}

export default db;
