import { flip, offset, shift } from "@floating-ui/dom";

/** Shared `id` for `<Tooltip id={…} />` and `data-tooltip-id` on copy anchors (react-tooltip v6). */
export const CONANIO_CLIPBOARD_TOOLTIP_ID = "conanio-clipboard";

/** Vertical gap between anchor and tooltip (must match `offset` on `<Tooltip />`). */
export const CONANIO_CLIPBOARD_TOOLTIP_OFFSET_PX = 10;

/**
 * Same chain as react-tooltip defaults, but `shift({ crossAxis: false })` so narrow
 * labels (“Copied!”) stay centered on the anchor instead of sliding sideways.
 */
export const conanioClipboardTooltipMiddlewares = [
  offset(CONANIO_CLIPBOARD_TOOLTIP_OFFSET_PX),
  flip({ fallbackAxisSideDirection: "start" }),
  shift({ padding: 5, crossAxis: false }),
];
