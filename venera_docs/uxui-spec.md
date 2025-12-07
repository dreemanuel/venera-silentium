# Venera Cosmetology / Silentium - UI/UX Specification

## Introduction

This document defines the user experience goals, information architecture, user flows, and visual design specifications for the Silentium website. It serves as the authoritative reference for all UI implementation decisions.

- **Link to Primary Design Files:** TBD (Figma to be created during implementation)
- **Link to Deployed Storybook / Design System:** TBD (Component library in Remix app)
- **Design Inspiration References:**
  - [Purezai Webflow Template](https://webflow.com/templates/html/purezai-beauty-website-template) - Modern skincare aesthetic, glassmorphism
  - [Arcoria Webflow Template](https://webflow.com/templates/html/arcoria-agency-website-template) - Elegant, minimal, editorial luxury

---

## Overall UX Goals & Principles

### Target User Personas

**Primary: "Sofia" - Russian Expat Professional**
- 35-year-old marketing executive living in Bali
- Values quality, discretion, and physician credentials
- Prefers Russian language but comfortable with English
- Researches thoroughly online before booking
- Communicates via WhatsApp

**Secondary: "Emma" - International Wellness Tourist**
- 42-year-old Australian visiting Bali for wellness retreat
- Interested in natural-looking aesthetic enhancements
- Values reviews and transparent information
- Expects modern, mobile-friendly experience
- Compares multiple options before deciding

**Tertiary: "Putri" - Affluent Indonesian Local**
- 30-year-old business owner from Jakarta visiting family in Bali
- Growing interest in premium aesthetic services
- Appreciates local cultural elements in branding
- May browse in Indonesian or English

### Usability Goals

1. **Discoverability**: Key information (services, credentials, contact) findable within 2 clicks
2. **Trust-Building**: Professional presentation that immediately signals medical expertise
3. **Low Friction**: Simple path from interest to consultation request
4. **Clarity**: Complex treatments explained in accessible, non-clinical language
5. **Emotional Resonance**: Design evokes calm and confidence, not anxiety or pressure

### Design Principles

1. **Sanctuary First** - Every interaction should feel like stepping into a peaceful space
2. **Show, Don't Sell** - Present information elegantly; avoid aggressive CTAs or urgency tactics
3. **Effortless Navigation** - Users should never feel lost or overwhelmed
4. **Authentic Luxury** - Premium feel through restraint, not excess
5. **Mobile Mindful** - Design for touch-first, scroll-driven experiences

---

## Information Architecture (IA)

### Site Map

```
Homepage (/)
├── About (/about)
│   ├── Dr. Venera section
│   └── Silentium Philosophy section
├── Services (/services)
│   ├── Services Index (interactive gallery)
│   └── Service Detail (/services/:slug)
│       ├── Botox
│       ├── Fillers
│       ├── Russian Lips
│       ├── Mesotherapy (Facial)
│       ├── Mesotherapy (Scalp)
│       ├── Mesotherapy (Eye Area)
│       ├── Skin Boosters
│       ├── Exosome
│       ├── Peeling
│       ├── Lipolytics
│       ├── Acne, Pigmentation, Rosacea
│       ├── Facial Cleansing
│       └── Treatments for Men
├── Contact (/contact)
│   ├── Contact Form
│   ├── Booking Request Form
│   └── WhatsApp Direct
├── Privacy Policy (/privacy)
└── Terms of Service (/terms)
```

### Navigation Structure

**Primary Navigation (Header)**
- Logo (links to homepage)
- About
- Services
- Contact (CTA styled)
- Language Switcher (EN | RU | ID)

**Mobile Navigation**
- Hamburger menu (right side)
- Full-screen overlay menu on tap
- Language switcher in menu
- Contact CTA prominent at bottom

**Footer Navigation**
- Quick links (About, Services, Contact)
- Legal links (Privacy, Terms)
- Social media icons
- WhatsApp quick link
- Copyright

---

## User Flows

### Flow 1: First-Time Visitor to Consultation Request

**Goal:** Convert a curious visitor into a consultation lead

```
Landing (Homepage)
    │
    ▼
Hero Section ─────────────┐
    │                     │
    ▼                     ▼
Scroll to Services    Click "Book Consultation"
    │                     │
    ▼                     │
Browse Services Gallery   │
    │                     │
    ▼                     │
Click Service Card        │
    │                     │
    ▼                     │
Service Detail Page       │
    │                     │
    ▼                     │
Click "Book Consultation" │
    │                     │
    ▼                     ▼
Contact Page ◄────────────┘
    │
    ▼
Complete Booking Form
    │
    ▼
Submit → Success Message
    │
    ▼
WhatsApp Notification Sent to Dr. Venera
```

### Flow 2: Returning Visitor Quick Contact

**Goal:** Enable fast contact for visitors who know what they want

```
Any Page
    │
    ▼
Click "Contact" in Navigation
    │
    ▼
Contact Page
    │
    ├─► Contact Form (general inquiry)
    │
    └─► Booking Form (consultation request)
            │
            ▼
        Select Preferred Treatment (dropdown)
            │
            ▼
        Fill Contact Details + Date Range
            │
            ▼
        Submit → Confirmation
```

### Flow 3: Language Switching

**Goal:** Switch between EN, RU, ID seamlessly

```
Any Page (e.g., /en/services/botox)
    │
    ▼
Click Language Switcher
    │
    ▼
Select "Русский"
    │
    ▼
Navigate to /ru/services/botox
    │
    ▼
Same content rendered in Russian
(preserves current page position)
```

### Flow 4: Service Exploration

**Goal:** Discover and learn about available treatments

```
Homepage
    │
    ▼
Click "Services" in Navigation
    │
    ▼
Services Index Page
    │
    ▼
Browse Interactive Gallery
    │
    ├─► Hover: See preview image + short description
    │
    └─► Click: Navigate to Service Detail
            │
            ▼
        Read Full Description
            │
            ▼
        See Benefits, Process Info
            │
            ▼
        Click "Book Consultation"
            │
            ▼
        Contact Page (treatment pre-selected)
```

---

## Wireframes & Mockups

### Homepage Layout

```
┌─────────────────────────────────────────────────────┐
│  HEADER: Logo | About Services Contact | EN RU ID  │
├─────────────────────────────────────────────────────┤
│                                                     │
│                    HERO SECTION                     │
│                                                     │
│     [Background: Soft gradient or serene image]    │
│                                                     │
│           "Beauty is born in silence"              │
│                                                     │
│         [Book Your Consultation CTA]               │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 SERVICES PREVIEW                    │
│                                                     │
│   ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐     │
│   │ Svc 1 │  │ Svc 2 │  │ Svc 3 │  │ Svc 4 │     │
│   └───────┘  └───────┘  └───────┘  └───────┘     │
│   ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐     │
│   │ Svc 5 │  │ Svc 6 │  │ Svc 7 │  │ Svc 8 │     │
│   └───────┘  └───────┘  └───────┘  └───────┘     │
│                                                     │
│              [View All Services →]                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  ABOUT PREVIEW                      │
│                                                     │
│   ┌──────────┐                                     │
│   │  Photo   │   "Where science meets spirit..."   │
│   │    of    │                                     │
│   │ Dr.Venera│   Brief intro to Silentium          │
│   └──────────┘                                     │
│                    [Learn More →]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 TESTIMONIALS                        │
│                                                     │
│   "The experience was transformative..."            │
│                          — Client Name              │
│                                                     │
│        ●  ○  ○  (carousel indicators)              │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  CONTACT CTA                        │
│                                                     │
│         Ready to begin your journey?               │
│                                                     │
│    [Book Consultation]    [WhatsApp Us]            │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER: Links | Social | WhatsApp | © 2025        │
└─────────────────────────────────────────────────────┘
```

### Service Detail Page Layout

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│  ← Back to Services                                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  SERVICE HERO                       │
│                                                     │
│   ┌──────────────────┐                             │
│   │                  │    TREATMENT NAME            │
│   │   Hero Image     │                             │
│   │                  │    Category Tag              │
│   └──────────────────┘                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  DESCRIPTION                        │
│                                                     │
│   Poetic description from copywriting...            │
│                                                     │
│   "It's not just about smoothing lines—it's about  │
│    restoring harmony between how you feel and how  │
│    you look..."                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                   BENEFITS                          │
│                                                     │
│   ✓ Natural-looking results                        │
│   ✓ Minimal downtime                               │
│   ✓ Physician-led precision                        │
│   ✓ Premium imported products                      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│              CONSULTATION CTA                       │
│                                                     │
│         [Book Your Consultation]                    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│              RELATED SERVICES                       │
│                                                     │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│   │ Related │  │ Related │  │ Related │          │
│   │ Svc 1   │  │ Svc 2   │  │ Svc 3   │          │
│   └─────────┘  └─────────┘  └─────────┘          │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

### Contact Page Layout

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  PAGE TITLE                         │
│                                                     │
│              Begin Your Journey                     │
│                                                     │
│      We'd love to hear from you. Reach out         │
│      for a consultation or any questions.          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────────────┐  ┌──────────────────┐      │
│   │                  │  │                  │      │
│   │  CONTACT FORM    │  │  CONTACT INFO    │      │
│   │                  │  │                  │      │
│   │  Name            │  │  📱 WhatsApp     │      │
│   │  Email           │  │  +62 xxx xxx    │      │
│   │  Phone           │  │                  │      │
│   │  Message         │  │  📍 Location     │      │
│   │                  │  │  Bali, Indonesia │      │
│   │  [Send Message]  │  │                  │      │
│   │                  │  │  🕐 Response     │      │
│   └──────────────────┘  │  Within 24 hours │      │
│                         │                  │      │
│                         │  [Chat on        │      │
│                         │   WhatsApp]      │      │
│                         │                  │      │
│                         └──────────────────┘      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│              BOOKING REQUEST FORM                   │
│                                                     │
│   Want to schedule a consultation?                  │
│                                                     │
│   ┌────────────────────────────────────────┐       │
│   │  Name                                   │       │
│   │  Email                                  │       │
│   │  Phone                                  │       │
│   │  Preferred Treatment [Dropdown ▼]       │       │
│   │  Preferred Date Range                   │       │
│   │  Additional Notes                       │       │
│   │                                         │       │
│   │  [Request Consultation]                 │       │
│   └────────────────────────────────────────┘       │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## Component Library / Design System Reference

### Core Components

| Component | Description | States |
|-----------|-------------|--------|
| `Button` | Primary CTA and secondary actions | default, hover, active, disabled, loading |
| `ButtonGhost` | Subtle action links | default, hover |
| `Input` | Text input fields | default, focus, error, disabled |
| `TextArea` | Multi-line input | default, focus, error |
| `Select` | Dropdown selection | default, open, selected |
| `Card` | Content container with glassmorphism | default, hover |
| `ServiceCard` | Service preview in gallery | default, hover (reveal) |
| `NavLink` | Navigation items | default, hover, active |
| `LanguageSwitcher` | EN/RU/ID toggle | current, hover |
| `Footer` | Site footer | - |
| `Header` | Site header with nav | mobile, desktop |
| `MobileMenu` | Full-screen overlay menu | closed, open |
| `FormField` | Label + input + error wrapper | valid, error |
| `Toast` | Success/error notifications | success, error |

### Component Specifications

#### Button (Primary)
```
Background: Gold gradient (from #C9A961 to #B8934A)
Text: White (#FFFFFF)
Font: Sans-serif, 600 weight, 16px
Padding: 12px 32px
Border-radius: 8px
Transition: transform 0.2s, box-shadow 0.2s

Hover:
  - Slight scale (1.02)
  - Elevated shadow

Active:
  - Scale down (0.98)

Disabled:
  - Opacity 0.5
  - Cursor not-allowed
```

#### Card (Glassmorphism)
```
Background: rgba(255, 255, 255, 0.15)
Backdrop-filter: blur(12px)
Border: 1px solid rgba(255, 255, 255, 0.2)
Border-radius: 16px
Box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)
```

#### ServiceCard
```
Base: Card styling
Aspect-ratio: 4/3 or 1/1 depending on grid
Image: Cover, slight zoom on hover
Overlay: Gradient from transparent to dark on hover
Text: Appears from bottom on hover with slide-up animation
```

---

## Branding & Style Guide Reference

### Color Palette

**Primary Colors**
| Name | Hex | Usage |
|------|-----|-------|
| Cream | `#FAF7F2` | Page backgrounds, light surfaces |
| Warm White | `#FFFFFF` | Cards, inputs, highlights |
| Charcoal | `#2D2D2D` | Primary text |
| Soft Charcoal | `#4A4A4A` | Secondary text |

**Accent Colors**
| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#C9A961` | CTAs, highlights, links |
| Deep Gold | `#B8934A` | Hover states, gradient ends |
| Sage Green | `#8B9A7D` | Secondary accents, nature elements |
| Deep Teal | `#2D4A4A` | Footer, dark sections |

**Feedback Colors**
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#6B8E6B` | Form success, confirmations |
| Error | `#C47D7D` | Form errors, warnings |
| Info | `#7D9EC4` | Informational messages |

### Typography

**Font Families**
- **Headings**: `Gilmoray` or `Kirana` (from provided fonts) — elegant serif
- **Body**: `Gilmer Light` or `Essentials` (from provided fonts) — clean sans-serif
- **Accent/Logo**: `Silent` or `Breath` (for special brand moments)

**Type Scale**
| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 56px | 36px | 400 | 1.2 |
| H2 | 40px | 28px | 400 | 1.3 |
| H3 | 28px | 22px | 500 | 1.4 |
| H4 | 22px | 18px | 500 | 1.4 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Small | 14px | 14px | 400 | 1.5 |
| Caption | 12px | 12px | 400 | 1.4 |
| Button | 16px | 16px | 600 | 1.0 |

### Iconography

- **Style**: Line icons, 1.5px stroke
- **Library**: Lucide Icons (MIT licensed, React ready)
- **Custom**: Arrow icons may use flowing/organic shapes

### Spacing & Grid

**Spacing Scale (8px base)**
```
4px   (0.5)  - Tight
8px   (1)    - Small
16px  (2)    - Medium
24px  (3)    - Default
32px  (4)    - Large
48px  (6)    - XL
64px  (8)    - Section gap
96px  (12)   - Major section gap
```

**Grid System**
- Container max-width: 1280px
- Gutter: 24px (mobile), 32px (desktop)
- Columns: 12-column grid
- Mobile: Stack to single column below 768px

---

## Accessibility (AX) Requirements

### Target Compliance
WCAG 2.1 Level AA

### Specific Requirements

**Color Contrast**
- Text on Cream background: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio
- Interactive elements: minimum 3:1 against adjacent colors

**Keyboard Navigation**
- All interactive elements focusable via Tab
- Logical tab order following visual layout
- Visible focus indicators (2px gold outline)
- Skip-to-main-content link at page top
- Escape closes mobile menu and modals

**ARIA Implementation**
- `aria-label` on icon-only buttons
- `aria-expanded` on mobile menu toggle
- `aria-current="page"` on active navigation
- `role="alert"` for form error messages
- Proper heading hierarchy (single H1 per page)

**Forms**
- Labels associated with inputs via `for/id`
- Error messages announced to screen readers
- Required fields marked with `aria-required`
- Clear error identification with color + icon + text

**Images**
- Descriptive `alt` text for meaningful images
- Empty `alt=""` for decorative images
- Lazy loading with proper loading indicators

**Motion**
- Respect `prefers-reduced-motion` media query
- Provide static alternatives for animated content

---

## Responsiveness

### Breakpoints

| Name | Min Width | Description |
|------|-----------|-------------|
| Mobile (default) | 0px | Small phones, base styles |
| Mobile Large | 480px | Larger phones |
| Tablet | 768px | Tablets, small laptops |
| Desktop | 1024px | Standard desktop |
| Desktop Large | 1280px | Wide screens |
| Desktop XL | 1536px | Ultra-wide |

### Adaptation Strategy

**Mobile (0-767px)**
- Single column layout
- Full-width cards
- Hamburger navigation
- Stacked forms
- Touch-friendly tap targets (min 44px)
- Reduced animation complexity
- Services grid: 1-2 columns

**Tablet (768-1023px)**
- Two-column layouts where appropriate
- Header navigation visible (condensed)
- Services grid: 2-3 columns
- Side-by-side form + info on contact page

**Desktop (1024px+)**
- Full navigation visible
- Multi-column grids
- Services grid: 3-4 columns
- Enhanced hover interactions
- Glassmorphism effects at full fidelity
- More generous whitespace

---

## Animation Specifications

### Principles
- **Subtle**: Animations should enhance, not distract
- **Purposeful**: Every animation serves UX goal (feedback, attention, continuity)
- **Performant**: Use `transform` and `opacity` only; avoid layout thrashing

### Transition Defaults
```css
--transition-fast: 150ms ease-out;
--transition-default: 250ms ease-out;
--transition-slow: 400ms ease-out;
```

### Key Animations

**Page Enter**
- Fade in + slight slide up
- Duration: 400ms
- Elements stagger: 50ms delay between

**Scroll Reveal**
- Elements fade in + slide up as they enter viewport
- Threshold: 20% visible
- Duration: 500ms
- Stagger children: 100ms

**Service Card Hover**
- Image scale: 1.05
- Overlay opacity: 0 → 0.7
- Text slide: translateY(20px) → translateY(0)
- Duration: 300ms

**Button Hover**
- Scale: 1.02
- Shadow elevation increase
- Duration: 200ms

**Mobile Menu**
- Overlay fade: 250ms
- Menu slide from right: 300ms
- Menu items stagger: 50ms

---

## Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial Draft | 2025-12-07 | 1.0 | Complete UI/UX specification | BMAD Design Architect (Dez) |
