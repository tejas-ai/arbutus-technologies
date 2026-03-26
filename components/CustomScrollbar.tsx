"use client";

import React, { useRef, useEffect, useState } from "react";
import { ScrollProvider } from "./ScrollContext";

export default function CustomScrollbar({ children }: { children: React.ReactNode }) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ height: "0px", transform: "none" });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (window.innerWidth < 768) return;

        const update = () => {
            if (!scrollerRef.current || !thumbRef.current) return;
            const s = scrollerRef.current;
            const h = s.clientHeight;
            const tot = s.scrollHeight;
            if (tot <= h) {
                setStyle({ height: "0px", transform: "none" });
                return;
            }
            const th = (h * h) / tot;
            const f = (h - th) / (tot - h);
            const inv = 1 / f;
            setStyle({
                height: `${th}px`,
                transform: `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,-1) scale(${inv}) translateZ(${(1 - inv)}px) translateZ(-2px)`,
            });
        };

        update();
        window.addEventListener("resize", update);
        const obs = new MutationObserver(update);
        if (scrollerRef.current) obs.observe(scrollerRef.current, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("resize", update);
            obs.disconnect();
        };
    }, []);

    const isDesktop = mounted && typeof window !== "undefined" && window.innerWidth >= 768;

    return (
        <div className="cs-root">
            <ScrollProvider containerRef={scrollerRef}>
                <div ref={scrollerRef} className="cs-scroller">
                    {children}
                    <div className="cs-spacer" />
                </div>
            </ScrollProvider>
            <div className="cs-track"><div ref={thumbRef} className="cs-thumb" style={style} /></div>
            <style jsx global>{`
                ${isDesktop ? `
                    html, body { overflow: hidden; height: 100%; }
                ` : ''}
                .cs-root { position: relative; width: 100%; height: 100vh; overflow: hidden; perspective: 1px; perspective-origin: right top; }
                .cs-scroller { height: 100%; overflow-y: auto; overflow-x: hidden; transform: translateZ(0); scrollbar-width: none; }
                .cs-scroller::-webkit-scrollbar { display: none; }
                .cs-track { position: absolute; top: 0; right: 4px; width: 6px; height: 100%; pointer-events: none; z-index: 9999; }
                .cs-thumb { width: 100%; background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.3)); backdrop-filter: blur(4px); border-radius: 100px; pointer-events: auto; border: 1px solid rgba(255,255,255,0.1); }
                
                @media (max-width: 767px) {
                    .cs-root { height: auto; overflow: visible; perspective: none; }
                    .cs-scroller { height: auto; overflow: visible; overflow-x: hidden; scrollbar-width: auto; }
                    .cs-scroller::-webkit-scrollbar { display: block; width: 4px; }
                    .cs-scroller::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                    .cs-track { display: none; }
                }
            `}</style>
        </div>
    );
}
