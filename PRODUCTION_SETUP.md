# Production Setup Guide

## 🚀 Deploying to Production

### 1. Environment Variables

Set these in your Vercel (or hosting platform) environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Where to set:**
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Check their documentation

### 2. Studio Access in Production

The embedded Studio (`/studio` route) is **disabled in production** for security.

**To access Studio in production, use one of these options:**

#### Option A: Sanity's Hosted Studio (Recommended)

Deploy your Studio to Sanity's hosting:

```bash
npm run sanity:deploy
```

This will:
- Deploy Studio to `https://your-project.sanity.studio`
- Provide a separate, secure Studio URL
- Handle all authentication and security

**Access:** Visit `https://your-project.sanity.studio` and log in with your Sanity account.

#### Option B: Access via Sanity Dashboard

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "Open Studio" or "Manage Content"

### 3. Build and Deploy

Your Next.js app is ready for production:

```bash
# Build locally to test
npm run build

# Deploy to Vercel (if using Vercel)
vercel --prod

# Or push to your Git repository (if auto-deploy is enabled)
git push origin main
```

### 4. Verify Deployment

After deployment, check:

- ✅ Homepage loads: `https://your-domain.com`
- ✅ Destinations page: `https://your-domain.com/destinations`
- ✅ Packages page: `https://your-domain.com/packages`
- ✅ Blog page: `https://your-domain.com/blog`
- ✅ Studio route shows "Not Available" message (expected)
- ✅ Sanity Studio accessible at `https://your-project.sanity.studio`

## 🔒 Security Checklist

- ✅ Studio route disabled in production
- ✅ Environment variables set in hosting platform
- ✅ `.env.local` not committed to Git
- ✅ Sanity Studio deployed separately
- ✅ Only authorized users have Sanity project access

## 📝 Content Management Workflow

1. **Create/Edit Content:**
   - Visit `https://your-project.sanity.studio`
   - Log in with your Sanity account
   - Create or edit destinations, packages, blog posts, FAQs

2. **Publish Content:**
   - In Sanity Studio, click "Publish" on your documents
   - Content appears on your site immediately (via CDN)

3. **View on Site:**
   - Visit your production site
   - New content appears automatically

## 🛠️ Troubleshooting

### Content not appearing on site?

1. Check if content is **published** in Sanity (not just saved as draft)
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Verify dataset name matches (`production`)

### Studio not accessible?

1. Run `npm run sanity:deploy` to deploy Studio
2. Check Sanity project permissions
3. Ensure you're logged in with correct Sanity account

### Build errors?

1. Check environment variables are set
2. Verify all dependencies are installed
3. Check build logs for specific errors

## 📚 Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Sanity Studio Deployment](https://www.sanity.io/docs/deployment)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

**Your site is now production-ready!** 🎉

