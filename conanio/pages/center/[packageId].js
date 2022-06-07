import React from 'react';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactMarkdown from 'react-markdown';
import ConanHeader from '../../components/header';
import ConanFooter from '../../components/footer';

export default function ConanPackage(props) {

  if (!props.data) return <div>Loading...</div>
  return (
    <React.StrictMode>
      <ConanHeader/>
      <Container>
        <h1 className="text-center" >Conan {props.packageId} Site</h1>
        <Row>
          <Col>Name: {props.data.name}</Col>
        </Row>
        <Row>
          <Col>Version: {props.data.version}</Col>
        </Row>
        <Row>
          <Tabs defaultActiveKey="use-it" id="uncontrolled">
            <Tab eventKey="use-it" title="Use it"><ReactMarkdown>{props.tabs.md.md}</ReactMarkdown></Tab>
            <Tab eventKey="packages" title="Packages"></Tab>
            <Tab eventKey="examples" title="Examples"><ReactMarkdown>{props.tabs.example.md}</ReactMarkdown></Tab>
            <Tab eventKey="options" title="Options"></Tab>
            <Tab eventKey="badges" title="Badges"><ReactMarkdown>{props.tabs.shields_io.md}</ReactMarkdown></Tab>
          </Tabs>
        </Row>
      </Container>
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
