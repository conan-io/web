import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
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

const ConanRegistration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState(null);
  const [termsAgree, setTermsAgree] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [region, setRegion] = useState("US");
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to detect user's region based on browser language
  useEffect(() => {
    const euCountries = [
      "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
      "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL",
      "PT", "RO", "SE", "SI", "SK", "IS", "LI", "NO", "CH", "GB"
    ];

    const userCountryCode = navigator.language.slice(-2).toUpperCase();
    
    if (euCountries.includes(userCountryCode)) {
      setRegion("EU");
    } else {
      setRegion("US");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate that terms are accepted
    if (!termsAgree) {
      setAlertMessage("You must accept the Terms of Service and Privacy Notice before registering.");
      setShow(true);
      return;
    }

    const payload = {
        full_name: fullName,
        email: email,
        region: region,
        gdpr_consent: gdprConsent,
    };

    try {
        const urls = getUrls();
        const response = await fetch(`${encodeURI(urls.api.public)}/${encodeURI(urls.signup)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
          setInfo({
            status: response.status,
            message: data.message,
        });

        // Clear form fields only after successful request
        setFullName("");
        setEmail("");
        setTermsAgree(false);
        setGdprConsent(false);
        setShow(true);
    } catch (error) {
        console.error("Error during registration:", error);
        setAlertMessage("An error occurred during registration. Please try again.");
        setShow(true);
    }
  };

  return (
    <React.StrictMode>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader />
        <br />
        <Container className="conancontainer">
          {show && alertMessage && (
            <Col
              className="text-center"
              md={{ span: 8, offset: 2 }}
              lg={{ span: 8, offset: 2 }}
            >
              <Alert show={show} className="conanAlert" variant="danger">
                <Row>
                  <Col md="11" lg="11">
                    {alertMessage}
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
          <Col md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
            <div className="recipeContentBox p-4">
              <h1>Registration</h1>
              <br />
              <p>
                By registering, you will receive a token via email that will grant you access to the preview of the service. For information on how to use the service and set-up your token, please{" "}
                <a href="https://blog.conan.io/" target="_blank">
                  refer to this blogpost
                </a>.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} controlId="validationFullName">
                    <Form.Label>
                      <h4>Full name:</h4>
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
                      <h4>Email:</h4>
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
                <Row className="mt-3">
                  <Form.Group as={Col} controlId="validationRegion">
                    <Form.Label>
                      <h4>Region:</h4>
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        as="select"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        <option value="EU">European Union</option>
                        <option value="US">United States</option>
                        <option value="Other">Other</option>
                      </Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Row>
                {(region === "EU" || region === "Other") && (
                  <Row className="justify-content-md-center mt-3">
                    <Form.Group className="m-3">
                      <Form.Check>
                        <Form.Check.Input
                          type={"checkbox"}
                          checked={gdprConsent}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setGdprConsent(e.currentTarget.checked);
                          }}
                        />
                        <Form.Check.Label>
                          Yes, I would like to receive marketing communications regarding JFrog products, services, and events. I can unsubscribe at any time.
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                  </Row>
                )}
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
                        By completing registration, you agree to the{" "}
                        <Link
                          href="/terms-conditions"
                          passHref
                          id="terms_btn_footer"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          JFrog Terms and Conditions
                        </Link>{" "}
                        For information about the storing and processing of your personal data by JFrog, see our{" "}
                        <Link
                          href="https://jfrog.com/privacy-notice/"
                          passHref
                          id="privacy_notice"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Privacy Notice
                        </Link>
                        .
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                  <Button type="submit" disabled={!termsAgree}>
                    Submit
                  </Button>
                </Row>
              </Form>
            </div>
          </Col>
        </Container>        
        <ConanFooter />
      </div>
    </React.StrictMode>
  );
};

export default ConanRegistration;
