import React from 'react';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import ConanHeader from '../../components/header';
import ConanFooter from '../../components/footer';

export default function ConanPackage(props) {

  if (!props.data) return <div>Loading...</div>
  return (
    <React.StrictMode>
      <ConanHeader/>
      <br/>
      <Container>
        <h1 className="text-center" >Conan {props.packageId} package site</h1>
        <br/>
        <Row>
          <Col xs lg="4"><p><h3>{props.data.name}/{props.data.info.version}</h3></p></Col>
          <Col xs lg="4"><p><b>Licenses:</b> {props.data.info.licenses.join(", ")}</p></Col>
          <Col xs lg="4"><p><b>Downloads:</b> {props.data.info.downloads}</p></Col>
        </Row>
        <Row>
          <Col xs lg><p><b>Description:</b> {props.data.info.description}</p></Col>
        </Row>
        <Row>
          <Col xs lg><p><b>Labels:</b> {props.data.info.labels.map((item) => (<d><Badge>{item}</Badge> </d>))}</p></Col>
        </Row>
        <Row>
          <Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.data.name}><a><p>{props.data.name} recipe</p></a></Link>
        </Row>
        <Row>
          <Tabs defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><br/><ReactMarkdown>{props.tabs.md.md}</ReactMarkdown></Tab>
            <Tab eventKey="packages" title="Packages"><br/></Tab>
            <Tab eventKey="examples" title="Examples"><br/><ReactMarkdown>{props.tabs.example.md}</ReactMarkdown></Tab>
            <Tab eventKey="options" title="Options"><br/></Tab>
            <Tab eventKey="badges" title="Badges"><br/><ReactMarkdown>{props.tabs.shields_io.md}</ReactMarkdown></Tab>
          </Tabs>
        </Row>
      </Container>
      <br/>
      <ConanFooter/>
    </React.StrictMode>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(context.params.packageId.toLowerCase())}`);
  const res_md = await fetch(`${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(context.params.packageId.toLowerCase())}/md`);
  const res_example = await fetch(`${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(context.params.packageId.toLowerCase())}/example`);
  const res_shields_io = await fetch(`${encodeURI(process.env.conanioServer)}/package/${encodeURIComponent(context.params.packageId.toLowerCase())}/shields_io`);
  const data = await res.json();
  const md = await res_md.json();
  const example = await res_example.json();
  const shields_io = await res_shields_io.json();
  return {
    props: {
      data: data,
      tabs: {
        md: md,
        example: example,
        shields_io: shields_io,
      },
      packageId: context.params.packageId,
    },
  }
}
