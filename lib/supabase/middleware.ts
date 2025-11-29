import { createServerClient } from '@supabase/ssr'
import type { NextRequest, NextResponse } from 'next/server'

/**
 * Creates a Supabase client for use in middleware
 * This is separate from server.ts because middleware uses NextRequest/NextResponse
 * instead of the cookies() helper from next/headers
 * 
 * This ensures consistency across the project while handling the different
 * cookie APIs between middleware and server components
 */
export function createMiddlewareClient(
  request: NextRequest,
  response: NextResponse
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
    )
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Update request cookies
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        // Update response cookies
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })
}

