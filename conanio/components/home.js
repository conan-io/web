import Link from 'next/link';
import Slider from 'react-slick';


function ConanHomeHero() {
  return (
    <section id="hero" className="position-relative">
        <img src="/conan-cubes.svg" className="d-none d-lg-block position-absolute hero-bg" alt="Conan C++ Package Manager"></img>

        <Link href="#mktoForm_1479"><a className="btn conan-blue-gradient-bg position-fixed get-involved-btn pl-3 pr-3 d-none d-lg-block">Get involved</a></Link>

        <div className="container py-5">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <div className="hero-content py-3">
                        <h1 className="black">Conan, software package manager for C and C++ developers</h1>
                        <h2 className="homepage-hero-paragraph my-3 black">
                            The open source, decentralized and multi-platform package <br className="d-none d-md-inline"/>
                            manager to create and share all your native binaries.
                        </h2>
                        <div className="d-inline">
                            <Link href="/downloads" ><a className="btn conan-blue-gradient-bg ml-0" id="download_btn_top"><span>Downloads</span></a></Link>
                            <Link href="https://docs.conan.io/2/tutorial.html"><a className="btn conan-blue-border bg-white ml-lg-4" id="get_started_btn_top"><span>Get Started</span></a></Link>
                            <Link href="/why-conan"><a className="btn conan-blue-border bg-white ml-lg-4" id="why_use_conan"><span>Why use Conan?</span></a></Link>
                        </div>
                    </div>
                </div>
              <div className="col-3"><img src="/jfrog-mascot.svg"></img></div>
            </div>
        </div>
    </section>
  )
}

function Conan2OutNow() {
  return (
    <section id="conan-2-out-now" className="conan-blue-to-dark-gradient-bg py-3">
      <div className="container">
        <div className="row p-2 d-flex justify-content-around align-items-center">
          <div className="d-none d-md-inline"><img src="/sparks_left.svg"></img></div>
          <div className="col-auto text-center text-white">
            <h1>Conan 2.0 Is Out Now</h1>
            <div className="d-inline">
              <Link href="https://docs.conan.io/2/whatsnew.html">
                <a className="btn conan-blue-border bg-white font-weight-bold" id="whats_new_btn_middle">
                  <span>What&apos;s new in 2.0</span>
                </a>
              </Link>
            </div>
            <div className="d-inline">
              <Link href="https://blog.conan.io/2023/02/22/Conan-2.0.html">
                <a className="btn conan-white-border white ml-lg-2" id="read_blogpost_btn_middle">
                  <span>Read our blog post</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="d-none d-md-inline"><img src="/sparks_right.svg"></img></div>
        </div>
      </div>
    </section>
  )
}

function ConanHomeAdvantages() {
  return (
    <section className="advantages py-0 pt-5" id="advantages">
      <div className="container py-0 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-3 pb-3 pb-lg-0">
            <div className="advantage text-center black text-center conan-card">
              <h4 className="mt-3 text-left font-weight-bold">Conan is universal and portable.</h4>
              <div className="advantage-text text-left pb-2">
                <p className="mt-3 line-1">
                  It works in all operating systems including Windows, Linux, OSX, FreeBSD, and others,
                  and it can target any platform, including desktop, server,
                  and cross-building for mobile (Android and iOS), as well as embedded and bare metal devices.
                  It integrates with other tools like Docker, MinGW, WSL,
                  and with all build systems such as CMake, MSBuild, Makefiles, Meson, SCons.
                  It can even integrate with any proprietary build systems.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 pb-3 pb-lg-0">
            <div className="advantage text-center black text-center conan-card">
              <h4 className="mt-3 text-left font-weight-bold">Conan is open source and completely free.</h4>
              <div className="advantage-text text-left pb-2">
                <p className="mt-3 line-1">
                  It has native integration with JFrog Artifactory,
                  including the free Artifactory Community Edition for Conan,
                  enabling developers to host their own private packages on their own server.
                  Conan is developed by a full team of full-time maintainers who support many thousands of users,
                  from small to big enterprises, alongside an active and awesome community.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 pb-3 pb-lg-0">
            <div className="advantage text-center black text-center conan-card">
              <h4 className="mt-3 text-left font-weight-bold">Conan can manage any number of different binaries.</h4>
              <div className="advantage-text text-left pb-2">
                <p className="mt-3 line-1">
                  Not only different binaries but also different build configurations,
                  including different architectures, compilers, compiler versions, runtimes,
                  C++ standard library, etc. When binaries are not available for one configuration,
                  they can be built from sources on-demand. Conan can create, upload and download binaries
                  with the same commands and flows on every platform,
                  saving lots of time in development and continuous integration.
                </p>
              </div>
            </div>
          </div>
        </div>
        <img src="conan-single-cube.svg" className="d-none d-lg-block position-absolute" style={{right: 0}}></img>
        <div className="row d-flex py-md-5 align-items-stretch justify-content-center">
          <Link href="https://docs.conan.io/2/introduction.html"><a className="learn-more-ce-link" id="learn_more_btn_middle">Learn more about Conan</a></Link>
        </div>
      </div>
    </section>
  )
}

function ConanHomePlaces() {
  return (
    <section className="places py-3" id="places">
      <div className="container py-5">
        <div className="row d-flex justify-content-center pb-5">
          <div className="col-md-auto py-3 d-flex justify-content-center"><img src="/artifactory-logo.svg"></img></div>
          <div className="col-8 col-md-6 text-left places-wrapper">
            <h4 className="font-weight-bold">Artifactory Community Edition for C and C++</h4>
            <p>
              Artifactory Community Edition (CE) for C and C++ is the recommended server
              for development and hosting private packages for a team or company.
              It is completely free, and it features a WebUI, advanced authentication and permissions,
              great performance and scalability, a REST API, a generic CLI tool and generic repositories
              to host any kind of source or binary artifact.
            </p>
            <div className="d-inline">
              <Link href="/downloads">
                <a className="btn artifactory-green-gradient-bg mt-2"id="artifactory_btn_middle"><span>Download Artifactory CE</span></a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-auto py-3 d-flex justify-content-center"><img src="/conancenter-logo.svg"></img></div>
          <div className="col-8 col-md-6 text-left places-wrapper">
            <h4 className="font-weight-bold">ConanCenter, the place to find and share popular C and C++ Conan packages</h4>
            <p>
              ConanCenter is the central repository where you can search and discover all the available
              open source Conan packages created by the community. It includes recipe and configuration information,
              and makes it easy to see package metadata in the UI. ConanCenter contains more than a thousand
              popular open source libraries packages, with many pre-compiled binaries for mainstream compiler versions and platforms.
            </p>
            <div className="d-inline">
              <Link href="/center">
                <a className="btn conan-blue-gradient-bg white font-weight-bold" id="conancenter_btn_middle"><span>Explore Conan libraries and tools</span></a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConanHomeTribe() {
  return (
    <section id="homeTribe" className="home-tribe text-black">
      <div className="container py-4">
        <div className="row d-inline d-lg-none">
          <div className="col-12 d-flex justify-content-center">
            <img src="/tribe-banner.svg" alt="Meet The Tribe"></img>
          </div>
        </div>
        <div className="row d-inline d-lg-none">
          <div className="col-12 d-flex justify-content-center">
            <h2 className="text-uppercase text-center text-lg-left">Meet the CONAN 2.0&nbsp;TRIBE</h2>
          </div>
        </div>
        <div className="row d-inline d-lg-none">
          <div className="col-12 d-flex justify-content-center">
            <p className="mb-0 pb-3 text-center">
              A group of more than 70 Conan expert users and contributors that helped to define Conan 2.0.
            </p>
          </div>
        </div>
        <div className="row d-inline d-lg-none">
          <div className="col-12 d-flex justify-content-center">
            <Link href="/tribe"><a className="btn conan-blue-gradient-bg">Learn more</a></Link>
          </div>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="col-4 d-none d-lg-inline">
            <img src="/tribe-banner.svg" alt="Meet The Tribe"></img>
          </div>
          <div className="col-5 d-none d-lg-inline">
            <h2 className="text-uppercase text-center text-lg-left">Meet the CONAN 2.0&nbsp;TRIBE</h2>
            <p className="mb-0 pb-3 text-left">
              A group of more than 70 Conan expert users and contributors that helped to define Conan 2.0.
            </p>
            <div className="d-lg-block d-flex justify-content-center">
              <Link href="/tribe"><a className="btn conan-blue-gradient-bg">Learn more</a></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

function ConanHomeCustomerSuccess() {
  return (
    <section className="testis py-3 customer-success" id="testis">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center mt-2 mb-4 font-weight-bold">CUSTOMER SUCCESS STORIES</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="testi-cartousel-wrapper">
              <div className="testis-carousel success-stories">
                <Slider {...settings}>
                    <div className="testi" >
                      <div className="inner row">
                        <div className="col-8">
                          <h5>TomTom Navigation</h5>
                          <p className="text text-left">
                            TomTom fast tracks their delivery cycle with Conan
                          </p>
                          <Link href="/user-stories/tomtom"><a className="btn conan-blue-gradient-bg" id="download_tomtom"><span>Download</span></a></Link>
                        </div>
                        <div className="col-4 pr-5">
                          <img className="success-icon-bg mx-auto" src="https://media.jfrog.com/wp-content/uploads/2022/04/20102313/tomtom-page1.png"></img>
                        </div>
                      </div>
                    </div>

                    <div className="testi">
                      <div className="inner row">
                        <div className="col-8">
                          <h5>Real-Time Innovations</h5>
                          <p className="text text-left">
                            Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory
                          </p>
                          <Link href="/user-stories/rti"><a className="btn conan-blue-gradient-bg" id="download_rti"><span>Download</span></a></Link>
                        </div>
                        <div className="col-4 pr-5">
                          <img className="success-icon-bg mx-auto" src="https://media.jfrog.com/wp-content/uploads/2021/09/02140348/conan-rti-pdf-cover.png"></img>
                        </div>
                      </div>
                    </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConanHomeUsers() {
  return (
    <section className="users my-4 pt-2 pt-md-5" id="users">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center py-2 mb-4 mb-md-5 font-weight-bold">OUR USERS</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-12 users-flex d-flex justify-content-center align-content-center">
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_29.png" alt="Poco"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_27.png" alt="Huawei"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_28.png" alt="Pix4D"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_26.png" alt="Keysight"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_25.png" alt="Microblink"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_32.png" alt="Mercedes Benz"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_33.png" alt="Melexis"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_34.png" alt="OpenROV"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_30.png" alt="Arxan"></img>
            </div>
            <div className="user-box d-flex justify-content-center align-content-center conan-card">
              <img className="" src="/brands/company_31.png" alt="Plex"></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConanHomeUsersVoices() {
  return (
    <section className="testis pb-5 users-voice-bg users-voices" id="testis">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="testi-cartousel-wrapper">
              <div className="testis-carousel users-voice">
                <Slider {...settings}>

                  <div className="testi" >
                    <div className="inner row">
                      <div className="col-12">
                        <div className="text-center company-logo">
                          <img src="/brands/company_41.png" alt="TomTom" className="mx-auto"></img>
                        </div>
                        <p className="text text-center mx-auto company-quote">
                          We started to see that we could speed up our development chain
                          by producing binary artifacts that could be shared across developers
                          - we could actually shorten the build times
                          because they don’t have to be built over again.
                        </p>
                        <div className="quote d-flex align-items-center justify-content-center my-3">
                          <span className="line"></span>
                          <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                          <span className="line"></span>
                        </div>
                        <div className="name text-center">Maikel van den Hurk</div>
                        <div className="position text-center font-weight-bold">
                          Principal Software Engineer at TomTom
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner row">
                      <div className="col-12">
                        <div className="text-center company-logo logo-squared">
                          <img src="social/github.svg" alt="GitHub" className="mx-auto"></img>
                        </div>
                        <p className="text text-center mx-auto company-quote">
                          Conan makes it easier for our many automotive GitHub Enterprise customers
                          doing C and C++ programming to establish a continuous delivery pipeline
                          that actually deserves that name.
                        </p>
                        <div className="quote d-flex align-items-center justify-content-center my-3">
                          <span className="line"></span>
                          <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                          <span className="line"></span>
                        </div>
                        <div className="name text-center">Johannes Nicolai</div>
                        <div className="position text-center font-weight-bold">
                          Enterprise Solutions Engineer at GitHub
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="logo/microblink.png" alt="microblink"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan integration enabled a 10x reduction in our
                        development compile-test cycle and release build times,
                        enabling extra coding time for devs and much quicker
                        BlinkID SDK releases. Organizing our codebase into
                        multiple packages enabled us easier maintenance. On top of
                        that, the dependency graph visualizer is great for every
                        developer to see the overview of all modules/packages, as
                        well as their individual contribution to the complete
                        project.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Nenad Mikša</div>
                      <div className="position text-center font-weight-bold">
                        Compiler Whisperer at Microblink
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo logo-squared">
                        <img className="mx-auto" src="/brands/company_37.png" alt="tanker"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        I’ll simply say that I was a total n00b in build systems
                        before, dreading to update dependencies. Conan made it
                        easy and likeable, I’m now really interested in
                        packaging... Weird for a C++ programmer!
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Theo Delrieu</div>
                      <div className="position text-center font-weight-bold">
                        R&D Engineer at Tanker
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="/our-users/disbelief.svg" alt="disbelief"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan’s flexibility made it possible to do something that
                        was thought intractable; to make a modular Boost C++
                        Libraries distribution.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Rene Rivera</div>
                      <div className="position text-center font-weight-bold">
                        Boost.Build and Boost.Predef author and lead programmer at
                        Disbelief LLC
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="/our-users/keysight.svg" alt="keysight"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        What is best in life? Crushing your build times, driving
                        your semantically versioned packages before you, and not
                        hearing the lamentations of your developers
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Daniel Greidinger</div>
                      <div className="position text-center font-weight-bold">
                        Software Architect at Keysight Technologies
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="/brands/company_32.png" alt="Mercedes-Benz"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan has amplified our productivity, by minimizing the
                        build times and implement full fled CI features for our
                        C and C++ development. Its the true dependency manager for
                        C and C++
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Siva Mandadi</div>
                      <div className="position text-center font-weight-bold">
                        Sr Devops Lead Engineer at Mercedes-Benz R&D
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="/our-users/melexis.svg" alt="melexis"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan brings C++ development and dependency management
                        into the 21st century and on par with the other
                        development eco-systems. We are currently designing this
                        in to streamline the development of test programs for our
                        products to help facilitate reuse and help our distributed
                        teams develop the robust and efficient tests to guarantee
                        the quality of our innovative products.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Peter Tillemans</div>
                      <div className="position text-center font-weight-bold">
                        IT Manager at Melexis
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="text-center company-logo">
                      <img className="mx-auto" src="/our-users/arxan.svg" alt="arxan"></img>
                    </div>
                    <div className="inner">
                      <p className="text text-center company-quote mx-auto">
                        Conan helped us with our infrastructure overhaul by
                        reducing our full build time by over 40 minutes. That has
                        saved us both Developer time and reduced our AWS bill.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Derian Reuss</div>
                      <div className="position text-center font-weight-bold">
                        DevOps Lead at Arxan Technologies
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="text-center company-logo">
                      <img className="mx-auto" src="logo/pix4d.png" alt="pix4d"></img>
                    </div>
                    <div className="inner">
                      <p className="text text-center company-quote mx-auto">
                        At Pix4D, we suffered for years the pain of managing a few
                        dozens of 3rd party dependencies with our home-grown
                        tools. Not only developers were feeling that pain, but
                        also the CI/CD infrastructure. We decided to give Conan a
                        try, and it worked! It does not matter how the libraries
                        we depend on are built or provided (CMake, autotools,
                        pre-compiled binaries). Conan gives us the flexibility to
                        manage C and C++ libraries of all kinds. We have Conan fully
                        integrated in our CI system and we do pretty advanced
                        things with it. It definitely made our life easier.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Luis Díaz Más</div>
                      <div className="position text-center font-weight-bold">
                        C++ Software Developer at Pix4D
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="/our-users/appsanywhere.svg" alt="appsanywhere"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan arrived just in time to enable us to test multiple
                        networking, logging, and cryptography libraries simply by
                        adding lines to a text file. Moreover, when we did decide
                        to master a library, we invested our time into a single
                        cross-platform package, so our developers didn&apos;t need to
                        build and rebuild the library on their own. It&apos;s
                        revolutionized how we do rapid prototyping.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Gerald R. Wiltse</div>
                      <div className="position text-center font-weight-bold">
                        Manager of AppAnywhere Technology Strategy
                      </div>
                    </div>
                  </div>

                  <div className="testi">
                    <div className="inner">
                      <div className="text-center company-logo">
                        <img className="mx-auto" src="logo/imazen.png" alt="imazen"></img>
                      </div>
                      <p className="text text-center company-quote mx-auto">
                        Conan has been a lifesaver in managing cross-platform
                        packages for Imageflow. It&apos;s flexible, addresses the hard
                        problems of C and C++ package management head-on, and is
                        backed by a fantastic set of developers. Don&apos;t waste your
                        time with alternatives; this is the real deal.
                      </p>
                      <div className="quote d-flex align-items-center justify-content-center my-3">
                        <span className="line"></span>
                        <img src="/white-quote.svg" alt="" className="quote-image mx-2"></img>
                        <span className="line"></span>
                      </div>
                      <div className="name text-center">Nathanael Jones</div>
                      <div className="position text-center font-weight-bold">
                        Owner & Lead Software Engineer at Imazen
                      </div>
                    </div>
                  </div>

                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ConanHome() {
  return (
    <div>
      <ConanHomeHero/>
      <Conan2OutNow/>
      <ConanHomeAdvantages/>
      <ConanHomePlaces/>
      <ConanHomeTribe/>
      <ConanHomeCustomerSuccess/>
      <ConanHomeUsers/>
      <ConanHomeUsersVoices/>
    </div>
  )
}
