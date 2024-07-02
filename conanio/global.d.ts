export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MktoForms2?: any; // Skip TS error
  }
}
