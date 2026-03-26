"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import siteData from "@/data/site-data.json";

export default function DesignServices() {
    const content = siteData.capabilities;

    return (
        <section id="design" className="relative py-16 md:py-24 bg-surface px-6 md:px-8 border-b border-stroke overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-60 pointer-events-none"
                style={{
                    backgroundImage: `url('/section-bg/bg-new-3.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />
            <div className="absolute inset-0 bg-[#010226]/80 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    <div>
                        <span className="text-xs text-text font-bold tracking-[0.3em] uppercase block mb-6">{content.header}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display italic text-text mb-8 md:mb-12">
                            {content.title}
                        </h2>
                        <p className="text-text leading-relaxed mb-8 md:mb-12 max-w-md italic text-lg opacity-90">
                            {content.description}
                        </p>
                        <div className="flex flex-col gap-8">
                            <div className="inline-block px-6 py-3 rounded-2xl bg-bg border border-stroke shadow-2xl w-fit">
                                <span className="text-xs text-accent font-bold tracking-widest uppercase">One-stop Sourcing & Design Solution provider</span>
                            </div>
                            <Link href="/services/rd-capabilities" className="inline-block text-accent font-medium text-lg hover:-translate-y-1 hover:text-white transition-all duration-300">
                                View Full R&D Capabilities ↗
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-8">
                        {content.services.map((service: string, index: number) => (
                            <div key={index} className="border-b border-stroke pb-6 group backdrop-blur-[2px]">
                                <div className="flex gap-4 items-start">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent-gradient flex-shrink-0" />
                                    <h4 className="text-lg font-medium text-text group-hover:translate-x-2 transition-transform duration-300">
                                        {service}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
