# Venera Cosmetology - Silentium

Professional website for Dr. Venera Frolova's aesthetic cosmetology practice in Bali, Indonesia.

> "Beauty is born in silence; in the stillness is where a woman finally hears herself."

## Tech Stack

- **Framework**: React Router v7 (formerly Remix)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **CMS**: Sanity (headless) - _coming soon_
- **Database**: Supabase - _coming soon_
- **Deployment**: Vercel

## Prerequisites

- Node.js 20.x LTS or higher
- npm 10.x or higher

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Code Quality

```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without modifying files
npm run format:check
```

## Project Structure

```
venera-cosmetology/
├── app/                    # Application source code
│   ├── components/         # Reusable components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   └── ui/             # Button, Form elements
│   ├── lib/                # Utilities and i18n config
│   ├── routes/             # Route components
│   │   └── $lang/          # Language-prefixed routes
│   ├── root.tsx            # Root layout
│   └── app.css             # Global styles + Tailwind config
├── public/                 # Static assets
│   ├── fonts/              # Custom fonts
│   └── locales/            # Translation files (en, ru, id)
├── venera_docs/            # Project documentation
│   ├── prd.md              # Product Requirements Document
│   ├── architecture.md     # System Architecture
│   ├── uxui-spec.md        # UI/UX Specification
│   └── stories/            # User stories
├── bmad-agent/             # BMAD methodology resources
├── copywriting/            # Content files
├── vercel.json             # Vercel deployment config
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── react-router.config.ts  # React Router configuration
```

## Deployment

This project is configured for deployment on **Vercel**.

### Automatic Deployments

- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests create preview deployments

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables (configure in Vercel dashboard for production):
- `SANITY_PROJECT_ID` - Sanity CMS project ID
- `SANITY_DATASET` - Sanity dataset name
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key

## Internationalization (i18n)

The site supports three languages:
- English (`/en`)
- Russian (`/ru`)
- Indonesian (`/id`)

Translation files are located in `public/locales/{lang}/common.json`.

## Development Workflow

This project follows the **BMAD (Breakthrough Method of Agile AI-driven Development)** methodology. See `/venera_docs/` for detailed project documentation.

## License

Private - All rights reserved.
