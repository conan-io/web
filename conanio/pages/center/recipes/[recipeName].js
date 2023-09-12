import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { ConanCenterHeader } from '../../../components/header';
import { prettyProfiles } from '../../../components/utils';
import ConanFooter from '../../../components/footer';
import { get_json, get_urls } from '../../../service/service';
import { DefaultDescription } from '../recipes';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome, IoMdDownload } from "react-icons/io";
import hljs from "highlight.js";
import { UseItTab, BadgesTab, DependenciesTab, VersionsTab, StatsTab } from "../../../components/recipeTabs";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineCheckCircleOutline, MdOutlineToday } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlinePushpin, AiOutlineBarChart } from "react-icons/ai";
import { PiGraphDuotone, PiMedal } from "react-icons/pi";
import { FaTags, FaHashtag } from "react-icons/fa";
import { LuBinary } from "react-icons/lu";
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck, HiOutlineDocumentText } from "react-icons/hi";
import { BasicSearchBar } from "../../../components/searchbar";
import { Tooltip } from 'react-tooltip';
import { useMediaQuery } from 'react-responsive';


export async function getServerSideProps(context) {
  let urls = get_urls({packageId: context.params.recipeName});
  let data = await get_json(urls.package.info, urls.api.private);
  return {
    props: {
      data: data,
      downloads: await get_json(urls.package.downloads, urls.api.private),
      recipeName: context.params.recipeName,
      recipeVersion: context.query.version? context.query.version: null
    },
  };
}


function truncate(text, n){
  if(text.length > n) return (
    <>
      <Tooltip id={text}/>
      <a
        data-tooltip-id={text}
        data-tooltip-html={text}
        data-tooltip-place="top"
        style={{cursor: 'pointer'}}
      >
        {text.slice(0, n-1)}...
      </a>
    </>
  );
  return text;
};


function truncateAdnCopy(text, n){
  if(text.length > n) return (
    <>
      {truncate(text, n)}
      <ClipboardCopy
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

export default function ConanPackage(props) {
  let router = useRouter();
  useEffect(() => {
    hljs.highlightAll();
  });
  const [selectedVersion, setSelectedVersion] = useState(props.recipeVersion !== null? props.recipeVersion: props.data[0].info.version);
  const indexSelectedVersion = Object.keys(props.data).filter(index => props.data[index].info.version === selectedVersion)[0];
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [selectedTab, setSelectedTab] = useState(indexSelectedVersion && props.data[indexSelectedVersion].info.status === "ok"? 'use_it': 'versions');
  if (!props.data) return (<div>Loading...</div>);
  const recipeData = props.data[indexSelectedVersion];
  const recipeStatus = recipeData.info.status;
  const recipeProfileSetting = recipeData.info.settings;
  const recipeRevision = recipeData.info.recipe_revision;
  const recipeDescription = recipeData.info.description;
  const recipeHomepage = recipeData.info.homepage;
  const recipeLabels = recipeData.info.labels;
  const recipeLicenses = Object.keys(recipeData.info.licenses);
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + recipeData.name;
  const recipeUseIt = recipeData.info.use_it;
  const recipeTotalDownloads = recipeData.info.downloads;
  const recipeDownloads = props.downloads[selectedVersion].downloads;
  const recipeDownloadsAll = props.downloads.all.downloads;
  const recipeDownloadsVersions = props.downloads.all.versions;
  const maintainedVersions = Object.values(props.data).filter(data => data.info.status === "ok").map(data => data.info.version);
  const unmaintainedVersions = Object.values(props.data).filter(data => data.info.status !== "ok").map(data => data.info.version);
  const metadatsInfo = (recipeDescription && true)

  const iconStatusColor = recipeStatus === 'ok'? 'green': 'orange'
  const extraInfo = recipeStatus === 'ok'? 'maintained version': recipeStatus + ' version'


  function RecipeInfo() {
    return (
      <Col xs lg="3" className="pl-4 mt-4 pt-4">
        {recipeDescription && <Row xs lg className="mb-2"><Col xs lg><h5>Recipe info</h5></Col></Row>}
        {recipeLicenses && recipeLicenses.length > 0 && (<Row>
          <Col xs lg>
            <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Licenses" data-tooltip-place="top">
              <LiaBalanceScaleSolid className="conanIconBlue conanIcon22" style={{verticalAlign: "middle;"}}/>
            </a> {recipeLicenses.map((license) => {
              if(valid_licenses.includes(license.toLowerCase())) return (
                <a
                  href={"https://choosealicense.com/licenses/" + license.toLowerCase()}
                  rel="noopener noreferrer"
                  target="_blank"
                >{license}</a>
              );
              return license;
            }).reduce((prev, curr) => [prev, ', ', curr])}
          </Col>
        </Row>)}

        {recipeDescription && (<Row>
          <Col xs lg>
            <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="GitHub repository" data-tooltip-place="top">
              <LiaGithub className="conanIconBlue conanIcon22" style={{verticalAlign: "middle;"}}/>
            </a> <Link href={recipeConanCenterUrl}>
              <a>View recipe on GitHub</a>
            </Link>
          </Col>
        </Row>)}

        {(recipeHomepage) && (<Row>
          <Col xs lg>
            <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Home page" data-tooltip-place="top">
              <IoMdHome className="conanIconBlue conanIcon22" style={{verticalAlign: "middle;"}}/>
            </a> <Link href={recipeHomepage}>
              <a>{truncate(sanitizeURL(recipeHomepage), 22)}</a>
            </Link>
          </Col>
        </Row>)}

        {recipeDescription && (<Row>
          <Col xs lg>
            <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Total downloads (current version downloads)" data-tooltip-place="top">
              <IoMdDownload className="conanIconBlue  " style={{verticalAlign: "middle;"}}/>
            </a> {Object.values(props.data).map( (e) => e.info.downloads ).reduce((a, b) => a + b, 0)}({recipeTotalDownloads})
          </Col>
        </Row>)}

        {(recipeDescription && <Row>
          <Col xs lg>
          <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Last updated date" data-tooltip-place="top">
              <MdOutlineToday className="conanIconBlue conanIcon22" style={{verticalAlign: "middle;"}}/>
            </a> {recipeData.info.timestamp}
          </Col>
        </Row>)}

        {recipeDescription && (<Row>
          <Col xs lg>
            <Tooltip id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Latest recipe revision" data-tooltip-place="top">
              <AiOutlinePushpin className="conanIconBlue conanIcon22" style={{verticalAlign: "middle;"}}/>
            </a>{truncateAdnCopy(recipeRevision, 20)}</Col>
        </Row>)}
        {recipeDescription && (<hr/>)}

        {recipeProfileSetting && recipeProfileSetting.length > 0 && (<Row className="mt-3">
          <Col xs lg>
            <h5>Availables packages</h5>
          </Col>
        </Row>)}
        {recipeProfileSetting && recipeProfileSetting.length > 0 && (<Row>
          <Col xs lg>
            {prettyProfiles(recipeProfileSetting).map((item) => (<Row key={item.key}>
              <Col xs lg>
                {item.badget}
              </Col>
            </Row>))}
          </Col>
        </Row>)}
        {recipeProfileSetting && recipeProfileSetting.length > 0 && (<hr/>)}

        {recipeDescription && <Row xs lg className="mt-3"><Col xs lg><h5>Install</h5></Col></Row>}
        {recipeDescription && <Row xs lg>
          <Col xs lg>
            Add the following line to your conanfile.txt:
            <pre>
              <code style={{backgroundColor: "white"}} className="language-ini">{
              "[requires]\n" +
              recipeData.name + "/"+ selectedVersion + "\n"}
              </code>
            </pre>
          </Col>
        </Row>}
      </Col>
    )
  }

  function TabButtons() {
    return (
      <>
        {recipeStatus === "ok" && <Button
          id="use_it"
          className={"tabButton " + ((selectedTab == 'use_it') && "tabButtonActive")}
          value="use_it"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><HiOutlineDocumentText className="conanIcon18 mr-1"/> Use it</Button>}
        <Button
          id="dependencies"
          className={"tabButton " + ((selectedTab == 'dependencies') && "tabButtonActive")}
          value="dependencies"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><PiGraphDuotone className="conanIcon18 mr-1"/> Dependencies</Button>
        <Button
          id="versions"
          className={"tabButton " + ((selectedTab == 'versions') && "tabButtonActive")}
          value="versions"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><FaTags className="conanIcon18 mr-1"/> Versions</Button>
        <Button
          id="badges"
          className={"tabButton " + ((selectedTab == 'badges') && "tabButtonActive")}
          value="badges"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><PiMedal className="conanIcon18 mr-1"/> Badges</Button>
        <Button
          id="stats"
          className={"tabButton " + ((selectedTab == 'stats') && "tabButtonActive")}
          value="stats"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><AiOutlineBarChart className="conanIcon18 mr-1"/> Stats</Button>
      </>
    )
  }

  function RecipeTabs() {
    return (
      <>
      {selectedTab=='use_it' && recipeDescription && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        {metadatsInfo && (<RecipeInfo/>)}
        <Col xs lg="9" className="mt-4 pl-4 pr-4 pt-4 recipeContentBox">
          <UseItTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion} />
        </Col>
      </Row>}
      {selectedTab=='dependencies' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        {metadatsInfo && (<RecipeInfo/>)}
        <Col xs lg="9" className="mt-4 pl-4 pr-4 pt-4 recipeContentBox"><DependenciesTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion}/></Col>
      </Row>}
      {selectedTab=='versions' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        <Col xs lg className="pb-4 mt-4 pl-4 pr-4 pt-4 recipeContentBox"><VersionsTab selector={setSelectedVersion} data={props.data} /></Col>
      </Row>}
      {selectedTab=='badges' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        <Col xs lg className="mt-4 pl-4 pr-4 pt-4 recipeContentBox"><BadgesTab recipeName={props.recipeName} /></Col>
      </Row>}
      {selectedTab=='stats' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        <Col xs lg className="mt-4 pl-4 pr-4 pt-4 recipeContentBox">
          <StatsTab
            maintainedVersions={maintainedVersions}
            recipeName={props.recipeName}
            recipeDownloadsAll={recipeDownloadsAll}
            selectedVersion={selectedVersion}
            data={props.data}
            currentVersionDownloads={recipeTotalDownloads}
          />
        </Col>
      </Row>}
      </>
    )
  }

  const valid_licenses = [
    '0bsd', 'afl-3.0', 'agpl-3.0', 'apache-2.0', 'artistic-2.0', 'bsd-2-clause',
    'bsd-3-clause-clear', 'bsd-3-clause', 'bsd-4-clause', 'bsl-1.0', 'cc-by-4.0',
    'cc-by-sa-4.0', 'cc0-1.0', 'cecill-2.1', 'cern-ohl-p-2.0', 'cern-ohl-s-2.0',
    'cern-ohl-w-2.0', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'eupl-1.2',
    'gfdl-1.3', 'gpl-2.0', 'gpl-3.0', 'isc', 'lgpl-2.1', 'lgpl-3.0', 'lppl-1.3c',
    'mit-0', 'mit', 'mpl-2.0', 'ms-pl', 'ms-rl', 'mulanpsl-2.0', 'ncsa', 'odbl-1.0',
    'ofl-1.1', 'osl-3.0', 'postgresql', 'unlicense', 'upl-1.0', 'vim', 'wtfpl', 'zlib'
  ];

  const onClickTopics = (topic) => {
    router.push(
      {
        pathname: '/center/recipes',
        query: {
          defaultValue: '',
          defaultTopics: topic}
      },
      '/center/recipes'
    );
  }

  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
        <Container className="conancontainer">
          <div className="mt-3 mb-3">
          <BasicSearchBar/>
          </div>
            <div className="pt-4 pl-2 pr-2 pb-4 recipeContentBox">
              <Col>
              <Row >
                <Col xs lg>
                  <Row>
                    <Col>
                      <h1 className="mt-2 mb-2" style={{display: 'inline'}}>
                        {recipeData.name}/{selectedVersion}
                      </h1><
                        ClipboardCopy
                          copyText={recipeData.name + "/" + selectedVersion}
                          tooltipStyle={{marginTop: "-14px"}}
                          isCopiedStyle={{color: 'green', verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
                          copyStyle={{verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
                        /> <a data-tooltip-id='package-info' data-tooltip-html={extraInfo} data-tooltip-place="top">
                        {(recipeStatus === "unmaintained") && (<PiWarningBold style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)}
                        {/*(recipeStatus === "ok") && (<MdOutlineCheckCircleOutline style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)*/}
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {!recipeDescription && (<Row className="mt-4"><Col xs lg><DefaultDescription name={recipeData.name}/></Col></Row>)}
              {recipeDescription && (<Row><Col xs lg>{recipeDescription}</Col></Row>)}
              {recipeLabels && Object.keys(recipeLabels).length > 0 && (<Row className="pt-2">
                <Col xs lg>
                  {Object.keys(recipeLabels).map((item) => (
                    <a style={{cursor: 'pointer'}} key={item} onClick={() => onClickTopics(recipeLabels[item])}>
                      <Badge className="recipeTopics" key={item}><FaHashtag/>{item}</Badge>
                    </a>
                  ))}
                  {(recipeStatus !== "ok") && (<Badge bg="warning" text="white"><PiWarningBold/> {recipeStatus}</Badge>)}
                </Col>
              </Row>)}
              </Col>
            </div>


          <div className="mt-4" style={{borderBottom: "2px solid #21AFFF"}}>
            {/*isTabletOrMobile && (<ButtonGroup size="sm" className="tabButtonGroup" vertical>
              <TabButtons/>
            </ButtonGroup>)*/}
            <ButtonGroup size="sm" className="tabButtonGroup">
              <TabButtons/>
            </ButtonGroup>
          </div>
          <RecipeTabs/>
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}
