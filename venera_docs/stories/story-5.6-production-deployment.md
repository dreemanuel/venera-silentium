# Story 5.6: Production Deployment and Launch

**Epic**: 5 - Polish, SEO & Launch
**Status**: Ready for Development

## User Story

As a **business owner**,
I want **the website live and accessible to the public**,
so that **potential clients can find and learn about my services**.

## Acceptance Criteria

- [ ] **AC1**: Production environment variables configured in Vercel
- [ ] **AC2**: Custom domain configured and SSL certificate active
- [ ] **AC3**: Final Lighthouse audit passed (80+ performance)
- [ ] **AC4**: Google Search Console submitted with sitemap
- [ ] **AC5**: Analytics tracking implemented (optional: Vercel Analytics or Google Analytics)
- [ ] **AC6**: Backup of CMS content and database confirmed
- [ ] **AC7**: Post-launch monitoring for errors established

## Technical Tasks

1. **Configure Production Environment Variables**:
   ```
   # Verify all variables in Vercel dashboard
   SANITY_PROJECT_ID=xxx
   SANITY_DATASET=production
   SANITY_API_TOKEN=xxx

   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx

   RESEND_API_KEY=xxx
   NOTIFICATION_EMAIL=dr.venera@email.com

   WHATSAPP_NUMBER=62xxxxxxxxxx
   ```

2. **Configure Custom Domain** (User action):
   - Purchase domain (if not already owned)
   - Add domain in Vercel project settings
   - Configure DNS records:
     - A record pointing to Vercel's IP
     - Or CNAME to cname.vercel-dns.com
   - Wait for DNS propagation
   - Verify SSL certificate is active

3. **Update hardcoded URLs**:
   ```typescript
   // In sitemap, SEO meta, etc.
   const baseUrl = process.env.SITE_URL || 'https://silentium.com';
   ```

4. **Run Final Lighthouse Audit**:
   ```bash
   lighthouse https://silentium.com --output html --output-path ./lighthouse-report.html
   ```

   Target scores:
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

5. **Submit to Google Search Console**:
   - Go to search.google.com/search-console
   - Add property with domain
   - Verify ownership via DNS TXT record
   - Submit sitemap: `https://silentium.com/sitemap.xml`

6. **Enable Vercel Analytics** (optional):
   ```bash
   npm install @vercel/analytics
   ```

   ```typescript
   // In app/root.tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function App() {
     return (
       <>
         <Outlet />
         <Analytics />
       </>
     );
   }
   ```

7. **Alternative: Google Analytics**:
   ```typescript
   // Add to root.tsx head
   <script
     async
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
   />
   <script
     dangerouslySetInnerHTML={{
       __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${GA_TRACKING_ID}');
       `,
     }}
   />
   ```

8. **Create Content Backup**:
   - Export Sanity dataset: `sanity dataset export production backup.tar.gz`
   - Export Supabase data: Download from dashboard

9. **Set up Error Monitoring** (optional):
   - Consider Sentry for error tracking
   - Or use Vercel's built-in error logging

10. **Create Launch Checklist**:
    ```markdown
    ## Pre-Launch
    - [ ] All content finalized
    - [ ] All tests passing
    - [ ] Lighthouse scores acceptable
    - [ ] Mobile testing complete
    - [ ] Forms tested end-to-end

    ## Launch
    - [ ] DNS configured
    - [ ] SSL active
    - [ ] Production deployment triggered
    - [ ] Site accessible at custom domain

    ## Post-Launch
    - [ ] Google Search Console submitted
    - [ ] Analytics verified
    - [ ] Test contact form (real submission)
    - [ ] Test booking form (real submission)
    - [ ] Monitor error logs
    - [ ] Share with client for final approval
    ```

11. **Create Post-Launch Monitoring Plan**:
    - Check Vercel dashboard daily for first week
    - Monitor form submissions in Supabase
    - Review any error logs
    - Track Search Console for indexing status

## Dependencies

- Story 5.5 (Content finalized)
- Story 5.4 (Testing complete)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Site live at custom domain
- [ ] SSL certificate active (https://)
- [ ] Lighthouse scores meet targets
- [ ] Search Console configured
- [ ] Analytics tracking active
- [ ] Client sign-off received

## Notes

- **User actions required**:
  - Domain purchase/configuration
  - DNS setup
  - Search Console verification
- Allow 24-48 hours for DNS propagation
- Monitor closely for first 48 hours after launch

## Reference Documents

- `/venera_docs/architecture.md` - Deployment strategy
- `/venera_docs/prd.md` - Launch requirements
