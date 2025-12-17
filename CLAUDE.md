# CLAUDE.md - Venera Cosmetology

---

## 🎯 QUICK START - NEW SESSION

**🎉 ALL EPICS COMPLETE + UI REFINEMENTS - PRODUCTION READY!**

**Latest Session: December 18, 2025**
- ✅ Fixed hero/navbar gap (hero now full-screen under header)
- ✅ About section slideshow (CMS-managed images/videos)
- ✅ Video audio controls for Hero & About sections
- ✅ Mute/volume UI controls with click-to-toggle
- ✅ Videos start muted by default

**What's New This Session:**
- ✅ **Hero Gap Fix:** Removed layout padding, hero now `min-h-screen`
- ✅ **About Slideshow:** New `aboutMediaItem` schema, up to 8 images/videos
- ✅ **Video Options:** `enableAudio` and `useVideoDuration` for both Hero & About
- ✅ **Volume Controls:** Mute button + slider (hover to reveal), click video to toggle mute
- ✅ **Smart Defaults:** Videos always start muted, reset on slide change

**What to Read First:**
1. `/venera_docs/devlogs/DEVLOG-DEC18-2025-ABOUT-SLIDESHOW-VIDEO-CONTROLS.md` - Latest session details
2. `/venera_docs/devlogs/DEVLOG-DEC17-2025-UI-REFINEMENTS-COMPLETE.md` - Previous session
3. This file (continue reading below)

**Production Site:** Deployed to Vercel (auto-deploy from main branch)

**Supabase Dashboard:** https://nawxbsmydrtmezifxtnz.supabase.co

**Sanity Studio:**
```bash
npm run sanity        # Start Sanity Studio at localhost:3333
```

**Current Branch:** `main`
**Repository:** https://github.com/dreemanuel/venera-silentium

**Quick Commands:**
```bash
cd /home/andre/Documents/_personal-projects/venera-cosmetology
npm run dev        # Start dev server at localhost:5173
npm run sanity     # Sanity Studio at localhost:3333
npm run build      # Production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

---

## 📊 COMPLETE STORY STATUS

### Epic 1: Foundation & Core Setup (5/5 complete) ✅
- [x] **Story 1.1:** Initialize React Router v7 Project ✅
- [x] **Story 1.2:** Configure Tailwind CSS v4 + Brand Colors ✅
- [x] **Story 1.3:** Implement i18n (EN/RU/ID) ✅
- [x] **Story 1.4:** Create Layout & Navigation ✅
- [x] **Story 1.5:** Setup Deployment Configuration ✅

### Epic 2: Content & Brand Experience (5/5 complete) ✅
- [x] **Story 2.1:** Initialize Sanity CMS ✅
- [x] **Story 2.2:** Implement Hero Section ✅
- [x] **Story 2.3:** About Dr. Venera Section ✅
- [x] **Story 2.4:** About Silentium Philosophy ✅
- [x] **Story 2.5:** About Page Assembly ✅

### Epic 3: Services Showcase (4/4 complete) ✅
- [x] **Story 3.1:** Services Schema & Seed Data ✅
- [x] **Story 3.2:** Services Gallery Component ✅
- [x] **Story 3.3:** Service Detail Page ✅
- [x] **Story 3.4:** Services Index Page ✅

### Epic 4: Contact & Lead Capture (5/5 complete) ✅
- [x] **Story 4.1:** Contact Form Component ✅
- [x] **Story 4.2:** Booking Form Component ✅
- [x] **Story 4.3:** Form Submission Storage (Supabase) ✅
- [x] **Story 4.4:** Notification System (Email/WhatsApp) ✅
- [x] **Story 4.5:** Contact Page Assembly ✅

### Epic 5: Polish, SEO & Launch (6/6 complete) ✅
- [x] **Story 5.1:** SEO Foundation ✅
- [x] **Story 5.2:** Performance Optimization ✅
- [x] **Story 5.3:** Error & Loading States ✅
- [x] **Story 5.4:** Cross-Browser Testing ✅
- [x] **Story 5.5:** Content Review ✅
- [x] **Story 5.6:** Production Deployment ✅

**Overall Progress:** 25/25 stories (100%) 🎉

---

## 🎨 BRAND SPECIFICATIONS (User Provided)

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Tea Green | `#CCD5AE` | Dark BGs, secondary accents |
| Beige | `#E9EDC9` | Dark BGs, secondary accents |
| Cornsilk | `#FEFAE0` | Light BGs (main background) |
| Papaya Whip | `#FAEDCD` | Light BGs, contrast texts |
| Payne's Gray | `#5C6B73` | Primary text, CTA, accents |

### Typography
| Element | Font | Source |
|---------|------|--------|
| H1, H2 (Display) | Ashford Serif | Local fonts |
| H3 | Bricolage Grotesque | Google Fonts |
| Body | EB Garamond | Google Fonts |
| Alt H1/H2 | Playwrite Ireland | Google Fonts (deprecated) |

### Tailwind Classes
```css
/* Colors */
bg-tea-green, bg-beige, bg-cornsilk, bg-papaya-whip, bg-paynes-gray
text-tea-green, text-beige, text-cornsilk, text-papaya-whip, text-paynes-gray

/* Fonts */
font-display   /* Ashford Serif (updated Dec 17) */
font-heading   /* Bricolage Grotesque */
font-body      /* EB Garamond */

/* Glassmorphism */
glass, glass-light, glass-dark
```

---

## Project Overview

Professional website for **Dr. Venera Frolova's** aesthetic cosmetology practice in Bali, Indonesia. The brand operates under the **Silentium** sanctuary concept - "where science meets spirit."

**Client**: Dr. Venera Frolova (Aesthetic Cosmetologist MD)
**Location**: Bali, Indonesia
**Target Audience**: Russian expats, international clients seeking non-surgical aesthetic treatments

## Brand Philosophy

> "Beauty is born in silence; in the stillness is where a woman finally hears herself."

Silentium positions aesthetic treatments as rituals of care, emphasizing:
- Natural beauty enhancement (not transformation)
- Inner harmony reflecting outer radiance
- Physician-led precision with spiritual wellness
- Authenticity and individuality preservation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Remix (React Router v7) |
| CMS | Sanity (headless) |
| Database | Supabase (PostgreSQL) |
| UI Components | HeroUI (Accordion, Image with zoom) |
| Styling | Tailwind CSS v4 + custom glassmorphism |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |
| Languages | English, Russian, Indonesian (i18n) |

## MVP Scope

**Included in MVP:**
- Marketing website with brand storytelling
- Services showcase (13 treatment categories) with accordion + image slideshow
- About Dr. Venera / Silentium philosophy
- Simple booking form → WhatsApp/email notification
- Contact form with lead capture
- Blog section with detail pages
- Testimonials carousel
- Brands showcase
- Image gallery carousel
- Promotional banner system (configurable per-page)
- Multilingual support (EN/RU/ID)
- SEO optimization
- Mobile-responsive design

**Post-MVP (Phase 2):**
- E-commerce (20 skincare products)
- Full calendar booking system with admin dashboard
- Real-time availability sync

## Key Directories

```
venera-cosmetology/
├── CLAUDE.md                 # This file - project instructions
├── app/                      # Application source code
│   ├── components/           # Reusable components
│   │   ├── layout/           # Header, Footer, MobileMenu, LanguageSwitcher
│   │   ├── sections/         # Page sections (Hero, About, Services, etc.)
│   │   └── ui/               # Button, form elements
│   ├── lib/                  # Utilities (i18n, sanity)
│   │   └── sanity/           # Sanity client, queries, types
│   ├── routes/               # Route components
│   │   └── $lang/            # Language-prefixed routes (en, ru, id)
│   │       ├── home.tsx
│   │       ├── about.tsx
│   │       ├── contact.tsx
│   │       ├── services.tsx
│   │       ├── services.$slug.tsx
│   │       ├── blog.tsx          # Blog index page
│   │       └── blog.$slug.tsx    # Blog detail page
│   ├── root.tsx              # Root layout
│   └── app.css               # Global styles + Tailwind theme
├── sanity/                   # Sanity CMS
│   ├── schemas/              # Document and object schemas
│   └── scripts/              # Seed scripts
├── public/                   # Static assets
│   ├── fonts/                # Ashford Serif fonts
│   └── locales/              # Translation JSON files (en, ru, id)
├── venera_docs/              # Project documentation
│   ├── stories/              # User story files
│   ├── devlogs/              # Session DEVLOGs
│   ├── prd.md                # Product Requirements Document
│   ├── architecture.md       # System Architecture
│   └── uxui-spec.md          # UI/UX Specification
├── bmad-agent/               # BMAD methodology resources
├── copywriting/              # Content files (services, about, etc.)
├── vercel.json               # Vercel deployment config
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## BMAD Workflow

This project uses the **BMAD (Breakthrough Method of Agile AI-driven Development)** framework.

### Agent Sequence
1. **Analyst (Ana)** → Project Brief
2. **Product Manager (Pam)** → PRD with Epics/Stories
3. **Design Architect (Dez)** → UI/UX Specification
4. **Architect (Archie)** → System Architecture
5. **Design Architect (Dez)** → Frontend Architecture
6. **Product Owner (Poe)** → Validate all documents
7. **Scrum Master (Sam)** → Generate individual stories
8. **Developers (Fran/Stacy)** → Implementation

### Invoking Agents
Reference agent personas from `/bmad-agent/personas/` and use templates from `/bmad-agent/templates/`.

## Services Offered

**Anti-Aging Injectables**: Botox, Fillers, Russian Lips, Polylactic Acid
**Skin Rejuvenation**: Mesotherapy (Facial, Scalp, Eye Area), Skin Boosters, Peeling
**Problem-Specific**: Acne, Pigmentation, Rosacea packages
**Specialized**: Lipolytics, Exosome therapy, Men's treatments
**Preparatory**: Facial Cleansing
**Consultation**: FREE (with contact capture)

## Design Direction

**Aesthetic Keywords**: Elegance, Calmness, Comfortable Confidence
**Color Palette**: Subtle, soft, earthy tones with Balinese influences
**Style References**:
- Webflow Purezai template (modern skincare, glassmorphism)
- Webflow Arcoria template (elegant, minimal, editorial luxury)

**UI Elements**:
- Glassmorphism effects
- Lazy loading animations
- Subtle blur/parallax effects
- High-end boutique feel
- Poetic, philosophical copywriting tone

## Development Commands

```bash
# Development
npm run dev           # React Router dev server at localhost:5173

# Build
npm run build         # Production build

# Sanity Studio
npm run sanity        # Sanity Studio at localhost:3333

# Type checking & Lint
npm run typecheck     # TypeScript check
npm run lint          # ESLint

# Seed Scripts
npm run seed:services        # Seed services to Sanity
npm run seed:services:force  # Force re-seed (updates existing)
```

## Content Sources

All service copywriting is available in `/copywriting/`:
- `Venera - About Venera.md` - Dr. Venera's story
- `About - Silentium.md` - Sanctuary philosophy
- `Venera - Services List.md` - Service overview
- Individual treatment files (Botox.md, Fillers.md, etc.)

## Important Notes

- **No prices on service pages** - consultation-driven model
- **Lead capture required** - contact form before booking/messaging
- **WhatsApp integration** - primary communication channel
- **Quality products emphasis** - Janssens products imported from Italy
- **Men's section** - dedicated treatments respecting masculine aesthetic needs

## Session Handoff

When starting a new session:
1. Read this CLAUDE.md for project context
2. Check `/venera_docs/` for current documentation status
3. Review the active Epic/Story in progress
4. Continue from the last completed milestone

---

## Recent Session Log

### December 18, 2025 - About Slideshow & Video Controls
**Status:** COMPLETE
**Commit:** `b109cbf`

**Key Changes:**
1. **Hero/Navbar Gap Fix** - Hero now full-screen under header
   - Removed padding from layout's main element
   - Hero uses `min-h-screen` instead of calc

2. **About Section Slideshow** - CMS-managed like hero
   - New schema: `sanity/schemas/objects/aboutMediaItem.ts`
   - Supports images + videos with auto-advance
   - Navigation dots for manual control

3. **Video Audio Controls** - For both Hero & About
   - `enableAudio` option in Sanity
   - `useVideoDuration` to play full video length
   - Mute/volume UI controls (About section)
   - Click video to toggle mute

**Files Modified:** 10 files, +477/-38 lines

---

### December 17, 2025 - UI Refinements
**Status:** COMPLETE
**Commits:** `78c7921`, `5ea9cf4`

**Key Changes:**
1. **Hero Media Slideshow** - CMS-managed with Ken Burns effect
   - New schema: `sanity/schemas/objects/heroMediaItem.ts`
   - Supports images + videos with 4 animation directions

2. **Typography Overhaul** - Ashford font with tight stacking
   - Word splitting with negative margins for hero titles
   - Font size: `md:text-[8rem] lg:text-[11rem]`

3. **Gallery Carousel** - Horizontal scrolling redesign
   - Height-fitted images (300-500px responsive)
   - Arrow navigation on hover

4. **Sanity CMS** - Expanded sidebar
   - Added: Gallery Images, Blog Posts, Brands, Promo Banners

**Files Modified:** 44 files, +1043/-252 lines

---

### December 10, 2025 - UI/UX Optimization
**Status:** COMPLETE
**Commit:** `032bdde`

See `/venera_docs/devlogs/DEVLOG-DEC10-2025-UXUI-OPTIMIZATION-COMPLETE.md`
