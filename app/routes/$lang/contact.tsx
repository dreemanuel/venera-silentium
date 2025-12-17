import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/contact";
import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Clock, Instagram } from "lucide-react";
import { sanityClient } from "~/lib/sanity/client.server";
import {
  siteSettingsQuery,
  servicesQuery,
  type SiteSettings,
  type Service,
  type Language,
} from "~/lib/sanity";
import { ContactForm, BookingForm } from "~/components/forms";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/Tabs";
import { generateMeta, pageSeo, getOgLocale, SITE_URL } from "~/lib/seo";

export async function loader({ params, request }: Route.LoaderArgs) {
  const lang = (params.lang || "en") as Language;

  // Get preselected service from URL
  const url = new URL(request.url);
  const preselectedService = url.searchParams.get("service");

  let siteSettings: SiteSettings | null = null;
  let services: Service[] = [];

  try {
    [siteSettings, services] = await Promise.all([
      sanityClient.fetch<SiteSettings>(siteSettingsQuery),
      sanityClient.fetch<Service[]>(servicesQuery),
    ]);
  } catch {
    console.log("Sanity fetch failed");
  }

  return { siteSettings, services, lang, preselectedService };
}

export function meta({ params }: Route.MetaArgs) {
  const lang = params.lang || "en";
  const seo = pageSeo.contact[lang as keyof typeof pageSeo.contact] || pageSeo.contact.en;

  return generateMeta({
    title: seo.title,
    description: seo.description,
    url: `${SITE_URL}/${lang}/contact`,
    locale: getOgLocale(lang),
  });
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Contact() {
  const { t } = useTranslation();
  const { siteSettings, services, lang, preselectedService } =
    useLoaderData<typeof loader>();

  // Determine default tab based on preselected service
  const defaultTab = preselectedService ? "booking" : "booking";

  return (
    <main className="min-h-screen bg-cornsilk">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-tea-green/20">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-paynes-gray mb-2 leading-[0.75]"
          >
            {t("contact.pageTitle")}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-paynes-gray/70 font-heading text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t("contact.pageSubtitle")}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Forms Column */}
            <motion.div variants={itemVariants}>
              <div className="glass p-8">
                <Tabs defaultValue={defaultTab}>
                  <TabsList>
                    <TabsTrigger value="booking">
                      {t("contact.bookConsultation")}
                    </TabsTrigger>
                    <TabsTrigger value="contact">
                      {t("contact.sendMessage")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="booking">
                    <BookingForm
                      lang={lang}
                      services={services}
                      preselectedService={preselectedService || undefined}
                    />
                  </TabsContent>

                  <TabsContent value="contact">
                    <ContactForm lang={lang} />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>

            {/* Contact Info Column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass p-8">
                <h2 className="text-2xl text-paynes-gray mb-6 font-heading">
                  {t("contact.ctaHeading")}
                </h2>

                <div className="space-y-5">
                  {/* WhatsApp - Primary */}
                  {siteSettings?.whatsappNumber && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-heading text-paynes-gray font-medium">
                          WhatsApp
                        </p>
                        <a
                          href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 transition-colors font-medium"
                        >
                          {t("contact.chatOnWhatsApp")}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-tea-green/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-paynes-gray" />
                    </div>
                    <div>
                      <p className="font-heading text-paynes-gray font-medium">
                        {t("contact.location")}
                      </p>
                      <p className="text-paynes-gray/70">Bali, Indonesia</p>
                    </div>
                  </div>

                  {/* Email */}
                  {siteSettings?.contactEmail && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-tea-green/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-paynes-gray" />
                      </div>
                      <div>
                        <p className="font-heading text-paynes-gray font-medium">
                          {t("contact.email")}
                        </p>
                        <a
                          href={`mailto:${siteSettings.contactEmail}`}
                          className="text-paynes-gray/70 hover:text-paynes-gray transition-colors"
                        >
                          {siteSettings.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {siteSettings?.contactPhone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-tea-green/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-paynes-gray" />
                      </div>
                      <div>
                        <p className="font-heading text-paynes-gray font-medium">
                          {t("contact.phone")}
                        </p>
                        <a
                          href={`tel:${siteSettings.contactPhone}`}
                          className="text-paynes-gray/70 hover:text-paynes-gray transition-colors"
                        >
                          {siteSettings.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-tea-green/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-paynes-gray" />
                    </div>
                    <div>
                      <p className="font-heading text-paynes-gray font-medium">
                        {t("contact.responseTime")}
                      </p>
                      <p className="text-paynes-gray/70">
                        {t("contact.responseTimeText")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {siteSettings?.socialLinks && (
                  <div className="pt-6 mt-6 border-t border-tea-green/30">
                    <h3 className="font-heading text-paynes-gray font-medium mb-4">
                      {t("contact.followUs")}
                    </h3>
                    <div className="flex gap-4">
                      {siteSettings.socialLinks.instagram && (
                        <a
                          href={siteSettings.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="w-10 h-10 rounded-full bg-tea-green/30 flex items-center justify-center hover:bg-tea-green/50 transition-colors"
                        >
                          <Instagram className="w-5 h-5 text-paynes-gray" />
                        </a>
                      )}
                      {/* Add more social links as needed */}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional info */}
              <div className="glass-light p-6 text-center">
                <p className="text-paynes-gray/70 font-body text-sm">
                  {t("common.location")}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
