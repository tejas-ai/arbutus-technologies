const fs = require('fs');
const path = require('path');

const routes = [
    "/about",
    "/blog",
    "/blogs/[id]",
    "/blogs/page/[page]",
    "/case-study/[id]",
    "/dedicated-development",
    "/graphics-design",
    "/hire-resources",
    "/how-we-works",
    "/life-at-arbutus",
    "/mobile-development",
    "/our-mission",
    "/portfolio",
    "/software-development",
    "/team",
    "/team/[id]",
    "/web-development",
    "/website-application-development"
];

const basePath = path.join(process.cwd(), 'pages');
fs.mkdirSync(basePath, { recursive: true });

routes.forEach(route => {
    let filePath = path.join(basePath, route + '.jsx');
    if (route.endsWith(']')) {
        const dir = path.dirname(filePath);
        fs.mkdirSync(dir, { recursive: true });
    } else {
        const dir = path.dirname(filePath);
        if (dir !== basePath) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    let componentName = route.replace(/[^a-zA-Z0-9]/g, '_').replace(/^_+/, '');

    let content = `import React from 'react';
import Head from 'next/head';

export default function Route_${componentName}() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--navy)', color: 'white' }}>
            <Head>
                <title>Arbutus Technologies | ${route}</title>
            </Head>
            <h1 style={{ fontFamily: 'var(--font-display)' }}>Placeholder Route</h1>
            <p><strong>Path:</strong> <code>${route}</code></p>
            <p style={{ marginTop: '20px', color: 'var(--elec)' }}><a href="/" style={{ textDecoration: 'underline' }}>&larr; Back to Home</a></p>
        </div>
    );
}
`;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content.trim());
        console.log("Created: " + filePath);
    }
});

// Convert index.html to pages/index.jsx
if (fs.existsSync('index.html')) {
    const htmlContent = fs.readFileSync('index.html', 'utf8');

    const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch) {
        fs.mkdirSync('styles', { recursive: true });
        fs.writeFileSync('styles/globals.css', styleMatch[1]);
        console.log('Created styles/globals.css');
    }

    const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
        let jsx = bodyMatch[1];
        jsx = jsx.replace(/class=/g, 'className=');
        jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
            const styleObj = styles.split(';').filter(Boolean).map(s => {
                const [key, val] = s.split(':').map(v => v.trim());
                if (!key) return '';
                const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
                return camelKey + ': "' + val + '"';
            }).join(', ');
            return "style={{" + styleObj + "}}";
        });

        const voidTags = ['img', 'input', 'br', 'hr', 'circle', 'rect', 'path', 'line', 'polygon'];
        voidTags.forEach(tag => {
            const regex = new RegExp('<(' + tag + ')([^>]*?)(?<!/)>\\\\s*(?!<\\\\/' + tag + '>)', 'g');
            jsx = jsx.replace(regex, '<$1$2 />');
        });

        jsx = jsx.replace(/<line(.*?)(?<!\/)>/g, '<line$1 />');
        jsx = jsx.replace(/<circle(.*?)(?<!\/)>/g, '<circle$1 />');
        jsx = jsx.replace(/<rect(.*?)(?<!\/)>/g, '<rect$1 />');
        jsx = jsx.replace(/<path(.*?)(?<!\/)>/g, '<path$1 />');
        jsx = jsx.replace(/<polygon(.*?)(?<!\/)>/g, '<polygon$1 />');
        jsx = jsx.replace(/<animateMotion(.*?)>/g, '<animateMotion$1>');
        jsx = jsx.replace(/<animate (.*?)>/g, '<animate $1 />');

        const pageCode = `import React, { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    useEffect(() => {
        const nav = document.getElementById('navbar');
        const handleScroll = () => {
          if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
          const secs = document.querySelectorAll('section[id]');
          let cur = '';
          secs.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id });
          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
          });
        };
        window.addEventListener('scroll', handleScroll);

        const hb = document.getElementById('hamburger');
        const mm = document.getElementById('mobileMenu');
        if (hb && mm) {
            hb.addEventListener('click', () => mm.classList.toggle('open'));
            mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));
        }

        const revs = document.querySelectorAll('.reveal');
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
        }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
        revs.forEach(r => obs.observe(r));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const btn = document.getElementById('formBtn');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '✅ Inquiry Submitted!';
            btn.style.background = 'linear-gradient(135deg,#00c896,#00a878)';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 3200);
        }
    };

    return (
        <>
            <Head>
                <title>Arbutus Technologies — Electronic Components & Embedded Engineering Solutions</title>
            </Head>
            ` + jsx.replace(/<script>[\s\S]*?<\/script>/, '') + `
        </>
    );
}
`;

        let finalCode = pageCode
            .replace(/stroke-width/g, 'strokeWidth')
            .replace(/preserveAspectRatio/g, 'preserveAspectRatio')
            .replace(/stop-color/g, 'stopColor')
            .replace(/stop-opacity/g, 'stopOpacity')
            .replace(/text-anchor/g, 'textAnchor')
            .replace(/font-family/g, 'fontFamily')
            .replace(/font-size/g, 'fontSize')
            .replace(/font-weight/g, 'fontWeight')
            .replace(/stroke-linecap/g, 'strokeLinecap')
            .replace(/stroke-linejoin/g, 'strokeLinejoin')
            .replace(/repeatCount/g, 'repeatCount')
            .replace(/attributeName/g, 'attributeName')
            .replace(/className=/g, 'className=')
            .replace(/for=/g, 'htmlFor=');

        fs.writeFileSync('pages/index.jsx', finalCode);
        console.log('Created pages/index.jsx');
    }
}
