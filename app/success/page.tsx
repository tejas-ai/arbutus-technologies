"use client";
import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Info, Home, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const [relationshipId, setRelationshipId] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [copied, setCopied] = useState(false);
    
    // Data from URL params
    const name = searchParams.get("name") || "Subscriber";
    const email = searchParams.get("email") || "---";
    const company = searchParams.get("company") || "Individual";
    const type = searchParams.get("type") || "General Inquiry";
    const product = searchParams.get("product");
    const qty = searchParams.get("qty");

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const random = Math.floor(100000 + Math.random() * 900000);
        setRelationshipId(`AT-${random}`);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(relationshipId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const summaryItems = [
        { label: "Full Name", value: name },
        { label: "Company", value: company },
        { label: "Type", value: type },
        { label: "Email", value: email }
    ];

    if (product) {
        summaryItems.splice(2, 0, { label: "Product", value: product });
        summaryItems.push({ label: "Quantity", value: qty || "1 Unit" });
    }

    return (
        <main className="bg-[#050a1f] min-h-screen relative overflow-hidden selection:bg-accent/30">
            <Navbar />
            
            {/* Background Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />

            <div className="pt-32 pb-24 px-4 sm:px-6 md:px-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[480px] bg-[#020512] border border-white/10 rounded-[42px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden relative"
                >
                    <button className="absolute top-8 right-8 p-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all">
                        <Link href="/"><Home className="w-5 h-5" /></Link>
                    </button>

                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute inset-x-8 top-32 bottom-24 bg-[#050a1f]/95 backdrop-blur-xl z-50 rounded-3xl border border-white/10 p-8 flex flex-col items-center text-center shadow-2xl"
                            >
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                                    <Info className="w-6 h-6 text-accent" />
                                </div>
                                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-4">Response Policy</h2>
                                <p className="text-white/60 text-sm leading-relaxed mb-6">
                                    Our executive team has received your inquiry. A technical specialist will review your requirements and reach out within 24 business hours.
                                </p>
                                <div className="space-y-4 text-left w-full mb-8">
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        </div>
                                        <p className="text-[12px] text-white/50 font-medium">Keep your Relationship ID for any technical follow-ups.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        </div>
                                        <p className="text-[12px] text-white/50 font-medium">A confirmation email has been sent to your inbox.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowInfo(false)}
                                    className="mt-auto w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                                >
                                    Got it
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-10 flex flex-col items-center">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(0,180,216,0.3)] relative group">
                            <div className="absolute inset-0 bg-accent blur-xl opacity-40 rounded-2xl" />
                            <Check className="w-10 h-10 text-white relative z-10 stroke-[3px]" />
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2 block">Confirmed</span>
                            <h1 className="text-4xl md:text-[44px] font-display italic text-white tracking-tight leading-none">Inquiry Received!</h1>
                        </div>

                        {/* ID Box */}
                        <button 
                            onClick={handleCopy}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-6 mb-10 text-center relative overflow-hidden group transition-all hover:bg-white/[0.05] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 block mb-2 group-hover:text-accent transition-colors">
                                {copied ? "Copied to Clipboard!" : "Relationship ID (Click to Copy)"}
                            </span>
                            <span className="text-3xl font-black text-accent tracking-tight">{relationshipId}</span>
                        </button>

                        {/* Summary Section */}
                        <div className="w-full space-y-4 mb-10">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-4">Submission Summary</h3>
                            <div className="space-y-4">
                                {summaryItems.map((item, i) => (
                                    <div key={i} className="flex justify-between items-baseline gap-4 group/item">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 shrink-0">{item.label}</span>
                                        <span className="text-[13px] font-bold text-white text-right break-all leading-tight">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Response Box */}
                        <div className="w-full flex items-center gap-4 mb-10">
                            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-1 items-start">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Est. Response</span>
                                <span className="text-sm font-black text-accent italic uppercase tracking-wider">Within 24 Hours</span>
                            </div>
                            <button 
                                onClick={() => setShowInfo(true)}
                                className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-accent/60 hover:text-accent hover:bg-accent/10 transition-all active:scale-95"
                            >
                                <Info className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Guarantees */}
                        <div className="w-full space-y-4 mb-10">
                             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Service Guarantee</h3>
                             <div className="space-y-3">
                                {[
                                    "High-Precision Component Sourcing",
                                    "Direct R&D Technical Support",
                                    "Quality Assurance Certified"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full border border-accent/40 flex items-center justify-center bg-accent/10">
                                            <Check className="w-3 h-3 text-accent" />
                                        </div>
                                        <span className="text-[12px] font-bold text-white/70">{text}</span>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Actions */}
                        <div className="w-full flex flex-col gap-3">
                            <Link href="/" className="w-full py-4 bg-white text-bg rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all text-center">
                                Close & Home
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050a1f] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
