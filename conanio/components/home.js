function ConanHomeHero() {
  return (
    <section id="hero" className="blue-gradient-bg position-relative">
        <img src="/hero-bg.svg" className="position-absolute hero-bg" alt="Conan C++ Package Manager" />
        <div className="container py-5">
            <div className="row">
                <div className="col-12 text-center">
                    <div className="hero-content py-3">
                        <h1 className="white">
                            Conan, the C/C++ Package Manager
                        </h1>
                        <h2 className="homepage-hero-paragraph my-3 px-0 px-md-4 white">
                            The open source, decentralized and multi-platform package <br className="d-none d-md-inline" />
                            manager to create and share all your native binaries.
                        </h2>
                        <div className="downloads-cta arrow-cta">
                            <div className="button_cont">
                                <a href="downloads.html" className="example_f cta bg-green" id="download_btn_middle">
                                        <span>
                                            Download
                                        </span>
                                </a>
                            </div>
                        </div>
                        <div className="training row justify-content-center">
                            <div id="ytPlayer" className="training-video"></div>
                            <a className="training-text white text-left ml-3" href="https://academy.jfrog.com/path/conan" alt="JFrog Academy" rel="noreferrer" target="_blank">
                                <span>Learn Conan C / C++ </span>
                                <br/>
                                <span>Package Management</span>
                                <br/>
                                <div className="green mt-1">
                                    <div>
                                        <img
                                        alt="JFrog Academy" className="mr-2 lazy"
                                        src="/hat.png" style={{ width:'30px' }}/>
                                        JFrog Academy
                                        <img
                                        alt="JFrog Academy" className="mr-2 lazy"
                                        src="/left-arrow.svg" style={{ width:'10px', transform: 'rotateZ(180deg)'}}/>
                                    </div>
                                </div>
                                <hr className="dotted green"/>
                                <span className="xs-text">Join our hands-on free training</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

function ConanHomeBanner() {
  return (
    <section id="homeBanner" className="home-banner bg-dark" style={{backgroundImage: 'url(/banner-bg.png)'}}>
        <div className="container">
            <div className="banner-wrapper d-flex flex-column flex-lg-row align-items-center py-4 py-lg-2 h-100 justify-content-center">
                <img src="/banner-tribe.png" alt="Meet The Tribe"/>
                <div className="mx-3 m content mw-100 h-100 d-flex flex-nowrap flex-lg-wrap flex-column align-items-center align-items-lg-start justify-content-center text-white">
                    <h2 className="text-uppercase text-center text-lg-left">Meet the CONAN 2.0&nbsp;TRIBE</h2>
                    <p className="mb-0 pb-3 text-center text-lg-left">
                        A group of more than 70 Conan expert users and contributors helping to define the next Conan 2.0 major version.
                    </p>
                </div>
                <a href="/tribe.html" className="green-cta text-white">
                    Learn more
                </a>
            </div>
        </div>
    </section>
  )
}

function ConanHomeDiagram() {
  return (
    <section className="diagram py-3" id="diagram">
        <div className="container py-3">
            <div className="row">
                <div className="col-12 text-center diagram-wrapper">
                    <img src="/diagram.svg" alt="Conan C/C++ Package Manager Decentralized Architecture"
                        className="d-none d-sm-inline" />
                    <img src="/diagram-mobile.png" alt="Conan C/C++ Package Manager Decentralized Architecture"
                        className="d-sm-none img-fluid" />
                </div>
            </div>
        </div>
    </section>
  )
}

function ConanHomeAdvantages() {
  return (
    <section className="advantages py-0 py-md-5 bg-blue" id="advantages">
        <div className="container py-0 py-md-5">
            <div className="row">

                <div className="col-md-4 adv-col border-white py-5 py-md-0">
                    <div className="advantage border-white text-center white text-center">
                        <div className="img">
                            <img className="lazy" src="/advantages/gear.svg" alt="UNIVERSALITY" />
                        </div>
                        <h4 className="mt-3 font-weight-bold">UNIVERSALITY</h4>
                        <div className="advantage-text text-left">
                            <p className="mt-3 font-weight-light line-1">
                                <strong>All platforms.</strong> Windows, Linux, Apple, FreeBSD, Android, iOS, embedded,
                                cross-building, bare metal, etc.
                            </p>
                            <p className="line-2">
                                <strong>All build systems.</strong> Visual Studio MSBuild, CMake, Makefiles, SCons, etc.
                                Extensible to any build system.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 adv-col border-white py-5 py-md-0">
                    <div className="advantage border-white text-center white text-center">
                        <div className="img">
                            <img className="lazy" src="/advantages/speed.svg" alt="FLEXIBILITY & SPEED" />
                        </div>
                        <h4 className="mt-3 font-weight-bold">FLEXIBILITY & SPEED</h4>
                        <div className="advantage-text text-left">
                            <p className="mt-3 font-weight-light line-1">
                                <strong>Full management of binaries. </strong> <br />
                                Create, manage and reuse any number of binaries, for any configuration: platform,
                                compiler, version, architectures… or build from sources at will.
                            </p>
                            <p className="line-2">
                                <strong>Fully automated dependency management.</strong> Transitive dependencies,
                                conflicts detection, dependency overriding, conditional dependencies.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 adv-col border-white py-5 py-md-0">
                    <div className="advantage text-center white text-center">
                        <div className="img">
                            <img className="lazy" src="/advantages/control.svg" alt="FLEXIBILITY & SPEED" />
                        </div>
                        <h4 className="mt-3 font-weight-bold">CONTROL</h4>
                        <div className="advantage-text text-left">
                            <p className="mt-3 font-weight-light line-1">
                                <strong>Decentralized client-server architecture.</strong> Run your own server for free
                                with JFrog Artifactory on-prem to fully own your packages and binaries.
                            </p>
                            <p>
                                <strong>Conan is Free, open source software</strong> with the permissive MIT license.
                                Use, modify, redistribute, and extend it - even for commercial purposes.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

function ConanHomeLearnMore() {
  return (
    <section className="learn-more bg-bright-gray py-0 py-md-5 position-relative" id="learnMore">
        <img src="/lm-bg.svg" alt="Conan C++ Package Manager"
             className="lm-bg position-absolute lazy d-none d-xl-inline" />
        <div className="container text-center">
            <div className="row pb-2 pt-4 pt-md-5 py-md-5 mb-4">
                <div className="col-12">
                    <div className="h2">LEARN MORE ABOUT</div>
                </div>
            </div>

            <div className="row mt-1">
                <div className="col-md-4">
                    <div className="lm-obj position-relative">
                        <h3 className="position-absolute text-center">
                            <span className="bg-bright-gray"> CONAN </span>
                        </h3>
                        <div className="content one-advantage-content">
                            <p className="text">
                                Conan is a MIT-licensed, Open Source package manager for C and
                                C++ development, allowing development teams to easily and
                                efficiently manage their packages and dependencies across
                                platforms and build systems.
                            </p>
                            <a href="https://docs.conan.io/en/latest/introduction.html" className="big-btn bg-blue white" rel="noopener">
                                Learn More {'>'}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-5 mt-md-0">
                    <div className="lm-obj position-relative">
                        <h3 className="position-absolute text-center">
                            <span className="bg-bright-gray"> ARTIFACTORY CE </span>
                        </h3>
                        <div className="content one-advantage-content">
                            <p className="text">
                                JFrog Artifactory Community Edition C/C++, which is completely
                                free to use, allows you to host your private packages on your
                                own server. This solution delivers all the power and
                                flexibility of JFrog Artifactory for Conan to the C/C++ world.
                            </p>
                            <a href="https://docs.conan.io/en/latest/uploading_packages/artifactory/artifactory_ce.html"
                               className="big-btn bg-blue white" rel="noopener">
                                Learn More {'>'}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-5 mt-md-0">
                    <div className="lm-obj position-relative">
                        <h3 className="position-absolute text-center">
                            <span className="bg-bright-gray"> CONAN CENTER </span>
                        </h3>
                        <div className="content one-advantage-content">
                            <p className="text">
                                <a href="https://conan.io/center/" className="text-link">
                                    ConanCenter </a> is the central repository where you can search and
                                discover all of the available open source Conan packages
                                created by the community. It includes recipe and configuration
                                information, and makes it easy to see package metadata in the
                                UI.
                            </p>
                            <a href="https://conan.io/center/" className="big-btn bg-blue white" rel="noopener">
                                Learn More {'>'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="py-5 spacer"></div>
    </section>
  )
}

function ConanHomeSignUp() {
  return (
    <section
      id="signUp"
      className="sign-up py-5 bg-blue white text-center"
      style={{background: 'linear-gradient(265.35deg, #2C4257 51.72%, #7BA7D3 98.82%)'}}
    >
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="h2 white d-flex justify-content-center" id="signUpTitle">
                        <div className="position-relative"><img src="/letter.svg" alt="Sign Up"
                                                            className="position-absolute letter lazy"/></div>
                        <span>SIGN ME UP FOR RELEASE UPDATES</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

function ConanHomeMeetTheTribe() {
  return (
    <section className="meet-the-tribe bg-mid-blue py-5 white" id="meetTheTribe">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="h2 white text-center mt-2 mb-4">CONAN 2.0 TRIBE</div>
                    <p className="text text-center white">
                        A group of more than 70 Conan expert users and contributors <br className="d-none d-sm-inline"/> helping to define the next Conan 2.0 major version.
                    </p>
                    <div className="text-center mt-4">
                        <a href="/tribe.html" className="big-btn bg-blue white d-inline-block" rel="noopener">Learn More </a>
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
      <ConanHomeBanner/>
      <ConanHomeDiagram/>
      <ConanHomeAdvantages/>
      <ConanHomeLearnMore/>
      <ConanHomeSignUp/>
      <ConanHomeMeetTheTribe/>
    </div>
  )
}
