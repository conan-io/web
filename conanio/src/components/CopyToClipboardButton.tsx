import { useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";

import { CONANIO_CLIPBOARD_TOOLTIP_ID } from "@/constants/copyTooltip";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export type CopyToClipboardButtonProps = {
  copyText: string;
  children: ReactNode;
  /** Optional callback fired after triggering copy. Useful for analytics events. */
  onCopy?: () => void;
  /** Milliseconds before “Copied!” reverts to the idle tooltip (default 1500). */
  copiedResetMs?: number;
  /** Optional class applied while `isCopied` is true (e.g. downloads `.copied`). */
  copiedClassName?: string;
  tooltipPlace?: "top" | "right" | "bottom" | "left";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "onClick"> & {
  "aria-label": string;
};

const TOOLTIP_IDLE = "Copy to clipboard";
const TOOLTIP_COPIED = "Copied!";

export default function CopyToClipboardButton({
  copyText,
  children,
  onCopy,
  className,
  disabled,
  copiedResetMs = 1500,
  copiedClassName,
  tooltipPlace = "top",
  ...rest
}: CopyToClipboardButtonProps) {
  const { copy, isCopied, reset } = useCopyToClipboard(copiedResetMs);

  useEffect(() => {
    reset();
  }, [copyText, reset]);

  const mergedClassName = [className, isCopied && copiedClassName].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      {...rest}
      disabled={disabled}
      className={mergedClassName || undefined}
      data-tooltip-id={CONANIO_CLIPBOARD_TOOLTIP_ID}
      data-tooltip-content={isCopied ? TOOLTIP_COPIED : TOOLTIP_IDLE}
      data-tooltip-place={tooltipPlace}
      data-tooltip-hidden={disabled ? true : undefined}
      onClick={() => {
        if (disabled || !copyText) return;
        onCopy?.();
        void copy(copyText);
      }}
    >
      {children}
    </button>
  );
}
