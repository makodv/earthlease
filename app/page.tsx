import { redirect } from "next/navigation";

/** Entry `/` → default locale (French). Locale-less paths are handled in `middleware.ts`. */
export default function RootPage() {
  redirect("/fr");
}
