# CLAUDE.md - Venera Cosmetology

---

## 🎯 QUICK START - NEW SESSION

**✅ Epic 1 & 2 COMPLETE - Foundation + Content & Brand Experience**

**Latest Session: December 8, 2025**
- ✅ Epic 1: Foundation & Project Setup (5/5 stories)
- ✅ Epic 2: Content & Brand Experience (5/5 stories)
- ✅ Sanity CMS initialized (Project ID: `qibofery`, Dataset: `production`)
- ✅ Hero, About, Silentium sections with Framer Motion animations
- ✅ About page and Contact page routes created
- ✅ ContactCTA component for lead capture
- ✅ i18n fallback pattern (Sanity CMS → translation files)

**What to Read First:**
1. `/venera_docs/devlogs/DEVLOG-DEC08-2025-EPIC-2-COMPLETE.md` ⭐ **START HERE**
2. `/venera_docs/stories/story-3.1-services-schema.md` - Next story
3. This file (continue reading below)

**⚠️ IMMEDIATE NEXT STEPS:**

1. **Start Epic 3: Services Showcase** (Story 3.1)
   - Services Schema & Seed Data
   - Reference copywriting in `/copywriting/` for content

2. **Connect Vercel** (if not done):
   - Go to [vercel.com](https://vercel.com)
   - Import `dreemanuel/venera-silentium` from GitHub
   - Add env vars: `SANITY_PROJECT_ID=qibofery`, `SANITY_DATASET=production`

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

### Epic 3: Services Showcase (0/4 complete)
- [ ] **Story 3.1:** Services Schema & Seed Data ⬅️ **START HERE**
- [ ] **Story 3.2:** Services Gallery Component
- [ ] **Story 3.3:** Service Detail Page
- [ ] **Story 3.4:** Services Index Page

### Epic 4: Contact & Lead Capture (0/5 complete)
- [ ] **Story 4.1:** Contact Form Component
- [ ] **Story 4.2:** Booking Form Component
- [ ] **Story 4.3:** Form Submission Storage (Supabase)
- [ ] **Story 4.4:** Notification System (Email/WhatsApp)
- [ ] **Story 4.5:** Contact Page Assembly

### Epic 5: Polish, SEO & Launch (0/6 complete)
- [ ] **Story 5.1:** SEO Foundation
- [ ] **Story 5.2:** Performance Optimization
- [ ] **Story 5.3:** Error & Loading States
- [ ] **Story 5.4:** Cross-Browser Testing
- [ ] **Story 5.5:** Content Review
- [ ] **Story 5.6:** Production Deployment

**Overall Progress:** 10/25 stories (40%)

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
│   │   └── ui/               # Button, form elements
│   ├── lib/                  # Utilities (i18n config)
│   ├── routes/               # Route components
│   │   └── $lang/            # Language-prefixed routes (en, ru, id)
│   ├── root.tsx              # Root layout
│   └── app.css               # Global styles + Tailwind theme
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
# Development (once project is initialized)
npm run dev

# Build
npm run build

# Sanity Studio
npm run sanity

# Type checking
npm run typecheck
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
