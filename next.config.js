/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  serverExternalPackages: ['better-sqlite3'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'three', '@react-three/fiber', '@react-three/drei', 'framer-motion', 'gsap'],
  },
};

module.exports = nextConfig;
