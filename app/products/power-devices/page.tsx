"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATALOG_SECTIONS = [
    {
        title: "Diode",
        items: [
            "Schottky Barrier Diodes", "Zener Diodes", "Rectifier Diodes",
            "Fast Recovery Diodes", "Bridge Rectifiers", "Switching Diodes",
            "TVS Diodes (Transient Voltage Suppressors)", "Varactor Diodes"
        ]
    },
    {
        title: "Transistors",
        items: [
            "Bipolar Junction Transistors (BJT)", "Darlington Transistors",
            "Small Signal Transistors", "Power Transistors", "RF Transistors",
            "Digital Transistors (RET)", "General Purpose Transistors"
        ]
    },
    {
        title: "Thyristors",
        items: [
            "Triacs (Bidirectional)", "Diacs", "Thyristor Modules",
            "High Power Thyristors", "Phase Control Thyristors",
            "Fast Switching Thyristors"
        ]
    },
    {
        title: "MOSFETs",
        items: [
            "Power MOSFETs (N-Channel/P-Channel)", "SiC (Silicon Carbide) MOSFETs",
            "GaN (Gallium Nitride) Power Stages", "Logic Level MOSFETs",
            "Depletion Mode MOSFETs", "Automotive Qualified MOSFETs",
            "Industrial MOSFET Modules"
        ]
    },
    {
        title: "IGBT",
        items: [
            "Discrete IGBTs", "IGBT Modules (Half-Bridge/Full-Bridge)",
            "Trench Gate IGBTs", "Field Stop IGBTs", "Ignition IGBTs",
            "High Frequency IGBTs", "Power Integrated Modules (PIM)"
        ]
    },
    {
        title: "SCR",
        items: [
            "Silicon Controlled Rectifiers (SCR)", "Sensitive Gate SCRs",
            "Standard Gate SCRs", "High Voltage SCRs", "SCR Modules",
            "25TTS12 (High Voltage SCR)", "BT169D (SCR Thyristor)"
        ]
    }
];

export default function PowerDevicesPage() {
    return (
        <main className="min-h-screen bg-[#010e30] overflow-x-hidden pt-32 pb-20 selection:bg-accent/30">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-6">
                {/* Hero Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-24 text-center md:text-left"
                >
                    <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80">Power Electronics</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
                        Advanced Power <br />
                        <span className="text-white/20">& Discrete Devices</span>
                    </h1>
                </motion.div>

                {/* Catalog Sections (Line Card Style) */}
                <div className="space-y-32 mb-40">
                    {CATALOG_SECTIONS.map((section, sectionIdx) => (
                        <motion.div 
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
                            id={section.title.toLowerCase().replace(/[^\w]+/g, '-')}
                            className="relative scroll-mt-40"
                        >
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-8 h-[2px] bg-accent" />
                                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                                {section.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: (itemIdx % 50) * 0.005 }}
                                        viewport={{ once: true }}
                                        className="group flex items-center gap-4 py-1"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent transition-all duration-300 shrink-0" />
                                        <span className="text-white/60 group-hover:text-white transition-all duration-300 font-medium text-sm md:text-base tracking-wide">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
            
            <Footer />
        </main>
    );
}
