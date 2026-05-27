import { useCallback, useEffect, useRef, useState } from "react";

import { copyTextToClipboard } from "@/utils/copyToClipboard";

/**
 * Clipboard write with short “copied” feedback for tooltips or UI highlights.
 */
export function useCopyToClipboard(copiedResetMs = 1500) {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsCopied(false);
  }, [clearTimer]);

  const copy = useCallback(
    async (text: string) => {
      const ok = await copyTextToClipboard(text);
      if (!ok) return false;
      setIsCopied(true);
      clearTimer();
      timerRef.current = setTimeout(() => {
        setIsCopied(false);
        timerRef.current = null;
      }, copiedResetMs);
      return true;
    },
    [clearTimer, copiedResetMs],
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  return { copy, isCopied, reset };
}
