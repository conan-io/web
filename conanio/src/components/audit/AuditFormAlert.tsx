export type AuditFormAlertVariant = "danger" | "success";

type AuditFormAlertProps = {
  show: boolean;
  variant: AuditFormAlertVariant;
  message: string;
  onDismiss: () => void;
};

export default function AuditFormAlert({ show, variant, message, onDismiss }: AuditFormAlertProps) {
  if (!show || !message) {
    return null;
  }

  return (
    <div className={`audit-alert audit-alert-${variant}`} role="alert">
      <p>{message}</p>
      <button type="button" className="audit-alert-close" onClick={onDismiss} aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  );
}
