import { redirect } from "react-router";
import { defaultLanguage } from "~/lib/i18n";

export function loader() {
  return redirect(`/${defaultLanguage}`);
}

export default function HomeRedirect() {
  return null;
}
