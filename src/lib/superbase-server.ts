import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const superbaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const superbasePublisingKey= process.env.NEXT_PUBLIC_SUPABASE_PUBLISHING_KEY || ''

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    superbaseUrl,
    superbasePublisingKey,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
