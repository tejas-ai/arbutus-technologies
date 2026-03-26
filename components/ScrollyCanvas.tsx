"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

interface ScrollyCanvasProps {
    frameCount?: number;
    sequencePath?: string;
}

export default function ScrollyCanvas({ 
    frameCount = 89, 
    sequencePath = "/sequence/frame_" 
}: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Handle frame index calculation
    const currentFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const preloadImages = async () => {
            const promises = Array.from({ length: frameCount }, (_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    // Assuming frames are 1-indexed and padded: 0001, 0002...
                    img.src = `${sequencePath}${(i + 1).toString().padStart(4, '0')}.webp`;
                    img.onload = () => {
                        loadedCount++;
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback or silent skip if image missing
                        resolve();
                    };
                    loadedImages[i] = img;
                });
            });

            await Promise.all(promises);
            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        preloadImages();
        return () => { isMounted = false };
    }, [frameCount, sequencePath]);

    // Render loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = () => {
            if (images.length === 0) return;

            const frameIndex = Math.round(currentFrame.get());
            const img = images[frameIndex];
            
            // Critical check: ensure image is loaded AND not in a 'broken' state
            if (!img || !img.complete || img.naturalWidth === 0) return;

            // Canvas cover logic (object-fit: cover equivalent)
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width || canvasWidth;
            const imgHeight = img.height || canvasHeight;
            
            const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
            const newWidth = imgWidth * ratio;
            const newHeight = imgHeight * ratio;
            const x = (canvasWidth - newWidth) / 2;
            const y = (canvasHeight - newHeight) / 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, x, y, newWidth, newHeight);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Subscribe to motion value changes
        const unsubscribe = currentFrame.on("change", render);

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [images, currentFrame]);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full block object-cover"
                />
                
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                                Initializing Experience
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
