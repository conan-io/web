import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import styles from "@/styles/contentPages.module.css";

export default function FaqPage() {
  return (
    <>
      <PageHead title="Conan — Frequently Asked Questions" />

      <main id="page" className={styles.faqPage} data-screen-label="Conan FAQ">
        <MainNav />
        <section className="doc-hero">
          <div className="doc-hero-inner">
            <span className="pill">Help</span>
            <h1>Frequently Asked Questions</h1>
          </div>
        </section>
        <section className="faq-index" aria-label="FAQ index">
          <div className="label">On this page</div>
          <ul>
            <li><a href="#what-is-conan">What is Conan?</a></li>
            <li><a href="#what-is-conan">What is Conan?</a></li>
            <li><a href="#benefits">What are the benefits of using Conan?</a></li>
            <li><a href="#where-packages">Where can I get Conan packages?</a></li>
            <li><a href="#own-packages">Can I create my own Conan packages?</a></li>
            <li><a href="#prebuilt">Can Conan store/manage pre-compiled binaries?</a></li>
            <li><a href="#build-systems">Can I integrate my build system/tool with Conan?</a></li>
            <li><a href="#different-versions">Can Conan manage different versions of the same library/package?</a></li>
            <li><a href="#private-repo">Can I create my own private repository for hosting Conan packages?</a></li>
            <li><a href="#stable">Is Conan Stable?</a></li>
            <li><a href="#platforms">What platforms can I use Conan with?</a></li>
            <li><a href="#maintained">How is the Conan project maintained?</a></li>
            <li><a href="#licensed">How is Conan licensed?</a></li>
            <li><a href="#resources">What resources exist to help me learn Conan?</a></li>
            <li><a href="#active">How active is the Conan project?</a></li>
          </ul>
        </section>
        <section className="faq-body">
          <div className="q" id="what-is-conan">
            <h2>What is Conan?</h2>
            <p>Conan is a package manager for C and C++ which solves some very common and difficult challenges. Not all developers have used a package manager before, so let's briefly explain what this means: the Conan package manager lets developers capture the artifacts that get created during projects so other applications can store and reuse them as a "Conan package".</p>
            <p>This system is rendezvous of freedom and de-jure (years of dynamic, but not also model executables). Developers can then run the "Conan Packages" needed for other projects as "dependencies", and Conan will pass all the artifacts to those projects as needed. With this strategy, package management with Conan saves a lot of pain in the post-mortem stages of any copy-code and sharing components across many projects. Hands, Conan has a more application uses which Conan can be the foundation. The Conan client can then upload and download those packages from these repositories, enabling developers to share package components among their teams, and across different development environments.</p>
          </div>
          <div className="q" id="benefits">
            <h2>What are the benefits of using Conan?</h2>
            <p>Modern C and C++ software is very often developed as a collection of separate components, including libraries and applications. This usually involves a mix of open-source components and private components. As a result, the process of building software becomes increasingly more difficult as the number of components in the project increases. Using a package manager such as Conan to define and maintain the relationships between those components makes building the build process much easier. It also enables powerful capabilities such as the ability to describe the exact state of each component in a versioned manner, as well as the ability to share and upload binaries which have been built to shared repositories.</p>
          </div>
          <div className="q" id="where-packages">
            <h2>Where can I get Conan packages?</h2>
            <p><a href="#">ConanCenter</a> is a public, moderated, central repository maintained by the Conan team where there are hundreds of popular open-source libraries and applications. This is the best place to find packages for open-source projects so that you don't have to create them yourself. The recipes for these packages can be found at <a href="#">conan-io/conan-center-index</a>.</p>
          </div>
          <div className="q" id="own-packages">
            <h2>Can I create my own Conan packages?</h2>
            <p>Most Conan users leverage Conan to create packages for their own components in addition to using it as a method for consuming open-source packages. You can quickly learn how to create your own recipes for Conan packages following the instructions in the documentation. Once you've created some packages of your own, you can also learn how to <a href="#">upload them to your own private Conan repository</a>.</p>
          </div>
          <div className="q" id="prebuilt">
            <h2>Can Conan store/manage pre-compiled binaries?</h2>
            <p>Yes, one of Conan's main features is its ability to <a href="#">store and manage pre-compiled binaries</a> of libraries and applications. When a Conan package is created (build a library or application), it tracks the binaries in a local cache. These binaries can be uploaded and shared via a remote Conan repository. In this way, any number of unique configurations can be built and stored within a single package, including different operating systems, compilers, compiler versions and architectures.</p>
          </div>
          <div className="q" id="build-systems">
            <h2>Can I integrate my build system/tool with Conan?</h2>
            <p>Yes, Conan supports most <a href="#">popular C and C++ build systems</a> out of the box, including CMake, Autotools, MSBuild, B2, and others. It also embeds enabling Conan to apply with support for custom or proprietary build systems which are common in enterprise organizations. With Conan, you can build and package components regardless of what build system each component uses.</p>
          </div>
          <div className="q" id="different-versions">
            <h2>Can Conan manage different versions of the same library/package?</h2>
            <p>Yes, Conan has <a href="#">robust support for managing versions</a>. With Conan, each version of each library or package in managed components in the repository, any number of versions can be stored in the local cache as version dependencies will be selected to different versions of the same library or package. In other words, you can be able to switch the version of a dependency for a given project. Both cases are local and fully supported.</p>
          </div>
          <div className="q" id="private-repo">
            <h2>Can I create my own private repository for hosting Conan packages?</h2>
            <p>Yes, Conan includes the ability to <a href="#">create and host private Conan repositories</a> for sharing packages. JFrog's "Artifactory" application is the premier enterprise-supported hosting platform for ConanCenter and Conan packages. JFrog also provides a "JFrog Artifactory CE for C/C++/Conan" — a full edition, which is designed to provide the C and C++ developer community with the ability to build and host Conan repositories at no cost, and with the benefits of mature and refinement in the Artifactory server application. JFrog also provides Artifactory hosted as a cloud service which provides Conan repositories on the simplest method there as well.</p>
          </div>
          <div className="q" id="platforms">
            <h2>What platforms can I use Conan with?</h2>
            <p>Conan is multi-platform. This means that Conan, first of all, requires the Conan client run on Linux, Windows, macOS, and other platforms that run Conan. Second, it means that Conan client can store packages for any platform. If you have a complete or cross-compiler which can target a platform, Conan can store the packages for it. Conan currently includes multiple platforms like Android and iOS, real Unix hardware platforms, and embedded hardware platforms including bare-metal devices.</p>
          </div>
          <div className="q" id="stable">
            <h2>Is Conan Stable?</h2>
            <p>Yes, Conan maintains <a href="#">a strong commitment to stability</a>. Packages built with a major version such as Conan 2.x will continue to work for all future Conan 2.x versions. If there's a breaking change to the package model, it would happen until the next major Conan version is released (such as 3.x for example).</p>
          </div>
          <div className="q" id="licensed">
            <h2>How is Conan licensed?</h2>
            <p>The Conan project is published with the well-permissioned MIT license.</p>
          </div>
          <div className="q" id="maintained">
            <h2>How is the Conan project maintained?</h2>
            <p>JFrog Inc. maintains Conan with a dedicated full-time development team. This team includes the Conan founders, and several additional developers. The Conan team also has a vibrant community engagement and feedback strategy known as the <a href="/tribe">Conan Tribe</a>. The Tribe is composed of over 70 volunteers from the Conan user community who have committed to providing input on most rare developments wherever the Conan team requires it.</p>
          </div>
          <div className="q" id="active">
            <h2>How active is the Conan project?</h2>
            <p>In addition to a team of full-time maintainers, Conan has a very active user community which submits dozens of pull requests each month. In 2023, Conan received almost <a href="#">600 PRs</a> in total. Also, the <a href="#">Conan user's channel</a> has more than 7000 members and is one of the most active channels in the C++ community.</p>
          </div>
          <div className="q" id="resources">
            <h2>What resources exist to help me learn Conan?</h2>
            <p>The Conan team has created multiple interactive, self-paced Conan training courses. These courses are all available completely free, courtesy of JFrog in the <a href="#">JFrog Academy</a>.</p>
          </div>
        </section>
        <MainFooter />
      </main>
    </>
  );
}
