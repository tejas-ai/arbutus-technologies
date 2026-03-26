const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'data', 'database.sqlite'));

try {
    const tableInfo = db.prepare("PRAGMA table_info(messages)").all();
    console.log('Table Info:', tableInfo);

    const testInsert = db.prepare(`
        INSERT INTO messages (name, email, subject, message, timestamp, status)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'new')
    `);
    
    const info = testInsert.run('Test Name', 'test@example.com', 'Test Subject', 'Test Message');
    console.log('Insert Info:', info);

    const lastEntry = db.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 1").get();
    console.log('Last Entry:', lastEntry);
} catch (err) {
    console.error('Error:', err);
}
db.close();
