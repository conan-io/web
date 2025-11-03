import React from 'react';
import { ConanKitchenHeader, ConanFooter } from '@/components';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { BiInfoCircle } from "react-icons/bi";


function gtmConanPush(eventType: string, product: string, platforms: string, purpose: string, description: string){
  window.dataLayer.push({
    'event': 'fireEvent',
    'event_name': 'element_click',
    'type': eventType,
    'product': product,
    'platforms': platforms,
    'purpose': purpose,
    'description': description.toLowerCase()
  });
}


function gtmConanPushDownload(product: string, platforms: string, description: string){
  gtmConanPush('download', product, platforms, 'get ' + product, description);
}


function gtmConanPushCopy(product: string, platforms: string, description: string){
  gtmConanPush('copy', product, platforms, 'get ' + product, description);
}

interface GtmProps {
    gtmProduct: string;
    gtmPlatforms: string;
    gtmDownloadDescription?: string;
    gtmCopyDescription?: string;
}

interface CopyToClipboardProps extends GtmProps {
    imageAlt: string;
    imageSrc: string;
    textToShow: string;
    textToCopy: string;
}

interface DownloadInstallerProps extends GtmProps {
    imageAlt: string;
    imageSrc: string;
    textToShow: string;
    installerLink: string;
}

interface DownloadInstallerOrCopyProps extends DownloadInstallerProps {
    textTooltip: string;
    textToCopy: string;
}

const CopyToClipboard = (props: CopyToClipboardProps) => (
    <div className="package-wrapper d-flex flex-no-wrap">
      <div className="cn-box small"><img alt={props.imageAlt} className="lazy" src={props.imageSrc}></img></div>
      <div className="cn-box cn-main copy-text">{props.textToShow}</div>
      <a
        className="cn-box cn-action cn-copy"
        onClick={() => {
          gtmConanPushCopy(props.gtmProduct, props.gtmPlatforms, props.gtmCopyDescription);
          navigator.clipboard.writeText(props.textToCopy);
        }}
        data-tooltip-id="copy-to-clipboard"
        data-tooltip-content="Copy to clipboard"
        data-tooltip-place="top"
      ></a>
    </div>
  )


const DownloadInstallerOrCopy = (props: DownloadInstallerOrCopyProps) => (
    <div className="package-wrapper d-flex flex-no-wrap">
      <div className="cn-box small"><img alt={props.imageAlt} className="lazy" src={props.imageSrc}></img></div>
      <div className="cn-box cn-main">{props.textToShow}</div>
      <div onClick={() => {gtmConanPushDownload(props.gtmProduct, props.gtmPlatforms, props.gtmDownloadDescription)}}>
        <Link href={props.installerLink}>
          <div
            className="cn-box cn-action cn-download"
            data-tooltip-id="download"
            data-tooltip-content="Download"
            data-tooltip-place="top"
          ></div>
        </Link>
      </div>
      <a
        className="cn-box cn-action cn-copy"
        style={{'margin': '0px 36px 0px 8px'}}
        onClick={() => {
          gtmConanPushCopy(props.gtmProduct, props.gtmPlatforms, props.gtmCopyDescription);
          navigator.clipboard.writeText(props.textToCopy);
        }}
        data-tooltip-id="copy-to-clipboard"
        data-tooltip-content={props.textTooltip}
        data-tooltip-place="top"
      ></a>
    </div>
  )

const DownloadInstaller = (props: DownloadInstallerProps) => (
    <div className="package-wrapper d-flex flex-no-wrap">
      <div className="cn-box small"><img alt={props.imageAlt} className="lazy" src={props.imageSrc}></img></div>
      <div className="cn-box cn-main">{props.textToShow}</div>
      <div onClick={() => {gtmConanPushDownload(props.gtmProduct, props.gtmPlatforms, props.gtmDownloadDescription)}}>
        <Link href={props.installerLink}>
          <div
            className="cn-box cn-action cn-download"
            data-tooltip-id="download"
            data-tooltip-content="Download"
            data-tooltip-place="top"
          ></div>
        </Link>
      </div>
    </div>
  )

const DownloadConanPackageManager = () => {

  const conanReleaseVersion = process.env.NEXT_PUBLIC_CONAN_VERSION
  const gtmProduct = "conan"
  return (
    <div className="col-lg-6 blue-downloads colored-downloads">
      <div className="downloads-item-wrapper">
        <div className="top bg-blue download-col-topper"></div>
        <div className="content px-2 px-md-4 py-2 p-md-4">
          <Tooltip id="copy-to-clipboard" />
          <Tooltip id="download" />
          <Tooltip id="go-to-conan-github" />
          <Tooltip id="extra-info" />
          <div className="small-title d-flex align-items-center"><img
              alt="Downlod Conan Open Source C and C++ Package Manager" className="me-2 small-title-lazy"
              src="/conan-downloads-logo.svg"></img></div>
          <div className="text pb-1">
            <p className="py-3 front-text">Install the latest version ({conanReleaseVersion}) of the free and open Source Conan C and C++
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
                gtmProduct={gtmProduct}
                gtmPlatforms="python"
                gtmCopyDescription="pip install conan"
              />
            </div>
            <p>Other Installers:</p>
            <div className="installers small-installers pb-4">
              <CopyToClipboard
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="$ brew install conan"
                textToCopy="brew install conan"
                gtmProduct={gtmProduct}
                gtmPlatforms="apple"
                gtmCopyDescription="brew install conan"
              />
              <DownloadInstaller
                imageAlt="Debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Ubuntu / Debian amd64 Installer"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-amd64.deb"}
                gtmProduct={gtmProduct}
                gtmPlatforms="debian"
                gtmDownloadDescription="Ubuntu / Debian X64 Installer"
              />
              <DownloadInstaller
                imageAlt="Debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Ubuntu / Debian arm64 Installer"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-arm64.deb"}
                gtmProduct={gtmProduct}
                gtmPlatforms="debian"
                gtmDownloadDescription="Ubuntu / Debian arm64 Installer"
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download x86_64 Installer"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-windows-x86_64-installer.exe"}
                gtmProduct={gtmProduct}
                gtmPlatforms="windows"
                gtmDownloadDescription="Download x86_64 Installer"
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download i686 Installer"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-windows-i686-installer.exe"}
                gtmProduct={gtmProduct}
                gtmPlatforms="windows"
                gtmDownloadDescription="Download x86 Installer"
              />
              <CopyToClipboard
                imageAlt="Arch Linux"
                imageSrc="/downloads/archlinux-small-pack.svg"
                textToShow="$ yay -S conan"
                textToCopy="yay -S conan"
                gtmProduct={gtmProduct}
                gtmPlatforms="arch"
                gtmCopyDescription="yay -S conan"
              />
              <div className="package-wrapper d-flex flex-no-wrap">
                <div className="cn-box small"><img alt="Github" className="lazy" src="/downloads/github-small-pack.svg"></img></div>
                <div className="cn-box cn-main">Any OS:From Source</div>
                <div onClick={() => {gtmConanPush('link', 'conan', 'github', 'get conan', 'any os from source');}}>
                  <Link href="https://github.com/conan-io/conan">
                    <div
                      className="cn-box cn-action cn-link"
                      data-tooltip-id="go-to-conan-github"
                      data-tooltip-content="Go to conan github repositoy"
                      data-tooltip-place="top"
                    ></div>
                  </Link>
                </div>
              </div>
            </div>
              <p>
                Self-contained (no Python needed)<a
                  data-tooltip-id="extra-info"
                  data-tooltip-place="top"
                  data-tooltip-html="self-contained executable with everything you need to run conan<br/>without installing python or any other requirement">
                    <BiInfoCircle style={{padding: '0px 0px 0px 0px'}} className="mb-3 conanIconGrey conanIcon18"/>
                </a>:
              </p>
              <div className="installers small-installers pb-4">
              <CopyToClipboard
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="wget and tar -xvf conan arm64 executable"
                textToCopy={'wget https://github.com/conan-io/conan/releases/download/'+ conanReleaseVersion +'/conan-'+ conanReleaseVersion +'-macos-arm64.tgz\ntar -xvf conan-'+ conanReleaseVersion +'-macos-arm64.tgz'}
                gtmProduct={gtmProduct}
                gtmPlatforms="apple"
                gtmCopyDescription="wget and tar -xvf conan executable"
              />
              <CopyToClipboard
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="wget and tar -xvf conan x86_64 executable"
                textToCopy={'wget https://github.com/conan-io/conan/releases/download/'+ conanReleaseVersion +'/conan-'+ conanReleaseVersion +'-macos-x86_64.tgz\ntar -xvf conan-'+ conanReleaseVersion +'-macos-x86_64.tgz'}
                gtmProduct={gtmProduct}
                gtmPlatforms="apple"
                gtmCopyDescription="wget and tar -xvf conan executable"
              />
              <DownloadInstallerOrCopy
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download x86_64 Conan Bundle"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-windows-x86_64.zip"}
                textTooltip="Copy powershell command"
                textToCopy={'Invoke-WebRequest -Uri "https://github.com/conan-io/conan/releases/download/'+ conanReleaseVersion +'/conan-'+ conanReleaseVersion +'-windows-x86_64.zip" -OutFile conan-'+ conanReleaseVersion +'-windows-x86_64.zip\nExpand-Archive .\\conan-'+ conanReleaseVersion +'-windows-x86_64.zip -DestinationPath .'}
                gtmProduct={gtmProduct}
                gtmPlatforms="windows"
                gtmDownloadDescription="Download x64 Conan Bundle"
                gtmCopyDescription="Copy powershell command"
              />
              <DownloadInstallerOrCopy
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Download i686 Conan Bundle"
                installerLink={"https://github.com/conan-io/conan/releases/download/"+ conanReleaseVersion +"/conan-"+ conanReleaseVersion +"-windows-i686.zip"}
                textTooltip="Copy powershell command"
                textToCopy={'Invoke-WebRequest -Uri "https://github.com/conan-io/conan/releases/download/'+ conanReleaseVersion +'/conan-'+ conanReleaseVersion +'-windows-i686.zip" -OutFile conan-'+ conanReleaseVersion +'-windows-i686.zip\nExpand-Archive .\\conan-'+ conanReleaseVersion +'-windows-i686.zip -DestinationPath .'}
                gtmProduct={gtmProduct}
                gtmPlatforms="windows"
                gtmDownloadDescription="Download x86_64 Conan Bundle"
                gtmCopyDescription="Copy powershell command"
              />
              <CopyToClipboard
                imageAlt="Linux"
                imageSrc="/downloads/linux-small-pack.svg"
                textToShow="wget and tar -xvf x86_64 conan executable"
                textToCopy={'wget https://github.com/conan-io/conan/releases/download/'+ conanReleaseVersion +'/conan-'+ conanReleaseVersion +'-linux-x86_64.tgz\ntar -xvf conan-'+ conanReleaseVersion +'-linux-x86_64.tgz'}
                gtmProduct={gtmProduct}
                gtmPlatforms="linux"
                gtmCopyDescription="wget and tar -xvf conan executable"
              />
            </div>
            <div className="left-downloads-spacer"></div>
            <div className="text text-two">
              <p className="text-break">Read more about Conan installation:<a className="text-break"
                  href="https://docs.conan.io/2/installation.html">https://docs.conan.io/2/installation.html
                </a></p>
            </div>
          </div>
          <div className="cta-wrapper"><a className="btn conan-blue-gradient-bg white fw-bold"
              href="https://docs.conan.io/2.0/tutorial.html">Getting Started With Conan</a></div>
        </div>
      </div>
    </div>
  )
}

const DownloadJFrogArtifactoryCommunityEditionForCpp = () => {
  const artifactoryReleaseVersion = "7.63.12"
  const gtmProduct = "artifactory"
  return (
    <div className="col-lg-6 mt-3 mt-lg-0 green-downloads colored-downloads">
      <div className="downloads-item-wrapper">
        <div className="top bg-green download-col-topper"></div>
        <div className="content px-2 px-md-4 py-2 p-md-4">
          <Tooltip id="copy-to-clipboard" />
          <Tooltip id="download" />
          <div className="small-title d-flex align-items-center"><img
              alt="Downlod JFrog Artifactory Community Edition for C and C++" className="me-2 lazy"
              src="/jfrog-artifactory-ce-download-banner.svg"></img></div>
          <div className="text pb-1">
            <p className="py-3 front-text">Download the latest version of JFrog Artifactory Community Edition to host
              your own private packages on your own server - for free.</p>
            <p className="mb-2">Recommended install (latest):</p>
          </div>
          <div className="install">
            <div className="installers pb-4">
              <CopyToClipboard
                imageAlt="Docker"
                imageSrc="/downloads/docker-small-pack.svg"
                textToShow="$ docker run ..."
                textToCopy="docker run --name artifactory -d -e JF_SHARED_DATABASE_TYPE=derby -e JF_SHARED_DATABASE_ALLOWNONPOSTGRESQL=true -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest"
                gtmProduct={gtmProduct}
                gtmPlatforms="docker"
                gtmCopyDescription="docker run --name artifactory -d -e JF_SHARED_DATABASE_TYPE=derby -e JF_SHARED_DATABASE_ALLOWNONPOSTGRESQL=true -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest"
              />
            </div>
            <p>Older installers ({artifactoryReleaseVersion}):</p>
            <div className="installers small-installers pb-4">
              <DownloadInstaller
                imageAlt="Linux"
                imageSrc="/downloads/linux-small-pack.svg"
                textToShow="Linux .tgz"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ artifactoryReleaseVersion +"/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +"-linux.tar.gz"}
                gtmProduct={gtmProduct}
                gtmPlatforms="linux"
                gtmDownloadDescription="Linux Installer"
              />
              <DownloadInstallerOrCopy
                imageAlt="rpm"
                imageSrc="/downloads/rpm-small-pack.png"
                textToShow="RPM Installer"
                installerLink={"https://releases.jfrog.io/artifactory/artifactory-rpms/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +".rpm"}
                textTooltip="Copy install command"
                textToCopy={'#Add artifactory.repo file to your yum repository listsudo vi /etc/yum.repos.d/artifactory.repo\n#Add the following content[Artifactory]name=Artifactorybaseurl=https://releases.jfrog.io/artifactory/artifactory-rpms/enabled=1gpgcheck=0\n#Optional - if you have GPG signing keys installed, use the below flags to verify the repository metadata signature:\n#gpgkey=https://releases.jfrog.io/artifactory/artifactory-rpms/<PATH_TO_REPODATA_FOLDER>/repomd.xml.key\n#repo_gpgcheck=1\n#Run the install commandyum update && yum install jfrog-artifactory-cpp-ce'}
                gtmProduct={gtmProduct}
                gtmPlatforms="rpm"
                gtmDownloadDescription="RPM Installer"
                gtmCopyDescription="Copy install command"
              />
              <DownloadInstallerOrCopy
                imageAlt="debian"
                imageSrc="/downloads/debian-small-pack.svg"
                textToShow="Debian Installer"
                installerLink={"https://releases.jfrog.io/artifactory/artifactory-debs/pool/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +".deb"}
                textTooltip="Copy install command"
                textToCopy={'wget -qO - https://releases.jfrog.io/artifactory/api/gpg/key/public | apt-key add -;echo "deb https://releases.jfrog.io/artifactory/artifactory-debs{distribution} main" | sudo tee -a /etc/apt/sources.list;# To determine your distribution, run lsb_release -c or cat /etc/os-release# Example:echo "deb https://releases.jfrog.io/artifactory/artifactory-debs xenial main" | sudo tee -a /etc/apt/sources.list;apt-get update;sudo apt-get install jfrog-artifactory-cpp-ce'}
                gtmProduct={gtmProduct}
                gtmPlatforms="debian"
                gtmDownloadDescription="Debian Installer"
                gtmCopyDescription="Copy install command"
              />
              <DownloadInstaller
                imageAlt="Windows"
                imageSrc="/downloads/windows-small-pack.svg"
                textToShow="Windows .zip"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ artifactoryReleaseVersion +"/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +"-windows.zip"}
                gtmProduct={gtmProduct}
                gtmPlatforms="windows"
                gtmDownloadDescription="Windows Installer"
              />
              <DownloadInstaller
                imageAlt="Docker"
                imageSrc="/downloads/compose-small-pack.svg"
                textToShow="Docker Compose Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/docker/jfrog-artifactory-cpp-ce/"+ artifactoryReleaseVersion +"/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +"-compose.tar.gz"}
                gtmProduct={gtmProduct}
                gtmPlatforms="docker"
                gtmDownloadDescription="Docker Compose Installer"
              />
              <CopyToClipboard
                imageAlt="Docker"
                imageSrc="/downloads/docker-small-pack.svg"
                textToShow="$ docker run ..."
                textToCopy={'docker run --name artifactory -d -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:' + artifactoryReleaseVersion}
                gtmProduct={gtmProduct}
                gtmPlatforms="docker"
                gtmCopyDescription={'docker run --name artifactory -d -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:' + artifactoryReleaseVersion}
              />
              <DownloadInstaller
                imageAlt="Darwin"
                imageSrc="/downloads/darwin-small-pack.svg"
                textToShow="Darwin Installer"
                installerLink={"https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/"+ artifactoryReleaseVersion +"/jfrog-artifactory-cpp-ce-"+ artifactoryReleaseVersion +"-darwin.tar.gz"}
                gtmProduct={gtmProduct}
                gtmPlatforms="apple"
                gtmDownloadDescription="Darwin Installer"
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

const DownloadsPage = () => (
    <React.StrictMode>

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
            <div className="row pb-3 main-downloads-row ms-auto me-auto">
              <DownloadConanPackageManager />
              <DownloadJFrogArtifactoryCommunityEditionForCpp />
            </div>
            <div className="mb-5 download-questions">
              <div className="col-12 text-center">
                <h2 className="fw-bold pb-3">Questions about Installation?</h2>
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

    </React.StrictMode>
  );

export default DownloadsPage
