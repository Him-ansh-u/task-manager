import { createSupabaseServerClient } from '@/lib/superbase-server'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  try {
    const supabase =await createSupabaseServerClient()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data.user })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: `Invalid request: ${errorMessage}` }, { status: 400 })
  }
}
