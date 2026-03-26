import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, ExternalLink, Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative py-16 md:py-20 bg-[#010226] border-t border-white/5 px-6 md:px-8 transition-all overflow-hidden group/footer">
            {/* Subtle Top Glow */}
            {/* Subtle Top Line Removed */}
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-12 md:mb-16 text-center md:text-left">
                {/* Brand & Mission */}
                <div className="lg:col-span-2 flex flex-col items-center md:items-start">
                    <Link href="/" className="inline-flex items-center gap-4 mb-8 group transition-transform hover:scale-105 active:scale-95 duration-500">
                        <div className="w-24 md:w-40 relative">
                             <img
                                src="/logo-new.png"
                                alt="Arbutus Technologies"
                                className="w-full h-auto object-contain brightness-110"
                            />
                            <div className="absolute -inset-4 bg-white/5 rounded-full -z-10 transition-colors" />
                        </div>
                    </Link>
                    <p className="text-white/80 text-sm md:text-lg max-w-sm leading-relaxed mb-8 italic font-medium mx-auto md:mx-0 font-display">
                        "Leading Professional Distribution Company specializing in Electronic Components and Design Solutions for Global Markets."
                    </p>
                    <div className="flex items-center gap-4 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full group/contact backdrop-blur-sm">
                        <Globe className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/60 group-hover:text-accent transition-colors">Global Distribution Partner</span>
                    </div>
                </div>

                {/* Quick Products */}
                <div>
                    <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 pb-3 border-b border-white/20 inline-block md:block">Expertise</h4>
                    <ul className="space-y-3 md:space-y-4 text-[13px] text-white/60 font-bold">
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/protection-devices" className="hover:text-accent transition-colors">Protection Devices</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/power-devices" className="hover:text-accent transition-colors">Power Electronics</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/memory" className="hover:text-accent transition-colors">Memory Solutions</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/electronic-integrated-circuits" className="hover:text-accent transition-colors">Integrated Circuits</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/sensors" className="hover:text-accent transition-colors">Sensor Systems</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/plugs-sockets" className="hover:text-accent transition-colors">Plugs & Sockets</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/timing-devices" className="hover:text-accent transition-colors">Timing Devices</Link>
                        </li>
                        <li className="flex items-center gap-3 group/item">
                            <div className="w-1 h-1 rounded-full bg-accent/30 group-hover/item:bg-accent transition-all group-hover/item:scale-125" />
                            <Link href="/products/micro-assemblies-cards" className="hover:text-accent transition-colors">Micro-assemblies</Link>
                        </li>
                    </ul>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 pb-3 border-b border-white/20 inline-block md:block">Company</h4>
                    <ul className="space-y-3 md:space-y-4 text-[13px] text-white/60 font-bold">
                        <li><Link href="/about" className="hover:text-accent transition-colors">About History</Link></li>
                        <li><Link href="/line-card" className="hover:text-accent transition-colors">Line Card</Link></li>
                        <li><Link href="/services/rd-capabilities" className="hover:text-accent transition-colors">R&D Center</Link></li>
                        <li className="flex items-center gap-2">
                             <Link href="/contact" className="hover:text-accent transition-colors">Contact Supplier</Link>
                             <ExternalLink className="w-3 h-3 opacity-20" />
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8 pb-3 border-b border-white/20 inline-block md:block">Contact</h4>
                    <div className="space-y-4 md:space-y-5">
                        <div className="flex gap-4 group/box items-start md:items-start text-center md:text-left">
                            <MapPin className="w-5 h-5 text-accent/40 shrink-0 mt-0.5 group-hover/box:text-accent transition-colors hidden md:block" />
                            <p className="text-[11px] text-white/60 leading-relaxed font-bold uppercase tracking-wider">
                                # 497/A, 2nd Floor, 3rd Main, BSK 1st Stage, Srinagar, Bengaluru - 560 050.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start group/box">
                            <Phone className="w-4 h-4 text-accent/40 group-hover/box:text-accent transition-colors shrink-0" />
                            <div className="flex flex-col text-[11px] font-black tracking-widest text-white/60">
                                <span>080-79698832</span>
                                <span>9741102066</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start group/box">
                            <Mail className="w-4 h-4 text-accent/40 group-hover/box:text-accent transition-colors shrink-0" />
                            <a href="mailto:kishore@arbutustech.com" className="text-[11px] text-white/60 hover:text-accent font-black tracking-widest break-all">
                                kishore@arbutustech.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-white/30 text-[9px] uppercase tracking-[0.2em] font-black">
                    <p>© 2026 ARBUTUS TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-3">
                        <span className="opacity-60">GSTIN</span>
                        <span className="text-accent/80 px-4 py-1.5 bg-white/[0.03] rounded-full border border-white/10">29AAPPY6775P1Z3</span>
                    </div>
                </div>
                <div className="flex gap-10 text-[9px] text-white/30 uppercase tracking-[0.3em] font-black">
                    <Link href="#" className="hover:text-accent transition-all hover:tracking-[0.4em] duration-500">Privacy Policy</Link>
                    <Link href="#" className="hover:text-accent transition-all hover:tracking-[0.4em] duration-500">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
