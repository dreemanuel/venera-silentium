import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
  // Language for response
  language: z.enum(["en", "ru", "id"]).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
  // Honeypot field
  website: z.string().max(0).optional(),
  language: z.enum(["en", "ru", "id"]).optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
