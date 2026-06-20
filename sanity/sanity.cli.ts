import { defineCliConfig } from 'sanity/cli';
import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

const rootDir = resolve(__dirname, '..');
const envLocalPath = resolve(rootDir, '.env.local');
const envPath = resolve(rootDir, '.env');
const sanityEnvPath = resolve(__dirname, '.env');

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
} else if (existsSync(envPath)) {
  config({ path: envPath });
}

if (existsSync(sanityEnvPath)) {
  config({ path: sanityEnvPath });
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your .env.local file.'
  );
}

const studioHost = process.env.SANITY_STUDIO_HOST;

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  ...(studioHost ? { studioHost } : {}),
});

