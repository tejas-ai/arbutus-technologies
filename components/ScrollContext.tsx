"use client";

import React, { createContext, useContext, useRef, RefObject } from "react";

interface ScrollContextType {
    containerRef: RefObject<HTMLDivElement | null> | null;
}

const ScrollContext = createContext<ScrollContextType>({ containerRef: null });

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{
    children: React.ReactNode;
    containerRef: RefObject<HTMLDivElement | null>;
}> = ({ children, containerRef }) => {
    return (
        <ScrollContext.Provider value={{ containerRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
