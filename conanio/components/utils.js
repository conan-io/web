import { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
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


// This comes from the wikipedia's pseudocode, I couldn't be bothered to do some dynamic programming of my own,
// comments left to make it easier to double-check the transpilation
function levenshteinDistance(s, t) {
  const m = s.length;
  const n = t.length;

  // Create two work arrays of integer distances
  const v0 = new Array(n + 1);
  const v1 = new Array(n + 1);

  // Initialize v0 (the previous row of distances)
  for (let i = 0; i <= n; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < m; i++) {
    // Calculate v1 (current row distances) from the previous row v0

    // First element of v1 is A[i + 1][0]
    v1[0] = i + 1;

    // Use formula to fill in the rest of the row
    for (let j = 0; j < n; j++) {
      // Calculating costs for A[i + 1][j + 1]
      const deletionCost = v0[j + 1] + 1;
      const insertionCost = v1[j] + 1;
      const substitutionCost = (s[i] === t[j]) ? v0[j] : v0[j] + 1;

      v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost);
    }

    // Copy v1 (current row) to v0 (previous row) for the next iteration
    for (let j = 0; j <= n; j++) {
      v0[j] = v1[j];
    }
  }
  // After the last iteration, the results of v1 are now in v0
  return v0[n];
};


function DefaultDescription (props) {
  return (
    (<Alert className="text-center" variant="secondary">
      It has not been possible to load this information.
      Please, check if <Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.name}>
        <a>this recipe version</a>
      </Link> is compatible with Conan v2.x.
    </Alert>)
  )
}


export { truncate, truncateTooltip, truncateAdnCopy, sanitizeURL, ClipboardCopy, prettyProfiles, prettyProfileNames, levenshteinDistance, DefaultDescription };
