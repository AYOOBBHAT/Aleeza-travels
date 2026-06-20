# Deployment Guide - Correct Setup

## 🚀 How to Deploy Sanity Studio (Correct Way)

### From the `/sanity` folder:

```bash
cd sanity
npx sanity deploy
```

**This:**
- ✅ Builds the Studio
- ✅ Hosts it on Sanity's infrastructure
- ✅ Gives you a permanent admin URL: `https://your-project.sanity.studio`

## ⚡ Will Changes in Studio Reflect on Vercel Automatically?

### ✅ YES — Instantly (No Redeploy Needed)

**Here's why:**

1. **Sanity = Content Database**
   - Your content lives in Sanity's cloud
   - Studio edits update the database directly

2. **Vercel Site = Content Consumer**
   - Your Next.js site fetches data from Sanity
   - No build step needed for content changes

3. **When you Publish content:**
   - Sanity updates the data
   - Your Next.js site fetches fresh data
   - Changes appear automatically

**There is no build step for content changes.**

## 🔄 Important Detail: Caching

### By Default:
- Server Components may cache data
- You must fetch Sanity data dynamically

### ✅ Correct Fetch Pattern (Already Implemented)

All pages that fetch Sanity data have:

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching completely
```

**This ensures:**
- ✅ Content updates show instantly
- ✅ No stale data
- ✅ Fresh data on every request

### What Happens if You Don't Do This?

- ❌ Site may show old content
- ❌ You'll think Studio "isn't working"
- ❌ It actually is — cache is the issue

## 📋 Final Deployment Flow (One-Time Setup)

### 1️⃣ Next.js → Vercel
```bash
git push origin main
# Vercel auto-deploys
```

### 2️⃣ Sanity Studio → Sanity Hosting
```bash
cd sanity
npx sanity deploy
```

### 3️⃣ Content → Sanity Dataset (production)
- All content stored in Sanity cloud
- Accessible via Studio or API

### 4️⃣ Frontend Fetches Live Data
- Next.js pages fetch from Sanity
- `force-dynamic` ensures fresh data
- No rebuild needed for content changes

**This is industry standard.**

## ✅ What We've Implemented

### Pages with Dynamic Fetching:
- ✅ `/destinations` - `force-dynamic`
- ✅ `/destinations/[slug]` - `force-dynamic` + `revalidate: 0`
- ✅ `/packages` - `force-dynamic`
- ✅ `/packages/[slug]` - `force-dynamic` + `revalidate: 0`
- ✅ `/blog` - `force-dynamic`
- ✅ `/blog/[slug]` - `force-dynamic` + `revalidate: 0`

### Sanity Client Configuration:
- ✅ `useCdn: false` - Ensures fresh data
- ✅ `perspective: 'published'` - Only published content

## ❌ What NOT to Do (Common Mistakes)

### ❌ Deploy Studio on Vercel
- Studio should be on Sanity's hosting
- Use `npx sanity deploy` from `/sanity` folder

### ❌ Rebuild Site After Every Content Edit
- Not needed! Content updates are instant
- Only rebuild if you change code/schemas

### ❌ Use API Tokens on Frontend
- Never use `NEXT_PUBLIC_` prefix for tokens
- Tokens should only be in Server Components/API routes

### ❌ Use Private Dataset
- Use `production` dataset for live site
- Keep it public (read-only) - it's safe

### ❌ Mix Multiple Datasets Randomly
- Stick to `production` for live site
- Use `development` only for testing

## 🔧 NPM Scripts (Updated)

```json
{
  "sanity": "cd sanity && npx sanity dev",
  "sanity:build": "cd sanity && npx sanity build",
  "sanity:deploy": "cd sanity && npx sanity deploy"
}
```

**Always run from project root:**
```bash
npm run sanity:deploy
```

This automatically:
1. Changes to `/sanity` directory
2. Runs `npx sanity deploy`
3. Deploys to Sanity hosting

## 📝 Content Update Workflow

1. **Edit Content:**
   - Go to `https://your-project.sanity.studio`
   - Edit destination, package, or blog post
   - Click "Publish"

2. **See Changes:**
   - Visit your Vercel site
   - Changes appear **instantly**
   - No rebuild, no redeploy needed

3. **That's It!**
   - Content updates are live immediately
   - No waiting for builds
   - No cache issues

## 🎯 Summary

- ✅ Deploy Studio: `cd sanity && npx sanity deploy`
- ✅ Content updates: Instant (no rebuild)
- ✅ Caching: Disabled (`force-dynamic`)
- ✅ Fresh data: Every request
- ✅ Industry standard: Separate Studio hosting

**Your setup is now production-ready with instant content updates!** 🚀

