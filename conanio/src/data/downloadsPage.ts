export const DL_ICON = {
  python: "/downloads/python-small-pack.svg",
  darwin: "/downloads/darwin-small-pack.svg",
  debian: "/downloads/debian-small-pack.svg",
  windows: "/downloads/windows-small-pack.svg",
  archlinux: "/downloads/archlinux-small-pack.svg",
  github: "/downloads/github-small-pack.svg",
  linux: "/downloads/linux-small-pack.svg",
  docker: "/downloads/docker-small-pack.svg",
  compose: "/downloads/compose-small-pack.svg",
  rpm: "/downloads/rpm-small-pack.png",
} as const;

export const ARTIFACTORY_RELEASE_VERSION = "7.63.12";

export const rpmInstallCopy =
  "#Add artifactory.repo file to your yum repository listsudo vi /etc/yum.repos.d/artifactory.repo\n#Add the following content[Artifactory]name=Artifactorybaseurl=https://releases.jfrog.io/artifactory/artifactory-rpms/enabled=1gpgcheck=0\n#Optional - if you have GPG signing keys installed, use the below flags to verify the repository metadata signature:\n#gpgkey=https://releases.jfrog.io/artifactory/artifactory-rpms/<PATH_TO_REPODATA_FOLDER>/repomd.xml.key\n#repo_gpgcheck=1\n#Run the install commandyum update && yum install jfrog-artifactory-cpp-ce";

export const debianInstallCopy =
  'wget -qO - https://releases.jfrog.io/artifactory/api/gpg/key/public | apt-key add -;echo "deb https://releases.jfrog.io/artifactory/artifactory-debs{distribution} main" | sudo tee -a /etc/apt/sources.list;# To determine your distribution, run lsb_release -c or cat /etc/os-release# Example:echo "deb https://releases.jfrog.io/artifactory/artifactory-debs xenial main" | sudo tee -a /etc/apt/sources.list;apt-get update;sudo apt-get install jfrog-artifactory-cpp-ce';

export function buildDownloadsArtifacts(conanReleaseVersion: string) {
  const af = ARTIFACTORY_RELEASE_VERSION;
  const ghRelease = `https://github.com/conan-io/conan/releases/download/${conanReleaseVersion}`;

  const conanDebAmd64 = `${ghRelease}/conan-${conanReleaseVersion}-amd64.deb`;
  const conanDebArm64 = `${ghRelease}/conan-${conanReleaseVersion}-arm64.deb`;
  const conanWinX64Exe = `${ghRelease}/conan-${conanReleaseVersion}-windows-x86_64-installer.exe`;
  const conanWinI686Exe = `${ghRelease}/conan-${conanReleaseVersion}-windows-i686-installer.exe`;
  const conanMacArmTgz = `${ghRelease}/conan-${conanReleaseVersion}-macos-arm64.tgz`;
  const conanMacX64Tgz = `${ghRelease}/conan-${conanReleaseVersion}-macos-x86_64.tgz`;
  const conanWinX64Zip = `${ghRelease}/conan-${conanReleaseVersion}-windows-x86_64.zip`;
  const conanWinI686Zip = `${ghRelease}/conan-${conanReleaseVersion}-windows-i686.zip`;
  const conanLinuxX64Tgz = `${ghRelease}/conan-${conanReleaseVersion}-linux-x86_64.tgz`;

  const macArmCopy = `wget ${conanMacArmTgz}\ntar -xvf conan-${conanReleaseVersion}-macos-arm64.tgz`;
  const macX64Copy = `wget ${conanMacX64Tgz}\ntar -xvf conan-${conanReleaseVersion}-macos-x86_64.tgz`;
  const linuxX64Copy = `wget ${conanLinuxX64Tgz}\ntar -xvf conan-${conanReleaseVersion}-linux-x86_64.tgz`;
  const winX64Ps = `Invoke-WebRequest -Uri "${conanWinX64Zip}" -OutFile conan-${conanReleaseVersion}-windows-x86_64.zip\nExpand-Archive .\\conan-${conanReleaseVersion}-windows-x86_64.zip -DestinationPath .`;
  const winI686Ps = `Invoke-WebRequest -Uri "${conanWinI686Zip}" -OutFile conan-${conanReleaseVersion}-windows-i686.zip\nExpand-Archive .\\conan-${conanReleaseVersion}-windows-i686.zip -DestinationPath .`;

  const afLinuxTgz = `https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/${af}/jfrog-artifactory-cpp-ce-${af}-linux.tar.gz`;
  const afRpm = `https://releases.jfrog.io/artifactory/artifactory-rpms/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-${af}.rpm`;
  const afDeb = `https://releases.jfrog.io/artifactory/artifactory-debs/pool/jfrog-artifactory-cpp-ce/jfrog-artifactory-cpp-ce-${af}.deb`;
  const afWinZip = `https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/${af}/jfrog-artifactory-cpp-ce-${af}-windows.zip`;
  const afCompose = `https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/docker/jfrog-artifactory-cpp-ce/${af}/jfrog-artifactory-cpp-ce-${af}-compose.tar.gz`;
  const afDarwin = `https://releases.jfrog.io/artifactory/bintray-artifactory/org/artifactory/cpp/ce/jfrog-artifactory-cpp-ce/${af}/jfrog-artifactory-cpp-ce-${af}-darwin.tar.gz`;

  const dockerLatest =
    "docker run --name artifactory -d -e JF_SHARED_DATABASE_TYPE=derby -e JF_SHARED_DATABASE_ALLOWNONPOSTGRESQL=true -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest";
  const dockerPinned = `docker run --name artifactory -d -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:${af}`;

  return {
    ghRelease,
    conanDebAmd64,
    conanDebArm64,
    conanWinX64Exe,
    conanWinI686Exe,
    conanMacArmTgz,
    conanMacX64Tgz,
    conanWinX64Zip,
    conanWinI686Zip,
    conanLinuxX64Tgz,
    macArmCopy,
    macX64Copy,
    linuxX64Copy,
    winX64Ps,
    winI686Ps,
    afLinuxTgz,
    afRpm,
    afDeb,
    afWinZip,
    afCompose,
    afDarwin,
    dockerLatest,
    dockerPinned,
  };
}

export type DownloadsEventPayload = {
  type: "download" | "copy" | "navigation";
  product: string;
  platforms: string;
  purpose: string;
  description: string;
};

export type DlRowConfig =
  | {
      kind: "cmd";
      icon: keyof typeof DL_ICON;
      alt: string;
      commandText: string;
      copyText: string;
      copyAriaLabel?: string;
      copyEvent: DownloadsEventPayload;
    }
  | {
      kind: "download";
      icon: keyof typeof DL_ICON;
      alt: string;
      label: string;
      href: string;
      ariaLabel?: string;
      download?: boolean;
      actionKind?: "download" | "external";
      clickEvent: DownloadsEventPayload;
    }
  | {
      kind: "download+copy";
      icon: keyof typeof DL_ICON;
      alt: string;
      label: string;
      href: string;
      ariaLabel?: string;
      download?: boolean;
      downloadEvent: DownloadsEventPayload;
      copyText: string;
      copyAriaLabel?: string;
      copyEvent: DownloadsEventPayload;
    };

export function buildDownloadsRows(a: ReturnType<typeof buildDownloadsArtifacts>) {
  const conanRecommendedRows: DlRowConfig[] = [
    {
      kind: "cmd",
      icon: "python",
      alt: "Python",
      commandText: "pip install conan",
      copyText: "pip install conan",
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "all",
        purpose: "get conan",
        description: "pip install conan",
      },
    },
  ];

  const conanOtherInstallerRows: DlRowConfig[] = [
    {
      kind: "cmd",
      icon: "darwin",
      alt: "macOS",
      commandText: "brew install conan",
      copyText: "brew install conan",
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "macos",
        purpose: "get conan",
        description: "brew install conan",
      },
    },
    {
      kind: "download",
      icon: "debian",
      alt: "Debian",
      label: "Ubuntu / Debian amd64 Installer",
      href: a.conanDebAmd64,
      clickEvent: {
        type: "download",
        product: "conan",
        platforms: "linux amd64",
        purpose: "get conan",
        description: "ubuntu debian amd64 installer",
      },
    },
    {
      kind: "download",
      icon: "debian",
      alt: "Debian",
      label: "Ubuntu / Debian arm64 Installer",
      href: a.conanDebArm64,
      clickEvent: {
        type: "download",
        product: "conan",
        platforms: "linux arm64",
        purpose: "get conan",
        description: "ubuntu debian arm64 installer",
      },
    },
    {
      kind: "download",
      icon: "windows",
      alt: "Windows",
      label: "Download x86_64 Installer",
      href: a.conanWinX64Exe,
      clickEvent: {
        type: "download",
        product: "conan",
        platforms: "windows x86_64",
        purpose: "get conan",
        description: "windows x86_64 installer",
      },
    },
    {
      kind: "download",
      icon: "windows",
      alt: "Windows",
      label: "Download i686 Installer",
      href: a.conanWinI686Exe,
      clickEvent: {
        type: "download",
        product: "conan",
        platforms: "windows i686",
        purpose: "get conan",
        description: "windows i686 installer",
      },
    },
    {
      kind: "cmd",
      icon: "archlinux",
      alt: "Arch Linux",
      commandText: "yay -S conan",
      copyText: "yay -S conan",
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "archlinux",
        purpose: "get conan",
        description: "yay -S conan",
      },
    },
    {
      kind: "download",
      icon: "github",
      alt: "GitHub",
      label: "Any OS / From Source",
      href: "https://github.com/conan-io/conan",
      ariaLabel: "Go to Conan GitHub repository",
      download: false,
      actionKind: "external",
      clickEvent: {
        type: "navigation",
        product: "conan",
        platforms: "all",
        purpose: "get conan",
        description: "conan github repository",
      },
    },
  ];

  const conanSelfContainedRows: DlRowConfig[] = [
    {
      kind: "cmd",
      icon: "darwin",
      alt: "macOS",
      commandText: "wget and tar -xvf conan arm64 executable",
      copyText: a.macArmCopy,
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "macos arm64",
        purpose: "get conan",
        description: "self contained macos arm64 command",
      },
    },
    {
      kind: "cmd",
      icon: "darwin",
      alt: "macOS",
      commandText: "wget and tar -xvf conan x86_64 executable",
      copyText: a.macX64Copy,
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "macos x86_64",
        purpose: "get conan",
        description: "self contained macos x86_64 command",
      },
    },
    {
      kind: "download+copy",
      icon: "windows",
      alt: "Windows",
      label: "Download x86_64 Conan Bundle",
      href: a.conanWinX64Zip,
      downloadEvent: {
        type: "download",
        product: "conan",
        platforms: "windows x86_64",
        purpose: "get conan",
        description: "windows x86_64 bundle",
      },
      copyText: a.winX64Ps,
      copyAriaLabel: "Copy PowerShell command",
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "windows x86_64",
        purpose: "get conan",
        description: "powershell x86_64 bundle install",
      },
    },
    {
      kind: "download+copy",
      icon: "windows",
      alt: "Windows",
      label: "Download i686 Conan Bundle",
      href: a.conanWinI686Zip,
      downloadEvent: {
        type: "download",
        product: "conan",
        platforms: "windows i686",
        purpose: "get conan",
        description: "windows i686 bundle",
      },
      copyText: a.winI686Ps,
      copyAriaLabel: "Copy PowerShell command",
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "windows i686",
        purpose: "get conan",
        description: "powershell i686 bundle install",
      },
    },
    {
      kind: "cmd",
      icon: "linux",
      alt: "Linux",
      commandText: "wget and tar -xvf x86_64 conan executable",
      copyText: a.linuxX64Copy,
      copyEvent: {
        type: "copy",
        product: "conan",
        platforms: "linux x86_64",
        purpose: "get conan",
        description: "self contained linux x86_64 command",
      },
    },
  ];

  const artifactoryRecommendedRows: DlRowConfig[] = [
    {
      kind: "cmd",
      icon: "docker",
      alt: "Docker",
      commandText: "docker run …",
      copyText: a.dockerLatest,
      copyEvent: {
        type: "copy",
        product: "artifactory",
        platforms: "docker",
        purpose: "get artifactory",
        description: "docker run latest",
      },
    },
  ];

  const artifactoryOlderRows: DlRowConfig[] = [
    {
      kind: "download",
      icon: "linux",
      alt: "Linux",
      label: "Linux .tgz",
      href: a.afLinuxTgz,
      clickEvent: {
        type: "download",
        product: "artifactory",
        platforms: "linux",
        purpose: "get artifactory",
        description: "linux tgz installer",
      },
    },
    {
      kind: "download+copy",
      icon: "rpm",
      alt: "RPM",
      label: "RPM Installer",
      href: a.afRpm,
      downloadEvent: {
        type: "download",
        product: "artifactory",
        platforms: "rpm",
        purpose: "get artifactory",
        description: "rpm installer",
      },
      copyText: rpmInstallCopy,
      copyAriaLabel: "Copy install command",
      copyEvent: {
        type: "copy",
        product: "artifactory",
        platforms: "rpm",
        purpose: "get artifactory",
        description: "rpm install command",
      },
    },
    {
      kind: "download+copy",
      icon: "debian",
      alt: "Debian",
      label: "Debian Installer",
      href: a.afDeb,
      downloadEvent: {
        type: "download",
        product: "artifactory",
        platforms: "debian",
        purpose: "get artifactory",
        description: "debian installer",
      },
      copyText: debianInstallCopy,
      copyAriaLabel: "Copy install command",
      copyEvent: {
        type: "copy",
        product: "artifactory",
        platforms: "debian",
        purpose: "get artifactory",
        description: "debian install command",
      },
    },
    {
      kind: "download",
      icon: "windows",
      alt: "Windows",
      label: "Windows .zip",
      href: a.afWinZip,
      clickEvent: {
        type: "download",
        product: "artifactory",
        platforms: "windows",
        purpose: "get artifactory",
        description: "windows zip installer",
      },
    },
    {
      kind: "download",
      icon: "compose",
      alt: "Docker Compose",
      label: "Docker Compose Installer",
      href: a.afCompose,
      clickEvent: {
        type: "download",
        product: "artifactory",
        platforms: "docker compose",
        purpose: "get artifactory",
        description: "docker compose installer",
      },
    },
    {
      kind: "cmd",
      icon: "docker",
      alt: "Docker",
      commandText: "docker run …",
      copyText: a.dockerPinned,
      copyEvent: {
        type: "copy",
        product: "artifactory",
        platforms: "docker",
        purpose: "get artifactory",
        description: "docker run pinned",
      },
    },
    {
      kind: "download",
      icon: "darwin",
      alt: "macOS",
      label: "Darwin Installer",
      href: a.afDarwin,
      clickEvent: {
        type: "download",
        product: "artifactory",
        platforms: "darwin",
        purpose: "get artifactory",
        description: "darwin installer",
      },
    },
  ];

  return {
    conanRecommendedRows,
    conanOtherInstallerRows,
    conanSelfContainedRows,
    artifactoryRecommendedRows,
    artifactoryOlderRows,
  };
}
