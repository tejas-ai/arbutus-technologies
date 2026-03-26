"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useScrollContext } from "./ScrollContext";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    yOffset?: number;
    direction?: "up" | "down" | "left" | "right";
    staggerChildren?: number;
    className?: string;
    threshold?: number;
    once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = "fit-content",
    delay = 0.2,
    duration = 0.5,
    yOffset = 50,
    direction = "up",
    staggerChildren = 0.1,
    className = "",
    threshold = 0.1,
    once = true,
}) => {
    const { containerRef } = useScrollContext();
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
        root: containerRef || undefined
    });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getInitialX = () => {
        if (direction === "left") return -yOffset;
        if (direction === "right") return yOffset;
        return 0;
    };

    const getInitialY = () => {
        if (direction === "up") return yOffset;
        if (direction === "down") return -yOffset;
        return 0;
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }} className={className}>
            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        y: getInitialY(),
                        x: getInitialX()
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        transition: {
                            duration: duration,
                            delay: delay,
                            ease: "easeOut",
                            staggerChildren: staggerChildren
                        }
                    },
                }}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
