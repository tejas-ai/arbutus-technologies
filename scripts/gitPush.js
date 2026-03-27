const { execSync } = require('child_process');
const path = require('path');

function push() {
    console.log("--- Syncing to GitHub ---");
    const cwd = path.resolve(__dirname, '..');
    
    try {
        // 1. Stage changes
        execSync('git add products.json site-data.json data/database.sqlite public/images/products 2>null || git add .', { cwd, stdio: 'inherit' });
        
        // 2. Commit
        const timestamp = new Date().toISOString();
        execSync(`git commit -m "Admin Update: ${timestamp}"`, { cwd, stdio: 'inherit' });
        
        // 3. Push
        execSync('git push origin main', { cwd, stdio: 'inherit' });
        
        console.log("--- Sync Successful ---");
        return true;
    } catch (err) {
        console.error("--- Sync Failed ---");
        // Catch "nothing to commit" error
        if (err.message.includes('nothing to commit')) {
            console.log("No changes to sync.");
            return true;
        }
        console.error(err.message);
        return false;
    }
}

if (require.main === module) {
    push();
}

module.exports = push;
