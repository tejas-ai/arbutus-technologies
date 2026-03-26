"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const generatePalette = (baseColor: string) => {
    // Very simple palette generation logic for demonstration
    // In a real app, we'd use a library like 'chroma-js' or 'tinycolor2'
    return [
        baseColor,
        adjustBrightness(baseColor, 20),
        adjustBrightness(baseColor, -20),
        adjustBrightness(baseColor, 40),
        adjustBrightness(baseColor, -40),
    ];
};

const adjustBrightness = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
};

export default function ColorPalette() {
    const [baseColor, setBaseColor] = useState("#00E5FF");
    const [palette, setPalette] = useState(generatePalette("#00E5FF"));

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setBaseColor(color);
        setPalette(generatePalette(color));
    };

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        alert(`Copied ${hex} to clipboard!`);
    };

    return (
        <div className="p-8 rounded-[40px] bg-[#020338]/40 border border-white/10 backdrop-blur-md h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-display italic text-white mb-1">Color Palette</h3>
                    <p className="text-xs text-medium uppercase tracking-widest font-black">Harmonious Generators</p>
                </div>
                <input 
                    type="color" 
                    value={baseColor} 
                    onChange={handleColorChange}
                    className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer overflow-hidden p-0"
                />
            </div>

            <div className="grid grid-cols-5 gap-3 flex-grow mb-8">
                {palette.map((color, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => copyToClipboard(color)}
                        className="group relative flex flex-col items-center gap-4 cursor-pointer"
                    >
                        <div 
                            className="w-full aspect-[2/3] rounded-2xl shadow-xl transition-shadow group-hover:shadow-accent/20"
                            style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] font-mono font-bold text-white/50 group-hover:text-accent transition-colors uppercase">
                            {color}
                        </span>
                    </motion.div>
                ))}
            </div>

            <p className="text-[10px] text-white/30 italic text-center">Click any swatch to copy HEX code</p>
        </div>
    );
}
