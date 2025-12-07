# Story 5.3: Implement Error and Loading States

**Epic**: 5 - Polish, SEO & Launch
**Status**: Complete

## User Story

As a **visitor**,
I want **graceful handling when something goes wrong**,
so that **I'm not confused by technical errors**.

## Acceptance Criteria

- [x] **AC1**: Custom 404 page with brand styling and helpful navigation
- [x] **AC2**: Custom error boundary for unexpected errors
- [x] **AC3**: Loading skeletons or spinners for async content
- [x] **AC4**: Form submission loading states (button disabled, spinner)
- [x] **AC5**: Offline fallback message if applicable
- [x] **AC6**: Error states are translatable

## Technical Implementation

### Files Created/Modified

1. **`app/routes/$lang/not-found.tsx`** - Catch-all 404 route that throws 404 response
2. **`app/root.tsx`** - Enhanced ErrorBoundary with:
   - Brand-styled 404 page with decorative number
   - General error page with warning icon
   - Multilingual support (en, ru, id)
   - Dev stack trace in development mode
   - Navigation buttons (Home, Services)
3. **`app/components/ui/Skeleton.tsx`** - Comprehensive skeleton components:
   - `Skeleton` - Base animated skeleton
   - `SkeletonText` - Text line skeleton with line count
   - `SkeletonHeading` - Heading skeleton
   - `SkeletonAvatar` - Circle/avatar skeleton (sm, md, lg)
   - `SkeletonImage` - Image skeleton (square, video, portrait)
   - `SkeletonButton` - Button skeleton
   - `SkeletonInput` - Input field skeleton
   - `SkeletonServiceCard` - Full service card skeleton
   - `SkeletonServiceDetail` - Service detail page skeleton
   - `SkeletonServicesGallery` - Services gallery skeleton
   - `SkeletonContactForm` - Contact form skeleton
4. **`app/components/ui/NavigationProgress.tsx`** - Route transition loading:
   - Progress bar at top of page during navigation
   - External store pattern for state management
   - Animated gradient progress indicator
   - Optional loading overlay for slow navigations
5. **`app/lib/utils.ts`** - Utility for className merging (cn function)
6. **`public/locales/{en,ru,id}/common.json`** - Error translations:
   - `errors.notFound.*` - 404 error messages
   - `errors.general.*` - General error messages
   - `errors.offline.*` - Offline messages

### Dependencies Added
- `clsx` - Conditional className composition
- `tailwind-merge` - Tailwind class merging

## Dependencies

- Story 1.4 (Layout components)
- Story 1.3 (i18n for translations)

## Definition of Done

- [x] All acceptance criteria met
- [x] 404 page styled and functional
- [x] Error boundary catches unexpected errors
- [x] Skeleton loaders display correctly
- [x] Form loading states work (Button already had isLoading)
- [x] Errors translated in all languages
- [x] Navigation progress indicator added

## Notes

- Test 404 by visiting invalid URLs (e.g., `/en/invalid-page`)
- Test error boundary by throwing error in component
- Error messages are user-friendly, not technical
- Progress bar uses external store to avoid React state issues with strict linting

## Reference Documents

- `/venera_docs/prd.md` - Error handling requirements
- `/venera_docs/uxui-spec.md` - Error state designs
