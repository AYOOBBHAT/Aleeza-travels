# Post-Deployment Steps for Sanity

## ✅ Current Status

- ✅ Vercel deployment complete
- ✅ Studio route disabled in production (already configured)
- ✅ Environment variables should be set in Vercel

## 📋 Next Steps

### Step 1: Verify Environment Variables in Vercel

Make sure these are set in your Vercel project:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these exist:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `your-project-id`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. If missing, add them and **redeploy**

### Step 2: Deploy Sanity Studio (Hosted)

Since Studio is disabled in production builds, deploy it separately:

**From your project root:**
```bash
npm run sanity:deploy
```

**Or from the sanity folder:**
```bash
cd sanity
npx sanity deploy
```

This will:
- ✅ Deploy Studio to `https://your-project-id.sanity.studio`
- ✅ Give you a secure, separate Studio URL
- ✅ Handle all authentication automatically

**After deployment:**
- Visit `https://your-project-id.sanity.studio`
- Log in with your Sanity account
- Start managing content!

### Step 3: Verify Your Site Works

Test these URLs on your production site:

- ✅ Homepage: `https://your-domain.com`
- ✅ Destinations: `https://your-domain.com/destinations`
- ✅ Packages: `https://your-domain.com/packages`
- ✅ Blog: `https://your-domain.com/blog`
- ✅ Studio route: `https://your-domain.com/studio` (should show "Not Available" message - this is correct!)

### Step 4: Optional - Set Up Webhooks for Instant Updates

If you want content changes to appear instantly (instead of waiting for revalidation period):

#### A. Generate REVALIDATE_SECRET (if not done)

1. Generate a secret (see `REVALIDATE_SECRET_GUIDE.md`)
2. Add to Vercel: `REVALIDATE_SECRET` = `your-secret-here`
3. Redeploy

#### B. Configure Sanity Webhook

1. Go to [Sanity Dashboard](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET&type=all`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **HTTP method**: `POST`
6. Save

Now when you publish content, it will instantly revalidate your site!

## 🎯 Content Management Workflow

### Daily Workflow:

1. **Edit Content:**
   - Visit `https://your-project-id.sanity.studio`
   - Log in with Sanity account
   - Create/edit destinations, packages, blog posts

2. **Publish Content:**
   - Click "Publish" in Sanity Studio
   - Content appears on your site:
     - **With webhook**: Instantly (within seconds)
     - **Without webhook**: Within 60 seconds (list pages) or 1 hour (detail pages)

3. **View on Site:**
   - Visit your production site
   - New/updated content appears automatically

## 🔍 Troubleshooting

### Content Not Appearing?

1. **Check if content is published** (not just saved as draft)
2. **Verify environment variables** in Vercel match your Sanity project
3. **Check dataset name** - should be `production`
4. **Wait for revalidation** - if no webhook, wait 60s/1h
5. **Check browser console** for errors

### Studio Not Accessible?

1. **Run deployment**: `npm run sanity:deploy`
2. **Check Sanity project permissions** - ensure you're invited
3. **Verify you're logged in** with correct Sanity account
4. **Check Studio URL**: `https://your-project-id.sanity.studio`

### Build Errors?

1. **Check environment variables** are set in Vercel
2. **Verify all dependencies** are in `package.json`
3. **Check build logs** in Vercel dashboard

## ✅ Final Checklist

- [ ] Environment variables set in Vercel
- [ ] Sanity Studio deployed (`npm run sanity:deploy`)
- [ ] Can access Studio at `https://your-project-id.sanity.studio`
- [ ] Production site loads correctly
- [ ] Can create/edit content in Studio
- [ ] Content appears on production site
- [ ] (Optional) Webhook configured for instant updates

## 🎉 You're All Set!

Your production setup is complete:
- ✅ Next.js site deployed on Vercel
- ✅ Studio disabled in production (secure)
- ✅ Sanity Studio deployed separately (accessible)
- ✅ Content management ready

**Start creating content in Sanity Studio and watch it appear on your site!**

