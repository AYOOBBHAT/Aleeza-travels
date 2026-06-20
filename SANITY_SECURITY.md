# Sanity Studio Security Guide

## 🔐 Understanding Sanity Security

### Is `NEXT_PUBLIC_SANITY_PROJECT_ID` Safe?

**YES!** The Project ID being public is **completely safe**. Here's why:

1. **It's just an identifier** - Like a username, not a password
2. **No write access** - The Project ID alone cannot modify content
3. **Authentication required** - Sanity Studio requires users to log in with their Sanity account
4. **Permission-based** - Only users you invite to your Sanity project can edit content

### How Sanity Authentication Works

1. User visits `/studio`
2. Sanity Studio loads (Project ID is visible in code - this is OK)
3. User must **log in** with their Sanity account
4. Sanity checks if the user has **permissions** for your project
5. Only authorized users can edit content

## 🛡️ Securing Your Studio

### Option 1: Use Sanity's Hosted Studio (Recommended for Production)

Instead of embedding Studio in your Next.js app, use Sanity's hosted Studio:

```bash
npm run sanity:deploy
```

This deploys to: `https://your-project.sanity.studio`

**Benefits:**
- ✅ Separate domain (not on your public site)
- ✅ Sanity handles all security
- ✅ Better performance
- ✅ No need to expose Studio route

**Setup:**
1. Deploy Studio: `npm run sanity:deploy`
2. Remove or protect `/studio` route in your Next.js app
3. Access Studio at `https://your-project.sanity.studio`

### Option 2: Restrict Studio Route (Current Setup)

If you want to keep Studio in your Next.js app:

#### A. Development Only
Remove Studio route in production builds:

```typescript
// app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return <div>Studio not available in production</div>
  }
  
  return <NextStudio config={config} />
}
```

#### B. Add Password Protection
Use middleware or a simple password check:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const authHeader = request.headers.get('authorization');
    const password = process.env.STUDIO_PASSWORD;
    
    if (authHeader !== `Basic ${btoa(`admin:${password}`)}`) {
      return new NextResponse('Unauthorized', { 
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Studio"' }
      });
    }
  }
  return NextResponse.next();
}
```

#### C. IP Whitelist
Restrict to specific IP addresses:

```typescript
// middleware.ts
const allowedIPs = ['your-office-ip', 'your-home-ip'];

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for');
    if (!allowedIPs.includes(clientIP || '')) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  return NextResponse.next();
}
```

#### D. Use NextAuth.js (Most Secure)
Implement proper authentication:

```typescript
// app/studio/[[...tool]]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function StudioPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/api/auth/signin');
  }
  
  return <NextStudio config={config} />
}
```

## 🔑 API Tokens (Never Make Public!)

**IMPORTANT:** If you need to write data from your Next.js app (not Studio), you'll need an API token:

```env
# ❌ NEVER use NEXT_PUBLIC_ prefix for tokens!
SANITY_API_TOKEN=your-secret-token-here
```

This should:
- ✅ Be in `.env.local` (not committed)
- ✅ Use `SANITY_API_TOKEN` (not `NEXT_PUBLIC_SANITY_API_TOKEN`)
- ✅ Only be used in Server Components/API routes
- ✅ Never be exposed to the client

## 📋 Best Practices

### For Production:
1. ✅ Use Sanity's hosted Studio (`npm run sanity:deploy`)
2. ✅ Remove `/studio` route from Next.js app
3. ✅ Keep Project ID public (it's safe)
4. ✅ Never expose API tokens

### For Development:
1. ✅ Keep Studio route for easy access
2. ✅ Use `.env.local` for all secrets
3. ✅ Don't commit `.env.local` to git

### Current Setup:
- ✅ Project ID is public (safe)
- ✅ Studio requires Sanity login (secure)
- ⚠️ Studio route is accessible to anyone who knows the URL
- 💡 Consider adding additional protection or using hosted Studio

## 🚨 What's Actually Secure

| Item | Public? | Risk |
|------|---------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | None - just an identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Yes | None - just a dataset name |
| Studio Route (`/studio`) | ⚠️ Accessible | Low - requires Sanity login |
| API Token | ❌ Never | High - can write data |

## 📚 Resources

- [Sanity Authentication](https://www.sanity.io/docs/authentication)
- [Sanity Permissions](https://www.sanity.io/docs/permissions)
- [Deploying Studio](https://www.sanity.io/docs/deployment)

---

**Bottom Line:** Your current setup is secure because Sanity requires authentication. The Project ID being public is intentional and safe. For extra security in production, use Sanity's hosted Studio instead.

