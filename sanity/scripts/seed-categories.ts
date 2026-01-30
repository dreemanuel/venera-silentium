/**
 * Sanity Service Categories Seed Script
 *
 * Seeds service category documents with localized titles and descriptions.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/seed-categories.ts
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

interface CategorySeed {
  _type: 'serviceCategory';
  key: string;
  title: { en: string; ru: string; id: string };
  description: { en: string; ru: string; id: string };
  order: number;
}

// Service categories matching the existing service.category field values
const categories: CategorySeed[] = [
  {
    _type: 'serviceCategory',
    key: 'anti-aging-injectables',
    title: {
      en: 'Aesthetic Injections',
      ru: 'Эстетические инъекции',
      id: 'Injeksi Estetika',
    },
    description: {
      en: 'Precision injections that enhance natural beauty, smooth wrinkles, and restore youthful volume.',
      ru: 'Точные инъекции, которые подчеркивают естественную красоту, разглаживают морщины и восстанавливают молодой объем.',
      id: 'Injeksi presisi yang meningkatkan kecantikan alami, menghaluskan kerutan, dan mengembalikan volume awet muda.',
    },
    order: 1,
  },
  {
    _type: 'serviceCategory',
    key: 'skin-rejuvenation',
    title: {
      en: 'Skin Rejuvenation & Boosters',
      ru: 'Омоложение кожи и бустеры',
      id: 'Peremajaan Kulit & Booster',
    },
    description: {
      en: 'Advanced treatments that deeply hydrate, nourish, and revitalize your skin from within.',
      ru: 'Передовые процедуры, которые глубоко увлажняют, питают и оживляют кожу изнутри.',
      id: 'Perawatan canggih yang melembapkan, menutrisi, dan merevitalisasi kulit Anda dari dalam.',
    },
    order: 2,
  },
  {
    _type: 'serviceCategory',
    key: 'problem-specific',
    title: {
      en: 'Body & Skin Solutions',
      ru: 'Решения для тела и кожи',
      id: 'Solusi Tubuh & Kulit',
    },
    description: {
      en: 'Targeted treatments for body contouring and specific skin concerns like acne, pigmentation, and rosacea.',
      ru: 'Целевые процедуры для коррекции фигуры и решения проблем кожи: акне, пигментации и розацеа.',
      id: 'Perawatan terarah untuk kontur tubuh dan masalah kulit seperti jerawat, pigmentasi, dan rosacea.',
    },
    order: 3,
  },
  {
    _type: 'serviceCategory',
    key: 'preparatory',
    title: {
      en: 'Facial Care Essentials',
      ru: 'Основы ухода за лицом',
      id: 'Dasar Perawatan Wajah',
    },
    description: {
      en: 'Essential cleansing and preparation treatments that optimize your skin for advanced procedures.',
      ru: 'Основные очищающие и подготовительные процедуры, оптимизирующие кожу для продвинутых процедур.',
      id: 'Perawatan pembersihan dan persiapan esensial yang mengoptimalkan kulit untuk prosedur lanjutan.',
    },
    order: 4,
  },
  {
    _type: 'serviceCategory',
    key: 'specialized',
    title: {
      en: "Men's Aesthetics",
      ru: 'Мужская эстетика',
      id: 'Estetika Pria',
    },
    description: {
      en: 'Tailored aesthetic treatments designed specifically for masculine features and concerns.',
      ru: 'Эстетические процедуры, разработанные специально с учетом мужских особенностей.',
      id: 'Perawatan estetika yang dirancang khusus untuk fitur dan kebutuhan maskulin.',
    },
    order: 5,
  },
  {
    _type: 'serviceCategory',
    key: 'consultation',
    title: {
      en: 'Free Consultation',
      ru: 'Бесплатная консультация',
      id: 'Konsultasi Gratis',
    },
    description: {
      en: 'Begin your journey with a complimentary consultation. We take time to understand your unique needs and craft a personalized treatment plan tailored just for you.',
      ru: 'Начните свой путь с бесплатной консультации. Мы уделяем время, чтобы понять ваши уникальные потребности и создать персонализированный план лечения специально для вас.',
      id: 'Mulai perjalanan Anda dengan konsultasi gratis. Kami meluangkan waktu untuk memahami kebutuhan unik Anda dan menyusun rencana perawatan yang dipersonalisasi khusus untuk Anda.',
    },
    order: 6,
  },
];

async function seedCategories() {
  console.log('Starting service categories seed...');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Categories to seed: ${categories.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const category of categories) {
    try {
      // Check if category already exists by key
      const existing = await client.fetch(
        `*[_type == "serviceCategory" && key == $key][0]._id`,
        { key: category.key }
      );

      if (existing) {
        // Update existing category
        await client.patch(existing).set(category).commit();
        console.log(`Updated: ${category.title.en}`);
        updated++;
      } else {
        // Create new category
        await client.create(category);
        console.log(`Created: ${category.title.en}`);
        created++;
      }
    } catch (error) {
      console.error(`Error with ${category.title.en}:`, error);
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
    console.log('2. Navigate to Service Categories to verify the seeded data');
    console.log('3. Optionally upload category images through the Studio');
  } else {
    console.log('Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedCategories().catch(console.error);
