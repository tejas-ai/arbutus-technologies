import React from "react";
import db from "@/lib/db";
import ScrollReveal from "./ScrollReveal";

async function getPartnerData() {
    const row = db.prepare('SELECT content FROM site_content WHERE key = ?').get('main') as any;
    return row ? JSON.parse(row.content).partners : null;
}

export default async function BrandPartners() {
    const content = await getPartnerData();

    if (!content || !content.items) return null;

    return (
        <section className="py-24 bg-bg border-y border-stroke overflow-hidden">
            <ScrollReveal direction="up" className="mx-auto mb-16 px-8 max-w-7xl text-center">
                <span className="text-xs text-text font-bold tracking-[0.3em] uppercase">{content.header}</span>
            </ScrollReveal>

            <div className="flex whitespace-nowrap overflow-hidden relative group">
                <div className="flex gap-8 md:gap-16 animate-marquee px-4 md:px-8 items-stretch will-change-transform">
                    {[...content.items, ...content.items].map((item, index) => (
                        <div key={index} className="flex-shrink-0 px-6 md:px-10 py-6 md:py-8 bg-[#020338]/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center min-w-[300px] md:min-w-[450px] max-w-[600px] hover:border-[#00b4d8] transition-all duration-500 group/item backdrop-blur-sm whitespace-normal">
                            <div className="relative w-full h-32 md:h-40 mb-6 flex items-center justify-center overflow-hidden bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 p-6 group-hover/item:border-cyan-500/50 transition-colors duration-500">
                                <img 
                                    src={item.logo} 
                                    alt={item.name}
                                    className="max-w-[90%] max-h-full object-contain transition-all duration-500 transform group-hover/item:scale-110 filter"
                                />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-sm md:text-base font-bold text-text uppercase tracking-[0.2em] leading-tight">
                                    {item.name}
                                </h3>
                                <p className="text-[10px] md:text-xs text-text/60 font-medium leading-relaxed max-w-[280px] mx-auto">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
