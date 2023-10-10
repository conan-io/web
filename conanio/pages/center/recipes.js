import React from 'react';
import { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import {
  ConanSearchBar,
  ConanMultiSelectFilter,
  ConanSingleSelect
} from "../../components/searchbar";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
import { ConanCenterHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import { prettyProfiles } from '../../components/utils';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdDownload } from "react-icons/io";
import { BsFilterCircleFill, BsFilterCircle } from "react-icons/bs";
import {
  MdFilter1,
  MdFilter2,
  MdFilter3,
  MdFilter4,
  MdFilter5,
  MdFilter6,
  MdFilter7,
  MdFilter8,
  MdFilter9,
  MdFilter9Plus,
} from "react-icons/md";

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
  return (
    <ListGroup>
    {props.data && props.data.map((info) => (
      <ListGroup.Item className="conan-content-basic-card mt-4" key={info.name}>
        <PackageInfo data={info}/>
      </ListGroup.Item>))
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
  const [showFilters, setShowFilters] = useState(props.data.defaultTopics.length > 0);
  const [showWindows, setShowWindows] = useState(true);
  const [showMacOS, setShowMacOS] = useState(true);
  const [showMacOSSilicon, setShowMacOSSilicon] = useState(true);
  const [showLinux, setShowLinux] = useState(true);
  const [sortDataBy, setSortDataBy] = useState('sortByName');

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

  const handleSortFuction = (selectedOption) => {
    setSortDataBy(selectedOption.value);
  }

  const filterStyle = {
    padding: "12px 0px 20px 0px",
    marginTop: "20px",
  }

  const extraFilters = (item) => {
    if (showLinux && showWindows && showMacOS && showMacOSSilicon){
      return true;
    }
    else{
      const rawPackages = Object.values(item.info.packages).map((value) => value)
      if (rawPackages.length > 0){
        const packages = prettyProfiles(rawPackages).reduce((a, p) => ({ ...a, [p.key]: p.status}), {})
        if (showWindows && packages['Windows-x86_64']) return true
        if (showLinux && packages['Linux-x86_64']) return true
        if (showMacOS && packages['Macos-x86_64']) return true
        if (showMacOSSilicon && packages['Macos-armv8']) return true
      }
      return false;
    }
  }

  const sortByName = (a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  };

  const sortByDownloads = (a, b) => {
    return b.info.downloads - a.info.downloads
  };

  const sortByData = (a, b) => {
    if (sortDataBy == "sortByName") return sortByName(a, b)
    if (sortDataBy == "sortByDownloads") return sortByDownloads(a, b)
    return 0
  };

  const filteredData = data.filter((info) => extraFilters(info)).sort(sortByData);

  const filterNumber = () => {
    const tags = {1: MdFilter1, 2: MdFilter2, 3: MdFilter3, 4: MdFilter4,
      5: MdFilter5, 6: MdFilter6, 7: MdFilter7, 8: MdFilter8, 9: MdFilter9}
    const style = {backgroundColor: 'white', verticalAlign: 'text-top'}
    const _filterNumber = topics.length + licenses.length + !showWindows + !showLinux + !showMacOS + !showMacOSSilicon
    if (!_filterNumber) return null
    const Tag = _filterNumber>9? MdFilter9Plus: tags[_filterNumber];
    return  (<Tag className="conanIconBlue" style={style}/>)
    return null;
  }

  return (
    <React.StrictMode>
      <SSRProvider>
      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader titlePrefix={value? "Search Result for '" + value + "'": "Search Result"}/>
          <br/>
          <Container className="conancontainer">
            <Row className="justify-content-md-center">
              <Col xs="12" md="12" lg="7" className="mt-2">
                <Form onSubmit={e => handleSubmit(e)}>
                    <div>
                    <ConanSearchBar value={value} handleChange={handleChange}/>
                  </div>
                </Form>
              </Col>
              <Col xs="12" md="12" lg="2" className="mt-2">
                <ConanSingleSelect
                  title="Sort by"
                  defaultValue={{value: 'sortByName', label: 'by name'}}
                  options={[{value: 'sortByName', label: 'by name'},{value: 'sortByDownloads', label: 'by downloads'}]}
                  handleFilter={handleSortFuction}
                />
              </Col>
              <Col xs={{span: 2, offset: 5}} md={{span: 2, offset: 5}} lg={{span: 1, offset: 0}} className="mt-2">
                {!showFilters && <BsFilterCircleFill
                  style={{verticalAlign: 'text-top', cursor: 'pointer'}}
                  className="conanIconBlue conanIcon34" onClick={() => setShowFilters(!showFilters)}
                />}
                {showFilters && <BsFilterCircle
                  style={{backgroundColor: 'white', borderRadius: '16px', verticalAlign: 'text-top', cursor: 'pointer', transform: 'rotate(180deg)'}}
                  className="conanIconBlue conanIcon34"
                  onClick={() => setShowFilters(!showFilters)}
                />}
                {filterNumber()}
              </Col>
            </Row>
            <Col lg={{span: 10, offset: 1}}>
            {showFilters && <Row style={filterStyle} className="conan-content-basic-card">
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Licenses" defaultValue={licenses} filters={props.data.licenses} handleFilter={handleLicenses}/></Col>
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Topics" defaultValue={topics} filters={props.data.topics} handleFilter={handleTopics}/></Col>
              <Col xs="12" md="12" lg="6" className="mt-2">
                <Badge style={{cursor: 'pointer'}} className={(showLinux? "profileTopics": "profileEmptyTopics")} onClick={() => setShowLinux(!showLinux)}>Linux</Badge>
                <Badge style={{cursor: 'pointer'}} className={(showWindows? "profileTopics": "profileEmptyTopics")} onClick={() => setShowWindows(!showWindows)}>Windows</Badge>
                <Badge style={{cursor: 'pointer'}} className={(showMacOS? "profileTopics": "profileEmptyTopics")} onClick={() => setShowMacOS(!showMacOS)}>macOS</Badge>
                <Badge style={{cursor: 'pointer'}} className={(showMacOSSilicon? "profileTopics": "profileEmptyTopics")} onClick={() => setShowMacOSSilicon(!showMacOSSilicon)}>macOS Apple Silicon</Badge>
              </Col>
            </Row>}
            </Col>
            <br/>
            <div style={{width: "100%"}}>
              <h2 className="text-center">
              Recipes ({!loading && !data && 0}{!loading && filteredData && filteredData.length}{loading && <div className="spinner-grow"></div>})
              </h2>
              <SearchList loading={loading} data={filteredData}/>
            </div>
          </Container>
          <br/>
        <ConanFooter/>
      </div>
      </SSRProvider>
    </React.StrictMode>

  );
}
