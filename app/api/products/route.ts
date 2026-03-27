import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    try {
        const result = await db.execute('SELECT * FROM products ORDER BY id ASC');
        const products = result.rows.map((p: any) => ({
            ...p,
            images: JSON.parse(p.images || '[]')
        }));
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
    }
}
