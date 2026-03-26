"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATALOG_SECTIONS = [
    {
        title: "Capacitive type transducer",
        items: [
            "Capacitive Level Sensors", "Touch Sensors ICs", "Proximity Sensors",
            "Capacitive Pressure Transducers", "Linear Position Transducers",
            "FDC1004DSCR e3 (Capacitive Sensor)", "Industrial Touch Panels",
            "Humidity Transducers (Capacitive)"
        ]
    },
    {
        title: "Vibration Sensors",
        items: [
            "Piezoelectric Vibration Sensors", "MEMS Accelerometers", "Seismic Sensors",
            "Industrial Vibration Transmitters", "Low Frequency Sensors",
            "Wireless Vibration Monitors", "Condition Monitoring Sensors"
        ]
    },
    {
        title: "Humidity & Temperature Sensors",
        items: [
            "Digital Humidity & Temp Sensors", "Analog Output Sensors", "Relative Humidity Modules",
            "Industrial Weather Stations", "HVAC Sensors", "Pre-calibrated Sensor Modules",
            "High Accuracy Lab Sensors"
        ]
    },
    {
        title: "Temperature Sensors",
        items: [
            "RTD (Resistance Temp Detectors)", "Thermocouples (J, K, T, E Type)", "Thermistor (NTC/PTC)",
            "Digital Temp Sensors (I2C/SPI)", "Infrared (IR) Temp Sensors", "Bimetallic Switches",
            "DS75LVU+ (Temp Sensor IC)", "LM35 Precision Sensors"
        ]
    },
    {
        title: "Accelerometers",
        items: [
            "Single-axis Accelerometers", "Triple-axis (3-axis) MEMS", "Digital Output (I2C/SPI)",
            "Analog Voltage Output", "High-G Shock Sensors", "Inclinometers",
            "Automotive Airbag Sensors", "Industrial Tilt Sensors"
        ]
    },
    {
        title: "Position Sensors",
        items: [
            "LVDT (Linear Variable Differential)", "Rotary Encoders (Absolute/Inc)",
            "Potentiometric Position Sensors", "Laser Distance Sensors",
            "Ultrasonic Level Sensors", "Draw-wire Sensors", "Magnetostrictive Sensors"
        ]
    },
    {
        title: "Hall Effect Sensors",
        items: [
            "Hall Effect Switches", "Linear Hall Effect ICs", "Magnetic Proximity Sensors",
            "Vane Sensors", "Speed & Direction Sensors", "Current Sensing Hall ICs",
            "Automotive Ignition Sensors"
        ]
    },
    {
        title: "Photoelectric Sensors",
        items: [
            "Diffuse Reflection Sensors", "Retro-reflective Sensors", "Through-beam Sensors",
            "Fiber Optic Sensors", "Laser Sensors", "Color & Contrast Sensors",
            "Light Curtains", "Slot Sensors"
        ]
    },
    {
        title: "Current Sensors",
        items: [
            "Closed-loop Current Sensors", "Open-loop Hall Effect", "Rogowski Coils",
            "Current Transformers (CT)", "Shunt Resistors", "Digital Current Monitors",
            "Isolation Amplifiers", "Energy Metering ICs"
        ]
    }
];

export default function SensorsPage() {
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
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent/80">Sensor Systems</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
                        Precision Sensing <br />
                        <span className="text-white/20">& Measurement</span>
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
