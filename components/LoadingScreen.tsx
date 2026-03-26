"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import './loading.css'; 

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [percent, setPercent] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        // Lock scroll while loading
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent layout shift

        let currentPercent = 0;
        const interval = setInterval(() => {
            if (currentPercent <= 50) {
                let rand = Math.round(Math.random() * 5);
                currentPercent = Math.min(currentPercent + rand, 100);
                setPercent(currentPercent);
            } else if (currentPercent < 100) {
                currentPercent = Math.min(currentPercent + Math.round(Math.random() * 2), 100);
                setPercent(currentPercent);
            }
            
            if (currentPercent >= 100) {
                clearInterval(interval);
            }
        }, 100);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (percent >= 100) {
            const timer1 = setTimeout(() => {
                setLoaded(true);
                const timer2 = setTimeout(() => {
                    setIsLoaded(true);
                }, 1000);
                return () => clearTimeout(timer2);
            }, 600);
            return () => clearTimeout(timer1);
        }
    }, [percent]);

    useEffect(() => {
        if (isLoaded) {
            setClicked(true);
            const timer = setTimeout(() => {
                onComplete();
            }, 1200); 
            return () => clearTimeout(timer);
        }
    }, [isLoaded, onComplete]);

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }

    return (
        <AnimatePresence>
            <div className="loading-root">
                <div className="loading-header" style={{ opacity: clicked ? 0 : 1, transform: clicked ? 'translate(-50%, -20px)' : 'translate(-50%, 0)' }}>
                    <div></div>
                    <div className={`loaderGame ${clicked ? "loader-out" : ""}`}>
                        <div className="loaderGame-container">
                            <div className="loaderGame-in">
                                {[...Array(27)].map((_, index) => (
                                    <div className="loaderGame-line" key={index}></div>
                                ))}
                            </div>
                            <div className="loaderGame-ball"></div>
                        </div>
                    </div>
                </div>

                <div className="loading-screen">
                    <div className="loading-marquee" style={{ opacity: clicked ? 0 : 1 }}>
                        <Marquee speed={100}>
                            <span> Professional Distribution Company • </span>
                            <span> Arbutus Technologies • </span>
                            <span> Global Innovation • </span>
                        </Marquee>
                    </div>
                    <div
                        className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
                        onMouseMove={(e) => handleMouseMove(e)}
                    >
                        <div className="loading-hover"></div>
                        <div className={`loading-button ${loaded ? "loading-complete" : ""}`}>
                            
                            <div className="loading-container">
                                <div className="loading-content">
                                    <div className="loading-content-in">
                                        LOADING <span>{percent}%</span>
                                    </div>
                                </div>
                                <div className="loading-box"></div>
                            </div>
                            <div className="loading-content2">
                                <span>WELCOME</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    );
}