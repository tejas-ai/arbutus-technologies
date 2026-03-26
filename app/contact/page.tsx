"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";

interface ContactFormProps {
    status: "idle" | "submitting" | "success" | "error";
    setStatus: (status: "idle" | "submitting" | "success" | "error") => void;
    setSubmittedData: (data: { name: string; company: string; email: string; type: string } | null) => void;
}

function ContactForm({ status, setStatus, setSubmittedData }: ContactFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const subject = searchParams.get("subject") || "";
    const messageParam = searchParams.get("message") || "";

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        type: "Component Sourcing (Bulk)",
        message: ""
    });

    useEffect(() => {
        if (messageParam || subject) {
            setFormData(prev => ({
                ...prev,
                message: messageParam,
                type: subject.includes("Requirement") ? "Component Sourcing (Bulk)" : prev.type
            }));
        }
    }, [messageParam, subject]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    company: formData.company,
                    email: formData.email,
                    subject: formData.type,
                    content: formData.message
                })
            });

            if (res.ok) {
                setSubmittedData({
                    name: formData.name,
                    company: formData.company,
                    email: formData.email,
                    type: formData.type
                });
                const params = new URLSearchParams({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company || "N/A",
                    type: formData.type
                });
                setFormData({ name: "", company: "", email: "", type: "Component Sourcing (Bulk)", message: "" });
                router.push(`/success?${params.toString()}`);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-4">Full Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-accent/50 transition-all outline-none placeholder:text-white/20 font-medium"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-4">Company</label>
                    <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-accent/50 transition-all outline-none placeholder:text-white/20 font-medium"
                        placeholder="Tech Solutions Ltd"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-4">Email Address</label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-accent/50 transition-all outline-none placeholder:text-white/20 font-medium"
                    placeholder="john@company.com"
                />
            </div>

            <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-4">Inquiry Type</label>
                <div className="relative">
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-accent/50 transition-all outline-none appearance-none font-medium"
                    >
                        <option>Component Sourcing</option>
                        <option>Custom R&D / Design</option>
                        <option>Partnership Inquiry</option>
                        <option>Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 ml-4">Message / Requirements</label>
                <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-accent/50 transition-all outline-none placeholder:text-white/20 font-medium resize-none"
                    placeholder="Specify Part Numbers or Project Scope..."
                />
            </div>

            <button
                disabled={status === "submitting"}
                className="w-full py-5 bg-[#00E5FF] text-[#050B26] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#00F0FF] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
                <span>{status === "submitting" ? "Submitting..." : status === "success" ? "Requirement Submitted ✓" : status === "error" ? "Submission Failed" : "Submit Technical Request"}</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </button>
        </form>
    );
}

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [submittedData, setSubmittedData] = useState<{
        name: string;
        company: string;
        email: string;
        type: string;
    } | null>(null);

    return (
        <main className="bg-bg min-h-screen">
            <Navbar />

            <div className="pt-32 md:pt-48 pb-12 md:pb-24 px-6 md:px-8 border-b border-white/5 bg-bg">
                <div className="max-w-7xl mx-auto">
                    <span className="text-accent text-[10px] md:text-xs font-black uppercase tracking-[0.4em] block mb-8">Bengaluru, India</span>
                    <h1 className="font-display italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-text leading-[1.1] md:leading-[0.9] tracking-tight mb-10">
                        Contact Our <br className="hidden md:block" /> <span className="text-accent underline decoration-accent/10 underline-offset-[12px]">Technical Experts.</span>
                    </h1>
                    <p className="text-text/70 leading-relaxed font-medium text-lg md:text-xl font-display italic max-w-2xl">
                        Discuss your global component sourcing or custom industrial R&D requirements with our Bengaluru-based team.
                    </p>
                </div>
            </div>

            <section className="py-24 px-8 bg-bg relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-surface/30 backdrop-blur-md p-10 md:p-16 rounded-[40px] border border-stroke"
                    >
                        <h3 className="text-3xl font-display italic text-text mb-4">Detailed Inquiry Form</h3>
                        <p className="text-muted text-sm mb-12 italic">For bulk component quotes or R&D consultation.</p>

                        <Suspense fallback={<div className="text-muted italic">Loading form...</div>}>
                            <ContactForm 
                                status={status} 
                                setStatus={setStatus} 
                                setSubmittedData={setSubmittedData}
                            />
                        </Suspense>
                    </motion.div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[40px] border border-white/5 bg-white/[0.03] group hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] pointer-events-none" />
                                <div className="w-16 h-16 rounded-full bg-[#0077b6] flex items-center justify-center text-white mb-8 border border-white/20 shadow-lg">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h4 className="text-3xl font-display italic text-white mb-6">Head Office</h4>
                                <p className="text-white/60 text-base leading-relaxed mb-8 italic font-display font-medium">
                                    # 497/A, 2nd Floor, 3rd Main, BSK 1st Stage, Srinagar, Bengaluru - 560050.
                                </p>
                                <div className="space-y-3 font-mono text-sm">
                                    <p className="text-accent hover:text-white transition-colors cursor-pointer">kishore@arbutustech.com</p>
                                    <p className="text-accent">080-79698832</p>
                                    <p className="text-accent">9741102066</p>
                                </div>
                            </motion.div>


                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-gradient opacity-10 blur-[150px] rounded-full translate-x-1/2" />
            </section>

            <Footer />

            {/* SuccessModal removed in favor of /success redirect */}
        </main>
    );
}

