import React from 'react';
import { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import { ConanSearchBar, ConanMultiSelectFilter } from "../../components/searchbar";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import { ConanCenterHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import { prettyProfiles } from '../../components/utils';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdDownload } from "react-icons/io";
import { BsFilterCircleFill, BsFilterCircle } from "react-icons/bs";
import { FaWindows, FaLinux, FaApple } from "react-icons/fa";
import {get_json_list, get_urls, get_json_list_with_id} from '../../service/service';


export async function getServerSideProps(context) {
  let { defaultValue, defaultTopics, defaultLicenses } = context.query;

  let value = defaultValue || 'all';
  defaultTopics = defaultTopics || [];
  if (typeof defaultTopics === "string"){
    defaultTopics = [defaultTopics]
  }
  defaultTopics = defaultTopics.map(e => parseInt(e))
  defaultLicenses = defaultLicenses || [];
  if (typeof defaultLicenses === "string"){
    defaultLicenses = [defaultLicenses]
  }
  defaultValue = defaultValue || '';
  let urls = get_urls({search: value, topics: defaultTopics})
  const topics_list = await get_json_list_with_id(urls.topics, urls.api.private);
  const licenses_list = await get_json_list_with_id(urls.licenses, urls.api.private);
  const packages = await get_json_list(urls.search.package, urls.api.private);
  if (packages && packages.length > 0 && value !== 'all') {
    packages.sort((a, b) => levenshteinDistance(a.name, value) - levenshteinDistance(b.name, value))
  }
  return {
    props: {
      data: {
        licenses: licenses_list.map(elem => {return {filter: elem.value.filter, id: elem.value.id};}),
        topics: topics_list.map(elem => {return {filter: elem.value.filter, id: elem.value.id};}),
        defaultValue: defaultValue,
        defaultTopics: defaultTopics,
        defaultLicenses: defaultLicenses,
        packages: packages,
      },
    },
  }
}

// This comes from the wikipedia's pseudocode, I couldn't be bothered to do some dynamic programming of my own,
// comments left to make it easier to double-check the transpilation
function levenshteinDistance(s, t) {
  const m = s.length;
  const n = t.length;

  // Create two work arrays of integer distances
  const v0 = new Array(n + 1);
  const v1 = new Array(n + 1);

  // Initialize v0 (the previous row of distances)
  for (let i = 0; i <= n; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < m; i++) {
    // Calculate v1 (current row distances) from the previous row v0

    // First element of v1 is A[i + 1][0]
    v1[0] = i + 1;

    // Use formula to fill in the rest of the row
    for (let j = 0; j < n; j++) {
      // Calculating costs for A[i + 1][j + 1]
      const deletionCost = v0[j + 1] + 1;
      const insertionCost = v1[j] + 1;
      const substitutionCost = (s[i] === t[j]) ? v0[j] : v0[j] + 1;

      v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost);
    }

    // Copy v1 (current row) to v0 (previous row) for the next iteration
    for (let j = 0; j <= n; j++) {
      v0[j] = v1[j];
    }
  }
  // After the last iteration, the results of v1 are now in v0
  return v0[n];
}

export function DefaultDescription (props) {
  return (
    (<Alert className="text-center" variant="secondary">
      It has not been possible to load this information.
      Please, check if <Link href={"https://github.com/conan-io/conan-center-index/tree/master/recipes/" + props.name}>
        <a>this recipe version</a>
      </Link> is compatible with Conan v2.x.
    </Alert>)
  )
}


function PackageInfo(props) {
  const licenses = Object.keys(props.data.info.licenses)
  const labels = Object.keys(props.data.info.labels)
  const packages = Object.values(props.data.info.packages).map((value) => value);
  return (
    <div className="m-2">
      <Row>
        <Col xs lg="6"><Link href={{ pathname: "/center/recipes/" + props.data.name, query: { version: props.data.info.version } }}>
          <a><h3>{props.data.name}</h3></a>
        </Link></Col>
        <Col xs lg="6"><b>Latest version:</b> {props.data.info.version}</Col>
      </Row>
      <Row>
      {licenses && licenses.length > 0 && <Col xs lg="auto"><LiaBalanceScaleSolid className="conanIconBlue"/> {licenses.join(", ")}</Col>}
      {props.data.info.downloads > 0  && <Col xs lg="auto"><IoMdDownload className="conanIconBlue"/> {props.data.info.downloads}</Col>}
      </Row>
      <Row><Col xs lg className="mt-2">{props.data.info.description || (<DefaultDescription name={props.data.name}/>)}</Col></Row>
      <Row>
        <Col xs lg="6" className="mt-2">{labels.map((item) => (<Badge className="recipeTopics" key={item}>#{item}</Badge>))}</Col>
        {packages && packages.length > 0 && (
        <Col xs lg="6" className="mt-2">{prettyProfiles(packages).map(i => i.badget)}</Col>)}
      </Row>
    </div>
  )
}

function SearchList(props) {
  const extraFilters = (item) => {
    return true;
  }
  return (
    <ListGroup>
    {props.data && props.data.filter((info) => extraFilters(info)).map(
      (info) => (
        <ListGroup.Item className="conan-content-basic-card mt-4" key={info.name}>
          <PackageInfo data={info}/>
        </ListGroup.Item>)
      )
    }
    </ListGroup>
  )
}

export default function ConanSearch(props) {
  const [value, setValue] = useState(props.data.defaultValue);
  const [topics, setTopics] = useState(props.data.defaultTopics);
  const [licenses, setLicenses] = useState(props.data.defaultLicenses);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(props.data.packages);
  const [timer, setTimer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showWindows, setShowWindows] = useState(true);
  const [showMacOS, setShowMacOS] = useState(true);
  const [showLinux, setShowLinux] = useState(true);

  const getData = async (value, topiclist, licenseList) => {
    setLoading(true);
    try {
      value = value || 'all';
      let urls = get_urls({search: value, topics: topiclist, licenses: licenseList})
      const packages = await get_json_list(urls.search.package, urls.api.public);
      // bring the exact match to the front
      if (packages && packages.length > 0 && value !== 'all') {
        packages.sort((a, b) => levenshteinDistance(a.name, value) - levenshteinDistance(b.name, value))
      }
      setData(packages);
    } catch(err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const typingSearch = (v) => {
      getData(v, topics, licenses);
    };
    setValue(e);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      typingSearch(e);
    }, 500);
    setTimer(newTimer);
  }

  var handleTopics = (selectedOption) => {
    let newTopics = selectedOption.map(elem => {return elem.value})
    setTopics(newTopics);
    getData(value, newTopics, licenses);
  }

  var handleLicenses = (selectedOption) => {
    let newLicenses = selectedOption.map(elem => {return elem.value})
    setLicenses(newLicenses);
    getData(value, topics, newLicenses);
  }

  const handleSubmit = (event) => {
    getData(value, topics, licenses);
    event.preventDefault();
  }

  const filterStyle = {
    padding: "12px 0px 20px 0px",
    marginTop: "20px",
  }

  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader/>
          <br/>
          <Container className="conancontainer">
            <Row className="justify-content-md-center">
              <Col xs="12" md="12" lg="9">
                <Form onSubmit={e => handleSubmit(e)}>
                    <div>
                    <ConanSearchBar value={value} handleChange={handleChange}/>
                  </div>
                </Form>
              </Col>
              <Col xs="1" md="1" lg="1">
                {!showFilters && <BsFilterCircleFill style={{verticalAlign: 'text-top', cursor: 'pointer'}} className="conanIconBlue conanIcon34" onClick={() => setShowFilters(!showFilters)}/>}
                {showFilters && <BsFilterCircle style={{backgroundColor: 'white', borderRadius: '16px', verticalAlign: 'text-top', cursor: 'pointer', transform: 'rotate(180deg)'}} className="conanIconBlue conanIcon34" onClick={() => setShowFilters(!showFilters)}/>}
              </Col>
            </Row>
            <Col lg={{span: 10, offset: 1}}>
            {showFilters && <Row style={filterStyle} className="conan-content-basic-card">
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Licenses" defaultValue={licenses} filters={props.data.licenses} handleFilter={handleLicenses}/></Col>
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Topics" defaultValue={topics} filters={props.data.topics} handleFilter={handleTopics}/></Col>
              {/*<Col xs="12" md="12" lg="12" className="mt-2">
                <FaLinux style={{cursor: 'pointer'}} className={(showLinux? "conanIconBlue": "conanIconGrey") + " conanIcon26 ml-1"} onClick={() => setShowLinux(!showLinux)}/>
                <FaWindows style={{cursor: 'pointer'}} className={(showWindows? "conanIconBlue": "conanIconGrey") + " conanIcon26 ml-1"} onClick={() => setShowWindows(!showWindows)}/>
                <FaApple style={{cursor: 'pointer'}} className={(showMacOS? "conanIconBlue": "conanIconGrey") + " conanIcon26 ml-1"} onClick={() => setShowMacOS(!showMacOS)}/>
              </Col>*/}
            </Row>}
            </Col>
            <br/>
            <div style={{width: "100%"}}>
              <h2 className="text-center">
              Recipes ({!loading && !data && 0}{!loading && data && data.length}{loading && <div className="spinner-grow"></div>})
              </h2>
              <SearchList loading={loading} data={data} extra={{showLinux: showLinux, showWindows: showWindows, showMacOS: showMacOS}}/>
            </div>
          </Container>
          <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>

  );
}
