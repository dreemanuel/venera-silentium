import type { ActionFunctionArgs } from "react-router";
import { bookingFormSchema } from "~/lib/schemas";
import { saveBookingRequest } from "~/lib/supabase.server";
import { sendBookingNotification } from "~/lib/email.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);

  // Check honeypot field (bots fill this in)
  if (formValues.website) {
    return Response.json(
      { success: false, error: "Spam detected" },
      { status: 400 }
    );
  }

  // Server-side validation
  const result = bookingFormSchema.safeParse(formValues);
  if (!result.success) {
    return Response.json(
      {
        success: false,
        error: "Please check your form inputs and try again.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const submissionData = {
    ...result.data,
    language: (formValues.language as string) || "en",
  };

  try {
    // Save to database
    await saveBookingRequest(submissionData);

    // Send email notification (async, don't block response)
    sendBookingNotification(submissionData).catch(console.error);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to save booking request:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to submit booking. Please try again or contact us via WhatsApp.",
      },
      { status: 500 }
    );
  }
}

// This route doesn't render anything - it's API only
export default function BookingApi() {
  return null;
}
