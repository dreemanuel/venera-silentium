# CLAUDE.md - Venera Cosmetology

---

## 🎯 QUICK START - NEW SESSION

**🎉 ALL EPICS COMPLETE + COLOR SCHEME & VIDEO OPTIMIZATION COMPLETE**

**Latest Session: January 20, 2026**
- ✅ Yellow/gold color scheme fully implemented
- ✅ Gallery infinite carousel with hover wheel scrolling
- ✅ Video optimization: 73% size reduction (WebM + MP4 fallback)
- ✅ Sanity schema updated for dual video formats
- ✅ All changes merged to main and deployed

**What Was Accomplished:**
- ✅ **Color Scheme:** Replaced Payne's Gray → Deep Slate, Beige → Sand
- ✅ **New Colors:** Golden Bronze, Sand, Vanilla Custard accents
- ✅ **Services Accordion:** Inverse active state, animated chevron
- ✅ **Gallery Section:** 100vh height, infinite loop, dark-khaki background
- ✅ **Video Optimization:** Converted MP4 → WebM (11.3MB → 3.1MB)
- ✅ **Dual Video Support:** WebM primary, MP4 fallback for Safari

**⚠️ NEXT STEPS:**
1. Link WebM assets to Hero Media slides in Sanity Studio (if not done)
2. Test video playback on Safari to verify MP4 fallback
3. Run Lighthouse on production to verify performance

**What to Read First:**
1. `/venera_docs/devlogs/DEVLOG-JAN20-2026-COLOR-SCHEME-VIDEO-OPTIMIZATION-COMPLETE.md` - Latest session
2. This file (continue reading below)

**Production Site:** Deployed to Vercel (auto-deploy from main branch)

**Supabase Dashboard:** https://nawxbsmydrtmezifxtnz.supabase.co

**Sanity Studio:** https://venera-silentium.sanity.studio/
```bash
npm run sanity        # Local Sanity Studio at localhost:3333
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

### Color Palette (Implemented Jan 20, 2026)

> **Status:** Yellow/gold color scheme fully implemented.

**Background Colors**
| Color | Hex | Usage |
|-------|-----|-------|
| Vanilla Custard | `#E6D6A3` | Main page background |
| Cornsilk | `#FEFAE0` | Secondary backgrounds |
| Papaya Whip | `#FAEDCD` | Cards, secondary areas |
| Dark Khaki | `#3D3D29` | Gallery section background |

**Text Colors**
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Slate | `#3D4A4F` | Primary text, headings, CTAs |
| Cornsilk | `#FEFAE0` | Light text on dark backgrounds |

**Accent Colors**
| Color | Hex | Usage |
|-------|-----|-----------|
| Golden Bronze | `#BA9D26` | Navbar bg, hover states, accents |
| Sand | `#D2BE78` | Secondary buttons, highlights |

**Dark Colors (for sections/overlays)**
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Slate | `#3D4A4F` | Active accordion state |
| Dark Khaki | `#3D3D29` | Gallery section |
| Dark Coffee | `#2C2416` | Available for dark sections |
| Vanilla Custard | `#E6D6A3` | Light, soft gold |

~~**Deprecated Colors**~~
| Color | Hex | Status |
|-------|-----|--------|
| Tea Green | `#CCD5AE` | Replaced by yellow/gold accents |

### Typography
| Element | Font | Source |
|---------|------|--------|
| H1, H2 (Display) | Meganoli Sans | Local fonts (updated Jan 19, 2026) |
| H3 | Bricolage Grotesque | Google Fonts |
| Body | EB Garamond | Google Fonts |
| Alt H1/H2 | Playwrite Ireland | Google Fonts (deprecated) |

### Tailwind Classes
```css
/* Background Colors */
bg-cornsilk, bg-papaya-whip, bg-beige, bg-paynes-gray

/* Text Colors */
text-paynes-gray, text-cornsilk

/* Gold Accents (TBD - will add after selection) */
bg-golden-bronze (#BA9D26), bg-sand (#D2BE78), bg-vanilla-custard (#E6D6A3)

/* Deprecated */
bg-tea-green, text-tea-green  /* Being replaced */

/* Fonts */
font-display   /* Meganoli Sans (updated Jan 19, 2026) */
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
**Color Palette**: Warm, elegant tones—cornsilk/cream backgrounds, yellow/gold accents, Payne's Gray anchoring
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

### January 20, 2026 - Color Palette Update (Yellow/Gold Direction)
**Status:** DOCUMENTATION COMPLETE
**Branch:** `font-testing`

**Key Changes:**
1. **Font Changes Committed** - Previous session's font work now committed
   - Commit: `64686de` - feat: Replace display font with Meganoli Sans

2. **Color Palette Documentation Updated** - New yellow/gold direction
   - Updated PRD branding section
   - Updated UX/UI Spec with full color options
   - Updated CLAUDE.md brand specifications
   - Three gold accent options provided for client selection

**New Color Palette:**
- Backgrounds: Cornsilk `#FEFAE0`, Papaya Whip `#FAEDCD`, Beige `#E9EDC9`
- Text: Payne's Gray `#5C6B73`, Cornsilk (on dark)
- Gold Options: Golden Bronze `#BA9D26`, Sand `#D2BE78`, Vanilla Custard `#E6D6A3`
- Deprecated: Tea Green `#CCD5AE`

**Files Modified:** PRD, UX/UI Spec, CLAUDE.md

**Next:** Visual testing of gold shades, select primary, implement in Tailwind config

---

### January 19, 2026 - Font Change to Meganoli Sans
**Status:** COMMITTED (`64686de`)
**Branch:** `font-testing`

**Key Changes:**
1. **Display Font Change** - Meganoli Sans replaces Gilmoray
   - New font: `public/fonts/meganoli-sans.otf`
   - Updated `@font-face` and `--font-display` in `app/app.css`

2. **Hero Typography Adjustments** - Fixed text collision
   - Right-aligned title text
   - Reduced negative margins: `-mt-4 md:-mt-10 lg:-mt-16`

3. **SilentiumPhilosophy Legibility** - Improved text contrast
   - Overlay darkened from `bg-cornsilk/40` to `bg-cornsilk/60`

**Files Modified:** 3 files, +12/-4 lines

**Next:** Review visually, commit, merge to main

---

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
