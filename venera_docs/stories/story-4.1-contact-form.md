# Story 4.1: Create Contact Form Component

**Epic**: 4 - Contact & Lead Capture
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **to send a message or inquiry to Dr. Venera**,
so that **I can ask questions before deciding to book**.

## Acceptance Criteria

- [ ] **AC1**: Contact form with fields: name, email, phone (optional), message
- [ ] **AC2**: Client-side validation using React Hook Form + Zod
- [ ] **AC3**: Form submission handled by Remix action
- [ ] **AC4**: Success and error states clearly communicated to user
- [ ] **AC5**: Form labels and messages are translatable
- [ ] **AC6**: Honeypot field for basic spam protection

## Technical Tasks

1. Install form dependencies:
   ```bash
   npm install react-hook-form @hookform/resolvers zod
   ```

2. Create validation schema in `app/lib/schemas.ts`:
   ```typescript
   import { z } from 'zod';

   export const contactFormSchema = z.object({
     name: z.string().min(2, 'Name must be at least 2 characters'),
     email: z.string().email('Please enter a valid email'),
     phone: z.string().optional(),
     message: z.string().min(10, 'Message must be at least 10 characters'),
   });

   export type ContactFormData = z.infer<typeof contactFormSchema>;
   ```

3. Create `app/components/forms/FormField.tsx`:
   ```tsx
   interface FormFieldProps {
     label: string;
     error?: string;
     optional?: boolean;
     children: React.ReactNode;
   }

   // Wraps input with label and error message
   // aria-describedby for accessibility
   ```

4. Create `app/components/forms/ContactForm.tsx`:
   ```tsx
   export function ContactForm({ lang }: { lang: string }) {
     const { t } = useTranslation();
     const fetcher = useFetcher();
     const {
       register,
       handleSubmit,
       formState: { errors },
       reset,
     } = useForm<ContactFormData>({
       resolver: zodResolver(contactFormSchema),
     });

     const onSubmit = (data: ContactFormData) => {
       fetcher.submit(
         { ...data, language: lang },
         { method: 'post', action: '/api/contact' }
       );
     };

     // Handle success/error from fetcher.data
     // Reset form on success

     return (
       <fetcher.Form onSubmit={handleSubmit(onSubmit)}>
         <FormField label={t('form.name')} error={errors.name?.message}>
           <Input {...register('name')} />
         </FormField>

         <FormField label={t('form.email')} error={errors.email?.message}>
           <Input type="email" {...register('email')} />
         </FormField>

         <FormField label={t('form.phone')} optional error={errors.phone?.message}>
           <Input type="tel" {...register('phone')} />
         </FormField>

         <FormField label={t('form.message')} error={errors.message?.message}>
           <TextArea {...register('message')} rows={5} />
         </FormField>

         {/* Honeypot */}
         <input
           type="text"
           name="website"
           className="hidden"
           tabIndex={-1}
           autoComplete="off"
         />

         <input type="hidden" name="language" value={lang} />

         <Button
           type="submit"
           loading={fetcher.state === 'submitting'}
           className="w-full mt-6"
         >
           {t('form.sendMessage')}
         </Button>
       </fetcher.Form>
     );
   }
   ```

5. Create `app/components/forms/FormSuccess.tsx` and `FormError.tsx`:
   ```tsx
   // Success: green background, checkmark icon
   // Error: red background, message text
   ```

6. Create UI components for form inputs:
   - `app/components/ui/Input.tsx`
   - `app/components/ui/TextArea.tsx`
   - `app/components/ui/Select.tsx`

7. Add form translations:
   ```json
   "form": {
     "name": "Your Name",
     "email": "Email Address",
     "phone": "Phone Number",
     "message": "Your Message",
     "sendMessage": "Send Message",
     "optional": "optional",
     "success": "Message sent successfully!",
     "error": "Something went wrong. Please try again."
   }
   ```

## Dependencies

- Story 1.4 (Button component)
- Story 1.3 (i18n for translations)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Form validates on client side
- [ ] Error messages display correctly
- [ ] Form submits (action handler in next story)
- [ ] Accessible (labels, error announcements)
- [ ] Responsive on all breakpoints

## Notes

- Form should work without JavaScript (progressive enhancement)
- Consider adding character counter for message field
- Phone validation is optional but can use international format

## Reference Documents

- `/venera_docs/uxui-spec.md` - Contact form wireframe
- `/venera_docs/prd.md` - FR7 contact form
