import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { ConanKitchenHeader, ConanFooter } from '@/components';
import {
  FcWorkflow,
  FcMultipleDevices,
  FcDeployment,
  FcSupport,
  FcElectronics,
  FcAdvance,
  FcPuzzle,
  FcMultipleInputs,
  FcMindMap,
  FcTodoList,
  FcCollaboration,
  FcConferenceCall,
  FcAcceptDatabase } from "react-icons/fc";
import { LuBinary } from "react-icons/lu";
import { SiConan, SiJfrog } from "react-icons/si";
import { RiOpenSourceFill } from "react-icons/ri";


const WhyConan = () => (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <img src="/conan-cubes.svg" className="d-none d-lg-block position-absolute hero-bg" alt="Conan C++ Package Manager"></img>
          <section className="pt-mt-4">
            <Container className="conancontainer mt-4 mb-4">
            <h1 className="text-center black">Why adopt Conan in your C++ workflows</h1>
            </Container>
          </section>
          <section id="why" className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Best <b>binary</b> management that saves developers and CI time and resources</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><SiConan className="conanIconBlue conanIcon34 me-1"/></Col>
                    <Col xs="auto" md="auto" className="justify-content-center"><FcAdvance className="conanIcon34"/></Col>
                    <Col xs="auto" md="auto" className="justify-content-center"><LuBinary className="conanIcon34"/></Col>
                    <Col xs="auto" md="auto" className="justify-content-center"><FcAdvance className="conanIcon34"/></Col>
                    <Col xs="auto" md="auto" className="justify-content-center"><FcDeployment className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan can create, upload to your own server, store and efficiently retrieve pre-compiled binaries for your C++ development workflows, with full control over the ABI binary compatibility.
                    </p>
                    <p className="text-justify">
                      With its unique novel architecture designed specifically for native C and C++ binaries, Conan can upload and download the binaries for all different platforms, OSs, compilers, architecture, cross-builds, with exactly the same commands, and store and manage them in the same place, no need for a different technology or solution in every platform. Decrease the time needed to add support for new CPU architectures and compiler versions - from weeks to hours.
                    </p>
                    <p className="text-justify">
                      Storing your pre-built binaries allows faster development times, saving time and money in CI builds, ensuring your entire team of developers and CI machines are using exactly the same binaries, ensuring reproducibility, implementing traceability and debuggability of your supply chain and providing the compliance required by policies.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Truly <b>universal</b>, any platform, any build system, any compiler</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcMultipleDevices className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan runs on multiple platforms (Windows, Linux, OSX, FreeBSD, SunOS, etc), and it can target any platform with a powerful cross-build model, better than that provided by build systems alone. Unlike others, Conan provides first class support for all platforms equally.
                    </p>
                    <p className="text-justify">
                      If your C++ project targets multiple OSs and platforms, with Conan you can ensure you use exactly the same tools, commands, infrastructure and workflows across all of them - a single solution that will reduce a lot of duplication, burden and costs when dealing with your C++ dependencies.
                    </p>
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcSupport className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      While providing completely transparent integration with CMake, the most popular build system nowadays, Conan is build-system agnostic, and also <a href="https://docs.conan.io/2/integrations.html" rel="nofollow noopener noreferrer" target="_blank">integrates natively (without any need for CMake) with other build systems</a> like MSBuld (Visual Studio solutions), Autotools, Meson, etc, and it can be extended to natively support any build system, including proprietary ones.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
            <img src="conan-single-cube.svg" className="d-none d-lg-block position-absolute" style={{right: 0}}></img>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">The <b>extensibility</b> that the most advanced enterprises in the world need</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcPuzzle className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Because C++ projects have very different needs, Conan beyond a tool is a <a href="https://docs.conan.io/2/reference/extensions.html" rel="nofollow noopener noreferrer" target="_blank">framework for C++ package management</a>. A rich Python API allows creating user custom commands to provide a unified interface for developers and CI to all custom extensions.
                    </p>
                    <p className="text-justify">
                      Extracting artifacts from Conan packages to deploy them in different systems can be done with custom deployers, and there are plugins to define the desired custom binary compatibility, command wrappers or dynamic configuration.
                    </p>
                    <p className="text-justify">
                      Commands provide documented json output of dependency graphs, packages-lists, cache paths, profiles, and many more. Custom settings allow to define your own compilers, versions, microprocessor, architectures, and any other specialized configuration that your project might need.
                    </p>
                    <p className="text-justify">
                      The <a href="https://docs.conan.io/2/reference/commands/config.html#conan-config-install" rel="nofollow noopener noreferrer" target="_blank">configuration install system</a> allows to automate the sharing and installation of all those extensions easily, together with many other configurable items, like the definitions of remote repositories.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center"><b>Manage your tools</b> to improve your native, <b>embedded and cross-build</b> flows</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcMultipleInputs className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>

                    <p className="text-justify">
                      C++ projects often need to use many different tools like build systems, compilers, toolchains, analyzers, etc. Setting up those tools in different operating systems, developers machines, continuous integration agents ensuring reproducibility and allowing easy and automatic update of the tools versions used without breaking the builds can be challenging.
                    </p>
                  </Row>
                  <Row style={{margin: '0px 40px 0px 40px'}}>
                    <Col>
                      <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                        <Col xs="auto" md="auto" className="justify-content-center"><FcElectronics className="conanIcon34"/></Col>
                      </Row>
                      <Row style={{margin: '0px 10px 0px 0px'}} className="mt-4 text-center justify-content-md-center">
                        <p className="text-justify">
                          Is it possible to create <a href="https://docs.conan.io/2/tutorial/consuming_packages/use_tools_as_conan_packages.html" rel="nofollow noopener noreferrer" target="_blank">Conan packages that store these tools</a>, so they will be automatically installed, updated and used by all developers and CI agents, and manage them in exactly the same way that other packages: creating, uploading and installing them from your own servers, having a centralized solution for all your packages, both libraries and tools.
                        </p>
                      </Row>
                    </Col>
                    <Col>
                      <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                        <Col xs="auto" md="auto" className="justify-content-center"><FcMindMap className="conanIcon34"/></Col>
                      </Row>
                      <Row style={{margin: '0px 00px 0px 10px'}} className="mt-4 text-center justify-content-md-center">
                        <p className="text-justify">
                          The Conan graph model allows an advanced usage of tools requirements for native, embedded and <a href="https://docs.conan.io/2/tutorial/consuming_packages/cross_building_with_conan.html" rel="nofollow noopener noreferrer" target="_blank">cross-building scenarios</a> that build systems alone or other package managers can&apos;t handle. Managing your tools in an unified way ensures better reproducibility, traceability and developer convenience.
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Move faster, integrate changes at scale with confidence</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcWorkflow className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan graph model is capable of advanced modeling the different relationships between packages, like executables, shared libraries, static libraries or header-only libraries and package libraries that can be both built as shared or static. Together with the analysis of how the different versioning scheme and changes in dependencies versions affect the package binaries, allows Conan to determine which packages need to be built when changes happens in upstream dependencies, enabling both safe (ensuring that packages that need to be rebuilt are rebuilt) and optimal (ensuring that packages that don&apos;t need to be built from source aren&apos;t) builds are performed.
                    </p>
                    <p className="text-justify">
                      Standard <a href="https://docs.conan.io/2/tutorial/versioning.html" rel="nofollow noopener noreferrer" target="_blank">versioning mechanisms</a> like version-ranges allow you to move fast, to automatically update the dependencies to the latest matching versions, for getting the latest bug fixes and security patches quickly into your builds. Lockfiles allow to have fully reproducible dependencies, irrespective of the release of new versions, it is always possible to reproduce exactly the same dependencies for reproducible builds.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Automate the storage of open-source third parties. Manage your metadata. Be <b>compliant</b>.</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcAcceptDatabase className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Creating software is more than building code, and very often, managing other aspects of the software life-cycle is important. Conan is able to automatically store and backup in your own server third-parties tarballs downloaded from the internet, so future builds can be guaranteed, no matter what happens to those internet sources, increasing your builds compliance, reproducibility and security.
                    </p>
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcTodoList className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      C++ builds often generate build logs, tests, test results, code analysis and other side metadata files that are not strictly necessary for further builds, but different industries policies and compliance rules require to manage. Conan can store all this metadata together with the packages, without impacting the performance of package usage and retrieval.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">The freedom of free and <b>open source</b>. Stable and supported by a dedicated team</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><RiOpenSourceFill className="conanIconBlue conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan is completely <a href="https://github.com/conan-io" rel="nofollow noopener noreferrer" target="_blank">free and open source</a>, with the very permissive MIT license. That means that you can use Conan freely for all kinds of projects, including commercial ones, without any restriction or limitation. You can also modify and adapt Conan to your needs, no lock-in.
                    </p>
                    <p className="text-justify">
                      The Conan project is sponsored by JFrog, meaning that there is a whole team dedicated to developing, improving, supporting (use <a href="https://github.com/conan-io/conan/issues" rel="nofollow noopener noreferrer" target="_blank">Github issues</a> to ask anything you need), testing and documenting Conan, with a strong commitment to stability, as the C/C++ industry needs.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Fully <b>decentralized, own your supply</b> chain for improved security, from ConanCenter to your own servers</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcCollaboration className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                    <Link href="/center">ConanCenter</Link> is a great resource, with more than 1500 popular open source packages built for a wide range of configurations in different operating systems and compilers, with a very strict contribution process, in which every contribution is reviewed by humans, and building all the binaries in our own infrastructure. But many industries, company policies or regulations don&apos;t allow or recommend using packages from the internet.
                    </p>
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><SiJfrog className="conanIconGreen conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan offers the best integration with JFrog Artifactory, including the free Artifactory CE (Community Edition), so you can easily build and <a href="https://docs.conan.io/2/devops/using_conancenter.html" rel="nofollow noopener noreferrer" target="_blank">host your own packages from the conan-center-index</a> Github open source repository, fully owning your binaries supply chain.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
          <section className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Join the large and wide Conan <b>community</b> and ecosystem</h3>
            <Row className="justify-content-md-center">
              <Col>
                <div className="mt-4 conan-card" style={{backgroundColor: "white"}}>
                  <Row style={{justifyContent: "center !important"}} className="mt-4 text-center justify-content-md-center">
                    <Col xs="auto" md="auto" className="justify-content-center"><FcConferenceCall className="conanIcon34"/></Col>
                  </Row>
                  <Row style={{margin: '40px 40px 0px 40px'}}>
                    <p className="text-justify">
                      Conan is used in production by thousands of companies, including many from the Fortune 100, in automotive, embedded, robotics, financial, gaming, industrial, engineering and many other industries. Conan client gets more than 750k downloads/month, only from PyPI (not counting our downloads page installer), making it one of the top 1% most downloaded projects there.
                    </p>
                    <p className="text-justify">
                      The “#conan” channel in the CppLang slack team counts with more than 2500 users, consistently being ranked as one of the top most active and used channels in the C++ community. Conan contributors submitted more than 5000 pull requests just in the last year, improving the recipes in ConanCenter, that centralize the knowledge of the large conan community, in the same way that Conan tools integrate that knowledge and good practices gathered along the years with a vast amount of feedback from users and contributors.
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            </Container>
          </section>
        <br/>
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );

export default WhyConan
