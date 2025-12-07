# CLAUDE.md - Venera Cosmetology

---

## 🎯 QUICK START - NEW SESSION

**📋 Project Status: BMAD DOCUMENTATION COMPLETE - Ready for Development**

**Latest Session: December 7, 2025**
- ✅ Created all BMAD documentation (PRD, Architecture, UI/UX, Frontend)
- ✅ Generated 20 user stories across 5 epics
- ✅ Pushed to GitHub: `dreemanuel/venera-silentium`
- ✅ Set up project structure with curated media directory

**⚠️ IMMEDIATE NEXT STEP:**
Start **Story 1.1: Initialize Remix Project**

**What to Read First:**
1. `/venera_docs/devlogs/DEVLOG-DEC07-2025-PROJECT-INITIALIZATION-COMPLETE.md` - Session details
2. `/venera_docs/stories/story-1.1-initialize-remix-project.md` - First story
3. This file (continue reading below)

**Current Branch:** `main`
**Repository:** https://github.com/dreemanuel/venera-silentium

---

## 📊 COMPLETE STORY STATUS

### Epic 1: Foundation & Core Setup (0/5 complete)
- [ ] **Story 1.1:** Initialize Remix Project ⬅️ **START HERE**
- [ ] **Story 1.2:** Configure Tailwind CSS
- [ ] **Story 1.3:** Implement i18n (EN/RU/ID)
- [ ] **Story 1.4:** Create Layout & Navigation
- [ ] **Story 1.5:** Setup Deployment Pipeline

### Epic 2: Content & Brand Experience (0/5 complete)
- [ ] **Story 2.1:** Initialize Sanity CMS
- [ ] **Story 2.2:** Implement Hero Section
- [ ] **Story 2.3:** About Dr. Venera Section
- [ ] **Story 2.4:** About Silentium Philosophy
- [ ] **Story 2.5:** About Page Assembly

### Epic 3: Services Showcase (0/4 complete)
- [ ] **Story 3.1:** Services Schema & Seed Data
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
├── bmad-agent/               # BMAD methodology agents and templates
│   ├── personas/             # Agent persona definitions
│   ├── tasks/                # Task instructions
│   ├── templates/            # Document templates
│   └── checklists/           # Quality checklists
├── copywriting/              # Symlinked content files (services, about, etc.)
├── venera_docs/              # Project documentation
│   ├── __venera-branding.md  # Brand guidelines
│   ├── __website-project-recap.md  # Requirements summary
│   ├── __sanity-cms-notes.md # CMS technical notes
│   ├── project-brief.md      # BMAD: Analyst output
│   ├── prd.md                # BMAD: Product Requirements
│   ├── uxui-spec.md          # BMAD: UI/UX Specification
│   ├── architecture.md       # BMAD: System Architecture
│   ├── frontend-architecture.md  # BMAD: Frontend Architecture
│   ├── venera_fonts/         # Custom typography
│   ├── venera_images/        # Brand imagery
│   └── venera_media/         # Videos and media assets
└── src/                      # Application source (to be created)
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
