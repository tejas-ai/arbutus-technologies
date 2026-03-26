import { NextResponse } from "next/server";
import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data', 'database.sqlite'));

export async function GET() {
    try {
        const rows = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
        const products = rows.map((p: any) => ({
            ...p,
            images: JSON.parse(p.images || '[]')
        }));
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("DB error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
    }
}
