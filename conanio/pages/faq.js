import React from 'react';
import Link from 'next/link';

import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';


function FaqPage() {

  const faqs = [
    {
      "question": "What is Conan?",
      "answer": (<div className="pb-2">Conan is a package manager for C and C++ which aims to solve some very common and difficult challenges. Not all developers have used a package manager before, so let’s briefly explain what that means.First, the Conan package manager lets developers capture the artifacts which are created during builds of libraries and applications and store them as a “Conan Package”. This is often a combination of headers and libraries (static or dynamic), but can also include executables. Developers can then list the “Conan Packages” needed for other projects as “dependencies”, and Conan will pass all the artifacts to those projects as needed. With this strategy, package management with Conan provides a first-class mechanism for reusing code and sharing components across many projects. Finally, Conan has a server application upon which Conan repositories can be created. The Conan client can then upload and download Conan packages from these repositories, enabling developers to share packaged components among their teams, and across different development environments.</div>)
    }, {
      "question": "What are the benefits of using Conan?",
      "answer": (<div className="pb-2">Modern C and C++ software is very often developed as a collection of separate components, including libraries and applications. This usually includes a mix of open-source components, and private components. As a result, the process of building software becomes increasingly more difficult as the number of components in the project increases. Using a package manager such as Conan to define and maintain the relationships between these components makes building the build process much easier. It also enables powerful capabilities such as the ability to describe the build steps of each component in a universal format, as well as the ability to store and upload binaries which have been built to shared repositories.</div>)
    }, {
      "question": "Where can I get Conan packages?",
      "answer": (<div className="pb-2"><Link href="/center"><a>ConanCenter</a></Link>  is a public, moderated, central repository maintained by the Conan team which contains hundreds of popular open-source libraries and applications. This is the best place to find packages for open-source projects so that you don’t have to create them yourself. The recipes for these packages can be found at <Link href="/search"><a>ConanCenterIndex</a></Link>.</div>)
    }, {
      "question": "Can I create my own Conan packages?",
      "answer": (<div className="pb-2">Most Conan users leverage it to create packages for their own components in addition to using it as a method for consuming open- source packages. You can quickly learn how to create your own recipes for Conan packages following the [instructions in the documentation]. Once you’ve created some packages of your own, you can also learn how to  <Link href="https://docs.conan.io/2/introduction.html#decentralized-package-manager"><a>upload them to your own private Conan repositories</a></Link>.</div>)
    }, {
      "question": "Can Conan store/manage pre-compiled binaries?",
      "answer": (<div className="pb-2">Yes, one of Conan’s core features is its ability to <Link href="https://docs.conan.io/2/introduction.html#binary-management"><a>store and manage pre-compiled binaries</a></Link> of libraries and applications. When a Conan package is used to build a library or application, it stores the binaries in a local cache. These binaries can be uploaded and shared via a remote Conan repository. In this way, any number of unique configurations can be built and stored within a single package, including different operating systems, compilers, compiler versions and architectures.</div>)
    }, {
      "question": "Can I Integrate my build system/tool with Conan?",
      "answer": (<div className="pb-2">Yes, Conan supports most <Link href="https://docs.conan.io/2/integrations.html"><a>popular C and C++ build systems</a></Link> out of the box, including CMake, Autotools, MSBuild, B2 and others. It is also extensible, enabling users to easily add support for custom or proprietary build systems, which are common in enterprise organizations. With Conan, you can build and package components regardless of what build system each component uses.</div>)
    }, {
      "question": "Can Conan manage different versions of the same library/package?",
      "answer": (<div className="pb-2">Yes, Conan has <Link href="https://docs.conan.io/2/tutorial/consuming_packages/intro_to_versioning.html"><a>robust comprehension of versioning</a></Link>.  with Conan, each version of each library or package is managed independently in the repository. Any number of versions can be stored in the local cache or remote repository at the same time, each with its own pre-built binaries.  This is great when you have different applications which depend on different versions of the same library or package, or when you want to want to switch the version of a dependency for a given project.  Both cases are trivial and fully supported.</div>)
    }, {
      "question": "Can I create my own private repository for hosting Conan packages?",
      "answer": (<div className="pb-2">Yes, Conan includes the ability to <Link href="https://docs.conan.io/2/introduction.html#decentralized-package-manager"><a>create and host private Conan repositories</a></Link> for sharing packages. JFrog’s “Artifactory” application is the premier enterprise repository hosting platform for Conan packages. Artifactory CE for C and C++ is a free edition, which is designed to provide the C and C++ developer community with the ability to create and host Conan repositories at no cost, and with the benefits of maturity and robustness of the Artifactory server application. JFrog also provides Artifactory hosted as a cloud service which Conan repositories can be created and hosted there as well.</div>)
    }, {
      "question": "What platforms can I use Conan with?",
      "answer": (<div className="pb-2"><Link href="https://docs.conan.io/2/introduction.html#all-platforms-all-build-systems-and-compilers"><a>Conan is multi-platform</a></Link>. This means two things. First, it means that the Conan client can run on Linux, Windows, macOS, and anywhere else python can run. Second, it means that it can build and store packages for any platform. If you have a compiler or cross-compiler which can target a platform, Conan can store the binaries for it. Common examples include mobile platforms like Android and IOS, real- time hardware platforms, and embedded hardware platforms including bare-metal devices.</div>)
    }, {
      "question": "Is Conan Stable?",
      "answer": (<div className="pb-2">Yes. Conan maintains a <Link href="https://docs.conan.io/2/introduction.html#stable"><a>strong commitment to stability</a></Link>. Packages built with a major version such as Conan 1.x will continue to work for all future Conan 1.x versions. If there’s a breaking change to the package model, it won’t happen until the next major Conan version is released (such as 2.x for example).</div>)
    }, {
      "question": "How is Conan licensed?",
      "answer": (<div className="pb-2">The Conan project is published with the very permissive MIT license.</div>)
    }, {
      "question": "How is the Conan project maintained?",
      "answer": (<div className="pb-2"><Link href="https://jfrog.com"><a>JFrog Inc.</a></Link> maintains Conan with a dedicated full-time development team. This team includes the Conan founders, and several additional developers. The Conan team also has a formal community engagement and feedback strategy known as the <Link href="/tribe"><a>Conan Tribe</a></Link>. The tribe is composed of over 70 volunteers from the Conan user community who have committed to providing input on major road map decisions whenever the Conan team requests it.</div>)
    }, {
      "question": "How active is the Conan project?",
      "answer": (<div className="pb-2">In addition to a team of full-time maintainers, Conan has a very active user community which submits dozens of pull requests each month. In 2020, Conan received over <Link href="https://github.com/conan-io/conan-io.github.io/pulls"><a>3500 PRs</a></Link> in total. Also, the <Link href="https://cpplang.slack.com/#conan"><a>Conan slack channel</a></Link> has 1200 members, and is one of the most active channels in the <Link href="https://cppalliance.org/slack/"><a>C++ community</a></Link>.</div>)
    }, {
      "question": "What resources exist to help me learn Conan?",
      "answer": (<div className="pb-2">The Conan team has created multiple interactive, self-paced Conan training courses. These courses are all available completely free, courtesy of JFrog in the <Link href="https://academy.jfrog.com/series/conan/"><a>JFrog academy</a></Link>.</div>)
    }
  ]

  var questionsLeft = [];
  var questionsRight = [];
  var answers = [];


  for (const [i, faq] of faqs.entries()) {
    if ((i % 2) == 1){
      questionsLeft.push(<li className="faq-anchor"><Link href={"#faq-"+i}><a>{faq.question}</a></Link></li>)
    } else {
      questionsRight.push(<li className="faq-anchor"><Link href={"#faq-"+i}><a>{faq.question}</a></Link></li>)
    }
    answers.push(<li className="faq-element">
      <div className="top d-flex justify-content-between" id={"faq-"+i}>
        <h3 className="question pt-1 pr-2">{faq.question}</h3>
        <div className="arrow d-none">
          <svg fill="none" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49986 18.3722L17.0002 11.8722L7.49998 5.30793" stroke="#A5A5A5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
      <div className="bottom">
        <div className="answer">
          <div className="pb-2">{faq.answer}</div>
        </div>
      </div>
    </li>)
  }

  return (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
          <section id="faqHero" className="position-relative sub-page-hero">
            <div className="container py-3 py-md-5">
              <div className="row">
                <div className="col-12 text-center">
                  <div className="hero-content py-3">
                    <h1 className="black py-4">
                      Frequently Asked Questions
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section id="faqQuestions" className="faq-questions pt-5">
            <div className="container pb-4 pb-md-5">
              <div className="row">
                <div className="col-lg-6" id="faqWrapperLeft">
                  <ul id="faqQuestionsListLeft" className="py-0 px-2 m-0">
                    {questionsLeft}
                  </ul>
                </div>
                <div className="col-lg-6" id="faqWrapperRight">
                  <ul id="faqQuestionsListRight" className="py-0 px-2 m-0">
                    {questionsRight}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="container">
            <div className="px-2">
              <div className="faq-separator d-md-none"></div>
            </div>
          </div>

          <section id="faqContent" className="faq-content mb-5 py-4 py-md-5">
            <div className="container">
              <ul id="faqAccordion" className="p-0 m-0 list-unstyled">
                {answers}
              </ul>
            </div>
          </section>

        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default FaqPage
