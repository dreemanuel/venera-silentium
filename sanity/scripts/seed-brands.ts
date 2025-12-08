/**
 * Sanity Brands Seed Script
 *
 * Seeds sample brand entries into Sanity CMS.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/seed-brands.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';

// Load environment variables from root .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

const projectId = process.env.SANITY_PROJECT_ID;
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

if (!projectId) {
  console.error('SANITY_PROJECT_ID is not set in .env');
  process.exit(1);
}

if (!token) {
  console.error('No Sanity auth token found');
  console.error('');
  console.error('Option 1: Login via CLI');
  console.error('  cd sanity && npx sanity login');
  console.error('');
  console.error('Option 2: Set SANITY_API_TOKEN in .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

interface BrandSeed {
  _type: 'brand';
  name: string;
  website?: string;
  description?: { en: string; ru: string; id: string };
  order: number;
}

// Sample brands data - cosmetic brands commonly used in aesthetic cosmetology
const brands: BrandSeed[] = [
  {
    _type: 'brand',
    name: 'Janssen Cosmetics',
    website: 'https://www.janssen-cosmetics.com',
    description: {
      en: 'Premium German skincare brand known for innovative formulations and clinical effectiveness.',
      ru: 'Премиальный немецкий бренд по уходу за кожей, известный инновационными формулами и клинической эффективностью.',
      id: 'Brand perawatan kulit premium Jerman yang dikenal dengan formulasi inovatif dan efektivitas klinis.',
    },
    order: 1,
  },
  {
    _type: 'brand',
    name: 'Allergan Aesthetics',
    website: 'https://www.allerganaesthetics.com',
    description: {
      en: 'World leader in medical aesthetics, creators of Botox and Juvederm product lines.',
      ru: 'Мировой лидер в медицинской эстетике, создатели линеек продуктов Ботокс и Ювидерм.',
      id: 'Pemimpin dunia dalam estetika medis, pencipta lini produk Botox dan Juvederm.',
    },
    order: 2,
  },
  {
    _type: 'brand',
    name: 'Galderma',
    website: 'https://www.galderma.com',
    description: {
      en: 'Swiss pharmaceutical company specializing in dermatology and aesthetic medicine.',
      ru: 'Швейцарская фармацевтическая компания, специализирующаяся на дерматологии и эстетической медицине.',
      id: 'Perusahaan farmasi Swiss yang mengkhususkan diri dalam dermatologi dan kedokteran estetika.',
    },
    order: 3,
  },
  {
    _type: 'brand',
    name: 'Teoxane',
    website: 'https://www.teoxane.com',
    description: {
      en: 'Swiss laboratory pioneering hyaluronic acid-based dermal fillers and skincare.',
      ru: 'Швейцарская лаборатория, пионер в производстве дермальных филлеров на основе гиалуроновой кислоты.',
      id: 'Laboratorium Swiss pelopor filler dermal berbasis asam hialuronat dan perawatan kulit.',
    },
    order: 4,
  },
  {
    _type: 'brand',
    name: 'Filorga',
    website: 'https://www.filorga.com',
    description: {
      en: 'French aesthetic medicine laboratory, expert in anti-aging and skin rejuvenation.',
      ru: 'Французская лаборатория эстетической медицины, эксперт в омоложении и антивозрастной терапии.',
      id: 'Laboratorium kedokteran estetika Prancis, ahli dalam anti-penuaan dan peremajaan kulit.',
    },
    order: 5,
  },
  {
    _type: 'brand',
    name: 'Revitacare',
    website: 'https://www.revitacare.com',
    description: {
      en: 'French laboratory specializing in mesotherapy solutions for skin and hair rejuvenation.',
      ru: 'Французская лаборатория, специализирующаяся на мезотерапевтических растворах для омоложения кожи и волос.',
      id: 'Laboratorium Prancis yang mengkhususkan diri dalam solusi mesoterapi untuk peremajaan kulit dan rambut.',
    },
    order: 6,
  },
];

async function seedBrands() {
  console.log('Starting brands seed...');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Brands to seed: ${brands.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const brand of brands) {
    try {
      // Check if brand already exists by name
      const existing = await client.fetch(
        `*[_type == "brand" && name == $name][0]._id`,
        { name: brand.name }
      );

      if (existing) {
        // Update existing brand
        await client.patch(existing).set(brand).commit();
        console.log(`Updated: ${brand.name}`);
        updated++;
      } else {
        // Create new brand
        await client.create(brand);
        console.log(`Created: ${brand.name}`);
        created++;
      }
    } catch (error) {
      console.error(`Error with ${brand.name}:`, error);
      errors++;
    }
  }

  console.log('');
  console.log('Seed Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log('');

  if (errors === 0) {
    console.log('Seed completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run "npm run sanity" to open Sanity Studio');
    console.log('2. Navigate to Brands to verify the seeded data');
    console.log('3. Upload brand logos through the Studio');
  } else {
    console.log('Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedBrands().catch(console.error);
