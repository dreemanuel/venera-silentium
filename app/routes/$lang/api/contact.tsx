import type { ActionFunctionArgs } from "react-router";
import { contactFormSchema } from "~/lib/schemas";
import { saveContactSubmission } from "~/lib/supabase.server";
import { sendContactNotification } from "~/lib/email.server";

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
  const result = contactFormSchema.safeParse(formValues);
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
    await saveContactSubmission(submissionData);

    // Send email notification (async, don't block response)
    sendContactNotification(submissionData).catch(console.error);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to send message. Please try again or contact us via WhatsApp.",
      },
      { status: 500 }
    );
  }
}

// This route doesn't render anything - it's API only
export default function ContactApi() {
  return null;
}
