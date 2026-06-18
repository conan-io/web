import type { ReactNode } from "react";

import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import styles from "@/styles/auditPages.module.css";

type AuditPageFrameProps = {
  title: string;
  screenLabel: string;
  /** Extra module classes after `auditPage`, e.g. `auditRegisterPage`. */
  pageClassName?: string;
  /** Inner wrapper class, e.g. `audit-wrap` or `av-wrap`. */
  wrapClassName: string;
  children: ReactNode;
};

/** Conan Audit page shell: head, nav, decorative side rails, footer. */
export default function AuditPageFrame({
  title,
  screenLabel,
  pageClassName,
  wrapClassName,
  children,
}: AuditPageFrameProps) {
  const mainClass = [styles.auditPage, pageClassName].filter(Boolean).join(" ");

  return (
    <>
      <PageHead title={title} />

      <main id="page" className={mainClass} data-screen-label={screenLabel}>
        <MainNav />

        <section className={wrapClassName}>
          <div className="rail left" aria-hidden="true">
            <div className="grid" />
            <span className="dot a" />
            <span className="dot b" />
            <span className="cube" />
          </div>
          <div className="rail right" aria-hidden="true">
            <div className="grid" />
            <span className="dot a" />
            <span className="dot b" />
            <span className="cube" />
          </div>
          {children}
        </section>

        <MainFooter />
      </main>
    </>
  );
}
