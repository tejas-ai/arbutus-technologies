"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATALOG_SECTIONS = [
    {
        title: "Flash Memory",
        items: [
            "NAND Flash ICs", "NOR Flash ICs", "Serial Flash", "Parallel Flash",
            "Managed NAND (eMMC)", "Universal Flash Storage (UFS)", "SLC & MLC Flash",
            "Industrial Grade Flash", "Automotive Flash Memory"
        ]
    },
    {
        title: "DRAM (Dynamic Random Access Memory)",
        items: [
            "SDRAM ICs", "DDR/DDR2SDRAM", "DDR3/DDR3L SDRAM", "DDR4 SDRAM",
            "LPDDR/LPDDR4 SDRAM", "Mobile DRAM", "Graphics DRAM (GDDR)",
            "Specialty DRAM", "Legacy DRAM Modules"
        ]
    },
    {
        title: "NVRAM (Non-Volatile RAM)",
        items: [
            "MRAM (Magnetoresistive RAM)", "FRAM (Ferroelectric RAM)", "nvSRAM",
            "Battery-Backed SRAM", "Serial NVRAM", "Parallel NVRAM",
            "Data Logging NVRAM", "High Endurance NVRAM"
        ]
    },
    {
        title: "SRAM (Static Random Access Memory)",
        items: [
            "Standard SRAM", "Low Power SRAM", "Fast SRAM", "Synchronous SRAM",
            "Asynchronous SRAM", "Dual-Port SRAM", "FIFO Memory Interface",
            "Pseudo SRAM (PSRAM)", "Quad Data Rate (QDR) SRAM"
        ]
    },
    {
        title: "PROM / EPROM",
        items: [
            "OTP EPROM", "UV-Erasable EPROM", "Bipolar PROM", "Serial EEPROM",
            "Parallel EEPROM", "Configuration Memory", "Legacy PROM Devices"
        ]
    },
    {
        title: "FIFO Memory",
        items: [
            "Synchronous FIFOs", "Asynchronous FIFOs", "Bidirectional FIFOs",
            "Unidirectional FIFOs", "Programmable Flags FIFOs", "High Speed FIFOs"
        ]
    },
    {
        title: "SSD Storage",
        items: [
            "M.2 NVMe SSDs", "SATA III SSDs", "Enterprise SSDs", "Industrial SSDs",
            "mSATA Modules", "CompactFlash (CF) Cards", "SD/microSD Industrial Cards",
            "USB Flash Drives (Industrial)"
        ]
    },
    {
        title: "MultiChip Memory",
        items: [
            "Multi-Chip Packages (MCP)", "Package-on-Package (PoP)", "eMMC + LPDDR Packages",
            "NAND + DRAM Hybrid", "Custom Memory Modules", "System-in-Package (SiP) Memory"
        ]
    }
];

export default function MemoryPage() {
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
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80">Memory Solutions</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
                        Advanced Storage <br />
                        <span className="text-white/20">& Memory</span>
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
