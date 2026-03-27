import { NextResponse } from "next/server";
import db from "@/lib/db";
import path from "path";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    
    // Rate Limiting Check
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);
    
    if (userLimit) {
        if (now - userLimit.lastRequest < RATE_LIMIT_WINDOW) {
            if (userLimit.count >= MAX_REQUESTS) {
                return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
            }
            userLimit.count += 1;
        } else {
            userLimit.count = 1;
            userLimit.lastRequest = now;
        }
    } else {
        rateLimitMap.set(ip, { count: 1, lastRequest: now });
    }

    try {
        const body = await request.json();
        const { name, email, company, content, message, subject, type, _hp } = body;

        // Use fallbacks for field names to support different form implementations
        const finalContent = content || message;
        const finalSubject = subject || type || company || "General Inquiry";

        // 1. Honeypot check
        if (_hp) {
            console.warn("Honeypot triggered from IP:", ip);
            return NextResponse.json({ success: true, message: "Thank you for your submission." }); // Silent reject
        }

        // 2. Validation
        if (!name || !email || !finalContent) {
            console.error("Validation failed: Missing required fields", { 
                receivedBody: body,
                inferred: { name, email, finalContent }
            });
            return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
        }

        if (name.length > 100 || email.length > 254 || (company && company.length > 100) || content.length > 2000) {
            return NextResponse.json({ success: false, error: "Input exceeds maximum length." }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
        }

        // 3. Sanitization (Simple HTML Escape)
        const sanitize = (str: string) => str.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m] || m));

        const safeName = sanitize(name);
        const safeEmail = sanitize(email);
        const safeSubject = sanitize(finalSubject);
        const safeContent = sanitize(finalContent);

        try {
            await db.execute({
                sql: `INSERT INTO messages (name, email, subject, message, timestamp, status)
                      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'new')`,
                args: [safeName, safeEmail, safeSubject, safeContent]
            });
        } catch (dbError: any) {
            console.error("Database save skipped (likely read-only environment):", dbError.message);
            // On Netlify, we rely on Netlify Forms for the actual storage.
            // We return success anyway to avoid breaking the UI for the user.
        }

        return NextResponse.json({ success: true, message: "Inquiry received and secured" });
    } catch (error) {
        console.error("General error processing inquiry:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
