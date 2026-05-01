import { CSSProperties, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi";


export function truncate(text: string, n: number){
  if(text.length > n) return text.slice(0, n-1) + "...";
  return text;
};


export function truncateTooltip(text: string, n: number){
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


export function truncateAndCopy(text: string, n: number){
  if(text.length > n) return (
    <>
      {truncateTooltip(text, n)}
      <ClipboardCopy
        tooltipStyle={{zIndex: 99}}
        copyText={text}
        buttonStyle={{cursor: 'pointer', display: 'inline'}}
        isCopiedStyle={{color: 'green', verticalAlign: 'top', marginLeft:'1px', height: '15px', width: '15px'}}
        copyStyle={{verticalAlign: 'top', marginLeft:'1px', height: '15px', width: '15px'}}
      />
    </>
  );
  return text;
};


export function urlify(rawUrl: string) {
  if (rawUrl.search(/^http[s]?\:\/\//) === -1) {
    return 'http://' + rawUrl;
  } else {
    return rawUrl;
  }
}


export function sanitizeURL(url: string) {
  url = urlify(url)
  let protocol = new URL(url).protocol;
  return url.replace(protocol + "//", "");
}

interface ClipboardCopyProps {
    copyText: string;
    buttonStyle?: CSSProperties;
    tooltipStyle?: CSSProperties;
    isCopiedStyle?: CSSProperties;
    copyStyle?: CSSProperties;
}
export const ClipboardCopy = ({
  copyText,
  buttonStyle = { cursor: 'pointer', display: 'inline', position: 'absolute', top: 0, right: 0},
  tooltipStyle = { zIndex: 99 },
  isCopiedStyle = {color: 'green', verticalAlign: 'baseline', height: '20px', width: '20px'},
  copyStyle = { verticalAlign: 'baseline', height: '20px', width: '20px'},
}: ClipboardCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text);
  }
  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {});
  }

  // Ids cant have new lines
  const id = "copy-" + copyText.substring(0, copyText.indexOf('\n') !== -1 ? copyText.indexOf('\n') : copyText.length)
  return (
    <>
      <Tooltip id={id} style={tooltipStyle}/>
      <a
        onClick={handleCopyClick}
        style={buttonStyle}
        data-tooltip-id={id}
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


export function prettyProfileNames(){
  return {
    'Linux-x86_64': 'Linux',
    'Windows-x86_64': 'Windows',
    'Macos-x86_64': 'macOS',
    'Macos-armv8': 'macOS Apple Silicon',
    'Windows-armv8': 'Windows ARM64'
  };
}


export function prettyProfiles(profileSettings: any[], style?: CSSProperties){
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
export function levenshteinDistance(s: string, t: string) {
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


export function DefaultDescription (props: { name: string; }) {
  return (
    (<Alert className="text-center" variant="secondary">
      It has not been possible to load this information.
      Please, check if <Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.name}>
        this recipe version
      </Link> is compatible with Conan v2.x.
    </Alert>)
  )
}
