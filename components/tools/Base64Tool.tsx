"use client";
import React, { useState } from "react";

export default function Base64Tool() {
    const [input, setInput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const result = React.useMemo(() => {
        try {
            if (!input) return "";
            return mode === "encode" ? btoa(input) : atob(input);
        } catch (e) {
            return "Invalid input for " + mode;
        }
    }, [input, mode]);

    return (
        <div className="p-8 rounded-[40px] bg-[#020338]/40 border border-white/10 backdrop-blur-md h-full flex flex-col">
            <div className="mb-10 flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-display italic text-white mb-1">Data Converter</h3>
                    <p className="text-xs text-medium uppercase tracking-widest font-black">Base64 Encoding</p>
                </div>
                <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                    <button 
                        onClick={() => setMode("encode")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === "encode" ? 'bg-accent text-bg shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Encode
                    </button>
                    <button 
                        onClick={() => setMode("decode")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === "decode" ? 'bg-accent text-bg shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow mb-8">
                <div className="space-y-4 flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-4">Input</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                        className="flex-grow w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-accent outline-none transition-all resize-none italic font-medium"
                    />
                </div>
                <div className="space-y-4 flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black ml-4">Output</label>
                    <div className="flex-grow w-full bg-[#0a133d] border border-white/10 rounded-2xl p-6 text-sm text-accent font-mono break-all overflow-y-auto">
                        {result || <span className="text-white/10 italic">Result will appear here...</span>}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText(result);
                        alert("Result copied!");
                    }}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all shadow-xl"
                >
                    Copy Result ↗
                </button>
            </div>
        </div>
    );
}
