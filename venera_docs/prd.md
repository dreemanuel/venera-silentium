# Venera Cosmetology / Silentium - Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Establish a professional, multilingual web presence that positions Dr. Venera as a credible, physician-led aesthetic practice in Bali
- Enable lead capture through contact and booking request forms that integrate with WhatsApp for follow-up
- Showcase 13 treatment categories with brand-aligned content that drives consultation requests
- Communicate the Silentium sanctuary philosophy through cohesive design and user experience
- Implement foundational SEO to improve organic discoverability for treatment and location keywords
- Deliver a mobile-responsive, performant website that loads under 3 seconds

### Background Context

Dr. Venera Frolova operates an aesthetic cosmetology practice in Bali specializing in non-surgical injectable treatments. Her clientele consists primarily of Russian expats and international visitors seeking premium, physician-led aesthetic services. The practice operates under the "Silentium" brand concept—a sanctuary where beauty treatments are positioned as rituals of care emphasizing inner harmony and authentic transformation.

Currently, the practice relies on word-of-mouth and social media, limiting discoverability and professional credibility signaling. This project creates a digital foundation that reflects the brand's sophisticated philosophy while capturing leads and educating potential clients about available treatments.

---

## Requirements

### Functional Requirements

- **FR1**: The website shall display content in three languages (English, Russian, Indonesian) with a persistent language switcher accessible from all pages.

- **FR2**: The website shall include a hero section on the homepage that introduces the Silentium brand philosophy with compelling visuals and messaging.

- **FR3**: The website shall display an "About Dr. Venera" section presenting her credentials, training background, experience, and philosophy.

- **FR4**: The website shall display an "About Silentium" section explaining the sanctuary concept and brand story.

- **FR5**: The website shall showcase all 13 treatment categories in an interactive services gallery with visual previews.

- **FR6**: Each treatment category shall have a dedicated detail page with description, benefits, and a call-to-action for consultation.

- **FR7**: The website shall include a contact form that captures name, email, phone, and message, storing submissions in Supabase.

- **FR8**: The website shall include a booking request form that captures name, contact info, preferred treatment, and preferred date/time range.

- **FR9**: Form submissions shall trigger a WhatsApp notification (via WhatsApp Business API or click-to-chat link) and/or email notification to Dr. Venera.

- **FR10**: The website shall display contact information including WhatsApp number, email, and general location area (not exact address).

- **FR11**: The website shall include a navigation bar with logo, language switcher, menu items, and a prominent CTA button.

- **FR12**: The website shall include a footer with social media links, quick navigation, and copyright information.

- **FR13**: All service copywriting content shall be manageable through Sanity CMS by a non-technical admin.

- **FR14**: The website shall include meta tags, Open Graph tags, and structured data for SEO on all pages.

- **FR15**: The website shall generate and expose a sitemap.xml for search engine indexing.

### Non-Functional Requirements

- **NFR1**: The website shall achieve a Lighthouse performance score of 80+ on mobile devices.

- **NFR2**: The website shall load initial content within 3 seconds on a 3G mobile connection.

- **NFR3**: The website shall be fully responsive across mobile (320px), tablet (768px), and desktop (1280px+) viewports.

- **NFR4**: The website shall pass Google's Mobile-Friendly Test.

- **NFR5**: The website shall implement HTTPS with a valid SSL certificate.

- **NFR6**: Form submissions shall be protected against spam using honeypot fields and/or rate limiting.

- **NFR7**: The website shall be accessible following WCAG 2.1 Level AA guidelines for core functionality.

- **NFR8**: The codebase shall use TypeScript with strict mode enabled for type safety.

- **NFR9**: The website infrastructure shall operate within Vercel/Cloudflare and Supabase free tier limits for MVP.

- **NFR10**: The Sanity CMS shall operate within free tier limits (10K API requests/month, 500MB assets).

---

## User Interface Design Goals

### Overall UX Vision

The website experience should feel like stepping into a serene sanctuary—calm, elegant, and confidence-inspiring. Users should feel they are entering a premium, physician-led practice that values their well-being over aggressive sales tactics. The design language balances modern sophistication with warm, earthy Balinese influences, creating a sense of trusted expertise wrapped in tranquil beauty.

The journey from landing to contact should feel effortless and emotionally resonant, with the brand's philosophical messaging woven naturally through visual storytelling rather than heavy text blocks.

### Key Interaction Paradigms

- **Scroll-driven storytelling**: Homepage unfolds the brand narrative through elegant sections with subtle reveal animations
- **Hover-to-discover**: Service gallery reveals treatment imagery on hover, encouraging exploration
- **Minimal friction forms**: Contact and booking forms are simple, focused, and encouraging rather than clinical
- **Persistent navigation**: Easy access to key actions (contact, language switch) from any page
- **Soft transitions**: Page transitions and element reveals use gentle easing, never jarring

### Core Screens and Views

- **Homepage**: Hero → Services preview → About preview → Testimonials hint → Contact CTA
- **About Page**: Dr. Venera story → Silentium philosophy → Credentials → Team (future)
- **Services Index**: Interactive gallery of all treatment categories
- **Service Detail Page**: Treatment description → Benefits → Process → CTA for consultation
- **Contact Page**: Contact form → Booking request form → Location/hours → WhatsApp direct link
- **Legal Pages**: Privacy Policy, Terms of Service (minimal, template-based)

### Accessibility

WCAG 2.1 Level AA compliance for:
- Sufficient color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alt text for images

### Branding

- **Typography**: Elegant serif for headings (from provided font collection), clean sans-serif for body
- **Color Palette**: Soft, earthy tones—cream backgrounds, muted gold accents, deep greens, charcoal text
- **Imagery**: High-quality photography emphasizing calm, luxury, natural beauty
- **Visual Effects**: Glassmorphism cards, subtle background blurs, soft shadows
- **Animation**: Gentle fade-ins, parallax hints, smooth hover states
- **Voice**: Poetic, philosophical, empowering—never clinical or salesy

### Target Devices and Platforms

- **Primary**: Mobile web (iOS Safari, Android Chrome)
- **Secondary**: Desktop web (Chrome, Firefox, Safari, Edge)
- **Responsive breakpoints**: 320px (mobile), 768px (tablet), 1280px (desktop), 1536px (large desktop)

---

## Technical Assumptions

### Repository Structure

**Monorepo** containing:
- `/app` - Remix application
- `/sanity` - Sanity Studio configuration
- `/shared` - Shared types and utilities

### Service Architecture

**Monolithic Remix Application** with:
- Server-side rendering for SEO and performance
- Headless CMS (Sanity) for content management
- Supabase for form submission storage and future features
- Serverless deployment (Vercel or Cloudflare Workers)

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Remix (React Router v7) | SSR, fast development, excellent DX |
| Language | TypeScript (strict) | Type safety, better maintainability |
| Styling | Tailwind CSS | Rapid development, consistent design system |
| Animations | Framer Motion | Declarative animations, React integration |
| Forms | React Hook Form + Zod | Validation, type-safe form handling |
| CMS | Sanity | Free tier, flexible schema, GROQ queries |
| Database | Supabase (PostgreSQL) | Free tier, real-time capable, future-proof |
| Deployment | Vercel | Remix-optimized, easy CI/CD, free tier |
| i18n | remix-i18next | Mature Remix integration, SSR support |

### Testing Requirements

- **Unit Tests**: Vitest for utility functions and form validation logic
- **Component Tests**: Testing Library for critical UI components
- **E2E Tests**: Playwright for critical user flows (contact form submission, language switching)
- **Manual Testing**: Cross-browser and device testing before deployment

### Additional Technical Assumptions

- WhatsApp integration via click-to-chat URLs (WhatsApp Business API optional for MVP)
- Email notifications via Supabase Edge Functions + SendGrid or Resend
- Image optimization via Sanity's image pipeline and/or Vercel Image Optimization
- Environment variables for API keys (Sanity, Supabase, email service)
- Git-based workflow with main branch protection

---

## Epics

### Epic Overview

1. **Epic 1: Foundation & Project Setup** - Establish project infrastructure, core routing, i18n, and deployment pipeline
2. **Epic 2: Content Management & Brand Foundation** - Sanity CMS setup, homepage hero, about sections
3. **Epic 3: Services Showcase** - Services gallery, individual service pages, CMS-driven content
4. **Epic 4: Contact & Lead Capture** - Contact form, booking request form, notifications, WhatsApp integration
5. **Epic 5: Polish, SEO & Launch** - Performance optimization, SEO implementation, final testing, deployment

---

## Epic 1: Foundation & Project Setup

Establish the foundational project infrastructure including Remix application scaffolding, TypeScript configuration, Tailwind setup, i18n framework, and deployment pipeline. By the end of this epic, a minimal "hello world" page should be deployable and accessible in three languages.

### Story 1.1: Initialize Remix Project with TypeScript

As a **developer**,
I want **a properly configured Remix project with TypeScript**,
so that **I have a solid foundation for building the application**.

#### Acceptance Criteria

- AC1: Remix project created using `create-remix` with TypeScript template
- AC2: `tsconfig.json` configured with strict mode enabled
- AC3: ESLint and Prettier configured for code quality
- AC4: Project runs locally with `npm run dev`
- AC5: Basic root route renders "Silentium - Coming Soon" placeholder

### Story 1.2: Configure Tailwind CSS and Base Styles

As a **developer**,
I want **Tailwind CSS configured with a custom design system foundation**,
so that **I can rapidly build UI components with consistent styling**.

#### Acceptance Criteria

- AC1: Tailwind CSS installed and configured with Remix
- AC2: Custom color palette defined in `tailwind.config.ts` (cream, gold, green, charcoal)
- AC3: Custom font families configured (serif heading, sans-serif body)
- AC4: Base CSS reset and typography styles applied
- AC5: Glassmorphism utility classes defined for reuse
- AC6: Responsive breakpoints configured (320px, 768px, 1280px, 1536px)

### Story 1.3: Implement i18n Framework

As a **visitor**,
I want **to view the website in my preferred language (English, Russian, or Indonesian)**,
so that **I can understand the content comfortably**.

#### Acceptance Criteria

- AC1: `remix-i18next` installed and configured
- AC2: Language detection from URL prefix (`/en`, `/ru`, `/id`) with fallback to English
- AC3: Translation files structure created for all three languages
- AC4: Language switcher component implemented
- AC5: Placeholder translations for common UI strings (navigation, buttons)
- AC6: SSR-compatible language detection and rendering

### Story 1.4: Create Layout Shell and Navigation

As a **visitor**,
I want **a consistent navigation experience across all pages**,
so that **I can easily find information and access key actions**.

#### Acceptance Criteria

- AC1: Root layout component with header, main content area, and footer
- AC2: Navigation bar with logo placeholder, menu items, language switcher, and CTA button
- AC3: Mobile-responsive hamburger menu for smaller screens
- AC4: Footer with placeholder social links, quick nav, and copyright
- AC5: Navigation items are translatable via i18n
- AC6: CTA button links to contact section/page

### Story 1.5: Setup Deployment Pipeline

As a **developer**,
I want **automated deployment to Vercel on push to main branch**,
so that **changes are automatically deployed to production**.

#### Acceptance Criteria

- AC1: Vercel project created and connected to Git repository
- AC2: Environment variables configured in Vercel dashboard
- AC3: Build command and output directory correctly configured
- AC4: Preview deployments enabled for pull requests
- AC5: Production deployment accessible via custom domain (or Vercel subdomain for MVP)
- AC6: Successful deployment of current state verified

---

## Epic 2: Content Management & Brand Foundation

Set up Sanity CMS with content schemas, implement the homepage hero section, and create the About page with Dr. Venera and Silentium philosophy sections. This epic establishes the core brand storytelling foundation.

### Story 2.1: Initialize Sanity Studio and Content Schemas

As a **content administrator**,
I want **a CMS where I can manage website content**,
so that **I can update text and images without developer assistance**.

#### Acceptance Criteria

- AC1: Sanity Studio initialized in `/sanity` directory
- AC2: Sanity project created and connected to Sanity.io
- AC3: Base schemas defined: `siteSettings`, `page`, `service`, `testimonial`
- AC4: Schema supports multilingual fields (EN/RU/ID)
- AC5: Sanity Studio accessible locally via `npm run sanity`
- AC6: GROQ query utility created for fetching content in Remix loaders

### Story 2.2: Implement Homepage Hero Section

As a **visitor**,
I want **to immediately understand what Silentium offers when I land on the homepage**,
so that **I can decide if this is the right place for my aesthetic needs**.

#### Acceptance Criteria

- AC1: Hero section displays brand tagline and supporting text from CMS
- AC2: Background image or video (if provided) displays with proper optimization
- AC3: Primary CTA button ("Book Consultation" or similar) prominently displayed
- AC4: Hero content is translatable and renders in selected language
- AC5: Subtle entrance animation using Framer Motion
- AC6: Responsive design works on mobile, tablet, and desktop

### Story 2.3: Create About Dr. Venera Section

As a **visitor**,
I want **to learn about Dr. Venera's qualifications and philosophy**,
so that **I can trust her expertise before booking a consultation**.

#### Acceptance Criteria

- AC1: About section displays Dr. Venera's photo, credentials, and story from CMS
- AC2: Key trust indicators highlighted (MD certification, years of experience, training locations)
- AC3: Content structured with elegant typography and spacing
- AC4: Section is translatable and renders in selected language
- AC5: Scroll-reveal animation for section elements
- AC6: Responsive layout adapts for mobile viewing

### Story 2.4: Create About Silentium Philosophy Section

As a **visitor**,
I want **to understand the Silentium sanctuary concept**,
so that **I can appreciate the unique experience offered beyond just treatments**.

#### Acceptance Criteria

- AC1: Section displays Silentium philosophy content from CMS
- AC2: Brand messaging emphasizes "beauty through inner harmony" concept
- AC3: Visual design evokes calm, sanctuary-like atmosphere
- AC4: Content is translatable and renders in selected language
- AC5: Smooth scroll integration from hero CTA or navigation
- AC6: Works standalone as dedicated About page or as homepage section

### Story 2.5: Create About Page Route

As a **visitor**,
I want **a dedicated About page combining Dr. Venera and Silentium information**,
so that **I can learn the full story in one place**.

#### Acceptance Criteria

- AC1: Route created at `/:lang/about` with proper i18n handling
- AC2: Page combines Dr. Venera and Silentium sections with clear visual hierarchy
- AC3: SEO meta tags populated from CMS content
- AC4: Breadcrumb or back navigation available
- AC5: CTA to contact/booking at page bottom
- AC6: Page content fully manageable through Sanity CMS

---

## Epic 3: Services Showcase

Implement the services section including an interactive gallery overview and individual service detail pages. All content is CMS-driven and supports three languages.

### Story 3.1: Create Services Schema and Seed Content

As a **content administrator**,
I want **service content manageable in the CMS**,
so that **I can add, edit, and organize treatment information**.

#### Acceptance Criteria

- AC1: Service schema includes: title, slug, category, short description, full description, benefits, image
- AC2: All text fields support EN/RU/ID translations
- AC3: Services organized by category (Anti-Aging, Skin Rejuvenation, Problem-Specific, Specialized)
- AC4: Initial content seeded for all 13 treatments from copywriting files
- AC5: Image field configured for Sanity asset pipeline
- AC6: GROQ queries created for fetching services list and individual service

### Story 3.2: Implement Services Gallery Section

As a **visitor**,
I want **to browse all available treatments in an engaging visual format**,
so that **I can quickly find services that interest me**.

#### Acceptance Criteria

- AC1: Services displayed in interactive gallery/grid layout
- AC2: Hover interaction reveals service image and short description
- AC3: Services grouped by category with visual distinction
- AC4: Each service card links to its detail page
- AC5: Gallery is responsive (grid adjusts for mobile)
- AC6: Content fetched from Sanity CMS with proper caching

### Story 3.3: Create Service Detail Page Template

As a **visitor**,
I want **detailed information about a specific treatment**,
so that **I can make an informed decision about booking a consultation**.

#### Acceptance Criteria

- AC1: Dynamic route at `/:lang/services/:slug` with proper i18n
- AC2: Page displays full service description, benefits, and process from CMS
- AC3: Hero image for the service displayed prominently
- AC4: Related services or "You might also like" section at bottom
- AC5: Prominent CTA to book consultation or contact
- AC6: SEO meta tags generated from service content
- AC7: Breadcrumb navigation back to services index

### Story 3.4: Create Services Index Page

As a **visitor**,
I want **a dedicated page listing all services**,
so that **I can explore the full range of treatments offered**.

#### Acceptance Criteria

- AC1: Route at `/:lang/services` with proper i18n handling
- AC2: Services gallery component rendered as primary content
- AC3: Optional category filter/tabs for service browsing
- AC4: Page introduction text manageable from CMS
- AC5: SEO optimized with services-focused meta tags
- AC6: Responsive design for all viewports

---

## Epic 4: Contact & Lead Capture

Implement contact and booking request forms with validation, storage, and notification systems. This epic enables the primary business goal of lead capture.

### Story 4.1: Create Contact Form Component

As a **visitor**,
I want **to send a message or inquiry to Dr. Venera**,
so that **I can ask questions before deciding to book**.

#### Acceptance Criteria

- AC1: Contact form with fields: name, email, phone (optional), message
- AC2: Client-side validation using React Hook Form + Zod
- AC3: Form submission handled by Remix action
- AC4: Success and error states clearly communicated to user
- AC5: Form labels and messages are translatable
- AC6: Honeypot field for basic spam protection

### Story 4.2: Create Booking Request Form Component

As a **visitor**,
I want **to request a consultation appointment**,
so that **Dr. Venera can contact me to schedule a visit**.

#### Acceptance Criteria

- AC1: Booking form with fields: name, email, phone, preferred treatment (dropdown), preferred date range, message
- AC2: Treatment dropdown populated from services in CMS
- AC3: Client-side validation with clear error messages
- AC4: Form distinguished from general contact form (different CTA styling)
- AC5: Form labels and messages are translatable
- AC6: Date range uses simple date inputs (not full calendar)

### Story 4.3: Implement Form Submission Storage

As a **business owner**,
I want **all form submissions stored in a database**,
so that **I have a record of leads and can follow up**.

#### Acceptance Criteria

- AC1: Supabase tables created: `contact_submissions`, `booking_requests`
- AC2: Remix action stores form data in appropriate Supabase table
- AC3: Timestamps and source language captured with each submission
- AC4: Database row-level security configured for admin access
- AC5: Successful submission returns confirmation to user
- AC6: Error handling for database connection issues

### Story 4.4: Implement Notification System

As a **business owner**,
I want **to be notified immediately when someone submits a form**,
so that **I can respond quickly to potential clients**.

#### Acceptance Criteria

- AC1: WhatsApp click-to-chat link generated with pre-filled message from form data
- AC2: Email notification sent to configured address on form submission
- AC3: Email includes all submitted form fields formatted clearly
- AC4: Notification system uses Supabase Edge Function or Remix action
- AC5: Email service integrated (SendGrid, Resend, or similar)
- AC6: Notification failures logged but don't block user confirmation

### Story 4.5: Create Contact Page

As a **visitor**,
I want **a dedicated contact page with all ways to reach Dr. Venera**,
so that **I can choose my preferred communication method**.

#### Acceptance Criteria

- AC1: Route at `/:lang/contact` with proper i18n handling
- AC2: Page includes contact form and booking request form (tabbed or sectioned)
- AC3: WhatsApp direct link prominently displayed
- AC4: General location area mentioned (e.g., "Located in Bali")
- AC5: Business hours or response time expectation displayed
- AC6: Social media links included
- AC7: SEO meta tags for contact page

---

## Epic 5: Polish, SEO & Launch

Final polish including performance optimization, comprehensive SEO implementation, cross-browser testing, and production deployment.

### Story 5.1: Implement SEO Foundation

As a **business owner**,
I want **the website optimized for search engines**,
so that **potential clients can find me through Google searches**.

#### Acceptance Criteria

- AC1: Dynamic meta tags (title, description) generated for all pages from CMS content
- AC2: Open Graph tags implemented for social media sharing
- AC3: Structured data (JSON-LD) for LocalBusiness schema
- AC4: `sitemap.xml` generated and accessible at `/sitemap.xml`
- AC5: `robots.txt` configured to allow indexing
- AC6: Canonical URLs set for all pages
- AC7: Hreflang tags for multilingual SEO

### Story 5.2: Optimize Performance

As a **visitor**,
I want **the website to load quickly**,
so that **I don't leave due to slow loading times**.

#### Acceptance Criteria

- AC1: Images optimized via Sanity image pipeline with responsive srcset
- AC2: Critical CSS inlined, non-critical deferred
- AC3: Font loading optimized (preload, font-display swap)
- AC4: Lighthouse performance score 80+ on mobile
- AC5: Core Web Vitals passing (LCP, FID, CLS)
- AC6: Vercel edge caching configured for static assets

### Story 5.3: Implement Error and Loading States

As a **visitor**,
I want **graceful handling when something goes wrong**,
so that **I'm not confused by technical errors**.

#### Acceptance Criteria

- AC1: Custom 404 page with brand styling and helpful navigation
- AC2: Custom error boundary for unexpected errors
- AC3: Loading skeletons or spinners for async content
- AC4: Form submission loading states (button disabled, spinner)
- AC5: Offline fallback message if applicable
- AC6: Error states are translatable

### Story 5.4: Cross-Browser and Device Testing

As a **visitor**,
I want **the website to work on my device and browser**,
so that **I have a consistent experience regardless of how I access it**.

#### Acceptance Criteria

- AC1: Tested on iOS Safari, Android Chrome (mobile)
- AC2: Tested on Chrome, Firefox, Safari, Edge (desktop)
- AC3: Tested at breakpoints: 320px, 768px, 1280px, 1536px
- AC4: All forms functional across tested browsers
- AC5: Animations gracefully degrade on low-power devices
- AC6: Language switching works correctly everywhere

### Story 5.5: Final Content Population and Review

As a **business owner**,
I want **all website content reviewed and finalized**,
so that **the launched site accurately represents my brand**.

#### Acceptance Criteria

- AC1: All service content populated in all three languages
- AC2: About page content finalized with real credentials and story
- AC3: Contact information verified and correct
- AC4: Images uploaded and displaying correctly
- AC5: Legal pages (Privacy Policy, Terms) created with appropriate content
- AC6: Spell check and grammar review completed for all languages

### Story 5.6: Production Deployment and Launch

As a **business owner**,
I want **the website live and accessible to the public**,
so that **potential clients can find and learn about my services**.

#### Acceptance Criteria

- AC1: Production environment variables configured in Vercel
- AC2: Custom domain configured and SSL certificate active
- AC3: Final Lighthouse audit passed (80+ performance)
- AC4: Google Search Console submitted with sitemap
- AC5: Analytics tracking implemented (optional: Vercel Analytics or Google Analytics)
- AC6: Backup of CMS content and database confirmed
- AC7: Post-launch monitoring for errors established

---

## Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial Draft | 2025-12-07 | 1.0 | Complete PRD with 5 epics and stories | BMAD PM (Pam) |

---

## Design Architect Prompt

This PRD is ready for UI/UX specification development. Please review the User Interface Design Goals section and create a comprehensive UI/UX Specification document that:

1. Defines the visual design system (colors, typography, spacing, components)
2. Creates user flow diagrams for key journeys (homepage → service → contact)
3. Specifies component library structure and interaction patterns
4. Addresses responsive design requirements for all breakpoints
5. Provides accessibility implementation guidelines
6. References the Purezai and Arcoria templates as design inspiration while incorporating Balinese/spiritual elements

Use `front-end-spec-tmpl.md` as the template structure.

---

## Architect Prompt

This PRD is ready for system architecture design. Please create a comprehensive Architecture Document that:

1. Defines the Remix application structure and routing strategy
2. Specifies Sanity CMS schema design for all content types
3. Details Supabase integration for form storage and notifications
4. Outlines the i18n implementation approach with `remix-i18next`
5. Documents API design (GROQ queries, form submission endpoints)
6. Addresses security considerations (HTTPS, form protection, env vars)
7. Specifies deployment architecture on Vercel

Use `architecture-tmpl.md` as the template structure.
