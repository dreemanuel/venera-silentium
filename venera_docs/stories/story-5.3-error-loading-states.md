# Story 5.3: Implement Error and Loading States

**Epic**: 5 - Polish, SEO & Launch
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **graceful handling when something goes wrong**,
so that **I'm not confused by technical errors**.

## Acceptance Criteria

- [ ] **AC1**: Custom 404 page with brand styling and helpful navigation
- [ ] **AC2**: Custom error boundary for unexpected errors
- [ ] **AC3**: Loading skeletons or spinners for async content
- [ ] **AC4**: Form submission loading states (button disabled, spinner)
- [ ] **AC5**: Offline fallback message if applicable
- [ ] **AC6**: Error states are translatable

## Technical Tasks

1. Create `app/routes/$lang.$.tsx` (catch-all 404):
   ```typescript
   export default function NotFound() {
     const { lang } = useParams();
     const { t } = useTranslation();

     return (
       <main className="min-h-screen bg-cream flex items-center justify-center">
         <div className="text-center px-6">
           <h1 className="font-serif text-6xl text-gold mb-4">404</h1>
           <h2 className="text-2xl mb-4">{t('error.pageNotFound')}</h2>
           <p className="text-soft-charcoal mb-8">
             {t('error.pageNotFoundMessage')}
           </p>
           <div className="flex gap-4 justify-center">
             <Button as={Link} to={`/${lang}`}>
               {t('error.goHome')}
             </Button>
             <Button as={Link} to={`/${lang}/services`} variant="secondary">
               {t('error.viewServices')}
             </Button>
           </div>
         </div>
       </main>
     );
   }
   ```

2. Create `app/components/ErrorBoundary.tsx`:
   ```typescript
   export function ErrorBoundary() {
     const error = useRouteError();
     const { t } = useTranslation();

     if (isRouteErrorResponse(error)) {
       return (
         <div className="min-h-screen bg-cream flex items-center justify-center">
           <div className="text-center px-6">
             <h1 className="font-serif text-4xl mb-4">{error.status}</h1>
             <p>{error.statusText}</p>
           </div>
         </div>
       );
     }

     return (
       <div className="min-h-screen bg-cream flex items-center justify-center">
         <div className="text-center px-6">
           <h1 className="font-serif text-4xl mb-4">{t('error.somethingWrong')}</h1>
           <p className="text-soft-charcoal mb-8">
             {t('error.tryAgain')}
           </p>
           <Button onClick={() => window.location.reload()}>
             {t('error.refresh')}
           </Button>
         </div>
       </div>
     );
   }
   ```

3. Add error boundary to `app/root.tsx`:
   ```typescript
   export { ErrorBoundary } from './components/ErrorBoundary';
   ```

4. Create `app/components/ui/Skeleton.tsx`:
   ```typescript
   interface SkeletonProps {
     className?: string;
     variant?: 'text' | 'circular' | 'rectangular';
   }

   export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
     return (
       <div
         className={cn(
           'animate-pulse bg-charcoal/10',
           variant === 'circular' && 'rounded-full',
           variant === 'text' && 'rounded h-4',
           variant === 'rectangular' && 'rounded-lg',
           className
         )}
       />
     );
   }
   ```

5. Create `app/components/services/ServiceCardSkeleton.tsx`:
   ```typescript
   export function ServiceCardSkeleton() {
     return (
       <div className="aspect-[4/3] rounded-2xl overflow-hidden">
         <Skeleton className="w-full h-full" />
       </div>
     );
   }
   ```

6. Create loading spinner for buttons:
   ```typescript
   // Already in Button component from Story 1.4
   // Ensure loading prop disables button and shows spinner
   ```

7. Add error translations:
   ```json
   "error": {
     "pageNotFound": "Page Not Found",
     "pageNotFoundMessage": "The page you're looking for doesn't exist or has been moved.",
     "goHome": "Go Home",
     "viewServices": "View Services",
     "somethingWrong": "Something Went Wrong",
     "tryAgain": "Please try again later or contact us directly.",
     "refresh": "Refresh Page"
   }
   ```

8. Implement loading UI for route transitions (optional):
   ```typescript
   // In root.tsx
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';

   return (
     <>
       {isLoading && <LoadingBar />}
       <Outlet />
     </>
   );
   ```

## Dependencies

- Story 1.4 (Layout components)
- Story 1.3 (i18n for translations)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] 404 page styled and functional
- [ ] Error boundary catches unexpected errors
- [ ] Skeleton loaders display correctly
- [ ] Form loading states work
- [ ] Errors translated in all languages

## Notes

- Test 404 by visiting invalid URLs
- Test error boundary by throwing error in component
- Keep error messages user-friendly, not technical

## Reference Documents

- `/venera_docs/prd.md` - Error handling requirements
- `/venera_docs/uxui-spec.md` - Error state designs
