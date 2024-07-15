import React, { FormEvent, ChangeEvent, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { ConanCenterHeader, ConanFooter } from "@/components";
import { getUrls } from "@/service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";

const ConanTokenGenerator = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState(null);
  const [termsAgree, setTermsAgree] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Post user information to send the token
    const fetchData = async () => {
      let urls = getUrls();
      const response = await fetch(
        `${encodeURI(urls.api.public)}/${encodeURI(urls.signup)}?full_name=${encodeURIComponent(
          fullName,
        )}&email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        },
      );
      const data = await response.json();
      setInfo({
        status: response.status,
        message: data.message,
      });
    };
    setTermsAgree(false);
    fetchData();
    setFullName("");
    setEmail("");
    setShow(true);
  };

  return (
    <React.StrictMode>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader />
        <br />
        <Container className="conancontainer">
          <h1 className="text-center">
            Welcome to the conan token generator page
          </h1>
          <br />
        </Container>
        <Container className="conancontainer">
          {info && (info.status == "200" || info.status == "422" || info.status == "403") && (
            <Col
              className="text-center"
              md={{ span: 8, offset: 2 }}
              lg={{ span: 8, offset: 2 }}
            >
              <Alert show={show} className="conanAlert" variant="success">
                <Row>
                  <Col md="11" lg="11">
                    {info.message}
                  </Col>
                  <Col md="1" lg="1">
                    <AiOutlineCloseCircle
                      className="conanIcon22"
                      onClick={() => setShow(false)}
                    />
                  </Col>
                </Row>
              </Alert>
            </Col>
          )}
          {info && info.status == "500" && (
            <Col
              className="text-center"
              md={{ span: 8, offset: 2 }}
              lg={{ span: 8, offset: 2 }}
            >
              <Alert show={show} className="conanAlert" variant="danger">
              <Row>
                  <Col md="11" lg="11">
                    {info.message}
                  </Col>
                  <Col md="1" lg="1">
                    <AiOutlineCloseCircle
                      className="conanIcon22"
                      onClick={() => setShow(false)}
                    />
                  </Col>
                </Row>
              </Alert>
            </Col>
          )}
        </Container>
        <Container className="conancontainer">
          <Form onSubmit={handleSubmit}>
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
              <div className="recipeContentBox p-4">
                <Row>
                  <Form.Group as={Col} controlId="validationFullName">
                    <Form.Label>
                      <h4>Full name</h4>
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        placeholder="Full name"
                        required
                        className="InputGroupConanText"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} controlId="validationCustomEmail">
                    <Form.Label>
                      <h4>Email</h4>
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        placeholder="Email"
                        type="email"
                        aria-describedby="inputGroupPrepend"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        checked={termsAgree}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setTermsAgree(e.currentTarget.checked);
                        }}
                      />
                      <Form.Check.Label>
                        Agree to{" "}
                        <Link
                          href="/terms-conditions"
                          passHref
                          id="terms_btn_footer"
                          rel="noopener noreferrer"
                        >
                          terms
                        </Link>{" "}
                        and conditions.
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                  <Button type="submit" disabled={!termsAgree}>
                    Submit
                  </Button>
                </Row>
              </div>
            </Col>
          </Form>
          <br />
          <br />
        </Container>
        <ConanFooter />
      </div>
    </React.StrictMode>
  );
};

export default ConanTokenGenerator;
