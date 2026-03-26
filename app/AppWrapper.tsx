"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomScrollbar from "@/components/CustomScrollbar";

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>
            
            <div 
                style={{ 
                    opacity: isLoading ? 0 : 1, 
                    pointerEvents: isLoading ? 'none' : 'auto',
                    visibility: isLoading ? 'hidden' : 'visible',
                    transition: 'opacity 1.2s ease-in-out',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <CustomScrollbar>
                    {children}
                </CustomScrollbar>
            </div>
        </>
    );
}
