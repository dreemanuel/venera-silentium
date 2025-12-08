/**
 * Sanity Blog Posts Seed Script
 *
 * Seeds sample blog posts into Sanity CMS.
 *
 * Run from project root:
 *    npx tsx sanity/scripts/seed-blog-posts.ts
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

type BlogCategory = 'skincare-tips' | 'treatment-guides' | 'wellness' | 'news';

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

interface BlogPostSeed {
  _type: 'blogPost';
  title: { en: string; ru: string; id: string };
  slug: { _type: 'slug'; current: string };
  excerpt: { en: string; ru: string; id: string };
  content: {
    en: ReturnType<typeof createPortableText>;
    ru: ReturnType<typeof createPortableText>;
    id: ReturnType<typeof createPortableText>;
  };
  category: BlogCategory;
  author: string;
  publishedAt: string;
  featured: boolean;
}

// Sample blog posts
const blogPosts: BlogPostSeed[] = [
  {
    _type: 'blogPost',
    title: {
      en: 'Understanding Your Skin: A Guide to Skin Types',
      ru: 'Понимание вашей кожи: руководство по типам кожи',
      id: 'Memahami Kulit Anda: Panduan Jenis Kulit',
    },
    slug: { _type: 'slug', current: 'understanding-skin-types' },
    excerpt: {
      en: 'Discover your unique skin type and learn how to care for it properly. Every skin tells a story, and understanding yours is the first step to radiant beauty.',
      ru: 'Откройте свой уникальный тип кожи и узнайте, как правильно за ней ухаживать. Каждая кожа рассказывает свою историю, и понимание вашей - первый шаг к сияющей красоте.',
      id: 'Temukan jenis kulit unik Anda dan pelajari cara merawatnya dengan benar. Setiap kulit menceritakan kisah, dan memahami milik Anda adalah langkah pertama menuju kecantikan bercahaya.',
    },
    content: {
      en: createPortableText(`Understanding your skin type is the foundation of any effective skincare routine. At Woman Silentium, we believe that true beauty begins with knowledge—knowledge of yourself, your skin, and what it needs to thrive.

There are five main skin types: normal, dry, oily, combination, and sensitive. Each type has its own characteristics and requires different care approaches.

Normal skin is well-balanced, with minimal imperfections and a healthy glow. It requires maintenance rather than correction, focusing on preservation and protection.

Dry skin often feels tight and may show fine lines more prominently. It craves hydration and benefits from rich, nourishing ingredients that restore the skin barrier.

Oily skin produces excess sebum, leading to shine and potential breakouts. The key is gentle cleansing and lightweight hydration that doesn't clog pores.

Combination skin features both oily and dry areas, typically with an oily T-zone. This type benefits from targeted treatments that address different areas accordingly.

Sensitive skin reacts easily to products and environmental factors. It requires gentle, soothing ingredients and careful introduction of new products.

During your consultation at Woman Silentium, Dr. Venera will analyze your skin thoroughly and create a personalized treatment plan that respects your skin's unique needs.`),
      ru: createPortableText(`Понимание вашего типа кожи — это основа любого эффективного ухода за кожей. В Woman Silentium мы верим, что истинная красота начинается со знания — знания о себе, своей коже и о том, что ей нужно для процветания.

Существует пять основных типов кожи: нормальная, сухая, жирная, комбинированная и чувствительная. Каждый тип имеет свои характеристики и требует разных подходов к уходу.

Нормальная кожа хорошо сбалансирована, с минимальными несовершенствами и здоровым сиянием. Она требует поддержания, а не коррекции, с фокусом на сохранение и защиту.

Сухая кожа часто ощущается стянутой и может демонстрировать более заметные мелкие морщины. Она жаждет увлажнения и выигрывает от богатых питательных ингредиентов, восстанавливающих барьер кожи.

Жирная кожа производит избыток себума, что приводит к блеску и потенциальным высыпаниям. Ключ — это мягкое очищение и лёгкое увлажнение, которое не забивает поры.

Комбинированная кожа имеет как жирные, так и сухие участки, обычно с жирной Т-зоной. Этот тип выигрывает от целевых процедур, которые обращаются к разным зонам соответственно.

Чувствительная кожа легко реагирует на продукты и факторы окружающей среды. Она требует мягких, успокаивающих ингредиентов и осторожного введения новых продуктов.

Во время консультации в Woman Silentium доктор Венера тщательно проанализирует вашу кожу и создаст персонализированный план процедур, который уважает уникальные потребности вашей кожи.`),
      id: createPortableText(`Memahami jenis kulit Anda adalah dasar dari rutinitas perawatan kulit yang efektif. Di Woman Silentium, kami percaya bahwa kecantikan sejati dimulai dengan pengetahuan—pengetahuan tentang diri sendiri, kulit Anda, dan apa yang dibutuhkannya untuk berkembang.

Ada lima jenis kulit utama: normal, kering, berminyak, kombinasi, dan sensitif. Setiap jenis memiliki karakteristiknya sendiri dan memerlukan pendekatan perawatan yang berbeda.

Kulit normal seimbang, dengan ketidaksempurnaan minimal dan cahaya sehat. Memerlukan pemeliharaan daripada koreksi, fokus pada pelestarian dan perlindungan.

Kulit kering sering terasa kencang dan mungkin menunjukkan garis halus lebih jelas. Membutuhkan hidrasi dan manfaat dari bahan kaya bergizi yang memulihkan penghalang kulit.

Kulit berminyak menghasilkan sebum berlebih, menyebabkan kilau dan potensi jerawat. Kuncinya adalah pembersihan lembut dan hidrasi ringan yang tidak menyumbat pori.

Kulit kombinasi memiliki area berminyak dan kering, biasanya dengan T-zone berminyak. Jenis ini mendapat manfaat dari perawatan bertarget yang mengatasi area yang berbeda sesuai.

Kulit sensitif bereaksi mudah terhadap produk dan faktor lingkungan. Membutuhkan bahan lembut, menenangkan dan pengenalan produk baru yang hati-hati.

Selama konsultasi Anda di Woman Silentium, Dr. Venera akan menganalisis kulit Anda secara menyeluruh dan membuat rencana perawatan yang dipersonalisasi yang menghormati kebutuhan unik kulit Anda.`),
    },
    category: 'skincare-tips',
    author: 'Dr. Venera Frolova',
    publishedAt: '2024-11-20T10:00:00Z',
    featured: true,
  },
  {
    _type: 'blogPost',
    title: {
      en: 'The Art of Botox: What to Expect',
      ru: 'Искусство ботокса: чего ожидать',
      id: 'Seni Botox: Apa yang Diharapkan',
    },
    slug: { _type: 'slug', current: 'art-of-botox' },
    excerpt: {
      en: 'Demystifying Botox treatments and what makes our approach at Woman Silentium unique. Natural results that enhance, not transform.',
      ru: 'Развеиваем мифы о процедурах ботокса и рассказываем, что делает наш подход в Woman Silentium уникальным. Естественные результаты, которые улучшают, а не трансформируют.',
      id: 'Menghilangkan mitos perawatan Botox dan apa yang membuat pendekatan kami di Woman Silentium unik. Hasil alami yang meningkatkan, bukan mengubah.',
    },
    content: {
      en: createPortableText(`Botox has become one of the most popular aesthetic treatments worldwide, yet misconceptions still abound. At Woman Silentium, we approach Botox as an art form—a subtle touch that preserves your natural expression while softening the signs of time.

What is Botox? Botox is a purified protein that temporarily relaxes specific muscles, reducing the appearance of dynamic wrinkles—those caused by facial expressions. It's been safely used for decades in both medical and cosmetic applications.

The Woman Silentium Difference: Our philosophy centers on enhancement, not transformation. Dr. Venera's approach focuses on maintaining your natural expressions while addressing concerns like forehead lines, crow's feet, and frown lines.

What to Expect: The treatment itself takes only 15-30 minutes. Using ultra-fine needles, small amounts of Botox are precisely placed into targeted muscles. Most patients describe the sensation as a slight pinch.

Recovery and Results: There's minimal downtime—you can return to most activities immediately. Results typically appear within 3-7 days and last 3-4 months. With regular treatments, many patients find their results last longer over time.

Preparing for Your Visit: Avoid blood-thinning medications and alcohol for a few days before treatment to minimize any bruising. Come to your appointment with a clean face, free of makeup.

The consultation is essential. We'll discuss your concerns, analyze your facial anatomy, and create a customized treatment plan that respects your unique features and desired outcomes.`),
      ru: createPortableText(`Ботокс стал одной из самых популярных эстетических процедур в мире, однако заблуждения всё ещё распространены. В Woman Silentium мы подходим к ботоксу как к форме искусства — тонкое прикосновение, которое сохраняет вашу естественную мимику, смягчая признаки времени.

Что такое ботокс? Ботокс — это очищенный белок, который временно расслабляет определённые мышцы, уменьшая появление динамических морщин — тех, что вызваны мимикой. Он безопасно используется десятилетиями как в медицинских, так и в косметических целях.

Отличие Woman Silentium: Наша философия сосредоточена на улучшении, а не на трансформации. Подход доктора Венеры направлен на сохранение ваших естественных выражений лица при работе с такими проблемами, как морщины на лбу, гусиные лапки и межбровные складки.

Чего ожидать: Сама процедура занимает всего 15-30 минут. С помощью ультратонких игл небольшие количества ботокса точно вводятся в целевые мышцы. Большинство пациентов описывают ощущение как лёгкий щипок.

Восстановление и результаты: Минимальное время восстановления — вы можете вернуться к большинству занятий немедленно. Результаты обычно появляются в течение 3-7 дней и длятся 3-4 месяца. При регулярных процедурах многие пациенты отмечают, что результаты со временем сохраняются дольше.

Подготовка к визиту: Избегайте разжижающих кровь препаратов и алкоголя за несколько дней до процедуры, чтобы минимизировать синяки. Приходите на приём с чистым лицом, без макияжа.

Консультация необходима. Мы обсудим ваши проблемы, проанализируем анатомию вашего лица и создадим индивидуальный план лечения, который уважает ваши уникальные черты и желаемые результаты.`),
      id: createPortableText(`Botox telah menjadi salah satu perawatan estetika paling populer di seluruh dunia, namun kesalahpahaman masih banyak. Di Woman Silentium, kami mendekati Botox sebagai bentuk seni—sentuhan halus yang mempertahankan ekspresi alami Anda sambil melembutkan tanda-tanda waktu.

Apa itu Botox? Botox adalah protein murni yang sementara merelaksasi otot-otot tertentu, mengurangi penampilan kerutan dinamis—yang disebabkan oleh ekspresi wajah. Telah digunakan dengan aman selama beberapa dekade dalam aplikasi medis dan kosmetik.

Perbedaan Woman Silentium: Filosofi kami berpusat pada peningkatan, bukan transformasi. Pendekatan Dr. Venera berfokus pada mempertahankan ekspresi alami Anda sambil mengatasi kekhawatiran seperti garis dahi, kaki gagak, dan garis kerutan.

Apa yang Diharapkan: Perawatan itu sendiri hanya memakan waktu 15-30 menit. Menggunakan jarum ultra-halus, sejumlah kecil Botox ditempatkan dengan tepat ke otot yang ditargetkan. Kebanyakan pasien menggambarkan sensasinya sebagai cubitan ringan.

Pemulihan dan Hasil: Ada waktu henti minimal—Anda dapat kembali ke sebagian besar aktivitas segera. Hasil biasanya muncul dalam 3-7 hari dan bertahan 3-4 bulan. Dengan perawatan teratur, banyak pasien menemukan hasil mereka bertahan lebih lama seiring waktu.

Persiapan untuk Kunjungan Anda: Hindari obat pengencer darah dan alkohol selama beberapa hari sebelum perawatan untuk meminimalkan memar. Datang ke janji temu dengan wajah bersih, bebas makeup.

Konsultasi sangat penting. Kami akan mendiskusikan kekhawatiran Anda, menganalisis anatomi wajah Anda, dan membuat rencana perawatan yang disesuaikan yang menghormati fitur unik dan hasil yang diinginkan.`),
    },
    category: 'treatment-guides',
    author: 'Dr. Venera Frolova',
    publishedAt: '2024-10-15T10:00:00Z',
    featured: true,
  },
  {
    _type: 'blogPost',
    title: {
      en: 'The Connection Between Inner Peace and Outer Beauty',
      ru: 'Связь между внутренним покоем и внешней красотой',
      id: 'Hubungan Antara Kedamaian Batin dan Kecantikan Luar',
    },
    slug: { _type: 'slug', current: 'inner-peace-outer-beauty' },
    excerpt: {
      en: 'Exploring the philosophy behind Woman Silentium: how finding stillness within reflects as radiance without.',
      ru: 'Исследуем философию Woman Silentium: как обретение внутренней тишины отражается внешним сиянием.',
      id: 'Menjelajahi filosofi di balik Woman Silentium: bagaimana menemukan keheningan di dalam tercermin sebagai cahaya di luar.',
    },
    content: {
      en: createPortableText(`At the heart of Woman Silentium lies a profound truth: beauty is born in silence. This isn't merely a poetic sentiment—it's the foundation of our entire approach to aesthetic care.

In our busy modern lives, we often forget to pause. We rush from one obligation to another, our minds cluttered with to-do lists and worries. This internal chaos manifests externally—in tired eyes, tense expressions, and skin that seems to have lost its glow.

The name "Silentium" comes from the Latin word for silence. It represents the quiet space where true transformation begins. When a woman finds stillness within herself, when she takes a moment to truly listen to her needs, she discovers her authentic beauty.

This philosophy guides every aspect of our practice. From the moment you enter Woman Silentium, you're invited to slow down. Our treatment rooms are designed as sanctuaries of calm, where the outside world fades away.

The treatments themselves become rituals of self-care. Whether it's a facial mesotherapy session or a consultation about fillers, each interaction is an opportunity for introspection and renewal.

We encourage our clients to view their aesthetic journey as part of a larger practice of self-love. The results you see in the mirror should reflect not just physical enhancements, but a deeper sense of peace and confidence that comes from within.

True beauty transcends skin deep. When you feel at peace with yourself, when you embrace your unique features and care for yourself mindfully, that inner light shines outward for everyone to see.`),
      ru: createPortableText(`В сердце Woman Silentium лежит глубокая истина: красота рождается в тишине. Это не просто поэтическое чувство — это основа всего нашего подхода к эстетическому уходу.

В нашей напряжённой современной жизни мы часто забываем делать паузы. Мы спешим от одного обязательства к другому, наши умы загромождены списками дел и беспокойствами. Этот внутренний хаос проявляется внешне — в усталых глазах, напряжённых выражениях и коже, которая, кажется, потеряла своё сияние.

Название "Silentium" происходит от латинского слова, означающего тишину. Оно представляет то тихое пространство, где начинается истинная трансформация. Когда женщина находит тишину внутри себя, когда она на мгновение по-настоящему прислушивается к своим потребностям, она открывает свою подлинную красоту.

Эта философия направляет каждый аспект нашей практики. С момента, когда вы входите в Woman Silentium, вас приглашают замедлиться. Наши процедурные кабинеты созданы как святилища спокойствия, где внешний мир отступает.

Сами процедуры становятся ритуалами заботы о себе. Будь то сеанс мезотерапии лица или консультация о филлерах, каждое взаимодействие — это возможность для самоанализа и обновления.

Мы поощряем наших клиентов рассматривать свой эстетический путь как часть более широкой практики любви к себе. Результаты, которые вы видите в зеркале, должны отражать не только физические улучшения, но и более глубокое чувство покоя и уверенности, которое исходит изнутри.

Истинная красота выходит за пределы кожи. Когда вы чувствуете себя в мире с собой, когда вы принимаете свои уникальные черты и заботитесь о себе осознанно, этот внутренний свет сияет наружу для всех.`),
      id: createPortableText(`Di jantung Woman Silentium terletak kebenaran mendalam: kecantikan lahir dalam keheningan. Ini bukan sekadar sentimen puitis—ini adalah fondasi dari seluruh pendekatan kami terhadap perawatan estetika.

Dalam kehidupan modern kita yang sibuk, kita sering lupa untuk berhenti sejenak. Kita bergegas dari satu kewajiban ke kewajiban lain, pikiran kita penuh dengan daftar tugas dan kekhawatiran. Kekacauan internal ini termanifestasi secara eksternal—di mata yang lelah, ekspresi tegang, dan kulit yang tampaknya kehilangan cahayanya.

Nama "Silentium" berasal dari kata Latin untuk keheningan. Ini mewakili ruang tenang di mana transformasi sejati dimulai. Ketika seorang wanita menemukan keheningan dalam dirinya, ketika dia meluangkan waktu untuk benar-benar mendengarkan kebutuhannya, dia menemukan kecantikan aslinya.

Filosofi ini memandu setiap aspek praktik kami. Dari saat Anda memasuki Woman Silentium, Anda diundang untuk memperlambat. Ruang perawatan kami dirancang sebagai tempat suci ketenangan, di mana dunia luar memudar.

Perawatan itu sendiri menjadi ritual perawatan diri. Baik itu sesi mesoterapi wajah atau konsultasi tentang filler, setiap interaksi adalah kesempatan untuk introspeksi dan pembaruan.

Kami mendorong klien kami untuk melihat perjalanan estetika mereka sebagai bagian dari praktik cinta diri yang lebih besar. Hasil yang Anda lihat di cermin harus mencerminkan tidak hanya peningkatan fisik, tetapi rasa damai dan kepercayaan diri yang lebih dalam yang datang dari dalam.

Kecantikan sejati melampaui kulit. Ketika Anda merasa damai dengan diri sendiri, ketika Anda merangkul fitur unik Anda dan merawat diri dengan penuh kesadaran, cahaya batin itu bersinar keluar untuk dilihat semua orang.`),
    },
    category: 'wellness',
    author: 'Dr. Venera Frolova',
    publishedAt: '2024-09-01T10:00:00Z',
    featured: true,
  },
];

async function seedBlogPosts() {
  console.log('Starting blog posts seed...');
  console.log(`Project: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Blog posts to seed: ${blogPosts.length}`);
  console.log('');

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const post of blogPosts) {
    try {
      // Check if blog post already exists by slug
      const existing = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]._id`,
        { slug: post.slug.current }
      );

      if (existing) {
        // Update existing blog post
        await client.patch(existing).set(post).commit();
        console.log(`Updated: ${post.title.en}`);
        updated++;
      } else {
        // Create new blog post
        await client.create(post);
        console.log(`Created: ${post.title.en}`);
        created++;
      }
    } catch (error) {
      console.error(`Error with ${post.title.en}:`, error);
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
    console.log('2. Navigate to Blog Posts to verify the seeded data');
    console.log('3. Upload featured images for each post');
    console.log('4. Optionally link related services');
  } else {
    console.log('Seed completed with some errors. Please check the logs above.');
  }
}

// Run the seed
seedBlogPosts().catch(console.error);
