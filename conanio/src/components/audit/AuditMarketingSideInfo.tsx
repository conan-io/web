/** Left-column marketing copy (catalog-proxy register/recover parity). */
export default function AuditMarketingSideInfo() {
  return (
    <section className="ac-info">
      <h1>Scanning C++ CVEs with Conan Audit</h1>

      <h2>Why Conan Audit?</h2>
      <p>
        Secure your C and C++ applications by scanning dependencies for vulnerabilities directly from
        the command line.
      </p>

      <ul>
        <li>
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.5" y2="16.5" />
            </svg>
          </span>
          <span>Detect known CVEs in your dependency graph</span>
        </li>
        <li>
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
            </svg>
          </span>
          <span>Integrate security scanning into CI/CD pipelines</span>
        </li>
        <li>
          <span className="ico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18M9 9v12" />
            </svg>
          </span>
          <span>Get actionable insights with no extra tools required</span>
        </li>
      </ul>

      <p>Register now to access Conan Audit and start protecting your builds in minutes.</p>
      <p>
        After registering, you will receive a one-time token granting access to the service and a
        confirmation email to validate it.
      </p>
      <p>
        Need a step-by-step guide?{" "}
        <a className="inline" href="https://blog.conan.io/introducing-conan-audit-command/" target="_blank" rel="noopener noreferrer">
          See this blog post
        </a>
        . For quick command references and key features, check out our{" "}
        <a className="inline" href="https://jfrog.com/cheat-sheet/conan-audit-made-easy/" target="_blank" rel="noopener noreferrer">
          cheatsheet
        </a>
        .
      </p>
    </section>
  );
}
