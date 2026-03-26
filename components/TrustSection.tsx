"use client";
import React from "react";
import siteData from "@/data/site-data.json";
import ScrollReveal from "./ScrollReveal";

export default function TrustSection() {
    const { customers } = siteData.about.profile;

    return (
        <section className="py-20 md:py-32 bg-bg border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                    <ScrollReveal direction="left">
                        <div>
                            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Market Presence</span>
                            <h2 className="text-4xl md:text-5xl font-display italic text-text leading-tight">Trusted by Industry <span className="text-accent">Leaders.</span></h2>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right">
                        <p className="text-muted max-w-md font-medium italic">
                            Partnerships built on technical excellence and reliable delivery across India's premier organizations.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            {/* Infinite Marquee of Customers */}
            <div className="relative flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap gap-8 px-8 will-change-transform items-stretch">
                    {[...customers, ...customers].map((customer: any, i: number) => (
                        <div key={i} className="flex-shrink-0 p-6 md:p-8 rounded-3xl bg-[#020338]/40 border border-white/10 hover:border-accent transition-all flex flex-col justify-center items-center min-w-[260px] md:min-w-[400px] group backdrop-blur-sm">
                            <div className={`relative w-full h-24 md:h-32 mb-6 flex items-center justify-center overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 p-3 group-hover:border-cyan-500/50 transition-colors duration-500 ${customer.whiteBg ? 'bg-white' : 'bg-white/5'}`}>
                                {customer.logo ? (
                                    <img 
                                        src={customer.logo} 
                                        alt={customer.name}
                                        className="max-w-[95%] max-h-full object-contain transition-transform duration-500 group-hover:scale-110 scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-center p-4">
                                        <span className={`text-sm md:text-base font-display font-black italic leading-tight uppercase tracking-wider transition-colors ${customer.whiteBg ? 'text-bg' : 'text-accent/90 group-hover:text-accent'}`}>
                                            {customer.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                {customer.logo && (
                                    <>
                                        <h4 className="text-white font-display text-sm group-hover:text-accent transition-colors leading-tight mb-2 uppercase tracking-[0.2em]">
                                            {customer.name}
                                        </h4>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-pulse" />
                                            <span className="text-[10px] text-muted/60 uppercase tracking-widest font-black italic">{customer.location}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add-on Support Section Snippet for Home */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 mt-24">
                <div className="relative p-6 sm:p-12 lg:p-16 rounded-[3rem] md:rounded-[3.5rem] bg-[#020430] border border-white/5 overflow-hidden group">
                    {/* Background Overlay - More subtle */}
                    <div 
                        className="absolute inset-0 z-0 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity duration-1000 bg-cover bg-center"
                        style={{ backgroundImage: `url('/strategic-sourcing-bg.png')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent z-0" />
                    
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-16 relative z-10">
                        <div className="max-w-xl">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-white mb-6 leading-tight tracking-tight mt-4">Strategic <span className="text-accent">Sourcing.</span></h3>
                            <p className="text-text/50 text-sm md:text-base font-medium leading-relaxed italic mb-10">
                                Direct factory support from global semiconductor majors, ensuring precise technical requirements for prototype and volume production.
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                                {["Active Components", "Global Support", "Authentic Sourcing"].map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] text-white/40 font-black uppercase tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full xl:w-auto">
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-3">
                                {siteData.about.profile.partnerships.brands.slice(0, 14).map((brand: string, i: number) => {
                                    const logoMap: { [key: string]: string } = {
                                        "Mouser Electronics": "/partners/mouser.png",
                                        "DigiKey": "/partners/digikey.png",
                                        "element14": "/partners/element14.png",
                                        "Formike Electronics": "/partners/formike.png",
                                        "EVE Energy": "/partners/eve.png",
                                        "Analog Devices, Inc.": "/partners/analog-devices-logo.png",
                                        "Analog": "/partners/analog-devices-logo.png",
                                        "Microchip": "/partners/microchip-logo.png",
                                        "AMD": "/partners/amd-logo.png",
                                        "Murata": "/partners/murata-logo.png",
                                        "NXP Semiconductors": "/partners/nxp-logo.png",
                                        "Toshiba": "/partners/toshiba-logo.png",
                                        "Vishay": "/partners/vishay-logo.png",
                                        "Fairchild": "/partners/fairchild-logo.png"
                                    };
                                    const logoPath = logoMap[brand] || logoMap[brand.split(' ')[0]] || null;

                                    return (
                                        <div key={i} className="w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 rounded-2xl bg-white/[0.95] flex items-center justify-center p-1.5 md:p-2 transition-all duration-500 hover:-translate-y-1 group/brand">
                                            {logoPath ? (
                                                <img 
                                                    src={logoPath} 
                                                    alt={brand} 
                                                    className="w-full h-full object-contain filter group-hover/brand:scale-110 transition-transform duration-500 scale-105"
                                                />
                                            ) : (
                                                <span className="text-[10px] font-black text-bg/80 uppercase tracking-tighter">
                                                    {brand.split(' ')[0]}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                                <div className="w-20 h-20 xs:w-24 xs:h-24 md:w-28 md:h-28 rounded-2xl bg-accent-gradient flex flex-col items-center justify-center p-2 hover:scale-105 transition-transform">
                                    <span className="text-[9px] md:text-[10px] font-black text-bg uppercase tracking-widest text-center leading-tight">And many <br /> more</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
