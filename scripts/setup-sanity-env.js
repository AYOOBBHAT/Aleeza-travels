const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sanityEnvPath = path.resolve(projectRoot, 'sanity/.env');

// Prefer .env.local, fall back to .env (useful for CI or client handoff)
const envSources = ['.env.local', '.env'];
let envContent = '';
let sourceFile = '';

for (const file of envSources) {
  const filePath = path.resolve(projectRoot, file);
  if (fs.existsSync(filePath)) {
    envContent = fs.readFileSync(filePath, 'utf8');
    sourceFile = file;
    break;
  }
}

if (!envContent) {
  console.error('Error: No .env.local or .env file found in project root');
  process.exit(1);
}

function readVar(name) {
  const match = envContent.match(new RegExp(`^${name}=(.+)$`, 'm'));
  return match?.[1]?.replace(/^["']|["']$/g, '').trim() || '';
}

const projectId = readVar('NEXT_PUBLIC_SANITY_PROJECT_ID');
const dataset = readVar('NEXT_PUBLIC_SANITY_DATASET') || 'production';
const studioHost = readVar('SANITY_STUDIO_HOST');

if (!projectId) {
  console.error(`Error: No NEXT_PUBLIC_SANITY_PROJECT_ID found in ${sourceFile}`);
  process.exit(1);
}

// SANITY_STUDIO_* vars are inlined by Sanity's Vite build into the hosted studio bundle.
const lines = [
  `# Auto-generated from ${sourceFile} — do not edit manually`,
  `SANITY_STUDIO_PROJECT_ID=${projectId}`,
  `SANITY_STUDIO_DATASET=${dataset}`,
  `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`,
  `NEXT_PUBLIC_SANITY_DATASET=${dataset}`,
];

if (studioHost) {
  lines.push(`SANITY_STUDIO_HOST=${studioHost}`);
}

fs.writeFileSync(sanityEnvPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`✓ Created sanity/.env from ${sourceFile}`);
