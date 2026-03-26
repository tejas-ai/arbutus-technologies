"use client";
import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const milestones = [
    {
        year: "2013",
        title: "Foundation",
        description: "Company Founded on 20th November 2013 in Bengaluru with a vision to revolutionize component sourcing.",
    },

    {
        year: "26+",
        title: "Expertise",
        description: "Years of Collective Technical & Business Expertise in the electronics industry.",
    },
];

export default function MissionSection() {
    return (
        <section className="py-24 bg-[#010226] px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
                    <ScrollReveal direction="left">
                        <div>
                            <span className="text-xs text-accent font-accent font-black tracking-[0.4em] uppercase block mb-6 text-medium">Our Mission</span>
                            <h2 className="text-5xl md:text-6xl font-display italic text-white leading-tight mb-8">
                                Empowering the Electronics <span className="text-accent underline decoration-accent/20 underline-offset-8">Ecosystem.</span>
                            </h2>
                            <p className="text-high text-xl leading-relaxed italic border-l-2 border-accent/30 pl-8 font-medium opacity-90">
                                "To empower the Indian electronics manufacturing ecosystem through authorized distribution of global standards and high-caliber indigenous engineering services."
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.4}>
                        <div className="relative rounded-3xl overflow-hidden border border-stroke aspect-square md:aspect-video">
                            <img
                                src="/corporate-consultation.jpg"
                                alt="Corporate Consultation - Tech Professionals"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010226]/80 to-transparent" />
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal direction="up" staggerChildren={0.2} threshold={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="p-10 rounded-3xl border border-white/10 bg-[#020338]/40 backdrop-blur-sm hover:border-[#00b4d8]/40 transition-all duration-500 group"
                            >
                                <span className="text-5xl font-display italic text-accent mb-6 block group-hover:scale-110 transition-transform origin-left">{milestone.year}</span>
                                <h3 className="text-xl font-bold text-white mb-4">{milestone.title}</h3>
                                <p className="text-medium text-sm leading-relaxed font-medium">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* Background Decoration */}
            {/* Background Decoration Removed */}
        </section>
    );
}
