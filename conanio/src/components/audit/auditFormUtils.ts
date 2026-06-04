/** Shared audit form input class names (register / recover). */
export function auditFieldClass(invalid: boolean, hasValue?: boolean) {
  return [hasValue ? "has-value" : "", invalid ? "is-invalid" : ""].filter(Boolean).join(" ") || undefined;
}
