import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MissionSection from "@/components/MissionSection";
import BrandPartners from "@/components/BrandPartners";
import siteData from "@/data/site-data.json";
import db from "@/lib/db";

async function getAboutData() {
    try {
        const result = await db.execute({
            sql: 'SELECT content FROM site_content WHERE key = ?',
            args: ['main']
        });
        const row = result.rows[0];
        const data = row ? JSON.parse(row.content as string)?.about : null;
        return data || null;
    } catch {
        return null;
    }
}

export default async function AboutPage() {
    const aboutData = await getAboutData();
    const profile = aboutData?.profile || (siteData as any).about.profile;

    const headerTitle = aboutData?.header?.title || (siteData as any).about.title;
    const contentHeading = aboutData?.header?.header || (siteData as any).about.header;
    const paragraphs = aboutData?.paragraphs || (siteData as any).about.paragraphs || [];

    return (
        <main className="bg-bg min-h-screen">
            <Navbar />

            {/* Minimal Hero for Inner Page */}
            <div className="pt-32 md:pt-48 pb-12 md:pb-24 px-6 md:px-8 border-b border-stroke">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <span className="text-accent text-xs font-black uppercase tracking-[0.4em] block mb-4 md:mb-6 px-1">
                        Established 2013 | ISO Certified
                    </span>
                    <h1 className="font-display italic text-5xl md:text-8xl lg:text-9xl text-text leading-[1.1] md:leading-[0.9] tracking-tight mb-8">
                        The Arbutus <br className="hidden md:block" /> <span className="text-accent">Profile.</span>
                    </h1>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="py-24 px-8 border-b border-stroke bg-surface/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="sticky top-40">
                        <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Introduction</span>
                        <h2 className="text-4xl md:text-5xl font-display italic text-text leading-tight mb-8">
                            A Decade of <span className="text-accent">Technical Excellence.</span>
                        </h2>
                        <div className="flex items-center gap-6 mb-8 group cursor-default">
                            <div className="px-5 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest">
                                Incorporation Date: {profile.incorporationDate}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8 text-muted leading-relaxed text-lg font-medium">
                        {paragraphs.map((p: string, i: number) => (
                            <p key={i} className="first:text-white first:text-xl">{p}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* High-Visibility Tree Hierarchy Section */}
            <section id="profile-diagram" className="py-32 md:py-48 px-8 border-b border-stroke relative overflow-hidden bg-bg">
                {/* Subtle Midnight Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-display italic text-text mb-8 tracking-tight">
                            Arbutus <span className="text-accent underline decoration-accent/30 underline-offset-8">Technologies</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed italic">
                            A highly specialized technology enterprise delivering excellence through integrated semiconductor sourcing and bespoke embedded engineering.
                        </p>
                    </div>

                    {/* Hierarchy Layout Container */}
                    <div className="flex flex-col items-center justify-center space-y-12 md:space-y-32">
                        {/* Corporate HQ Node */}
                        <div className="relative group grayscale hover:grayscale-0 transition-all duration-700 z-30">
                            <div className="p-6 md:p-14 rounded-[16px] md:rounded-[24px] bg-[#0A1647]/50 backdrop-blur-2xl border border-white/10 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:border-accent/40 transition-all duration-500">
                                <span className="text-accent text-[8px] md:text-xs font-bold tracking-[0.4em] uppercase block mb-3 md:mb-6">Corporate HQ</span>
                                <h3 className="text-xl md:text-5xl font-display italic text-white tracking-tight">Arbutus <br className="md:hidden" /> Technologies</h3>
                            </div>
                        </div>

                        {/* Hierarchical Tree Logic - Responsive Horizontal Branching */}
                        <div className="w-full relative px-2">
                            {/* Branching Connectors - Precision Aligned Grid */}
                            <div className="absolute inset-x-0 -top-12 md:-top-32 bottom-0 pointer-events-none z-20">
                                {/* Top Vertical Stem (From HQ to Center) */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-12 md:h-32 bg-accent shadow-[0_0_1px_rgba(0,229,255,0.4)]" />
                                
                                {/* Junction Node */}
                                <div className="absolute top-12 md:top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-accent z-30 border-4 border-bg" />

                                {/* Dual Branching Grid - ALWAYS centered on cards */}
                                <div className="absolute top-12 md:top-32 inset-x-0 max-w-6xl mx-auto grid grid-cols-2 h-12 md:h-20">
                                    {/* Left Hand Hook */}
                                    <div className="relative border-t-[3px] border-l-[3px] md:border-l-[3px] border-accent rounded-tl-[16px] md:rounded-tl-[32px] w-[calc(50%+1.5px)] ml-[calc(50%-1.5px)] h-full" />
                                    {/* Right Hand Hook */}
                                    <div className="relative border-t-[3px] border-r-[3px] md:border-r-[3px] border-accent rounded-tr-[16px] md:rounded-tr-[32px] w-[calc(50%+1.5px)] mr-[calc(50%-1.5px)] h-full" />
                                </div>
                            </div>

                            {/* Lower Division Cards Container - SIDE-BY-SIDE ON MOBILE */}
                            <div className="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-20 w-full pt-10 md:pt-20 relative max-w-6xl mx-auto justify-center items-stretch">
                                {profile.divisions.map((div: any, i: number) => (
                                    <div key={i} className="relative group flex justify-center w-[165px] md:w-full shrink-0">
                                        <div className="w-full p-4 md:p-12 rounded-[16px] md:rounded-[18px] bg-[#0A1647]/60 backdrop-blur-xl border border-white/10 text-center transition-all duration-500 hover:border-accent/40 shadow-2xl">
                                            {/* Label Badge */}
                                            <div className="inline-block px-2 py-1 rounded-full bg-turquoise_surf/10 border border-turquoise_surf/20 text-turquoise_surf text-[7px] md:text-[10px] uppercase tracking-[0.2em] font-black mb-4 md:mb-8">
                                                {i === 0 ? "STRATEGIC SOURCING" : "TECHNICAL INNOVATION"}
                                            </div>
                                            
                                            <h4 className="text-xs md:text-3xl font-display font-bold italic text-white mb-3 md:mb-6 tracking-tight group-hover:text-[#3BD3FF] transition-colors leading-tight">
                                                {div.name}
                                            </h4>
                                            
                                            <p className="text-white/70 leading-relaxed font-medium text-[9px] md:text-lg px-px md:px-2">
                                                {div.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategies & Strengths */}
            <section className="py-32 px-8 bg-surface/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <div className="mb-12">
                            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">How We Work</span>
                            <h2 className="text-4xl md:text-5xl font-display italic text-text">Business <span className="text-accent">Strategies.</span></h2>
                        </div>
                        <div className="space-y-6">
                            {profile.strategies.map((strat: string, i: number) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#020338]/40 border border-stroke/50 group hover:border-accent/30 transition-all">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                                    <p className="text-white/80 font-medium leading-relaxed">{strat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="mb-12">
                            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Our Edge</span>
                            <h2 className="text-4xl md:text-5xl font-display italic text-text">Core <span className="text-accent">Strengths.</span></h2>
                        </div>
                        <div className="space-y-6">
                            {profile.strengths.map((strength: string, i: number) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-bg border border-accent/10 hover:border-accent/40 transition-all group">
                                    <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <p className="text-white group-hover:text-accent font-bold transition-colors">{strength}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Design & Development */}
            <section className="py-32 px-8 bg-surface/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.012] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Innovation & Engineering</span>
                            <h2 className="text-5xl md:text-6xl font-display italic text-text mb-8">Design & <br /><span className="text-accent">Development.</span></h2>
                            <p className="text-muted leading-relaxed font-medium text-xl mb-12">
                                {profile.design_development?.overview}
                            </p>
                            
                            <div className="p-8 rounded-[2.5rem] bg-accent-gradient border border-accent/30 group hover:scale-[1.01] transition-all duration-500">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-bg/20 backdrop-blur-xl flex items-center justify-center text-bg border border-bg/10">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-bg text-xs uppercase tracking-[0.2em] font-black mb-1">R&D Center</p>
                                        <p className="text-bg/80 font-bold">Cutting-edge Hardware & Software Laboratory</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            {profile.design_development?.capabilities.map((cap: string, i: number) => (
                                <div key={i} className="p-10 rounded-3xl bg-surface border border-stroke hover:border-accent/30 transition-all group flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors italic">
                                            {cap}
                                        </h4>
                                        <div className="flex items-center gap-3 text-muted">
                                            <div className="w-8 h-px bg-accent/30" />
                                            <span className="text-[10px] uppercase tracking-widest font-black opacity-60">Technical Capability</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Plan / Roadmap */}
            <section className="py-32 px-8 bg-surface/5 border-b border-stroke relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.012] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Strategic Vision</span>
                        <h2 className="text-4xl md:text-6xl font-display italic text-text mb-6">Future <span className="text-accent">Roadmap.</span></h2>
                        <p className="text-muted max-w-2xl mx-auto font-medium text-sm md:text-base px-4">Outlining our specialized focus and market expansion strategies for the next technical frontier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {profile.business_plan?.points.map((point: string, i: number) => (
                            <div key={i} className="flex gap-8 p-10 rounded-[2.5rem] bg-bg/40 border border-stroke/50 group hover:border-accent/40 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                                
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform border border-accent/20">
                                    <span className="text-xl font-display italic font-bold">0{i + 1}</span>
                                </div>
                                
                                <div>
                                    <p className="text-white text-lg font-bold leading-relaxed mb-4 group-hover:text-accent transition-colors">
                                        {point}
                                    </p>
                                    <div className="flex items-center gap-3 text-muted">
                                        <div className="w-8 h-px bg-accent/30 group-hover:w-12 transition-all" />
                                        <span className="text-[10px] uppercase tracking-widest font-black opacity-60">Strategic Pillar</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <MissionSection />
            <BrandPartners />
            <Footer />
        </main>
    );
}
