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
import { ConanCenterHeader } from '../../../../components/header';
import ConanFooter from '../../../../components/footer';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts';
import { get_json, get_urls } from '../../../../service/service';
import { DefaultDescription } from '../../recipes';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import hljs from "highlight.js";
import { UseItTab, BadgesTab, DependenciesTab } from "../../../../components/recipeTabs";
import { FaCopy } from "react-icons/fa";
import { HiClipboardCopy } from "react-icons/hi";
import { FaTags } from "react-icons/fa";


export async function getServerSideProps(context) {
  let urls = get_urls({packageId: context.params.recipeName});
  let data = await get_json(urls.package.info, urls.api.private);
  return {
    props: {
      data: data,
      downloads: await get_json(urls.package.downloads, urls.api.private),
      recipeName: context.params.recipeName,
      recipeVersion: context.params.version
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

  const handleChange = (e) => {
    setSelectedVersion(e.target.value)
  }

  if (!props.data) return <div>Loading...</div>

  const recipeData = props.data[props.recipeVersion];
  const recipeDescription = recipeData.info.description;
  const recipeLabels = recipeData.info.labels;
  const recipeLicenses = recipeData.info.licenses;
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + recipeData.name;
  const recipeUseIt = recipeData.info.use_it;
  const recipeDownloads = props.downloads[props.recipeVersion].downloads;
  const maintainedVersions = Object.keys(props.data).filter(version => version !== props.recipeVersion && props.data[version].info.status === "ok")
  const unmaintainedVersions = Object.keys(props.data).filter(version => version !== props.recipeVersion && props.data[version].info.status !== "ok")



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
                  <h1 className="mt-2 mb-2" style={{display: 'inline'}}>{recipeData.name}</h1> <h4 style={{display: 'inline',color: 'grey'}}>v{props.recipeVersion}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <FaTags className="conanIconBlue"/> {
                      maintainedVersions.map(
                        version => (
                          <Link key={version} href={{ pathname: "/center/recipes/" + props.data[version].name + "/" + version }}>
                            <a>{version} </a>
                          </Link>
                        )
                      )
                    }
                    { unmaintainedVersions.length > 0 &&
                    (
                      <div>
                        <FaTags style={{color: 'grey'}}/> Other versions: {
                          unmaintainedVersions.map(
                            version => (
                              <Link key={version} href={{ pathname: "/center/recipes/" + props.data[version].name + "/" + version }}>
                                <a style={{color: 'grey'}}>{version} </a>
                              </Link>
                            )
                          )
                        }
                      </div>
                    )
                  }
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs lg="8">
              {recipeDescription && (<Row>
                <Col className="mb-2" xs lg>{recipeDescription}</Col>
              </Row>)}

              {recipeLicenses && recipeLicenses.length > 0 && (<Row>
                <Col xs lg="8"><LiaBalanceScaleSolid className="conanIconBlue conanIcon26"/> {recipeLicenses.join(", ")}</Col>
              </Row>)}

              {((recipeDownloads && recipeDownloads.length > 0) || recipeData.info.downloads > 0) && (<Row>
                <Col xs lg="8"><b>Downloads:</b> {recipeData.info.downloads}</Col>
              </Row>)}

              {recipeDescription && (<Row>
                <Col xs lg="8"><Link href={recipeConanCenterUrl}><a><LiaGithub className="conanIconBlue conanIcon26"/> Recipe source</a></Link></Col>
              </Row>)}

              {(recipeUseIt && recipeUseIt.homepage) && (<Row>
                <Col xs lg="8" className="mb-2"><Link href={recipeUseIt.homepage}><a><IoMdHome className="conanIconBlue conanIcon26"/>{sanitizeURL(recipeUseIt.homepage)}</a></Link></Col>
              </Row>)}

              {recipeLabels && recipeLabels.length > 0 && (<Row>
                <Col xs lg="8"><p> {recipeLabels.map((item) => (<Badge key={item}>#{item}</Badge>))}</p></Col>
              </Row>)}
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
          {!recipeDescription && (<DefaultDescription name={recipeData.name}/>)}
          {recipeDescription && (<Tabs className="package-tabs" defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><UseItTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={props.recipeVersion} /></Tab>
            {/* FIXME: we're not passing showUnmaintainedVersions to handle it! */}
            <Tab eventKey="dependencies" title="Dependencies"><br/><DependenciesTab info={recipeUseIt} recipeName={props.recipeName} recipeVersion={props.recipeVersion} setRecipeVersion={handleChange} /></Tab>
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
