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
import {get_json, get_urls} from '../../../service/service';
import { DefaultDescription } from '../recipes';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import hljs from "highlight.js";
import {UseItTab, BadgesTab, DependenciesTab} from "./recipeTabs";


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
  }
}

function sanitizeURL(url) {
  let protocol = new URL(url).protocol;
  return url.replace(protocol + "//", "");
}


export default function ConanPackage(props) {
  useEffect(() => {
    hljs.highlightAll();
  });
  const [selectedVersion, setSelectedVersion] = useState(props.recipeVersion !== null? props.recipeVersion: Object.keys(props.data)[0]);
  const [showUnmaintainedVersions, setShowUnmaintainedVersions] = useState(false);
  const handleChange = (e) => {
    setSelectedVersion(e.target.value)
  }

  const onUnmaintainedVersionsChange = (e) => {
    setShowUnmaintainedVersions(e.target.checked)
  };

  if (!props.data) return <div>Loading...</div>

  const selectedData = props.data[selectedVersion];
  const recipeDescription = selectedData.info.description;
  const recipeLabels = selectedData.info.labels;
  const recipeLicenses = selectedData.info.licenses;
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + selectedData.name;
  const recipeUseIt = selectedData.info.use_it;
  const recipeDownloads = props.downloads[selectedVersion].downloads;


  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
        <br/>
        <Container className="conancontainer">
          <Row>
            <Col xs lg="8">
              <Row>
                <Col>
                <h4 className="mt-2 mb-2 font-weight-bold">
                  {selectedData.name}/
                  <Form.Select size="sm" value={selectedVersion} onChange={handleChange}>
                    {Object.keys(props.data).filter(version => showUnmaintainedVersions || props.data[version].info.status === "ok").map((version) => (<option key={version} value={version}>{version}</option>))}
                  </Form.Select>
                </h4>
                </Col>
              </Row>
              {
                Object.keys(props.data).filter(version => props.data[version].info.status === "unmaintained").length > 0 && (
                <Row>
                  <Col>
                    <Form>
                      <Form.Switch
                        id="custom-switch"
                        label="Show unmaintained versions"
                        defaultChecked={showUnmaintainedVersions}
                        onChange={onUnmaintainedVersionsChange}
                      />
                    </Form>
                  </Col>
                </Row>)
              }
              <br/>
              {recipeDescription && (<Row>
                <Col className="mb-2" xs lg>{recipeDescription}</Col>
              </Row>)}
              {recipeLabels && recipeLabels.length > 0 && (<Row>
                <Col xs lg><p> {recipeLabels.map((item) => (<Badge key={item}>#{item}</Badge>))}</p></Col>
              </Row>)}
              {recipeLicenses && recipeLicenses.length > 0 && (<Row>
                <Col xs lg="8"><LiaBalanceScaleSolid className="conanIconBlue"/> {recipeLicenses.join(", ")}</Col>
              </Row>)}
              {((recipeDownloads && recipeDownloads.length > 0) || selectedData.info.downloads > 0) && (<Row>
                <Col xs lg="8"><b>Downloads:</b> {selectedData.info.downloads}</Col>
              </Row>)}
              {recipeDescription && (<Row>
                <Col xs lg className="mb-2"><Link href={recipeConanCenterUrl}><a><LiaGithub className="conanIconBlue"/>{sanitizeURL(recipeConanCenterUrl)}</a></Link></Col>
              </Row>)}
              {(recipeUseIt && recipeUseIt.homepage) && (<Row>
                <Col xs lg="8"><Link href={recipeUseIt.homepage}><a><IoMdHome className="conanIconBlue"/>{sanitizeURL(recipeUseIt.homepage)}</a></Link></Col>
              </Row>)}
              <br/>
            </Col>
            { recipeDownloads && recipeDownloads.length > 0 &&
            <Col xs lg="4">
              <LineChart width={400} height={200} data={recipeDownloads} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="downloads" stroke="#0d6efd" yAxisId={0} />
              </LineChart>
            </Col> }
          </Row>
          {!recipeDescription && (<DefaultDescription name={selectedData.name}/>)}
          {recipeDescription && (<Tabs className="package-tabs" defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><UseItTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion} /></Tab>
            <Tab eventKey="dependencies" title="Dependencies"><br/><DependenciesTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={selectedVersion} /></Tab>
            <Tab eventKey="badges" title="Badges"><br/><BadgesTab recipeName={props.recipeName} /></Tab>
          </Tabs>)}
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  )
}
