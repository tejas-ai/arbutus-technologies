"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/site-data.json";
import { motion } from "framer-motion";

export default function LineCardPage() {
    const lineCard = siteData.lineCard;

    return (
        <main className="min-h-screen bg-bg">
            <Navbar />

            {/* Header Section */}
            <section className="relative pt-32 md:pt-48 pb-12 md:pb-24 px-6 md:px-8 border-b border-white/5 bg-[#050B26] overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
                </div>
 
                <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
                    <nav className="flex items-center justify-center md:justify-start gap-3 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-text/40 mb-8 px-1">
                        <a href="/" className="hover:text-accent transition-colors">Home</a>
                        <span className="text-white/10">»</span>
                        <span className="text-accent">Line Card</span>
                    </nav>
 
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-display italic text-text leading-[1.1] md:leading-[1] tracking-tight mb-8">
                        Line <span className="text-accent underline decoration-accent/10 underline-offset-[12px]">Card.</span>
                    </h1>
                    <p className="text-base md:text-2xl text-text/70 leading-relaxed max-w-2xl italic mx-auto md:mx-0 font-medium font-display translate-y-[-10px]">
                        A comprehensive directory of our authorized manufacturers and strategic partners providing cutting-edge electronic solutions.
                    </p>
                </div>
            </section>

            {/* List Section */}
            <section className="py-24 px-6 md:px-8 bg-bg">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
                        {lineCard.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: (index % 50) * 0.005 }}
                                viewport={{ once: true }}
                                className="group flex items-center gap-4 py-1"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent transition-all duration-300 shrink-0 group-hover:shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
                                <span className="text-text group-hover:text-accent transition-all duration-300 font-medium text-base md:text-lg font-body cursor-default">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
