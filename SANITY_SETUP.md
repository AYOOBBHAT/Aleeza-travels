# Sanity CMS Integration Guide

This document explains how to set up and use Sanity CMS with the Sadasangh Holidays Next.js project.

## 📁 Folder Structure

```
sadasangh_holidays/
├── sanity/                    # Sanity CMS configuration
│   ├── sanity.config.ts       # Main Sanity Studio configuration
│   ├── sanity.cli.ts          # CLI configuration
│   ├── schemas/               # Content type schemas
│   │   ├── index.ts          # Schema exports
│   │   ├── post.ts           # Blog post schema
│   │   ├── destination.ts    # Destination schema
│   │   └── package.ts        # Travel package schema
│   ├── tsconfig.json         # TypeScript config for Sanity
│   └── README.md             # Sanity-specific documentation
├── app/
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx      # Sanity Studio route
└── .env.local                # Environment variables (create this)
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `sanity` - Sanity CMS core
- `@sanity/vision` - Vision tool for GROQ queries
- `next-sanity` - Next.js integration for Sanity

### Step 2: Create Sanity Project

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign in or create an account
3. Click "Create new project"
4. Fill in:
   - Project name: `Sadasangh Holidays`
   - Organization: (select or create one)
5. Copy your **Project ID** (you'll need this)

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

**Important:** Replace `your-project-id-here` with your actual Project ID from Step 2.

### Step 4: Initialize Sanity (First Time)

Run the Sanity initialization:

```bash
npx sanity init
```

When prompted:
- **Project:** Select your newly created project
- **Dataset:** Choose `production` (or create a new one)
- **Project output path:** Use default `./sanity` (already exists)
- **Configure a custom project structure:** **No**
- **TypeScript:** **Yes**

### Step 5: Run Sanity Studio

You have two options:

#### Option A: Standalone Studio (Recommended for Development)

```bash
npm run sanity
```

This starts the Studio at `http://localhost:3333`

#### Option B: Integrated Studio (via Next.js)

```bash
npm run dev
```

Then visit `http://localhost:3000/studio`

## 📝 Available Content Types

### 1. Blog Post (`post`)
- Title, slug, excerpt
- Author, main image
- Categories (Destinations, Tips, Budget, Lifestyle, Culture)
- Published date, read time
- Rich text body content

### 2. Destination (`destination`)
- Name, slug, description
- Image with alt text
- Price, country, continent
- Featured flag

### 3. Travel Package (`package`)
- Name, slug, description
- Duration, price, original price
- Image, features list
- Related destination reference
- Featured flag

## 🛠️ Configuration Files Explained

### `sanity/sanity.config.ts`
Main configuration file for Sanity Studio. Defines:
- Project ID and dataset
- Studio plugins (Structure Tool, Vision)
- Schema types
- Base path (`/studio`)

### `sanity/sanity.cli.ts`
CLI configuration for Sanity commands. Used by:
- `sanity dev`
- `sanity build`
- `sanity deploy`

### `app/studio/[[...index]]/page.tsx`
Next.js route that renders Sanity Studio. Uses `next-sanity` to embed the Studio.

## 🔧 NPM Scripts

- `npm run sanity` - Start Sanity Studio in dev mode (port 3333)
- `npm run sanity:build` - Build Studio for production
- `npm run sanity:deploy` - Deploy Studio to Sanity.io

## 📦 Datasets

By default, the project uses the `production` dataset. You can:

1. **Use production dataset** (recommended for small projects)
   ```env
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

2. **Create a development dataset** (for testing)
   - Go to Sanity Manage → Your Project → Datasets
   - Create a new dataset called `development`
   - Update `.env.local`:
     ```env
     NEXT_PUBLIC_SANITY_DATASET=development
     ```

## 🔐 Authentication

When you first run `npm run sanity`, you'll be prompted to:
1. Log in with your Sanity account
2. Authorize the CLI to access your project

This creates a `.sanity` folder with your credentials (already in `.gitignore`).

## 🎨 Customizing Schemas

To add or modify content types:

1. Create a new schema file in `sanity/schemas/`
2. Export it from `sanity/schemas/index.ts`
3. Restart the Studio to see changes

Example schema structure:
```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'myContentType',
  title: 'My Content Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // ... more fields
  ],
});
```

## 🚢 Deployment

### Deploy Studio to Sanity.io

```bash
npm run sanity:deploy
```

This deploys your Studio to `https://your-project.sanity.studio`

### Environment Variables in Production

Make sure to set these in your hosting platform (Vercel, Netlify, etc.):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## 📚 Next Steps

1. ✅ Set up environment variables
2. ✅ Run `npm run sanity` to start Studio
3. ✅ Log in and create your first content
4. 🔄 (Next) Integrate Sanity data into your Next.js pages
5. 🔄 (Next) Set up GROQ queries to fetch content

## 🔗 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity v3 Guide](https://www.sanity.io/docs/v3)
- [Next.js + Sanity](https://www.sanity.io/docs/js-client)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## ⚠️ Important Notes

- **Never commit `.env.local`** - It's already in `.gitignore`
- **The Studio is separate from your site UI** - Content changes won't affect your site until you integrate the API
- **Use TypeScript** - All schemas are typed for better DX
- **Dataset naming** - Use `production` for live data, `development` for testing

---

**Ready to start?** Run `npm install` and follow Step 2 above! 🎉

