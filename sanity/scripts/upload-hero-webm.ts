/**
 * Upload Hero WebM Videos to Sanity
 *
 * Uploads compressed WebM video files to Sanity CMS.
 * The asset IDs are printed so you can reference them in Sanity Studio.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/upload-hero-webm.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, existsSync, createReadStream } from 'fs';
import { homedir } from 'os';

// Load environment variables from root .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const projectId = process.env.SANITY_PROJECT_ID || 'qibofery';
const dataset = process.env.SANITY_DATASET || 'production';

// Try to get token - prefer env variable for production compatibility
function getAuthToken(): string | undefined {
  // First try env variable (works in production/CI)
  if (process.env.SANITY_API_TOKEN) {
    console.log('Using SANITY_API_TOKEN from .env');
    return process.env.SANITY_API_TOKEN;
  }

  // Fall back to Sanity CLI config (local development)
  const configPath = resolve(homedir(), '.config/sanity/config.json');
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      if (config.authToken) {
        console.log('Using Sanity CLI auth token (from sanity login)');
        return config.authToken;
      }
    } catch {
      // Ignore config read errors
    }
  }

  return undefined;
}

const token = getAuthToken();

if (!token) {
  console.error('Error: No auth token found.');
  console.error('Please either:');
  console.error('  1. Run "npx sanity login" to authenticate with Sanity CLI');
  console.error('  2. Or add SANITY_API_TOKEN to your .env file');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// WebM files to upload
const webmFiles = [
  {
    name: 'hero1',
    path: resolve(__dirname, '../../venera_docs/venera_media/_website-media-by-section/1-hero/_compressed_hero1.webm'),
  },
  {
    name: 'hero2',
    path: resolve(__dirname, '../../venera_docs/venera_media/_website-media-by-section/1-hero/_compressed_hero2.webm'),
  },
  {
    name: 'hero3',
    path: resolve(__dirname, '../../venera_docs/venera_media/_website-media-by-section/1-hero/_compressed_hero3.webm'),
  },
  {
    name: 'hero4',
    path: resolve(__dirname, '../../venera_docs/venera_media/_website-media-by-section/1-hero/_compressed-trimmed_hero4.webm'),
  },
];

async function uploadWebmFiles() {
  console.log('\n=== Uploading WebM Videos to Sanity ===\n');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}\n`);

  const results: { name: string; assetId: string; url: string }[] = [];

  for (const file of webmFiles) {
    if (!existsSync(file.path)) {
      console.error(`File not found: ${file.path}`);
      continue;
    }

    console.log(`Uploading ${file.name}...`);

    try {
      const asset = await client.assets.upload('file', createReadStream(file.path), {
        filename: `${file.name}.webm`,
        contentType: 'video/webm',
      });

      results.push({
        name: file.name,
        assetId: asset._id,
        url: asset.url,
      });

      console.log(`  ✓ Uploaded: ${asset._id}`);
      console.log(`    URL: ${asset.url}\n`);
    } catch (error) {
      console.error(`  ✗ Failed to upload ${file.name}:`, error);
    }
  }

  console.log('\n=== Upload Summary ===\n');
  console.log('Copy these asset IDs to use in Sanity Studio:\n');

  for (const result of results) {
    console.log(`${result.name}:`);
    console.log(`  Asset ID: ${result.assetId}`);
    console.log(`  URL: ${result.url}\n`);
  }

  console.log('\nTo use these in your Hero Media:');
  console.log('1. Open Sanity Studio (npm run sanity)');
  console.log('2. Go to Site Settings → Hero Media');
  console.log('3. For each video slide, the WebM files are now available in the asset library');
  console.log('   Select them for the "Video File (WebM - Primary)" field');
}

uploadWebmFiles().catch(console.error);
