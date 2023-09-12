import Badge from 'react-bootstrap/Badge';


function prettyProfiles(profileSettings){
  const profileList = profileSettings.map((item) => item.os + "-" + item.arch);
  const prettyNames = {
    'Linux-x86_64': 'Linux',
    'Windows-x86_64': 'Windows',
    'Macos-x86_64': 'macOS',
    'Macos-armv8': 'macOS M1'
  };
  return Object.keys(prettyNames).map((i) => {
    let bagdetClass = profileList.includes(i)? "profileTopics": "profileEmptyTopics"
    return {
      'key': i,
      'badget': (<Badge className={bagdetClass}>{prettyNames[i]}</Badge>)}
  });
};


export { prettyProfiles };
