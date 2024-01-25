import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { ConanSearchBar,
         ConanMultiSelectFilter,
         ConanSingleSelect } from "../../components/searchbar";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { ConanCenterHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import { prettyProfiles,
         DefaultDescription } from '../../components/utils';
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { BsFilterCircleFill, BsFilterCircle } from "react-icons/bs";
import { MdFilter1,
  MdFilter2,
  MdFilter3,
  MdFilter4,
  MdFilter5,
  MdFilter6,
  MdFilter7,
  MdFilter8,
  MdFilter9,
  MdFilter9Plus,
  MdOutlineToday } from "react-icons/md";

import {get_json_list, get_urls, get_json_list_with_id} from '../../service/service';


export async function getServerSideProps(context) {
  let urls = get_urls({search: '', topics: null})
  const topics_list = await get_json_list_with_id(urls.topics, urls.api.private);
  const licenses_list = await get_json_list_with_id(urls.licenses, urls.api.private);
  // const packages = await get_json_list(urls.search.package, urls.api.private);
  // if (packages && packages.length > 0 && initialValue !== 'all') {
  //   packages.sort((a, b) => levenshteinDistance(a.name, initialValue) - levenshteinDistance(b.name, initialValue))
  // }
  return {
    props: {
      data: {
        licenses: licenses_list.map(elem => {return {filter: elem.value.filter, id: elem.value.id};}),
        topics: topics_list.map(elem => {return {filter: elem.value.filter, id: elem.value.id};}),
        // defaultValue: value,
        // defaultTopics: topics,
        // defaultLicenses: licenses,
        // packages: packages,
      },
    },
  }
}


function PackageInfo(props) {
  const licenses = Object.keys(props.data.info.licenses)
  const labels = Object.keys(props.data.info.labels)
  const packages = Object.values(props.data.info.packages).map((value) => value);
  return (
    <div className="m-2">
      <Row>
        <Col xs="12" lg="6" className="mt-2">
          <Row>
            <Col xs="12" lg="auto">
              <Link href={{ pathname: "/center/recipes/" + props.data.name, query: { version: props.data.info.version } }}>
                <a><h3>{props.data.name}/{props.data.info.version}</h3></a>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="auto">
              {props.data.info.description || (<DefaultDescription name={props.data.name}/>)}
            </Col>
          </Row>
        </Col>
        <Col xs="12" lg="6">
          <Row className="mt-2">{props.data.info.timestamp && <Col xs="12" lg="auto"><MdOutlineToday className="conanIconBlue"/> {props.data.info.timestamp}</Col>}</Row>
          <Row>{licenses && licenses.length > 0 && <Col xs="12" lg="auto"><LiaBalanceScaleSolid className="conanIconBlue"/> {licenses.join(", ")}</Col>}</Row>
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="6" className="mt-2">{labels.map((item) => (<Badge className="recipeTopics" key={item}>#{item}</Badge>))}</Col>
        {packages && packages.length > 0 && (
        <Col xs="12" lg="6" className="mt-2">{prettyProfiles(packages).map(i => i.badget)}</Col>)}
      </Row>
    </div>
  )
}

function SearchList(props) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sortByName = (a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
  };

  const sortByDownloads = (a, b) => {
    return b.info.downloads - a.info.downloads
  };

  const sortByDate = (a, b) => {
    if (a.info.timestamp > b.info.timestamp) return -1;
    if (a.info.timestamp < b.info.timestamp) return 1;
  };

  const sortByPopularity = (a, b) => {
    return (b.info.downloads/b.info.age) - (a.info.downloads/a.info.age)
  };

  const sortByBestMatch = (a, b) => {
    const matchScore = (elem) => {
      let score = 0;
      const tokens = props.value.split(' ');
      if (elem.name.toLowerCase() == props.value.toLowerCase()) score += 9000
      for (const token of tokens) {
        if (elem.name.toLowerCase() == token.toLowerCase()) score += 8000;
        if (elem.name.toLowerCase().includes(token.toLowerCase())) score += 1000;
        if (elem.info.description && elem.info.description.toLowerCase().includes(token.toLowerCase())) score += 1000;
        if (token.startsWith('#')) {
            const topic_token = token.replace('#', '');
            Object.keys(elem.info.labels).forEach((item) => {if (item.toLowerCase().includes(token.toLowerCase())) score += 1000;});
        } else {
          Object.keys(elem.info.labels).forEach((item) => {if (item == token || item.toLowerCase().includes(token.toLowerCase())) score += 3000;});
        };
      }
      return score
    }
    if (matchScore(a) == matchScore(b)) return sortByName(a, b);
    if(matchScore(a) > matchScore(b)) return -1;
    if(matchScore(a) < matchScore(b)) return 1;
  };

  const sortByData = (a, b) => {
    if (props.sortDataBy == "sortByName") return sortByName(a, b)
    if (props.sortDataBy == "sortByDate") return sortByDate(a, b)
    if (props.sortDataBy == "sortByBestMatch") {
      if (props.value) return sortByBestMatch(a, b);
      else return sortByName(a, b);
    }
    return 0
  };

  useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
        try {
          console.log("props.value", props.value)
          console.log("props.value || 'all'", props.value || 'all')
          let value = props.value || 'all';
          console.log("value", value)
          let urls = get_urls({search: value, topics: props.topics, licenses: props.licenses})
          const packages = await get_json_list(urls.search.package, urls.api.public);
          setData(packages);
        } catch(err) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [])
  return (
    <div style={{width: "100%"}}>
      <h2 className="text-center">
        Recipes ({!loading && !data && 0}{!loading && data && data.length.toLocaleString()}{loading && <div className="spinner-grow"></div>})
      </h2>
      <ListGroup>
      {data && data.filter((info) => props.extraFilters(info)).sort(sortByData).map((info) => (
        <ListGroup.Item className="conan-content-basic-card mt-4" key={info.name}>
          <PackageInfo data={info}/>
        </ListGroup.Item>))
      }
      </ListGroup>
    </div>
  )
}

export default function ConanSearch(props) {
  const router = useRouter();
  let defaultValue = router.query.value;
  let defaultTopics = router.query.topics;
  let defaultLicenses = router.query.licenses;

  defaultTopics = defaultTopics || [];
  if (typeof defaultTopics === "string"){
    defaultTopics = [defaultTopics]
  }
  defaultTopics = defaultTopics.map(e => parseInt(e))
  defaultLicenses = defaultLicenses || [];
  if (typeof defaultLicenses === "string"){
    defaultLicenses = [defaultLicenses]
  }
  defaultLicenses = defaultLicenses.map(e => parseInt(e))
  defaultValue = defaultValue || '';

  const [value, setValue] = useState(defaultValue);
  const [topics, setTopics] = useState(defaultTopics);
  const [licenses, setLicenses] = useState(defaultLicenses);
  const [timer, setTimer] = useState(null);
  const [showFilters, setShowFilters] = useState(defaultTopics.length > 0);
  const [showWindows, setShowWindows] = useState(true);
  const [showMacOS, setShowMacOS] = useState(true);
  const [showMacOSSilicon, setShowMacOSSilicon] = useState(true);
  const [showLinux, setShowLinux] = useState(true);
  const [sortDataBy, setSortDataBy] = useState('sortByBestMatch');

  const getData = async (value, topiclist, licenseList) => {
    router.push(
      {
        pathname: '/center/recipes',
        query: {value: value, topics: topiclist, licenses: licenseList}
      }, undefined, {shallow: true})
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

  return (
    <React.StrictMode>

      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader titlePrefix={"Search Result"}/>
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
              <Col xs="10" md="10" lg="2" className="mt-2">
                <ConanSingleSelect
                  title="Sort by"
                  defaultValue={{value: 'sortByBestMatch', label: 'by best match'}}
                  options={[{value: 'sortByBestMatch', label: 'by best match'},
                            {value: 'sortByName', label: 'by name'},
                            {value: 'sortByDate', label: 'by date'}]}
                  handleFilter={handleSortFuction}
                />
              </Col>
              <Col xs="1" md="1" lg="1" className="mt-2">
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
            <SearchList
              value={value}
              topics={topics}
              licenses={licenses}
              sortDataBy={sortDataBy}
              extraFilters={extraFilters}
            />
          </Container>
          <br/>
        <ConanFooter/>
      </div>

    </React.StrictMode>

  );
}
