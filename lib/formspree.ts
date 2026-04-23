export type FormspreeResult = { ok: true } | { ok: false; message: string };

function formspreeEndpoint(formId: string): string {
  return `https://formspree.io/f/${formId}`;
}

/** Contact form: override or fall back to `NEXT_PUBLIC_FORMSPREE_FORM_ID`. */
export function getFormspreeContactFormId(): string | undefined {
  const specific = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID?.trim();
  const shared = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  return specific || shared || undefined;
}

/** Quote / devis form: override or fall back to `NEXT_PUBLIC_FORMSPREE_FORM_ID`. */
export function getFormspreeQuoteFormId(): string | undefined {
  const specific = process.env.NEXT_PUBLIC_FORMSPREE_DEVIS_ID?.trim();
  const shared = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  return specific || shared || undefined;
}

function formatFormspreeError(data: unknown): string {
  if (typeof data !== "object" || data === null) {
    return "Submission failed";
  }
  const rec = data as Record<string, unknown>;
  if (typeof rec.error === "string" && rec.error.length > 0) {
    return rec.error;
  }
  const errors = rec.errors;
  if (Array.isArray(errors)) {
    return errors.map(String).join(", ");
  }
  if (errors && typeof errors === "object") {
    return Object.entries(errors as Record<string, unknown>)
      .flatMap(([key, val]) => {
        if (Array.isArray(val)) {
          return val.map((v) => `${key}: ${String(v)}`);
        }
        return [`${key}: ${String(val)}`];
      })
      .join(", ");
  }
  return "Submission failed";
}

export async function submitFormspree(
  formId: string,
  body: Record<string, string>,
): Promise<FormspreeResult> {
  try {
    const res = await fetch(formspreeEndpoint(formId), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      return { ok: true };
    }

    return { ok: false, message: formatFormspreeError(data) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Network error";
    return { ok: false, message };
  }
}
