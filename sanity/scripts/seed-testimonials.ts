/**
 * Sanity Testimonials Seed Script
 *
 * Seeds sample testimonials into Sanity CMS.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/seed-testimonials.ts
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

interface TestimonialSeed {
  _type: 'testimonial';
  clientName: string;
  treatment: { en: string; ru: string; id: string };
  quote: { en: string; ru: string; id: string };
  rating: number;
  date: string;
  featured: boolean;
}

// Sample testimonials data
const testimonials: TestimonialSeed[] = [
  {
    _type: 'testimonial',
    clientName: 'Maria S.',
    treatment: {
      en: 'Botox & Fillers',
      ru: 'Ботокс и филлеры',
      id: 'Botox & Filler',
    },
    quote: {
      en: 'Dr. Venera has a magical touch. After my treatment, I feel like the best version of myself - natural, refreshed, and confident. The atmosphere at Woman Silentium is so calming and luxurious.',
      ru: 'У доктора Венеры волшебные руки. После процедуры я чувствую себя лучшей версией себя - естественной, свежей и уверенной. Атмосфера в Woman Silentium такая успокаивающая и роскошная.',
      id: 'Dr. Venera memiliki sentuhan ajaib. Setelah perawatan, saya merasa seperti versi terbaik dari diri saya - alami, segar, dan percaya diri. Suasana di Woman Silentium sangat menenangkan dan mewah.',
    },
    rating: 5,
    date: '2024-11-15',
    featured: true,
  },
  {
    _type: 'testimonial',
    clientName: 'Anna K.',
    treatment: {
      en: 'Facial Mesotherapy',
      ru: 'Мезотерапия лица',
      id: 'Mesoterapi Wajah',
    },
    quote: {
      en: 'I was nervous about my first aesthetic treatment, but Dr. Venera made me feel completely at ease. My skin has never looked better - it glows from within just like she promised!',
      ru: 'Я нервничала перед своей первой эстетической процедурой, но доктор Венера полностью успокоила меня. Моя кожа никогда не выглядела лучше - она сияет изнутри, как она и обещала!',
      id: 'Saya gugup tentang perawatan estetika pertama saya, tapi Dr. Venera membuat saya merasa sangat nyaman. Kulit saya tidak pernah terlihat lebih baik - bercahaya dari dalam seperti yang dia janjikan!',
    },
    rating: 5,
    date: '2024-10-28',
    featured: true,
  },
  {
    _type: 'testimonial',
    clientName: 'Elena V.',
    treatment: {
      en: 'Russian Lips',
      ru: 'Русские губы',
      id: 'Russian Lips',
    },
    quote: {
      en: 'The Russian Lips technique gave me exactly what I wanted - subtle enhancement that looks completely natural. Everyone notices something different about me but cannot tell what it is!',
      ru: 'Техника русских губ дала мне именно то, что я хотела - тонкое улучшение, которое выглядит совершенно естественно. Все замечают что-то новое во мне, но не могут понять, что именно!',
      id: 'Teknik Russian Lips memberi saya persis apa yang saya inginkan - peningkatan halus yang terlihat benar-benar alami. Semua orang memperhatikan sesuatu yang berbeda pada saya tapi tidak bisa mengatakan apa!',
    },
    rating: 5,
    date: '2024-09-20',
    featured: true,
  },
  {
    _type: 'testimonial',
    clientName: 'Svetlana M.',
    treatment: {
      en: 'Skin Boosters',
      ru: 'Скин-бустеры',
      id: 'Skin Booster',
    },
    quote: {
      en: 'After years of trying different treatments, I finally found someone who understands skin at a deeper level. Dr. Venera approach is holistic and the results speak for themselves.',
      ru: 'После многих лет разных процедур я наконец нашла специалиста, который понимает кожу на глубинном уровне. Подход доктора Венеры целостный, и результаты говорят сами за себя.',
      id: 'Setelah bertahun-tahun mencoba berbagai perawatan, saya akhirnya menemukan seseorang yang memahami kulit pada tingkat yang lebih dalam. Pendekatan Dr. Venera holistik dan hasilnya berbicara sendiri.',
    },
    rating: 5,
    date: '2024-08-10',
    featured: false,
  },
  {
    _type: 'testimonial',
    clientName: 'Dmitri R.',
    treatment: {
      en: 'Treatments for Men',
      ru: 'Процедуры для мужчин',
      id: 'Perawatan untuk Pria',
    },
    quote: {
      en: 'As a man, I was hesitant about aesthetic treatments, but Dr. Venera made me feel welcome. The results are subtle and professional - exactly what I needed to look refreshed without looking "done".',
      ru: 'Как мужчина, я сомневался насчёт эстетических процедур, но доктор Венера приняла меня радушно. Результаты тонкие и профессиональные - именно то, что мне нужно, чтобы выглядеть свежо, не выглядя "сделанным".',
      id: 'Sebagai pria, saya ragu tentang perawatan estetika, tapi Dr. Venera membuat saya merasa diterima. Hasilnya halus dan profesional - persis apa yang saya butuhkan untuk terlihat segar tanpa terlihat "dikerjakan".',
    },
    rating: 5,
    date: '2024-07-22',
    featured: false,
  },
];

async function seedTestimonials() {
  console.log('Starting testimonials seed...');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Testimonials to seed: ${testimonials.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const testimonial of testimonials) {
    try {
      // Check if testimonial already exists by client name and treatment
      const existing = await client.fetch(
        `*[_type == "testimonial" && clientName == $clientName][0]._id`,
        { clientName: testimonial.clientName }
      );

      if (existing) {
        // Update existing testimonial
        await client.patch(existing).set(testimonial).commit();
        console.log(`Updated: ${testimonial.clientName}`);
        updated++;
      } else {
        // Create new testimonial
        await client.create(testimonial);
        console.log(`Created: ${testimonial.clientName}`);
        created++;
      }
    } catch (error) {
      console.error(`Error with ${testimonial.clientName}:`, error);
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
    console.log('2. Navigate to Testimonials to verify the seeded data');
    console.log('3. Optionally add client photos through the Studio');
  } else {
    console.log('Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedTestimonials().catch(console.error);
