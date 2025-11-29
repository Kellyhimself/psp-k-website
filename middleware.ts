import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Create response first
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check if Supabase environment variables are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth refresh and return response
  // This allows the site to work even without Supabase configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  // Create Supabase client using shared utility
  try {
    const supabase = createMiddlewareClient(request, response)

    // Refresh session if expired - required for Server Components
    // This ensures auth state is available in Server Components
    await supabase.auth.getUser()
  } catch (error) {
    // Silently handle auth errors in middleware
    // The actual auth check happens in protected routes
    // Log error in production for debugging (optional)
    if (process.env.NODE_ENV === 'production') {
      console.error('Middleware auth error:', error)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

