import { createClient } from "@supabase/supabase-js";
import type { ContactFormData, BookingFormData } from "./schemas";

// Server-side Supabase client using service role key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseServiceKey;

// Create client only if configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export interface ContactSubmission extends Omit<ContactFormData, "language"> {
  language: string;
}

export interface BookingRequest extends Omit<BookingFormData, "language"> {
  language: string;
}

export async function saveContactSubmission(
  data: ContactSubmission
): Promise<void> {
  if (!supabase) {
    console.log("[Supabase not configured] Contact submission:", data);
    return;
  }

  const { error } = await supabase.from("contact_submissions").insert([
    {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      language: data.language,
    },
  ]);

  if (error) {
    console.error("Failed to save contact submission:", error);
    throw new Error("Failed to save submission");
  }
}

export async function saveBookingRequest(data: BookingRequest): Promise<void> {
  if (!supabase) {
    console.log("[Supabase not configured] Booking request:", data);
    return;
  }

  const { error } = await supabase.from("booking_requests").insert([
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferred_service: data.service,
      preferred_date: data.preferredDate || null,
      message: data.message || null,
      language: data.language,
    },
  ]);

  if (error) {
    console.error("Failed to save booking request:", error);
    throw new Error("Failed to save booking");
  }
}
