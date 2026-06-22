# REVALIDATE_SECRET Setup Guide

## What is REVALIDATE_SECRET?

`REVALIDATE_SECRET` is a **custom secret token that YOU create yourself**. It's used to secure the `/api/revalidate` endpoint so that only authorized requests (like Sanity webhooks) can trigger instant page revalidation.

## Is it Required?

**No, it's optional** - but **highly recommended for production**:
- ✅ **With it**: Your revalidation endpoint is secure (only authorized requests work)
- ❌ **Without it**: The endpoint is disabled (returns error 500)

Even without it, your site still works perfectly - pages will revalidate automatically based on the time-based revalidation (60 seconds for lists, 1 hour for details).

## Where to Get It?

**You create it yourself!** It's not provided by Vercel or Sanity. Here's how:

### Option 1: Generate a Random Secret (Recommended)

**On Windows (PowerShell):**
```powershell
# Generate a secure random string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**Or use an online generator:**
- Visit: https://randomkeygen.com/
- Use a "CodeIgniter Encryption Keys" (32+ characters)

### Option 2: Use a Simple Secret (Less Secure)

You can use any string you want, but make it:
- At least 32 characters long
- Random and unpredictable
- Example: `sadasangh-holidays-revalidate-2024-secret-key-xyz123`

## How to Set It in Vercel

### Step 1: Generate Your Secret
Use one of the methods above to create a secret token.

### Step 2: Add to Vercel Environment Variables

1. **Go to your Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click **Environment Variables** in the sidebar

3. **Add the Variable**
   - **Key**: `REVALIDATE_SECRET`
   - **Value**: Your generated secret (paste it here)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy** (Important!)
   - After adding the variable, you need to redeploy
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on the latest deployment
   - Click **Redeploy**

### Step 3: Add to Local Development (Optional)

Add it to your `.env.local` file:

```env
REVALIDATE_SECRET=your_secret_here
```

**Note**: Don't commit `.env.local` to git (it's already in `.gitignore`)

## How to Use with Sanity Webhooks (Optional)

If you want instant revalidation when content is published in Sanity:

### Step 1: Get Your Vercel Deployment URL
- Your production URL: `https://your-project.vercel.app`
- Or your custom domain: `https://sadasanghholidays.com`

### Step 2: Configure Sanity Webhook

1. **Go to Sanity Dashboard**
   - Visit: https://www.sanity.io/manage
   - Select your project

2. **Create Webhook**
   - Go to **API** → **Webhooks**
   - Click **Create webhook**

3. **Configure Webhook**
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET&type=all`
     - Replace `YOUR_SECRET` with the same secret you set in Vercel
     - Replace `your-domain.com` with your actual domain
   - **Dataset**: `production` (or your dataset name)
   - **Trigger on**: Select `Create`, `Update`, `Delete`
   - **Filter**: Leave empty (or customize if needed)
   - **HTTP method**: `POST`
   - **API version**: `v2021-03-25` or latest
   - **Secret**: Leave empty (we're using query param instead)

4. **Save the Webhook**

### Step 3: Test It

1. **Publish/Update content in Sanity Studio**
2. **Check Vercel logs** to see if revalidation was triggered
3. **Visit your site** - changes should appear immediately (instead of waiting for revalidation period)

## Example Webhook URLs

### Revalidate Everything
```
https://sadasanghholidays.com/api/revalidate?secret=YOUR_SECRET&type=all
```

### Revalidate Specific Type
```
https://sadasanghholidays.com/api/revalidate?secret=YOUR_SECRET&type=destination
https://sadasanghholidays.com/api/revalidate?secret=YOUR_SECRET&type=package
https://sadasanghholidays.com/api/revalidate?secret=YOUR_SECRET&type=blog
```

### Revalidate Specific Page
```
https://sadasanghholidays.com/api/revalidate?secret=YOUR_SECRET&type=destination&slug=gulmarg
```

## Security Best Practices

1. ✅ **Use a long, random secret** (32+ characters)
2. ✅ **Never commit it to git** (already in `.gitignore`)
3. ✅ **Use different secrets** for production and development (optional)
4. ✅ **Rotate it periodically** if compromised
5. ✅ **Don't share it publicly** or in screenshots

## Troubleshooting

### "Revalidation not configured" Error
- **Cause**: `REVALIDATE_SECRET` not set in Vercel
- **Fix**: Add it to Vercel environment variables and redeploy

### "Invalid secret token" Error
- **Cause**: Secret in webhook URL doesn't match Vercel env var
- **Fix**: Make sure both use the exact same secret

### Webhook Not Triggering
- **Check**: Sanity webhook logs in Sanity dashboard
- **Check**: Vercel function logs in Vercel dashboard
- **Verify**: Webhook URL is correct and accessible

### Changes Not Appearing Immediately
- **Normal**: If webhook isn't configured, changes appear after revalidation period (60s/1h)
- **Fix**: Set up webhook for instant updates

## Summary

1. **Generate a secret** (use PowerShell/openssl/online generator)
2. **Add to Vercel** (Settings → Environment Variables)
3. **Redeploy** (so the variable is available)
4. **Optional**: Configure Sanity webhook for instant updates

That's it! Your revalidation endpoint is now secure and ready to use.

