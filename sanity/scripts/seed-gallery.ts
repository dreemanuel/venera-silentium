/**
 * Sanity Gallery Seed Script
 *
 * Seeds sample gallery image entries into Sanity CMS.
 * Note: This creates the document entries but images must be uploaded through Sanity Studio.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/seed-gallery.ts
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

type GalleryCategory = 'clinic' | 'treatments' | 'before-after' | 'team';

interface GalleryImageSeed {
  _type: 'galleryImage';
  title: { en: string; ru: string; id: string };
  category: GalleryCategory;
  order: number;
  featured: boolean;
}

// Sample gallery entries - images to be uploaded via Sanity Studio
const galleryImages: GalleryImageSeed[] = [
  {
    _type: 'galleryImage',
    title: {
      en: 'Woman Silentium Reception',
      ru: 'Ресепшен Woman Silentium',
      id: 'Resepsi Woman Silentium',
    },
    category: 'clinic',
    order: 1,
    featured: true,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Treatment Room',
      ru: 'Процедурный кабинет',
      id: 'Ruang Perawatan',
    },
    category: 'clinic',
    order: 2,
    featured: true,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Relaxation Lounge',
      ru: 'Зона релаксации',
      id: 'Lounge Relaksasi',
    },
    category: 'clinic',
    order: 3,
    featured: false,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Mesotherapy Session',
      ru: 'Сеанс мезотерапии',
      id: 'Sesi Mesoterapi',
    },
    category: 'treatments',
    order: 4,
    featured: true,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Facial Treatment',
      ru: 'Уход за лицом',
      id: 'Perawatan Wajah',
    },
    category: 'treatments',
    order: 5,
    featured: true,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Consultation Room',
      ru: 'Кабинет консультаций',
      id: 'Ruang Konsultasi',
    },
    category: 'clinic',
    order: 6,
    featured: false,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Dr. Venera at Work',
      ru: 'Доктор Венера за работой',
      id: 'Dr. Venera Sedang Bekerja',
    },
    category: 'team',
    order: 7,
    featured: true,
  },
  {
    _type: 'galleryImage',
    title: {
      en: 'Premium Products Display',
      ru: 'Витрина премиальных продуктов',
      id: 'Tampilan Produk Premium',
    },
    category: 'clinic',
    order: 8,
    featured: false,
  },
];

async function seedGallery() {
  console.log('Starting gallery seed...');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Gallery images to seed: ${galleryImages.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const image of galleryImages) {
    try {
      // Check if gallery image already exists by title
      const existing = await client.fetch(
        `*[_type == "galleryImage" && title.en == $title][0]._id`,
        { title: image.title.en }
      );

      if (existing) {
        // Update existing gallery image
        await client.patch(existing).set(image).commit();
        console.log(`Updated: ${image.title.en}`);
        updated++;
      } else {
        // Create new gallery image
        await client.create(image);
        console.log(`Created: ${image.title.en}`);
        created++;
      }
    } catch (error) {
      console.error(`Error with ${image.title.en}:`, error);
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
    console.log('IMPORTANT: Next steps:');
    console.log('1. Run "npm run sanity" to open Sanity Studio');
    console.log('2. Navigate to Gallery Images');
    console.log('3. Upload actual images for each entry');
    console.log('4. Add alt text for accessibility');
  } else {
    console.log('Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedGallery().catch(console.error);
