import React from "react";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConanListFilter, ConanSearchBar } from "../components/searchbar";
import ConanHeader from '../components/header';
import ConanFooter from '../components/footer';
import useSWR from 'swr';
import {get_from_server, get_from_server_list} from '../components/utils';

export async function getServerSideProps(context) {
  const reference_num = await get_from_server('reference/num');
  const filters_list = await get_from_server_list('filters');

  return {
    props: {
      data: {
        popular: await get_from_server_list('popular'),
        updated: await get_from_server_list('updated'),
        new: await get_from_server_list('new'),
        filters: filters_list.map(elem => {return {filter: elem, checked: false};}),
        reference_num: reference_num.references,
      },
    },
  }
}

function CenterSearchBar(props) {

  let router = useRouter();
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState([]);
  const [allFilters, setAllFilters] = useState(null);

  const handleChange = (e) => {
    setValue(e);
  }

  const handleFilter = (filter, check) => {
    let newFilters = filters
    if(check && !newFilters.includes(filter)){newFilters.push(filter)}
    if(!check && newFilters.includes(filter)){newFilters.splice(newFilters.indexOf(filter), 1)}
    setFilters(newFilters)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: { defaultValue: value, defaultFilters: filters }
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
        <Col xs lg="4">
          <Row>
            <ConanListFilter filters={props.filters} handleFilter={handleFilter}/>
          </Row>
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
      <ConanHeader/>
        <br/>
        <Container>
          <Container><h1 className="text-center">Conan Center</h1></Container>
          <Row>
            <CenterSearchBar filters={props.data.filters} data_to_show={"Number of references: "+props.data.reference_num}/>
          </Row>
          <Row>
            <Col><CenterList data={props.data.popular} name="Popular Package" full_name={true}/></Col>
            <Col><CenterList data={props.data.updated} name="Just Updated" full_name={false}/></Col>
            <Col><CenterList data={props.data.new} name="New Version" full_name={true}/></Col>
          </Row>
        </Container>
        <br/>
      <ConanFooter/>
    </React.StrictMode>
  )
}
