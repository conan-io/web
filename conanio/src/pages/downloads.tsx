import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import DownloadsCopyIcon from "@/components/DownloadsCopyIcon";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import Image from "next/image";
import {
  ARTIFACTORY_RELEASE_VERSION,
  buildDownloadsArtifacts,
  buildDownloadsRows,
  DL_ICON,
  type DlRowConfig,
  type DownloadsEventPayload,
} from "@/data/downloadsPage";
import { trackConanEvent } from "@/service/analytics";
import styles from "@/styles/contentPages.module.css";

/** Populated from `next.config` `env.conanVersion` (`NEXT_PUBLIC_CONAN_VERSION`). */
function getConanReleaseVersion(): string {
  return process.env.conanVersion?.trim() ?? "";
}

function pushDownloadsEvent(event: DownloadsEventPayload) {
  trackConanEvent({
    type: event.type,
    product: event.product,
    platforms: event.platforms,
    purpose: event.purpose,
    description: event.description,
  });
}

function DlRowIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="dl-ico">
      <Image src={src} alt={alt} width={24} height={24} />
    </span>
  );
}

function DlRowActionIcon({ kind }: { kind: "download" | "external" }) {
  if (kind === "external") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v12M6 12l6 6 6-6M5 21h14" />
    </svg>
  );
}

export default function DownloadsPage() {
  const conanReleaseVersion = getConanReleaseVersion();
  const a = buildDownloadsArtifacts(conanReleaseVersion);

  const renderDlRow = (row: DlRowConfig, idx: number) => {
    if (row.kind === "cmd") {
      return (
        <li className="dl-row dl-row--cmd" key={`${row.kind}-${row.commandText}-${idx}`}>
          <DlRowIcon src={DL_ICON[row.icon]} alt={row.alt} />
          <code className="dl-cmd">
            <span className="dl-prompt">$</span> {row.commandText}
          </code>
          <CopyToClipboardButton
            copyText={row.copyText}
            onCopy={() => pushDownloadsEvent(row.copyEvent)}
            className="dl-btn dl-btn--copy"
            copiedClassName="copied"
            copiedResetMs={1100}
            aria-label={row.copyAriaLabel ?? "Copy command"}
          >
            <DownloadsCopyIcon />
          </CopyToClipboardButton>
        </li>
      );
    }

    if (row.kind === "download+copy") {
      return (
        <li className="dl-row dl-row--cmd" key={`${row.kind}-${row.label}-${idx}`}>
          <DlRowIcon src={DL_ICON[row.icon]} alt={row.alt} />
          <span className="dl-label">{row.label}</span>
          <span className="dl-row-actions">
            <a
              className="dl-btn dl-btn--dl"
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={row.ariaLabel ?? "Download"}
              download={row.download ?? true}
              onClick={() => pushDownloadsEvent(row.downloadEvent)}
            >
              <DlRowActionIcon kind="download" />
            </a>
            <CopyToClipboardButton
              copyText={row.copyText}
              onCopy={() => pushDownloadsEvent(row.copyEvent)}
              className="dl-btn dl-btn--copy"
              copiedClassName="copied"
              copiedResetMs={1100}
              aria-label={row.copyAriaLabel ?? "Copy command"}
            >
              <DownloadsCopyIcon />
            </CopyToClipboardButton>
          </span>
        </li>
      );
    }

    return (
      <li className="dl-row" key={`${row.kind}-${row.label}-${idx}`}>
        <DlRowIcon src={DL_ICON[row.icon]} alt={row.alt} />
        <span className="dl-label">{row.label}</span>
        <a
          className="dl-btn dl-btn--dl"
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={row.ariaLabel ?? "Download"}
          download={row.download ?? true}
          onClick={() => pushDownloadsEvent(row.clickEvent)}
        >
          <DlRowActionIcon kind={row.actionKind ?? "download"} />
        </a>
      </li>
    );
  };

  const {
    conanRecommendedRows,
    conanOtherInstallerRows,
    conanSelfContainedRows,
    artifactoryRecommendedRows,
    artifactoryOlderRows,
  } = buildDownloadsRows(a);

  return (
    <>
      <PageHead title="Conan — Downloads" />

      <main id="page" className={styles.downloadPage} data-screen-label="Conan Downloads">
        <MainNav />
        <section className="dl-hero">
          <div className="dl-hero-inner">
            <span className="pill">Downloads</span>
            <h1>Get Conan and Artifactory.</h1>
            <p>
              Install the latest <b>Conan {conanReleaseVersion}</b> via your package manager, a self-contained bundle, or pull{" "}
              <b>JFrog Artifactory CE</b> to host your own private remote.
            </p>
          </div>
        </section>
        <section className="dl-grid">
          <article className="dl-col">
            <header className="dl-col-head">
              <div className="dl-col-brand">
                <Image src="/conan-cube.png" alt="Conan" width={40} height={40} />
                <div>
                  <div className="dl-col-title">Conan</div>
                  <div className="dl-col-sub">C/C++ Package Manager</div>
                </div>
              </div>
              <div className="dl-col-version">v{conanReleaseVersion}</div>
            </header>
            <p className="dl-col-desc">
              Install the latest version ({conanReleaseVersion}) of the free and open source Conan C and C++ package manager, to start using Conan and
              downloading packages from the ConanCenter.
            </p>
            <div className="dl-section-label">
              Recommended install <span className="dl-hint">(needs Python in your system)</span>
            </div>
            <ul className="dl-list">
              {conanRecommendedRows.map(renderDlRow)}
            </ul>
            <div className="dl-section-label">Other installers</div>
            <ul className="dl-list">
              {conanOtherInstallerRows.map(renderDlRow)}
            </ul>
            <div className="dl-section-label">
              Self-contained <span className="dl-hint">(no Python needed)</span>{" "}
              <span className="dl-info" title="Bundled Python runtime included">
                i
              </span>
            </div>
            <ul className="dl-list">
              {conanSelfContainedRows.map(renderDlRow)}
            </ul>
            <p className="dl-foot-note">
              Read more about Conan installation{" "}
              <a href="https://docs.conan.io/2/installation.html" target="_blank" rel="noopener">
                https://docs.conan.io/2/installation.html
              </a>
            </p>
            <a
              className="btn btn-primary dl-cta"
              href="https://docs.conan.io/2.0/tutorial.html"
              onClick={() =>
                pushDownloadsEvent({
                  type: "navigation",
                  product: "conan",
                  platforms: "all",
                  purpose: "learn conan",
                  description: "getting started with conan",
                })
              }
            >
              Getting Started With Conan →
            </a>
          </article>

          <article className="dl-col dl-col--af">
            <header className="dl-col-head">
              <div className="dl-col-brand">
                <span className="dl-af-logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3FAB4A" strokeWidth={2} strokeLinejoin="round">
                    <path d="M4 7l8-4 8 4-8 4-8-4Z" />
                    <path d="M4 12l8 4 8-4" />
                    <path d="M4 17l8 4 8-4" />
                  </svg>
                </span>
                <div>
                  <div className="dl-col-title">Artifactory</div>
                  <div className="dl-col-sub">Community Edition for C/C++</div>
                </div>
              </div>
              <div className="dl-col-version dl-col-version--af">v{ARTIFACTORY_RELEASE_VERSION}</div>
            </header>
            <p className="dl-col-desc">
              Download the latest version of JFrog Artifactory Community Edition to host your own private packages on your own server — for free.
            </p>
            <div className="dl-section-label">
              Recommended install <span className="dl-hint">(latest)</span>
            </div>
            <ul className="dl-list">
              {artifactoryRecommendedRows.map(renderDlRow)}
            </ul>
            <div className="dl-section-label">
              Older installers <span className="dl-hint">({ARTIFACTORY_RELEASE_VERSION})</span>
            </div>
            <ul className="dl-list">
              {artifactoryOlderRows.map(renderDlRow)}
            </ul>
            <a
              className="btn btn-af dl-cta"
              href="https://docs.conan.io/2/tutorial/conan_repositories/setting_up_conan_remotes/artifactory/artifactory_ce_cpp.html"
              onClick={() =>
                pushDownloadsEvent({
                  type: "navigation",
                  product: "artifactory",
                  platforms: "all",
                  purpose: "learn artifactory",
                  description: "getting started with artifactory ce",
                })
              }
            >
              Getting Started with Artifactory CE →
            </a>
          </article>
        </section>
        <section className="dl-help">
          <h3>Questions about Installation?</h3>
          <p className="dl-help-sub">Check the Docs, contact the community on Slack, or ask for support in GitHub.</p>
          <div className="dl-help-grid">
            <a
              className="dl-help-card"
              href="https://docs.conan.io/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushDownloadsEvent({
                  type: "navigation",
                  product: "conan",
                  platforms: "all",
                  purpose: "support",
                  description: "downloads docs help",
                })
              }
            >
              <span className="dl-help-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z" />
                  <path d="M4 17a3 3 0 0 1 3-3h12" />
                  <path d="M8 8h7M8 11h5" />
                </svg>
              </span>
              <span>Docs</span>
            </a>
            <a
              className="dl-help-card"
              href="https://cppalliance.org/slack/#cpp-slack"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushDownloadsEvent({
                  type: "navigation",
                  product: "conan",
                  platforms: "all",
                  purpose: "support",
                  description: "downloads slack help",
                })
              }
            >
              <span className="dl-help-ico">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523z" />
                </svg>
              </span>
              <span>Slack</span>
            </a>
            <a
              className="dl-help-card"
              href="https://github.com/conan-io/conan/issues"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                pushDownloadsEvent({
                  type: "navigation",
                  product: "conan",
                  platforms: "all",
                  purpose: "support",
                  description: "downloads github help",
                })
              }
            >
              <span className="dl-help-ico">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" />
                </svg>
              </span>
              <span>GitHub</span>
            </a>
          </div>
        </section>
        <MainFooter />
      </main>
    </>
  );
}
