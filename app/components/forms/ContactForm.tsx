import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "~/lib/schemas";
import { generateWhatsAppLink, type SupportedLanguage } from "~/lib/whatsapp";
import { FormField } from "./FormField";
import { FormSuccess } from "./FormSuccess";
import { FormError } from "./FormError";
import { Input } from "~/components/ui/Input";
import { TextArea } from "~/components/ui/TextArea";
import { Button } from "~/components/ui/Button";

interface ContactFormProps {
  lang: string;
}

interface ActionResponse {
  success?: boolean;
  error?: string;
}

export function ContactForm({ lang }: ContactFormProps) {
  const { t } = useTranslation();
  const fetcher = useFetcher<ActionResponse>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success === true;
  const serverError = fetcher.data?.error;

  // Reset form on successful submission
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit = (data: ContactFormData) => {
    fetcher.submit(
      { ...data, language: lang },
      { method: "post", action: `/${lang}/api/contact` }
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {isSuccess && (
        <FormSuccess
          message={t("form.success")}
          className="mb-6"
          whatsappLink={generateWhatsAppLink({
            type: "general",
            language: lang as SupportedLanguage,
          })}
          whatsappText={t("form.whatsappFollowUp")}
        />
      )}

      {serverError && (
        <FormError
          message={serverError}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          label={t("form.name")}
          name="name"
          error={errors.name?.message}
        >
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
          optional
          optionalText={t("form.optional")}
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
          label={t("form.message")}
          name="message"
          error={errors.message?.message}
        >
          <TextArea
            id="message"
            {...register("message")}
            hasError={!!errors.message}
            placeholder={t("form.messagePlaceholder")}
            rows={5}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </FormField>

        {/* Honeypot field - hidden from users, catches bots */}
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
          {isSubmitting ? t("form.sending") : t("form.sendMessage")}
        </Button>
      </form>
    </div>
  );
}
