# Story 1.5: Setup Deployment Pipeline

**Epic**: 1 - Foundation & Project Setup
**Status**: Ready for Development

## User Story

As a **developer**,
I want **automated deployment to Vercel on push to main branch**,
so that **changes are automatically deployed to production**.

## Acceptance Criteria

- [ ] **AC1**: Vercel project created and connected to Git repository
- [ ] **AC2**: Environment variables configured in Vercel dashboard
- [ ] **AC3**: Build command and output directory correctly configured
- [ ] **AC4**: Preview deployments enabled for pull requests
- [ ] **AC5**: Production deployment accessible via custom domain (or Vercel subdomain for MVP)
- [ ] **AC6**: Successful deployment of current state verified

## Technical Tasks

1. **Git Repository Setup** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Remix project setup"
   ```

2. **Push to GitHub**:
   - Create repository on GitHub
   - Add remote and push

3. **Vercel Project Setup**:
   - Go to vercel.com and import project
   - Select GitHub repository
   - Framework preset: Remix
   - Build command: `npm run build`
   - Output directory: `build`

4. **Configure Environment Variables in Vercel**:
   ```
   # Placeholder values for now - will be updated in later stories
   SANITY_PROJECT_ID=placeholder
   SANITY_DATASET=production
   SUPABASE_URL=placeholder
   SUPABASE_ANON_KEY=placeholder
   ```

5. **Create `vercel.json`** (if needed for custom config):
   ```json
   {
     "framework": "remix"
   }
   ```

6. **Test Deployment**:
   - Trigger deployment from Vercel dashboard
   - Verify site loads at Vercel URL
   - Test preview deployment with a PR

7. **Update README.md** with deployment information

## Dependencies

- Story 1.1 (Remix project)
- Story 1.4 (Layout and navigation for visual verification)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Production URL accessible and renders correctly
- [ ] Preview deployments work for pull requests
- [ ] Environment variables configured (even if placeholder)
- [ ] Build succeeds without errors

## Notes

- Use Vercel's free tier for MVP
- Custom domain is optional for MVP; Vercel subdomain is acceptable
- Ensure sensitive keys are not committed to repository

## Reference Documents

- `/venera_docs/architecture.md` - Infrastructure overview
- `/venera_docs/prd.md` - NFR9 free tier limits
