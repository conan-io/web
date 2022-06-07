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
import { useRouter } from 'next/router'

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

function ConanSearch(props) {
  const router = useRouter();
  const { defaultValue, defaultFilters } = router.query;
  const [value, setValue] = useState(() => (defaultValue || ''));
  const [filters, setFilters] = useState(() => (defaultFilters || []));
  const [allFilters, setAllFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = async (value) => {
    try {
      if (value == ''){value = 'all'}
      const response = await fetch(`${encodeURI(process.env.conanioServer)}/search/${encodeURIComponent(value.toLowerCase())}`);
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

  useEffect(() => {getData(value)}, []);

  const handleChange = (e) => {
    setValue(e);
    console.log(filters);
  }

  const handleFilter = (filter, check) => {
    let newFilters = filters
    if(check && !newFilters.includes(filter)){newFilters.push(filter)}
    if(!check && newFilters.includes(filter)){newFilters.splice(newFilters.indexOf(filter), 1)}
    setFilters(newFilters)
    getData(value);
  }

  const handleSubmit = (event) => {
    console.log(value, filters);
    getData(value);
    console.log(data);
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
              <Row><ConanListFilter api="licenses" handleFilter={handleFilter}/></Row>
              </Col>
              <Col xs lg="10">
              <Row><SearchList data={data} name="Packages"/></Row>
              </Col>
              <Col xs lg="1">
              <h4>Filters</h4>
              <Row><ConanListFilter api="filters" handleFilter={handleFilter}/></Row>
              </Col>
            </Row>
          </Form>
        </Container>
      <ConanFooter/>
    </React.StrictMode>

  );
}


export default (ConanSearch);
