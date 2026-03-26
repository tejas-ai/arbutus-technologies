import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "./AppWrapper";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: "italic",
    variable: "--font-display",
});

export const metadata: Metadata = {
    title: "Arbutus Technologies",
    description: "Leading Professional Distribution Company of Electronic Components and Design Solutions",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
            <body className="antialiased bg-bg text-text font-body selection:bg-accent selection:text-white">
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}
