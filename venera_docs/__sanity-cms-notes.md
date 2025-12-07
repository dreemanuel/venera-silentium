# Webflow + Sanity CMS Migration Discussion Summary

## Goal

Build/maintain a website visually in Webflow but avoid paying for Webflow's expensive CMS plans by using Sanity as a headless CMS instead. Later, potentially fully migrate away from Webflow to a Next.js + Sanity stack.

## Key Questions & Answers

### 1. Can I use Sanity CMS with a Webflow site (on basic hosting plan only)?

**Yes – 100% possible.**

- Treat Webflow as a static site builder + host.
- Use basic Site plan (no CMS plan required).
- Fetch content from Sanity via JavaScript (Fetch API + GROQ) and inject into Webflow pages using Custom Code embeds.
- Works for blogs, portfolios, product listings, etc.
- Trade-offs:
  - Content is client-side rendered → weaker SEO unless mitigated (e.g., SSR via Next.js later, or careful prerendering).
  - Requires custom JavaScript (low-code, not no-code).
  - Images served via Sanity CDN.

### 2. I already built my site with Webflow CMS collections. Can I export the data to migrate to Sanity + Next.js?

**Yes – straightforward.**

- Webflow allows native CSV export for each CMS collection:
  - Go to CMS → select collection → click Export button → downloads CSV.
  - Includes all fields; image fields export as URLs.
- Assets (images/files) must be downloaded separately or re-uploaded using the exported URLs.

### 3. How to import Webflow CSV data into Sanity

- Clean CSV → convert to NDJSON (newline-delimited JSON) format that matches your Sanity schemas.
- Use Sanity CLI:
  ```bash
  sanity dataset import data.ndjson production --replace
  ```
- For complex references/multi-references, map IDs properly during conversion.
- Alternative: build a custom CSV uploader tool in Sanity Studio (using PapaParse + Sanity client).

### 4. Recommended Final Architecture (if fully migrating off Webflow)

Export Webflow design → recreate in Next.js (or use tools like Webflow-to-Next converters).
Use Sanity as the single source of truth for content.
Host on Vercel/Netlify → full static + ISR/SSR → excellent performance + SEO.

#### Cost Benefits

Webflow: Stay on basic Site plan (~$14–18/mo) instead of CMS/Business plans ($39–49+/mo).
Sanity: Free tier sufficient for small–medium sites; paid plans much more scalable and often cheaper than Webflow CMS at scale.

#### Resources to Use

Webflow CMS Export: Built-in export button in each collection.
Sanity import docs: https://www.sanity.io/docs/import
CSV → NDJSON converters or simple Node.js scripts.

Current status: Ready to either (a) keep Webflow + add Sanity via API, or (b) export CMS → migrate fully to Next.js + Sanity.
