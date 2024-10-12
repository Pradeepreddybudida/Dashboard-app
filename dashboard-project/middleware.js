// middleware.js
import { NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';

export async function middleware(req) {
  const session = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
