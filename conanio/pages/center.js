import React from "react";
import { useState, useEffect } from "react";
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConanSearchBar } from "../components/searchbar";
import { ConanCenterHeader } from '../components/header';
import ConanFooter from '../components/footer';
import useSWR from 'swr';
import {get_json, get_json_list, get_urls, get_json_list_with_id} from '../service/service';

export async function getServerSideProps(context) {
  let urls = get_urls()
  const reference_num = await get_json(urls.reference.num, urls.api.private);

  return {
    props: {
      data: {
        popular: await get_json_list(urls.popular, urls.api.private),
        updated: await get_json_list(urls.updated, urls.api.private),
        new: await get_json_list(urls.new, urls.api.private),
        reference_num: reference_num.references,
      },
    },
  }
}

function CenterSearchBar(props) {

  let router = useRouter();
  const [value, setValue] = useState('');
  const [allTopics, setAllTopics] = useState(null);

  const handleChange = (e) => {
    setValue(e);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: { defaultValue: value }
      },
      '/search'
    );
    //window.location.reload(false);
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Row>
        <Col>
          <ConanSearchBar value={value} handleChange={handleChange} searchButton={props.button} data_to_show={props.data_to_show}/>
        </Col>
      </Row>
    </Form>
  );
}

function CenterList(props) {
  return (
    <div className="text-center">
      <h2>{props.name}</h2>
      <ListGroup>
        {props.data.map((info) => (<ListGroup.Item key={info.name}><Link href={"/center/" + info.name}><a>{info.name}{props.full_name && "/"+info.version}</a></Link></ListGroup.Item>))}
      </ListGroup>
    </div>
  )
}

export default function Center(props) {
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
        <ConanCenterHeader/>
          <br/>
          <Container className="conancontainer">
            <Container><h1 className="text-center">Conan Center</h1></Container>
            <Row>
              <Col><CenterSearchBar data_to_show={props.data.reference_num}/></Col>
            </Row>
            <Row>
              {/*props.data.popular.length > 0  && <Col><CenterList data={props.data.popular} name="Popular Package" full_name={true}/></Col>*/}
              {props.data.updated.length > 0 && <Col><CenterList data={props.data.updated} name="Just Updated" full_name={false}/></Col>}
              {props.data.new.length > 0 && <Col><CenterList data={props.data.new} name="New Version" full_name={true}/></Col>}
            </Row>
          </Container>
          <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>
  )
}
