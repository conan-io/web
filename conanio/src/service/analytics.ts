type ConanAnalyticsEvent = {
  event_name?: string;
  type: string;
  purpose: string;
  description: string;
  search_term?: string;
  product?: string;
  platforms?: string;
  section?: string;
};

type ConanWindow = Window & { dataLayer?: unknown[] };

function getDataLayer(): unknown[] | null {
  if (typeof window === "undefined") {
    return null;
  }
  const dataLayer = (window as ConanWindow).dataLayer;
  return Array.isArray(dataLayer) ? dataLayer : null;
}

export function trackConanEvent(event: ConanAnalyticsEvent): void {
  const dataLayer = getDataLayer();
  if (!dataLayer) {
    return;
  }

  dataLayer.push({
    event: "fireEvent",
    event_name: event.event_name ?? "element_click",
    type: event.type,
    purpose: event.purpose,
    description: event.description,
    ...(event.search_term ? { search_term: event.search_term } : {}),
    ...(event.product ? { product: event.product } : {}),
    ...(event.platforms ? { platforms: event.platforms } : {}),
    ...(event.section ? { section: event.section } : {}),
  });
}
