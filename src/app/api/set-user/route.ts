import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { user } = await req.json();
  console.log(user)
    const cookieStore = await cookies();
    cookieStore.set('access_token', JSON.stringify(user.access_token), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    });

    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
}