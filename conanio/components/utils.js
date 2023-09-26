import Badge from 'react-bootstrap/Badge';


function prettyProfileNames(){
  return {
    'Linux-x86_64': 'Linux',
    'Windows-x86_64': 'Windows',
    'Macos-x86_64': 'macOS',
    'Macos-armv8': 'macOS Apple Silicon'
  };
}


function prettyProfiles(profileSettings, style){
  const profileList = profileSettings.map((item) => item.os + "-" + item.arch);
  if (profileList.filter(item => (item=='null-null')).length == profileList.length){
    return [
      {
        'key': 'header-only',
        'os': 'Header Only',
        'status': true,
        'badget': (<Badge style={style} className="profileTopics">Header Only</Badge>)
      }
    ]
  }
  return Object.keys(prettyProfileNames()).map((i) => {
    let bagdetClass = profileList.includes(i)? "profileTopics": "profileEmptyTopics"
    let bagdetStatus = profileList.includes(i)? true: false
    return {
      'key': i,
      'os': prettyProfileNames()[i],
      'status': bagdetStatus,
      'badget': (<Badge style={style} className={bagdetClass}>{prettyProfileNames()[i]}</Badge>)
    }
  });
};


export { prettyProfiles, prettyProfileNames };
