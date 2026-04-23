declare namespace NodeJS {
  interface ProcessEnv {
    /** Formspree form id (e.g. `xyzabc`) — used for contact + devis if overrides are unset */
    NEXT_PUBLIC_FORMSPREE_FORM_ID?: string;
    /** Optional: separate Formspree form for the contact page */
    NEXT_PUBLIC_FORMSPREE_CONTACT_ID?: string;
    /** Optional: separate Formspree form for quote / devis */
    NEXT_PUBLIC_FORMSPREE_DEVIS_ID?: string;
  }
}
