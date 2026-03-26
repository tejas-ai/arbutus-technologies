"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";

const roles = ["Innovative", "Reliable", "Precise", "Global"];

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".name-reveal", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.1,
        }).to(
            ".blur-in",
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 1,
                stagger: 0.1,
            },
            "-=0.9"
        );

        const roleInterval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);

        return () => {
            tl.kill();
            clearInterval(roleInterval);
        };
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg">
            <Navbar />
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/corporate-consultation.jpg"
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
                >
                    <source
                        src="/hero-bg.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010226] to-transparent" />
            </div>
            <div className="relative z-10 text-center px-4 max-w-5xl pt-32 pb-32">
                <div className="blur-in flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-8 bg-[#00b4d8]/50" />
                    <span className="block text-[10px] sm:text-xs text-[#00b4d8] font-black uppercase tracking-[0.5em]">
                        ESTABLISHED 2013 | BENGALURU, INDIA
                    </span>
                    <div className="h-px w-8 bg-[#00b4d8]/50" />
                </div>
                
                <h1 className="name-reveal font-display italic text-4xl sm:text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] tracking-tighter text-white mb-10 will-change-[transform,opacity] px-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    Arbutus <br className="md:hidden" /> <span className="text-white/40">Technologies</span>
                </h1>
                
                <div className="blur-in flex flex-col items-center gap-6 mb-12 md:mb-16">
                    <p className="text-sm md:text-2xl lg:text-3xl text-white/80 font-medium px-4 will-change-[transform,opacity] max-w-3xl leading-relaxed">
                        Providing <span key={roles[roleIndex]} className="font-display italic text-[#00b4d8] animate-fade-in inline-block border-b border-[#00b4d8]/30 pb-1">{roles[roleIndex]}</span> design & engineering solutions.
                    </p>
                    <p className="text-xs md:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto font-bold px-6 will-change-[transform,opacity] uppercase tracking-widest italic">
                        The Global Distribution Partner of choice for <span className="text-white">Professional Electronic Components</span>.
                    </p>
                </div>

                <div className="blur-in flex flex-col sm:flex-row gap-6 justify-center will-change-[transform,opacity]">
                    <Link href="/products/electronic-integrated-circuits" className="group relative px-10 py-5 bg-white text-[#010e30] rounded-full transition-all hover:scale-105 hover:bg-[#00E5FF] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                        <span className="relative z-10 block uppercase tracking-[0.2em] font-black text-xs">
                            View Components
                        </span>
                        <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
                    </Link>
                    <Link href="/services/rd-capabilities" className="group relative px-10 py-5 bg-transparent text-white rounded-full border border-white/20 transition-all hover:scale-105 hover:border-[#00E5FF] hover:text-[#00E5FF] flex items-center justify-center backdrop-blur-sm">
                        <span className="relative z-10 block px-1 uppercase tracking-[0.2em] font-black text-xs">
                            Design Hub ↗
                        </span>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs text-white/60 uppercase tracking-[0.3em] font-black">SCROLL</span>
                <div className="w-px h-10 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00b4d8] animate-scroll-down" />
                </div>
            </div>
        </section>
    );
}
