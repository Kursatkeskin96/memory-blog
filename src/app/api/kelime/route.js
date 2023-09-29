import db from "@/lib/db";
import { verifyJwtToken, verifyToken } from '@/lib/jwt'
import Word from "@/models/Word";
export const revalidate = 0; //revalidate api every 1 second

export async function GET(req) {
    await db.connect()

    try {
        const words = await Word.find({}).limit(16).populate("authorId")
        return new Response(JSON.stringify(words), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await db.connect()

    const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const newWord = await Word.create(body)

        return new Response(JSON.stringify(newWord), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}