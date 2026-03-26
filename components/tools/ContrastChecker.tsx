"use client";
import React, { useState } from "react";

const getContrastRatio = (color1: string, color2: string) => {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
};

const getLuminance = (hex: string) => {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!rgb) return 0;
    const r = parseInt(rgb[1], 16) / 255;
    const g = parseInt(rgb[2], 16) / 255;
    const b = parseInt(rgb[3], 16) / 255;
    const res = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return res[0] * 0.2126 + res[1] * 0.7152 + res[2] * 0.0722;
};

export default function ContrastChecker() {
    const [bg, setBg] = useState("#010226");
    const [text, setText] = useState("#00E5FF");

    const ratio = getContrastRatio(bg, text);
    const aaLarge = ratio >= 3;
    const aaNormal = ratio >= 4.5;
    const aaaLarge = ratio >= 4.5;
    const aaaNormal = ratio >= 7;

    return (
        <div className="p-8 rounded-[40px] bg-[#020338]/40 border border-white/10 backdrop-blur-md h-full flex flex-col">
            <div className="mb-10 text-left">
                <h3 className="text-2xl font-display italic text-white mb-1">Contrast Checker</h3>
                <p className="text-xs text-medium uppercase tracking-widest font-black">WCAG Accessibility</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-4">Background</label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                        <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer" />
                        <span className="text-xs font-mono font-bold text-white/70 uppercase">{bg}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-4">Text Color</label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                        <input type="color" value={text} onChange={(e) => setText(e.target.value)} className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer" />
                        <span className="text-xs font-mono font-bold text-white/70 uppercase">{text}</span>
                    </div>
                </div>
            </div>

            <div 
                className="flex-grow rounded-3xl p-8 mb-8 flex flex-col items-start justify-center text-left"
                style={{ backgroundColor: bg, color: text }}
            >
                <h4 className="text-3xl font-display italic mb-2">Display Preview</h4>
                <p className="text-sm font-medium leading-relaxed opacity-90">
                    Precision design ensures content is accessible to everyone. 
                    Testing contrast against global standards.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "AA Large", pass: aaLarge },
                    { label: "AA Normal", pass: aaNormal },
                    { label: "AAA Large", pass: aaaLarge },
                    { label: "AAA Normal", pass: aaaNormal },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${item.pass ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {item.pass ? "PASS" : "FAIL"}
                        </div>
                        <span className="text-[10px] text-white/40 font-bold">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <span className="text-3xl font-mono font-bold text-white">{ratio.toFixed(2)}:1</span>
            </div>
        </div>
    );
}
