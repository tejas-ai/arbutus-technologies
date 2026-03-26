"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SuccessModal from "./SuccessModal";

export default function ContactSection() {
    const [formData, setFormData] = React.useState({
        name: "",
        company: "",
        email: "",
        message: "",
        _hp: "" // Honeypot field
    });

    // Separate state specifically for what was submitted — never cleared
    const [submittedData, setSubmittedData] = React.useState<{
        name: string;
        company: string;
        email: string;
        message: string;
    } | null>(null);

    const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Freeze the values into a plain JS object right now, before anything changes
        const frozen = {
            name: formData.name,
            company: formData.company,
            email: formData.email,
            message: formData.message
        };

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: frozen.name,
                    company: frozen.company,
                    email: frozen.email,
                    content: frozen.message,
                    product: "General Inquiry"
                })
            });

            if (res.ok) {
                // 1. Store submitted snapshot FIRST
                setSubmittedData(frozen);
                // 2. Clear form
                setFormData({ name: "", company: "", email: "", message: "", _hp: "" });
                // 3. Open modal
                setStatus("success");
            } else {
                const data = await res.json();
                alert(data.error || "Submission Failed");
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-16 px-6 md:py-24 md:px-8 bg-bg relative overflow-hidden border-t border-white/5 text-left">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-20 text-center">
                    <span className="text-xs text-[#00b4d8] font-black uppercase tracking-[0.4em] block mb-4 md:mb-6">Bengaluru, India</span>
                    <h2 className="font-display italic text-3xl sm:text-4xl md:text-6xl text-white leading-tight tracking-tight">
                        Contact Our <span className="text-[#00b4d8]">Technical Experts.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#020338]/40 backdrop-blur-md p-6 sm:p-10 md:p-16 rounded-[30px] md:rounded-[40px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                    >
                        <h3 className="text-3xl font-display italic text-white mb-2">Detailed Inquiry Form</h3>
                        <p className="text-white/60 text-sm mb-12 italic font-medium">For bulk component quotes or R&D consultation.</p>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-[#00b4d8]/50 font-black ml-4">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#1A4D8F] border border-white/10 hover:border-white rounded-2xl px-6 py-3.5 md:py-4 text-white focus:border-white transition-all outline-none font-medium placeholder:text-white/50"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-[#00b4d8]/50 font-black ml-4">Company</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-[#1A4D8F] border border-white/10 hover:border-white rounded-2xl px-6 py-3.5 md:py-4 text-white focus:border-white transition-all outline-none font-medium placeholder:text-white/50"
                                        placeholder="Tech Solutions Ltd"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-[#00b4d8]/70 font-black ml-4">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0066a8] border border-white/10 hover:border-white rounded-2xl px-6 py-3.5 md:py-4 text-white focus:border-white transition-all outline-none font-medium placeholder:text-white/50"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-[#00b4d8]/70 font-black ml-4">Message / Requirements</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#0066a8] border border-white/10 hover:border-white rounded-2xl px-6 py-3.5 md:py-4 text-white focus:border-white transition-all outline-none font-medium placeholder:text-white/50"
                                    placeholder="Specify Part Numbers or Project Scope..."
                                />
                            </div>

                            <div className="hidden" aria-hidden="true">
                                <input
                                    type="text"
                                    name="_hp"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData._hp}
                                    onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                                />
                            </div>

                            <button
                                disabled={status === "submitting"}
                                className={`w-full py-4 md:py-5 bg-[#00E5FF] text-[#050B26] rounded-2xl font-bold hover:bg-[#00F0FF] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {status === "submitting"
                                    ? "Submitting..."
                                    : status === "success"
                                        ? "Requirement Submitted ✓"
                                        : status === "error"
                                            ? "Submission Failed. Try Again."
                                            : "Submit Technical Request ↗"}
                            </button>
                        </form>

                        {/* Only render modal after submittedData is actually set */}
                        {submittedData && (
                            <SuccessModal
                                isOpen={status === "success"}
                                onClose={() => setStatus("idle")}
                                summaryItems={[
                                    { label: "Full Name", value: submittedData.name },
                                    { label: "Company", value: submittedData.company },
                                    { label: "Type", value: "General Inquiry" },
                                    { label: "Email", value: submittedData.email }
                                ]}
                            />
                        )}
                    </motion.div>

                    <div className="space-y-12">
                        <div className="grid grid-cols-1 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-8 md:p-10 rounded-3xl border border-white/10 bg-[#020338]/40 backdrop-blur-md group hover:border-[#00b4d8]/40 transition-all shadow-sm hover:shadow-lg text-left"
                            >
                                <h4 className="text-2xl font-display italic text-white mb-4">Head Office</h4>
                                <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
                                    # 497/A, 2nd Floor, 3rd Main, BSK 1st Stage, Srinagar, Bengaluru - 560050.
                                </p>
                                <div className="space-y-2">
                                    <p className="text-[#00b4d8] font-mono text-sm font-bold">kishore@arbutustech.com</p>
                                    <p className="text-[#00b4d8] font-mono text-sm font-bold">080-79698832</p>
                                    <p className="text-[#00b4d8] font-mono text-sm font-bold">9741102066</p>
                                    <p className="text-white font-mono text-xs mt-4 pt-4 border-t border-white/10 inline-block font-black uppercase tracking-[0.2em] opacity-80">
                                        Kishore Kumar Yadur
                                    </p>
                                </div>
                            </motion.div>


                        </div>

                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-gradient opacity-10 blur-[150px] rounded-full translate-x-1/2 -z-10" />
        </section>
    );
}