"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Box, Zap, ShieldCheck, Database, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const CATALOG_SECTIONS = [
    {
        title: "Integrated Circuits",
        items: [
            "Voltage Regulator IC", "Optocoupler IC", "Amplifier IC", "Industrial Microcontroller",
            "SMD Transistor", "Black Transistors", "Industrial MOSFET", "XC4VLX100-10FFG1148I (FPGA)",
            "CL2207SL (Power Management IC)", "LNK306DG-TL (AC/DC Converter IC)", "ADS1115IDGSR (Input Module IC)",
            "SN74LVC2G07DBVR (Buffers & Line Drivers IC)", "HCPL-800J-500E (Buffers & Line Drivers IC)",
            "HT1621B (LCD Driver IC)", "MAX13443EASA+ (RS-485 Interface IC)", "MAX3232ESE+ (RS-232 Interface IC)",
            "LM555CMX/NOPB (Oscillator IC)", "TOP258MG (AC/DC Converter IC)", "B0303XT-1WR3 (DC-DC Converter IC)",
            "K783V3-1000 (AC-DC Converter)", "PIC16F1527-I/PT (8-bit Microcontroller)", "LMK1C1102PWR (Clock Buffer IC)",
            "OP07CP (Operational Amplifier IC)", "STM32F405RGT6 (ARM Microcontroller)", "STM32G030C8T6 (ARM Microcontroller)",
            "AT24C1024BN-SH-T (Memory IC)", "TUSB2046IBVFR (USB Interface IC)", "AT45DB321E-SHFHA-T (NOR Flash IC)",
            "UCC2893DR (Switching Controller IC)", "ADUM3200CRZ-RL7 (Digital Isolator)", "ISO1540DR (Digital Isolator)",
            "FDC1004DSCR e3 (Capacitive Touch Sensor)", "LMP8601MAX/NOPB (Analog Comparator)", "DS75LVU+ (Temperature Sensor IC)",
            "TPS2034DR (Power Switch IC)", "VIPER27LN (AC/DC Converter IC)", "AN5763 (Correction IC)",
            "FDC654P / AP15N03H / TPC8129 (MOSFETs)", "LF444CM (Operational Amplifier)", "ADP1823ACPZ (Switching Controller IC)",
            "IPM Modules / IGBT Modules", "25TTS12 (High Voltage Thyristor)", "BT169D (SCR Thyristor)"
        ]
    },
    {
        title: "Passives (Resistors, Capacitors & Inductors)",
        items: [
            "SMD Resistor", "Industrial Resistor", "Metal Film Resistors", "BPC10100J (Thick Film Resistor)",
            "RC0402JR-070RL (SMD Resistor)", "Industrial Potentiometer", "Ceramic Capacitor",
            "Electrolytic Capacitor", "Aluminium Electrolytic Capacitors", "B32621A6223J (Film Capacitor)",
            "B32914A3105M000 (Film Capacitor)", "VCD54-102K (SMD Inductor)", "BRL1608T2R2M (SMD Power Inductor)",
            "HM72A Series (SMD Power Inductors)"
        ]
    },
    {
        title: "Diodes & Rectifiers",
        items: [
            "SMD Diodes", "Industrial Diodes", "Zener Diode", "TVS Diode", "5KP70CA (ESD Suppressor)",
            "ESDA6V1W5 (Diode)", "FR207G-B (Rectifiers)", "IXFN82N60P (Bridge Rectifier)",
            "Df10s (Bridge Rectifier IC)", "SSL54BF (Schottky Barrier Rectifier)"
        ]
    },
    {
        title: "Protection & Frequency Control",
        items: [
            "Ceramic Fuse (3.15A 250E)", "Industrial Fuses", "Resettable Fuse", "B72220S Series (MOV Varistors)",
            "20D181k (Circuit Protection Varistor)", "Ferrite Beads", "Crystals", "Ceramic Resonators", "Quartz Crystal"
        ]
    },
    {
        title: "Electromechanical, Connectors & Modules",
        items: [
            "Electric Connectors", "Power Connectors", "Headers & Wire Housings", "Rj45 Connector", "Terminal Blocks",
            "Industrial Crimps", "Interconnect Terminals", "Tactile Switches", "6P ON-OFF Function Switch",
            "Industrial Relays", "Signal Relay", "PC Board Relay", "Oen Relay", "Raspberry Pi 3 Model B +",
            "GPS/GNSS Modules", "Integrated Module", "Switching Power Supplies"
        ]
    },
    {
        title: "Sensors, Displays & Indicators",
        items: [
            "Industrial LED", "Graphic LCD Display", "Led Bulb", "Hall Effect Sensors", "NTC Thermistors",
            "GP60-075 (PPTC Thermistor)", "Piezo Buzzers & Audio Indicators"
        ]
    },
    {
        title: "PCB",
        items: [
            "SDVC21-S Vibrator Controller", "Control Panel", "Push Button", "Cooling Fans", "Battery Charger", "Wire Connector"
        ]
    }
];

export default function ElectronicComponentsPage() {
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
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80">Electronic Components</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
                        Advanced Sourcing <br />
                        <span className="text-white/20">Solutions</span>
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
                            id={section.title.toLowerCase().includes("integrated") ? "ic" : 
                                section.title.toLowerCase().includes("passive") ? "passive" :
                                section.title.toLowerCase().includes("diode") ? "diodes" :
                                section.title.toLowerCase().includes("protection") ? "protection" :
                                section.title.toLowerCase().includes("electromechanical") ? "electromechanical" :
                                section.title.toLowerCase().includes("sensor") ? "sensors" : "misc"}
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
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent transition-all duration-300 shrink-0 group-hover:shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
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

