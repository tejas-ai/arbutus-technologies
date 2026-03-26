"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import siteData from "@/data/site-data.json";
import ScrollReveal from "./ScrollReveal";
import { useScrollContext } from "./ScrollContext";

export default function AboutSection() {
    const content = siteData.about;
    const { containerRef } = useScrollContext();
    const { scrollYProgress } = useScroll({
        container: containerRef || undefined
    });
    const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <section id="about" className="relative py-16 md:py-24 bg-bg px-6 md:px-8 border-t border-white/5 overflow-hidden">
            {/* Background Image with Overlay */}
            <motion.div
                className="absolute inset-0 z-0 opacity-60 pointer-events-none"
                style={{
                    backgroundImage: `url('/WhatsApp Image 2026-03-08 at 1.18.23 AM.jpeg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                    y: yRange
                }}
            />
            <div className="absolute inset-0 bg-black/85 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center px-2">
                    <ScrollReveal direction="left">
                        <div className="mb-4 md:mb-0">
                            <span className="text-[10px] md:text-xs text-accent font-accent font-black tracking-[0.4em] uppercase block mb-6 md:mb-8 border-l-2 border-accent/40 pl-4 text-medium">{content.header}</span>
                            <h2 className="text-3xl md:text-6xl font-display italic text-white leading-[1.15] md:leading-tight mb-8">
                                {content.title}
                            </h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right" delay={0.4}>
                        <div className="space-y-6 md:space-y-8 p-6 md:p-0 rounded-3xl bg-white/[0.03] backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/5 md:border-0">
                            {content.paragraphs.map((p: string, i: number) => (
                                <p key={i} className="text-high leading-relaxed text-base md:text-lg italic font-medium opacity-90">
                                    {p}
                                </p>
                            ))}
                            <Link href="/about" className="inline-flex items-center gap-3 pt-4 text-accent font-accent font-bold text-sm md:text-lg hover:-translate-y-1 hover:text-white transition-all duration-300 group">
                                <span>Learn More About Our Legacy</span>
                                <span className="group-hover:translate-x-2 transition-transform duration-300">↗</span>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
