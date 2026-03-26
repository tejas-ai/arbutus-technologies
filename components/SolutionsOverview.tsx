"use client";
import React from "react";
import { motion } from "framer-motion";
import siteData from "@/data/site-data.json";

export default function SolutionsOverview() {
    const content = siteData;

    return (
        <section className="py-24 bg-[#010226] px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-display italic text-white mb-8">Comprehensive Technical <span className="text-[#0077b6]">Overview.</span></h2>
                    <p className="text-white/80 max-w-4xl mx-auto italic text-lg leading-relaxed font-medium">
                        Arbutus Technologies established in 2013, has become leading Indian Professional Distribution Company in the field of Electronic Components and is being managed by a professional group having both business and technical expertise with a very structured operation for Foreign & Local Currency Business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Electronic Components List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#020338]/40 backdrop-blur-md rounded-[32px] border border-white/10 p-10 hover:border-[#00b4d8]/40 transition-all duration-500 shadow-sm hover:shadow-xl"
                    >
                        <div className="bg-accent-gradient inline-block px-4 py-1 rounded-full mb-8">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest whitespace-nowrap">Electronic Components</span>
                        </div>
                        <ul className="space-y-4">
                            {content.products.items.map((item: { name: string }, i: number) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] group-hover:scale-150 transition-transform" />
                                    <span className="text-white/80 text-sm font-bold italic opacity-70 group-hover:opacity-100 transition-opacity">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Design & Development List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#020338]/40 backdrop-blur-md rounded-[32px] border border-white/10 p-10 hover:border-[#00b4d8]/40 transition-all duration-500 shadow-sm hover:shadow-xl"
                    >
                        <div className="bg-accent-gradient inline-block px-4 py-1 rounded-full mb-8">
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest whitespace-nowrap">Design & Development</span>
                        </div>
                        <ul className="space-y-4">
                            {content.capabilities.services.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="w-1.5 h-1.5 rounded-full border border-[#00b4d8] group-hover:bg-[#00b4d8] transition-colors" />
                                    <span className="text-white/80 text-sm font-bold italic opacity-70 group-hover:opacity-100 transition-opacity">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => window.location.href = '/contact?subject=Component Sourcing (Bulk)&message=I am interested in bulk sourcing electronic components.'}
                        className="inline-block px-12 py-5 bg-accent-gradient text-white rounded-full font-bold text-sm tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_35px_rgba(78,133,191,0.5)] transition-all active:scale-95 shadow-2xl"
                    >
                        Submit Technical Request ↗
                    </button>
                </div>
            </div>
        </section>
    );
}
