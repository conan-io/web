import React from "react";
import { useState } from "react";
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { BasicSearchBar } from "../components/searchbar";
import { ConanCenterHeader } from '../components/header';
import ConanFooter from '../components/footer';
import {get_json, get_json_list, get_urls} from '../service/service';
import { BiInfoCircle } from "react-icons/bi";

export async function getServerSideProps(context) {
  let urls = get_urls()
  const reference_num = await get_json(urls.reference.num, urls.api.private);

  return {
    props: {
      data: {
        /*popular: await get_json_list(urls.popular, urls.api.private),*/
        updated: await get_json_list(urls.updated, urls.api.private),
        new: await get_json_list(urls.new, urls.api.private),
        reference_num: reference_num.references,
        recipes_num: reference_num.recipes,
      },
    },
  }
}


function CenterList(props) {
  return (
    <div className="text-center">
      <Tooltip id="extra-info" />
      <h2>
        {props.name}{props.extraInfo && (<a data-tooltip-id="extra-info" data-tooltip-html={props.extraInfo} data-tooltip-place="top">
          <BiInfoCircle style={{padding: '0px 0px 0px 0px'}} className="mb-3 conanIconGrey conanIcon18"/>
        </a>)}
      </h2>
      <ListGroup>
        {props.data.map((info) => (
          <ListGroup.Item style={{border: '0.05rem solid #21AFFF', borderRadius: '10px', margin:'0px 0px 5px 0px'}} key={info.name + info.version}>
            <Link href={{ pathname: "/center/recipes/" + info.name, query: { version: info.version } }}><a>{info.name}{props.full_name && "/" + info.version}</a></Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default function Center(props) {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
          <br/>
          <Container className="conancontainer">
            <Container><h1 className="text-center">The Conan libraries and tools central repository</h1></Container>
            <br/>
            <BasicSearchBar recipes={props.data.recipes_num} references={props.data.reference_num}/>
            <br/>
            <Row className="justify-content-md-center">
              {/*props.data.popular.length > 0  && <Col xs lg="4"><CenterList data={props.data.popular} name="Popular recipes" full_name={true}/></Col>*/}
              {
                props.data.updated.length > 0 && <Col xs lg="4">
                  <CenterList
                    data={props.data.updated}
                    name="Just updated"
                    full_name={false}
                    extraInfo='List of the last recipes updated. Updated every 6 hours'
                  />
                </Col>
              }
              {
                props.data.new.length > 0 && <Col xs lg="4">
                  <CenterList
                   data={props.data.new}
                   name="New version"
                   full_name={true}
                   extraInfo='List of the latest versions indexed by the web. Updated every 6 hours'
                  />
                </Col>
              }
            </Row>
          </Container>
          <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  )
}
