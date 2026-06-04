import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";

import AuditFormAlert from "@/components/audit/AuditFormAlert";
import { auditFieldClass } from "@/components/audit/auditFormUtils";
import AuditMarketingSideInfo from "@/components/audit/AuditMarketingSideInfo";
import AuditPageFrame from "@/components/audit/AuditPageFrame";
import { validateEmailField } from "@/components/audit/auditRegisterValidation";
import styles from "@/styles/auditPages.module.css";

type AlertState = {
  show: boolean;
  variant: "danger" | "success";
  message: string;
};

function AuditRecoverForm() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ show: false, variant: "danger", message: "" });

  const emailInvalid = emailTouched && (email === "" || validateEmailField(email));

  const dismissAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, show: false }));
  }, []);

  const handleRecoverSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setEmailTouched(true);
      if (email === "" || validateEmailField(email)) {
        return;
      }

      setSubmitting(true);
      setAlert((prev) => ({ ...prev, show: false }));

      try {
        const response = await fetch("/api/audit/user/recover", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        await response.json();
        setEmail("");

        if (response.ok || response.status === 400 || response.status === 404) {
          setAlert({
            show: true,
            variant: "success",
            message:
              "If there's an account associated with the email you provided, you'll receive an email with instructions to reset your token.",
          });
          return;
        }

        throw new Error(`Request failed with status ${response.status}`);
      } catch {
        setAlert({
          show: true,
          variant: "danger",
          message:
            "An error occurred during registration. Please ensure your email is correct and not already used. If you have already registered, check your inbox for the activation link. If the problem persists, contact us at conan@jfrog.com.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [email],
  );

  return (
    <div className="ac-form-col">
      <AuditFormAlert
        show={alert.show}
        variant={alert.variant}
        message={alert.message}
        onDismiss={dismissAlert}
      />

      <section className="ac-form ac-form-recover">
        <header className="form-head">
          <span className="pill">Recover access</span>
          <h2>Request a new activation link</h2>
          <p>We will email instructions if an account exists for this address.</p>
        </header>

        <form id="audit-recover-form" aria-label="Recover Conan Audit access" onSubmit={handleRecoverSubmit} noValidate>
          <div className="field">
            <label htmlFor="audit-recover-email">
              Email <span className="hint">required</span>
            </label>
            <input
              id="audit-recover-email"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              aria-invalid={emailInvalid || undefined}
              aria-describedby={emailInvalid ? "audit-recover-email-error" : undefined}
              className={auditFieldClass(emailInvalid, Boolean(email))}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            {emailInvalid ? (
              <p id="audit-recover-email-error" className="field-error" role="alert">
                Please enter a valid email address.
              </p>
            ) : null}
          </div>

          <button type="submit" className="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>

          <p className="recover">
            <Link href="/audit/register">Go back to registration</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default function AuditRecoverPage() {
  return (
    <AuditPageFrame
      title="Conan — Recover Conan Audit access"
      screenLabel="Conan Audit Recover"
      pageClassName={`${styles.auditRegisterPage} ${styles.auditRecoverPage}`}
      wrapClassName="audit-wrap"
    >
      <article className="audit-card audit-card-recover">
        <AuditMarketingSideInfo />
        <AuditRecoverForm />
      </article>
    </AuditPageFrame>
  );
}
