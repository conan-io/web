import type { ReactNode } from "react";
import Link from "next/link";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import styles from "@/styles/contentPages.module.css";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "What is Conan?",
    answer: (
      <>
        <p>
          Conan is a package manager for C and C++ which aims to solve some very common and difficult challenges. Not all developers have used a package manager before, so let&apos;s briefly explain what that means.First, the Conan package manager lets developers capture the artifacts which are created during builds of libraries and applications and store them as a &ldquo;Conan Package&rdquo;. This is often a combination of headers and libraries (static or dynamic), but can also include executables. Developers can then list the &ldquo;Conan Packages&rdquo; needed for other projects as &ldquo;dependencies&rdquo;, and Conan will pass all the artifacts to those projects as needed. With this strategy, package management with Conan provides a first-class mechanism for reusing code and sharing components across many projects. Finally, Conan has a server application upon which Conan repositories can be created. The Conan client can then upload and download Conan packages from these repositories, enabling developers to share packaged components among their teams, and across different development environments.
        </p>
      </>
    ),
  },
  {
    question: "What are the benefits of using Conan?",
    answer: (
      <p>
        Modern C and C++ software is very often developed as a collection of separate components, including libraries and applications. This usually includes a mix of open-source components, and private components. As a result, the process of building software becomes increasingly more difficult as the number of components in the project increases. Using a package manager such as Conan to define and maintain the relationships between these components makes building the build process much easier. It also enables powerful capabilities such as the ability to describe the build steps of each component in a universal format, as well as the ability to store and upload binaries which have been built to shared repositories.
      </p>
    ),
  },
  {
    question: "Where can I get Conan packages?",
    answer: (
      <p>
        <Link href="/center">ConanCenter</Link> is a public, moderated, central repository maintained by the Conan team which contains hundreds of popular open-source libraries and applications. This is the best place to find packages for open-source projects so that you don&apos;t have to create them yourself. The recipes for these packages can be found at <Link href="/search">ConanCenterIndex</Link>.
      </p>
    ),
  },
  {
    question: "Can I create my own Conan packages?",
    answer: (
      <p>
        Most Conan users leverage it to create packages for their own components in addition to using it as a method for consuming open- source packages. You can quickly learn how to create your own recipes for Conan packages following the [instructions in the documentation]. Once you&apos;ve created some packages of your own, you can also learn how to{" "}
        <Link href="https://docs.conan.io/2/introduction.html#decentralized-package-manager">upload them to your own private Conan repositories</Link>.
      </p>
    ),
  },
  {
    question: "Can Conan store/manage pre-compiled binaries?",
    answer: (
      <p>
        Yes, one of Conan&apos;s core features is its ability to{" "}
        <Link href="https://docs.conan.io/2/introduction.html#binary-management">store and manage pre-compiled binaries</Link> of libraries and applications. When a Conan package is used to build a library or application, it stores the binaries in a local cache. These binaries can be uploaded and shared via a remote Conan repository. In this way, any number of unique configurations can be built and stored within a single package, including different operating systems, compilers, compiler versions and architectures.
      </p>
    ),
  },
  {
    question: "Can I Integrate my build system/tool with Conan?",
    answer: (
      <p>
        Yes, Conan supports most{" "}
        <Link href="https://docs.conan.io/2/integrations.html">popular C and C++ build systems</Link> out of the box, including CMake, Autotools, MSBuild, B2 and others. It is also extensible, enabling users to easily add support for custom or proprietary build systems, which are common in enterprise organizations. With Conan, you can build and package components regardless of what build system each component uses.
      </p>
    ),
  },
  {
    question: "Can Conan manage different versions of the same library/package?",
    answer: (
      <p>
        Yes, Conan has{" "}
        <Link href="https://docs.conan.io/2/tutorial/consuming_packages/intro_to_versioning.html">robust comprehension of versioning</Link>. with Conan, each version of each library or package is managed independently in the repository. Any number of versions can be stored in the local cache or remote repository at the same time, each with its own pre-built binaries. This is great when you have different applications which depend on different versions of the same library or package, or when you want to want to switch the version of a dependency for a given project. Both cases are trivial and fully supported.
      </p>
    ),
  },
  {
    question: "Can I create my own private repository for hosting Conan packages?",
    answer: (
      <p>
        Yes, Conan includes the ability to{" "}
        <Link href="https://docs.conan.io/2/introduction.html#decentralized-package-manager">create and host private Conan repositories</Link> for sharing packages. JFrog&apos;s &ldquo;Artifactory&rdquo; application is the premier enterprise repository hosting platform for Conan packages. Artifactory CE for C and C++ is a free edition, which is designed to provide the C and C++ developer community with the ability to create and host Conan repositories at no cost, and with the benefits of maturity and robustness of the Artifactory server application. JFrog also provides Artifactory hosted as a cloud service which Conan repositories can be created and hosted there as well.
      </p>
    ),
  },
  {
    question: "What platforms can I use Conan with?",
    answer: (
      <p>
        <Link href="https://docs.conan.io/2/introduction.html#all-platforms-all-build-systems-and-compilers">Conan is multi-platform</Link>. This means two things. First, it means that the Conan client can run on Linux, Windows, macOS, and anywhere else python can run. Second, it means that it can build and store packages for any platform. If you have a compiler or cross-compiler which can target a platform, Conan can store the binaries for it. Common examples include mobile platforms like Android and IOS, real- time hardware platforms, and embedded hardware platforms including bare-metal devices.
      </p>
    ),
  },
  {
    question: "Is Conan Stable?",
    answer: (
      <p>
        Yes. Conan maintains a{" "}
        <Link href="https://docs.conan.io/2/introduction.html#stable">strong commitment to stability</Link>. Packages built with a major version such as Conan 2.x will continue to work for all future Conan 2.x versions. If there&apos;s a breaking change to the package model, it won&apos;t happen until the next major Conan version is released (such as 3.x for example).
      </p>
    ),
  },
  {
    question: "How is Conan licensed?",
    answer: <p>The Conan project is published with the very permissive MIT license.</p>,
  },
  {
    question: "How is the Conan project maintained?",
    answer: (
      <p>
        <Link href="https://jfrog.com">JFrog Inc.</Link> maintains Conan with a dedicated full-time development team. This team includes the Conan founders, and several additional developers. The Conan team also has a formal community engagement and feedback strategy known as the{" "}
        <Link href="/tribe">Conan Tribe</Link>. The tribe is composed of over 70 volunteers from the Conan user community who have committed to providing input on major road map decisions whenever the Conan team requests it.
      </p>
    ),
  },
  {
    question: "How active is the Conan project?",
    answer: (
      <p>
        In addition to a team of full-time maintainers, Conan has a very active user community which submits dozens of pull requests each month. In 2023, Conan received almost{" "}
        <Link href="https://github.com/conan-io/conan-center-index/pulls">6000 PRs</Link> in total. Also, the{" "}
        <Link href="https://cppalliance.org/slack/#cpp-slack">Conan slack channel</Link> has more than 2900 members, and is one of the most active channels in the{" "}
        <Link href="https://cppalliance.org/slack/">C++ community</Link>.
      </p>
    ),
  },
  {
    question: "What resources exist to help me learn Conan?",
    answer: (
      <p>
        The Conan team has created multiple interactive, self-paced Conan training courses. These courses are all available completely free, courtesy of JFrog in the{" "}
        <Link href="https://academy.jfrog.com/conan-2-essentials">JFrog academy</Link>.
      </p>
    ),
  },
];

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
            {faqs.map((faq, i) => (
              <li key={faq.question}>
                <a href={`#faq-${i}`}>{faq.question}</a>
              </li>
            ))}
          </ul>
        </section>
        <section className="faq-body">
          {faqs.map((faq, i) => (
            <div className="q" key={faq.question} id={`faq-${i}`}>
              <h2>{faq.question}</h2>
              {faq.answer}
            </div>
          ))}
        </section>
        <MainFooter />
      </main>
    </>
  );
}
