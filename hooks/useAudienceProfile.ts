"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  readAudienceProfile,
  subscribeAudienceProfile,
  type AudienceProfile,
} from "@/lib/audienceProfile";

function getServerSnapshot(): AudienceProfile | null {
  return null;
}

/**
 * Client-side audience (particulier vs pro fleet). Null until first visit choice or read fails.
 */
export function useAudienceProfile(): AudienceProfile | null {
  return useSyncExternalStore(
    subscribeAudienceProfile,
    readAudienceProfile,
    getServerSnapshot
  );
}
