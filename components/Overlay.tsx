"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Section 1: Center (0% - 20%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.2], [1.1, 0.9]);
    const blur1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], ["10px", "0px", "0px", "10px"]);

    // Section 2: Left (30% - 50%)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.5], [-40, 40]);

    // Section 3: Right (60% - 80%)
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.8], [40, -40]);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
            {/* Background Grain/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />

            {/* Section 1: Hero Discovery */}
            <motion.div 
                style={{ opacity: opacity1, scale: scale1, filter: `blur(${blur1})` }}
                className="absolute text-center px-6"
            >
                <span className="text-accent font-mono text-xs md:text-sm tracking-[0.5em] uppercase mb-4 block">
                    Portfolio MMXXVI
                </span>
                <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white font-display leading-[0.9]">
                    Arbutus <br />
                    <span className="text-accent underline decoration-1 underline-offset-8">Solutions</span>
                </h1>
                <p className="text-white/40 text-[10px] md:text-xs font-black tracking-[0.6em] uppercase mt-8 max-w-xs mx-auto leading-relaxed">
                    Personal Creative Developer & Systems Engineer
                </p>
            </motion.div>

            {/* Section 2: Narrative Left */}
            <motion.div 
                style={{ opacity: opacity2, x: x2 }}
                className="absolute left-6 md:left-24 max-w-sm"
            >
                <div className="w-12 h-[1px] bg-accent mb-6" />
                <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                    Digital <br />
                    <span className="text-accent">Architect</span>
                </h2>
                <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed italic">
                    I build digital experiences that push the boundaries of modern web interactions.
                </p>
            </motion.div>

            {/* Section 3: Narrative Right */}
            <motion.div 
                style={{ opacity: opacity3, x: x3 }}
                className="absolute right-6 md:right-24 text-right max-w-sm"
            >
                <div className="w-12 h-[1px] bg-accent mb-6 ml-auto" />
                <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
                    Bridge & <br />
                    <span className="text-accent">Engineer</span>
                </h2>
                <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed italic">
                    Seamlessly connecting high-end design principles with robust engineering foundations.
                </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
        </div>
    );
}
