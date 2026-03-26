"use client";
import React, { useRef, useState, useEffect } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    X,
    RotateCcw,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0.1);
    const [showControls, setShowControls] = useState(true);

    // NEW: Hover states for the frame-by-frame effect
    const [hoverPercent, setHoverPercent] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleRestart = () => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
        setHasEnded(false);
    };

    // Updated: Smooth seeking
    const handleProgressChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const target = e.target as HTMLInputElement;
        const newPercent = parseFloat(target.value);
        const newTime = (newPercent / 100) * duration;
        
        // Seek the video immediately
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // NEW: Calculate hover position for the "ghost" bar
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.min(Math.max(0, x / rect.width), 1) * 100;
        setHoverPercent(percent);
    };

    const [isBuffering, setIsBuffering] = useState(false);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const handleTimeUpdate = () => {
            if (!isDragging) {
                setCurrentTime(v.currentTime);
            }
        };
        const handleLoadedMetadata = () => setDuration(v.duration);
        const handleEnded = () => { setHasEnded(true); setIsPlaying(false); };
        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);

        v.addEventListener("timeupdate", handleTimeUpdate);
        v.addEventListener("loadedmetadata", handleLoadedMetadata);
        v.addEventListener("ended", handleEnded);
        v.addEventListener("waiting", handleWaiting);
        v.addEventListener("playing", handlePlaying);

        return () => {
            v.removeEventListener("timeupdate", handleTimeUpdate);
            v.removeEventListener("loadedmetadata", handleLoadedMetadata);
            v.removeEventListener("ended", handleEnded);
            v.removeEventListener("waiting", handleWaiting);
            v.removeEventListener("playing", handlePlaying);
        };
    }, []);



    const currentPercent = (currentTime / duration) * 100 || 0;

    return (
        <section className="px-6 md:px-8 pt-12 md:pt-20 bg-bg transition-all duration-700">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onMouseMove={() => setShowControls(true)}
                    className="rounded-[20px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-3xl relative group bg-black aspect-video md:aspect-[21/9]"
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        muted={isMuted}
                        playsInline
                        onClick={togglePlay}
                        className="w-full h-full object-cover cursor-pointer"
                    >
                        <source src="/Arbutus__Your_One-Stop_Partner.mp4" type="video/mp4" />
                    </video>

                    {/* YouTube Style Controls Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Control Bar */}
                    <div className={`absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>

                        {/* THE PROGRESS BAR CONTAINER */}
                        <div
                            className="w-full px-2 mb-2 pointer-events-auto relative group/progress flex items-center h-6 cursor-pointer"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* Background Bar */}
                            <div className="absolute left-2 right-2 h-1 bg-white/20 rounded-full group-hover/progress:h-1.5 transition-all" />

                            {/* Hover "Ghost" Bar (The Frame-by-Frame hint) */}
                            {isHovering && (
                                <div
                                    className="absolute left-2 h-1 group-hover/progress:h-1.5 bg-white/30 pointer-events-none transition-all"
                                    style={{ width: `calc(${hoverPercent}% - 8px)` }}
                                />
                            )}

                            {/* Actual Progress Red Bar */}
                            <div
                                className="absolute left-2 h-1 group-hover/progress:h-1.5 bg-red-600 pointer-events-none transition-all z-10"
                                style={{ width: `calc(${currentPercent}% - 8px)` }}
                            />

                            {/* THE SCRUBBER INPUT */}
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="0.01" // Increased precision for smoother frame-by-frame
                                value={currentPercent}
                                onMouseDown={() => {
                                    setIsDragging(true);
                                    if(videoRef.current) videoRef.current.pause(); // Optional: pause while scrubbing like YT
                                }}
                                onMouseUp={() => {
                                    setIsDragging(false);
                                    if(isPlaying && videoRef.current) videoRef.current.play();
                                }}
                                onChange={handleProgressChange}
                                onInput={handleProgressChange} // This is the key for real-time jumping
                                className="w-full h-full opacity-0 absolute inset-0 z-20 cursor-pointer"
                            />
                        </div>

                        {/* Bottom Row Controls */}
                        <div className="flex items-center justify-between pointer-events-auto px-2">
                            <div className="flex items-center gap-4">
                                <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                                    {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                                </button>
                                <button onClick={toggleMute} className="text-white">
                                    {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                                </button>
                                <span className="text-white text-xs font-mono">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                /* Target the red circle (thumb) specifically */
                input[type='range'] {
                    -webkit-appearance: none;
                    background: transparent;
                }
                /* Customize Thumb to appear on hover only, like YT */
                .group\\/progress:hover input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 14px;
                    width: 14px;
                    border-radius: 50%;
                    background: #ff0000;
                    cursor: pointer;
                    margin-top: -4px;
                }
            `}</style>
        </section>
    );
}