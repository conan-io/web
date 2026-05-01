import Link from "next/link";
import MainNav from "../../components/MainNav";
import MainFooter from "../../components/MainFooter";
import PageHead from "../../components/PageHead";
import styles from "../../styles/contentPages.module.css";

export default function UserStoriesPage() {
  return (
    <>
      <PageHead title="Conan — User Stories" />

      <main id="page" className={styles.userStoriesIndexPage} data-screen-label="Conan User Stories">
        <MainNav />
        <section className="us-index-hero">
          <div className="us-index-hero-inner">
            <span className="pill">Customer stories</span>
            <h1>User Stories</h1>
            <p>How leading C/C++ teams ship faster with Conan and Artifactory.</p>
          </div>
        </section>
        <section className="us-index">
          <div className="us-index-grid">
            <Link className="us-card" href="/user-stories/rti">
              <div className="us-card-logo us-card-logo--rti">
                <img src="/rti-logo.png?v=1777364053920" alt="RTI" />
              </div>
              <div className="us-card-tag">RTI Story</div>
              <div className="us-card-title">Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory</div>
              <div className="us-card-cta">Read story →</div>
            </Link>
            <Link className="us-card" href="/user-stories/tomtom">
              <div className="us-card-logo us-card-logo--tomtom">
                <img src="/tomtom-logo.png?v=1777364053920" alt="TomTom" />
              </div>
              <div className="us-card-tag">Customer Success Story: TomTom</div>
              <div className="us-card-title">TomTom fast tracks their delivery cycle with Conan</div>
              <div className="us-card-cta">Read story →</div>
            </Link>
          </div>
        </section>
        <MainFooter />
      </main>
    </>
  );
}
