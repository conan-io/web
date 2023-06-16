import React from 'react';
import { useState, useEffect } from "react";
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import { ConanListFilter, ConanSearchBar } from "../components/searchbar";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { ConanHeader } from '../components/header';
import ConanFooter from '../components/footer';
import {get_json_list, get_urls, get_json_list_with_id} from '../service/service';


export async function getServerSideProps(context) {
  let { defaultValue, defaultFilters } = context.query;

  let value = defaultValue || 'all';

  defaultFilters = defaultFilters || [];
  if (typeof defaultFilters === "string"){
    defaultFilters = [defaultFilters]
  }
  defaultValue = defaultValue || '';
  let urls = get_urls({search: value, filters: defaultFilters})
  const filters_list = await get_json_list_with_id(urls.filters, urls.api.private);
  const licenses_list = await get_json_list_with_id(urls.licenses, urls.api.private);

  return {
    props: {
      data: {
        licenses: licenses_list.map(elem => {return {filter: elem.value, id: elem.id, checked: false};}),
        filters: filters_list.map(elem => {return {filter: elem.value, id: elem.id, checked: defaultFilters.includes(elem.id)};}),
        defaultValue: defaultValue,
        defaultFilters: defaultFilters,
        packages: await get_json_list(urls.search.package, urls.api.private),
      },
    },
  }
}

function PackageInfo(props) {
  return (
    <div>
      <Row>
        <Col xs lg="4">
          <Row>
            <Col xs lg><Link href={"/center/" + props.data.name}><a><h3>{props.data.name}</h3></a></Link></Col>
          </Row>
          <Row>
            <Col xs lg md={{ span: 1, offset: 2 }}><b>last version:</b> {props.data.info.version}</Col>
          </Row>
        </Col>
        <Col xs lg="5"><b>Licenses:</b> {props.data.info.licenses.join(", ")}</Col>
        {props.data.info.downloads > 0  && <Col xs lg="3"><b>Downloads:</b> {props.data.info.downloads}</Col>}
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
    <div style={{width: "100%"}}>
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
  const [value, setValue] = useState(props.data.defaultValue);
  const [filters, setFilters] = useState(props.data.defaultFilters);
  const [licenses, setLicense] = useState(null);
  const [allFilters, setAllFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(props.data.packages);


  const getData = async (value, filterlist, licenseList) => {
    try {
      value = value || 'all';
      let urls = get_urls({search: value, filters: filterlist, licenses: licenseList})
      const packages = await get_json_list(urls.search.package, urls.api.public);
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

  const handleFilter = (filter, filter_id, check) => {
    let newFilters = filters
    if(check && !newFilters.includes(filter_id)){newFilters.push(filter_id)}
    if(!check && newFilters.includes(filter_id)){newFilters.splice(newFilters.indexOf(filter_id), 1)}
    setFilters(newFilters);
    getData(value, filters, licenses);
  }

  const handleLicense = (license, license_id, check) => {
    let newLicenses = licenses
    if(check && !newLicenses.includes(license_id)){newLicenses.push(license_id)}
    if(!check && newLicenses.includes(license_id)){newLicenses.splice(newLicenses.indexOf(license_id), 1)}
    setLicenses(newLicenses);
    getData(value, filters, licenses);
  }

  const handleSubmit = (event) => {
    getData(value, filters, licenses);
    event.preventDefault();
  }
  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper">
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
                <Col xs lg="2">
                <h2>Licenses</h2>
                <Row><ConanListFilter filters={props.data.licenses} handleFilter={handleFilter}/></Row>
                </Col>
                <Col xs lg="8">
                <Row><SearchList data={data}/></Row>
                </Col>
                <Col xs lg="2">
                <h2>Filters</h2>
                <Row><ConanListFilter filters={props.data.filters} handleFilter={handleFilter}/></Row>
                </Col>
              </Row>
            </Form>
          </Container>
          <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>

  );
}
