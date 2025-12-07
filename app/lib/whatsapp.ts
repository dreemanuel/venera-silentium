// WhatsApp number from environment (without + symbol, e.g., "6281234567890")
const whatsappNumber = process.env.WHATSAPP_PHONE_NUMBER || "";

export type SupportedLanguage = "en" | "ru" | "id";

interface WhatsAppLinkOptions {
  name?: string;
  service?: string;
  message?: string;
  language?: SupportedLanguage | string;
  type?: "general" | "booking" | "inquiry";
}

/**
 * Generate a WhatsApp click-to-chat link with pre-filled message
 */
export function generateWhatsAppLink(options: WhatsAppLinkOptions = {}): string {
  const { name, service, message, language = "en", type = "inquiry" } = options;

  // Build message based on language and type
  let text: string;

  if (language === "ru") {
    if (type === "general") {
      text = "Здравствуйте, Др. Венера! Я хотел бы узнать подробнее о ваших услугах.";
    } else if (type === "booking") {
      text = "Здравствуйте, Др. Венера! Я только что отправил заявку на запись";
      if (service) {
        text += ` на ${service}`;
      }
      text += ". Хотел бы подтвердить детали.";
    } else if (name) {
      text = `Здравствуйте, Др. Венера! Меня зовут ${name}.`;
      if (service) {
        text += ` Меня интересует услуга: ${service}.`;
      }
      if (message) {
        text += ` ${message}`;
      }
    } else {
      text = "Здравствуйте, Др. Венера!";
    }
  } else if (language === "id") {
    if (type === "general") {
      text = "Halo Dr. Venera! Saya ingin mengetahui lebih lanjut tentang layanan Anda.";
    } else if (type === "booking") {
      text = "Halo Dr. Venera! Saya baru saja mengirim permintaan booking";
      if (service) {
        text += ` untuk ${service}`;
      }
      text += ". Saya ingin mengkonfirmasi detailnya.";
    } else if (name) {
      text = `Halo Dr. Venera! Nama saya ${name}.`;
      if (service) {
        text += ` Saya tertarik dengan layanan: ${service}.`;
      }
      if (message) {
        text += ` ${message}`;
      }
    } else {
      text = "Halo Dr. Venera!";
    }
  } else {
    // Default to English
    if (type === "general") {
      text = "Hi Dr. Venera! I'd like to learn more about your services.";
    } else if (type === "booking") {
      text = "Hi Dr. Venera! I just submitted a booking request";
      if (service) {
        text += ` for ${service}`;
      }
      text += ". I'd like to confirm the details.";
    } else if (name) {
      text = `Hi Dr. Venera! My name is ${name}.`;
      if (service) {
        text += ` I'm interested in: ${service}.`;
      }
      if (message) {
        text += ` ${message}`;
      }
    } else {
      text = "Hi Dr. Venera!";
    }
  }

  const encodedText = encodeURIComponent(text.trim());

  // If no WhatsApp number configured, return generic wa.me link
  if (!whatsappNumber) {
    return `https://wa.me/?text=${encodedText}`;
  }

  // Remove any non-numeric characters from the number
  const cleanNumber = whatsappNumber.replace(/\D/g, "");

  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Get the base WhatsApp link without pre-filled message
 */
export function getWhatsAppBaseLink(): string {
  if (!whatsappNumber) {
    return "https://wa.me/";
  }
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}`;
}
