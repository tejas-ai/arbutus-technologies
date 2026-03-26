"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ColorPalette from "@/components/tools/ColorPalette";
import ColorMixer from "@/components/tools/ColorMixer";
import ContrastChecker from "@/components/tools/ContrastChecker";
import Base64Tool from "@/components/tools/Base64Tool";

export default function ToolsPage() {
    return (
        <main className="bg-bg min-h-screen text-text selection:bg-accent selection:text-bg">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <ScrollReveal direction="down">
                        <span className="text-xs text-accent font-accent font-black tracking-[0.4em] uppercase block mb-6">Expert Solutions</span>
                        <h1 className="text-5xl md:text-8xl font-display italic text-white leading-tight mb-8">
                            Design & Engineering <br />
                            <span className="text-accent">Solutions Hub.</span>
                        </h1>
                        <p className="text-xl text-medium max-w-2xl italic leading-relaxed">
                            A curated suite of high-utility tools for engineers and designers. 
                            Built for precision, speed, and technical excellence.
                        </p>
                    </ScrollReveal>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-gradient opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            </section>

            {/* Tools Grid */}
            <section className="pb-32 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ScrollReveal direction="up" delay={0.2}>
                        <ColorPalette />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.4}>
                        <ColorMixer />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.6}>
                        <ContrastChecker />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.8}>
                        <Base64Tool />
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
