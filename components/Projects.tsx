"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
    { 
        title: "Arbutus Core", 
        category: "R&D Systems", 
        color: "from-blue-600/20",
        description: "Full-stack resource management platform with real-time feedback."
    },
    { 
        title: "Strategic Edge", 
        category: "Supply Chain", 
        color: "from-accent/20",
        description: "AI-driven sourcing tool for global manufacturing networks."
    },
    { 
        title: "Design Portal", 
        category: "Creative Services", 
        color: "from-purple-600/20",
        description: "Immersive 3D showcase for premium industrial design."
    },
    { 
        title: "Quantum Connect", 
        category: "Infrastructure", 
        color: "from-emerald-600/20",
        description: "Next-gen communication protocol for distributed teams."
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 py-32 px-6 md:px-12 bg-bg">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-accent/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Selected Works</span>
                        <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
                            The <span className="text-accent underline decoration-1 underline-offset-4 md:underline-offset-[12px]">Portfolio</span>
                        </h2>
                    </div>
                    <p className="text-white/40 text-sm md:text-base max-w-sm italic">
                        Explorations in high-performance web architecture and immersive user interfacing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-2xl aspect-[16/11] flex flex-col justify-end p-8 md:p-12 transition-all hover:bg-white/[0.05] hover:border-white/20"
                        >
                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                            
                            {/* Gradient Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-700`} />

                            <div className="relative z-10">
                                <span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-3 block">
                                    {project.category}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-xs md:text-sm font-medium max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {project.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-8 right-8 md:top-12 md:right-12">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-bg text-white/40 rotate-45 group-hover:rotate-0 transition-all duration-500">
                                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-20 text-center">
                    <button className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all hover:border-accent">
                        <span className="relative z-10 text-white font-black italic uppercase italic tracking-widest text-[10px]">View All Archives</span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </section>
    );
}
