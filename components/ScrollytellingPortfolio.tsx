"use client";
import React from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import Projects from "./Projects";

export default function ScrollytellingPortfolio() {
    return (
        <>
            {/* Scrollytelling Section (Z-indexed base) */}
            <div className="relative">
                <ScrollyCanvas />
                <Overlay />
            </div>

            {/* Content following the sticky animation */}
            <Projects />
        </>
    );
}
