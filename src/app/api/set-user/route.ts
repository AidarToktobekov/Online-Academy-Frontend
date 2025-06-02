import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { user } = await req.json();

    const cookieStore = await cookies();

    cookieStore.set('user', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    });

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
}