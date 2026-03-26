const fs = require('fs');
const path = require('path');

const routes = [
    "/about",
    "/apply",
    "/blog",
    "/blogs/page/[page]",
    "/blogs/[id]",
    "/career",
    "/case-study/[id]",
    "/contact",
    "/dedicated-development",
    "/graphics-design",
    "/hire-resources",
    "/how-we-works",
    "/life-at-arbutus",
    "/mobile-development",
    "/our-mission",
    "/portfolio",
    "/software-development",
    "/team/index",
    "/team/[id]",
    "/web-development",
    "/website-application-development",
    "/404"
];

const basePath = path.join(process.cwd(), 'pages');

routes.forEach(route => {
    let filePath = path.join(basePath, route + '.jsx');

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    let componentName = route.replace(/[^a-zA-Z0-9]/g, '_');

    let content = `
import React from 'react';
import Head from 'next/head';

export default function ${componentName}() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--navy)', color: 'white' }}>
            <Head>
                <title>Arbutus Technologies | ${route}</title>
            </Head>
            <h1 style={{ fontFamily: 'var(--font-display)' }}>Placeholder Route</h1>
            <p><strong>Path:</strong> \`${route}\`</p>
            <p style={{ marginTop: '20px', color: 'var(--elec)' }}><a href="/" style={{ textDecoration: 'underline' }}>&larr; Back to Home</a></p>
        </div>
    );
}
`;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content.trim());
        console.log(\`Created \${filePath}\`);
    }
});
