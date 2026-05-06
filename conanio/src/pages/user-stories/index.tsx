import Link from "next/link";
import Image from "next/image";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import styles from "@/styles/contentPages.module.css";

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
                <Image src="/brands/company_rti.webp" alt="RTI" width={220} height={80} />
              </div>
              <div className="us-card-tag">RTI Story</div>
              <div className="us-card-title">Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory</div>
              <div className="us-card-cta">Read story →</div>
            </Link>
            <Link className="us-card" href="/user-stories/tomtom">
              <div className="us-card-logo us-card-logo--tomtom">
                <Image src="/brands/company_tomtom.webp" alt="TomTom" width={220} height={80} />
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
