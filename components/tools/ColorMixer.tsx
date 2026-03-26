"use client";
import React, { useState } from "react";

const mixColors = (color1: string, color2: string, weight: number) => {
    const p = weight / 100;
    const w = p * 2 - 1;
    const a = 0; // alpha

    const w1 = (((w * 1 === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0);
    const w2 = 1 - w1;

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r * w1 + rgb2.r * w2);
    const g = Math.round(rgb1.g * w1 + rgb2.g * w2);
    const b = Math.round(rgb1.b * w1 + rgb2.b * w2);

    return rgbToHex(r, g, b);
};

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export default function ColorMixer() {
    const [color1, setColor1] = useState("#00E5FF");
    const [color2, setColor2] = useState("#0a133d");
    const [weight, setWeight] = useState(50);

    const mixedColor = mixColors(color1, color2, weight);

    return (
        <div className="p-8 rounded-[40px] bg-[#020338]/40 border border-white/10 backdrop-blur-md h-full flex flex-col">
            <div className="mb-10">
                <h3 className="text-2xl font-display italic text-white mb-1">Color Mixer</h3>
                <p className="text-xs text-medium uppercase tracking-widest font-black">Blend & Interpolate</p>
            </div>

            <div className="flex items-center gap-8 mb-12">
                <div className="flex-1 flex flex-col items-center gap-4">
                    <input 
                        type="color" 
                        value={color1} 
                        onChange={(e) => setColor1(e.target.value)}
                        className="w-16 h-16 rounded-2xl bg-transparent border-none cursor-pointer p-0"
                    />
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase">{color1}</span>
                </div>
                
                <div className="flex-[2] space-y-4">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={weight} 
                        onChange={(e) => setWeight(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-[10px] font-black text-white/30 tracking-widest uppercase">
                        <span>Color 1</span>
                        <span>{weight}%</span>
                        <span>Color 2</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-4">
                    <input 
                        type="color" 
                        value={color2} 
                        onChange={(e) => setColor2(e.target.value)}
                        className="w-16 h-16 rounded-2xl bg-transparent border-none cursor-pointer p-0"
                    />
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase">{color2}</span>
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center gap-6">
                <div 
                    className="w-full h-32 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden group"
                    style={{ backgroundColor: mixedColor }}
                    onClick={() => navigator.clipboard.writeText(mixedColor)}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm cursor-pointer">
                        <span className="text-white font-black text-xs tracking-widest border border-white/20 px-4 py-2 rounded-full">COPY HEX</span>
                    </div>
                </div>
                <span className="text-2xl font-mono font-bold text-white tracking-tight">{mixedColor}</span>
            </div>
        </div>
    );
}
