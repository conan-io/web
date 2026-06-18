import type { GetServerSideProps } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import AuditPageFrame from "@/components/audit/AuditPageFrame";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { clipboardCopyIconSvg } from "@/components/recipeDetail/recipeDetailIcons";
import styles from "@/styles/auditPages.module.css";

type AuditValidatePageProps = {
  status: number;
  accessToken: string;
};

type AuditCodeboxProps = {
  copyText: string;
  copyAriaLabel: string;
  variant: "token" | "cmd";
  label?: string;
  children: ReactNode;
};

function AuditCodebox({ copyText, copyAriaLabel, variant, label, children }: AuditCodeboxProps) {
  return (
    <div className={`codebox ${variant}`}>
      {variant === "token" && label ? <span className="label">{label}</span> : null}
      <pre>{children}</pre>
      <CopyToClipboardButton
        copyText={copyText}
        className="copy"
        copiedClassName="copied"
        copiedResetMs={1500}
        aria-label={copyAriaLabel}
      >
        {clipboardCopyIconSvg}
      </CopyToClipboardButton>
    </div>
  );
}

function AuditValidateWarn({ children }: { children: ReactNode }) {
  return (
    <div className="warn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

type AuditCliCommandStep = {
  label: string;
  cmd: string;
  renderHighlighted: () => ReactNode;
  note?: ReactNode;
};

function getAuditValidateCliSteps(): AuditCliCommandStep[] {
  return [
    {
      label: "Setup the token",
      cmd: "conan audit provider auth conancenter",
      renderHighlighted: () => (
        <>
          <span className="kw">conan</span> <span className="arg">audit provider auth conancenter</span>
        </>
      ),
      note: <>When you run this command, Conan will prompt you for your token.</>,
    },
    {
      label: "Check a specific reference",
      cmd: "conan audit list zlib/1.2.13",
      renderHighlighted: () => (
        <>
          <span className="kw">conan</span> <span className="arg">audit list</span>{" "}
          <span className="str">zlib/1.2.13</span>
        </>
      ),
    },
    {
      label: "Scan the entire dependency graph (path to your conanfile.py/txt)",
      cmd: "conan audit scan .",
      renderHighlighted: () => (
        <>
          <span className="kw">conan</span> <span className="arg">audit scan</span> <span className="str">.</span>
        </>
      ),
    },
  ];
}

function AuditValidateFooterLinks() {
  return (
    <div className="av-foot">
      <div>
        For more information and advanced usage, visit{" "}
        <a href="https://blog.conan.io/introducing-conan-audit-command/" target="_blank" rel="noopener noreferrer">
          our blog post
        </a>{" "}
        or the{" "}
        <a href="https://docs.conan.io/2/devops/audit.html" target="_blank" rel="noopener noreferrer">
          Conan Audit documentation
        </a>
        .
      </div>
    </div>
  );
}

function AuditValidateSuccess({ accessToken }: { accessToken: string }) {
  return (
    <>
      <header className="av-hero">
        <span className="badge">
          <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Registration complete
        </span>
        <h1>
          You&apos;re ready to go. Here&apos;s your <span className="blue">access token</span> to get started.
        </h1>
        <p className="lead">
          Follow the two steps below to save your token and configure the Conan CLI for vulnerability scanning.
        </p>
      </header>

      <div className="av-body">
        <div className="av-intro">These are the next steps</div>

        <section className="step">
          <span className="marker">1</span>
          <div className="body">
            <h2>Copy and save your token</h2>
            <p>Store this token somewhere safe — it grants access to Conan Audit and cannot be retrieved later.</p>

            <AuditCodebox variant="token" label="Access token" copyText={accessToken} copyAriaLabel="Copy token">
              {accessToken}
            </AuditCodebox>

            <AuditValidateWarn>
              For security reasons, this activation link will expire soon. Make sure to copy this token now.
            </AuditValidateWarn>
          </div>
        </section>

        <section className="step">
          <span className="marker">2</span>
          <div className="body">
            <h2>Configure Conan to use your token</h2>
            <p>
              Point your local Conan installation at <em>conancenter</em> with the token. Then audit a single reference
              or scan your full dependency graph.
            </p>

            <div className="group">
              {getAuditValidateCliSteps().map((step) => (
                <div key={step.label} className="item">
                  <div className="sub">{step.label}</div>
                  <AuditCodebox variant="cmd" copyText={step.cmd} copyAriaLabel="Copy command">
                    {step.renderHighlighted()}
                  </AuditCodebox>
                  {step.note ? <p>{step.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <AuditValidateFooterLinks />
      </div>
    </>
  );
}

function AuditValidateUsedLink() {
  return (
    <div className="av-status">
      <h2>This activation link has already been used.</h2>
      <p>
        If you lost your token or need a new activation link, you can{" "}
        <Link href="/audit/recover">request a new one here</Link>.
      </p>
    </div>
  );
}

function AuditValidateError() {
  return (
    <div className="av-status">
      <h2>An error occurred</h2>
      <p>
        Please, try it again later. If the problem persists, contact us at{" "}
        <a href="mailto:conan@jfrog.com">conan@jfrog.com</a>.
      </p>
      <p>
        If you lost your token or need a new activation link, you can{" "}
        <Link href="/audit/recover">request a new one here</Link>.
      </p>
    </div>
  );
}

export default function AuditValidatePage({ status, accessToken }: AuditValidatePageProps) {
  const isSuccess = status === 200 && accessToken.length > 0;
  const isUsed = status === 422;

  const pageTitle = isSuccess
    ? "Conan — Activate your Conan Audit token"
    : isUsed
      ? "Conan — Activation link already used"
      : "Conan — Conan Audit activation";

  const screenLabel = isSuccess
    ? "Conan Audit Token Activated"
    : isUsed
      ? "Conan Audit Link Used"
      : "Conan Audit Activation Error";

  return (
    <AuditPageFrame
      title={pageTitle}
      screenLabel={screenLabel}
      pageClassName={styles.auditValidatePage}
      wrapClassName="av-wrap"
    >
      <article className="av-card">
        {isSuccess ? (
          <AuditValidateSuccess accessToken={accessToken} />
        ) : isUsed ? (
          <AuditValidateUsedLink />
        ) : (
          <AuditValidateError />
        )}
      </article>
    </AuditPageFrame>
  );
}

export const getServerSideProps: GetServerSideProps<AuditValidatePageProps> = async (context) => {
  const raw = context.params?.token;
  const activationCode = typeof raw === "string" ? raw : Array.isArray(raw) ? (raw[0] ?? "") : "";

  const base = process.env.conanioAuthServer?.trim().replace(/\/+$/, "") ?? "";
  if (!base || !activationCode) {
    return {
      props: {
        status: 500,
        accessToken: "",
      },
    };
  }

  try {
    const response = await fetch(
      `${encodeURI(base)}/user/validate/${encodeURIComponent(activationCode)}`,
      { headers: { Accept: "application/json" } },
    );

    let accessToken = "";
    try {
      const data = (await response.json()) as { token?: unknown };
      if (typeof data.token === "string") {
        accessToken = data.token;
      }
    } catch {
      // Non-JSON body: keep accessToken empty and forward status.
    }

    return {
      props: {
        status: response.status,
        accessToken,
      },
    };
  } catch {
    return {
      props: {
        status: 500,
        accessToken: "",
      },
    };
  }
};
