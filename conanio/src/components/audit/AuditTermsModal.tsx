import { useCallback, useEffect, type MouseEvent } from "react";

type AuditTermsModalProps = {
  open: boolean;
  onClose: () => void;
};

/** Conan Audit T&C modal — legal copy from conan-catalog-proxy `terms-conditions.tsx`. */
export default function AuditTermsModal({ open, onClose }: AuditTermsModalProps) {
  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("tc-locked");
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("tc-locked");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="tc-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tc-title"
      onClick={handleBackdropClick}
    >
      <article className="tc-modal" role="document" onClick={(e) => e.stopPropagation()}>
        <header className="tc-head">
          <div className="meta">
            <h1 id="tc-title">Conan Audit Terms and Conditions</h1>
          </div>
          <button type="button" className="tc-close" onClick={onClose} aria-label="Close terms and conditions">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </header>

        <div className="tc-body" id="tc-body">

          <div className="tc-intro">
            <p>
              This JFrog Agreement - Conan Audit (this &quot;<strong>Agreement</strong>&quot;), made by and between the
              applicable JFrog Contracting Entity specified in Section 13 (&quot;<strong>JFrog</strong>&quot;) and you (
              &quot;<strong>User</strong>&quot;), governs the access and use of the feature enabling accessing information
              about security vulnerabilities in Conan C/C++ packages via the Conan packages and dependencies (the &quot;
              <strong>Conan Audit</strong>&quot;).
            </p>
            <p>
              THIS AGREEMENT TAKES EFFECT WHEN USER CLICKS THE &quot;I ACCEPT&quot; OR SIMILAR BUTTON OR BY ACCESSING OR
              USING CONAN AUDIT (&quot;EFFECTIVE DATE&quot;). BY DOING SO, USER: (A) ACKNOWLEDGES THAT IT HAS READ AND
              UNDERSTANDS THIS AGREEMENT; (B) REPRESENTS AND WARRANTS THAT IT HAS THE RIGHT, POWER, AND AUTHORITY TO ENTER
              INTO THIS AGREEMENT AND, IF ENTERING INTO THIS AGREEMENT FOR AN ORGANIZATION, THAT IT HAS THE LEGAL AUTHORITY
              TO BIND THAT ORGANIZATION; AND (C) ACCEPTS THIS AGREEMENT AND AGREES THAT IT IS LEGALLY BOUND BY ITS TERMS. IF
              USER DOES NOT AGREE TO THESE TERMS OR IF USER IS A COMPETITOR OF JFROG (OR A PERSON ACTING ON BEHALF OF A
              COMPETITOR), PLEASE SELECT THE &quot;I DECLINE&quot; OR SIMILAR BUTTON AND DO NOT ACCESS OR USE THE CONAN
              AUDIT.
            </p>
          </div>

          <section className="tc-section">
            <span className="num">1.</span>
            <div>
              <h2>Licence</h2>
              <p>
                Subject to the terms of the Agreement, JFrog hereby grants the User a non-exclusive, non-transferable,
                non-sublicensable, revocable, limited right and license during the Term to access and use the Conan Audit,
                for the User internal business purposes, in accordance with JFrog&apos;s written instructions, acceptable Use
                Policy (made accessible at{" "}
                <a className="lnk" href="https://jfrog.com/acceptable-use-policy/">
                  https://jfrog.com/acceptable-use-policy/
                </a>
                ), applicable laws, and any other instructions, restrictions, and conditions which JFrog may provide or impose
                from time to time, in its sole discretion. Nothing herein requires JFrog to provide any support, maintenance,
                service levels, service credits, or updates for the Conan Audit. All other rights in and to Conan Audit are
                expressly reserved by JFrog.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">2.</span>
            <div>
              <h2>RESTRICTIONS ON USE.</h2>
              <p>
                User will not, nor shall it permit, facilitate, or otherwise allow any other person or entity to: (i) access or
                use the Conan Audit: (A) for fraudulent, misleading, or unlawful activities or purposes; (B), for benchmarking,
                or competitive activities or purposes; (C) to develop or train a machine learning or artificial intelligence
                functionality, logic, features, or operations; or (D) in a manner that does not comply with this Agreement, the
                Acceptable Use Policy (accessible online at{" "}
                <a className="lnk" href="https://jfrog.com/acceptable-use-policy/">
                  https://jfrog.com/acceptable-use-policy/
                </a>
                ), and/or JFrog&apos;s written instructions; (ii) use any proxying, caching or other mechanism to provide any
                third parties with access to and/or use of the Conan Audit; (iii) make available provide use of, pledge, or
                market the Conan Audit, to any entity or person other than User&apos;s authorized employees, contractors,
                consultants, service providers or development partners(&apos;Authorized Users&apos;); (iv) delete, obscure, or
                alter JFrog&apos;s brand features, warranties, or disclaimers, or any intellectual property or proprietary
                rights notices from Conan Audit or JFrog&apos;s written instructions; (v) upload or transmit any personal data
                (except for full User&apos;s name email address and geographic region ), unlawful data, viruses or other
                malicious content or code into or through the Conan Audit; (vi) translate, reverse-translate, decipher, decode,
                disassemble, or otherwise reverse-engineer the Conan Audit; (vii) breach, bypass, or otherwise interfere with
                security-related or limiting features of the Conan Audit; (vii) copy, modify, or create derivative works of the
                Conan Audit; (ix) develop, implement, or install any third third-party extension, plug-in, or other means of
                access or use of the Conan Audit, without prior written approval from JFrog; (x) copy, distribute, publish,
                reproduce or make commercial use of the Conan Audit, including without limitation any databases or reports or
                generated by the Conan Audit; (xi) unauthorized access the underlying databases of the Conan Audit; or (xii)
                unlawful share or use of the token and password provided in the registration process.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">3.</span>
            <div>
              <h2>LAWFUL USE.</h2>
              <p>
                User hereby declares and agrees that User will only use Conan Audit in a manner that complies with all
                applicable laws in the jurisdiction in which User uses the Conan Audit, including, but not limited to,
                applicable restrictions concerning the protection of privacy and intellectual property. Conan Audit should be
                installed in accordance with JFrog&apos;s written instructions.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">4.</span>
            <div>
              <h2>THE OUTPUT.</h2>
              <p>
                &apos;Output&apos; means all information or data, including, but not limited to insights, recommendations,
                databases, reports, results, lists, graphs, in any format, that is made available to the User or that is
                delivered to the User via the Conan Audit. The Output is provided solely for User&apos;s internal use. User can
                not use the Output and/or any JFrog trademark and/or tradename contained therein in any manner that might imply
                verification or certification by JFrog of the content of the Output. JFROG MAKES NO WARRANTY OF ANY KIND THAT THE
                CONAN AUDIT, THE OUTPUT, OR RESULTS OF THE USE THEREOF (INCLUDING ANY REPORTS, RECOMMENDATIONS, LISTS, GRAPHS,
                INSIGHTS AND/OR STATISTICS), WILL MEET THE USER&apos;S OR ANY OTHER ENTITY&apos;S OR PERSON&apos;S REQUIREMENTS,
                OPERATE WITHOUT INTERRUPTION, ACHIEVE ANY INTENDED RESULT, BE COMPATIBLE OR WORK WITH ANY TECHNOLOGY OR OTHER
                SERVICES, OR BE SECURE, ACCURATE, COMPLETE, FREE OF HARMFUL CODE, OR ERROR-FREE. ALL THIRD-PARTY TECHNOLOGY IS
                PROVIDED &quot;AS IS&quot; AND ANY REPRESENTATION OR WARRANTY OF OR CONCERNING ANY THIRD-PARTY TECHNOLOGY IS
                STRICTLY BETWEEN USER AND THE THIRD-PARTY OWNER OR DISTRIBUTOR OF THE THIRD-PARTY TECHNOLOGY. THE USER IS SOLELY
                RESPONSIBLE FOR ANY USER ACTS OR OMISSIONS BASED ON THE USER&apos;S USE OF THE CONAN CALATLOG OR ANY OUTPUT. THE
                CONAN AUDIT AND ANY OUTPUT WILL NOT BE CONSIDERED LEGAL ADVICE AND ANY OUTPUT IS PROVIDED FOR CONVENIENCE
                PURPOSES ONLY. OUTPUT MAY BE BASED ON THIRD-PARTY RESOURCES AND DATABASES AND THEREFORE JFROG DOES NOT GUARANTEE
                THAT OUTPUTS ARE INCLUSIVE OF ALL COMPONENTS, LIBRARIES, DEPENDENCIES, LICENSES AND VULNERABILITIES OR THAT THE
                ANNOTATION OF THE FOREGOING IS COMPLETE.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">5.</span>
            <div>
              <h2>TERM &amp; TERMINATION.</h2>
              <p>
                This Agreement commences on the Agreement Effective Date and will remain in effect until User stops the use of
                Conan Audit or terminated by JFrog in accordance with this section, whichever is the earlier (the &apos;
                <strong>Term</strong>&apos;). JFrog may terminate or suspend this Agreement, or the availability of the Conan
                Audit, at any time and for any reason without providing the User with notice, without liability or other
                obligation to the User. Upon any termination or expiration of this Agreement, the User will promptly cease
                access and use of the Conan Audit.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">6.</span>
            <div>
              <h2>INTELLECTUAL PROPERTY RIGHTS; FEEDBACK; DATA.</h2>
              <p>
                The parties do not transfer, and are under no obligation to transfer, any title or ownership interest in or to
                their respective intellectual property rights in connection with this Agreement. JFrog reserves all rights not
                expressly granted to User hereunder. User hereby grants JFrog a: (a) worldwide, non-exclusive, transferable,
                sub-licensable, royalty-free, fully paid-up, right and license to store, display, and use the data provided to
                Conan Audit  solely as necessary to provide Conan Audit  to the User; and (b) worldwide, perpetual, irrevocable,
                royalty-free license to use, distribute, disclose, and make and incorporate into JFrog&apos;s or its Affiliates&apos;
                products, services, or technology, any feedback provided by the User relating to the operation of the Conan
                Audit. Nothing herein grants any implied licenses or restricts, limits, or otherwise affects the ability of JFrog
                or its Affiliates to collect, use, store, disclose, or otherwise process any: data about access and use of the
                Conan Audit by User. User hereby irrevocably consents to JFrog monitoring and recording User&apos;s access and use
                (non-identified) of the Conan Audit. To the extent JFrog processes any personal data on User&apos;s behalf under
                this Agreement, the provisions of the JFrog Data Processing Addendum (available online at{" "}
                <a className="lnk" href="https://jfrog.com/jfrog-cloud-data-processing-addendum/">
                  https://jfrog.com/jfrog-cloud-data-processing-addendum/
                </a>
                ) (&quot;JFrog DPA&quot;) will apply and are hereby incorporated by reference.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">7.</span>
            <div>
              <h2>CONFIDENTIALITY.</h2>
              <p>
                User shall: (a) keep JFrog&apos;s Confidential information confidential; (b) not use JFrog&apos;s Confidential
                Information, except solely to exercise its rights and fulfill its obligations under this Agreement; and (c) not
                disclose JFrog&apos;s Confidential Information, except to its affiliates, and to its and its affiliates&apos;,
                employees, officers, directors, agents, contractors, consultants, service providers, subcontractors or professional
                advisors (collectively, &quot;<strong>Representatives</strong>&quot;) who: (i) &quot;need to know&quot; JFrog&apos;s
                Confidential Information for the purposes described in the foregoing (b); and (ii) are bound by confidentiality
                obligations no less stringent than those herein. &quot;<strong>JFrog&apos;s Confidential Information</strong>&quot;
                includes confidential information disclosed by its Representatives in connection with this Agreement.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">8.</span>
            <div>
              <h2>REPRESENTATIONS AND WARRANTIES; DISCLAIMERS.</h2>
              <ol type="a">
                <li>
                  <strong>By User</strong>. User represents, and warrants, that: (i) User owns or otherwise has and will have the
                  necessary rights, licenses, and consents in and relating to the data provided to Conan Audit, it does not and
                  will not infringe, misappropriate, or otherwise violate any intellectual property rights, or any privacy or other
                  rights, of any third party or violate any applicable law; (ii) it has not given, offered, received or been
                  offered any illegal or improper bribe, kickback, payment, gift, donation, or thing of value (excluding reasonable
                  gifts and entertainment provided customarily and in good faith in the ordinary course of legitimate business
                  activities) from JFrog or otherwise in connection with this Agreement; (iii) User , its Affiliates, and its users
                  are not subject to sanctions or otherwise designated on any list of prohibited or restricted parties; and (iv) it
                  will not, export, re-export, or release the Conan Audit to, or make the Conan Audit accessible from or to, any
                  country, jurisdiction or person/entity to which export, re-export, or release is prohibited or restricted by
                  applicable laws and regulations.
                </li>
                <li>
                  <strong>Disclaimers</strong>. EXCEPT AS SET FORTH HEREIN AND TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE CONAN
                  AUDIT IS LICENSED TO USER ON AN &quot;AS IS&quot; BASIS AND JFROG HEREBY EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY
                  KIND, WHETHER EXPRESS OR IMPLIED, WRITTEN OR ORAL, STATUTORY OR OTHERWISE, INCLUDING THE IMPLIED WARRANTIES OF
                  MERCHANTABILITY, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, OR FITNESS FOR A PARTICULAR PURPOSE, AND ALL
                  WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. ALL THIRD-PARTY TECHNOLOGY IS PROVIDED
                  &quot;AS IS&quot; AND ANY REPRESENTATION OR WARRANTY OF OR CONCERNING ANY THIRD-PARTY TECHNOLOGY IS STRICTLY BETWEEN
                  USER AND THE THIRD-PARTY OWNER OR DISTRIBUTOR THEREOF.
                </li>
              </ol>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">9.</span>
            <div>
              <h2>LIABILITY.</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: (A) IN NO EVENT SHALL JFROG OR ITS AFFILIATES BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY LOSS OR DAMAGE OF ANY KIND IN CONNECTION WITH OR ARISING
                OUT OF THIS AGREEMENT, WHETHER AN ACTION IS IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE,
                REGARDLESS OF THE THEORY OF LIABILITY, AND EVEN IF JFROG OR ITS AFFILIATES HAVE BEEN ADVISED OF THE POSSIBILITY OF
                SUCH DAMAGES IN ADVANCE; AND (B) JFROG&apos;S AND ITS AFFILIATES&apos; AGGREGATE LIABILITY IN CONNECTION WITH OR ARISING
                OUT OF THIS AGREEMENT SHALL BE LIMITED TO ONE HUNDRED UNITED STATES DOLLARS (100 USD). The parties agree that the
                limitations and exclusions of liability specified in this Section will survive and apply even if any limited remedy
                specified herein is found to have failed in its essential purpose. User shall be liable for the acts and omissions of
                its affiliates and users in connection with this Agreement as if such acts or omissions were those of User. User may
                link, connect or use third-party components in conjunction with the Conan Audit at its sole risk and responsibility
                and solely in accordance with the written instructions and the applicable third-party license agreement.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">10.</span>
            <div>
              <h2>INDEMNIFICATION.</h2>
              <p>
                User will indemnify, defend, and hold harmless JFrog and its affiliates from and against any claim, demand, suit or
                proceeding made or brought against JFrog by a third party arising out of its access and use of the Conan Audit, and will
                indemnify and hold harmless JFrog from any damages awarded against JFrog as a result of, or for any amounts paid by
                JFrog under a settlement approved by the user in writing, together with all reasonable attorney fees and costs incurred
                in connection with such litigations or settlements. JFrog may join in defense with counsel of its own choice at its own
                expense. User shall not consent to the entry of any judgment or enter into any settlement or compromise requiring JFrog
                to admit liability, pay money, or take or refrain from any action without the prior written consent of JFrog.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">11.</span>
            <div>
              <h2>MISCELLANEOUS.</h2>
              <p>
                If any term of this Agreement is or becomes invalid, illegal or unenforceable in any jurisdiction it will, as to such
                jurisdiction, be ineffective to the extent of such invalidity, illegality or unenforceability, without invalidating the
                remaining provisions hereof, and any such prohibition or unenforceability in any jurisdiction will not invalidate or
                render unenforceable such provision in any other jurisdiction. No waiver hereunder will be effective, unless in a writing
                signed by a duly authorized signatory on behalf of the waiving party. No supplement, modification, or amendment of this
                Agreement shall be binding unless executed in writing by both parties. The User may not assign or otherwise transfer this
                Agreement. The parties are independent contractors. There are no third-party beneficiaries under this Agreement. Titles
                and headings of this Agreement are for convenience only. The singular includes the plural, and vice versa. The terms
                &apos;include&apos; and &apos;including&apos; are not limiting. This Agreement (including JFrog&apos;s written instructions
                and Acceptable Use Policy) constitutes the complete, final and exclusive statement of the terms of the agreement between
                the parties regarding its subject matter, and supersedes all prior and contemporaneous agreements, representations or
                understandings, written or oral, concerning its subject matter.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">12.</span>
            <div>
              <h2>SANCTIONS; COMPLIANCE WITH LAW.</h2>
              <p>
                Conan Audit may be subject to export control laws and regulations of the U.S. and other jurisdictions. User represents
                and warrants that: (i) it is not subject to sanctions or otherwise designated on any list of prohibited or restricted
                parties; (ii) it will not directly or indirectly, export, re-export, or release the Conan Audit  to, or make the Conan
                Audit accessible from or to, any country, jurisdiction or person/entity to which export, re-export, or release is
                prohibited or restricted by applicable laws and regulations; and (iii) its access and use of the Conan Audit is and will
                be at all times in compliance with applicable laws and regulations.
              </p>
            </div>
          </section>

          <section className="tc-section">
            <span className="num">13.</span>
            <div>
              <h2>JFROG CONTRACTING ENTITY; GOVERNING LAW AND JURISDICTION.</h2>
              <p>
                The Convention on Contracts for the International Sale of Goods and conflicts of laws principles do not apply to this
                Agreement. The applicable JFrog Contracting Entity is JFrog Ltd,except if User is domiciled in: (a) USA or a country in
                North or Central America, South America, or the Caribbean (&quot;<strong>Region 1</strong>&quot;), then such entity is JFrog,
                Inc.; or (b) Bahrain, Belgium, Egypt, France, French Polynesia, Indonesia, Kuwait, Luxembourg, Malaysia, New Caledonia,
                Qatar, Saudi Arabia, or the United Arab Emirates (&quot;<strong>Region 2</strong>&quot;), then such entity is JFrog SAS. This
                Agreement will be construed in accordance with and governed by the laws of Israel, and Tel Aviv, Israel is the exclusive
                jurisdiction and venue for any claim, dispute, or controversy arising out of or in connection with this Agreement, except if
                user is domiciled in: (i) Region 1, then such governing laws will be those of California, USA and such exclusive jurisdiction
                and venue will be the U.S. District Court for the Northern District of California or a state court located in or having
                jurisdiction over Santa Clara County, California; (ii) Region 2, then such governing laws will those of France and such
                exclusive jurisdiction and venue will Paris, France; or (iii) a country in Europe, Middle East, Africa or the Asia Pacific,
                excluding Israel, or a country in Region 2, then such governing laws will those of England and such exclusive jurisdiction and
                venue will be the courts in London, UK. Each party and its respective Affiliates hereby submit to the personal jurisdiction
                and venue of such applicable courts, and waive all rights they may have to object to the jurisdiction of any such applicable
                court, or to transfer or change the venue.
              </p>
            </div>
          </section>

        </div>

        <footer className="tc-foot">
          <div className="actions">
            <button type="button" className="btn-close-tc" onClick={onClose}>
              Close Terms and Conditions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
