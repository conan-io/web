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
import Link from 'next/link';
import { ConanCenterHeader } from '../../../components/header';
import ConanFooter from '../../../components/footer';
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend} from 'recharts';
import { get_json, get_urls } from '../../../service/service';
import { DefaultDescription } from '../recipes';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome, IoMdDownload } from "react-icons/io";
import hljs from "highlight.js";
import { UseItTab, BadgesTab, DependenciesTab, VersionsTab } from "../../../components/recipeTabs";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlinePushpin } from "react-icons/ai";
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi";
import { BasicSearchBar } from "../../../components/searchbar";
import { Tooltip as ReactToolTip } from 'react-tooltip';


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

function sanitizeURL(url) {
  let protocol = new URL(url).protocol;
  return url.replace(protocol + "//", "");
}

function ClipboardCopy({ copyText }) {
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
      <ReactToolTip id="copy" style={{marginTop: "-14px"}}/>
      <a
        onClick={handleCopyClick}
        style={{cursor: 'pointer', display: 'inline'}}
        data-tooltip-id='copy'
        data-tooltip-html={isCopied ? "Copied!" : "Copy to clipboard"}
        data-tooltip-place="top"
      >
        <span>
          {isCopied ? <
              HiOutlineClipboardCheck className="conanIcon18"
              style={{color: 'green', verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
            /> : <
              HiOutlineClipboardCopy className="conanIcon18 conanIconBlue"
              style={{verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
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
  if (!props.data) return (<div>Loading...</div>);
  const recipeData = props.data[indexSelectedVersion];
  const recipeStatus = recipeData.info.status;
  const recipeRevision = recipeData.info.recipe_revision;
  const recipeDescription = recipeData.info.description;
  const recipeHomepage = recipeData.info.homepage;
  const recipeLabels = recipeData.info.labels;
  const recipeLicenses = Object.keys(recipeData.info.licenses);
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + recipeData.name;
  const recipeUseIt = recipeData.info.use_it;
  const recipeTotalDownloads = recipeData.info.downloads;
  const recipeDownloads = props.downloads[selectedVersion].downloads;
  const maintainedVersions = Object.values(props.data).filter(data => data.info.status === "ok").map(data => data.info.version);
  const unmaintainedVersions = Object.values(props.data).filter(data => data.info.status !== "ok").map(data => data.info.version);

  const iconStatusColor = recipeStatus === 'ok'? 'green': 'orange'
  const extraInfo = recipeStatus === 'ok'? 'maintained version': recipeStatus + ' version'

  const valid_licenses = [
    '0bsd',
    'afl-3.0',
    'agpl-3.0',
    'apache-2.0',
    'artistic-2.0',
    'bsd-2-clause',
    'bsd-3-clause-clear',
    'bsd-3-clause',
    'bsd-4-clause',
    'bsl-1.0',
    'cc-by-4.0',
    'cc-by-sa-4.0',
    'cc0-1.0',
    'cecill-2.1',
    'cern-ohl-p-2.0',
    'cern-ohl-s-2.0',
    'cern-ohl-w-2.0',
    'ecl-2.0',
    'epl-1.0',
    'epl-2.0',
    'eupl-1.1',
    'eupl-1.2',
    'gfdl-1.3',
    'gpl-2.0',
    'gpl-3.0',
    'isc',
    'lgpl-2.1',
    'lgpl-3.0',
    'lppl-1.3c',
    'mit-0',
    'mit',
    'mpl-2.0',
    'ms-pl',
    'ms-rl',
    'mulanpsl-2.0',
    'ncsa',
    'odbl-1.0',
    'ofl-1.1',
    'osl-3.0',
    'postgresql',
    'unlicense',
    'upl-1.0',
    'vim',
    'wtfpl',
    'zlib'
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
          <div style={{backgroundColor:"white"}} className="advantage text-center black text-center conan-card">
            <div className="advantage-text text-left mt-4 mr-4 ml-4">
              <Row>
                <Col xs lg>
                  <Row>
                    <Col>
                      <h1 className="mt-2 mb-2" style={{display: 'inline'}}>
                        {recipeData.name}/{selectedVersion}
                      </h1><ClipboardCopy copyText={recipeData.name + "/" + selectedVersion}/> <a data-tooltip-id='package-info' data-tooltip-html={extraInfo} data-tooltip-place="top">
                        {(recipeStatus === "unmaintained") && (<PiWarningBold style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)}
                        {/*(recipeStatus === "ok") && (<MdOutlineCheckCircleOutline style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)*/}
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs lg="8" className="mt-2">
                  {recipeDescription && (<Row>
                    <Col className="mb-2" xs lg>{recipeDescription}</Col>
                  </Row>)}

                  {recipeLicenses && recipeLicenses.length > 0 && (<Row>
                    <Col xs lg>
                      <ReactToolTip id="package-info"/>
                      <a data-tooltip-id='package-info' data-tooltip-html="Licenses" data-tooltip-place="top">
                        <LiaBalanceScaleSolid className="conanIconBlue conanIcon26"/>
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
                      <ReactToolTip id="package-info"/>
                      <a data-tooltip-id='package-info' data-tooltip-html="GitHub repository" data-tooltip-place="top">
                        <LiaGithub className="conanIconBlue conanIcon26"/>
                      </a> <Link href={recipeConanCenterUrl}>
                        <a>View recipe on GitHub</a>
                      </Link>
                    </Col>
                  </Row>)}

                  {(recipeHomepage) && (<Row>
                    <Col xs lg="8">
                      <ReactToolTip id="package-info"/>
                      <a data-tooltip-id='package-info' data-tooltip-html="Home page" data-tooltip-place="top">
                        <IoMdHome className="conanIconBlue conanIcon26"/>
                      </a> <Link href={recipeHomepage}>
                        <a>{sanitizeURL(recipeHomepage)}</a>
                      </Link>
                    </Col>
                  </Row>)}

                  {(recipeDescription && recipeTotalDownloads > 0) && (<Row>
                    <Col xs lg="8">
                      <ReactToolTip id="package-info"/>
                      <a data-tooltip-id='package-info' data-tooltip-html="Recipe version downloads" data-tooltip-place="top">
                        <IoMdDownload className="conanIconBlue conanIcon26"/>
                      </a> {recipeTotalDownloads}
                    </Col>
                  </Row>)}

                  {recipeDescription && (<Row>
                    <Col xs lg>
                      <ReactToolTip id="package-info"/>
                      <a data-tooltip-id='package-info' data-tooltip-html="Latest recipe revision" data-tooltip-place="top">
                        <AiOutlinePushpin className="conanIconBlue conanIcon26"/>
                      </a> {recipeRevision}</Col>
                  </Row>)}

                  {recipeLabels && Object.keys(recipeLabels).length > 0 && (<Row className="mt-2">
                    <Col xs lg>
                      <p>
                        {
                          Object.keys(recipeLabels).map(
                            (item) => (
                              <a style={{cursor: 'pointer'}} key={item} onClick={() => onClickTopics(recipeLabels[item])}>
                                <Badge key={item}>#{item}</Badge>
                              </a>
                            )
                          )
                        }
                        {
                          (recipeStatus !== "ok") && (<Badge bg="warning" text="white"><PiWarningBold/> {recipeStatus}</Badge>)
                        }
                      </p>
                    </Col>
                  </Row>)}
                </Col>

                {recipeDescription && recipeDownloads && recipeDownloads.length > 0 &&
                <Col xs lg="4" className="mt-2">
                  <Row className="justify-content-md-center">
                    <LineChart width={340} height={230} data={recipeDownloads} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <XAxis dataKey="date" stroke="#808080"/>
                      <YAxis dataKey="downloads" stroke="#808080"/>
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="downloads" stroke="#21AFFF" yAxisId={0} />
                    </LineChart>
                  </Row>
                </Col>}
              </Row>
              {!recipeDescription && (<DefaultDescription name={recipeData.name}/>)}
              <div id="main-tab" className="mt-2 mb-4">
                <Tabs className="package-tabs" id="uncontrolled">
                  {recipeDescription && <Tab eventKey="use-it" title="Use it"><br/><UseItTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion} /></Tab>}
                  {recipeDescription && <Tab eventKey="dependencies" title="Dependencies"><br/><DependenciesTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion}/></Tab>}
                  <Tab eventKey="version" title="Versions"><br/><VersionsTab selector={setSelectedVersion} data={props.data} /></Tab>
                  <Tab eventKey="badges" title="Badges"><br/><BadgesTab recipeName={props.recipeName} /></Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}
