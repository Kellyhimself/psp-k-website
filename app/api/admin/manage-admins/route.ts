import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getCallerRole(): Promise<{ userId: string; role: 'content_admin' | 'super_admin' } | null> {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabaseAdmin
    .from('admin_profiles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  // No profile = original admin who hasn't been set up yet → grant super_admin
  return { userId: user.id, role: (profile?.role ?? 'super_admin') as 'content_admin' | 'super_admin' }
}

// GET — list all admin profiles
export async function GET() {
  const caller = await getCallerRole()
  if (!caller) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  if (caller.role !== 'super_admin') return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })

  const { data, error } = await supabaseAdmin
    .from('admin_profiles')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  return NextResponse.json({ success: true, admins: data })
}

// POST — create a new admin user + profile
export async function POST(request: NextRequest) {
  const caller = await getCallerRole()
  if (!caller) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  if (caller.role !== 'super_admin') return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })

  const { email, password, displayName, role } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 })
  }
  if (!['content_admin', 'super_admin'].includes(role)) {
    return NextResponse.json({ success: false, message: 'Invalid role' }, { status: 400 })
  }

  // Create the Supabase auth user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    return NextResponse.json({ success: false, message: authError?.message || 'Failed to create user' }, { status: 500 })
  }

  // Create the admin profile row
  const { error: profileError } = await supabaseAdmin
    .from('admin_profiles')
    .insert({ user_id: authData.user.id, email, display_name: displayName || null, role })

  if (profileError) {
    // Roll back the auth user if profile creation fails
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
    return NextResponse.json({ success: false, message: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: 'Admin created successfully' })
}

// PATCH — change an admin's role
export async function PATCH(request: NextRequest) {
  const caller = await getCallerRole()
  if (!caller) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  if (caller.role !== 'super_admin') return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })

  const { userId, role } = await request.json()

  if (!userId || !role) {
    return NextResponse.json({ success: false, message: 'userId and role are required' }, { status: 400 })
  }
  if (!['content_admin', 'super_admin'].includes(role)) {
    return NextResponse.json({ success: false, message: 'Invalid role' }, { status: 400 })
  }
  if (userId === caller.userId) {
    return NextResponse.json({ success: false, message: 'You cannot change your own role' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('admin_profiles')
    .update({ role })
    .eq('user_id', userId)

  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  return NextResponse.json({ success: true, message: 'Role updated successfully' })
}

// DELETE — remove an admin (deletes auth user, cascades to profile)
export async function DELETE(request: NextRequest) {
  const caller = await getCallerRole()
  if (!caller) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  if (caller.role !== 'super_admin') return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })

  const { userId } = await request.json()

  if (!userId) {
    return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 })
  }
  if (userId === caller.userId) {
    return NextResponse.json({ success: false, message: 'You cannot remove yourself' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 })

  return NextResponse.json({ success: true, message: 'Admin removed successfully' })
}
