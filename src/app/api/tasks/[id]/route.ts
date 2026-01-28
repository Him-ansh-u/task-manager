import { createSupabaseServerClient } from '@/lib/superbase-server'
import { NextResponse } from 'next/server'

export async function DELETE(
  _request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const { id } = await params

  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
