'use server'

export async function updateSettings(guildId, data) {
    try {
        const res = await fetch(`${process.env.BOT_API_URL}/api/guilds/${guildId}/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_KEY
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        })
        if (!res.ok) {
            return { error: `API Error: ${res.status}` }
        }
        return res.json()
    } catch (e) {
        return { error: e.message }
    }
}
