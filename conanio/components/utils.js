import Badge from 'react-bootstrap/Badge';


function prettyProfileNames(){
  return {
    'Linux-x86_64': 'Linux',
    'Windows-x86_64': 'Windows',
    'Macos-x86_64': 'macOS',
    'Macos-armv8': 'macOS M1'
  };
}


function prettyProfiles(profileSettings){
  const profileList = profileSettings.map((item) => item.os + "-" + item.arch);
  return Object.keys(prettyProfileNames()).map((i) => {
    let bagdetClass = profileList.includes(i)? "profileTopics": "profileEmptyTopics"
    let bagdetStatus = profileList.includes(i)? true: false
    return {
      'key': i,
      'status': bagdetStatus,
      'badget': (<Badge className={bagdetClass}>{prettyProfileNames()[i]}</Badge>)
    }
  });
};


export { prettyProfiles, prettyProfileNames };
