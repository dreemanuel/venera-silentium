# CLAUDE.md - Venera Cosmetology

---

## 🎯 QUICK START - NEW SESSION

**✅ Epic 1, 2, 3 & 4 COMPLETE + Stories 5.1, 5.2 & 5.3 COMPLETE!**

**Latest Session: December 8, 2025 (Night)**
- ✅ Epic 1: Foundation & Project Setup (5/5 stories)
- ✅ Epic 2: Content & Brand Experience (5/5 stories)
- ✅ Epic 3: Services Showcase (4/4 stories)
- ✅ Epic 4: Contact & Lead Capture (5/5 stories)
- ✅ Story 5.1: SEO Foundation
- ✅ Story 5.2: Performance Optimization
- ✅ Story 5.3: Error & Loading States **JUST COMPLETED**

**What's New This Session:**
- ✅ SEO Foundation (Story 5.1): generateMeta, structured data, sitemap.xml, robots.txt, hreflang
- ✅ Performance Optimization (Story 5.2): Responsive images, caching, lazy loading
- ✅ Error & Loading States (Story 5.3):
  - Custom 404 page with brand styling (catch-all route)
  - Enhanced ErrorBoundary with i18n support (EN, RU, ID)
  - Comprehensive Skeleton component library
  - NavigationProgress for route transitions
  - cn utility (clsx + tailwind-merge)

**What to Read First:**
1. `/venera_docs/stories/story-5.3-error-loading-states.md` - Just completed
2. `/venera_docs/stories/story-5.4-cross-browser-testing.md` - Next story
3. This file (continue reading below)

**⚠️ IMMEDIATE NEXT STEPS:**

1. **Continue with Story 5.4:** Cross-Browser Testing

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

### Epic 5: Polish, SEO & Launch (3/6 complete)
- [x] **Story 5.1:** SEO Foundation ✅
- [x] **Story 5.2:** Performance Optimization ✅
- [x] **Story 5.3:** Error & Loading States ✅
- [ ] **Story 5.4:** Cross-Browser Testing ⬅️ **NEXT**
- [ ] **Story 5.5:** Content Review
- [ ] **Story 5.6:** Production Deployment

**Overall Progress:** 22/25 stories (88%)

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
| H1, H2 | Playwrite Ireland | Google Fonts |
| H3 | Bricolage Grotesque | Google Fonts |
| Body | EB Garamond | Google Fonts |
| Alt H1/H2 | Ashford Serif | Local (available) |

### Tailwind Classes
```css
/* Colors */
bg-tea-green, bg-beige, bg-cornsilk, bg-papaya-whip, bg-paynes-gray
text-tea-green, text-beige, text-cornsilk, text-papaya-whip, text-paynes-gray

/* Fonts */
font-display   /* Playwrite Ireland */
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
| Styling | Tailwind CSS + custom glassmorphism |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Deployment | Vercel or Cloudflare Workers |
| Languages | English, Russian, Indonesian (i18n) |

## MVP Scope

**Included in MVP:**
- Marketing website with brand storytelling
- Services showcase (13 treatment categories)
- About Dr. Venera / Silentium philosophy
- Simple booking form → WhatsApp/email notification
- Contact form with lead capture
- Multilingual support (EN/RU/ID)
- SEO optimization
- Mobile-responsive design

**Post-MVP (Phase 2):**
- E-commerce (20 skincare products)
- Full calendar booking system with admin dashboard
- Blog/content section
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
│   │       └── services.$slug.tsx
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
