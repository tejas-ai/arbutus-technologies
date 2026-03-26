"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Layers, Cpu, Box, Clock, Database, Zap, Activity, Shield, 
    ChevronRight, ArrowRight, Grid3X3
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Define your types
interface SubItemLink {
    name: string;
    path: string;
}

interface MenuSection {
    title: string;
    items: SubItemLink[];
}

interface NavSubItem {
    name: string;
    path: string;
    icon?: React.ReactNode;
    sections?: MenuSection[];
    subItems?: SubItemLink[];
}

interface NavItem {
    name: string;
    path: string;
    hasDropdown?: boolean;
    items?: NavSubItem[];
}

interface DesktopMegaMenuProps {
    item: NavItem;
    isDropdownOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

// --- Improved Framer Motion Variants ---
const menuVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" },
    visible: { 
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as any } 
    },
    exit: { 
        opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)",
        transition: { duration: 0.3 } 
    }
};

const DesktopMegaMenu = ({ item, isDropdownOpen, onMouseEnter, onMouseLeave }: DesktopMegaMenuProps) => {
    if (!item.items) return null;

    return (
        <AnimatePresence>
            {isDropdownOpen && (
                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className="absolute top-full pt-3 z-[60] left-0 right-0 flex justify-center w-full"
                >
                    {/* The "Safety Bridge" - invisible div to prevent closure when moving mouse down */}
                    <div className="absolute top-0 left-0 right-0 h-4 cursor-default" />

                    <div className="w-[1100px] max-w-[calc(100vw-80px)] bg-[#010e30] border border-white/10 rounded-[48px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden relative mx-auto">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
                        
                        <div className="grid grid-cols-4 gap-6">
                            {item.items.map((subItem, idx) => (
                                <Link
                                    key={subItem.name}
                                    href={subItem.path}
                                    className="group/card relative h-full bg-white/[0.03] border border-white/5 rounded-[32px] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-accent/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover/card:scale-105 transition-all duration-500">
                                                {subItem.icon || <Box className="w-6 h-6" />}
                                            </div>
                                            <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover/card:opacity-100 transition-all duration-500 hover:bg-accent hover:text-[#050B26]">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-black text-white uppercase tracking-tighter group-hover/card:text-accent transition-colors mb-4">
                                            {subItem.name}
                                        </h3>

                                        {/* Sub-links or "Featured" items */}
                                        {subItem.sections && (
                                            <div className="space-y-2 mt-auto">
                                                {subItem.sections.slice(0, 3).map((section) => (
                                                    <div key={section.title} className="text-[11px] font-bold text-white/30 truncate flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-accent/40" />
                                                        {section.title}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {!subItem.sections && (
                                            <p className="text-[12px] font-medium text-white/30 mt-auto italic">
                                                Professional grade solutions
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

import { createPortal } from "react-dom";

const MobileMenu = ({ isOpen, onClose, navLinks }: { isOpen: boolean; onClose: () => void; navLinks: NavItem[] }) => {
    // We only want to render the portal on the client
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] md:hidden"
                    style={{ isolation: 'isolate' }}
                >
                    {/* Backdrop Layer */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#010226]/80 backdrop-blur-2xl pointer-events-auto"
                    />

                    {/* Menu Content Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#010e30] border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)] flex flex-col pt-8 pointer-events-auto"
                    >
                        {/* Fixed Header */}
                        <div className="flex items-center justify-between px-8 mb-6 shrink-0 h-16">
                            <div className="w-24 relative h-8">
                                <Image
                                    src="/logo-new.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/70 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable Links Container */}
                        <div 
                            className="flex-1 overflow-y-auto px-8 pb-32 custom-scrollbar overscroll-contain"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            {navLinks.map((item, idx) => (
                                <div key={item.name} className="mb-10 last:mb-0">
                                    <Link
                                        href={item.path}
                                        onClick={onClose}
                                        className="block text-2xl font-black text-white uppercase tracking-tighter mb-4 hover:text-accent transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    
                                    {item.items && (
                                        <div className="space-y-8 pl-4 border-l border-white/5">
                                            {item.items.map((sub) => (
                                                <div key={sub.name}>
                                                    <Link 
                                                        href={sub.path}
                                                        onClick={onClose}
                                                        className="flex items-center gap-2 text-sm font-black text-white/40 uppercase tracking-widest hover:text-accent transition-colors mb-4"
                                                    >
                                                        <ChevronRight className="w-4 h-4 text-accent" />
                                                        {sub.name}
                                                    </Link>
                                                    
                                                    {sub.sections && (
                                                        <div className="grid gap-6 pl-6">
                                                            {sub.sections.map((section) => (
                                                                <div key={section.title}>
                                                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-3">{section.title}</div>
                                                                    <div className="flex flex-col gap-3">
                                                                        {section.items.map((ssi) => (
                                                                            <Link 
                                                                                key={ssi.name} 
                                                                                href={ssi.path}
                                                                                onClick={onClose}
                                                                                className="text-[14px] text-white/50 hover:text-white font-bold transition-colors"
                                                                            >
                                                                                {ssi.name}
                                                                        </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Fixed Bottom CTA */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10 bg-[#010e30]/90 backdrop-blur-md z-10">
                            <Link 
                                href="/contact"
                                onClick={onClose}
                                className="w-full h-14 bg-accent text-[#010e30] font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                            >
                                CONTACT <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const NAV_LINKS: NavItem[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Products",
        path: "/products/electronic-integrated-circuits",
        hasDropdown: true,
        items: [
            { name: "PCB", path: "/products/electronic-integrated-circuits#misc", icon: <Layers className="w-5 h-5" /> },
            { 
                name: "Electronic Components", 
                path: "/products/electronic-integrated-circuits#ic",
                icon: <Cpu className="w-5 h-5" />
            },
            { 
                name: "Passive Components", 
                path: "/products/electronic-integrated-circuits#passive",
                icon: <Box className="w-5 h-5" />,
                sections: [
                    {
                        title: "Magnetic Components",
                        items: [
                            { name: "Transformers", path: "/products/passive-components/transformers" },
                            { name: "Inductors", path: "/products/passive-components/inductors" },
                            { name: "Magnetic Cores", path: "/products/passive-components/cores" }
                        ]
                    },
                    {
                        title: "Capacitors",
                        items: [
                            { name: "Ceramic Capacitors", path: "/products/passive-components/ceramic" },
                            { name: "Electrolytic", path: "/products/passive-components/electrolytic" },
                            { name: "Tantalum", path: "/products/passive-components/tantalum" }
                        ]
                    },
                    {
                        title: "Resistors",
                        items: [
                            { name: "Fixed Resistors", path: "/products/passive-components/fixed" },
                            { name: "Variable Resistors", path: "/products/passive-components/variable" },
                            { name: "Potentiometers", path: "/products/passive-components/pot" }
                        ]
                    }
                ]
            },
            { 
                name: "Timing Devices", 
                path: "/products/timing-devices",
                icon: <Clock className="w-5 h-5" />,
                sections: [
                    {
                        title: "Standard Timing",
                        items: [
                            { name: "Crystal Units", path: "/products/timing-devices/crystal-units" },
                            { name: "Resonators", path: "/products/timing-devices/resonators" }
                        ]
                    },
                    {
                        title: "Oscillators",
                        items: [
                            { name: "Crystal Oscillators", path: "/products/timing-devices/crystal-oscillators" },
                            { name: "Clock Oscillators", path: "/products/timing-devices/clock" }
                        ]
                    },
                    {
                        title: "Filters",
                        items: [
                            { name: "Ceramic Filters", path: "/products/timing-devices/ceramic" },
                            { name: "SAW Filters", path: "/products/timing-devices/saw" }
                        ]
                    }
                ]
            },
            { 
                name: "Memory", 
                path: "/products/memory",
                icon: <Database className="w-5 h-5" />,
                sections: [
                    {
                        title: "Flash Memory",
                        items: [
                            { name: "NOR Flash", path: "/products/memory/nor" },
                            { name: "NAND Flash", path: "/products/memory/nand" },
                            { name: "Managed NAND", path: "/products/memory/managed" }
                        ]
                    },
                    {
                        title: "Dynamic RAM",
                        items: [
                            { name: "DRAM ICs", path: "/products/memory/dram" },
                            { name: "SDRAM", path: "/products/memory/sdram" }
                        ]
                    },
                    {
                        title: "Specialty Memory",
                        items: [
                            { name: "NVRAM", path: "/products/memory/nvram" },
                            { name: "SRAM", path: "/products/memory/sram" },
                            { name: "EPROM/PROM", path: "/products/memory/eprom" }
                        ]
                    }
                ]
            },
            { 
                name: "Sensor", 
                path: "/products/sensors",
                icon: <Zap className="w-5 h-5" />,
                sections: [
                    {
                        title: "Physical Sensors",
                        items: [
                            { name: "Vibration Sensors", path: "/products/sensors/vibration" },
                            { name: "Accelerometers", path: "/products/sensors/accelerometers" },
                            { name: "Position Sensors", path: "/products/sensors/position" }
                        ]
                    },
                    {
                        title: "Environmental",
                        items: [
                            { name: "Humidity/Temp", path: "/products/sensors/humidity-temp" },
                            { name: "Pressure Sensors", path: "/products/sensors/pressure" }
                        ]
                    },
                    {
                        title: "Magnetic & Photo",
                        items: [
                            { name: "Hall Effect", path: "/products/sensors/hall-effect" },
                            { name: "Photoelectric", path: "/products/sensors/photoelectric" },
                            { name: "Current Sensors", path: "/products/sensors/current" }
                        ]
                    }
                ]
            },
            { 
                name: "Power Devices", 
                path: "/products/power-devices",
                icon: <Activity className="w-5 h-5" />,
                sections: [
                    {
                        title: "Discrete Power",
                        items: [
                            { name: "Diodes", path: "/products/power-devices/diode" },
                            { name: "Transistors", path: "/products/power-devices/transistors" },
                            { name: "Thyristors", path: "/products/power-devices/thyristors" }
                        ]
                    },
                    {
                        title: "Power Switching",
                        items: [
                            { name: "MOSFETs", path: "/products/power-devices/mosfets" },
                            { name: "IGBTs", path: "/products/power-devices/igbt" },
                            { name: "SCRs", path: "/products/power-devices/scr" }
                        ]
                    }
                ]
            },
            { 
                name: "Protection Devices", 
                path: "/products/protection-devices",
                icon: <Shield className="w-5 h-5" />,
                sections: [
                    {
                        title: "Overcurrent",
                        items: [
                            { name: "Resettable Fuses", path: "/products/protection-devices/ptc-fuses" },
                            { name: "Circuit Breakers", path: "/products/protection-devices/circuit-breakers" },
                            { name: "Standard Fuses", path: "/products/protection-devices/fuses" }
                        ]
                    },
                    {
                        title: "Overvoltage",
                        items: [
                            { name: "Surge Suppressors", path: "/products/protection-devices/surge-suppressors" },
                            { name: "TVS Diodes", path: "/products/protection-devices/tvs-diodes" },
                            { name: "GDTs", path: "/products/protection-devices/gdt" }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: "R&D",
        path: "/services/rd-capabilities",
    },
    {
        name: "Line Card",
        path: "/line-card",
    },
    {
        name: "About",
        path: "/about",
    }
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeHash, setActiveHash] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Optimized Hover Logic with Delay (prevents flickering)
    const handleMouseEnter = (name: string, hasDropdown: boolean) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredPath(name);
        if (hasDropdown) setActiveDropdown(name);
        else setActiveDropdown(null);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
            setHoveredPath(null);
        }, 150); // Small grace period
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const updateHash = () => setActiveHash(window.location.hash);
        updateHash();
        window.addEventListener("hashchange", updateHash);
        return () => window.removeEventListener("hashchange", updateHash);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }
        return () => { 
            document.body.style.overflow = "unset"; 
            document.documentElement.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setActiveHash(window.location.hash);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className={cn(
                "fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-500 px-4",
                isScrolled && "top-4 scale-[0.96]"
            )}>
                {/* Main Glass Container */}
                <div className="flex items-center bg-[#010226]/60 border border-white/10 rounded-[28px] p-2 shadow-[0_32px_64px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-[32px] relative">

                    {/* Logo Area */}
                    <Link
                        href="/"
                        className="flex items-center justify-center w-32 h-10 transition-all active:scale-95 shrink-0 ml-1 group"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src="/logo-new.png"
                                alt="Arbutus Technologies"
                                fill
                                sizes="(max-width: 768px) 100vw, 128px"
                                className="object-contain transition-transform group-hover:scale-105"
                                priority
                            />
                        </div>
                    </Link>

                    <div className="w-[1px] h-5 bg-white/10 mx-3 hidden md:block" />

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1 px-1" onMouseLeave={handleMouseLeave}>
                        {NAV_LINKS.map((item) => {
                            const isActive = item.path.startsWith("/#")
                                ? activeHash === item.path.slice(1)
                                : pathname === item.path && !activeHash;

                            const isDropdownOpen = activeDropdown === item.name;

                            return (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => handleMouseEnter(item.name, !!item.hasDropdown)}
                                >
                                    <Link
                                        href={item.path}
                                        className={cn(
                                            "relative px-6 py-3 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 rounded-[20px] flex items-center gap-2",
                                            isActive || isDropdownOpen ? "text-white" : "text-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {item.hasDropdown && (
                                            <svg 
                                                className={cn("w-2.5 h-2.5 transition-transform duration-500", isDropdownOpen && "rotate-180")} 
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        )}                                
                                         {/* Active State: Frosted Glass Pill */}
                                         {isActive && (
                                             <motion.div
                                                 layoutId="activePill"
                                                 className="absolute inset-0 bg-white/[0.08] rounded-[20px] border border-white/10"
                                                 initial={false}
                                                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                             />
                                         )}
     
                                         {/* Hover State: Subtle Highlight */}
                                         {hoveredPath === item.name && !isActive && (
                                             <motion.div
                                                 layoutId="hoverPill"
                                                 className="absolute inset-0 bg-white/[0.03] rounded-[20px]"
                                                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                             />
                                         )}
                                     </Link>
                                 </div>
                             );
                         })}
    
                         {/* Dropdown Menu - Moved outside the loop for stable positioning */}
                         {activeDropdown && (
                            <DesktopMegaMenu
                               item={NAV_LINKS.find(l => l.name === activeDropdown)!}
                               isDropdownOpen={!!activeDropdown}
                               onMouseEnter={() => {
                                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                               }}
                               onMouseLeave={handleMouseLeave}
                            />
                         )}
                     </div>

                    <div className="w-[1px] h-5 bg-white/10 mx-3 hidden md:block" />

                    {/* Contact CTA */}
                    <Link
                        href="/contact"
                        className="hidden md:flex relative items-center justify-center px-8 py-3 text-[12px] font-black uppercase tracking-widest text-[#010e30] bg-[#00E5FF] hover:bg-white transition-all active:scale-95 rounded-[20px] shrink-0 mr-1 group gap-2"
                    >
                        Contact
                        <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-3 mx-2 text-white/70 hover:text-white bg-white/5 rounded-2xl border border-white/10"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="w-4 h-3 flex flex-col justify-between items-end">
                            <span className={cn("h-[1.5px] bg-current transition-all rounded-full", isMobileMenuOpen ? "w-full rotate-45 translate-y-[5px]" : "w-full")} />
                            <span className={cn("h-[1.5px] bg-current transition-all rounded-full", isMobileMenuOpen ? "opacity-0" : "w-3/4")} />
                            <span className={cn("h-[1.5px] bg-current transition-all rounded-full", isMobileMenuOpen ? "w-full -rotate-45 -translate-y-[5px]" : "w-1/2")} />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay - Moved outside the transformed nav tag */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={NAV_LINKS}
            />
        </>
    );
}
