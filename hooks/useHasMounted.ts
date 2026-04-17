"use client";

import { useEffect, useState } from "react";

/** True after the first client commit — avoids localStorage vs SSR hydration mismatches. */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
