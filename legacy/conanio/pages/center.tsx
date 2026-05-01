import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { BasicSearchBar, ConanCenterHeader, ConanFooter, Conan1xBanner } from "@/components";
import {getJson, getJsonList, getUrls, RecipeBasic, RecipeReference } from '@/service';
import { BiInfoCircle } from "react-icons/bi";
import { GetServerSideProps, NextPage } from "next";

interface PageProps  {
    data: {
        popular: RecipeBasic[],
        updated: RecipeBasic[],
        new: RecipeBasic[],
        referenceNum: number,
        recipesNum: number,
    }
}

export const getServerSideProps: GetServerSideProps = async () => {
  let urls = getUrls()
  const referenceNumResponse = await getJson<RecipeReference>(urls.reference.num, urls.api.private);
  const popularResponse = await getJsonList<RecipeBasic>(urls.popular, urls.api.private)
  const updatedResponse = await getJsonList<RecipeBasic>(urls.updated, urls.api.private)
  const newResponse = await getJsonList<RecipeBasic>(urls.new, urls.api.private)

  const _props: PageProps = {
    data: {
      popular: popularResponse.data,
      updated: updatedResponse.data,
      new: newResponse.data,
      referenceNum: referenceNumResponse.data.references,
      recipesNum: referenceNumResponse.data.recipes,
    }
  }
  return { props: _props}
}


const CenterList = (props: { name: string; extraInfo: string; data: RecipeBasic[]; isFullName: boolean }) => (
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
            <Link href={{ pathname: "/center/recipes/" + info.name, query: { version: encodeURIComponent(info.version || "") } }}>
              <div onClick={
                () => {
                  window.dataLayer.push({
                    'event': 'fireEvent',
                    'event_name': 'element_click',
                    'type': 'ui',
                    'purpose': props.name.toLowerCase(),
                    'description': props.isFullName ? info.name + "/" + info.version: info.name
                  });
                }}
              >
                {info.name}{props.isFullName && "/" + info.version}
              </div>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )

const Center: NextPage<PageProps> = (props) => (
  <React.StrictMode>

    <div className="flex-wrapper bg-conan-blue">
      <ConanCenterHeader/>
      <Conan1xBanner/>
        <br/>
        <Container className="conancontainer">
          <Container><h1 className="text-center">The Conan libraries and tools central repository</h1></Container>
          <br/>
          <BasicSearchBar recipes={props.data.recipesNum} references={props.data.referenceNum}/>
          <br/>
          <Row className="justify-content-md-center">
            {
              props.data.popular.length > 0  && <Col xs="12" md="4" lg="4">
                <CenterList
                  data={props.data.popular}
                  name="Popular recipes"
                  isFullName={false}
                  extraInfo='The most downloaded recipes in the last 30 days'
                />
                </Col>
            }
            {
              props.data.updated.length > 0 && <Col xs="12" md="4" lg="4">
                <CenterList
                  data={props.data.updated}
                  name="Just updated"
                  isFullName={false}
                  extraInfo='Last updated recipes'
                />
              </Col>
            }
            {
              props.data.new.length > 0 && <Col xs="12" md="4" lg="4">
                <CenterList
                 data={props.data.new}
                 name="New version"
                 isFullName={true}
                 extraInfo='Latest indexed versions'
                />
              </Col>
            }
          </Row>
        </Container>
        <br/>
      <ConanFooter/>
    </div>

  </React.StrictMode>
)
 

export default Center;
