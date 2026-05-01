import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import PageHead from "../components/PageHead";
import styles from "../styles/contentPages.module.css";

export default function TermsPage() {
  return (
    <>
      <PageHead title="Conan — Terms and Conditions" />

      <main id="page" className={styles.termsPage} data-screen-label="Conan Terms and Conditions">
        <MainNav />
        <section className="doc-hero">
          <div className="doc-hero-inner">
            <span className="pill">Legal</span>
            <h1>Terms and Conditions</h1>
            <div className="doc-meta">
              <span>Last updated: April 2026</span>
              <span className="dot" />
              <span>Version 3.0</span>
              <span className="dot" />
              <span>Effective immediately</span>
            </div>
          </div>
        </section>
        <div className="doc-wrap">
          <aside className="doc-toc" aria-label="Table of contents">
            <strong>On this page</strong>
            <ol>
              <li><a href="#terms">Terms and Conditions</a></li>
              <li><a href="#liability">Exclusion of Liability</a></li>
              <li><a href="#indemnification">Indemnification</a></li>
              <li><a href="#ip">Intellectual Property</a></li>
              <li><a href="#copyright">Copyright</a></li>
            </ol>
          </aside>
          <article className="doc">
            <h2 id="terms">Terms and Conditions</h2>
            <p><em>Placeholder copy — replace with your real legal text.</em> This Web site is operated by the Conan team. By accessing or using the Web site, you agree to be bound by the terms, conditions, policies and notices set out below. We may update these terms from time to time, and continued use of the Web site after any such change constitutes your acceptance of the revised terms.</p>
            <p>The terms <b>"Conan"</b>, <b>"us"</b> or <b>"we"</b> refer to the owner of the Web site. The term <b>"you"</b> refers to the user or viewer of the Web site. The Web site is provided on an "as is" basis, without warranties of any kind, either express or implied. We reserve the right to change or discontinue any aspect or feature of the Web site at any time and without prior notice.</p>
            <h2 id="liability">Exclusion of Liability</h2>
            <p><em>Placeholder copy — replace with your real legal text.</em> The information contained on the Web site is provided for general information purposes only. While we try to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the Web site or the information, products or services contained on the Web site for any purpose.</p>
            <p>Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage arising out of, or in connection with, the use of the Web site.</p>
            <h2 id="indemnification">Indemnification</h2>
            <p><em>Placeholder copy — replace with your real legal text.</em> Your use of any information or materials on this Web site is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this Web site meet your specific requirements.</p>
            <p>This Web site contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice. Unauthorised use of this Web site may give rise to a claim for damages and/or be a criminal offence.</p>
            <p>From time to time, this Web site may also include links to other Web sites. These links are provided for your convenience to provide further information. They do not signify that we endorse the linked Web site(s) and we have no responsibility for the content of the linked site(s).</p>
            <h2 id="ip">Intellectual Property</h2>
            <p><em>Placeholder copy — replace with your real legal text.</em> We claim no intellectual property rights over the content you upload to the Web site. Your profile and content uploaded remain yours. However, by using the free mode for your contents, you agree to allow others to view your content.</p>
            <ul>
              <li>By setting your contents to be viewed publicly, you agree to allow others to view and copy your contents.</li>
              <li>The user may include with their contents in a prominent and clearly visible manner a license explaining the main limitations or conditions of use of the content.</li>
              <li>In the event that the user does not indicate any license, default copyright laws apply, stating that the user holds all rights over the uploaded contents.</li>
            </ul>
            <p>By uploading contents you expressly grant us the right of distribution, reproduction and public communication of the contents, as established in the Intellectual Property Act. This Minimum Required License is granted universally and for free.</p>
            <h2 id="copyright">Copyright</h2>
            <p><em>Placeholder copy — replace with your real legal text.</em> Except for material in the public domain under copyright law, all material contained on the Web site (including all software, HTML code, code, applets, controls and other code) is protected by copyright laws.</p>
            <p>Except as otherwise expressly provided in these terms and conditions, you may not copy, distribute, transmit, display, perform, reproduce, publish, license, modify, rewrite, create derivative works from, transfer, or sell any material contained on the Web site without the prior consent of the copyright owner.</p>
            <p>None of the material contained on the Web site may be reverse-engineered, disassembled, decompiled, transcribed, stored in a retrieval system, translated into any language or computer language, retransmitted in any form by any means (electronic, mechanical, photo reproduction, recordation or otherwise), resold or redistributed without the prior written consent. Violation of this provision may result in severe civil and criminal penalties.</p>
            <div className="doc-footnote">
              <b>Questions?</b> If you have any questions about these Terms and Conditions, please contact us through the Conan community channels listed in the footer below. <em>(Replace this block with your real contact details.)</em>
            </div>
          </article>
        </div>
        <MainFooter />
      </main>
    </>
  );
}
