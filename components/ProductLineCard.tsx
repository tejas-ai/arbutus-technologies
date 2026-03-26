"use client";
import React, { useRef, useState } from "react";
import siteData from "@/data/site-data.json";
import { useScrollContext } from "./ScrollContext";

export default function ProductLineCard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedCats, setExpandedCats] = useState<string[]>([]);
    const { containerRef } = useScrollContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const manufacturers = (siteData as any).manufacturers;

    const toggleCategory = (id: string) => {
        setExpandedCats(prev => 
            prev.includes(id) 
                ? prev.filter(c => c !== id) 
                : [...prev, id]
        );
    };

    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        const container = contentRef.current;
        if (element && container) {
            // Ensure the category is expanded on mobile
            if (typeof window !== "undefined" && window.innerWidth < 768) {
                if (!expandedCats.includes(id)) {
                    setExpandedCats(prev => [...prev, id]);
                }
                
                // Small delay to allow expansion transition before measuring position
                setTimeout(() => {
                    const containerTop = container.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: containerTop - 100, behavior: "smooth" });
                    
                    const top = element.offsetTop - 32; 
                    container.scrollTo({ top, behavior: "smooth" });
                    setIsMenuOpen(false);
                }, 100);
                return;
            }

            const top = element.offsetTop - 32; 
            container.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <section id="products" className="relative bg-bg border-y border-stroke overflow-hidden flex flex-col md:flex-row min-h-[800px]">
            {/* Sidebar */}
            <div className={`hidden md:flex w-80 bg-[#020338] shrink-0 z-20 flex-col border-r border-stroke`}>
                <div className="w-full bg-[#010226] p-6 flex items-center justify-between text-white uppercase font-bold tracking-wider text-lg border-b border-stroke">
                    <div className="flex items-center gap-4">
                        <svg className="w-6 h-6 text-[#00b4d8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                        Manufacturers
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {manufacturers.map((cat: any, i: number) => {
                        const catId = `cat-${cat.category.toLowerCase().replace(/\s+/g, '-')}`;
                        return (
                            <button
                                key={i}
                                onClick={() => scrollToCategory(catId)}
                                className="w-full flex items-center justify-between px-6 py-4 text-muted hover:text-white hover:bg-accent/10 transition-all text-left uppercase text-sm font-bold tracking-wide border-b border-stroke/50 group"
                            >
                                {cat.category}
                                <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div ref={contentRef} className="flex-1 relative bg-bg py-16 px-6 md:px-12 overflow-y-auto custom-scrollbar scroll-smooth h-[800px]">
                <div className="max-w-5xl">
                    <div className="mb-12 border-b border-stroke pb-6">
                        <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-2">Reference Portal</span>
                        <h1 className="text-4xl md:text-5xl font-display italic text-text leading-tight">
                            Manufacturers <span className="text-accent">Catalog.</span>
                        </h1>
                    </div>

                    <div className="space-y-4 md:space-y-16">
                        {manufacturers.map((cat: any, i: number) => {
                            const catId = `cat-${cat.category.toLowerCase().replace(/\s+/g, '-')}`;
                            const isExpanded = expandedCats.includes(catId);
                            
                            return (
                                <div key={i} id={catId} className="scroll-mt-8 group/cat">
                                    {/* Category Header / Accordion Trigger */}
                                    <button 
                                        onClick={() => toggleCategory(catId)}
                                        className="w-full flex items-center gap-4 mb-4 md:mb-8 text-left md:pointer-events-none"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ${isExpanded ? "scale-150 shadow-[0_0_10px_#00b4d8]" : "opacity-50"}`} />
                                        <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-sm flex-1">
                                            {cat.category}
                                        </h3>
                                        <div className="hidden md:block flex-1 h-px bg-stroke" />
                                        <svg className={`w-5 h-5 text-accent/50 transition-transform duration-300 md:hidden ${isExpanded ? "rotate-180 text-accent" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    {/* Collapsible Content */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100 mb-8" : "max-h-0 md:max-h-full opacity-0 md:opacity-100"}`}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 pt-2 pb-6 md:py-0 border-l border-white/5 md:border-0 ml-0.5 pl-6 md:pl-0">
                                            {cat.items.map((m: string, j: number) => (
                                                <div key={j} className="flex items-center gap-3 group">
                                                    <div className="w-1 h-1 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                                                    <span className="text-muted group-hover:text-text transition-all duration-300 font-medium text-[13px] uppercase tracking-wider cursor-default">
                                                        {m}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
