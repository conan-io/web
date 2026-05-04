import Link from "next/link";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import styles from "@/styles/contentPages.module.css";

export default function WhyConanPage() {
  return (
    <>
      <PageHead title="Conan — Why adopt Conan in your C++ workflows" />

      <main id="page" className={styles.whyConanPage} data-screen-label="Why Conan">
        <MainNav />

        <section className="doc-hero">
          <div className="doc-hero-inner">
            <h1>Why adopt Conan in your C++ workflows</h1>
          </div>
        </section>

        <nav className="why-toc" aria-label="On this page">
          <div className="label">On this page</div>
          <ul>
            <li><a href="#binary-management">Binary management</a></li>
            <li><a href="#universal">Universal: platforms &amp; build systems</a></li>
            <li><a href="#extensibility">Extensibility</a></li>
            <li><a href="#manage-tools">Managing tools &amp; cross-builds</a></li>
            <li><a href="#versioning-scale">Versioning at scale</a></li>
            <li><a href="#compliance">Compliance &amp; metadata</a></li>
            <li><a href="#open-source">Open source &amp; support</a></li>
            <li><a href="#decentralized">Decentralized supply chain</a></li>
            <li><a href="#community">Community</a></li>
          </ul>
        </nav>

        <div className="why-body">
          <section id="binary-management" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>01</span>
              <h2>
                Best <strong>binary</strong> management that saves developers and CI time and resources
              </h2>
            </header>
            <div className="why-card">
              <div className="why-prose">
                <p>
                  Conan can create, upload to your own server, store and efficiently retrieve pre-compiled binaries for your C++ development workflows, with full control over the ABI binary compatibility.
                </p>
                <p>
                  With its unique novel architecture designed specifically for native C and C++ binaries, Conan can upload and download the binaries for all different platforms, OSs, compilers, architecture, cross-builds, with exactly the same commands, and store and manage them in the same place, no need for a different technology or solution in every platform. Decrease the time needed to add support for new CPU architectures and compiler versions - from weeks to hours.
                </p>
                <p>
                  Storing your pre-built binaries allows faster development times, saving time and money in CI builds, ensuring your entire team of developers and CI machines are using exactly the same binaries, ensuring reproducibility, implementing traceability and debuggability of your supply chain and providing the compliance required by policies.
                </p>
              </div>
            </div>
          </section>

          <section id="universal" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>02</span>
              <h2>
                Truly <strong>universal</strong>, any platform, any build system, any compiler
              </h2>
            </header>
            <div className="why-two">
              <div className="why-card">
                <h3 className="why-card-title">Platforms &amp; targets</h3>
                <div className="why-prose">
                  <p>
                    Conan runs on multiple platforms (Windows, Linux, OSX, FreeBSD, SunOS, etc), and it can target any platform with a powerful cross-build model, better than that provided by build systems alone. Unlike others, Conan provides first class support for all platforms equally.
                  </p>
                  <p>
                    If your C++ project targets multiple OSs and platforms, with Conan you can ensure you use exactly the same tools, commands, infrastructure and workflows across all of them - a single solution that will reduce a lot of duplication, burden and costs when dealing with your C++ dependencies.
                  </p>
                </div>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Build systems</h3>
                <div className="why-prose">
                  <p>
                    While providing completely transparent integration with CMake, the most popular build system nowadays, Conan is build-system agnostic, and also{" "}
                    <a href="https://docs.conan.io/2/integrations.html" rel="noopener noreferrer" target="_blank">
                      integrates natively (without any need for CMake) with other build systems
                    </a>{" "}
                    like MSBuild (Visual Studio solutions), Autotools, Meson, etc, and it can be extended to natively support any build system, including proprietary ones.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="extensibility" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>03</span>
              <h2>
                The <strong>extensibility</strong> that the most advanced enterprises in the world need
              </h2>
            </header>
            <div className="why-card">
              <div className="why-prose">
                <p>
                  Because C++ projects have very different needs, Conan beyond a tool is a{" "}
                  <a href="https://docs.conan.io/2/reference/extensions.html" rel="noopener noreferrer" target="_blank">
                    framework for C++ package management
                  </a>
                  . A rich Python API allows creating user custom commands to provide a unified interface for developers and CI to all custom extensions.
                </p>
                <p>
                  Extracting artifacts from Conan packages to deploy them in different systems can be done with custom deployers, and there are plugins to define the desired custom binary compatibility, command wrappers or dynamic configuration.
                </p>
                <p>
                  Commands provide documented json output of dependency graphs, packages-lists, cache paths, profiles, and many more. Custom settings allow to define your own compilers, versions, microprocessor, architectures, and any other specialized configuration that your project might need.
                </p>
                <p>
                  The{" "}
                  <a href="https://docs.conan.io/2/reference/commands/config.html#conan-config-install" rel="noopener noreferrer" target="_blank">
                    configuration install system
                  </a>{" "}
                  allows to automate the sharing and installation of all those extensions easily, together with many other configurable items, like the definitions of remote repositories.
                </p>
              </div>
            </div>
          </section>

          <section id="manage-tools" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>04</span>
              <h2>
                <strong>Manage your tools</strong> to improve your native, <strong>embedded and cross-build</strong> flows
              </h2>
            </header>
            <div className="why-card why-card--stack">
              <div className="why-prose">
                <p>
                  C++ projects often need to use many different tools like build systems, compilers, toolchains, analyzers, etc. Setting up those tools in different operating systems, developers machines, continuous integration agents ensuring reproducibility and allowing easy and automatic update of the tools versions used without breaking the builds can be challenging.
                </p>
              </div>
              <div className="why-split-inner">
                <div className="why-mini">
                  <h3 className="why-card-title">Tools as packages</h3>
                  <div className="why-prose">
                    <p>
                      Is it possible to create{" "}
                      <a href="https://docs.conan.io/2/tutorial/consuming_packages/use_tools_as_conan_packages.html" rel="noopener noreferrer" target="_blank">
                        Conan packages that store these tools
                      </a>
                      , so they will be automatically installed, updated and used by all developers and CI agents, and manage them in exactly the same way that other packages: creating, uploading and installing them from your own servers, having a centralized solution for all your packages, both libraries and tools.
                    </p>
                  </div>
                </div>
                <div className="why-mini">
                  <h3 className="why-card-title">Graph &amp; cross-builds</h3>
                  <div className="why-prose">
                    <p>
                      The Conan graph model allows an advanced usage of tools requirements for native, embedded and{" "}
                      <a href="https://docs.conan.io/2/tutorial/consuming_packages/cross_building_with_conan.html" rel="noopener noreferrer" target="_blank">
                        cross-building scenarios
                      </a>{" "}
                      that build systems alone or other package managers can&apos;t handle. Managing your tools in an unified way ensures better reproducibility, traceability and developer convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="versioning-scale" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>05</span>
              <h2>Move faster, integrate changes at scale with confidence</h2>
            </header>
            <div className="why-card">
              <div className="why-prose">
                <p>
                  Conan graph model is capable of advanced modeling the different relationships between packages, like executables, shared libraries, static libraries or header-only libraries and package libraries that can be both built as shared or static. Together with the analysis of how the different versioning scheme and changes in dependencies versions affect the package binaries, allows Conan to determine which packages need to be built when changes happens in upstream dependencies, enabling both safe (ensuring that packages that need to be rebuilt are rebuilt) and optimal (ensuring that packages that don&apos;t need to be built from source aren&apos;t) builds are performed.
                </p>
                <p>
                  Standard{" "}
                  <a href="https://docs.conan.io/2/tutorial/versioning.html" rel="noopener noreferrer" target="_blank">
                    versioning mechanisms
                  </a>{" "}
                  like version-ranges allow you to move fast, to automatically update the dependencies to the latest matching versions, for getting the latest bug fixes and security patches quickly into your builds. Lockfiles allow to have fully reproducible dependencies, irrespective of the release of new versions, it is always possible to reproduce exactly the same dependencies for reproducible builds.
                </p>
              </div>
            </div>
          </section>

          <section id="compliance" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>06</span>
              <h2>
                Automate the storage of open-source third parties. Manage your metadata. Be <strong>compliant</strong>.
              </h2>
            </header>
            <div className="why-two">
              <div className="why-card">
                <h3 className="why-card-title">Third-party sources</h3>
                <div className="why-prose">
                  <p>
                    Creating software is more than building code, and very often, managing other aspects of the software life-cycle is important. Conan is able to automatically store and backup in your own server third-parties tarballs downloaded from the internet, so future builds can be guaranteed, no matter what happens to those internet sources, increasing your builds compliance, reproducibility and security.
                  </p>
                </div>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Metadata</h3>
                <div className="why-prose">
                  <p>
                    C++ builds often generate build logs, tests, test results, code analysis and other side metadata files that are not strictly necessary for further builds, but different industries policies and compliance rules require to manage. Conan can store all this metadata together with the packages, without impacting the performance of package usage and retrieval.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="open-source" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>07</span>
              <h2>
                The freedom of free and <strong>open source</strong>. Stable and supported by a dedicated team
              </h2>
            </header>
            <div className="why-card">
              <div className="why-prose">
                <p>
                  Conan is completely{" "}
                  <a href="https://github.com/conan-io" rel="noopener noreferrer" target="_blank">
                    free and open source
                  </a>
                  , with the very permissive MIT license. That means that you can use Conan freely for all kinds of projects, including commercial ones, without any restriction or limitation. You can also modify and adapt Conan to your needs, no lock-in.
                </p>
                <p>
                  The Conan project is sponsored by JFrog, meaning that there is a whole team dedicated to developing, improving, supporting (use{" "}
                  <a href="https://github.com/conan-io/conan/issues" rel="noopener noreferrer" target="_blank">
                    Github issues
                  </a>{" "}
                  to ask anything you need), testing and documenting Conan, with a strong commitment to stability, as the C/C++ industry needs.
                </p>
              </div>
            </div>
          </section>

          <section id="decentralized" className="why-section">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>08</span>
              <h2>
                Fully <strong>decentralized, own your supply</strong> chain for improved security, from ConanCenter to your own servers
              </h2>
            </header>
            <div className="why-two">
              <div className="why-card">
                <h3 className="why-card-title">ConanCenter</h3>
                <div className="why-prose">
                  <p>
                    <Link href="/center">ConanCenter</Link> is a great resource, with more than 1500 popular open source packages built for a wide range of configurations in different operating systems and compilers, with a very strict contribution process, in which every contribution is reviewed by humans, and building all the binaries in our own infrastructure. But many industries, company policies or regulations don&apos;t allow or recommend using packages from the internet.
                  </p>
                </div>
              </div>
              <div className="why-card">
                <h3 className="why-card-title">Artifactory &amp; your binaries</h3>
                <div className="why-prose">
                  <p>
                    Conan offers the best integration with JFrog Artifactory, including the free Artifactory CE (Community Edition), so you can easily build and{" "}
                    <a href="https://docs.conan.io/2/devops/using_conancenter.html" rel="noopener noreferrer" target="_blank">
                      host your own packages from the conan-center-index
                    </a>{" "}
                    Github open source repository, fully owning your binaries supply chain.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="community" className="why-section why-section--last">
            <header className="why-section-head">
              <span className="why-num" aria-hidden>09</span>
              <h2>
                Join the large and wide Conan <strong>community</strong> and ecosystem
              </h2>
            </header>
            <div className="why-card">
              <div className="why-prose">
                <p>
                  Conan is used in production by thousands of companies, including many from the Fortune 100, in automotive, embedded, robotics, financial, gaming, industrial, engineering and many other industries. Conan client gets more than 750k downloads/month, only from PyPI (not counting our downloads page installer), making it one of the top 1% most downloaded projects there.
                </p>
                <p>
                  The “#conan” channel in the CppLang slack team counts with more than 2500 users, consistently being ranked as one of the top most active and used channels in the C++ community. Conan contributors submitted more than 5000 pull requests just in the last year, improving the recipes in ConanCenter, that centralize the knowledge of the large conan community, in the same way that Conan tools integrate that knowledge and good practices gathered along the years with a vast amount of feedback from users and contributors.
                </p>
              </div>
            </div>
          </section>
        </div>

        <MainFooter />
      </main>
    </>
  );
}
