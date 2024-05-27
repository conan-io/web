import React from "react";
import { useState } from "react";
import { get_urls } from '../../service/service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { ConanCenterHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from 'next/link';

function ConanTokenGenerator() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [info, setInfo] = useState(null);
  const [validated, setValidated] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [show, setShow] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      // Post user information to send the token
      const fetchData = async () => {
        let urls = get_urls();
        const response = await fetch(`${encodeURI(urls.api.public)}/${encodeURI(urls.signup)}?name=${encodeURIComponent(
            name
          )}&last_name=${encodeURIComponent(
            lastName
          )}&email=${encodeURIComponent(
            email
          )}`,
          {
            method: 'POST'
          }
        );
        const data = await response.json();
        setInfo(
          {
            'status': response.status,
            'message': data.message
          }
        );
      };
      fetchData();
      setName('');
      setLastName('');
      setEmail('');
      setTermsAgree(false);
      setShow(true);
  };

  return (
    <React.StrictMode>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
        <br/>
        <Container className="conancontainer">
        <h1 className="text-center">Welcome to the conan token generator page</h1>
        <br/>
        
        </Container>
        <Container className="conancontainer">
          {info && info.status=='200' && <Col className="text-center" md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}}>
            <Alert show={show} className="conanAlert" variant='success'>
              <Row>
              <Col md="11" lg="11">
                {info.message}
              </Col>
              <Col md="1" lg="1">
                <AiOutlineCloseCircle className="conanIcon22" onClick={() => setShow(false)}/>
              </Col>
              </Row>
            </Alert>
          </Col>}
          {info && info.status=='500' && <Col className="text-center" md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}}>
            <Alert show={show} className="conanAlert" variant='danger'>{info.message}</Alert>
          </Col>}
        </Container>
        <Container className="conancontainer">
          <Form
            onSubmit={handleSubmit}
          >
          <Col md={{span: 6, offset: 3}} lg={{span: 6, offset: 3}}>
            <div className="recipeContentBox p-4">
              <Row>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label><h4>Name</h4></Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        placeholder="First name"
                        required
                        className="InputGroupConanText"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label><h4>Last name</h4></Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        placeholder="Last name"
                        required
                        className="InputGroupConanText"
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} controlId="validationCustomEmail">
                <Form.Label><h4>Email</h4></Form.Label>
                    <InputGroup hasValidation>
                    <Form.Control
                      placeholder="Email"
                      type="email"
                      aria-describedby="inputGroupPrepend"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                      required
                      className="InputGroupConanText"
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="justify-content-md-center">

                
              <Form.Group className="m-3">

                <Form.Check>
                  <Form.Check.Input
                    type={"checkbox"}
                    defaultChecked={false}
                    checked={termsAgree}
                    onClick={(e) => {
                      setTermsAgree(e.target.checked);
                    }}
                  />
                  <Form.Check.Label>
                    Agree to <Link href="/terms-conditions" passHref>
                      <a id="terms_btn_footer" target="_blank" rel="noopener noreferrer">terms</a>
                    </Link> and conditions.
                  </Form.Check.Label>
                </Form.Check>
              </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
              <Button type="submit" disabled={!termsAgree}>Submit</Button>
              </Row>
            </div>
          </Col>
          </Form>
          <br/>
          <br/>
        </Container>
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default ConanTokenGenerator
