# Story 4.5: Create Contact Page

**Epic**: 4 - Contact & Lead Capture
**Status**: Ready for Development

## User Story

As a **visitor**,
I want **a dedicated contact page with all ways to reach Dr. Venera**,
so that **I can choose my preferred communication method**.

## Acceptance Criteria

- [ ] **AC1**: Route at `/:lang/contact` with proper i18n handling
- [ ] **AC2**: Page includes contact form and booking request form (tabbed or sectioned)
- [ ] **AC3**: WhatsApp direct link prominently displayed
- [ ] **AC4**: General location area mentioned (e.g., "Located in Bali")
- [ ] **AC5**: Business hours or response time expectation displayed
- [ ] **AC6**: Social media links included
- [ ] **AC7**: SEO meta tags for contact page

## Technical Tasks

1. Create `app/routes/$lang.contact.tsx`:
   ```typescript
   export async function loader({ params, request }: LoaderFunctionArgs) {
     const lang = params.lang;
     const siteSettings = await getSiteSettings(lang);
     const services = await getAllServices(lang);
     const searchParams = new URL(request.url).searchParams;
     const preselectedService = searchParams.get('service');

     return json({
       siteSettings,
       services,
       preselectedService,
       lang,
     });
   }

   export const meta: MetaFunction = () => {
     return [
       { title: 'Contact | Silentium' },
       { name: 'description', content: 'Get in touch with Dr. Venera for aesthetic consultations in Bali.' },
     ];
   };
   ```

2. Page layout structure:
   ```tsx
   <main className="min-h-screen bg-cream pt-24">
     {/* Page Header */}
     <header className="container mx-auto px-6 py-16 text-center">
       <h1 className="font-serif text-4xl md:text-5xl">
         {t('contact.title')}
       </h1>
       <p className="mt-4 text-soft-charcoal max-w-2xl mx-auto">
         {t('contact.subtitle')}
       </p>
     </header>

     <div className="container mx-auto px-6 py-12">
       <div className="grid md:grid-cols-2 gap-12">
         {/* Forms Column */}
         <div className="space-y-12">
           {/* Tab Selector */}
           <Tabs defaultValue="booking">
             <TabsList>
               <TabsTrigger value="booking">{t('contact.bookConsultation')}</TabsTrigger>
               <TabsTrigger value="contact">{t('contact.sendMessage')}</TabsTrigger>
             </TabsList>
             <TabsContent value="booking">
               <BookingForm
                 lang={lang}
                 services={services}
                 preselectedService={preselectedService}
               />
             </TabsContent>
             <TabsContent value="contact">
               <ContactForm lang={lang} />
             </TabsContent>
           </Tabs>
         </div>

         {/* Contact Info Column */}
         <div className="space-y-8">
           <ContactInfo siteSettings={siteSettings} />
         </div>
       </div>
     </div>
   </main>
   ```

3. Create `app/components/forms/ContactInfo.tsx`:
   ```tsx
   interface ContactInfoProps {
     siteSettings: SiteSettings;
   }

   export function ContactInfo({ siteSettings }: ContactInfoProps) {
     return (
       <div className="space-y-6">
         {/* WhatsApp */}
         <div className="flex items-start gap-4">
           <MessageCircle className="text-gold" />
           <div>
             <h3 className="font-semibold">WhatsApp</h3>
             <a
               href={`https://wa.me/${siteSettings.whatsappNumber}`}
               className="text-gold hover:underline"
             >
               Chat with Dr. Venera
             </a>
           </div>
         </div>

         {/* Location */}
         <div className="flex items-start gap-4">
           <MapPin className="text-gold" />
           <div>
             <h3 className="font-semibold">Location</h3>
             <p>{siteSettings.location}</p>
           </div>
         </div>

         {/* Response Time */}
         <div className="flex items-start gap-4">
           <Clock className="text-gold" />
           <div>
             <h3 className="font-semibold">Response Time</h3>
             <p>Usually within 24 hours</p>
           </div>
         </div>

         {/* Social Links */}
         <div className="pt-6 border-t">
           <h3 className="font-semibold mb-4">Follow Us</h3>
           <div className="flex gap-4">
             {siteSettings.socialLinks.instagram && (
               <a href={siteSettings.socialLinks.instagram} aria-label="Instagram">
                 <Instagram />
               </a>
             )}
             {/* Facebook, Telegram, etc. */}
           </div>
         </div>
       </div>
     );
   }
   ```

4. Create simple Tabs component or use Radix UI:
   ```bash
   npm install @radix-ui/react-tabs
   ```

5. Add contact page translations:
   ```json
   "contact": {
     "title": "Get in Touch",
     "subtitle": "We'd love to hear from you. Reach out for a consultation or any questions.",
     "bookConsultation": "Book Consultation",
     "sendMessage": "Send Message",
     "whatsapp": "Chat on WhatsApp",
     "location": "Located in Bali",
     "responseTime": "We typically respond within 24 hours"
   }
   ```

6. Handle preselected service from URL:
   - Link from service page: `/:lang/contact?service=botox`
   - Pre-populate booking form dropdown

## Dependencies

- Story 4.1 (ContactForm)
- Story 4.2 (BookingForm)
- Story 4.4 (Notifications working)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Both forms work correctly
- [ ] WhatsApp link opens chat
- [ ] Contact info displays
- [ ] Pre-selection from URL works
- [ ] SEO meta tags set

## Notes

- Default to booking form tab (primary conversion goal)
- WhatsApp should be prominent (primary communication channel)
- Don't show exact address for privacy/safety

## Reference Documents

- `/venera_docs/uxui-spec.md` - Contact page wireframe
- `/venera_docs/prd.md` - FR7, FR8, FR10 requirements
