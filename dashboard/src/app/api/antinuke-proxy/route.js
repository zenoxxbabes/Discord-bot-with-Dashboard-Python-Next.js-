import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const guildId = searchParams.get('guildId')
    const data = await req.json()

    try {
        const res = await fetch(`${process.env.BOT_API_URL}/api/guilds/${guildId}/antinuke`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_KEY
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        })

        return NextResponse.json(await res.json())
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
