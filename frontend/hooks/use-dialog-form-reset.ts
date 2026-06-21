"use client";

import { useEffect, useRef } from "react";

/**
 * Resets a dialog form only when it opens — not when reference data loads
 * while the user is already typing.
 */
export function useDialogFormReset(open: boolean, reset: () => void) {
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      reset();
    }
    wasOpenRef.current = open;
  }, [open, reset]);
}
