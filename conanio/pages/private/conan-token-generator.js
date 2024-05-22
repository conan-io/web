import React from "react";
import { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ConanKitchenHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { post_conan_token_generator } from '../../service/service';


function ConanTokenGenerator() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Post user information to send the token
    const token = post_conan_token_generator(name, lastName, email);
    console.log(token)
  };

  return (
    <React.StrictMode>
      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <img src="/conan-cubes.svg" className="d-none d-lg-block position-absolute hero-bg" alt="Conan C++ Package Manager"></img>
        <section className="pt-mt-4">
            <Container className="conancontainer mt-4 mb-4">
            <h1 className="text-center black">Welcome to the conan-token-generator page</h1>
            </Container>
          </section>
          <section id="conan-token-generator" className="pb-5 mt-4">
            <Container className="conancontainer mt-4">
            <h3 className="text-center">Fill the forms to receive your token</h3>
            <br/>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
            <Row className="justify-content-md-center">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Form.Control.Feedback type="invalid">
                Please provide your first name.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                />
                <Form.Control.Feedback type="invalid">
                Please provide your last name.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    Please provide an email address
                    </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit">Submit</Button>
            </Form>
            </Container>
          </section>
        <br/>
        <ConanFooter/>
      </div>
    </React.StrictMode>
  );
}

export default ConanTokenGenerator
