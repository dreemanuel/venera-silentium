# Venera Cosmetology / Silentium - Frontend Architecture Document

## Table of Contents

- [Introduction](#introduction)
- [Overall Frontend Philosophy & Patterns](#overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](#detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](#component-breakdown--implementation-details)
- [State Management In-Depth](#state-management-in-depth)
- [API Interaction Layer](#api-interaction-layer)
- [Routing Strategy](#routing-strategy)
- [Build, Bundling, and Deployment](#build-bundling-and-deployment)
- [Frontend Testing Strategy](#frontend-testing-strategy)
- [Accessibility (AX) Implementation Details](#accessibility-ax-implementation-details)
- [Performance Considerations](#performance-considerations)
- [Internationalization (i18n) and Localization (l10n) Strategy](#internationalization-i18n-and-localization-l10n-strategy)
- [Browser Support and Progressive Enhancement](#browser-support-and-progressive-enhancement)
- [Change Log](#change-log)

---

## Introduction

This document details the frontend architecture for the Silentium website. It complements the main Architecture Document and UI/UX Specification, providing the technical blueprint for React component development, styling implementation, and frontend-specific patterns.

- **Link to Main Architecture Document:** `/venera_docs/architecture.md`
- **Link to UI/UX Specification:** `/venera_docs/uxui-spec.md`
- **Link to Primary Design Files:** TBD (Figma to be created)
- **Link to Component Showcase:** TBD (Storybook if implemented)

---

## Overall Frontend Philosophy & Patterns

### Framework & Core Libraries

As defined in the main Architecture Document:
- **Remix 2.x** (React Router 7) for full-stack React with SSR
- **React 18.2.x** for UI components
- **TypeScript 5.3.x** with strict mode

### Component Architecture

**Feature-Based Organization** with the following hierarchy:

1. **UI Components** (`/app/components/ui/`) - Generic, reusable primitives (Button, Input, Card)
2. **Layout Components** (`/app/components/layout/`) - Structural components (Header, Footer, MobileMenu)
3. **Section Components** (`/app/components/sections/`) - Page sections (HeroSection, ServicesPreview)
4. **Feature Components** (`/app/components/[feature]/`) - Domain-specific components (ServiceCard, ContactForm)

**Component Principles:**
- Functional components only (no class components)
- Props destructured with TypeScript interfaces
- Named exports (default exports only for route modules)
- Composition over inheritance

### State Management Strategy

**Minimal Global State** - Leverage Remix's built-in patterns:

1. **Server State**: Fetched via Remix `loader` functions, serialized to client
2. **URL State**: Language, current route, query parameters
3. **Form State**: Managed by React Hook Form within form components
4. **UI State**: Local `useState` for component-specific state (modals, menus)

No Redux/Zustand needed - Remix handles data loading and mutations.

### Data Flow

```
Sanity CMS → Remix Loader → React Component → User

User Interaction → Remix Action → Supabase/Email → Response → UI Update
```

- **Read Path**: Loaders fetch from Sanity, pass data as props
- **Write Path**: Actions handle form submissions, return success/error
- **Progressive Enhancement**: Forms work without JS via native form submission

### Styling Approach

**Tailwind CSS** with custom configuration:
- Configuration: `tailwind.config.ts`
- Entry point: `/app/styles/tailwind.css`
- Custom fonts: `/app/styles/fonts.css`

**Conventions:**
- Utility-first approach for component styling
- Custom component classes via `@apply` for repeated patterns
- CSS custom properties for theme values (colors, fonts)
- Responsive utilities following mobile-first pattern

### Key Design Patterns

1. **Loader/Action Pattern** - Remix-native data fetching and mutations
2. **Compound Components** - For complex UI (ServiceGallery with ServiceCard children)
3. **Render Props / Children as Function** - For flexible animations
4. **Custom Hooks** - Encapsulate reusable logic (useScrollReveal, useMediaQuery)
5. **Provider Pattern** - For i18n context

---

## Detailed Frontend Directory Structure

```plaintext
app/
├── components/
│   ├── layout/                     # Structural layout components
│   │   ├── Header.tsx              # Site header with navigation
│   │   ├── Footer.tsx              # Site footer
│   │   ├── MobileMenu.tsx          # Full-screen mobile navigation overlay
│   │   ├── LanguageSwitcher.tsx    # EN/RU/ID language toggle
│   │   └── index.ts                # Barrel export
│   ├── sections/                   # Homepage and page sections
│   │   ├── HeroSection.tsx         # Hero with tagline and CTA
│   │   ├── ServicesPreview.tsx     # Services grid preview for homepage
│   │   ├── AboutPreview.tsx        # About section preview
│   │   ├── TestimonialsSection.tsx # Testimonials carousel
│   │   ├── ContactCTA.tsx          # Contact call-to-action section
│   │   └── index.ts
│   ├── services/                   # Service-related components
│   │   ├── ServiceCard.tsx         # Individual service card with hover
│   │   ├── ServiceGallery.tsx      # Interactive services grid
│   │   ├── ServiceDetail.tsx       # Full service detail view
│   │   ├── ServiceBenefits.tsx     # Benefits list component
│   │   └── index.ts
│   ├── forms/                      # Form components
│   │   ├── ContactForm.tsx         # General contact form
│   │   ├── BookingForm.tsx         # Consultation booking form
│   │   ├── FormField.tsx           # Reusable form field wrapper
│   │   ├── FormSuccess.tsx         # Success message component
│   │   ├── FormError.tsx           # Error message component
│   │   └── index.ts
│   ├── ui/                         # Base UI primitives
│   │   ├── Button.tsx              # Primary and secondary buttons
│   │   ├── Card.tsx                # Glassmorphism card container
│   │   ├── Input.tsx               # Text input field
│   │   ├── TextArea.tsx            # Multi-line text input
│   │   ├── Select.tsx              # Dropdown select
│   │   ├── Toast.tsx               # Notification toast
│   │   ├── Skeleton.tsx            # Loading skeleton
│   │   ├── Icon.tsx                # Icon wrapper (Lucide)
│   │   └── index.ts
│   └── seo/                        # SEO components
│       ├── MetaTags.tsx            # Dynamic meta tag generator
│       └── StructuredData.tsx      # JSON-LD schema generator
├── hooks/                          # Custom React hooks
│   ├── useScrollReveal.ts          # Intersection Observer for scroll animations
│   ├── useMediaQuery.ts            # Responsive breakpoint detection
│   ├── useLanguage.ts              # Current language helper
│   └── index.ts
├── lib/                            # Server utilities and clients
│   ├── sanity.server.ts            # Sanity client and GROQ queries
│   ├── supabase.server.ts          # Supabase client configuration
│   ├── i18n.server.ts              # i18n server configuration
│   ├── email.server.ts             # Email notification service
│   └── utils.ts                    # Shared utility functions
├── routes/                         # Remix route modules
│   ├── _index.tsx                  # Root redirect to /en
│   ├── $lang._index.tsx            # Homepage (locale-prefixed)
│   ├── $lang.about.tsx             # About page
│   ├── $lang.services._index.tsx   # Services index
│   ├── $lang.services.$slug.tsx    # Service detail
│   ├── $lang.contact.tsx           # Contact page
│   ├── $lang.privacy.tsx           # Privacy policy
│   ├── $lang.terms.tsx             # Terms of service
│   ├── api.contact.tsx             # Contact form API action
│   ├── api.booking.tsx             # Booking form API action
│   └── sitemap[.]xml.tsx           # Dynamic sitemap generation
├── styles/
│   ├── tailwind.css                # Tailwind imports and base styles
│   └── fonts.css                   # @font-face declarations
├── types/
│   └── index.ts                    # Shared TypeScript types
├── entry.client.tsx                # Client entry point
├── entry.server.tsx                # Server entry point
└── root.tsx                        # Root layout and providers
```

### Notes on Frontend Structure

- **Components are organized by domain**, not by technical type
- **Barrel exports** (`index.ts`) in each component folder for cleaner imports
- **Route modules** follow Remix file-naming conventions with locale prefix
- **Server-only code** lives in `/lib/*.server.ts` files
- **Hooks are generic** and reusable across components

---

## Component Breakdown & Implementation Details

### Component Naming & Organization

- **Naming Convention:** `PascalCase` for files and components (e.g., `ServiceCard.tsx`)
- **Organization:** By domain/feature, not by technical layer
- **Exports:** Named exports from components, barrel exports from folders

### Core Component Specifications

#### Component: `Button`

- **Purpose:** Primary interactive element for CTAs and actions
- **Source File:** `app/components/ui/Button.tsx`
- **Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | No | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `loading` | `boolean` | No | `false` | Loading state with spinner |
| `children` | `ReactNode` | Yes | - | Button content |
| `className` | `string` | No | - | Additional CSS classes |
| `...rest` | `ButtonHTMLAttributes` | No | - | Native button props |

- **Key UI Elements:**
```tsx
<button
  className={cn(
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  )}
  disabled={disabled || loading}
  {...rest}
>
  {loading && <Spinner className="mr-2 h-4 w-4" />}
  {children}
</button>
```

- **Styling Notes:**
  - Primary: `bg-gradient-to-r from-gold to-deep-gold text-white hover:scale-[1.02] hover:shadow-lg`
  - Secondary: `bg-white/15 backdrop-blur-md border border-white/20 text-charcoal hover:bg-white/25`
  - Ghost: `bg-transparent text-gold hover:bg-gold/10`

- **Accessibility Notes:**
  - Native `<button>` element for built-in accessibility
  - Visible focus ring using `focus-visible`
  - `aria-disabled` synced with `disabled` prop
  - Loading state announces via `aria-busy`

---

#### Component: `ServiceCard`

- **Purpose:** Display service preview in gallery with hover reveal effect
- **Source File:** `app/components/services/ServiceCard.tsx`
- **Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `service` | `ServicePreview` | Yes | - | Service data object |
| `lang` | `'en' \| 'ru' \| 'id'` | Yes | - | Current language |

```typescript
interface ServicePreview {
  slug: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
}
```

- **Internal State:**

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `isHovered` | `boolean` | `false` | Tracks hover state for animations |

- **Key UI Elements:**
```tsx
<Link
  to={`/${lang}/services/${service.slug}`}
  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <img
    src={service.imageUrl}
    alt={service.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
    className="absolute bottom-0 left-0 right-0 p-6 text-white"
  >
    <span className="text-sm uppercase tracking-wider text-gold">{service.category}</span>
    <h3 className="mt-2 text-xl font-serif">{service.title}</h3>
    <p className="mt-2 text-sm opacity-80">{service.shortDescription}</p>
  </motion.div>
</Link>
```

- **Events:** Link navigation on click
- **Styling Notes:**
  - Glassmorphism overlay on hover
  - Image zoom with `scale-105` transform
  - Text slides up from bottom with Framer Motion
  - Category badge in gold accent color

- **Accessibility Notes:**
  - Native `<a>` via Remix `Link` for keyboard navigation
  - Descriptive `alt` text on image
  - Focus state inherits from link styles

---

#### Component: `ContactForm`

- **Purpose:** General inquiry form with validation
- **Source File:** `app/components/forms/ContactForm.tsx`
- **Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `lang` | `'en' \| 'ru' \| 'id'` | Yes | - | Current language for translations |

- **Internal State:** Managed by React Hook Form

- **Key UI Elements:**
```tsx
<Form method="post" action={`/api/contact`} onSubmit={handleSubmit(onSubmit)}>
  <FormField label={t('form.name')} error={errors.name?.message}>
    <Input {...register('name')} placeholder={t('form.namePlaceholder')} />
  </FormField>
  <FormField label={t('form.email')} error={errors.email?.message}>
    <Input type="email" {...register('email')} />
  </FormField>
  <FormField label={t('form.phone')} error={errors.phone?.message} optional>
    <Input type="tel" {...register('phone')} />
  </FormField>
  <FormField label={t('form.message')} error={errors.message?.message}>
    <TextArea {...register('message')} rows={5} />
  </FormField>
  {/* Honeypot */}
  <input type="text" name="website" className="hidden" tabIndex={-1} />
  <input type="hidden" name="language" value={lang} />
  <Button type="submit" loading={isSubmitting} className="w-full mt-6">
    {t('form.submit')}
  </Button>
</Form>
```

- **Validation Schema (Zod):**
```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

- **Actions Triggered:**
  - POST to `/api/contact` Remix action
  - Success: Display FormSuccess component
  - Error: Display FormError with message

- **Accessibility Notes:**
  - Labels associated with inputs via `htmlFor`
  - Error messages linked with `aria-describedby`
  - Required fields marked with `aria-required`
  - Form submission feedback announced

---

## State Management In-Depth

### Chosen Solution

**Remix-native patterns** without external state management:

1. **Loader Data**: Server state passed to components
2. **Action Data**: Form submission results
3. **URL State**: Language and navigation via React Router
4. **Local State**: `useState` for UI interactions

### State Decision Guide

| State Type | Example | Solution |
|------------|---------|----------|
| Content data | Services list | Remix loader → props |
| Form data | Contact form values | React Hook Form |
| Form submission result | Success/error | Remix action data |
| Language | Current locale | URL param (`$lang`) |
| Mobile menu open | Boolean | Local `useState` |
| Scroll position | Number | Local `useState` + effect |

### No Global Store Required

Remix's architecture eliminates need for Redux/Zustand:
- **No client-side data fetching**: Loaders handle it
- **No form state management**: Actions handle submissions
- **No complex UI state**: Simple enough for local state

---

## API Interaction Layer

### Client/Service Structure

All API interactions happen server-side in Remix loaders/actions:

#### Sanity Client (`app/lib/sanity.server.ts`)

```typescript
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2023-12-01',
  useCdn: true,
});

// Query helpers
export async function getServices(lang: string) {
  return sanityClient.fetch(servicesQuery, { lang });
}

export async function getService(slug: string, lang: string) {
  return sanityClient.fetch(serviceQuery, { slug, lang });
}

export async function getSiteSettings(lang: string) {
  return sanityClient.fetch(siteSettingsQuery, { lang });
}
```

#### Supabase Client (`app/lib/supabase.server.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveContactSubmission(data: ContactFormData) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);
  if (error) throw error;
}

export async function saveBookingRequest(data: BookingFormData) {
  const { error } = await supabase
    .from('booking_requests')
    .insert([data]);
  if (error) throw error;
}
```

### Error Handling

- **Sanity errors**: Caught in loader, return 500 error boundary
- **Supabase errors**: Caught in action, return error in action data
- **Validation errors**: Returned from action with field-level messages

---

## Routing Strategy

### Routing Library

**Remix (React Router 7)** with file-based routing.

### Route Definitions

| Path Pattern | Route File | Protection | Notes |
|--------------|------------|------------|-------|
| `/` | `_index.tsx` | Public | Redirects to `/en` |
| `/:lang` | `$lang._index.tsx` | Public | Homepage |
| `/:lang/about` | `$lang.about.tsx` | Public | About page |
| `/:lang/services` | `$lang.services._index.tsx` | Public | Services index |
| `/:lang/services/:slug` | `$lang.services.$slug.tsx` | Public | Service detail |
| `/:lang/contact` | `$lang.contact.tsx` | Public | Contact page |
| `/:lang/privacy` | `$lang.privacy.tsx` | Public | Privacy policy |
| `/:lang/terms` | `$lang.terms.tsx` | Public | Terms of service |
| `/api/contact` | `api.contact.tsx` | API | Contact form handler |
| `/api/booking` | `api.booking.tsx` | API | Booking form handler |
| `/sitemap.xml` | `sitemap[.]xml.tsx` | Public | Dynamic sitemap |

### Route Guards / Protection

**Language Validation**: Routes validate `$lang` parameter and redirect to `/en` if invalid:

```typescript
// In $lang._index.tsx loader
const SUPPORTED_LANGS = ['en', 'ru', 'id'];
if (!SUPPORTED_LANGS.includes(params.lang)) {
  return redirect('/en');
}
```

No authentication required for MVP (public marketing site).

---

## Build, Bundling, and Deployment

### Build Process & Scripts

```json
{
  "scripts": {
    "dev": "remix vite:dev",
    "build": "remix vite:build",
    "start": "remix-serve ./build/server/index.js",
    "typecheck": "tsc",
    "lint": "eslint --ext .ts,.tsx app/",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

### Environment Configuration

```bash
# .env.example
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
NOTIFICATION_EMAIL=

WHATSAPP_NUMBER=
```

### Key Bundling Optimizations

- **Code Splitting**: Automatic per-route splitting via Remix
- **Tree Shaking**: Vite handles dead code elimination
- **Lazy Loading**: `React.lazy()` for heavy components if needed
- **Image Optimization**: Sanity image pipeline + responsive srcset

### Deployment

**Target Platform**: Vercel
**Deployment Trigger**: Git push to `main` branch
**Preview Deployments**: Automatic on pull requests

---

## Frontend Testing Strategy

### Component Testing (Vitest + Testing Library)

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

**Location**: `*.test.tsx` co-located with components

### E2E Testing (Playwright)

Key user flows to test:
1. Homepage → Service → Contact form submission
2. Language switching preserves page
3. Mobile navigation menu
4. Form validation errors display
5. Successful booking request

**Location**: `/test/e2e/`

---

## Accessibility (AX) Implementation Details

### Semantic HTML

- Use `<nav>` for navigation, `<main>` for content, `<footer>` for footer
- Use `<button>` for actions, `<a>` for navigation
- Use heading hierarchy (`h1` → `h2` → `h3`)

### ARIA Implementation

```tsx
// Mobile menu toggle
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
>

// Language switcher
<div role="radiogroup" aria-label="Select language">
  <button role="radio" aria-checked={lang === 'en'}>EN</button>
  ...
</div>
```

### Keyboard Navigation

- All interactive elements focusable via Tab
- Mobile menu traps focus when open
- Escape closes mobile menu
- Focus returns to trigger on menu close

### Focus Management

```typescript
// In MobileMenu
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  } else {
    triggerRef.current?.focus();
  }
}, [isOpen]);
```

### Testing

- `jest-axe` for automated accessibility testing in component tests
- Playwright accessibility audits in E2E tests
- Manual keyboard navigation testing

---

## Performance Considerations

### Image Optimization

- Sanity image URLs with width/height parameters
- `loading="lazy"` on below-fold images
- WebP format where supported
- Responsive `srcset` for different viewports

### Minimizing Re-renders

- `React.memo` for ServiceCard in galleries
- Stable callback references with `useCallback`
- Avoid inline object/array literals in props

### Animation Performance

- Framer Motion for GPU-accelerated transforms
- Respect `prefers-reduced-motion`:

```typescript
const prefersReducedMotion = useReducedMotion();
const variants = prefersReducedMotion
  ? {}
  : { initial: { opacity: 0 }, animate: { opacity: 1 } };
```

### Performance Monitoring

- Lighthouse CI in GitHub Actions
- Target scores: Performance 80+, Accessibility 90+

---

## Internationalization (i18n) and Localization (l10n) Strategy

### Chosen Library

**remix-i18next** with i18next core

### Translation File Structure

```
public/locales/
├── en/
│   └── common.json
├── ru/
│   └── common.json
└── id/
    └── common.json
```

### Translation Key Convention

```json
{
  "nav": {
    "about": "About",
    "services": "Services",
    "contact": "Contact"
  },
  "hero": {
    "tagline": "Beauty is born in silence",
    "cta": "Book Consultation"
  },
  "form": {
    "name": "Your Name",
    "email": "Email Address",
    "submit": "Send Message"
  }
}
```

**Pattern**: `section.element` or `section.component.element`

### Implementation

```typescript
// In route loader
export async function loader({ request, params }: LoaderFunctionArgs) {
  const t = await i18n.getFixedT(request, 'common');
  return json({
    title: t('hero.tagline'),
    ...
  });
}

// In component
const { t } = useTranslation('common');
return <h1>{t('hero.tagline')}</h1>;
```

### Language Switching

URL-based (`/en/`, `/ru/`, `/id/`) with LanguageSwitcher component that preserves current path.

---

## Browser Support and Progressive Enhancement

### Target Browsers

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Android (last 2 versions)

**Not Supported**: Internet Explorer

### Progressive Enhancement

Core content and navigation works without JavaScript:
- HTML forms submit natively
- Links navigate normally
- Content is server-rendered

JavaScript enhances:
- Form validation feedback
- Animations and transitions
- Mobile menu interactions
- Loading states

### CSS Compatibility

- Autoprefixer via PostCSS for vendor prefixes
- Fallbacks for glassmorphism (`backdrop-filter`)

```css
.card {
  background: rgba(255, 255, 255, 0.9); /* fallback */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
}

@supports not (backdrop-filter: blur(12px)) {
  .card {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

---

## Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial Draft | 2025-12-07 | 1.0 | Complete frontend architecture | BMAD Design Architect (Dez) |
