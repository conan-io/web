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
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import cmake from 'highlight.js/lib/languages/cmake';
import makefile from 'highlight.js/lib/languages/makefile';
import { ConanHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line} from 'recharts';
import {get_json, get_urls} from '../../service/service';


export async function getServerSideProps(context) {
  let urls = get_urls({packageId: context.params.packageId})
  let data = await get_json(urls.package.info, urls.api.private)
  return {
    props: {
      data: data,
      downloads: await get_json(urls.package.downloads, urls.api.private),
      tabs: {
        md: await get_json(urls.package.md, urls.api.private),
        example: await get_json(urls.package.example, urls.api.private),
        options: await get_json(urls.package.options, urls.api.private),
        packages: await get_json(urls.package.packages, urls.api.private),
        shields_io: await get_json(urls.package.shields_io, urls.api.private),
      },
      packageId: context.params.packageId,
    },
  }
}


function RenderedMarkdown({md}) {
  if (typeof md === 'undefined') {
    return "It was not possible to load this information. Please, check if this recipe version is compatible with Conan v2.x.";
  }
  return <ReactMarkdown rehypePlugins={[[rehypeHighlight, {languages: {cmake, makefile}, detect: true, ignoreMissing: true}]]}>{md}</ReactMarkdown> ;
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
      <div className="flex-wrapper">
        <ConanHeader/>
        <br/>
        <Container>
          <h1 className="text-center" >Conan {props.packageId} package site</h1>
          <br/>
          <Row>
            <Col xs lg="8">
              <Row>
                <Col>
                  <h3>
                    {props.data[selectedVersion].name}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col xs lg="4">
                   <Form.Select size="sm" value={selectedVersion} onChange={handleChange}>
                      {Object.keys(props.data).map((version) => (<option key={version} value={version}>Version: {version}</option>))}
                    </Form.Select>
                </Col>
                <Col xs lg="5"><p><b>Licenses:</b> {props.data[selectedVersion].info.licenses.join(", ")}</p></Col>
                { ((props.downloads[selectedVersion].downloads && props.downloads[selectedVersion].downloads.length > 0) ||
                  props.data[selectedVersion].info.downloads > 0) &&
                  <Col xs lg="3"><p><b>Downloads:</b> {props.data[selectedVersion].info.downloads}</p></Col> }
              </Row>
              <Row>
                <Col xs lg><p><b>Description:</b> {props.data[selectedVersion].info.description}</p></Col>
              </Row>
              <Row>
                <Col xs lg><p><b>Labels:</b> {props.data[selectedVersion].info.labels.map((item) => (<Badge key={item}>{item}</Badge>))}</p></Col>
              </Row>
              <Row>
                <Col xs lg><Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.data[selectedVersion].name}><a><p>{props.data[selectedVersion].name} recipe</p></a></Link></Col>
              </Row>
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
          <Tabs defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><RenderedMarkdown md={props.tabs.md[selectedVersion].md} /></Tab>
            <Tab eventKey="badges" title="Badges"><br/><ReactMarkdown>{props.tabs.shields_io[selectedVersion].md}</ReactMarkdown></Tab>
            {/*
            <Tab eventKey="packages" title="Packages"><br/><ReactMarkdown>{props.tabs.packages[selectedVersion].md}</ReactMarkdown></Tab>
            <Tab eventKey="examples" title="Examples"><br/><ReactMarkdown>{props.tabs.example[selectedVersion].md}</ReactMarkdown></Tab>
            <Tab eventKey="options" title="Options"><br/><ReactMarkdown>{props.tabs.options[selectedVersion].md}</ReactMarkdown></Tab>
            */}
          </Tabs>
        </Container>
        <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  )
}
