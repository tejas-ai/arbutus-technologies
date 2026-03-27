const { createClient } = require('@libsql/client');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const sqlitePath = 'd:/Arbutus/data/database.sqlite';
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl || !tursoToken) {
    console.error("Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set as environment variables.");
    process.exit(1);
}

const localDb = new Database(sqlitePath);
const remoteDb = createClient({ url: tursoUrl, authToken: tursoToken });

async function migrateTable(tableName) {
    console.log(`Migrating table: ${tableName}...`);
    try {
        const rows = localDb.prepare(`SELECT * FROM ${tableName}`).all();
        if (rows.length === 0) {
            console.log(`Table ${tableName} is empty, skipping.`);
            return;
        }

        const columns = Object.keys(rows[0]);
        const placeholders = columns.map(() => '?').join(', ');
        const sql = `INSERT OR REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;

        const batch = rows.map(row => ({
            sql,
            args: columns.map(col => row[col])
        }));

        await remoteDb.batch(batch, "write");
        console.log(`Successfully migrated ${rows.length} rows to ${tableName}.`);
    } catch (err) {
        console.error(`Failed to migrate table ${tableName}:`, err.message);
    }
}

async function run() {
    console.log("--- Starting Turso Migration ---");
    
    // 1. Initialize Tables on Turso
    console.log("Initializing tables on Turso...");
    await remoteDb.batch([
        `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price TEXT,
            category TEXT,
            description TEXT,
            status TEXT DEFAULT 'active',
            images TEXT DEFAULT '[]',
            stock TEXT DEFAULT 'in_stock'
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
        );`,
        `CREATE TABLE IF NOT EXISTS settings (
            id TEXT PRIMARY KEY,
            value TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            salt TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
    ], "write");

    const tables = ['products', 'messages', 'site_content', 'settings', 'users'];
    for (const table of tables) {
        await migrateTable(table);
    }

    console.log("--- Migration Complete ---");
    localDb.close();
}

run().catch(console.error);
