/**
 * Sanity Service Seed Script
 *
 * Seeds all 13 services from copywriting content into Sanity CMS.
 *
 * Prerequisites:
 * 1. Get an API token from Sanity.io:
 *    - Go to https://www.sanity.io/manage
 *    - Select project "venera-silentium" (qibofery)
 *    - Go to API → Tokens
 *    - Create a new token with "Editor" permissions
 *    - Copy the token to .env file as SANITY_API_TOKEN
 *
 * 2. Run from project root:
 *    npx tsx sanity/scripts/seed-services.ts
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
    console.log('📋 Using SANITY_API_TOKEN from .env');
    return process.env.SANITY_API_TOKEN;
  }

  // Fall back to Sanity CLI config (local development)
  const configPath = resolve(homedir(), '.config/sanity/config.json');
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      if (config.authToken) {
        console.log('📋 Using Sanity CLI auth token (from sanity login)');
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
  console.error('❌ SANITY_PROJECT_ID is not set in .env');
  process.exit(1);
}

if (!token) {
  console.error('❌ No Sanity auth token found');
  console.error('');
  console.error('Option 1: Login via CLI');
  console.error('  cd sanity && npx sanity login');
  console.error('');
  console.error('Option 2: Set SANITY_API_TOKEN in .env');
  console.error('  1. Go to https://www.sanity.io/manage');
  console.error('  2. Select project "venera-silentium"');
  console.error('  3. Go to API → Tokens');
  console.error('  4. Create a new token with "Editor" permissions');
  console.error('  5. Add it to .env as SANITY_API_TOKEN=your-token-here');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Service categories from schema
type ServiceCategory =
  | 'anti-aging-injectables'
  | 'skin-rejuvenation'
  | 'problem-specific'
  | 'specialized'
  | 'preparatory'
  | 'consultation';

interface ServiceSeed {
  _type: 'service';
  title: { en: string; ru: string; id: string };
  slug: { _type: 'slug'; current: string };
  category: ServiceCategory;
  shortDescription: { en: string; ru: string; id: string };
  description: {
    en: Array<{ _type: 'block'; children: Array<{ _type: 'span'; text: string }> }>;
    ru: Array<{ _type: 'block'; children: Array<{ _type: 'span'; text: string }> }>;
    id: Array<{ _type: 'block'; children: Array<{ _type: 'span'; text: string }> }>;
  };
  benefits: Array<{ en: string; ru: string; id: string }>;
  idealFor: { en: string; ru: string; id: string };
  duration: string;
  order: number;
  featured: boolean;
}

// Helper to create portable text block from string
function createPortableText(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  return paragraphs.map(paragraph => ({
    _type: 'block' as const,
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span' as const,
        _key: Math.random().toString(36).substring(7),
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

// Services data based on copywriting content
const services: ServiceSeed[] = [
  // Anti-Aging Injectables
  {
    _type: 'service',
    title: {
      en: 'Botox',
      ru: 'Ботокс',
      id: 'Botox',
    },
    slug: { _type: 'slug', current: 'botox' },
    category: 'anti-aging-injectables',
    shortDescription: {
      en: 'A touch of lightness and inner harmony where tension dissolves and the gaze becomes softer.',
      ru: 'Прикосновение лёгкости и внутренней гармонии, где напряжение растворяется, а взгляд становится мягче.',
      id: 'Sentuhan keringanan dan harmoni batin di mana ketegangan larut dan tatapan menjadi lebih lembut.',
    },
    description: {
      en: createPortableText(
        "Botox is a touch of lightness and inner harmony.\n\nIt's a subtle pause for the skin, where tension dissolves and the gaze becomes softer and deeper.\n\nIt's not just about wrinkle-free beauty; it's about the freedom to express oneself and the return of a natural radiance and tranquility that begins from within."
      ),
      ru: createPortableText(
        "Ботокс — это прикосновение лёгкости и внутренней гармонии.\n\nЭто тонкая пауза для кожи, где напряжение растворяется, а взгляд становится мягче и глубже.\n\nЭто не просто красота без морщин — это свобода самовыражения и возвращение естественного сияния и спокойствия, которое начинается изнутри."
      ),
      id: createPortableText(
        "Botox adalah sentuhan keringanan dan harmoni batin.\n\nIni adalah jeda halus untuk kulit, di mana ketegangan larut dan tatapan menjadi lebih lembut dan dalam.\n\nIni bukan hanya tentang kecantikan tanpa kerut; ini tentang kebebasan berekspresi dan kembalinya cahaya alami dan ketenangan yang dimulai dari dalam."
      ),
    },
    benefits: [
      { en: 'Reduces fine lines and wrinkles', ru: 'Уменьшает мелкие морщины', id: 'Mengurangi garis halus dan kerutan' },
      { en: 'Softens expression lines', ru: 'Смягчает мимические линии', id: 'Melembutkan garis ekspresi' },
      { en: 'Natural-looking results', ru: 'Естественный результат', id: 'Hasil yang terlihat alami' },
      { en: 'Quick, minimal downtime', ru: 'Быстро, минимальное восстановление', id: 'Cepat, waktu pemulihan minimal' },
    ],
    idealFor: {
      en: 'Those seeking subtle rejuvenation while maintaining natural expression',
      ru: 'Для тех, кто ищет мягкое омоложение, сохраняя естественную мимику',
      id: 'Bagi yang mencari peremajaan halus sambil mempertahankan ekspresi alami',
    },
    duration: '30-45 minutes',
    order: 1,
    featured: true,
  },
  {
    _type: 'service',
    title: {
      en: 'Dermal Fillers',
      ru: 'Филлеры',
      id: 'Filler Dermal',
    },
    slug: { _type: 'slug', current: 'fillers' },
    category: 'anti-aging-injectables',
    shortDescription: {
      en: 'Gentle alchemy that enhances your sense of harmony while maintaining natural beauty.',
      ru: 'Нежная алхимия, усиливающая чувство гармонии, сохраняя естественную красоту.',
      id: 'Alkimia lembut yang meningkatkan rasa harmoni sambil menjaga kecantikan alami.',
    },
    description: {
      en: createPortableText(
        "A facial filler is not just about correcting your features, but about gently touching your beauty. It's a subtle alchemy where a drop of the product not only fills your skin but also enhances your sense of harmony.\n\nIt's about seeing yourself rejuvenated—fresh, radiant, and confident, while maintaining your natural beauty and inner glow."
      ),
      ru: createPortableText(
        "Филлеры — это не просто коррекция черт лица, а нежное прикосновение к вашей красоте. Это тонкая алхимия, где капля продукта не только заполняет кожу, но и усиливает чувство гармонии.\n\nЭто возможность увидеть себя помолодевшей — свежей, сияющей и уверенной, сохраняя естественную красоту и внутреннее свечение."
      ),
      id: createPortableText(
        "Filler wajah bukan hanya tentang mengoreksi fitur Anda, tetapi tentang menyentuh kecantikan Anda dengan lembut. Ini adalah alkimia halus di mana setetes produk tidak hanya mengisi kulit Anda tetapi juga meningkatkan rasa harmoni.\n\nIni tentang melihat diri Anda diremajakan—segar, bercahaya, dan percaya diri, sambil mempertahankan kecantikan alami dan cahaya batin Anda."
      ),
    },
    benefits: [
      { en: 'Restores facial volume', ru: 'Восстанавливает объём лица', id: 'Memulihkan volume wajah' },
      { en: 'Softens deep lines', ru: 'Смягчает глубокие морщины', id: 'Melembutkan garis dalam' },
      { en: 'Enhances facial contours', ru: 'Улучшает контуры лица', id: 'Meningkatkan kontur wajah' },
      { en: 'Immediate, natural results', ru: 'Мгновенный естественный результат', id: 'Hasil alami dan langsung' },
    ],
    idealFor: {
      en: 'Those wanting to restore volume and enhance natural facial contours',
      ru: 'Для тех, кто хочет восстановить объём и улучшить естественные контуры лица',
      id: 'Bagi yang ingin memulihkan volume dan meningkatkan kontur wajah alami',
    },
    duration: '45-60 minutes',
    order: 2,
    featured: true,
  },
  {
    _type: 'service',
    title: {
      en: 'Russian Lips',
      ru: 'Русские губы',
      id: 'Russian Lips',
    },
    slug: { _type: 'slug', current: 'russian-lips' },
    category: 'anti-aging-injectables',
    shortDescription: {
      en: 'The art of emphasizing natural femininity through delicate lip enhancement.',
      ru: 'Искусство подчёркивания естественной женственности через деликатное увеличение губ.',
      id: 'Seni menekankan feminitas alami melalui peningkatan bibir yang halus.',
    },
    description: {
      en: createPortableText(
        "Russian Lips is the art of emphasizing natural femininity through a delicate touch on the lip line. A slight emphasis on the core, harmony of curves, and soft volume create an image that combines sensuality and purity.\n\nThis is not only a correction, but also a ritual of returning to oneself—to one's tenderness, courage, and inner radiance."
      ),
      ru: createPortableText(
        "Русские губы — это искусство подчёркивания естественной женственности через деликатное прикосновение к линии губ. Лёгкий акцент на ядре, гармония изгибов и мягкий объём создают образ, сочетающий чувственность и чистоту.\n\nЭто не только коррекция, но и ритуал возвращения к себе — к своей нежности, смелости и внутреннему сиянию."
      ),
      id: createPortableText(
        "Russian Lips adalah seni menekankan feminitas alami melalui sentuhan halus pada garis bibir. Penekanan ringan pada inti, harmoni lekukan, dan volume lembut menciptakan citra yang menggabungkan sensualitas dan kemurnian.\n\nIni bukan hanya koreksi, tetapi juga ritual kembali ke diri sendiri—ke kelembutan, keberanian, dan cahaya batin seseorang."
      ),
    },
    benefits: [
      { en: 'Natural lip enhancement', ru: 'Естественное увеличение губ', id: 'Peningkatan bibir alami' },
      { en: 'Defined lip border', ru: 'Чёткий контур губ', id: 'Batas bibir yang terdefinisi' },
      { en: 'Soft, natural volume', ru: 'Мягкий естественный объём', id: 'Volume lembut dan alami' },
      { en: 'Enhanced lip symmetry', ru: 'Улучшенная симметрия губ', id: 'Simetri bibir yang ditingkatkan' },
    ],
    idealFor: {
      en: 'Those seeking elegant, natural-looking lip enhancement',
      ru: 'Для тех, кто ищет элегантное и естественное увеличение губ',
      id: 'Bagi yang mencari peningkatan bibir yang elegan dan terlihat alami',
    },
    duration: '45-60 minutes',
    order: 3,
    featured: true,
  },

  // Skin Rejuvenation
  {
    _type: 'service',
    title: {
      en: 'Facial Mesotherapy',
      ru: 'Мезотерапия лица',
      id: 'Mesoterapi Wajah',
    },
    slug: { _type: 'slug', current: 'facial-mesotherapy' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A small step towards a big glow where the skin comes to life as if after rain.',
      ru: 'Маленький шаг к большому сиянию, когда кожа оживает, словно после дождя.',
      id: 'Langkah kecil menuju cahaya besar di mana kulit menjadi hidup seolah setelah hujan.',
    },
    description: {
      en: createPortableText(
        "Mesotherapy for the face is a small step towards a big glow.\n\nThe skin comes to life as if after a rain, and the soul remembers its feminine power. Inside, there is a sense of peace and beauty that does not require haste."
      ),
      ru: createPortableText(
        "Мезотерапия лица — это маленький шаг к большому сиянию.\n\nКожа оживает, словно после дождя, и душа вспоминает свою женскую силу. Внутри появляется чувство покоя и красоты, не требующей спешки."
      ),
      id: createPortableText(
        "Mesoterapi untuk wajah adalah langkah kecil menuju cahaya besar.\n\nKulit menjadi hidup seolah setelah hujan, dan jiwa mengingat kekuatan femininnya. Di dalam, ada rasa damai dan kecantikan yang tidak memerlukan terburu-buru."
      ),
    },
    benefits: [
      { en: 'Deep skin hydration', ru: 'Глубокое увлажнение кожи', id: 'Hidrasi kulit yang dalam' },
      { en: 'Improved skin texture', ru: 'Улучшенная текстура кожи', id: 'Tekstur kulit yang lebih baik' },
      { en: 'Natural radiance', ru: 'Естественное сияние', id: 'Cahaya alami' },
      { en: 'Collagen stimulation', ru: 'Стимуляция коллагена', id: 'Stimulasi kolagen' },
    ],
    idealFor: {
      en: 'Those seeking overall skin rejuvenation and improved hydration',
      ru: 'Для тех, кто ищет общее омоложение кожи и улучшенное увлажнение',
      id: 'Bagi yang mencari peremajaan kulit secara keseluruhan dan hidrasi yang lebih baik',
    },
    duration: '45-60 minutes',
    order: 4,
    featured: true,
  },
  {
    _type: 'service',
    title: {
      en: 'Scalp Mesotherapy',
      ru: 'Мезотерапия кожи головы',
      id: 'Mesoterapi Kulit Kepala',
    },
    slug: { _type: 'slug', current: 'scalp-mesotherapy' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A moment of gentle awakening where vitamins touch the roots like dew at dawn.',
      ru: 'Момент нежного пробуждения, когда витамины касаются корней, как роса на рассвете.',
      id: 'Momen kebangkitan lembut di mana vitamin menyentuh akar seperti embun di fajar.',
    },
    description: {
      en: createPortableText(
        "Scalp mesotherapy is a moment of gentle awakening.\n\nDrops of vitamins touch the roots like dew at dawn, awakening the power of the hair from within.\n\nIt's not just a procedure; it's a dialogue with oneself, where beauty and care become a silence where renewal is heard."
      ),
      ru: createPortableText(
        "Мезотерапия кожи головы — это момент нежного пробуждения.\n\nКапли витаминов касаются корней, как роса на рассвете, пробуждая силу волос изнутри.\n\nЭто не просто процедура — это диалог с собой, где красота и забота становятся тишиной, в которой слышно обновление."
      ),
      id: createPortableText(
        "Mesoterapi kulit kepala adalah momen kebangkitan yang lembut.\n\nTetes vitamin menyentuh akar seperti embun saat fajar, membangkitkan kekuatan rambut dari dalam.\n\nIni bukan hanya prosedur; ini adalah dialog dengan diri sendiri, di mana kecantikan dan perawatan menjadi keheningan di mana pembaruan terdengar."
      ),
    },
    benefits: [
      { en: 'Stimulates hair growth', ru: 'Стимулирует рост волос', id: 'Merangsang pertumbuhan rambut' },
      { en: 'Strengthens hair follicles', ru: 'Укрепляет волосяные фолликулы', id: 'Memperkuat folikel rambut' },
      { en: 'Nourishes the scalp', ru: 'Питает кожу головы', id: 'Menutrisi kulit kepala' },
      { en: 'Reduces hair loss', ru: 'Уменьшает выпадение волос', id: 'Mengurangi kerontokan rambut' },
    ],
    idealFor: {
      en: 'Those experiencing hair thinning or seeking healthier hair growth',
      ru: 'Для тех, кто страдает от истончения волос или хочет более здорового роста волос',
      id: 'Bagi yang mengalami penipisan rambut atau mencari pertumbuhan rambut yang lebih sehat',
    },
    duration: '30-45 minutes',
    order: 5,
    featured: false,
  },
  {
    _type: 'service',
    title: {
      en: 'Eye Area Mesotherapy',
      ru: 'Мезотерапия области глаз',
      id: 'Mesoterapi Area Mata',
    },
    slug: { _type: 'slug', current: 'eye-area-mesotherapy' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A gentle touch to awaken the light in your gaze and restore skin tone.',
      ru: 'Нежное прикосновение, чтобы пробудить свет во взгляде и восстановить тонус кожи.',
      id: 'Sentuhan lembut untuk membangkitkan cahaya dalam tatapan Anda dan memulihkan tonus kulit.',
    },
    description: {
      en: createPortableText(
        "Mesotherapy for the skin around the eyes is a gentle touch to the area where the secrets of our soul and the first signs of fatigue are stored.\n\nMicroinjections filled with vital energy and active substances awaken the light in our gaze, smooth out the shadows, and restore the skin's tone.\n\nThis is not just a skincare routine but a small ritual of feminine power, where the gaze becomes softer, clearer, and brighter, as if the silence within finds its reflection on the outside."
      ),
      ru: createPortableText(
        "Мезотерапия кожи вокруг глаз — это нежное прикосновение к области, где хранятся тайны нашей души и первые признаки усталости.\n\nМикроинъекции, наполненные жизненной энергией и активными веществами, пробуждают свет во взгляде, разглаживают тени и восстанавливают тонус кожи.\n\nЭто не просто уход за кожей, а маленький ритуал женской силы, где взгляд становится мягче, яснее и ярче, словно внутренняя тишина находит своё отражение снаружи."
      ),
      id: createPortableText(
        "Mesoterapi untuk kulit di sekitar mata adalah sentuhan lembut ke area di mana rahasia jiwa kita dan tanda-tanda pertama kelelahan tersimpan.\n\nMikroinjeksi yang diisi dengan energi vital dan zat aktif membangkitkan cahaya dalam tatapan kita, menghaluskan bayangan, dan memulihkan tonus kulit.\n\nIni bukan hanya rutinitas perawatan kulit tetapi ritual kecil kekuatan feminin, di mana tatapan menjadi lebih lembut, lebih jernih, dan lebih cerah, seolah keheningan di dalam menemukan refleksinya di luar."
      ),
    },
    benefits: [
      { en: 'Reduces dark circles', ru: 'Уменьшает тёмные круги', id: 'Mengurangi lingkaran hitam' },
      { en: 'Minimizes fine lines', ru: 'Минимизирует мелкие морщины', id: 'Meminimalkan garis halus' },
      { en: 'Brightens eye area', ru: 'Осветляет область глаз', id: 'Mencerahkan area mata' },
      { en: 'Restores skin elasticity', ru: 'Восстанавливает эластичность кожи', id: 'Memulihkan elastisitas kulit' },
    ],
    idealFor: {
      en: 'Those with tired-looking eyes, dark circles, or fine lines around the eyes',
      ru: 'Для тех, у кого усталый вид глаз, тёмные круги или мелкие морщины вокруг глаз',
      id: 'Bagi yang memiliki mata tampak lelah, lingkaran hitam, atau garis halus di sekitar mata',
    },
    duration: '30-45 minutes',
    order: 6,
    featured: false,
  },
  {
    _type: 'service',
    title: {
      en: 'Skin Boosters',
      ru: 'Скин-бустеры',
      id: 'Skin Booster',
    },
    slug: { _type: 'slug', current: 'skin-boosters' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A drop of light dissolved in the skin, returning freshness like a morning after a long night.',
      ru: 'Капля света, растворённая в коже, возвращающая свежесть, как утро после долгой ночи.',
      id: 'Setetes cahaya yang larut di kulit, mengembalikan kesegaran seperti pagi setelah malam yang panjang.',
    },
    description: {
      en: createPortableText(
        "Skin boosters are a drop of light dissolved in the skin. It does not change you, but returns a feeling of freshness, like a morning after a long night.\n\nWe call it the breath of the skin: soft, sensual, awakening. This is the moment when care becomes a ritual—and the inner silence is reflected by a soft glow outward."
      ),
      ru: createPortableText(
        "Скин-бустеры — это капля света, растворённая в коже. Они не меняют вас, а возвращают чувство свежести, как утро после долгой ночи.\n\nМы называем это дыханием кожи: мягким, чувственным, пробуждающим. Это момент, когда забота становится ритуалом — и внутренняя тишина отражается мягким свечением наружу."
      ),
      id: createPortableText(
        "Skin booster adalah setetes cahaya yang larut di kulit. Tidak mengubah Anda, tetapi mengembalikan perasaan segar, seperti pagi setelah malam yang panjang.\n\nKami menyebutnya napas kulit: lembut, sensual, membangkitkan. Ini adalah momen ketika perawatan menjadi ritual—dan keheningan batin tercermin oleh cahaya lembut ke luar."
      ),
    },
    benefits: [
      { en: 'Intense hydration', ru: 'Интенсивное увлажнение', id: 'Hidrasi intens' },
      { en: 'Improved skin quality', ru: 'Улучшение качества кожи', id: 'Kualitas kulit yang lebih baik' },
      { en: 'Natural glow', ru: 'Естественное сияние', id: 'Cahaya alami' },
      { en: 'Long-lasting results', ru: 'Длительный результат', id: 'Hasil yang tahan lama' },
    ],
    idealFor: {
      en: 'Those seeking deep hydration and overall skin quality improvement',
      ru: 'Для тех, кто ищет глубокое увлажнение и улучшение общего качества кожи',
      id: 'Bagi yang mencari hidrasi mendalam dan peningkatan kualitas kulit secara keseluruhan',
    },
    duration: '45-60 minutes',
    order: 7,
    featured: true,
  },
  {
    _type: 'service',
    title: {
      en: 'Chemical Peeling',
      ru: 'Химический пилинг',
      id: 'Peeling Kimia',
    },
    slug: { _type: 'slug', current: 'peeling' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A gentle touch of renewal where skin frees itself to reveal natural radiance.',
      ru: 'Нежное прикосновение обновления, когда кожа освобождается, чтобы раскрыть естественное сияние.',
      id: 'Sentuhan pembaruan yang lembut di mana kulit membebaskan diri untuk mengungkapkan cahaya alami.',
    },
    description: {
      en: createPortableText(
        "Peeling is a gentle touch of renewal.\n\nIt is a light breath of the skin as it frees itself from fatigue and rough layers to reveal its natural radiance. It is not only a care, but also an inner symbol—allowing oneself to leave the past behind and embrace the new with ease.\n\nEvery movement is like a ritual, where sensuality is combined with care, and beauty becomes a reflection of inner harmony."
      ),
      ru: createPortableText(
        "Пилинг — это нежное прикосновение обновления.\n\nЭто лёгкое дыхание кожи, когда она освобождается от усталости и грубых слоёв, чтобы раскрыть естественное сияние. Это не только уход, но и внутренний символ — позволить себе оставить прошлое позади и с лёгкостью принять новое.\n\nКаждое движение — как ритуал, где чувственность сочетается с заботой, а красота становится отражением внутренней гармонии."
      ),
      id: createPortableText(
        "Peeling adalah sentuhan pembaruan yang lembut.\n\nIni adalah napas ringan kulit saat membebaskan diri dari kelelahan dan lapisan kasar untuk mengungkapkan cahaya alaminya. Ini bukan hanya perawatan, tetapi juga simbol batin—mengizinkan diri sendiri meninggalkan masa lalu dan menerima yang baru dengan mudah.\n\nSetiap gerakan seperti ritual, di mana sensualitas dikombinasikan dengan perawatan, dan kecantikan menjadi refleksi harmoni batin."
      ),
    },
    benefits: [
      { en: 'Removes dead skin cells', ru: 'Удаляет омертвевшие клетки кожи', id: 'Mengangkat sel kulit mati' },
      { en: 'Evens skin tone', ru: 'Выравнивает тон кожи', id: 'Meratakan warna kulit' },
      { en: 'Stimulates cell renewal', ru: 'Стимулирует обновление клеток', id: 'Merangsang pembaruan sel' },
      { en: 'Improves texture', ru: 'Улучшает текстуру', id: 'Memperbaiki tekstur' },
    ],
    idealFor: {
      en: 'Those seeking skin renewal, improved texture, and a brighter complexion',
      ru: 'Для тех, кто ищет обновление кожи, улучшенную текстуру и более яркий цвет лица',
      id: 'Bagi yang mencari pembaruan kulit, tekstur yang lebih baik, dan kulit yang lebih cerah',
    },
    duration: '30-45 minutes',
    order: 8,
    featured: false,
  },

  // Problem-Specific Treatments
  {
    _type: 'service',
    title: {
      en: 'Acne, Pigmentation & Rosacea Treatment',
      ru: 'Лечение акне, пигментации и розацеа',
      id: 'Perawatan Jerawat, Pigmentasi & Rosacea',
    },
    slug: { _type: 'slug', current: 'acne-pigmentation-rosacea' },
    category: 'problem-specific',
    shortDescription: {
      en: 'A gentle path to purity and softness, restoring harmony to the skin.',
      ru: 'Нежный путь к чистоте и мягкости, восстанавливающий гармонию кожи.',
      id: 'Jalan lembut menuju kemurnian dan kelembutan, memulihkan harmoni kulit.',
    },
    description: {
      en: createPortableText(
        "There is light in every woman, and the skin only reflects it.\n\nOur treatments are a gentle path to purity and softness: liberation from acne, dissolution of pigmentation, and calming of rosacea.\n\nWe work not only with the surface, but also with the depth, restoring harmony to the skin and a sense of inner radiance to the soul."
      ),
      ru: createPortableText(
        "В каждой женщине есть свет, и кожа лишь отражает его.\n\nНаши процедуры — это нежный путь к чистоте и мягкости: освобождение от акне, растворение пигментации и успокоение розацеа.\n\nМы работаем не только с поверхностью, но и с глубиной, восстанавливая гармонию кожи и чувство внутреннего сияния души."
      ),
      id: createPortableText(
        "Ada cahaya dalam setiap wanita, dan kulit hanya mencerminkannya.\n\nPerawatan kami adalah jalan lembut menuju kemurnian dan kelembutan: pembebasan dari jerawat, penghilangan pigmentasi, dan menenangkan rosacea.\n\nKami tidak hanya bekerja dengan permukaan, tetapi juga dengan kedalaman, memulihkan harmoni kulit dan rasa cahaya batin jiwa."
      ),
    },
    benefits: [
      { en: 'Clears acne breakouts', ru: 'Очищает акне', id: 'Membersihkan jerawat' },
      { en: 'Reduces pigmentation', ru: 'Уменьшает пигментацию', id: 'Mengurangi pigmentasi' },
      { en: 'Calms rosacea redness', ru: 'Успокаивает покраснение розацеа', id: 'Menenangkan kemerahan rosacea' },
      { en: 'Restores skin balance', ru: 'Восстанавливает баланс кожи', id: 'Memulihkan keseimbangan kulit' },
    ],
    idealFor: {
      en: 'Those struggling with acne, uneven skin tone, or rosacea',
      ru: 'Для тех, кто борется с акне, неровным тоном кожи или розацеа',
      id: 'Bagi yang berjuang dengan jerawat, warna kulit tidak merata, atau rosacea',
    },
    duration: '60-90 minutes',
    order: 9,
    featured: false,
  },

  // Specialized Treatments
  {
    _type: 'service',
    title: {
      en: 'Exosome Therapy',
      ru: 'Экзосомная терапия',
      id: 'Terapi Exosome',
    },
    slug: { _type: 'slug', current: 'exosome' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'Advanced cellular regeneration therapy for deep skin renewal and rejuvenation.',
      ru: 'Передовая клеточная регенеративная терапия для глубокого обновления и омоложения кожи.',
      id: 'Terapi regenerasi seluler canggih untuk pembaruan dan peremajaan kulit yang mendalam.',
    },
    description: {
      en: createPortableText(
        "Exosome therapy represents the cutting edge of regenerative aesthetics.\n\nThese tiny messengers carry the energy of living cells, communicating signals of renewal and repair to your skin. Combined with polylactic acid and collagen, this treatment triggers natural renewal processes.\n\nIt is a moment of deep reboot, when every cell is filled with life, and beauty becomes a revelation of inner balance and self-care."
      ),
      ru: createPortableText(
        "Экзосомная терапия представляет передовой край регенеративной эстетики.\n\nЭти крошечные посланники несут энергию живых клеток, передавая сигналы обновления и восстановления вашей коже. В сочетании с полимолочной кислотой и коллагеном эта процедура запускает естественные процессы обновления.\n\nЭто момент глубокой перезагрузки, когда каждая клетка наполняется жизнью, а красота становится откровением внутреннего баланса и заботы о себе."
      ),
      id: createPortableText(
        "Terapi exosome mewakili garis depan estetika regeneratif.\n\nPembawa pesan kecil ini membawa energi sel hidup, mengkomunikasikan sinyal pembaruan dan perbaikan ke kulit Anda. Dikombinasikan dengan asam polilaktat dan kolagen, perawatan ini memicu proses pembaruan alami.\n\nIni adalah momen reboot mendalam, ketika setiap sel dipenuhi dengan kehidupan, dan kecantikan menjadi wahyu keseimbangan batin dan perawatan diri."
      ),
    },
    benefits: [
      { en: 'Cellular regeneration', ru: 'Клеточная регенерация', id: 'Regenerasi seluler' },
      { en: 'Deep skin renewal', ru: 'Глубокое обновление кожи', id: 'Pembaruan kulit yang dalam' },
      { en: 'Improved elasticity', ru: 'Улучшенная эластичность', id: 'Elastisitas yang ditingkatkan' },
      { en: 'Long-lasting rejuvenation', ru: 'Длительное омоложение', id: 'Peremajaan yang tahan lama' },
    ],
    idealFor: {
      en: 'Those seeking advanced anti-aging and cellular regeneration',
      ru: 'Для тех, кто ищет передовое омоложение и клеточную регенерацию',
      id: 'Bagi yang mencari anti-penuaan canggih dan regenerasi seluler',
    },
    duration: '60-90 minutes',
    order: 10,
    featured: false,
  },
  {
    _type: 'service',
    title: {
      en: 'Lipolytics',
      ru: 'Липолитики',
      id: 'Lipolitik',
    },
    slug: { _type: 'slug', current: 'lipolytics' },
    category: 'problem-specific',
    shortDescription: {
      en: 'The art of liberation—gentle injections helping the body release what weighs it down.',
      ru: 'Искусство освобождения — нежные инъекции, помогающие телу избавиться от того, что его тяготит.',
      id: 'Seni pembebasan—injeksi lembut membantu tubuh melepaskan apa yang membebaninya.',
    },
    description: {
      en: createPortableText(
        "Lipolytics are the art of liberation.\n\nGentle injections help the body to get rid of what weighs it down, allowing the contours to sound more graceful and the skin to glow with freshness. It is a process where external transformation is combined with an inner feeling of lightness and freedom.\n\nIt is as if you are removing an invisible weight, creating space for a new sense of femininity and joy in your own body."
      ),
      ru: createPortableText(
        "Липолитики — это искусство освобождения.\n\nНежные инъекции помогают телу избавиться от того, что его тяготит, позволяя контурам звучать более изящно, а коже сиять свежестью. Это процесс, где внешняя трансформация сочетается с внутренним чувством лёгкости и свободы.\n\nСловно вы снимаете невидимый груз, создавая пространство для нового чувства женственности и радости в собственном теле."
      ),
      id: createPortableText(
        "Lipolitik adalah seni pembebasan.\n\nInjeksi lembut membantu tubuh menyingkirkan apa yang membebaninya, memungkinkan kontur terdengar lebih anggun dan kulit bersinar dengan kesegaran. Ini adalah proses di mana transformasi eksternal dikombinasikan dengan perasaan ringan dan kebebasan batin.\n\nSeolah-olah Anda melepaskan beban yang tidak terlihat, menciptakan ruang untuk rasa feminitas baru dan kegembiraan dalam tubuh Anda sendiri."
      ),
    },
    benefits: [
      { en: 'Reduces localized fat', ru: 'Уменьшает локализованный жир', id: 'Mengurangi lemak lokal' },
      { en: 'Improves body contours', ru: 'Улучшает контуры тела', id: 'Memperbaiki kontur tubuh' },
      { en: 'Non-surgical approach', ru: 'Безоперационный подход', id: 'Pendekatan non-bedah' },
      { en: 'Natural-looking results', ru: 'Естественный результат', id: 'Hasil yang terlihat alami' },
    ],
    idealFor: {
      en: 'Those seeking non-surgical body contouring and fat reduction',
      ru: 'Для тех, кто ищет безоперационную коррекцию фигуры и уменьшение жира',
      id: 'Bagi yang mencari kontur tubuh non-bedah dan pengurangan lemak',
    },
    duration: '45-60 minutes',
    order: 11,
    featured: false,
  },
  {
    _type: 'service',
    title: {
      en: 'Treatments for Men',
      ru: 'Процедуры для мужчин',
      id: 'Perawatan untuk Pria',
    },
    slug: { _type: 'slug', current: 'treatments-for-men' },
    category: 'specialized',
    shortDescription: {
      en: 'Self-care becomes a natural extension of strength and inner balance.',
      ru: 'Уход за собой становится естественным продолжением силы и внутреннего баланса.',
      id: 'Perawatan diri menjadi perpanjangan alami dari kekuatan dan keseimbangan batin.',
    },
    description: {
      en: createPortableText(
        "Self-care becomes a natural extension of strength and inner balance.\n\nMen's skin requires special attention—cleansing, restoration, correction of age-related changes and fatigue. Here, the procedures are not about masking, but about a true return to oneself: a clear look, fresh face, and a feeling of lightness.\n\nThis is a space where care is combined with respect for male nature, and the external result reflects inner focus and harmony."
      ),
      ru: createPortableText(
        "Уход за собой становится естественным продолжением силы и внутреннего баланса.\n\nМужская кожа требует особого внимания — очищения, восстановления, коррекции возрастных изменений и усталости. Здесь процедуры не о маскировке, а об истинном возвращении к себе: ясный взгляд, свежее лицо и ощущение лёгкости.\n\nЭто пространство, где забота сочетается с уважением к мужской природе, а внешний результат отражает внутреннюю сосредоточенность и гармонию."
      ),
      id: createPortableText(
        "Perawatan diri menjadi perpanjangan alami dari kekuatan dan keseimbangan batin.\n\nKulit pria memerlukan perhatian khusus—pembersihan, pemulihan, koreksi perubahan terkait usia dan kelelahan. Di sini, prosedur bukan tentang menutupi, tetapi tentang kembali yang sejati ke diri sendiri: tatapan yang jernih, wajah segar, dan perasaan ringan.\n\nIni adalah ruang di mana perawatan dikombinasikan dengan rasa hormat terhadap sifat pria, dan hasil eksternal mencerminkan fokus dan harmoni batin."
      ),
    },
    benefits: [
      { en: 'Tailored for male skin', ru: 'Адаптировано для мужской кожи', id: 'Disesuaikan untuk kulit pria' },
      { en: 'Addresses fatigue signs', ru: 'Устраняет признаки усталости', id: 'Mengatasi tanda-tanda kelelahan' },
      { en: 'Natural, subtle results', ru: 'Естественный, тонкий результат', id: 'Hasil alami dan halus' },
      { en: 'Maintains masculine features', ru: 'Сохраняет мужские черты', id: 'Mempertahankan fitur maskulin' },
    ],
    idealFor: {
      en: 'Men seeking professional skincare and subtle rejuvenation',
      ru: 'Мужчины, ищущие профессиональный уход за кожей и тонкое омоложение',
      id: 'Pria yang mencari perawatan kulit profesional dan peremajaan halus',
    },
    duration: '45-90 minutes',
    order: 12,
    featured: false,
  },

  // Preparatory Procedures
  {
    _type: 'service',
    title: {
      en: 'Facial Cleansing',
      ru: 'Чистка лица',
      id: 'Pembersihan Wajah',
    },
    slug: { _type: 'slug', current: 'facial-cleansing' },
    category: 'skin-rejuvenation',
    shortDescription: {
      en: 'A moment of gentle liberation where cleansing becomes a ritual of renewal.',
      ru: 'Момент нежного освобождения, когда очищение становится ритуалом обновления.',
      id: 'Momen pembebasan lembut di mana pembersihan menjadi ritual pembaruan.',
    },
    description: {
      en: createPortableText(
        "Facial cleansing is not just about skin care, but a moment of gentle liberation and renewal.\n\nEvery touch is like a gentle dialogue with oneself, where cleansing becomes a ritual and the freshness of the skin reflects inner ease.\n\nIt is a space where care meets sensuality, and the purity of the skin meets the purity of thoughts."
      ),
      ru: createPortableText(
        "Чистка лица — это не просто уход за кожей, а момент нежного освобождения и обновления.\n\nКаждое прикосновение — как нежный диалог с собой, где очищение становится ритуалом, а свежесть кожи отражает внутреннюю лёгкость.\n\nЭто пространство, где забота встречается с чувственностью, а чистота кожи встречается с чистотой мыслей."
      ),
      id: createPortableText(
        "Pembersihan wajah bukan hanya tentang perawatan kulit, tetapi momen pembebasan dan pembaruan yang lembut.\n\nSetiap sentuhan seperti dialog lembut dengan diri sendiri, di mana pembersihan menjadi ritual dan kesegaran kulit mencerminkan kemudahan batin.\n\nIni adalah ruang di mana perawatan bertemu sensualitas, dan kemurnian kulit bertemu kemurnian pikiran."
      ),
    },
    benefits: [
      { en: 'Deep pore cleansing', ru: 'Глубокое очищение пор', id: 'Pembersihan pori mendalam' },
      { en: 'Removes impurities', ru: 'Удаляет загрязнения', id: 'Mengangkat kotoran' },
      { en: 'Prepares skin for treatments', ru: 'Подготавливает кожу к процедурам', id: 'Mempersiapkan kulit untuk perawatan' },
      { en: 'Refreshes complexion', ru: 'Освежает цвет лица', id: 'Menyegarkan kulit' },
    ],
    idealFor: {
      en: 'Everyone as a foundational step before other treatments',
      ru: 'Всем как основной шаг перед другими процедурами',
      id: 'Semua orang sebagai langkah dasar sebelum perawatan lainnya',
    },
    duration: '60-75 minutes',
    order: 13,
    featured: false,
  },

  // Consultation
  {
    _type: 'service',
    title: {
      en: 'Free Consultation',
      ru: 'Бесплатная консультация',
      id: 'Konsultasi Gratis',
    },
    slug: { _type: 'slug', current: 'consultation' },
    category: 'consultation',
    shortDescription: {
      en: 'Begin your journey with a complimentary consultation. We take time to understand your unique needs and craft a personalized treatment plan tailored just for you.',
      ru: 'Начните свой путь с бесплатной консультации. Мы уделяем время, чтобы понять ваши уникальные потребности и создать персонализированный план лечения специально для вас.',
      id: 'Mulai perjalanan Anda dengan konsultasi gratis. Kami meluangkan waktu untuk memahami kebutuhan unik Anda dan menyusun rencana perawatan yang dipersonalisasi khusus untuk Anda.',
    },
    description: {
      en: createPortableText(
        "Every journey to radiant beauty begins with understanding.\n\nOur complimentary consultation is a sacred space where we listen deeply to your desires, assess your unique features, and explore the possibilities together. Dr. Venera takes time to understand not just your skin, but your lifestyle, your concerns, and your vision of beauty.\n\nThis is where science meets intuition, where your story becomes the foundation for a personalized treatment plan crafted exclusively for you."
      ),
      ru: createPortableText(
        "Каждый путь к сияющей красоте начинается с понимания.\n\nНаша бесплатная консультация — это священное пространство, где мы внимательно слушаем ваши желания, оцениваем ваши уникальные особенности и вместе исследуем возможности. Доктор Венера уделяет время, чтобы понять не только вашу кожу, но и ваш образ жизни, ваши заботы и ваше видение красоты.\n\nЗдесь наука встречается с интуицией, где ваша история становится основой для персонализированного плана лечения, созданного исключительно для вас."
      ),
      id: createPortableText(
        "Setiap perjalanan menuju kecantikan yang bersinar dimulai dengan pemahaman.\n\nKonsultasi gratis kami adalah ruang sakral di mana kami mendengarkan dengan dalam keinginan Anda, menilai fitur unik Anda, dan menjelajahi kemungkinan bersama. Dr. Venera meluangkan waktu untuk memahami tidak hanya kulit Anda, tetapi gaya hidup, kekhawatiran, dan visi kecantikan Anda.\n\nDi sinilah sains bertemu intuisi, di mana cerita Anda menjadi fondasi untuk rencana perawatan yang dipersonalisasi yang dibuat khusus untuk Anda."
      ),
    },
    benefits: [
      { en: 'Personalized assessment', ru: 'Персонализированная оценка', id: 'Penilaian yang dipersonalisasi' },
      { en: 'Expert recommendations', ru: 'Экспертные рекомендации', id: 'Rekomendasi ahli' },
      { en: 'Customized treatment plan', ru: 'Индивидуальный план лечения', id: 'Rencana perawatan yang disesuaikan' },
      { en: 'No obligation', ru: 'Без обязательств', id: 'Tanpa kewajiban' },
    ],
    idealFor: {
      en: 'Anyone beginning their aesthetic journey or seeking expert guidance',
      ru: 'Для всех, кто начинает свой эстетический путь или ищет экспертное руководство',
      id: 'Siapa saja yang memulai perjalanan estetika atau mencari panduan ahli',
    },
    duration: '30-45 minutes',
    order: 14,
    featured: true,
  },
];

async function seedServices() {
  console.log('🌱 Starting service seed...');
  console.log(`📦 Project: ${projectId}`);
  console.log(`📊 Dataset: ${dataset}`);
  console.log(`📝 Services to seed: ${services.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const service of services) {
    try {
      // Check if service already exists
      const existing = await client.fetch(
        `*[_type == "service" && slug.current == $slug][0]._id`,
        { slug: service.slug.current }
      );

      if (existing) {
        // Update existing service
        await client.patch(existing).set(service).commit();
        console.log(`✏️  Updated: ${service.title.en}`);
        updated++;
      } else {
        // Create new service
        await client.create(service);
        console.log(`✅ Created: ${service.title.en}`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error with ${service.title.en}:`, error);
      errors++;
    }
  }

  console.log('');
  console.log('📊 Seed Summary:');
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log('');

  if (errors === 0) {
    console.log('✅ Seed completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run "npm run sanity" to open Sanity Studio');
    console.log('2. Navigate to Services to verify the seeded data');
    console.log('3. Add images to each service through the Studio');
  } else {
    console.log('⚠️  Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedServices().catch(console.error);
