const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'data', 'database.sqlite');
const sitePath = path.join(process.cwd(), 'data', 'site-data.json');

try {
    const db = new Database(DB_PATH);
    if (fs.existsSync(sitePath)) {
        const siteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
        const insertContent = db.prepare('INSERT OR REPLACE INTO site_content (key, content) VALUES (?, ?)');
        insertContent.run('main', JSON.stringify(siteData));
        console.log("Successfully synced site-data.json to database.");
    } else {
        console.error("site-data.json not found.");
    }
} catch (e) {
    console.error("Sync failed:", e);
}
