# Story 4.2: Create Booking Request Form Component

**Epic**: 4 - Contact & Lead Capture
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **to request a consultation appointment**,
so that **Dr. Venera can contact me to schedule a visit**.

## Acceptance Criteria

- [ ] **AC1**: Booking form with fields: name, email, phone, preferred treatment (dropdown), preferred date range, message
- [ ] **AC2**: Treatment dropdown populated from services in CMS
- [ ] **AC3**: Client-side validation with clear error messages
- [ ] **AC4**: Form distinguished from general contact form (different CTA styling)
- [ ] **AC5**: Form labels and messages are translatable
- [ ] **AC6**: Date range uses simple date inputs (not full calendar)

## Technical Tasks

1. Create validation schema in `app/lib/schemas.ts`:
   ```typescript
   export const bookingFormSchema = z.object({
     name: z.string().min(2, 'Name is required'),
     email: z.string().email('Please enter a valid email'),
     phone: z.string().min(5, 'Phone number is required'),
     preferredService: z.string().min(1, 'Please select a service'),
     preferredDateStart: z.string().optional(),
     preferredDateEnd: z.string().optional(),
     message: z.string().optional(),
   });

   export type BookingFormData = z.infer<typeof bookingFormSchema>;
   ```

2. Create `app/components/forms/BookingForm.tsx`:
   ```tsx
   interface BookingFormProps {
     lang: string;
     services: ServicePreview[];
     preselectedService?: string;
   }

   export function BookingForm({ lang, services, preselectedService }: BookingFormProps) {
     const { t } = useTranslation();
     const fetcher = useFetcher();
     const {
       register,
       handleSubmit,
       formState: { errors },
       reset,
     } = useForm<BookingFormData>({
       resolver: zodResolver(bookingFormSchema),
       defaultValues: {
         preferredService: preselectedService || '',
       },
     });

     return (
       <fetcher.Form onSubmit={handleSubmit(onSubmit)}>
         {/* Name, Email, Phone fields */}

         <FormField label={t('booking.service')} error={errors.preferredService?.message}>
           <Select {...register('preferredService')}>
             <option value="">{t('booking.selectService')}</option>
             {services.map((service) => (
               <option key={service.slug} value={service.slug}>
                 {service.title}
               </option>
             ))}
           </Select>
         </FormField>

         <div className="grid grid-cols-2 gap-4">
           <FormField label={t('booking.dateFrom')} optional>
             <Input type="date" {...register('preferredDateStart')} />
           </FormField>
           <FormField label={t('booking.dateTo')} optional>
             <Input type="date" {...register('preferredDateEnd')} />
           </FormField>
         </div>

         <FormField label={t('booking.additionalNotes')} optional>
           <TextArea {...register('message')} rows={3} />
         </FormField>

         {/* Honeypot */}
         <input type="text" name="website" className="hidden" tabIndex={-1} />
         <input type="hidden" name="language" value={lang} />

         <Button
           type="submit"
           loading={fetcher.state === 'submitting'}
           className="w-full mt-6"
         >
           {t('booking.requestConsultation')}
         </Button>
       </fetcher.Form>
     );
   }
   ```

3. Create `app/components/ui/Select.tsx`:
   ```tsx
   // Styled select dropdown
   // Match design system
   // Custom arrow icon
   ```

4. Add booking form translations:
   ```json
   "booking": {
     "title": "Request a Consultation",
     "service": "Preferred Treatment",
     "selectService": "Select a treatment",
     "dateFrom": "Preferred Date From",
     "dateTo": "Preferred Date To",
     "additionalNotes": "Additional Notes",
     "requestConsultation": "Request Consultation",
     "success": "Your consultation request has been submitted!",
     "successMessage": "Dr. Venera will contact you within 24 hours."
   }
   ```

5. Style to differentiate from contact form:
   - Different background or border
   - Emphasized CTA button (primary gold)
   - Clear heading "Request a Consultation"

## Dependencies

- Story 4.1 (FormField, Input, TextArea components)
- Story 3.1 (Services list for dropdown)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Services populate dropdown from CMS
- [ ] Form validates correctly
- [ ] Pre-selection from URL param works
- [ ] Accessible and responsive

## Notes

- Pre-select service when coming from service detail page
- Date inputs use native browser date picker for simplicity
- Phone is required for booking (unlike contact form)

## Reference Documents

- `/venera_docs/uxui-spec.md` - Booking form wireframe
- `/venera_docs/prd.md` - FR8 booking form
