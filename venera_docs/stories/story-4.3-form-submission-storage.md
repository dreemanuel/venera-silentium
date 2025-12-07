# Story 4.3: Implement Form Submission Storage

**Epic**: 4 - Contact & Lead Capture
**Status**: Ready for Development

## User Story

As a **business owner**,
I want **all form submissions stored in a database**,
so that **I have a record of leads and can follow up**.

## Acceptance Criteria

- [ ] **AC1**: Supabase tables created: `contact_submissions`, `booking_requests`
- [ ] **AC2**: Remix action stores form data in appropriate Supabase table
- [ ] **AC3**: Timestamps and source language captured with each submission
- [ ] **AC4**: Database row-level security configured for admin access
- [ ] **AC5**: Successful submission returns confirmation to user
- [ ] **AC6**: Error handling for database connection issues

## Technical Tasks

1. **User Action Required**: Create Supabase project at supabase.com

2. Create Supabase tables (run in Supabase SQL editor):
   ```sql
   -- Contact Submissions
   CREATE TABLE contact_submissions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     message TEXT NOT NULL,
     language VARCHAR(5) NOT NULL,
     status VARCHAR(20) DEFAULT 'new',
     notes TEXT
   );

   -- Row Level Security
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow public inserts" ON contact_submissions
     FOR INSERT TO anon WITH CHECK (true);

   CREATE POLICY "Allow authenticated read" ON contact_submissions
     FOR SELECT TO authenticated USING (true);

   -- Booking Requests
   CREATE TABLE booking_requests (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50) NOT NULL,
     preferred_service VARCHAR(255) NOT NULL,
     preferred_date_start DATE,
     preferred_date_end DATE,
     message TEXT,
     language VARCHAR(5) NOT NULL,
     status VARCHAR(20) DEFAULT 'pending',
     notes TEXT
   );

   ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow public inserts" ON booking_requests
     FOR INSERT TO anon WITH CHECK (true);

   CREATE POLICY "Allow authenticated read" ON booking_requests
     FOR SELECT TO authenticated USING (true);
   ```

3. Create `app/lib/supabase.server.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.SUPABASE_URL!;
   const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

   export const supabase = createClient(supabaseUrl, supabaseServiceKey);

   export async function saveContactSubmission(data: ContactFormData & { language: string }) {
     const { error } = await supabase
       .from('contact_submissions')
       .insert([{
         name: data.name,
         email: data.email,
         phone: data.phone || null,
         message: data.message,
         language: data.language,
       }]);

     if (error) throw error;
   }

   export async function saveBookingRequest(data: BookingFormData & { language: string }) {
     const { error } = await supabase
       .from('booking_requests')
       .insert([{
         name: data.name,
         email: data.email,
         phone: data.phone,
         preferred_service: data.preferredService,
         preferred_date_start: data.preferredDateStart || null,
         preferred_date_end: data.preferredDateEnd || null,
         message: data.message || null,
         language: data.language,
       }]);

     if (error) throw error;
   }
   ```

4. Create `app/routes/api.contact.tsx`:
   ```typescript
   export async function action({ request }: ActionFunctionArgs) {
     const formData = await request.formData();
     const data = Object.fromEntries(formData);

     // Check honeypot
     if (data.website) {
       return json({ success: false, error: 'Spam detected' }, { status: 400 });
     }

     // Validate
     const result = contactFormSchema.safeParse(data);
     if (!result.success) {
       return json({
         success: false,
         errors: result.error.flatten().fieldErrors
       }, { status: 400 });
     }

     try {
       await saveContactSubmission({
         ...result.data,
         language: data.language as string
       });
       return json({ success: true });
     } catch (error) {
       console.error('Failed to save contact:', error);
       return json({
         success: false,
         error: 'Failed to send message. Please try again.'
       }, { status: 500 });
     }
   }
   ```

5. Create `app/routes/api.booking.tsx` (similar structure)

6. Update Vercel environment variables:
   ```
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```

## Dependencies

- Story 4.1 (Contact form component)
- Story 4.2 (Booking form component)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Supabase tables created
- [ ] Submissions saved to database
- [ ] Success response returned to client
- [ ] Error handling works correctly
- [ ] RLS policies configured

## Notes

- Use service role key server-side only
- Anon key for client-side if needed later
- Test with Supabase dashboard to verify data

## Reference Documents

- `/venera_docs/architecture.md` - Supabase schema
- `/venera_docs/prd.md` - FR7, FR8 form requirements
