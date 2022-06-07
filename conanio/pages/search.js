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


export async function getServerSideProps(context) {
  const { defaultValue, defaultFilters } = context.query;
  let value = defaultValue || 'all';
  const res_licenses = await fetch(`${encodeURI(process.env.conanioServer)}/licenses`);
  const res_filters = await fetch(`${encodeURI(process.env.conanioServer)}/filters`);
  const res_packages = await fetch(`${encodeURI(process.env.conanioServer)}/search/${encodeURIComponent(value.toLowerCase())}`);
  const licenses = await res_licenses.json();
  const filters = await res_filters.json();
  const packages = await res_packages.json();

  const licenses_list = [];
  const filters_list = [];
  const packages_list = [];
  Object.keys(licenses).forEach(function(key) {licenses_list.push(licenses[key]);});
  Object.keys(filters).forEach(function(key) {filters_list.push(filters[key]);});
  Object.keys(packages).forEach(function(key) {packages_list.push(packages[key]);});

  return {
    props: {
      data: {
        licenses: licenses_list,
        filters: filters_list,
        defaultValue: defaultValue || '',
        defaultFilters: defaultFilters || [],
        packages: packages_list,
      },
    },
  }
}

function SearchList(props) {

  return (
    <div className="text-center">
      <h4>{props.name}</h4>
      <ListGroup>
      {props.data && props.data.map(
        (info) => (
          <ListGroup.Item key={info.name}>
            <Link href={"/center/" + info.name}><a>{info.name}/{info.version}</a></Link>
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

  const getData = async (value) => {
    try {
      value = value || 'all';
      const response = await fetch(`/api/search/${encodeURIComponent((value).toLowerCase())}`);
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      var packages = [];
      Object.keys(actualData).forEach(function(key) {
        packages.push(actualData[key]);
      });
      setData(packages);
      setError(null);
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
    getData(value);
  }

  const handleSubmit = (event) => {
    getData(value);
    event.preventDefault();
  }

  return (
    <React.StrictMode>
      <ConanHeader/>
        <Container>
          <Form onSubmit={e => handleSubmit(e)}>
            <Row>
              <Col><ConanSearchBar value={value} handleChange={handleChange} searchButton={props.button}/></Col>
            </Row>
            <Row>
              <Col xs lg="1">
              <h4>Licenses</h4>
              <Row><ConanListFilter filters={props.data.licenses} handleFilter={handleFilter}/></Row>
              </Col>
              <Col xs lg="10">
              <Row><SearchList data={data} name="Packages"/></Row>
              </Col>
              <Col xs lg="1">
              <h4>Filters</h4>
              <Row><ConanListFilter filters={props.data.filters} handleFilter={handleFilter}/></Row>
              </Col>
            </Row>
          </Form>
        </Container>
      <ConanFooter/>
    </React.StrictMode>

  );
}
