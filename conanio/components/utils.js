import { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import { Tooltip } from 'react-tooltip';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi";


function truncate(text, n){
  if(text.length > n) return text.slice(0, n-1) + "...";
  return text;
};


function truncateTooltip(text, n){
  if(text.length > n) return (
    <>
      <Tooltip style={{ zIndex: 99 }} id={text}/>
      <a
        data-tooltip-id={text}
        data-tooltip-html={text}
        data-tooltip-place="top"
        style={{cursor: 'pointer'}}
      >
        {truncate(text, n)}
      </a>
    </>
  );
  return text;
};


function truncateAdnCopy(text, n){
  if(text.length > n) return (
    <>
      {truncateTooltip(text, n)}
      <ClipboardCopy
        tooltipStyle={{zIndex: 99}}
        copyText={text}
        isCopiedStyle={{color: 'green', verticalAlign: 'top', marginLeft:'1px', height: '15px', width: '15px'}}
        copyStyle={{verticalAlign: 'top', marginLeft:'1px', height: '15px', width: '15px'}}
      />
    </>
  );
  return str;
};


function sanitizeURL(url) {
  let protocol = new URL(url).protocol;
  return url.replace(protocol + "//", "");
}


function ClipboardCopy({ copyText, tooltipStyle, isCopiedStyle, copyStyle }) {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text);
  }
  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {setIsCopied(false);}, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Tooltip id={"copy-" + copyText} style={tooltipStyle}/>
      <a
        onClick={handleCopyClick}
        style={{cursor: 'pointer', display: 'inline'}}
        data-tooltip-id={"copy-" + copyText}
        data-tooltip-html={isCopied ? "Copied!" : "Copy to clipboard"}
        data-tooltip-place="top"
      >
        <span>
          {isCopied ? <
              HiOutlineClipboardCheck
              style={isCopiedStyle}
            /> : <
              HiOutlineClipboardCopy className="conanIconBlue"
              style={copyStyle}
            />}
        </span>
      </a>
    </>
  );
}


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


export { truncate, truncateTooltip, truncateAdnCopy, sanitizeURL, ClipboardCopy, prettyProfiles, prettyProfileNames };
