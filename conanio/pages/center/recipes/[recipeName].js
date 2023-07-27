import React from 'react';
import { useState, useEffect } from "react";
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
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts';
import { get_json, get_urls } from '../../../service/service';
import { DefaultDescription } from '../recipes';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import hljs from "highlight.js";
import { UseItTab, BadgesTab, DependenciesTab } from "../../../components/recipeTabs";
import { FaCopy } from "react-icons/fa";
import { HiClipboardCopy } from "react-icons/hi";
import { FaTags } from "react-icons/fa";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineSyncDisabled } from "react-icons/md";


export async function getServerSideProps(context) {
  let urls = get_urls({packageId: context.params.recipeName});
  let data = await get_json(urls.package.info, urls.api.private);
  return {
    props: {
      data: data,
      /*downloads: await get_json(urls.package.downloads, urls.api.private),*/
      recipeName: context.params.recipeName,
      recipeVersion: context.query.version? context.query.version: null
    },
  };
}

function sanitizeURL(url) {
  let protocol = new URL(url).protocol;
  return url.replace(protocol + "//", "");
}


export default function ConanPackage(props) {
  useEffect(() => {
    hljs.highlightAll();
  });

  const [showOldVersions, setShowOldVersions] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(props.recipeVersion !== null? props.recipeVersion: Object.keys(props.data)[0]);

  if (!props.data) return (<div>Loading...</div>);

  const recipeData = props.data[selectedVersion];
  const recipeStatus = recipeData.info.status;
  const recipeDescription = recipeData.info.description;
  const recipeLabels = recipeData.info.labels;
  const recipeLicenses = recipeData.info.licenses;
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + recipeData.name;
  const recipeUseIt = recipeData.info.use_it;
  /*const recipeDownloads = props.downloads[selectedVersion].downloads;*/
  const maintainedVersions = Object.keys(props.data).filter(version => props.data[version].info.status === "ok");
  const unmaintainedVersions = Object.keys(props.data).filter(version => props.data[version].info.status !== "ok");

  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
        <br/>
        <Container className="conancontainer">
          <Row>
            <Col xs lg>
              <Row>
                <Col>
                  <h1 className="mt-2 mb-2" style={{display: 'inline'}}>
                    {recipeData.name}/{selectedVersion}{
                      (recipeStatus !== "ok") && (<
                          MdOutlineSyncDisabled
                          style={{
                            height: '30px',
                            width: '30px'
                          }}
                        />)
                    }
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>
                    <FaTags className="conanIconBlue"/> {
                      maintainedVersions.map(
                        version => (
                          <a key={version} style={{color: '#007bff',cursor: 'pointer'}} onClick={()=>{setSelectedVersion(version)}}>{version}</a>
                        )
                      ).reduce((prev, curr) => [prev, ', ', curr])
                    }
                    {!showOldVersions && unmaintainedVersions.length > 0 &&
                      <div>
                        <a style={{color: 'grey',cursor: 'pointer'}} onClick={()=>{setShowOldVersions(!showOldVersions)}}> show deprecated</a>
                      </div>
                    }
                    {showOldVersions && unmaintainedVersions.length > 0 && ", " }
                    { showOldVersions && unmaintainedVersions.length > 0 &&
                      (
                       unmaintainedVersions.map(
                          version => (
                            <a key={version} style={{color: 'grey', cursor: 'pointer'}} onClick={()=>{setSelectedVersion(version)}}>{version}</a>
                          )
                        ).reduce((prev, curr) => [prev, ', ', curr])
                      )
                    }
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs lg="8">
              {recipeDescription && (<Row>
                <Col className="mt-2 mb-2" xs lg>{recipeDescription}</Col>
              </Row>)}

              {recipeLicenses && recipeLicenses.length > 0 && (<Row>
                <Col xs lg="8"><LiaBalanceScaleSolid className="conanIconBlue conanIcon26"/> {recipeLicenses.join(", ")}</Col>
              </Row>)}

              {/*((recipeDownloads && recipeDownloads.length > 0) || recipeData.info.downloads > 0) && (<Row>
                <Col xs lg="8"><b>Downloads:</b> {recipeData.info.downloads}</Col>
              </Row>)*/}

              {recipeDescription && (<Row>
                <Col xs lg="8"><Link href={recipeConanCenterUrl}><a><LiaGithub className="conanIconBlue conanIcon26"/> View recipe on GitHub</a></Link></Col>
              </Row>)}

              {(recipeUseIt && recipeUseIt.homepage) && (<Row>
                <Col xs lg="8" className="mb-2"><Link href={recipeUseIt.homepage}><a><IoMdHome className="conanIconBlue conanIcon26"/>{sanitizeURL(recipeUseIt.homepage)}</a></Link></Col>
              </Row>)}

              {recipeLabels && recipeLabels.length > 0 && (<Row>
                <Col xs lg="8">
                  <p>
                    {recipeLabels.map((item) => (<Badge key={item}>#{item}</Badge>))}
                    {
                      (recipeStatus !== "ok") && (<Badge bg="warning" text="white"><PiWarningBold/> {recipeStatus}</Badge>)
                    }
                  </p>
                </Col>
              </Row>)}
            </Col>

            {/* recipeDownloads && recipeDownloads.length > 0 &&
            <Col xs lg="4">
              <LineChart width={400} height={200} data={recipeDownloads} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="downloads" stroke="#0d6efd" yAxisId={0} />
              </LineChart>
            </Col> */}
          </Row>
          {!recipeDescription && (<DefaultDescription name={recipeData.name}/>)}
          {recipeDescription && <Tabs className="package-tabs" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><UseItTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion} /></Tab>
            <Tab eventKey="dependencies" title="Dependencies"><br/><DependenciesTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion}/></Tab>
            <Tab eventKey="badges" title="Badges"><br/><BadgesTab recipeName={props.recipeName} /></Tab>
          </Tabs>}
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  );
}
