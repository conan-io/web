import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import {
    ConanCenterHeader,
    ConanFooter,
    UseItTab,
    BadgesTab,
    DependenciesTab,
    VersionsTab,
    PackagesTab,
    BasicSearchBar,
    truncate,
    truncateAndCopy,
    urlify,
    sanitizeURL,
    ClipboardCopy,
    prettyProfiles,
    DefaultDescription,
    Conan1xBanner
} from '@/components';
import { getJson, getUrls, ConanResponse, RecipeInfo, RecipeUseIt} from '@/service';
import { LiaBalanceScaleSolid, LiaGithub } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import hljs from "highlight.js";
import { PiWarningBold } from "react-icons/pi";
import { MdOutlineToday } from "react-icons/md";
import { AiOutlinePushpin } from "react-icons/ai";
import { PiGraphDuotone, PiMedal } from "react-icons/pi";
import { FaTags, FaHashtag } from "react-icons/fa";
import { SiConan } from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Tooltip } from 'react-tooltip';
import { useMediaQuery } from 'react-responsive';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';

interface PageProps  {
    notFound?: boolean,
    data?: ConanResponse<RecipeInfo>,
    //downloads?: ConanResponse<PackageDownloadsDTO>,
    recipeName?: string,
    recipeVersion?: string
}

type Params = {
    recipeName: string
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context: GetServerSidePropsContext<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {

  const recipeName = context.params?.recipeName
  let recipeVersion = null
  if (context.query.version) recipeVersion = decodeURIComponent(context.query.version.toString())
  let urls = getUrls({packageId: recipeName});
  let package_info_response = await getJson<ConanResponse<RecipeInfo>>(urls.package.info, urls.api.private);
  if (package_info_response.status == 404) {
    return {
      notFound: true,
    }
  }
  //let downloadsResponse = await getJson<ConanResponse<PackageDownloadsDTO>>(urls.package.downloads, urls.api.private)
  return {
    props: {
      data: package_info_response.data,
      //downloads: downloadsResponse.data,
      recipeName: recipeName,
      recipeVersion: recipeVersion
    },
  };
}

const ConanPackage: NextPage<PageProps> = (props) => {
  let router = useRouter();

  useEffect(() => {hljs.highlightAll();});

  const [selectedVersion, setSelectedVersion] = useState(props.recipeVersion !== null? props.recipeVersion: props.data[0].info.version);
  let indexSelectedVersion = Object.keys(props.data).filter(index => props.data[index].info.version === selectedVersion)[0];
  if (indexSelectedVersion == null) {
      indexSelectedVersion = "0";
      setSelectedVersion(props.data[0].info.version);
  }
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [selectedTab, setSelectedTab] = useState(indexSelectedVersion && props.data[indexSelectedVersion].info.status === "ok"? 'use_it': 'versions');
  const [packageOS, setPackageOS] = useState(null);
  const [useItLoading, setUseItLoading] = useState(true);

  useEffect(() => {
    hljs.highlightAll();
    setUseItLoading(true)
    const fetchData = async () => {
      try {
        let urls = getUrls({packageId: props.recipeName})
        const useItResponse = await getJson<ConanResponse<RecipeUseIt>>(urls.package.useIt, urls.api.public);
        // Inflate data with use_it information
        // TODO: improve
        for (const [key, value] of Object.entries(useItResponse.data)) {
            for (const [dataKey, dataValue] of Object.entries(props.data)) {
                if (dataValue.info.version === key) {
                    props.data[dataKey].use_it = value.use_it;
                }
            }
        }
      } catch(err) {
        console.log(err.message)
      } finally {
        setUseItLoading(false)
      }
    };
    fetchData();
  },[]);

  if (!props.data) return (<div>Loading...</div>);
  const recipeData = props.data[indexSelectedVersion];
  const recipeStatus = recipeData.info.status;
  const recipePackages = Object.values(recipeData.info.packages).map((value) => value);
  const recipeRevision = recipeData.info.recipe_revision;
  const recipeDescription = recipeData.info.description;
  const recipeHomepage = recipeData.info.homepage;
  const recipeLabels = recipeData.info.labels;
  const recipeLicenses = Object.keys(recipeData.info.licenses);
  const recipeConanCenterUrl = "https://github.com/conan-io/conan-center-index/tree/master/recipes/" + recipeData.name;
  const metadatsInfo = (recipeDescription && true)

  const iconStatusColor = recipeStatus === 'ok'? 'green': 'orange'
  const extraInfo = recipeStatus === 'ok'? 'maintained version': recipeStatus + ' version'

  const RecipeAside = () => {
    const installCodeContent = `[requires]\n${recipeData.name}/${selectedVersion}`;
    return (
      <Col xs lg="3" className="ps-4 mt-4 pt-4">
        {recipeDescription && <Row className="mb-2"><Col><h5>Recipe info</h5></Col></Row>}
        {recipeLicenses && recipeLicenses.length > 0 && (<Row>
          <Col xs lg>
            <Tooltip style={{ zIndex: 99 }} id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Licenses" data-tooltip-place="top">
              <LiaBalanceScaleSolid className="conanIconBlue conanIcon22" style={{verticalAlign: "middle"}}/>
            </a> {recipeLicenses.map((license) => {
              if(valid_licenses.includes(license.toLowerCase())) return (
                <a
                  href={"https://choosealicense.com/licenses/" + license.toLowerCase()}
                  rel="noopener noreferrer"
                  target="_blank"
                  key={license.toLowerCase()}
                >{license}</a>
              );
              return license;
            }).reduce<React.ReactNode[]>((prev, curr, index) => {
              if (index === 0) return [curr];
              return [...prev, ', ', curr];
            }, [])}
          </Col>
        </Row>)}

        {recipeDescription && (<Row>
          <Col xs lg>
            <Tooltip style={{ zIndex: 99 }} id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="GitHub repository" data-tooltip-place="top">
              <LiaGithub className="conanIconBlue conanIcon22" style={{verticalAlign: "middle"}}/>
            </a> <Link href={recipeConanCenterUrl}>
              View recipe on GitHub
            </Link>
          </Col>
        </Row>)}

        {(recipeHomepage) && (<Row>
          <Col xs lg>
            <Tooltip style={{ zIndex: 99 }} id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Home page" data-tooltip-place="top">
              <IoMdHome className="conanIconBlue conanIcon22" style={{verticalAlign: "middle"}}/>
            </a> <a href={urlify(recipeHomepage)}>{truncate(sanitizeURL(recipeHomepage), 22)}</a>
          </Col>
        </Row>)}

        {(recipeDescription && <Row>
          <Col xs lg>
          <Tooltip style={{ zIndex: 99 }} id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Last updated date" data-tooltip-place="top">
              <MdOutlineToday className="conanIconBlue conanIcon22" style={{verticalAlign: "middle"}}/>
            </a> {recipeData.info.timestamp}
          </Col>
        </Row>)}

        {recipeDescription && (<Row>
          <Col xs lg>
            <Tooltip style={{ zIndex: 99 }} id="package-info"/>
            <a data-tooltip-id='package-info' data-tooltip-html="Latest recipe revision" data-tooltip-place="top">
              <AiOutlinePushpin className="conanIconBlue conanIcon22" style={{verticalAlign: "middle"}}/>
            </a>{truncateAndCopy(recipeRevision, 20)}</Col>
        </Row>)}
        {recipeDescription && (<hr/>)}

        {recipePackages && recipePackages.length > 0 && (<Row className="mt-3">
          <Col xs lg>
            <h5>Available packages</h5>
          </Col>
        </Row>)}
        {recipePackages && recipePackages.length > 0 && (<Row>
          <Col xs lg>
            {prettyProfiles(recipePackages, {cursor: 'pointer'}).map((item) => (<Row key={item.key}>
              <Col xs='auto' lg='auto'
                onClick={() => {
                    setSelectedTab('packages');
                    setPackageOS(item.os);
                  }
                }
              >
                {item.badget}
              </Col>
            </Row>))}
          </Col>
        </Row>)}
        {recipePackages && recipePackages.length > 0 && (<hr/>)}

        {recipeDescription && <Row className="mt-3"><Col><h5>Install</h5></Col></Row>}
        {recipeDescription && <Row>
          <Col>
            Add the following line to your conanfile.txt:
            <pre>
              <code style={{backgroundColor: "white"}} className="language-ini" >
                {installCodeContent}
              </code>
            </pre>
          </Col>
        </Row>}
      </Col>
    )
  }

  const TabButtons = (props: { buttonClass: string; }) => (
      <>
        {recipeStatus === "ok" && <Button
          id="use_it"
          className={props.buttonClass + " " + ((selectedTab == 'use_it') && "tabButtonActive")}
          value="use_it"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><HiOutlineDocumentText className="conanIcon18 me-1"/> Use it {(useItLoading && <div className="ms-1 spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div>)}</Button>}
        <Button
          id="packages"
          className={props.buttonClass + " " + ((selectedTab == 'packages') && "tabButtonActive")}
          value="packages"
          onClick={(e) => {
            setSelectedTab(e.currentTarget.value);
            setPackageOS(null);
          }}
        ><SiConan className="conanIcon18 me-1"/> Packages</Button>
        <Button
          id="dependencies"
          className={props.buttonClass + " " + ((selectedTab == 'dependencies') && "tabButtonActive")}
          value="dependencies"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><PiGraphDuotone className="conanIcon18 me-1"/> Dependencies {(useItLoading && <div className="ms-1 spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div>)}</Button>
        <Button
          id="versions"
          className={props.buttonClass + " " + ((selectedTab == 'versions') && "tabButtonActive")}
          value="versions"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><FaTags className="conanIcon18 me-1"/> Versions</Button>
        <Button
          id="badges"
          className={props.buttonClass + " " + ((selectedTab == 'badges') && "tabButtonActive")}
          value="badges"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><PiMedal className="conanIcon18 me-1"/> Badges</Button>
        {/*<Button
          id="stats"
          className={props.buttonClass + " " + ((selectedTab == 'stats') && "tabButtonActive")}
          value="stats"
          onClick={(e) => setSelectedTab(e.currentTarget.value)}
        ><PiMedal className="conanIcon18 me-1"/> Stats</Button> */}
      </>
    )

  const RecipeTabs = () => (
      <>
      {selectedTab=='use_it' && recipeDescription && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        {metadatsInfo && (<RecipeAside/>)}
        <Col xs lg="9" className="mt-4 ps-4 pe-4 pt-4 recipeContentBox">
          <UseItTab recipe={recipeData} isLoading={useItLoading}/>
        </Col>
      </Row>}
      {selectedTab=='packages' && recipeDescription && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        {metadatsInfo && (<RecipeAside/>)}
        <Col xs lg="9" className="mt-4 ps-4 pe-4 pt-4 recipeContentBox">
          <PackagesTab recipe={recipeData} packageOS={packageOS} setPackageOS={setPackageOS}/>
        </Col>
      </Row>}
      {selectedTab=='dependencies' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        {metadatsInfo && (<RecipeAside/>)}
        <Col xs lg="9" className="mt-4 ps-4 pe-4 pt-4 recipeContentBox"><DependenciesTab recipe={recipeData} loading={useItLoading}/></Col>
      </Row>}
      {selectedTab=='versions' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        <Col xs lg className="pb-4 mt-4 ps-4 pe-4 pt-4 recipeContentBox"><VersionsTab selector={setSelectedVersion} data={props.data} /></Col>
      </Row>}
      {selectedTab=='badges' && <Row style={{marginLeft: '0px', marginRight: '0px'}}>
        <Col xs lg className="mt-4 ps-4 pe-4 pt-4 recipeContentBox"><BadgesTab recipeName={props.recipeName} /></Col>
      </Row>}
      </>
    )

  const valid_licenses = [
    '0bsd', 'afl-3.0', 'agpl-3.0', 'apache-2.0', 'artistic-2.0', 'bsd-2-clause',
    'bsd-3-clause-clear', 'bsd-3-clause', 'bsd-4-clause', 'bsl-1.0', 'cc-by-4.0',
    'cc-by-sa-4.0', 'cc0-1.0', 'cecill-2.1', 'cern-ohl-p-2.0', 'cern-ohl-s-2.0',
    'cern-ohl-w-2.0', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'eupl-1.2',
    'gfdl-1.3', 'gpl-2.0', 'gpl-3.0', 'isc', 'lgpl-2.1', 'lgpl-3.0', 'lppl-1.3c',
    'mit-0', 'mit', 'mpl-2.0', 'ms-pl', 'ms-rl', 'mulanpsl-2.0', 'ncsa', 'odbl-1.0',
    'ofl-1.1', 'osl-3.0', 'postgresql', 'unlicense', 'upl-1.0', 'vim', 'wtfpl', 'zlib'
  ];

  const onClickTopics = (topic: string) => {
    router.push(
      {
        pathname: '/center/recipes',
        query: {
          value: '',
          topics: topic}
      },
      undefined
    );
  }

  return (
    <React.StrictMode>

      <div className="flex-wrapper bg-conan-blue">
        <ConanCenterHeader titlePrefix={recipeData.name}/>
        <Conan1xBanner/>
        <Container className="conancontainer">
          <div className="mt-3 mb-3">
          <BasicSearchBar/>
          </div>
            <div className="pt-4 ps-4 pe-4 pb-4 recipeContentBox">
              <Col>
              <Row >
                <Col xs lg>
                  <Row>
                    <Col>
                      <h1 className="mt-2 mb-2" style={{display: 'inline'}}>
                        {recipeData.name}/{selectedVersion}
                      </h1><
                        ClipboardCopy
                          copyText={recipeData.name + "/" + selectedVersion}
                          buttonStyle={{cursor: 'pointer', display: 'inline'}}
                          tooltipStyle={{marginTop: "-14px", zIndex: 99}}
                          isCopiedStyle={{color: 'green', verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
                          copyStyle={{verticalAlign: 'top', marginLeft:'1px', marginTop:'7px', height: '20px', width: '20px'}}
                        /> <a data-tooltip-id='package-info' data-tooltip-html={extraInfo} data-tooltip-place="top">
                        {(recipeStatus === "unmaintained") && (<PiWarningBold style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)}
                        {/*(recipeStatus === "ok") && (<MdOutlineCheckCircleOutline style={{verticalAlign:'sub',color: iconStatusColor, height: '36px', width: '36px'}}/>)*/}
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {!recipeDescription && (<Row className="mt-4"><Col xs lg><DefaultDescription name={recipeData.name}/></Col></Row>)}
              {recipeDescription && (<Row><Col xs lg>{recipeDescription}</Col></Row>)}
              {recipeLabels && Object.keys(recipeLabels).length > 0 && (<Row className="pt-2">
                <Col xs lg>
                  {Object.keys(recipeLabels).map((item) => (
                    <a style={{cursor: 'pointer'}} key={item} onClick={() => onClickTopics(recipeLabels[item])}>
                      <Badge className="recipeTopics" key={item}><FaHashtag/>{item}</Badge>
                    </a>
                  ))}
                  {(recipeStatus !== "ok") && (<Badge bg="warning" text="white"><PiWarningBold/> {recipeStatus}</Badge>)}
                </Col>
              </Row>)}
              </Col>
            </div>


          <div className="mt-4" style={{borderBottom: "2px solid #21AFFF"}}>
            {isTabletOrMobile && (<ButtonGroup size="sm" className="tabButtonGroup" vertical>
              <TabButtons buttonClass="tabVerticalButton"/>
            </ButtonGroup>)}
            {!isTabletOrMobile && (<ButtonGroup size="sm" className="tabButtonGroup">
              <TabButtons buttonClass="tabButton"/>
            </ButtonGroup>)}
          </div>
          <RecipeTabs/>
        </Container>
        <br/>
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default ConanPackage;
