import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ConanKitchenHeader } from '../components/header';
import ConanFooter from '../components/footer';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

function CopyToClipboard(props) {
  return (
    <div className="package-wrapper d-flex flex-no-wrap">
      <div className="cn-box small"><img alt={props.imageAlt} className="lazy" src={props.imageSrc}></img></div>
      <div className="cn-box cn-main copy-text">{props.textToShow}</div>
      <a
        className="cn-box cn-action cn-copy"
        onClick={() => {navigator.clipboard.writeText(props.textToCopy)}}
        data-tooltip-id="copy-to-clipboard"
        data-tooltip-content="Copy to clipboard"
        data-tooltip-place="top"
      ></a>
    </div>
  )
}

function DownloadInstaller(props) {
  return (
    <div className="package-wrapper d-flex flex-no-wrap">
      <div className="cn-box small"><img alt={props.imageAlt} className="lazy" src={props.imageSrc}></img></div>
      <div className="cn-box cn-main">{props.textToShow}</div>
      <Link href={props.installerLink}>
        <a
          className="cn-box cn-action cn-download"
          data-tooltip-id="download"
          data-tooltip-content="Download"
          data-tooltip-place="top"
        ></a>
      </Link>
    </div>
  )
}

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
              <CopyToClipboard
                imageAlt="python"
                imageSrc="/downloads/python-small-pack.svg"
                textToShow="$ pip install conan"
                textToCopy="pip install conan"
              />
            </div>
            <p>Other Installers:</p>
            <div className="installers small-installers pb-4">
              <CopyToClipboard
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="$ brew install conan"
                textToCopy="brew install conan"
              />
              <DownloadInstaller
                imageAlt="Debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Ubuntu / Debian X64 Installer"
                installerLink="https://github.com/conan-io/conan/releases/latest/download/conan-ubuntu-64.deb"
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download x86_64 Installer"
                installerLink="https://github.com/conan-io/conan/releases/latest/download/conan-win-64.exe"
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download x86 Installer"
                installerLink="https://github.com/conan-io/conan/releases/latest/download/conan-win-32.exe"
              />
              <CopyToClipboard
                imageAlt="Arch Linux"
                imageSrc="/downloads/archlinux-small-pack.svg"
                textToShow="$ yay -S conan"
                textToCopy=" yay -S conan"
              />

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
              <DownloadInstaller
                imageAlt="Linux"
                imageSrc="/downloads/jfrog-artifactory-small-pack.png"
                textToShow="Download tar.gz"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-linux.tar.gz"}
              />
            </div>
            <p>Other Installers:</p>
            <div className="installers small-installers pb-4">
              <DownloadInstaller
                imageAlt="Linux"
                imageSrc="/downloads/linux-small-pack.svg"
                textToShow="Linux Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-linux.tar.gz"}
              />
              <DownloadInstaller
                imageAlt="rpm"
                imageSrc="/downloads/rpm-small-pack.png"
                textToShow="RPM Installer"
                installerLink={"https://releases.jfrog.io/artifactory/artifactory-rpms/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ releaseVersion +".rpm"}
              />
              <CopyToClipboard
                imageAlt="rpm"
                imageSrc="/downloads/rpm-small-pack.png"
                textToShow="Copy install command"
                textToCopy={'#Add artifactory.repo file to your yum repository listsudo vi /etc/yum.repos.d/artifactory.repo\n#Add the following content[Artifactory]name=Artifactorybaseurl=https://releases.jfrog.io/artifactory/artifactory-rpms/enabled=1gpgcheck=0\n#Optional - if you have GPG signing keys installed, use the below flags to verify the repository metadata signature:\n#gpgkey=https://releases.jfrog.io/artifactory/artifactory-rpms/<PATH_TO_REPODATA_FOLDER>/repomd.xml.key\n#repo_gpgcheck=1\n#Run the install commandyum update && yum install jfrog-artifactory-cpp-ce'}
              />
              <DownloadInstaller
                imageAlt="debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Debian Installer"
                installerLink={"https://releases.jfrog.io/artifactory/artifactory-debs/pool/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ releaseVersion +".deb"}
              />
              <CopyToClipboard
                imageAlt="debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Copy install command"
                textToCopy={'wget -qO - https://releases.jfrog.io/artifactory/api/gpg/key/public | apt-key add -;echo "deb https://releases.jfrog.io/artifactory/artifactory-debs{distribution} main" | sudo tee -a /etc/apt/sources.list;# To determine your distribution, run lsb_release -c or cat /etc/os-release# Example:echo "deb https://releases.jfrog.io/artifactory/artifactory-debs xenial main" | sudo tee -a /etc/apt/sources.list;apt-get update;sudo apt-get install jfrog-artifactory-cpp-ce'}
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Windows Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-windows.zip"}
              />
              <DownloadInstaller
                imageAlt="Docker"
                imageSrc="/downloads/compose-small-pack.svg"
                textToShow="Docker Compose Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/docker/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-compose.tar.gz"}
              />
              <CopyToClipboard
                imageAlt="Docker"
                imageSrc="/downloads/docker-small-pack.svg"
                textToShow="$ docker run ..."
                textToCopy={'docker run --name artifactory -d -p 8081:8081 -p 8082:8082 docker.bintray.io/jfrog/artifactory-cpp-ce:latest'}
              />
              <DownloadInstaller
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="Darwin Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ releaseVersion +"/jfrog-artifactory-cpp-ce-"+ releaseVersion +"-darwin.tar.gz"}
              />
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
      <div className="flex-wrapper">
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
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}

export default DownloadsPage
