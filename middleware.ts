import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect the /studio route
  if (request.nextUrl.pathname.startsWith('/studio')) {
    // Option 1: Basic password protection (simple but not very secure)
    // You can implement a more robust solution with NextAuth.js or similar
    
    // Option 2: IP whitelist (for specific IPs only)
    // const allowedIPs = ['your-ip-address'];
    // const clientIP = request.ip || request.headers.get('x-forwarded-for');
    // if (!allowedIPs.includes(clientIP || '')) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }
    
    // Option 3: Environment-based protection (development only)
    if (process.env.NODE_ENV === 'production') {
      // In production, you might want to:
      // 1. Remove the Studio route entirely
      // 2. Use Sanity's hosted Studio instead
      // 3. Add proper authentication (NextAuth.js, etc.)
      
      // For now, we'll allow it but you should add proper auth
      // return new NextResponse('Studio not available in production', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/studio/:path*',
};

