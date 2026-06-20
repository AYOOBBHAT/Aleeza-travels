# Sanity New Account Setup (Aleeza Travels)

Use this guide when you switch to a **new Sanity account** or create a **new Sanity project**.

Your current project ID in `.env.local` is: **`iuu5synt`**

---

## Why you might not see a Studio URL

The hosted Studio URL (for example `https://aleeza.sanity.studio`) **does not exist until you deploy Studio** to that project.

| What you want | URL | When it works |
|---------------|-----|----------------|
| Studio inside Next.js (local) | `http://localhost:3000/studio` | After `npm run dev` (development only) |
| Standalone Studio (local) | `http://localhost:3333` | After `npm run sanity` |
| Hosted Studio on Sanity | `https://aleeza.sanity.studio` | **Only after** `npm run sanity:deploy` |
| Sanity project dashboard | `https://www.sanity.io/manage/project/iuu5synt` | After project is created |

> **Note:** Embedded Studio at `/studio` is **disabled in production** on this site. For live editing, use the hosted Studio URL after deploy.

---

## Step 1 — Create the Sanity project

1. Sign in at [https://www.sanity.io/manage](https://www.sanity.io/manage) with your **new account**.
2. Click **Create project**.
3. Name it (for example `Aleeza Travels`).
4. Copy the **Project ID** (yours: `iuu5synt`).
5. Confirm a dataset named **`production`** exists (Sanity usually creates it by default).

---

## Step 2 — Update environment variables

Edit `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="iuu5synt"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
REVALIDATE_SECRET=your-random-secret-here
```

**Important:**

- `NEXT_PUBLIC_SANITY_PROJECT_ID` is **not secret** — it is a public identifier.
- Do **not** commit `.env.local` to git.
- `REVALIDATE_SECRET` is for your Next.js revalidate API, not for Sanity login.

---

## Step 3 — Sync env into the Sanity folder

The standalone Studio reads `sanity/.env`, which is generated from `.env.local`.

Run:

```bash
npm run sanity:env
```

Or:

```bash
node scripts/setup-sanity-env.js
```

This updates `sanity/.env` with your new project ID. **If you skip this step, Studio may still point at the old project.**

---

## Step 4 — Log in with the new Sanity account (CLI)

Open a terminal and run:

```bash
cd sanity
npx sanity login
```

- Use the **same account** that owns project `iuu5synt`.
- If you were logged into the old account, log out first: `npx sanity logout` then `npx sanity login`.

---

## Step 5 — Add CORS origins (required for `/studio` in the browser)

In [Sanity Manage → your project → API → CORS origins](https://www.sanity.io/manage/project/iuu5synt/api):

Add these origins (with **Allow credentials** enabled):

| Origin | Use |
|--------|-----|
| `http://localhost:3000` | Next.js dev + embedded Studio |
| `http://localhost:3333` | Standalone Studio dev |
| `https://aleezatravels.com` | Production site (if deployed) |
| `https://www.aleezatravels.com` | Production site (if used) |

Without CORS, Studio may load but fail to fetch data or show errors.

---

## Step 6 — Run Studio locally

### Option A — Embedded in Next.js (recommended)

```bash
npm run dev
```

Open: **http://localhost:3000/studio**

You will be asked to sign in with your Sanity account. Only users **invited to this project** can edit content.

### Option B — Standalone Studio

```bash
npm run sanity
```

Open: **http://localhost:3333**

---

## Step 7 — Deploy hosted Studio (get the public Studio URL)

To get a permanent Studio URL on Sanity (for production editing):

```bash
npm run sanity:deploy
```

After a successful deploy you should see:

- **Hosted Studio:** `https://aleeza.sanity.studio`  
  (hostname is set in `sanity/sanity.cli.ts` as `studioHost: 'aleeza'`)

If that hostname is taken on another account, change `studioHost` in `sanity/sanity.cli.ts` to something unique (for example `aleeza-travels-cms`) and deploy again.

You can also find the link in Sanity Manage → **Studios** for your project.

---

## Step 8 — Invite team members

In [Project → Members](https://www.sanity.io/manage/project/iuu5synt/access):

1. Invite editors by email.
2. They must accept the invite before they can open Studio.

---

## Step 9 — Add content types (schemas)

This project’s schemas live in:

- `sanity/schemas/` — destination, package, blog, FAQ

They are loaded by `sanity/sanity.config.ts`. When Studio starts or is deployed, those types appear automatically. **You do not need a separate schema deploy** for normal Studio use.

After switching accounts, your **new project starts empty** — create destinations, packages, etc. in Studio and **Publish** each document.

---

## Step 10 — Production website env vars

On Vercel / Netlify / your host, set the same variables:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `iuu5synt` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
| `REVALIDATE_SECRET` | same as `.env.local` |

Redeploy the site after changing env vars.

---

## Troubleshooting

### Studio shows old project or blank / errors

1. Run `npm run sanity:env`
2. Restart dev server (`npm run dev`)
3. Hard refresh browser (Ctrl+Shift+R)
4. Confirm `.env.local` project ID matches [Sanity Manage](https://www.sanity.io/manage)

### “Project not found” or permission errors

- Run `npx sanity logout` then `npx sanity login` with the new account.
- Confirm you are a member of project `iuu5synt`.

### No hosted Studio URL in Sanity dashboard

- Hosted Studio only exists after `npm run sanity:deploy`.
- Local URLs (`localhost:3000/studio` or `localhost:3333`) work without deploy.

### Website shows no content

- New project has no published documents yet — add and **Publish** in Studio.
- Wait up to 60 seconds (ISR) or restart dev server.

### `sanity/.env` still shows old project ID

Run:

```bash
npm run sanity:env
```

Do not edit `sanity/.env` manually — it is auto-generated.

---

## Quick checklist

- [ ] New project created on sanity.io
- [ ] `.env.local` updated with new `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `npm run sanity:env` run
- [ ] `npx sanity login` with new account (inside `sanity/` folder)
- [ ] CORS origins added for localhost and production domain
- [ ] `npm run dev` → open `http://localhost:3000/studio`
- [ ] `npm run sanity:deploy` → get `https://aleeza.sanity.studio`
- [ ] Production host env vars updated and redeployed

---

## Useful links

- Project dashboard: [https://www.sanity.io/manage/project/iuu5synt](https://www.sanity.io/manage/project/iuu5synt)
- API / CORS: [https://www.sanity.io/manage/project/iuu5synt/api](https://www.sanity.io/manage/project/iuu5synt/api)
- Sanity docs: [https://www.sanity.io/docs](https://www.sanity.io/docs)
