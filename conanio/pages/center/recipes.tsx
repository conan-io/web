import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';
import {
  ConanCenterHeader,
  ConanFooter,
  prettyProfiles,
  DefaultDescription,
  ConanSearchBar,
  ConanMultiSelectFilter,
  ConanSingleSelect,
  toFilterOptions,
  FilterOption,
  Conan1xBanner
} from '@/components';
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { BsFilterCircleFill, BsFilterCircle } from "react-icons/bs";
import { LuArrowBigUpDash } from "react-icons/lu";
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
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import {getJsonList, getUrls, getJson, ConanFilterResponse, ConanResponse, RecipeInfo } from '@/service';

type NewType = ConanFilterResponse;

interface PageProps  {
    data: {
        licenses: ConanResponse<ConanFilterResponse>,
        topics: ConanResponse<NewType>,
    }
}

export const getServerSideProps: GetServerSideProps<
  PageProps
> = async (): Promise<GetServerSidePropsResult<PageProps>> => {
  let urls = getUrls({ pattern: "", topics: null });
  let licenses = await getJson<ConanResponse<ConanFilterResponse>>(
    urls.licenses,
    urls.api.private,
  );
  let topics = await getJson<ConanResponse<ConanFilterResponse>>(
    urls.topics,
    urls.api.private,
  );

  return {
    props: {
      data: {
        licenses: licenses.data,
        topics: topics.data,
      },
    },
  };
};


const PackageInfo = (props: {package: RecipeInfo}) => {
  const licenses = Object.keys(props.package.info.licenses!)
  const labels = Object.keys(props.package.info.labels!)
  const packages = Object.values(props.package.info.packages).map((value) => value);
  return (
    <div className="m-2">
      <Row>
        <Col xs="12" lg="6" className="mt-2">
          <Row>
            <Col xs="12" lg="auto">
              <Link href={{ pathname: "/center/recipes/" + props.package.name, query: { version: encodeURIComponent(props.package.info.version || "") } }}>
                <h3>{props.package.name}/{props.package.info.version}</h3>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="auto">
              {props.package.info.description || (<DefaultDescription name={props.package.name}/>)}
            </Col>
          </Row>
        </Col>
        <Col xs="12" lg="6">
          <Row className="mt-2">{props.package.info.timestamp && <Col xs="12" lg="auto"><MdOutlineToday className="conanIconBlue"/> {props.package.info.timestamp}</Col>}</Row>
          <Row>{licenses && licenses.length > 0 && <Col xs="12" lg="auto"><LiaBalanceScaleSolid className="conanIconBlue"/> {licenses.join(", ")}</Col>}</Row>
          {props.package.info.deprecated !== 'false' && (
            <Badge className="bg-warning">Deprecated</Badge>
          )}
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

enum SortBy {
    Name = 'sortByName',
    Date = 'sortByDate',
    BestMatch = 'sortByBestMatch',
}

const SearchList = (props: {
  value: string;
  sortDataBy: SortBy,
  topics: number[];
  licenses: number[];
  extraFilters: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<RecipeInfo[]>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const sortByName = (a: RecipeInfo, b: RecipeInfo) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
  };

  const sortByDownloads = (a: RecipeInfo, b: RecipeInfo) => {
    return b.info.downloads - a.info.downloads
  };

  const sortByDate = (a: RecipeInfo, b: RecipeInfo) => {
    if (a.info.timestamp > b.info.timestamp) return -1;
    if (a.info.timestamp < b.info.timestamp) return 1;
  };

  const sortByPopularity = (a: RecipeInfo, b: RecipeInfo) => {
    return (b.info.downloads/b.info.age) - (a.info.downloads/a.info.age)
  };

  const sortByBestMatch = (a: RecipeInfo, b: RecipeInfo) => {
    const matchScore = (elem: RecipeInfo) => {
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
    if (matchScore(a) > matchScore(b)) return -1;
    if (matchScore(a) < matchScore(b)) return 1;
  };

  const sortByData = (a: RecipeInfo, b: RecipeInfo) => {
    if (props.sortDataBy == SortBy.Name) return sortByName(a, b)
    if (props.sortDataBy == SortBy.Date) return sortByDate(a, b)
    if (props.sortDataBy == SortBy.BestMatch) {
      if (props.value) return sortByBestMatch(a, b);
      else return sortByName(a, b);
    }
    return 0
  };

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        let value = props.value || 'all';
        let urls = getUrls({pattern: value, topics: props.topics, licenses: props.licenses})
        const packagesResponse = await getJsonList<RecipeInfo>(urls.search.package, urls.api.public);
        setData(packagesResponse.data);
      } catch(err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.value, props.topics, props.licenses])

  const renderPagination = (filteredData: RecipeInfo[], pageSize: number) => {
    let pages: RecipeInfo[][] = []
    let pageButtoms = []
    for (let i = 0; i < filteredData.length; i += pageSize) {
      pages.push(filteredData.slice(i, i + pageSize))
        // do whatever
    }
    for (let number = 1; number <= pages.length; number++) {
      pageButtoms.push(
        <Pagination.Item key={number} active={number === pageNumber} onClick={() => setPageNumber(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return (
      <>
       {pages.length > 1 && (<Pagination size="sm" style={{    "margin": "10px auto -10px auto"}}>
          <Pagination.First onClick={() => setPageNumber(1)}/>
          <Pagination.Prev onClick={() => {if(pageNumber > 1) setPageNumber(pageNumber - 1);}}/>
          {pageButtoms.slice(Math.max(0, Math.min(pageNumber-5, pages.length-10)), Math.max(10, pageNumber+5)).map((item) => (item)) }
          <Pagination.Next onClick={() => {if(pageNumber < pages.length) setPageNumber(pageNumber + 1);}}/>
          <Pagination.Last onClick={() => setPageNumber(pages.length)}/>
          <Pagination.Item key="all" onClick={() => setShowAll(true)}>Show All</Pagination.Item>
        </Pagination>)}
        {
          pages.length > 0 && pages[pageNumber-1].map((info) => (
            <ListGroup.Item className="conan-content-basic-card mt-4" key={info.name}>
              <PackageInfo package={info}/>
            </ListGroup.Item>))
        }
        {pages.length > 1 && (<Pagination size="sm" style={{    "margin": "17px auto 0px auto"}}>
          <Pagination.First onClick={() => setPageNumber(1)}/>
          <Pagination.Prev onClick={() => {if(pageNumber > 1) setPageNumber(pageNumber - 1);}}/>
          {pageButtoms.slice(Math.max(0, Math.min(pageNumber-5, pages.length-10)), Math.max(10, pageNumber+5)).map((item) => (item)) }
          <Pagination.Next onClick={() => {if(pageNumber < pages.length) setPageNumber(pageNumber + 1);}}/>
          <Pagination.Last onClick={() => setPageNumber(pages.length)}/>
          <Pagination.Item key="top" onClick={() => window.scrollTo(0, 0)}><LuArrowBigUpDash/></Pagination.Item>
        </Pagination>)}
      </>
    )
  }

  return (
    <div style={{width: "100%"}}>
      <h2 className="text-center">
        Recipes ({!loading && !data && 0}{!loading && data && data.length.toLocaleString()}{loading && <div className="spinner-grow"></div>})
      </h2>
      <ListGroup className="mt-4">
        {data && !showAll && renderPagination(data.filter((info) => props.extraFilters(info)).sort(sortByData), 100)}
        {data && showAll && (
        <Pagination size="sm" style={{    "margin": "10px auto -10px auto"}}>
          <Pagination.Item key="show less" onClick={() => setShowAll(false)}>Show Less</Pagination.Item>
        </Pagination>)}
        {data && showAll && data.filter((info) => props.extraFilters(info)).sort(sortByData).map((info) => (
        <ListGroup.Item className="conan-content-basic-card mt-4" key={info.name}>
          <PackageInfo package={info}/>
        </ListGroup.Item>))}
      </ListGroup>
    </div>
  )
}

const ConanSearch: NextPage<PageProps> = (props) => {
  const router = useRouter();
  let defaultValue = router.query.value?.toString() || '';
  let defaultTopics = router.query.topics || [];
  let defaultLicenses = router.query.licenses || [];

  if (typeof defaultTopics === "string"){
    defaultTopics = [defaultTopics]
  }
  if (typeof defaultLicenses === "string"){
    defaultLicenses = [defaultLicenses]
  }

  const [textSearchBar, setTextSearchBar] = useState(defaultValue);
  const [value, setValue] = useState<string>(defaultValue);
  const [topics, setTopics] = useState<number[]>(defaultTopics.map(e => parseInt(e)));
  const [licenses, setLicenses] = useState<number[]>(defaultLicenses.map(e => parseInt(e)));
  const [timer, setTimer] = useState(null);
  const [showFilters, setShowFilters] = useState(defaultTopics.length > 0);
  const [showWindows, setShowWindows] = useState(true);
  const [showMacOS, setShowMacOS] = useState(true);
  const [showMacOSSilicon, setShowMacOSSilicon] = useState(true);
  const [showLinux, setShowLinux] = useState(true);
  const [sortDataBy, setSortDataBy] = useState(SortBy.BestMatch);

  const getData = async (value: string, topicList: number[], licenseList: number[]) => {
    router.push(
      {
        pathname: '/center/recipes',
        query: {value: value, topics: topicList, licenses: licenseList}
      }, undefined, {shallow: true})
  }
  const handleChange = (event: string) => {
    const typingSearch = (value: string) => {
      setValue(event);
      getData(value, topics, licenses);
    };
    setTextSearchBar(event)
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      typingSearch(event);
    }, 500);
    setTimer(newTimer);
  }

  var handleTopics = (selectedOption: FilterOption[]) => {
    const newTopics = selectedOption.map(elem => {return elem.value as number})
    setTopics(newTopics);
    getData(value, newTopics, licenses);
  }

  var handleLicenses = (selectedOption: FilterOption[]) => {
    const newLicenses = selectedOption.map(elem => {return elem.value as number})
    setLicenses(newLicenses);
    getData(value, topics, newLicenses);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setValue(textSearchBar)
    getData(textSearchBar, topics, licenses);
    event.preventDefault();
  }

  const handleSortFuction = (selectedOption: { value: React.SetStateAction<SortBy> }) => {
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
    const _filterNumber =
      topics.length +
      licenses.length +
      (showWindows ? 0 : 1) +
      (showLinux ? 0 : 1) +
      (showMacOS ? 0 : 1) +
      (showMacOSSilicon ? 0 : 1);
    if (!_filterNumber) return null
    const Tag = _filterNumber>9? MdFilter9Plus: tags[_filterNumber];
    return  (<Tag className="conanIconBlue" style={style}/>)
  }

  const extraFilters = (item: RecipeInfo) => {
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
        <Conan1xBanner/>
          <br/>
          <Container className="conancontainer">
            <Row className="justify-content-md-center">
              <Col xs="12" md="12" lg="7" className="mt-2">
                <Form onSubmit={e => handleSubmit(e)}>
                    <div>
                    <ConanSearchBar value={textSearchBar} handleChange={handleChange}/>
                  </div>
                </Form>
              </Col>
              <Col xs="10" md="10" lg="3" className="mt-2">
                <ConanSingleSelect
                  title="Sort by"
                  defaultValue={{value: SortBy.BestMatch, label: 'by best match'}}
                  options={[{value: SortBy.BestMatch, label: 'by best match'},
                            {value: SortBy.Name, label: 'by name'},
                            {value: SortBy.Date, label: 'by date'}]}
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
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Licenses" defaultValue={licenses} options={toFilterOptions(props.data.licenses)} handleFilter={handleLicenses}/></Col>
              <Col xs="12" md="12" lg="6" className="mt-2"><ConanMultiSelectFilter title="Topics" defaultValue={topics} options={toFilterOptions(props.data.topics)} handleFilter={handleTopics}/></Col>
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
export default ConanSearch;
