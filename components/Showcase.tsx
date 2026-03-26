"use client";
import React from "react";
import { motion } from "framer-motion";

const examples = [
    { name: "Cyber Samurai", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Neon Nomad", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
    { name: "Glitch Guardian", image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2030&auto=format&fit=crop" },
    { name: "Techno Titan", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" },
];

export default function Showcase() {
    return (
        <section className="py-24 bg-[#010226] overflow-hidden">
            <div className="px-8 mb-12 max-w-7xl mx-auto flex items-end justify-between">
                <div>
                    <span className="text-[10px] text-[#00b4d8] font-black uppercase tracking-[0.4em] block mb-4">GALLERY</span>
                    <h2 className="text-5xl md:text-6xl font-display italic text-white">The Hall of Heroes</h2>
                </div>
                <div className="text-white/60 text-sm hidden md:block max-w-xs text-right italic font-medium">
                    Curated examples from our latest style model.
                </div>
            </div>

            <div className="flex gap-8 px-8 overflow-x-auto no-scrollbar scroll-smooth">
                {examples.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex-shrink-0 w-80 h-[450px] relative rounded-3xl overflow-hidden border border-stroke group"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010226]/80 via-transparent to-transparent opacity-90 group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute bottom-8 left-8">
                            <span className="font-display italic text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transform flex items-center gap-2">
                                {item.name} <span className="text-sm">→</span>
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
