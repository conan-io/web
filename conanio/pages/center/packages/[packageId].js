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
import rehypeHighlight from 'rehype-highlight';
import cmake from 'highlight.js/lib/languages/cmake';
import makefile from 'highlight.js/lib/languages/makefile';
import { ConanCenterHeader } from '../../../components/header';
import ConanFooter from '../../../components/footer';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts';
import {get_json, get_urls} from '../../../service/service';
import { DefaultDescription } from '../packages';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";


export async function getServerSideProps(context) {
  let urls = get_urls({packageId: context.params.packageId})
  let data = await get_json(urls.package.info, urls.api.private)
  return {
    props: {
      data: data,
      downloads: await get_json(urls.package.downloads, urls.api.private),
      packageId: context.params.packageId,
    },
  }
}


function RenderedMarkdown({md}) {
  if (typeof md === 'undefined') {
    return "It was not possible to load this information. Please, check if this recipe version is compatible with Conan v2.x.";
  }
  return <div><pre>{JSON.stringify(md, null, 2)}</pre></div>;
}


function BadgesTab({packageName}) {
  return (
    <div>
      <img src={"https://img.shields.io/conan/v/" + packageName} alt="Conan Center"></img>
      <br/><br/>
      <Tabs className="package-tabs" defaultActiveKey="Markdown" id="uncontrolled">
        <Tab eventKey="Markdown" title="Markdown"><br/><pre><code className='badges-code'>![Conan Center](https://img.shields.io/conan/v/{packageName})</code></pre></Tab>
        <Tab eventKey="reStructuredText" title="reStructuredText"><br/><pre><code className='badges-code'>.. image:: https://img.shields.io/conan/v/{packageName}   :alt: Conan Center</code></pre></Tab>
        <Tab eventKey="AsciiDoc" title="AsciiDoc"><br/><pre><code className='badges-code'>image:https://img.shields.io/conan/v/{packageName} [Conan Center]</code></pre></Tab>
        <Tab eventKey="HTML" title="HTML"><br/><pre><code className='badges-code'>&lt;img alt=&quot;Conan Center&quot; src=&quot;https://img.shields.io/conan/v/{packageName}&quot;&gt;</code></pre></Tab>
      </Tabs>
    </div>
  );
}

export default function ConanPackage(props) {
  const [selectedVersion, setSelectedVersion] = useState(Object.keys(props.data)[0]);
  const handleChange = (e) => {
    setSelectedVersion(e.target.value)
  }

  if (!props.data) return <div>Loading...</div>
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
                  {props.data[selectedVersion].name}/
                  <Form.Select size="sm" value={selectedVersion} onChange={handleChange}>
                    {Object.keys(props.data).map((version) => (<option key={version} value={version}>{version}</option>))}
                  </Form.Select>
                </h4>
                <br/>
                </Col>
              </Row>
              {props.data[selectedVersion].info.description && (<Row>
                <Col className="mb-2" xs lg>{props.data[selectedVersion].info.description}</Col>
              </Row>)}
              {props.data[selectedVersion].info.licenses && props.data[selectedVersion].info.licenses.length > 0 && (<Row>
                <Col xs lg="8"><LiaBalanceScaleSolid className="conanIconBlue"/> {props.data[selectedVersion].info.licenses.join(", ")}</Col>
              </Row>)}
              {((props.downloads[selectedVersion].downloads && props.downloads[selectedVersion].downloads.length > 0) || props.data[selectedVersion].info.downloads > 0) && (<Row>
                <Col xs lg="8"><b>Downloads:</b> {props.data[selectedVersion].info.downloads}</Col>
              </Row>)}
              {props.data[selectedVersion].info.description && (<Row>
                <Col xs lg className="mb-2"><Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.data[selectedVersion].name}><a><LiaGithub className="conanIconBlue"/>Recipe source</a></Link></Col>
              </Row>)}
              {props.data[selectedVersion].info.labels && props.data[selectedVersion].info.labels.length > 0 && (<Row>
                <Col xs lg><p> {props.data[selectedVersion].info.labels.map((item) => (<Badge key={item}>#{item}</Badge>))}</p></Col>
              </Row>)}
            </Col>
            { props.downloads[selectedVersion].downloads && props.downloads[selectedVersion].downloads.length > 0 &&
            <Col xs lg="4">
              <LineChart width={400} height={200} data={props.downloads[selectedVersion].downloads} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="downloads" stroke="#0d6efd" yAxisId={0} />
              </LineChart>
            </Col> }
          </Row>
          {!props.data[selectedVersion].info.description && (<DefaultDescription name={props.data[selectedVersion].name}/>)}
          {props.data[selectedVersion].info.description && (<Tabs className="package-tabs" defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><RenderedMarkdown md={props.data[selectedVersion].info.use_it} /></Tab>
            <Tab eventKey="badges" title="Badges"><br/><BadgesTab packageName={props.packageId} /></Tab>
          </Tabs>)}
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  )
}
