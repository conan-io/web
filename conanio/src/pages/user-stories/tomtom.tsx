/* eslint-disable react/no-unescaped-entities -- article body keeps intentional apostrophes/quotes */
import Link from "next/link";
import Image from "next/image";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";

export default function UserStoryTomTomPage() {
  return (
    <>
      <PageHead title="Conan — User story: TomTom" />

      <main id="page" data-screen-label="Conan User Story — TomTom">
        <MainNav />
        <section className="us-hero">
          <div className="us-hero-inner">
            <Link className="us-back" href="/user-stories">‹ Back to User Stories</Link>
            <h1>Reducing Multi-Architecture Build Times for Navigation Devices with Conan and Artifactory</h1>
            <div className="us-lockup">
              <Image src="/conan-cube.png" alt="Conan" className="us-lockup-conan" width={44} height={44} />
              <span className="us-lockup-plus">+</span>
              <Image
                src="/brands/company_tomtom.webp"
                alt="TomTom"
                className="us-lockup-customer us-lockup-customer--tomtom"
                width={200}
                height={64}
              />
            </div>
          </div>
        </section>
        <section className="us-body">
          <article className="us-article">
            <p className="us-lede">Maikel van der Hark is a Principal Software Engineer at TomTom, responsible for the developer experience of the company's navigation-software stack. Representing the largest product unit in the organization of over 4,500 employees, Maikel must design systems that enable developers to easily build their software in a predominantly C++ environment.</p>
            <p>"TomTom's applications are wide-ranging; the same software stack targets many different platforms, from embedded software to web applications. It makes it quite a challenging exercise in the domain we're operating in," says Maikel.</p>
            <p>In making location technology for automated driving, navigation software for top car brands, and more, Maikel is excited by how, "We try to make it possible for everybody to navigate and find a way within the world."</p>
            <h2>Challenges</h2>
            <p>Developers at TomTom's Navigation support their wide range of products from a monolithic C++ software stack that must be explicitly configured and built to run on each target platform. Each developer has to compile from this stack — often daily — in order to introduce new features or fix bugs reported by customers, some of which apply only to specific target hardware.</p>
            <p>TomTom developers had created their own proprietary solution based on Ivy to manage these variations, but found it was unable to fulfill their growing need to manage and trace build context.</p>
            <p>The lack of these abilities forced TomTom developers to perform a full rebuild through CMake for every change, no matter how small. "The compilation times were too lengthy, to actually make it so that the developers could in the fastest possible time frame deliver any value to our products," Maikel recalled. This requirement also slowed Jenkins CI builds, making it impossible to sustain a continuous delivery cycle.</p>
            <h2>Results</h2>
            <p>The TomTom team has the opportunity to learn more about Conan's internal workings which empowers them to contribute extensions to the rest of C++ community. Once the TomTom Navigation team adopted Conan for C++, they could use the package manager's settings system to better target their builds for their many target platform environments. Using package IDs and other Conan settings features made it possible to create and manage binaries the developers and delivery managers could both share.</p>
            <p>"The flexibility with all the settings and options, that allowed a whole new world for us," Maikel said. "That's the key thing which really brought us over the line."</p>
            <p>Conan enabled Maikel's navigation product unit to modernize from a mono-repo to multi-repo approach, working with "mostly isolated packages which can be iterated upon quite fast." Developers can now quickly rebuild their own components while fetching dependencies as compiled binaries through Artifactory.</p>
            <p>With this shift to a binaries-centric approach powered by Artifactory, Maikel quickly saw how CI builds through Jenkins, accelerated. "Lead times are actually going down as well in that regard," he noted. "That is, I think, one of the key things that we have achieved by adopting Conan."</p>
            <blockquote className="us-quote">
              <p>"We started to see that we could speed up our development chain by producing binary artifacts that could be shared across developers — we could actually shorten the build times because they don't have to be built over again."</p>
              <cite>— Maikel van der Hark, TomTom Principal Software Engineer</cite>
            </blockquote>
            <p>Conan is a free open source tool, <a href="#">get started using Conan today</a>. If C++ is one of the many languages you leverage at your organization, Artifactory can help you manage all the packages in a single solution. <a href="#">Get started with Artifactory CE</a> for free today.</p>
            <h2>About TomTom</h2>
            <p>At TomTom we're mapmakers, providing geolocation technology for drivers, carmakers, enterprises and developers.</p>
            <p>Our highly accurate maps, navigation software, real-time traffic information and APIs enable smart mobility on a global scale, making the roads safer, the drive easier and the air cleaner.</p>
            <p>Headquartered in Amsterdam with offices worldwide, TomTom's technologies are trusted by hundreds of millions of drivers, businesses and governments worldwide.</p>
            <div className="us-meta">
              <div className="us-meta-block">
                <h4>Industry</h4>
                <ul><li>Location Technology</li><li>Consumer Electronics</li></ul>
              </div>
              <div className="us-meta-block">
                <h4>Problem</h4>
                <ul>
                  <li>Monolithic software stack</li>
                  <li>Need to support multiple platforms</li>
                  <li>Limited ability to manage platform variations</li>
                  <li>Excessive build times</li>
                  <li>Unable to trace build context</li>
                  <li>Poor developer productivity</li>
                  <li>Unable to sustain a continuous delivery cycle</li>
                </ul>
              </div>
              <div className="us-meta-block">
                <h4>Results</h4>
                <ul>
                  <li>Modernized for multiple repositories</li>
                  <li>Manage many platform variations through properties</li>
                  <li>Able to share binaries across teams</li>
                  <li>Shortened build times</li>
                  <li>Improved developer productivity</li>
                  <li>Accelerated release times for continuous delivery</li>
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
                <div className="us-pdf-thumb-title">Reducing Multi-Architecture Build Times</div>
                <div className="us-pdf-thumb-img" />
                <div className="us-pdf-thumb-foot">
                  <span className="us-pdf-thumb-bar" />
                  <span className="us-pdf-thumb-bar" />
                  <span className="us-pdf-thumb-bar" />
                </div>
              </div>
              <a
                className="btn btn-primary us-pdf-btn"
                href="https://media.jfrog.com/wp-content/uploads/2022/04/21101854/TomTom-and-Conan-Use-Case.pdf"
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
