# Sanity CMS Setup

This folder contains the Sanity CMS configuration for Aleeza Travels.

## Prerequisites

1. A Sanity account (sign up at https://www.sanity.io)
2. Node.js and npm installed

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

**To get your Project ID:**
1. Go to https://www.sanity.io/manage
2. Create a new project or select an existing one
3. Copy the Project ID from the project settings

**Dataset:**
- Use `production` for production data
- Use `development` for testing (optional)

### 3. Initialize Sanity Project (First Time Only)

If this is your first time setting up Sanity, run:

```bash
npx sanity init
```

Follow the prompts:
- Select "Create new project" or "Use existing project"
- Choose your project
- Select dataset: `production`
- Use default project output path: `./sanity`
- Configure a custom project structure: **No**
- Use TypeScript: **Yes**

### 4. Run Sanity Studio Locally

To access the Sanity Studio admin dashboard:

```bash
npm run sanity
```

Or use the Sanity CLI directly:

```bash
npx sanity dev
```

The Studio will be available at: `http://localhost:3333`

### 5. Access Studio via Next.js App

The Studio is also integrated into the Next.js app at:

```
http://localhost:3000/studio
```

## Available Schemas

The following content types are configured:

1. **Post** (`post`) - Blog posts with title, content, images, and categories
2. **Destination** (`destination`) - Travel destinations with images and pricing
3. **Package** (`package`) - Travel packages with features and pricing

## Sanity CLI Commands

- `npm run sanity` - Start Sanity Studio in development mode
- `npm run sanity:build` - Build Sanity Studio for production
- `npm run sanity:deploy` - Deploy Sanity Studio to Sanity.io

## Project Structure

```
sanity/
├── sanity.config.ts      # Main Sanity configuration
├── sanity.cli.ts         # CLI configuration
├── schemas/
│   ├── index.ts         # Schema exports
│   ├── post.ts          # Blog post schema
│   ├── destination.ts   # Destination schema
│   └── package.ts       # Travel package schema
└── tsconfig.json        # TypeScript configuration
```

## Next Steps

1. Set up your environment variables
2. Run `npm run sanity` to start the Studio
3. Log in with your Sanity account
4. Start creating content!

## Documentation

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity v3 Migration Guide](https://www.sanity.io/docs/v3-migration-guide)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)

