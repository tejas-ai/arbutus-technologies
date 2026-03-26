"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignServices from "@/components/DesignServices";
import Image from "next/image";

const focusDomains = [
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
        title: "Automotive",
        description: "Body control modules, instrument clusters, and infotainment bridge systems.",
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "EV Infrastructure",
        description: "High-power charging station controllers and advanced BMS solutions.",
    },
    {
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.345 6.582c5.999-6 15.312-6 21.31 0" />
            </svg>
        ),
        title: "Industrial IoT",
        description: "Secure gateway devices, remote monitoring nodes, and mesh sensor networks.",
    },
];

const capabilities = [
    {
        title: "Hardware Design",
        text: "Multi-layer PCB design, analog/digital integration, and high-speed signal integrity matching.",
    },
    {
        title: "Firmware Development",
        text: "Bare-metal optimization, RTOS implementation (FreeRTOS), and embedded Linux customization.",
    },
    {
        title: "Wireless Ecosystem",
        text: "Expertise in LoRaWAN long-range, NB-IoT cellular, BLE, and proprietary sub-GHz stacks.",
    },
    {
        title: "Rapid Prototyping",
        text: "In-house lab infrastructure for functional testing, environmental stress tests, and pilot production.",
    },
];

export default function RDPage() {
    return (
        <main className="bg-bg min-h-screen text-text">
            <Navbar />

            <div className="pt-32 md:pt-48 pb-12 md:pb-24 px-6 md:px-8 border-b border-white/5 bg-[#050B26]">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <span className="text-[10px] md:text-xs text-text/40 font-black uppercase tracking-[0.4em] block mb-8 px-1">Research & Development</span>
                    <h1 className="font-display italic text-4xl sm:text-6xl md:text-8xl text-text leading-[1.1] md:leading-[1] tracking-tight mb-8">
                        Engineering <br /> <span className="text-accent underline decoration-accent/10 underline-offset-[12px]">Excellence.</span>
                    </h1>
                    <p className="text-base md:text-2xl text-text/70 leading-relaxed max-w-2xl italic mx-auto md:mx-0 font-medium font-display translate-y-[-10px]">
                        From concept to production. Providing high-end hardware design and embedded software solutions for industrial leaders.
                    </p>
                </div>
            </div>

            <section className="py-24 px-8 bg-surface/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-[10px] md:text-xs text-accent font-black tracking-[0.4em] uppercase block mb-6 px-1">The Lab</span>
                        <h2 className="text-3xl md:text-6xl font-display italic text-text leading-tight mb-8 tracking-tight">
                            Advanced <span className="text-accent underline decoration-accent/10 underline-offset-[8px]">Facilities.</span>
                        </h2>
                        <p className="text-text/70 text-base md:text-xl leading-relaxed mb-12 italic font-display font-medium">
                            Our Bengaluru R&D center is equipped with state-of-the-art testing and prototyping infrastructure.
                            We specialize in ruggedized industrial electronics and automotive-grade embedded systems.
                        </p>

                        <div className="space-y-8">
                            {capabilities.map((cap, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="flex gap-5 items-start">
                                        <div className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
                                        <div>
                                            <h4 className="text-base md:text-lg font-black text-white uppercase tracking-wider mb-1">{cap.title}</h4>
                                            <p className="text-text/50 text-sm md:text-base leading-relaxed font-medium">{cap.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative rounded-[40px] overflow-hidden border border-stroke shadow-2xl"
                    >
                        <div className="relative h-64 md:h-full min-h-[300px] rounded-3xl overflow-hidden group">
                            <Image
                                src="/Gemini_Generated_Image_vr6qduvr6qduvr6q.png"
                                alt="Smart Factory Ready"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-bg via-transparent to-transparent opacity-90" />
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-8 bg-[#050B26]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center md:text-left">
                        <span className="text-[10px] md:text-xs text-text/40 font-black tracking-[0.4em] uppercase block mb-6 px-1">Focus Domains</span>
                        <h2 className="text-3xl md:text-6xl font-display italic text-text leading-[1.1] tracking-tight">
                            Expertise across <br /> <span className="text-accent">Mission-Critical Sectors.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {focusDomains.map((domain, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[40px] border border-white/5 bg-white/5 group hover:border-accent/40 transition-all duration-500 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] pointer-events-none group-hover:bg-accent/10 transition-all" />
                                <div className="text-accent mb-10 group-hover:scale-110 transition-transform origin-left text-3xl">
                                    {domain.icon}
                                </div>
                                <h3 className="text-3xl font-display italic text-text mb-6 tracking-tight">{domain.title}</h3>
                                <p className="text-white/60 text-base leading-relaxed italic font-display font-medium">{domain.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <DesignServices />
            <Footer />
        </main>
    );
}
