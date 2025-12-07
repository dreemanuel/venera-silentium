# Story 4.4: Implement Notification System

**Epic**: 4 - Contact & Lead Capture
**Status**: ✅ COMPLETE (December 8, 2025)

## User Story

As a **business owner**,
I want **to be notified immediately when someone submits a form**,
so that **I can respond quickly to potential clients**.

## Acceptance Criteria

- [x] **AC1**: WhatsApp click-to-chat link generated with pre-filled message from form data
- [x] **AC2**: Email notification sent to configured address on form submission
- [x] **AC3**: Email includes all submitted form fields formatted clearly
- [x] **AC4**: Notification system uses Supabase Edge Function or Remix action
- [x] **AC5**: Email service integrated (SendGrid, Resend, or similar)
- [x] **AC6**: Notification failures logged but don't block user confirmation

## Technical Tasks

1. **User Action Required**: Create Resend account at resend.com

2. Install Resend SDK:
   ```bash
   npm install resend
   ```

3. Create `app/lib/email.server.ts`:
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);
   const notificationEmail = process.env.NOTIFICATION_EMAIL!;

   export async function sendContactNotification(data: ContactFormData & { language: string }) {
     try {
       await resend.emails.send({
         from: 'Silentium Website <noreply@yourdomain.com>',
         to: notificationEmail,
         subject: `New Contact Message from ${data.name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
           <p><strong>Language:</strong> ${data.language}</p>
           <h3>Message:</h3>
           <p>${data.message}</p>
         `,
       });
     } catch (error) {
       console.error('Failed to send email notification:', error);
       // Don't throw - notification failure shouldn't block form submission
     }
   }

   export async function sendBookingNotification(data: BookingFormData & { language: string }) {
     try {
       await resend.emails.send({
         from: 'Silentium Website <noreply@yourdomain.com>',
         to: notificationEmail,
         subject: `New Booking Request from ${data.name}`,
         html: `
           <h2>New Consultation Request</h2>
           <p><strong>Name:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Phone:</strong> ${data.phone}</p>
           <p><strong>Preferred Service:</strong> ${data.preferredService}</p>
           <p><strong>Preferred Dates:</strong> ${data.preferredDateStart || 'Flexible'} - ${data.preferredDateEnd || 'Flexible'}</p>
           <p><strong>Language:</strong> ${data.language}</p>
           ${data.message ? `<h3>Additional Notes:</h3><p>${data.message}</p>` : ''}
         `,
       });
     } catch (error) {
       console.error('Failed to send booking notification:', error);
     }
   }
   ```

4. Create WhatsApp link generator `app/lib/whatsapp.ts`:
   ```typescript
   const whatsappNumber = process.env.WHATSAPP_NUMBER!;

   export function generateWhatsAppLink(data: {
     name: string;
     service?: string;
     message?: string;
   }) {
     const text = encodeURIComponent(
       `Hi Dr. Venera! My name is ${data.name}.${data.service ? ` I'm interested in ${data.service}.` : ''} ${data.message || ''}`
     );
     return `https://wa.me/${whatsappNumber}?text=${text}`;
   }
   ```

5. Update `app/routes/api.contact.tsx` to send notification:
   ```typescript
   export async function action({ request }: ActionFunctionArgs) {
     // ... validation code ...

     try {
       await saveContactSubmission(validData);

       // Send notification (async, don't await)
       sendContactNotification(validData).catch(console.error);

       return json({ success: true });
     } catch (error) {
       // ... error handling ...
     }
   }
   ```

6. Update `app/routes/api.booking.tsx` similarly

7. Add success message with WhatsApp link option:
   ```tsx
   {fetcher.data?.success && (
     <div className="bg-green-50 p-4 rounded-lg">
       <p>{t('form.success')}</p>
       <a
         href={generateWhatsAppLink({ name: formData.name })}
         target="_blank"
         rel="noopener noreferrer"
         className="text-green-600 underline"
       >
         {t('form.whatsappFollow')}
       </a>
     </div>
   )}
   ```

8. Update environment variables:
   ```
   RESEND_API_KEY=re_xxx
   NOTIFICATION_EMAIL=dr.venera@example.com
   WHATSAPP_NUMBER=62xxxxxxxxxx
   ```

## Dependencies

- Story 4.3 (Form submission storage)

## Definition of Done

- [x] All acceptance criteria met
- [x] Email notifications sent on submission
- [x] WhatsApp link generated correctly
- [x] Notification failures don't break form
- [x] Email format is readable and professional

## Notes

- Use Resend's free tier (100 emails/day)
- WhatsApp number should include country code (no + symbol)
- Consider adding confirmation email to user (Phase 2)

## Reference Documents

- `/venera_docs/architecture.md` - Email service integration
- `/venera_docs/prd.md` - FR9 notification requirement
