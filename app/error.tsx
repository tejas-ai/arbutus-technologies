"use client";
import React, { useEffect } from "react";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Caught by Next.js Error Boundary:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-red-500 mb-4">A Runtime Error Occurred</h1>
            <pre className="bg-surface p-4 rounded-lg overflow-auto max-w-4xl text-sm border border-stroke text-red-300">
                {error.message}
                {"\n"}
                {error.stack}
            </pre>
            <button
                onClick={() => reset()}
                className="mt-8 px-6 py-2 bg-text text-bg rounded-full hover:scale-105 transition-transform"
            >
                Try again
            </button>
        </div>
    );
}
