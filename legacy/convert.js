const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf8');

// Extract styles
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    fs.mkdirSync('styles', { recursive: true });
    fs.writeFileSync('styles/globals.css', styleMatch[1]);
    console.log('Created styles/globals.css');
}

// Extract body content
const bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let jsx = bodyMatch[1];

    // Convert class to className
    jsx = jsx.replace(/class=/g, 'className=');

    // Convert inline styles (heuristic, simple cases)
    // Replace "style='...'" or 'style="..."' with an empty block for now,
    // or properly map it. The user's code has minimal inline styles:
    // style="color: #fff;" -> style={{color: '#fff'}}
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
        const styleObj = styles.split(';').filter(Boolean).map(s => {
            const [key, val] = s.split(':').map(v => v.trim());
            if (!key) return '';
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return \`\${camelKey}: "\${val}"\`;
        }).join(', ');
        return \`style={{ \${styleObj} }}\`;
    });

    // Self close void tags
    const voidTags = ['img', 'input', 'br', 'hr', 'circle', 'rect', 'path', 'line', 'polygon'];
    voidTags.forEach(tag => {
        const regex = new RegExp(\`<(\${tag})([^>]*?)(?<!/)>\\s*(?!<\\\\/\${tag}>)\`, 'g');
        jsx = jsx.replace(regex, '<$1$2 />');
    });

    // Specifically handle SVG tags that need self-closing or proper casing
    jsx = jsx.replace(/<line(.*?)(?<!\/)>/g, '<line$1 />');
    jsx = jsx.replace(/<circle(.*?)(?<!\/)>/g, '<circle$1 />');
    jsx = jsx.replace(/<rect(.*?)(?<!\/)>/g, '<rect$1 />');
    jsx = jsx.replace(/<path(.*?)(?<!\/)>/g, '<path$1 />');
    jsx = jsx.replace(/<polygon(.*?)(?<!\/)>/g, '<polygon$1 />');
    
    // Fix animateMotion
    jsx = jsx.replace(/<animateMotion(.*?)>/g, '<animateMotion$1>');
    jsx = jsx.replace(/<animate (.*?)>/g, '<animate $1 />');

    // Create the page component
    const pageCode = \`
import React, { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    useEffect(() => {
        // Navbar scroll
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

        // Hamburger
        const hb = document.getElementById('hamburger');
        const mm = document.getElementById('mobileMenu');
        if (hb && mm) {
            hb.addEventListener('click', () => mm.classList.toggle('open'));
            mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));
        }

        // Reveal on scroll
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
            \${jsx.replace(/<script>[\\s\\S]*?<\\/script>/, '')}
        </>
    );
}
\`;

    // Fix remaining SVG camelCase attributes like preserveAspectRatio, stroke-width, text-anchor
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
      .replace(/attributeName/g, 'attributeName');

    // specific fix for svg animate tag attributes since they might not be fully React compliant
    finalCode = finalCode.replace(/class=/g, 'className=');

    fs.mkdirSync('pages', { recursive: true });
    fs.writeFileSync('pages/index.jsx', finalCode);
    console.log('Created pages/index.jsx');
}
