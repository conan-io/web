import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

function DownloadConanPackageManager() {
  return (
    <div className="col-lg-6 blue-downloads colored-downloads">
      <div className="downloads-item-wrapper">
        <div className="top bg-blue download-col-topper"></div>
        <div className="content px-2 px-md-4 py-2 p-md-4">
          <Tooltip id="copy-to-clipboard" />
          <Tooltip id="download" />
          <Tooltip id="go-to-conan-github" />
          <div className="small-title d-flex align-items-center"><img
              alt="Downlod Conan Open Source C and C++ Package Manager" className="mr-2 small-title-lazy"
              src="/conan-downloads-logo.svg"></img></div>
          <div className="text pb-1">
            <p className="py-3 front-text">Install the latest version of the free and open Source Conan C and C++
              package manager, to start using Conan and downloading packages from the ConanCenter.</p>
            <p className="mb-2">Recommended install (need python in your system):</p>
          </div>
          <div className="install">
            <div className="installers pb-4">
              <div className="package-wrapper d-flex flex-no-wrap mb-0">
                <div className="cn-box small"><img alt="python" className="lazy" src="/downloads/python-small-pack.svg"></img></div>
                <div className="cn-box cn-main copy-text">$ pip install conan</div>
                <a
                  className="cn-box cn-action cn-copy"
                  onClick={() => {navigator.clipboard.writeText("pip install conan")}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>
            </div>
            <p>Other Installers:</p>
            <div className="installers small-installers pb-4">
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Darwin" className="lazy" src="/downloads/darwin-small-pack.svg"></img></div>
                <div className="cn-box cn-main copy-text">$ brew install conan</div>
                <a
                  className="cn-box cn-action cn-copy"
                  onClick={() => {navigator.clipboard.writeText("brew install conan")}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Debian" className="lazy" src="/downloads/debian-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Ubuntu / Debian X64 Installer</div>
                <Link href="https://github.com/conan-io/conan/releases/latest/download/conan-ubuntu-64.deb">
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Windows" className="lazy" src="/downloads/windows-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Download x86_64 Installer</div>
                <Link href="https://github.com/conan-io/conan/releases/latest/download/conan-win-64.exe">
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Windows" className="lazy" src="/downloads/windows-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Download x86 Installer</div>
                <Link href="https://github.com/conan-io/conan/releases/latest/download/conan-win-32.exe">
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Arc Linux" className="lazy" src="/downloads/archlinux-small-pack.svg"></img></div>
                <div className="cn-box cn-main copy-text">$ yay -S conan</div>
                <a
                  className="cn-box cn-action cn-copy"
                  data-copy-value="brew install conan" onClick={() => {navigator.clipboard.writeText("yay -S conan")}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Github" className="lazy" src="/downloads/github-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Any OS:From Source</div>
                <Link href="https://github.com/conan-io/conan">
                  <a
                    className="cn-box cn-action cn-link"
                    href="https://github.com/conan-io/conan"
                    rel="nofollow"
                    data-tooltip-id="go-to-conan-github"
                    data-tooltip-content="Go to conan github repositoy"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>
            </div>
            <div className="left-downloads-spacer"></div>
            <div className="text text-two">
              <p className="text-break">Read more about Conan installation:<a className="text-break"
                  href="https://docs.conan.io/2/installation.html">https://docs.conan.io/2/installation.html
                </a></p>
            </div>
          </div>
          <div className="cta-wrapper"><a className="btn conan-blue-gradient-bg white font-weight-bold"
              href="https://docs.conan.io/2.0/tutorial.html">Getting Started With Conan</a></div>
        </div>
      </div>
    </div>
  )
}

function DownloadJFrogArtifactoryCommunityEditionForCpp() {
  let releaseVersion = "7.55.14"
  return (
    <div className="col-lg-6 mt-3 mt-lg-0 green-downloads colored-downloads">
      <div className="downloads-item-wrapper">
        <div className="top bg-green download-col-topper"></div>
        <div className="content px-2 px-md-4 py-2 p-md-4">
          <Tooltip id="copy-to-clipboard" />
          <Tooltip id="download" />
          <div className="small-title d-flex align-items-center"><img
              alt="Downlod JFrog Artifactory Community Edition for C and C++" className="mr-2 lazy"
              src="/jfrog-artifactory-ce-download-banner.svg"></img></div>
          <div className="text pb-1">
            <p className="py-3 front-text">Download the latest version of JFrog Artifactory Community Edition to host
              your own private packages on your own server - for free.</p>
            <p className="mb-2">Download:</p>
          </div>
          <div className="install">
            <div className="installers pb-4">
              <div className="package-wrapper mb-0 d-flex flex-wrap align-items-center position-relative" id="artifactoryZipPackage">
                <div className="package-wrapper d-flex flex-no-wrap">
                  <div className="cn-box small"><img alt="Linux" className="lazy" src="/downloads/jfrog-artifactory-small-pack.png"></img></div>
                  <div className="cn-box cn-main">Download tar.gz</div>
                  <Link href={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-linux.tar.gz"}>
                    <a
                      className="cn-box cn-action cn-download"
                      data-tooltip-id="download"
                      data-tooltip-content="Download"
                      data-tooltip-place="top"
                    ></a>
                  </Link>
                </div>
              </div>
            </div>
            <p>Other Installers:</p>
            <div className="installers small-installers pb-4">
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Linux" className="lazy" src="/downloads/linux-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Linux Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-linux.tar.gz"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="rpm" className="lazy" src="/downloads/rpm-small-pack.png"></img></div>
                <div className="cn-box cn-main">RPM Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/artifactory-rpms/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ releaseVersion +".rpm"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="rpm" className="lazy" src="/downloads/rpm-small-pack.png"></img></div>
                <div className="cn-box cn-main copy-text">Copy install command</div>
                <a
                  className="cn-box cn-action cn-copy"
                  data-copy-value="brew install conan" onClick={() => {navigator.clipboard.writeText('#Add artifactory.repo file to your yum repository listsudo vi /etc/yum.repos.d/artifactory.repo\n#Add the following content[Artifactory]name=Artifactorybaseurl=https://releases.jfrog.io/artifactory/artifactory-rpms/enabled=1gpgcheck=0\n#Optional - if you have GPG signing keys installed, use the below flags to verify the repository metadata signature:\n#gpgkey=https://releases.jfrog.io/artifactory/artifactory-rpms/<PATH_TO_REPODATA_FOLDER>/repomd.xml.key\n#repo_gpgcheck=1\n#Run the install commandyum update && yum install jfrog-artifactory-cpp-ce')}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="debian" className="lazy" src="/downloads/debian-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Debian Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/artifactory-debs/pool/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ releaseVersion +".deb"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="debian" className="lazy" src="/downloads/debian-small-pack.svg"></img></div>
                <div className="cn-box cn-main copy-text">Copy install command</div>
                <a
                  className="cn-box cn-action cn-copy"
                  data-copy-value="brew install conan" onClick={() => {navigator.clipboard.writeText('wget -qO - https://releases.jfrog.io/artifactory/api/gpg/key/public | apt-key add -;echo "deb https://releases.jfrog.io/artifactory/artifactory-debs{distribution} main" | sudo tee -a /etc/apt/sources.list;# To determine your distribution, run lsb_release -c or cat /etc/os-release# Example:echo "deb https://releases.jfrog.io/artifactory/artifactory-debs xenial main" | sudo tee -a /etc/apt/sources.list;apt-get update;sudo apt-get install jfrog-artifactory-cpp-ce')}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>


              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Windows" className="lazy" src="/downloads/windows-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Windows Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-windows.zip"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Windows" className="lazy" src="/downloads/compose-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Docker Compose Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/docker/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-compose.tar.gz"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap has-multiline-text">
                <div className="cn-box small"><img alt="Arc Linux" className="lazy" src="/downloads/docker-small-pack.svg"></img></div>
                <div className="cn-box cn-main copy-text">$ docker run ... </div>
                <a
                  className="cn-box cn-action cn-copy"
                  data-copy-value="brew install conan" onClick={() => {navigator.clipboard.writeText('docker run --name artifactory -d -p 8081:8081 -p 8082:8082 docker.bintray.io/jfrog/artifactory-cpp-ce:latest')}}
                  data-tooltip-id="copy-to-clipboard"
                  data-tooltip-content="Copy to clipboard"
                  data-tooltip-place="top"
                ></a>
              </div>

              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Darwin" className="lazy" src="/downloads/darwin-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Darwin Installer</div>
                <Link href={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-darwin.tar.gz"}>
                  <a
                    className="cn-box cn-action cn-download"
                    data-tooltip-id="download"
                    data-tooltip-content="Download"
                    data-tooltip-place="top"
                  ></a>
                </Link>
              </div>
            </div>

            <div className="cta-wrapper"><a className="btn artifactory-green-gradient-bg"
                href="https://docs.conan.io/2/tutorial/conan_repositories/setting_up_conan_remotes/artifactory/artifactory_ce_cpp.html">Getting Started with
                Artifactory CE</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadsPage() {
  return (
    <React.StrictMode>
      <SSRProvider>
        <ConanKitchenHeader/>
        <section className="downloads-hero position-relative pb-5" id="downloadsHero">

          <img src="/conan-cubes.svg" className="position-absolute hero-bg" alt="Conan C++ Package Manager"></img>

          <div className="container">
            <div className="row">
              <div className="col-12 py-5">
                <h1 className="black text-center">Downloads</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-5 pb-5" id="downloads">
          <div className="container">
            <div className="row pb-3 main-downloads-row ml-auto mr-auto">
              <DownloadConanPackageManager />
              <DownloadJFrogArtifactoryCommunityEditionForCpp />
            </div>
            <div className="mb-5 download-questions">
              <div className="col-12 text-center">
                <h2 className="font-weight-bold pb-3">Questions about Installation?</h2>
                <p>Check the Docs, contact the community on Slack, or ask for support in Github</p>
                <div className="d-flex justify-content-center mt-4"><a className="q-box d-block" href="https://docs.conan.io/">
                    <div className="q-top"><img alt="Docs" src="/docs.svg"></img></div>
                    <div className="q-title text-center mt-1">Docs</div>
                  </a><a className="q-box d-block" href="https://cpplang.slack.com/?id=conan">
                    <div className="q-top"><img alt="Docs" src="/social/slack.svg"></img></div>
                    <div className="q-title text-center mt-1">Slack</div>
                  </a><a className="q-box d-block" href="https://github.com/conan-io/conan/issues" rel="nofollow">
                    <div className="q-top"><img alt="Docs" src="/social/github.svg"></img></div>
                    <div className="q-title text-center mt-1">Github</div>
                  </a></div>
              </div>
            </div>
          </div>
        </section>
        <ConanFooter/>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default DownloadsPage
