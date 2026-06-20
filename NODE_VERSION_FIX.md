# Fix Node.js Version Issue for Sanity Deploy

## Problem

Your Node.js version (v20.11.0) is too old. Sanity CLI requires:
- **Node.js >=20.19 <22** OR **>=22.12**

## Solution: Upgrade Node.js

### Option 1: Download Latest Node.js (Easiest)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download **LTS version** (v20.19+ or v22.12+)
   - Install it

2. **Verify installation:**
   ```powershell
   node --version
   ```
   Should show v20.19+ or v22.12+

3. **Run deploy again:**
   ```powershell
   npm run sanity:deploy
   ```

### Option 2: Use NVM (Node Version Manager) - Recommended

If you have multiple projects with different Node versions:

1. **Install NVM for Windows:**
   - Download: https://github.com/coreybutler/nvm-windows/releases
   - Install `nvm-setup.exe`

2. **Install Node.js v20.19+ via NVM:**
   ```powershell
   nvm install 20.19.0
   nvm use 20.19.0
   ```

3. **Verify:**
   ```powershell
   node --version
   ```

4. **Run deploy:**
   ```powershell
   npm run sanity:deploy
   ```

### Option 3: Use Sanity Dashboard (No Node.js Upgrade Needed)

You can deploy Studio directly from Sanity Dashboard:

1. **Go to Sanity Dashboard:**
   - Visit: https://www.sanity.io/manage
   - Select your project

2. **Deploy Studio:**
   - Look for "Deploy Studio" or "Studio" section
   - Click "Deploy" or "Publish Studio"
   - Follow the prompts

3. **Access Studio:**
   - After deployment, Studio will be available at:
   - `https://your-project-id.sanity.studio`

## Quick Fix (Recommended)

**Just upgrade Node.js to the latest LTS version:**

1. Download from: https://nodejs.org/ (get v20.19+ or v22.12+)
2. Install it
3. Restart your terminal/PowerShell
4. Run: `npm run sanity:deploy`

## After Upgrading Node.js

Once Node.js is upgraded:

```powershell
# From project root
npm run sanity:deploy
```

This will:
- ✅ Deploy Studio to `https://your-project-id.sanity.studio`
- ✅ Make Studio accessible for content management
- ✅ Handle all authentication automatically

## Verify Node.js Version

After upgrading, check:

```powershell
node --version
```

Should show: `v20.19.x` or `v22.12.x` or higher

## Troubleshooting

### Still getting errors after upgrade?

1. **Restart terminal/PowerShell** (required after Node.js install)
2. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   ```
3. **Reinstall dependencies:**
   ```powershell
   npm install --legacy-peer-deps
   ```
4. **Try deploy again:**
   ```powershell
   npm run sanity:deploy
   ```

### Can't upgrade Node.js right now?

Use **Option 3** above - deploy Studio via Sanity Dashboard instead.

