import { useEffect } from "react";

/**
 * Delegated click handler for `[data-copy]` buttons under `rootId` (e.g. downloads page).
 * Uses `navigator.clipboard` with `document.execCommand("copy")` fallback.
 */
export function useCopyToClipboardDataAttribute(rootId: string) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const copyFallback = (text: string) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      ta.remove();
    };

    const onClick = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".dl-btn--copy[data-copy]") as HTMLButtonElement | null;
      if (!btn || !root.contains(btn)) return;
      const txt = btn.getAttribute("data-copy");
      if (!txt) return;
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(txt);
      } catch {
        copyFallback(txt);
      }
      btn.classList.add("copied");
      window.setTimeout(() => btn.classList.remove("copied"), 1100);
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [rootId]);
}
