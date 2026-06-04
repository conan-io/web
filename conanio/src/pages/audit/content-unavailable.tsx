import Link from "next/link";

import AuditPageFrame from "@/components/audit/AuditPageFrame";
import styles from "@/styles/auditPages.module.css";

export default function AuditContentUnavailablePage() {
  return (
    <AuditPageFrame
      title="Conan — Content not available"
      screenLabel="Content Unavailable"
      pageClassName={`${styles.auditRegisterPage} ${styles.auditContentUnavailablePage}`}
      wrapClassName="audit-wrap"
    >
      <article className="audit-card audit-status-card">
        <section className="av-status">
          <h1>Content not available in your region</h1>
          <p>
            This page is not available in your current region. We apologize for the inconvenience.
          </p>
          <p className="av-status-actions">
            <Link href="/">Return to Conan Home</Link>
          </p>
        </section>
      </article>
    </AuditPageFrame>
  );
}
