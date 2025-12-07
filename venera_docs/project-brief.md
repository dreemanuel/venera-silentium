# Project Brief: Venera Cosmetology / Silentium

## Introduction / Problem Statement

Dr. Venera Frolova is an experienced Aesthetic Cosmetologist MD based in Bali, Indonesia, specializing in non-surgical injectable treatments. Despite her medical expertise and growing clientele among Russian expats and international visitors, she lacks a professional digital presence that reflects her brand philosophy and medical credibility.

The current state relies primarily on word-of-mouth and social media, which limits:
- **Discoverability** for potential clients searching online
- **Credibility signaling** that differentiates her from unqualified practitioners
- **Lead capture** and client relationship management
- **Service communication** in multiple languages for diverse clientele
- **Brand storytelling** that conveys the unique Silentium sanctuary experience

This project addresses these gaps by creating a sophisticated, multilingual website that positions Dr. Venera as a premium, physician-led aesthetic practice while embodying the Silentium philosophy of beauty through inner harmony.

## Vision & Goals

### Vision
To establish Silentium as the premier destination for conscious beauty seekers in Bali—a digital sanctuary where prospective clients experience the brand's philosophy of elegance, calmness, and authentic transformation before ever stepping through the door.

### Primary Goals (MVP)

1. **Launch Professional Web Presence**: Deploy a fully functional, multilingual website (EN/RU/ID) that establishes credibility and differentiates Dr. Venera from competitors within the project timeline.

2. **Enable Lead Capture**: Implement contact and booking request forms that capture visitor information for follow-up, targeting a conversion rate baseline for future optimization.

3. **Showcase Services Effectively**: Present all 13 treatment categories with compelling, brand-aligned copywriting that educates visitors and drives consultation requests.

4. **Communicate Brand Philosophy**: Translate the Silentium sanctuary concept into a cohesive digital experience through design, content, and interaction patterns.

5. **Optimize for Discovery**: Implement foundational SEO best practices to improve organic search visibility for relevant treatment and location keywords.

### Success Metrics (Initial Ideas)

- Website live and accessible in 3 languages
- Contact form submissions tracked and measurable
- Booking request forms generating WhatsApp/email notifications
- Page load time under 3 seconds on mobile
- Mobile-responsive design passing Google's mobile-friendly test
- Basic SEO implementation (meta tags, structured data, sitemap)

## Target Audience / Users

### Primary Audience: Russian Expats in Bali
- **Demographics**: Women (and men) aged 25-55, upper-middle-class professionals
- **Location**: Residing in or frequently visiting Bali
- **Language**: Russian-speaking, comfortable with English
- **Mindset**: Value quality, safety, and medical professionalism; seek natural results
- **Behavior**: Research online before booking; value peer recommendations; active on WhatsApp

### Secondary Audience: International Expats & Tourists
- **Demographics**: Health-conscious individuals from various countries
- **Location**: Bali residents or visitors
- **Language**: Primarily English, some Indonesian
- **Mindset**: Seeking premium aesthetic services during their Bali stay
- **Behavior**: Compare options online; value credentials and reviews

### Tertiary Audience: Indonesian Locals
- **Demographics**: Affluent Indonesians interested in aesthetic treatments
- **Language**: Indonesian, English
- **Behavior**: Growing interest in non-surgical aesthetic procedures

### User Needs
- Clear information about treatments and expected outcomes
- Confidence in practitioner qualifications and product quality
- Easy way to request consultations or ask questions
- Multilingual content for comfort and clarity
- Visual evidence of results (before/after, testimonials)

## Key Features / Scope (High-Level Ideas for MVP)

### Core Website Features
- **Hero Section**: Impactful brand introduction with Silentium philosophy
- **About Dr. Venera**: Professional background, training, philosophy, credentials
- **About Silentium**: Sanctuary concept and brand story
- **Services Showcase**: Interactive gallery of 13 treatment categories
- **Individual Service Pages**: Detailed information for each treatment
- **Contact Section**: Location hints, contact form, WhatsApp integration
- **Booking Request Form**: Simple form capturing details, triggering WhatsApp/email

### Technical Features
- **Multilingual Support**: English, Russian, Indonesian with language switcher
- **Responsive Design**: Mobile-first approach for all screen sizes
- **CMS Integration**: Sanity for content management (services, about content)
- **Form Handling**: Supabase for submission storage, notification triggers
- **SEO Foundation**: Meta tags, Open Graph, structured data, sitemap

### Design Features
- **Glassmorphism UI**: Modern, elegant visual effects
- **Subtle Animations**: Framer Motion for page transitions, reveals
- **Brand Typography**: Custom fonts reflecting elegance
- **Imagery**: High-quality treatment and ambiance photography

## Post-MVP Features / Scope and Ideas

### Phase 2: E-commerce
- Product catalog (20 skincare products)
- Shopping cart and checkout flow
- Stripe payment integration
- Order management

### Phase 2: Advanced Booking
- Real-time availability calendar
- Admin dashboard for appointment management
- Supabase real-time sync
- Automated confirmation emails

### Phase 2: Content & Engagement
- Blog section for skincare tips and updates
- Testimonials with photo gallery
- Before/after gallery (with consent)
- Newsletter signup and email marketing

### Future Considerations
- Client portal for booking history
- Loyalty/referral program
- Video consultations
- Integration with practice management software

## Known Technical Constraints or Preferences

### Constraints
- **Budget**: Development budget of ~$1,200 one-time + $100/month recurring
- **Timeline**: Target completion within 2-month window
- **Content**: All copywriting provided; images/media to be supplied by client
- **Hosting**: Must stay within free/low-cost tier limits initially

### Initial Architectural Preferences
- **Repository Structure**: Monorepo (single repository for web app + Sanity studio)
- **Service Architecture**: Monolithic Remix application with headless CMS
- **Framework**: Remix (React Router v7) for full-stack React with SSR
- **CMS**: Sanity (free tier, upgrade path available)
- **Database**: Supabase (free tier for form submissions and future features)
- **Deployment**: Vercel (primary) or Cloudflare Workers (alternative)

### Risks
- **Content Delivery**: Dependency on client providing images, testimonials, media
- **Scope Creep**: E-commerce and advanced booking deferred to Phase 2
- **i18n Complexity**: Three languages increases content management overhead
- **Third-party Dependencies**: WhatsApp Business API limitations for notifications

### User Preferences
- WhatsApp as primary communication channel (not email-first)
- No prices displayed on website (consultation-driven sales)
- Contact form required before any booking action (lead capture priority)
- Calming background audio considered but optional (user preference pending)
- QR code linking to special promo page (future feature)

## Relevant Research

### Competitive Landscape
- Most aesthetic clinics in Bali have generic, template-based websites
- Few competitors effectively communicate physician credentials
- Multilingual support is rare among local competitors
- Silentium's philosophical positioning is a differentiator

### Design References
- **Purezai (Webflow)**: Modern skincare aesthetic, glassmorphism, soft animations
- **Arcoria (Webflow)**: Elegant, minimal, editorial luxury feel
- Both templates inform the desired visual direction, to be blended with Balinese spiritual elements

### Technical Research
- Remix offers optimal balance of development speed (30-60 hours) and capability
- Sanity free tier sufficient for MVP content volume
- Supabase free tier supports 500MB database, 1GB file storage
- Vercel free tier supports Remix deployment with serverless functions

## PM Prompt

This Project Brief provides the full context for the Venera Cosmetology / Silentium website project. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements as your mode 1 programming allows.

Focus on:
1. Translating the MVP scope into clear functional and non-functional requirements
2. Defining UI design goals that capture the Silentium brand essence
3. Structuring epics that deliver incremental, deployable value
4. Sizing stories appropriately for AI agent execution (2-4 hour focused sessions)
5. Ensuring cross-cutting concerns (i18n, SEO, accessibility) flow through stories rather than being isolated
