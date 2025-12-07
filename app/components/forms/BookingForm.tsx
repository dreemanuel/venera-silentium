import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema, type BookingFormData } from "~/lib/schemas";
import { generateWhatsAppLink, type SupportedLanguage } from "~/lib/whatsapp";
import { FormField } from "./FormField";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { Input } from "~/components/ui/Input";
import { TextArea } from "~/components/ui/TextArea";
import { Select } from "~/components/ui/Select";
import { Button } from "~/components/ui/Button";
import { type Service, type Language, getLocalizedValue } from "~/lib/sanity";

interface BookingFormProps {
  lang: string;
  services: Service[];
  preselectedService?: string;
}

interface ActionResponse {
  success?: boolean;
  error?: string;
}

export function BookingForm({
  lang,
  services,
  preselectedService,
}: BookingFormProps) {
  const { t } = useTranslation();
  const fetcher = useFetcher<ActionResponse>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: preselectedService || "",
    },
  });

  // Watch the service field to use in WhatsApp link
  const selectedService = useWatch({ control, name: "service" });

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success === true;
  const serverError = fetcher.data?.error;

  // Reset form on successful submission
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit = (data: BookingFormData) => {
    fetcher.submit(
      { ...data, language: lang },
      { method: "post", action: `/${lang}/api/booking` }
    );
  };

  // Get min date for date picker (today)
  const today = new Date().toISOString().split("T")[0];

  // Get selected service name for WhatsApp link
  const getSelectedServiceName = (): string | undefined => {
    if (!selectedService) return undefined;
    const service = services.find((s) => s.slug.current === selectedService);
    if (!service) return undefined;
    return getLocalizedValue(service.title, lang as Language) || service.title.en;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSuccess && (
        <FormSuccess
          message={t("booking.success")}
          className="mb-6"
          whatsappLink={generateWhatsAppLink({
            type: "booking",
            language: lang as SupportedLanguage,
            service: getSelectedServiceName(),
          })}
          whatsappText={t("form.whatsappFollowUp")}
        />
      )}

      {serverError && <FormError message={serverError} className="mb-6" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label={t("form.name")} name="name" error={errors.name?.message}>
          <Input
            id="name"
            {...register("name")}
            hasError={!!errors.name}
            placeholder={t("form.namePlaceholder")}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField
          label={t("form.email")}
          name="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            {...register("email")}
            hasError={!!errors.email}
            placeholder={t("form.emailPlaceholder")}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </FormField>

        <FormField
          label={t("form.phone")}
          name="phone"
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            hasError={!!errors.phone}
            placeholder={t("form.phonePlaceholder")}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </FormField>

        <FormField
          label={t("form.service")}
          name="service"
          error={errors.service?.message}
        >
          <Select
            id="service"
            {...register("service")}
            hasError={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">{t("form.servicePlaceholder")}</option>
            {services.map((service) => (
              <option key={service._id} value={service.slug.current}>
                {getLocalizedValue(service.title, lang as Language) ||
                  service.title.en}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label={t("form.preferredDate")}
          name="preferredDate"
          optional
          optionalText={t("form.optional")}
          error={errors.preferredDate?.message}
        >
          <Input
            id="preferredDate"
            type="date"
            min={today}
            {...register("preferredDate")}
            hasError={!!errors.preferredDate}
            aria-describedby={
              errors.preferredDate ? "preferredDate-error" : undefined
            }
          />
        </FormField>

        <FormField
          label={t("form.message")}
          name="message"
          optional
          optionalText={t("form.optional")}
          error={errors.message?.message}
        >
          <TextArea
            id="message"
            {...register("message")}
            hasError={!!errors.message}
            placeholder={t("booking.notesPlaceholder")}
            rows={3}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </FormField>

        {/* Honeypot field */}
        <input
          type="text"
          {...register("website")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <input type="hidden" {...register("language")} value={lang} />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full mt-6"
          size="lg"
        >
          {isSubmitting ? t("booking.submitting") : t("form.bookNow")}
        </Button>
      </form>
    </div>
  );
}
