/* eslint-disable react/no-unescaped-entities -- article body keeps intentional apostrophes/quotes */
import Link from "next/link";
import Image from "next/image";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";

export default function UserStoryRtiPage() {
  return (
    <>
      <PageHead title="Conan — User story: RTI" />

      <main id="page" data-screen-label="Conan User Story — RTI">
        <MainNav />
        <section className="us-hero">
          <div className="us-hero-inner">
            <Link className="us-back" href="/user-stories">‹ Back to User Stories</Link>
            <h1>Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory</h1>
            <div className="us-lockup">
              <Image src="/conan-cube.png" alt="Conan" className="us-lockup-conan" width={44} height={44} />
              <span className="us-lockup-plus">+</span>
              <Image
                src="/brands/company_rti.webp"
                alt="RTI"
                className="us-lockup-customer us-lockup-customer--rti"
                width={200}
                height={64}
              />
            </div>
          </div>
        </section>
        <section className="us-body">
          <article className="us-article">
            <h2>Company</h2>
            <p>Real-Time Innovations (RTI) is the largest software framework company for autonomous systems. RTI Connext® is the world's leading architecture for developing intelligent distributed systems. Uniquely, Connext shares data directly, connecting AI algorithms to real-time networks of devices to build autonomous systems.</p>
            <p>RTI is the best in the world at ensuring our customers' success in deploying production systems. With over 1,500 designs, RTI software runs over 250 autonomous vehicle programs, controls the largest power plants in North America, coordinates combat management on U.S. Navy ships, drives a new generation of medical robotics, enables flying cars, and provides 24/7 intelligence for hospital and emergency medicine. RTI runs a smarter world.</p>
            <p>RTI is the leading vendor of products compliant with the Object Management Group® (OMG®) Data Distribution Service™ (DDS) standard. RTI is privately held and headquartered in Sunnyvale, California with regional offices in Colorado, Spain, and Singapore.</p>
            <h2>Challenges</h2>
            <p>Javier Povedano Molina leads a team of engineers at RTI which is responsible for the build and automation tools for the RTI Connext framework. RTI Connext consists of more than 30 different products and libraries and is written in C, C++, C#, and Java. The build tooling is primarily written in Python.</p>
            <p>RTI Connext is used in a wide variety of smart machines and supports over 70 different architectures and embedded systems. The RTI development team, therefore, needs to create a different binary for each of the many architectures, with every release of RTI Connext. Although all are produced from the same baseline code, each binary must be independently tested and validated. The code's large number of dependencies further complicate the build process.</p>
            <p>The RTI Engineering Team sought to modernize their build system to improve time-to-market performance and help ensure the quality of all binaries in the release. The team did not want to limit themselves to a narrow set of tools and sought a solution that would empower them to connect to what they choose now as well as in the future.</p>
            <h2>Solution</h2>
            <p>After evaluating multiple package managers, the RTI team adopted Conan to manage C/C++ dependencies and JFrog Artifactory to host packages, recipes, and third-party binaries. The combination provides reproducible builds, package immutability, and traceability across all of RTI's supported architectures.</p>
            <p>By centralizing recipes and binaries in Artifactory, RTI engineers can pull pre-compiled dependencies on demand instead of rebuilding from source on every CI run, drastically shrinking pipeline times.</p>
            <h2>Results</h2>
            <p>With Conan and Artifactory in place, RTI cut release-preparation cycles, simplified onboarding for new platforms, and gave the team confidence that every binary in a release matches a specific, traceable recipe. Connext releases now ship faster, with fewer manual interventions, across the full matrix of supported architectures.</p>
            <blockquote className="us-quote">
              <p>"Conan and Artifactory let us treat every supported architecture as a first-class citizen — same recipe, same automation, traceable binaries, and a release pipeline we can actually reason about."</p>
              <cite>— Javier Povedano Molina, RTI Build &amp; Release Lead</cite>
            </blockquote>
            <h2>About RTI</h2>
            <p>Real-Time Innovations (RTI) provides the connectivity software platform for the most demanding distributed systems on the planet — from autonomous vehicles to medical devices, from energy infrastructure to defense systems. RTI Connext is built on the DDS standard and trusted across more than 1,500 designs.</p>
            <div className="us-meta">
              <div className="us-meta-block">
                <h4>Industry</h4>
                <ul><li>Industrial IoT</li><li>Autonomous Systems</li><li>Defense &amp; Aerospace</li></ul>
              </div>
              <div className="us-meta-block">
                <h4>Problem</h4>
                <ul>
                  <li>30+ products and libraries to build</li>
                  <li>70+ supported architectures</li>
                  <li>Multiple languages (C, C++, C#, Java)</li>
                  <li>Long, manual release preparation</li>
                  <li>Limited binary traceability</li>
                </ul>
              </div>
              <div className="us-meta-block">
                <h4>Results</h4>
                <ul>
                  <li>Reproducible cross-platform builds</li>
                  <li>Centralized binaries and recipes</li>
                  <li>Faster CI through pre-compiled dependencies</li>
                  <li>Traceable releases across all architectures</li>
                  <li>Faster time-to-market</li>
                </ul>
              </div>
              <div className="us-meta-block">
                <h4>Solutions</h4>
                <ul><li>Conan</li><li>Artifactory</li></ul>
              </div>
            </div>
          </article>
          <aside className="us-aside">
            <div className="us-pdf">
              <div className="us-pdf-thumb">
                <div className="us-pdf-thumb-head">CUSTOMER CASE STUDY</div>
                <div className="us-pdf-thumb-title">Speeding Multi-Platform Releases for Industrial IoT</div>
                <div className="us-pdf-thumb-img us-pdf-thumb-img--rti" />
                <div className="us-pdf-thumb-foot">
                  <span className="us-pdf-thumb-bar" />
                  <span className="us-pdf-thumb-bar" />
                  <span className="us-pdf-thumb-bar" />
                </div>
              </div>
              <a
                className="btn btn-primary us-pdf-btn"
                href="https://media.jfrog.com/wp-content/uploads/2021/06/15183931/USE-CASE-RTI.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↓ Download
              </a>
            </div>
          </aside>
        </section>
        <MainFooter />
      </main>
    </>
  );
}
