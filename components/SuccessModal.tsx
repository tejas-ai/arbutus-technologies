"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, X } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    refId?: string;
    amount?: string;
    summaryItems?: { label: string; value: string }[];
    benefits?: string[];
}

export default function SuccessModal({
    isOpen,
    onClose,
    title = "Inquiry Received!",
    subtitle = "Our technical team is reviewing your request.",
    refId,
    amount,
    summaryItems = [],
    benefits = [
        "High-Precision Component Sourcing",
        "Direct R&D Technical Support",
        "Quality Assurance Certified"
    ]
}: SuccessModalProps) {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const stableRefId = useMemo(
        () => refId ?? "AT-" + Math.floor(100000 + Math.random() * 900000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-2xl overflow-y-auto"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div className="min-h-full flex items-center justify-center p-4 py-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 16 }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[360px] bg-surface rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="relative bg-gradient-to-br from-surface to-bg p-6 pb-5 text-center">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/10"
                                >
                                    <X size={16} />
                                </button>

                                {/* Success Icon */}
                                <div className="w-14 h-14 bg-[#0077b6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0077b6]/30">
                                    <Check className="text-white w-7 h-7" strokeWidth={3} />
                                </div>

                                <p className="text-accent text-[9px] font-black uppercase tracking-[0.35em] mb-1">Confirmed</p>
                                <h2 className="text-2xl font-display italic text-white leading-tight">{title}</h2>

                                {/* Ref ID - compact */}
                                <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                                    <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.3em] mb-1">Relationship ID</p>
                                    <p className="text-accent font-black text-xl tracking-wider">{stableRefId}</p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="p-5 space-y-3">
                                <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.25em] mb-1">Submission Summary</p>

                                {/* Items */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden">
                                    {summaryItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 px-4 py-3">
                                            <span className="text-white/30 text-[9px] font-black uppercase tracking-wider pt-0.5 shrink-0 w-16">{item.label}</span>
                                            <span className="text-white text-[11px] font-bold text-right ml-auto break-all leading-relaxed">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Response time row */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-surface/50 rounded-2xl px-4 py-3 border border-white/5">
                                        <p className="text-white/30 text-[8px] font-black uppercase tracking-wider mb-0.5">Est. Response</p>
                                        <p className="text-accent text-xs font-black italic">Within 24 Hours</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            onClick={() => setShowTooltip(!showTooltip)}
                                            className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent shrink-0"
                                        >
                                            <Info size={16} />
                                        </button>
                                        <AnimatePresence>
                                            {showTooltip && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 6 }}
                                                    className="absolute bottom-full right-0 mb-2 w-56 bg-surface border border-white/10 p-3 rounded-2xl shadow-xl z-50 pointer-events-none"
                                                >
                                                    <p className="text-[10px] text-white/80 leading-relaxed">
                                                        This ID uniquely tracks your requirement across our global supply network.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-white/5 pt-3">
                                    <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.25em] mb-3">Service Guarantee</p>
                                    <div className="space-y-2">
                                        {benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                                                    <Check className="w-2.5 h-2.5 text-accent" strokeWidth={4} />
                                                </div>
                                                <p className="text-white/50 text-[11px] font-medium">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}