const WHATSAPP_PHONE = "+1 (305) 563 64 74";
const WHATSAPP_PREFILL_MESSAGE = "Bonjour EarthLease, j'ai une question.";

function getWhatsAppHref(): string | null {
  const digits = WHATSAPP_PHONE.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_PREFILL_MESSAGE)}`;
}

export function FloatingWhatsApp() {
  const href = getWhatsAppHref();

  return (
    <div className="fixed bottom-5 right-5 z-[260]">
      <a
        href={href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_28px_rgba(37,211,102,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1ebf5f] hover:shadow-[0_18px_32px_rgba(37,211,102,0.48)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contact WhatsApp EarthLease"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.52 3.48A11.85 11.85 0 0012.04 0C5.53 0 .24 5.29.24 11.8c0 2.08.54 4.11 1.56 5.89L0 24l6.48-1.7a11.8 11.8 0 005.56 1.42h.01c6.5 0 11.79-5.29 11.79-11.8a11.73 11.73 0 00-3.32-8.44zM12.05 21.7h-.01a9.8 9.8 0 01-5-1.37l-.36-.21-3.84 1.01 1.03-3.74-.23-.38a9.82 9.82 0 01-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83a9.7 9.7 0 016.95 2.89 9.74 9.74 0 012.88 6.94c0 5.43-4.41 9.84-9.84 9.84zm5.4-7.38c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.97 8.97 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.94-2.25-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.22 5.09 4.52.71.3 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
        <span className="pointer-events-none absolute right-[3.7rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-[var(--shadow-card)] group-hover:block">
          <span className="inline-flex items-center gap-1.5">
            <img
              src="/logo.svg"
              alt="EarthLease"
              className="h-3.5 w-auto object-contain"
              width={40}
              height={14}
              decoding="async"
            />
            <span>EarthLease</span>
          </span>
        </span>
      </a>
    </div>
  );
}
