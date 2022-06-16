import React from 'react';
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import { ConanListFilter, ConanSearchBar } from "../components/searchbar";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import ConanHeader from '../components/header';
import ConanFooter from '../components/footer';
import { useRouter } from 'next/router';
import {get_from_server_list, get_from_local_list} from '../components/utils';


export async function getServerSideProps(context) {
  let { defaultValue, defaultFilters } = context.query;

  let value = defaultValue || 'all';
  defaultFilters = defaultFilters || [];
  defaultValue = defaultValue || '';

  const filters_list = await get_from_server_list('filters');
  const licenses_list = await get_from_server_list('licenses');

  return {
    props: {
      data: {
        licenses: licenses_list.map(elem => {return {filter: elem, checked: false};}),
        filters: filters_list.map(elem => {return {filter: elem, checked: defaultFilters.includes(elem)};}),
        defaultValue: defaultValue,
        defaultFilters: defaultFilters,
        packages: await get_from_server_list(`search/${encodeURIComponent(value.toLowerCase())}?filters=${encodeURIComponent(defaultFilters)}`),
      },
    },
  }
}

function PackageInfo(props) {
  return (
    <div>
      <Row>
        <Col xs lg="3">
          <Row>
            <Col xs lg><Link href={"/center/" + props.data.name}><a><h3>{props.data.name}</h3></a></Link></Col>
          </Row>
          <Row>
            <Col xs lg md={{ span: 1, offset: 2 }}><b>last versiond:</b> {props.data.info.version}</Col>
          </Row>
        </Col>
        <Col xs lg="5"><b>Licenses:</b> {props.data.info.licenses.join(", ")}</Col>
        <Col xs lg="3"><b>Downloads:</b> {props.data.info.downloads}</Col>
      </Row>
      <br/>
      <Row>
        <Col xs lg><b>Description:</b> {props.data.info.description}</Col>
      </Row>
      <br/>
      <Row>
        <Col xs lg><b>Labels:</b> {props.data.info.labels.join(", ")}</Col>
      </Row>
    </div>
  )
}

function SearchList(props) {

  return (
    <div>
      <h2 className="text-center">packages</h2>
      <ListGroup>
      {props.data && props.data.map(
        (info) => (
          <ListGroup.Item key={info.name}>
            <PackageInfo data={info}/>
          </ListGroup.Item>)
        )
      }
      </ListGroup>
    </div>
  )
}

export default function ConanSearch(props) {
  const router = useRouter();
  const [value, setValue] = useState(props.data.defaultValue);
  const [filters, setFilters] = useState(props.data.defaultFilters);
  const [allFilters, setAllFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(props.data.packages);
  const getData = async (value, filterlist) => {
    try {
      value = value || 'all';
      const packages = await get_from_local_list(`search/${encodeURIComponent(value.toLowerCase())}?filters=${encodeURIComponent(filterlist)}`);
      setData(packages);
    } catch(err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setValue(e);
  }

  const handleFilter = (filter, check) => {
    let newFilters = filters
    if(check && !newFilters.includes(filter)){newFilters.push(filter)}
    if(!check && newFilters.includes(filter)){newFilters.splice(newFilters.indexOf(filter), 1)}
    setFilters(newFilters);
    getData(value, filters);
  }

  const handleSubmit = (event) => {
    getData(value, filters);
    event.preventDefault();
  }
  console.log(data)
  return (
    <React.StrictMode>
      <ConanHeader/>
        <br/>
        <Container>
          <Container><h1 className="text-center">Conan Center Search</h1></Container>
          <Form onSubmit={e => handleSubmit(e)}>
            <Row>
              <Col><ConanSearchBar value={value} handleChange={handleChange} searchButton={props.button} data_to_show={"Number of references: "+data.length}/></Col>
            </Row>
            <br/>
            <Row>
              <Col xs lg="1">
              <h2>Licenses</h2>
              <Row><ConanListFilter filters={props.data.licenses} handleFilter={handleFilter}/></Row>
              </Col>
              <Col xs lg="10">
              <Row><SearchList data={data}/></Row>
              </Col>
              <Col xs lg="1">
              <h2>Filters</h2>
              <Row><ConanListFilter filters={props.data.filters} handleFilter={handleFilter}/></Row>
              </Col>
            </Row>
          </Form>
        </Container>
        <br/>
      <ConanFooter/>
    </React.StrictMode>

  );
}
