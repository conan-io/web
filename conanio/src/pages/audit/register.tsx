import Link from "next/link";
import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";

import AuditFormAlert from "@/components/audit/AuditFormAlert";
import { auditFieldClass } from "@/components/audit/auditFormUtils";
import AuditMarketingSideInfo from "@/components/audit/AuditMarketingSideInfo";
import AuditPageFrame from "@/components/audit/AuditPageFrame";
import {
  getAuditCountryOptions,
  marketing_regions,
  no_marketing_regions,
} from "@/components/audit/auditCountries";
import {
  validateCountryField,
  validateEmailField,
  validateNameField,
} from "@/components/audit/auditRegisterValidation";
import AuditTermsModal from "@/components/audit/AuditTermsModal";
import styles from "@/styles/auditPages.module.css";

const allCountryNames = [...no_marketing_regions, ...marketing_regions] as const;

type AlertState = {
  show: boolean;
  variant: "danger" | "success";
  message: string;
};

function AuditRegisterForm() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [legalAgreed, setLegalAgreed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [showMarketingConsent, setShowMarketingConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showOkMessage, setShowOkMessage] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ show: false, variant: "danger", message: "" });

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);

  const firstNameInvalid = firstNameTouched && (firstName === "" || validateNameField(firstName));
  const lastNameInvalid = lastNameTouched && (lastName === "" || validateNameField(lastName));
  const emailInvalid = emailTouched && (email === "" || validateEmailField(email));
  const countryInvalid =
    countryTouched && (region === "" || validateCountryField(region, allCountryNames));

  const disableSubmit = !legalAgreed || submitting;

  const openTerms = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setTermsOpen(true);
  }, []);

  const dismissAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, show: false }));
  }, []);

  const handleCountryChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRegion(value);
    const hideMarketing = no_marketing_regions.includes(value);
    setShowMarketingConsent(!hideMarketing);
    if (hideMarketing) {
      setMarketingConsent(false);
    }
  }, []);

  const touchAllFields = useCallback(() => {
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);
    setCountryTouched(true);
  }, []);

  const formHasValidationErrors = useMemo(() => {
    return (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      region === "" ||
      validateNameField(firstName) ||
      validateNameField(lastName) ||
      validateEmailField(email) ||
      validateCountryField(region, allCountryNames)
    );
  }, [email, firstName, lastName, region]);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRegion("");
    setLegalAgreed(false);
    setMarketingConsent(false);
    setShowMarketingConsent(true);
    setFirstNameTouched(false);
    setLastNameTouched(false);
    setEmailTouched(false);
    setCountryTouched(false);
  }, []);

  const handleRegisterSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!legalAgreed) {
        setAlert({
          show: true,
          variant: "danger",
          message: "You must accept the Terms of Service and Privacy Notice before registering.",
        });
        return;
      }

      touchAllFields();
      if (formHasValidationErrors) {
        return;
      }

      setSubmitting(true);
      setAlert((prev) => ({ ...prev, show: false }));

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        region,
        marketing_consent: marketingConsent || no_marketing_regions.includes(region),
      };

      try {
        const response = await fetch("/api/audit/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as { message?: string };

        if (response.ok) {
          setShowOkMessage(true);
          resetForm();
          return;
        }

        if (response.status === 400 && data.message) {
          setAlert({ show: true, variant: "danger", message: data.message });
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
    [
      email,
      firstName,
      formHasValidationErrors,
      lastName,
      legalAgreed,
      marketingConsent,
      region,
      resetForm,
      touchAllFields,
    ],
  );

  if (showOkMessage) {
    return (
      <div className="ac-form-col">
        <section className="ac-form ac-success">
          <h2>You&apos;re Almost Set Up!</h2>
          <p>
            You should receive an email shortly with the subject{" "}
            <strong>&quot;Activate your Conan Audit token&quot;</strong>.
            <br />
            Please check your inbox, and don&apos;t forget to look in your spam folder.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="ac-form-col">
      <AuditFormAlert
        show={alert.show}
        variant={alert.variant}
        message={alert.message}
        onDismiss={dismissAlert}
      />

      <section className="ac-form">
        <header className="form-head">
          <span className="pill">Get your access token</span>
          <h2>Register for Conan Audit</h2>
          <p>Fields marked with details will appear on your confirmation email.</p>
        </header>

        <form id="audit-register-form" aria-label="Register for Conan Audit" onSubmit={handleRegisterSubmit} noValidate>
          <div className="grid">
            <div className="field">
              <label htmlFor="audit-first">
                First name <span className="hint">required</span>
              </label>
              <input
                id="audit-first"
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={firstName}
                aria-invalid={firstNameInvalid || undefined}
                aria-describedby={firstNameInvalid ? "audit-first-error" : undefined}
                className={auditFieldClass(firstNameInvalid, Boolean(firstName))}
                onChange={(event) => setFirstName(event.target.value)}
                onBlur={() => setFirstNameTouched(true)}
              />
              {firstNameInvalid ? (
                <p id="audit-first-error" className="field-error" role="alert">
                  Only letters, numbers, and spaces are allowed. No special characters.
                </p>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="audit-last">
                Last name <span className="hint">required</span>
              </label>
              <input
                id="audit-last"
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                value={lastName}
                aria-invalid={lastNameInvalid || undefined}
                aria-describedby={lastNameInvalid ? "audit-last-error" : undefined}
                className={auditFieldClass(lastNameInvalid, Boolean(lastName))}
                onChange={(event) => setLastName(event.target.value)}
                onBlur={() => setLastNameTouched(true)}
              />
              {lastNameInvalid ? (
                <p id="audit-last-error" className="field-error" role="alert">
                  Only letters, numbers, and spaces are allowed. No special characters.
                </p>
              ) : null}
            </div>
          </div>

          <div className="field">
            <label htmlFor="audit-email">
              Email <span className="hint">required</span>
            </label>
            <input
              id="audit-email"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              aria-invalid={emailInvalid || undefined}
              aria-describedby={emailInvalid ? "audit-email-error" : undefined}
              className={auditFieldClass(emailInvalid, Boolean(email))}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            {emailInvalid ? (
              <p id="audit-email-error" className="field-error" role="alert">
                Please enter a valid email address.
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="audit-country">Country</label>
            <select
              id="audit-country"
              name="country"
              value={region}
              required
              aria-invalid={countryInvalid || undefined}
              aria-describedby={countryInvalid ? "audit-country-error" : undefined}
              className={auditFieldClass(countryInvalid, Boolean(region))}
              onChange={handleCountryChange}
              onBlur={() => setCountryTouched(true)}
            >
              {getAuditCountryOptions().map((item) => (
                <option key={item.value || "placeholder"} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            {countryInvalid ? (
              <p id="audit-country-error" className="field-error" role="alert">
                Please select a valid country.
              </p>
            ) : null}
          </div>

          {showMarketingConsent ? (
            <label className="check">
              <input
                type="checkbox"
                name="marketing"
                checked={marketingConsent}
                onChange={(event) => setMarketingConsent(event.target.checked)}
              />
              <span>
                Yes, I would like to receive marketing communications regarding JFrog products, services,
                and events. I can unsubscribe at any time.
              </span>
            </label>
          ) : null}

          <label className="check legal-check">
            <input
              id="legal-agree"
              type="checkbox"
              name="legal"
              checked={legalAgreed}
              onChange={(event) => setLegalAgreed(event.target.checked)}
            />
            <span>
              By completing registration, you agree to the{" "}
              <button type="button" className="terms-link" onClick={openTerms}>
                Conan Audit Terms and Conditions
              </button>{" "}
              For information about the storing and processing of your personal data by JFrog, see our{" "}
              <a href="https://jfrog.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                Privacy Notice
              </a>
              .
            </span>
          </label>

          <button type="submit" className="submit" disabled={disableSubmit}>
            {submitting ? "Submitting…" : "Submit"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>

          <p className="recover">
            If you lost your token or need a new activation link, you can{" "}
            <Link href="/audit/recover">request one here</Link>.
          </p>
        </form>
      </section>

      <AuditTermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}

export default function AuditRegisterPage() {
  return (
    <AuditPageFrame
      title="Conan — Register for Conan Audit"
      screenLabel="Conan Audit Register"
      pageClassName={styles.auditRegisterPage}
      wrapClassName="audit-wrap"
    >
      <article className="audit-card">
        <AuditMarketingSideInfo />
        <AuditRegisterForm />
      </article>
    </AuditPageFrame>
  );
}
