# Arbutus Technologies — Platform Overview

## Project Structure

```
APPA FRIEND WEBSITE/
│
├── app/                   ← Client Website (Next.js 15 + React 19)
├── components/            ← Premium UI components (GSAP + Framer Motion)
├── legacy/                ← Archived legacy files and build logs
├── lib/                   ← Shared utilities & database connection
├── data/                  ← Shared database (SQLite)
│   └── database.sqlite    ← Unified database
├── public/                ← Static assets (4K Videos, Brand Logos)
├── styles/                ← Global CSS & Design Tokens
└── README.md              ← Project documentation
```

## Technology Stack

The platform is built with a modern, high-performance stack optimized for visual excellence and technical precision:

- **Framework:** Next.js 15.0 (App Router)
- **Library:** React 19.0
- **Styling:** Tailwind CSS 3.4
- **Animations:** GSAP 3.14 & Framer Motion 12.0
- **Database:** SQLite (Better-SQLite3)
- **Icons:** Lucide React

## Running the App

```powershell
# Client Website (port 3000)
cd "D:\APPA FRIEND WEBSITE"
npm run dev
```

## 🛡️ Security & Performance

The platform is hardened with professional-grade security and performance optimizations:

- **Authentication:** PBKDF2-SHA512 hashing for admin security.
- **Middleware:** Hardened security headers (CSP, HSTS) and Edge-compatible delivery.
- **Bot Mitigation:** Integrated rate limiting and honeypot protection.
- **Visual Performance:** Lazy-loaded sections and optimized media delivery for a premium UX.
