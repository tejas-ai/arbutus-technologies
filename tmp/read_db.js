const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data', 'database.sqlite');
const db = new Database(DB_PATH);

const row = db.prepare('SELECT content FROM site_content WHERE key = ?').get('main');
if (row) {
    console.log(row.content);
} else {
    console.log('No content found');
}
db.close();
