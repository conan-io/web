/** Same asset filenames as prod `conanio/pages/downloads.tsx` (`https://conan.io/downloads/…`). */
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

/** Mirrors prod `conanio/pages/downloads.tsx` (RPM block — revise manually if needed). */
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
