# Silentium Launch Checklist

**Project**: Venera Cosmetology / Silentium
**Target Launch Date**: TBD
**Status**: Pre-Launch

---

## Pre-Launch Tasks

### Environment Configuration

- [ ] **Vercel Project Created**
  - Project linked to GitHub repository
  - Production branch set to `main`

- [ ] **Environment Variables Configured in Vercel**
  ```
  # Sanity CMS
  SANITY_PROJECT_ID=xxx
  SANITY_DATASET=production
  SANITY_API_TOKEN=xxx

  # Supabase
  SUPABASE_URL=https://nawxbsmydrtmezifxtnz.supabase.co
  SUPABASE_ANON_KEY=xxx
  SUPABASE_SERVICE_ROLE_KEY=xxx

  # Notifications
  RESEND_API_KEY=xxx
  NOTIFICATION_EMAIL=dr.venera@email.com

  # WhatsApp
  WHATSAPP_NUMBER=62xxxxxxxxxx

  # Site URL (production domain)
  SITE_URL=https://silentium.com
  ```

### Domain Configuration

- [ ] **Domain Purchased** (if not already owned)
  - Recommended: `silentium.com` or `silentium.co`

- [ ] **Domain Added to Vercel**
  - Navigate to Vercel Project > Settings > Domains
  - Add domain name

- [ ] **DNS Records Configured**
  - Option A: A record pointing to Vercel's IP
  - Option B: CNAME to `cname.vercel-dns.com`

- [ ] **SSL Certificate Active**
  - Vercel auto-provisions Let's Encrypt certificate
  - Verify HTTPS is working

- [ ] **DNS Propagation Complete**
  - Allow 24-48 hours for full propagation
  - Test with: `dig silentium.com` or `nslookup silentium.com`

### Content Verification

- [ ] **All Services Populated**
  - 13 services with EN/RU/ID content
  - Images uploaded for each service

- [ ] **About Content Finalized**
  - Dr. Venera's story and credentials
  - Silentium philosophy
  - Professional photos uploaded

- [ ] **Contact Information Verified**
  - Email address correct
  - Phone number correct and formatted
  - WhatsApp number with country code
  - Location description accurate

- [ ] **Legal Pages Ready**
  - Privacy Policy content reviewed
  - Terms of Service content reviewed

### Technical Verification

- [ ] **Build Successful**
  ```bash
  npm run build
  ```

- [ ] **TypeScript Passes**
  ```bash
  npm run typecheck
  ```

- [ ] **Lint Passes**
  ```bash
  npm run lint
  ```

- [ ] **Forms Tested**
  - Contact form submission works
  - Booking form submission works
  - Data stored in Supabase
  - Email notifications sending (when Resend configured)

---

## Launch Day Tasks

### Deployment

- [ ] **Final Code Push**
  ```bash
  git push origin main
  ```

- [ ] **Vercel Deployment Triggered**
  - Monitor build in Vercel dashboard
  - Verify deployment successful

- [ ] **Site Accessible at Custom Domain**
  - Test: `https://silentium.com`
  - Test: `https://www.silentium.com`

### Verification

- [ ] **All Pages Load Correctly**
  - Homepage (EN/RU/ID)
  - About page (EN/RU/ID)
  - Services index (EN/RU/ID)
  - Service detail pages
  - Contact page (EN/RU/ID)
  - Privacy Policy
  - Terms of Service

- [ ] **Language Switching Works**
  - Test EN -> RU -> ID switching
  - URLs update correctly

- [ ] **Mobile Responsive**
  - Test on actual mobile devices
  - Navigation menu works
  - Forms submit correctly

- [ ] **Forms Working in Production**
  - Submit test contact form
  - Submit test booking form
  - Verify Supabase receives data
  - Verify email notifications (if configured)

---

## Post-Launch Tasks

### SEO Setup

- [ ] **Google Search Console**
  - Go to: https://search.google.com/search-console
  - Add property with domain
  - Verify ownership via DNS TXT record
  - Submit sitemap: `https://silentium.com/sitemap.xml`

- [ ] **Sitemap Accessible**
  - Verify: `https://silentium.com/sitemap.xml`
  - All pages and services listed
  - Hreflang tags present

- [ ] **Robots.txt Accessible**
  - Verify: `https://silentium.com/robots.txt`

### Performance Audit

- [ ] **Lighthouse Audit**
  ```bash
  lighthouse https://silentium.com --output html --output-path ./lighthouse-report.html
  ```

  Target Scores:
  - Performance: 80+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 90+

- [ ] **Core Web Vitals**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

### Analytics & Monitoring

- [ ] **Vercel Analytics Active**
  - Analytics component added to root.tsx
  - Verify data flowing in Vercel dashboard

- [ ] **Error Monitoring**
  - Check Vercel logs for any errors
  - Monitor for first 48 hours

### Backups

- [ ] **Sanity Dataset Backup**
  ```bash
  cd sanity
  sanity dataset export production ../backups/sanity-backup-$(date +%Y%m%d).tar.gz
  ```

- [ ] **Supabase Data Backup**
  - Export from Supabase dashboard
  - Or use pg_dump if database grows

---

## Week 1 Monitoring

### Daily Checks (First Week)

- [ ] Check Vercel dashboard for errors
- [ ] Monitor form submissions in Supabase
- [ ] Review Search Console for indexing issues
- [ ] Test critical flows (contact, booking)

### Client Handoff

- [ ] **Client Walkthrough**
  - Show how to use Sanity Studio
  - Demonstrate form submission flow
  - Explain WhatsApp integration

- [ ] **Documentation Provided**
  - Access credentials for all services
  - Contact information for support
  - Emergency procedures

---

## Emergency Contacts

- **Vercel Dashboard**: https://vercel.com
- **Sanity Studio**: https://silentium.sanity.studio
- **Supabase Dashboard**: https://nawxbsmydrtmezifxtnz.supabase.co
- **GitHub Repository**: https://github.com/dreemanuel/venera-silentium

---

## Notes

- Allow 24-48 hours for DNS propagation
- Monitor closely for first 48 hours after launch
- Have rollback plan ready (revert to previous deployment in Vercel)
- Keep backup of all environment variables locally (encrypted)
