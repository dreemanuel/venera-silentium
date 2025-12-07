import { Resend } from "resend";
import type { ContactFormData, BookingFormData } from "./schemas";

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.NOTIFICATION_EMAIL;

// Check if email service is configured
const isEmailConfigured = resendApiKey && notificationEmail;

const resend = isEmailConfigured ? new Resend(resendApiKey) : null;

export async function sendContactNotification(
  data: Omit<ContactFormData, "language"> & { language: string }
): Promise<void> {
  if (!resend || !notificationEmail) {
    console.log("[Email not configured] Contact notification:", data.name, data.email);
    return;
  }

  try {
    await resend.emails.send({
      from: "Silentium Website <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `New Contact Message from ${data.name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5c6b73; border-bottom: 2px solid #ccd5ae; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">
                <a href="mailto:${data.email}" style="color: #5c6b73;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">
                ${data.phone ? `<a href="tel:${data.phone}" style="color: #5c6b73;">${data.phone}</a>` : "<em>Not provided</em>"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Language:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">${data.language.toUpperCase()}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #fefae0; border-radius: 8px;">
            <h3 style="color: #5c6b73; margin-top: 0;">Message:</h3>
            <p style="color: #5c6b73; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This message was sent from the Silentium website contact form.
          </p>
        </div>
      `,
    });
    console.log("Contact notification sent to:", notificationEmail);
  } catch (error) {
    console.error("Failed to send contact notification:", error);
    // Don't throw - notification failure shouldn't block form submission
  }
}

export async function sendBookingNotification(
  data: Omit<BookingFormData, "language"> & { language: string }
): Promise<void> {
  if (!resend || !notificationEmail) {
    console.log("[Email not configured] Booking notification:", data.name, data.service);
    return;
  }

  try {
    await resend.emails.send({
      from: "Silentium Website <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `🗓️ New Booking Request from ${data.name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5c6b73; border-bottom: 2px solid #ccd5ae; padding-bottom: 10px;">
            New Consultation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">
                <a href="mailto:${data.email}" style="color: #5c6b73;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">
                <a href="tel:${data.phone}" style="color: #5c6b73;">${data.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Preferred Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; font-weight: bold; color: #5c6b73;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">${data.preferredDate || "Flexible"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9; color: #5c6b73; font-weight: bold;">Language:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e9edc9;">${data.language.toUpperCase()}</td>
            </tr>
          </table>

          ${
            data.message
              ? `
          <div style="margin-top: 20px; padding: 15px; background-color: #fefae0; border-radius: 8px;">
            <h3 style="color: #5c6b73; margin-top: 0;">Additional Notes:</h3>
            <p style="color: #5c6b73; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          `
              : ""
          }

          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This booking request was sent from the Silentium website.
          </p>
        </div>
      `,
    });
    console.log("Booking notification sent to:", notificationEmail);
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    // Don't throw - notification failure shouldn't block form submission
  }
}
