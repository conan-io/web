import React from 'react';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi";
import { BiSolidInfoCircle } from "react-icons/bi";
import { MdOutlineCheckCircleOutline, MdOutlineToday } from "react-icons/md";
import { PiWarningBold } from "react-icons/pi";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import {
  AiOutlinePushpin,
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineMinusCircle
} from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaPython } from "react-icons/fa";
import { BsFiletypeTxt } from "react-icons/bs";
import { FaTags, FaWindows, FaLinux, FaApple } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend} from 'recharts';
import { prettyProfiles, truncateAdnCopy } from './utils';
import { useMediaQuery } from 'react-responsive';

{/* TODO: this function should go in a more common module. More configurable? */}
function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text);
  }
  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {});
  }

  return (
    <div>
      {/* Bind our handler function to the onClick button property */}
      <button className="copyBadgesButton" onClick={handleCopyClick}>
        <span>
          {isCopied ? <
            HiOutlineClipboardCheck className="conanIcon18" style={{color: 'green', verticalAlign: 'baseline', height: '20px', width: '20px'}}
          /> : <
            HiOutlineClipboardCopy className="conanIcon18 conanIconBlue" style={{ verticalAlign: 'baseline', height: '20px', width: '20px'}}
          />}
        </span>
      </button>
    </div>
  );
}


function BadgesTab({recipeName}) {
  const mdMessage = `[![Conan Center](https://img.shields.io/conan/v/${recipeName})](https://conan.io/center/recipes/${recipeName})`;
  const resMessage = `.. image:: https://img.shields.io/conan/v/${recipeName}   :alt: Conan Center`;
  const asciiMessage = `image:https://img.shields.io/conan/v/${recipeName} [Conan Center]`;
  const htmlMessage = `<img alt="Conan Center" src="https://img.shields.io/conan/v/${recipeName}">`;

  return (
    <div className="mb-4">
      <img src={"https://img.shields.io/conan/v/" + recipeName} alt="Conan Center"></img>
      <br/><br/>
      <Tabs className="package-tabs" defaultActiveKey="Markdown" id="badges-uncontrolled">
        <Tab eventKey="Markdown" title="Markdown">
          <br/>
          <ClipboardCopy copyText={mdMessage}/>
          <pre><code className="language-markdown">{mdMessage}</code></pre>
        </Tab>
        <Tab eventKey="reStructuredText" title="reStructuredText">
          <br/>
          <ClipboardCopy copyText={resMessage}/>
          <pre><code className="language-markdown">{resMessage}</code></pre>
        </Tab>
        <Tab eventKey="AsciiDoc" title="AsciiDoc">
          <br/>
          <ClipboardCopy copyText={asciiMessage}/>
          <pre><code className="language-asciidoc">{asciiMessage}</code></pre>
          </Tab>
        <Tab eventKey="HTML" title="HTML">
          <br/>
          <ClipboardCopy copyText={htmlMessage}/>
          <pre><code className="language-html">{htmlMessage}</code></pre>
        </Tab>
      </Tabs>
    </div>
  );
}

function CCIAssistanceLink() {
  return (
    <p>If you need additional assistance, please ask a <Link href={{ pathname: "https://github.com/conan-io/conan-center-index/issues/new", query: { labels: "question", template: "question.yml", title: "[question] SHORT DESCRIPTION" }}}>
          question
      </Link> in the Conan Center Index repository.
      </p>
  );
}

function UseItFullContent({props}) {
  const reference = props.recipeName + "/" + props.recipeVersion;

  const TargetsInfo = function(recipe_properties) {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const root = recipe_properties.root? recipe_properties.root: Object();
    const components = recipe_properties.components? recipe_properties.components: Object();
    const getCMakePropertyValue = function(config_property, module_property) {
      let defaultName = config_property == "cmake_target_name"? `${props.recipeName}::${props.recipeName}`: props.recipeName;
      let name = root[config_property]? root[config_property]: defaultName;
      if (root.cmake_find_mode == "module" && root[module_property]) {
        return root[module_property];
      }
      else if (root.cmake_find_mode == "both" && root[module_property]) {
        return `${name} (config), ${root[module_property]} (module)`;
      }
      else {
        return name;
      }
    };
    const cmakePackageName = getCMakePropertyValue("cmake_file_name", "cmake_module_file_name");
    const cmakeTargetName = getCMakePropertyValue("cmake_target_name", "cmake_module_target_name");
    const pkgConfigName = root.pkg_config_name? `${root.pkg_config_name}.pc`: `${props.recipeName}.pc`;
    const componentsTargetNames = Object.keys(components).filter((component) => components[component]).map(function(component) {
      let name = components[component].cmake_target_name? components[component].cmake_target_name: `${props.recipeName}::${component}`;
      return `${component} => ${name}`;
    });
    const componentsPkgConfigName = Object.keys(components).filter((component) => components[component]).map(function(component) {
      let name = components[component].pkg_config_name? components[component].pkg_config_name: `${props.recipeName}-${component}`;
      return `${component} => ${name}.pc`;
    });
    return (
      <div>
        <p>These are the main declared targets:</p>
        <ul>
          <li><strong>CMake package name(s)</strong>: <code>{cmakePackageName}</code></li>
          <li><strong>CMake target name(s)</strong>: <code>{cmakeTargetName} </code>
          {componentsTargetNames.length > 0 && open && (<AiFillCaretDown style={{cursor: 'pointer'}} className='conanIcon18 conanIconBlue' onClick={() => setOpen(!open)} />)}
          {componentsTargetNames.length > 0 && !open && (<AiFillCaretRight style={{cursor: 'pointer'}} className='conanIcon18 conanIconBlue' onClick={() => setOpen(!open)} />)}
          </li>
          <Collapse in={open}>
            <div>
              <pre className='preFixed'>
                <code style={{color: "#e83e8c"}}>{componentsTargetNames.map(function(c) {
                return `${c}\n`;})}</code>
              </pre>
            </div>
          </Collapse>
          <li><strong>pkg-config file name(s)</strong>: <code>{pkgConfigName} </code>
          {componentsPkgConfigName.length > 0 && open2 && (<AiFillCaretDown style={{cursor: 'pointer'}} className='conanIcon18 conanIconBlue' onClick={() => setOpen2(!open2)} />)}
          {componentsPkgConfigName.length > 0 && !open2 && (<AiFillCaretRight style={{cursor: 'pointer'}} className='conanIcon18 conanIconBlue' onClick={() => setOpen2(!open2)} />)}
          </li>
          <Collapse in={open2}>
            <div>
              <pre className='preFixed'>
                <code style={{color: "#e83e8c"}}>{componentsPkgConfigName.map(function(c) {
                return `${c}\n`;})}</code>
              </pre>
              </div>
          </Collapse>
        </ul>
        <p>A simple use case using the CMake file name and the global target:</p>
        <pre><code className="language-cmake">
          {`# ...
find_package(${cmakePackageName.split(" (config),")[0].trim()} REQUIRED)
# ...
target_link_libraries(YOUR_TARGET ${cmakeTargetName.split(" (config),")[0].trim()})`}
        </code></pre>
      </div>
    );
  };

  const HeadersInfo = function({headers}) {
    if (headers && headers.length > 0) {
      return (
      <div>
        <p>These are all the available headers. Some of these ones might be non-public; make sure of it by visiting the <code>{props.recipeName}</code> homepage listed above:</p>
        <pre className='preFixed'>
          <code className="language-c">{headers.sort().map(function(h) {
          return `#include "${h}"\n`;})}</code>
        </pre>
      </div>);
    }
    return null;
  };

  const RecipeDetails = function(){
    if (props.info.hasOwnProperty("properties") || props.info.headers) {
      let cmakeFindModeNone = false;
      if (props.info.properties) {
          if (props.info.properties.hasOwnProperty("cmake_find_mode")) {
            cmakeFindModeNone = props.info.properties.cmake_find_mode == "none";
          }
      }
      return (
        <div>
          <p>Useful information to take into account to consume this library:</p>
          <Tabs className="package-tabs mt-2" id="uncontrolled">
            {props.info.hasOwnProperty("properties") && !cmakeFindModeNone && (<Tab eventKey="targets" title="Targets"><br/><TargetsInfo root={props.info.properties} components={props.info.components_properties} /></Tab>)}
            {props.info.headers && (<Tab eventKey="headers" title="Headers"><br/><HeadersInfo headers={props.info.headers} /></Tab>)}
          </Tabs>
        </div>
        );
      }
    return null;
  };

  const ConanfileInfo = function() {
    const [conanfile, setConanfile] = useState('txt');
    const conanfileTxt = `[requires]
${reference}
[generators]
CMakeDeps
CMakeToolchain
[layout]
cmake_layout`;
    const conanfilePy = `from conan import ConanFile
from conan.tools.cmake import cmake_layout


class ExampleRecipe(ConanFile):
    settings = "os", "compiler", "build_type", "arch"
    generators = "CMakeDeps", "CMakeToolchain"

    def requirements(self):
        self.requires("${reference}")

    def layout(self):
        cmake_layout(self)`;
      return (
        <>
          <Tabs id="conanfile-tab-selection" activeKey={conanfile} onSelect={(k) => setConanfile(k)} className="package-tabs">
            <Tab eventKey="txt" title={<span><BsFiletypeTxt className="conanIcon18 mr-1"/> conanfile.txt</span>}>
              <ClipboardCopy copyText={conanfileTxt}/>
              <pre><code className="language-ini">{conanfileTxt}</code></pre>
            </Tab>
            <Tab eventKey="py" title={<span><FaPython className="conanIcon18 mr-1"/> conanfile.py</span>}>
              <ClipboardCopy copyText={conanfilePy}/>
              <pre><code className="language-python">{conanfilePy}</code></pre>
            </Tab>
          </Tabs>
          <br/>
          <p>Now, you can run this Conan command to locally install (and build if necessary) this recipe and its dependencies (if any):</p>
          <pre><code className="language-bash">{`$ conan install conanfile.${conanfile} --build=missing`}</code></pre>
        </>
      );
  };

  return (
    <div>
      <h3>Using {props.recipeName}</h3>
      <blockquote>
        <BiSolidInfoCircle/><strong> Note</strong>
        <br/><br/>
        If you are a new Conan user, we recommend reading the <Link href="https://docs.conan.io/2/tutorial/consuming_packages.html">how to consume packages</Link> tutorial.
        <CCIAssistanceLink />
      </blockquote>
      Simplest use case consuming this recipe and assuming CMake as your local build tool:
      <br/><br/>
      <ConanfileInfo />
      <RecipeDetails />
      <br/>
    </div>
  );
}

function UseItTab(props) {
  if (props.info) {
    const isToolRequire = props.info.package_type && props.info.package_type == "application";
    // If it's a tool requirement
    if (isToolRequire) {
        return (
          <div>
            <h3>Using {props.recipeName} as a tool</h3>
            <p>This recipe belongs to the family of the Conan build tools.</p>
            <p>Please, have a look at the Conan documentation about
            <Link href={{ pathname: "https://docs.conan.io/2/tutorial/consuming_packages/use_tools_as_conan_packages.html"}}>
              how to use build tools as Conan packages
            </Link>
            .</p>
            <CCIAssistanceLink />
         </div>
        );
    }
    else {
      // if it's a normal library
      return <UseItFullContent props={props}></UseItFullContent>
    }
  }
  return (
    // Something went wrong
    <div>
      <p>Please, have a look at the Conan documentation about
      <Link href={{ pathname: "https://docs.conan.io/2/tutorial/consuming_packages/build_simple_cmake_project.html"}}>
        how to use a library in your project
      </Link>
      .</p>
      <CCIAssistanceLink />
    </div>
  );
}


function DependenciesTab(props) {
  if (props.info) {
    const hasRequires = props.info.requires && props.info.requires.length > 0;
    const hasBuildRequires = props.info.build_requires && props.info.build_requires.length > 0;
    if (hasRequires || hasBuildRequires) {
      return (
        <div>
          {hasRequires && (<div>
          <h3>Dependencies</h3>
          <br/>
          {props.info.requires.map( function(require) {
            let ref = require.split("/");
            let name = ref[0];
            let version = ref[1];
            return <Link key={ require + "deps"} href={{ pathname: "/center/recipes/" + name, query: { version: version } }} passHref><div onClick={() => props.setRecipeVersion(version)}><h5>{require}</h5></div></Link>;
            })
          }
          </div>)}
          {hasBuildRequires && (<div>
          <br/>
          <h3>Dependencies (tool requirements)</h3>
          <br/>
          {props.info.build_requires.map( function(require) {
            let ref = require.split("/");
            let name = ref[0];
            let version = ref[1];
            return <Link key={require + "tool_deps"} href={{ pathname: "/center/recipes/" + name, query: { version: version } }} passHref><div onClick={() => props.setRecipeVersion(version)}><h5>{require}</h5></div></Link>;
            })
          }
          </div>)}
        </div>
      );
    }
    return (
      <div>
        <h3>Dependencies</h3>
        <br/>
        <p>This recipe version (<strong>{props.recipeName}/{props.recipeVersion}</strong>) has no dependencies.</p>
      </div>
    );
  }
  return (
    <div>
      <p>This information is not available at this moment.</p>
      <CCIAssistanceLink />
    </div>
  );
}


function PackagesTab(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const hasPackages = props.packages && props.packages.length > 0;
  const PackageItem = function({package_info}) {
    const group_style = {
      border: '0.05rem solid #FFFFFF',
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      margin:'0px 20px 15px 20px',
      padding: '15px 40px 15px 40px',
    }
    const row_style = {
      borderTop: '0.5px solid #21AFFF',
      paddingTop: '5px',
      marginTop: '5px',
    }
    const frist_row_style = {
      paddingTop: '5px',
      marginTop: '5px',
    }
    const main_col_style = {
      borderRight: '0.5px solid #21AFFF',
    }
    const showStyle = {
      cursor: 'pointer',
    }
    const os = {
      'Windows': <FaWindows className="conanIcon18"/>,
      'Linux': <FaLinux className="conanIcon18"/>,
      'Macos': <FaApple className="conanIcon18"/>,
    }

    const OptionList = () => {
      const defaultOptionNumber = 5;
      const optionsLength = Object.keys(package_info.options).length;
      const [optionsNumber, setOptionsNumber] = useState(defaultOptionNumber);

      if(Object.keys(package_info.options).length > 0) {
        return (
          <Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>options</strong></Col>
            <Col>{Object.keys(package_info.options).slice(0, optionsNumber).map((key, index) => (
              <Col key={key}><Row>{key}: {package_info.options[key]}</Row></Col>))}
              {Object.keys(package_info.options).length > optionsNumber && <Col>
                <Row><a onClick={()=>{setOptionsNumber(Object.keys(package_info.options).length);}} style={showStyle}>
                    <TfiMoreAlt className="conanIcon26 conanIconBlue"/>
                  </a>
                </Row>
              </Col>}
              {Object.keys(package_info.options).length > defaultOptionNumber && optionsNumber == optionsLength && <Col>
                <Row>
                  <a onClick={()=>{setOptionsNumber(defaultOptionNumber);}} style={showStyle}>
                    <AiOutlineMinusCircle className="conanIcon26 conanIconBlue"/>
                  </a>
                </Row>
              </Col>}
            </Col>
          </Row>
        );
      }
    }

    return (
      <div>
        {package_info.package_id && (<div className="pl-3 ml-4 mt-2">
          {os[package_info.os]}
          <Badge className="ml-1 profileTopics">{package_info.os}</Badge>
          <Badge className="profileTopics">{package_info.arch}</Badge>
          <Badge className="profileTopics">{package_info.options.shared && package_info.options.shared == "True" && ("Shared")}</Badge>
          <Badge className="profileTopics">{package_info.build_type}</Badge>
          {
            props.packages.length==1 &&
            !package_info.os &&
            !package_info.arch &&
            !package_info.compiler &&
            !package_info.compiler_cppstd &&
            !package_info.compiler_version &&
            !package_info.compiler_runtime &&
            !package_info.compiler_runtime_type &&
            !package_info.build_type &&
            (<Badge className="profileTopics">Header Only</Badge>)
          }
        </div>)}
        <ListGroup.Item key={package_info.package_id} style={group_style}>
          {package_info.package_id && (<Row style={frist_row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>package ID</strong></Col>
            <Col>{isTabletOrMobile? truncateAdnCopy(package_info.package_id, 18): package_info.package_id}</Col>
          </Row>)}
          {props.recipeRevision && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>Recipe Revision</strong></Col>
            <Col>{isTabletOrMobile? truncateAdnCopy(props.recipeRevision,18): props.recipeRevision}</Col>
          </Row>)}
          {package_info.os && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>os</strong></Col>
            <Col>{package_info.os}</Col>
          </Row>)}
          {package_info.arch && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>arch</strong></Col>
            <Col>{package_info.arch}</Col>
          </Row>)}
          {package_info.compiler && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>compiler</strong></Col>
            <Col>{package_info.compiler}</Col>
          </Row>)}
          {package_info.compiler_cppstd && (<Row>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>compiler.cppstd</strong></Col>
            <Col>{package_info.compiler_cppstd}</Col>
          </Row>)}
          {package_info.compiler_version && (<Row>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>compiler.version</strong></Col>
            <Col>{package_info.compiler_version}</Col>
          </Row>)}
          {package_info.compiler_runtime && (<Row>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>compiler.runtime</strong></Col>
            <Col>{package_info.compiler_runtime}</Col>
          </Row>)}
          {package_info.compiler_runtime_type && (<Row>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>compiler.runtime_type</strong></Col>
            <Col>{package_info.compiler_runtime_type}</Col>
          </Row>)}
          {package_info.build_type && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>build_type</strong></Col>
            <Col>{package_info.build_type}</Col>
          </Row>)}
          <OptionList/>
          {package_info.requires.length > 0 && (<Row style={row_style}>
            <Col xs="12" md="4" lg="4" style={main_col_style}><strong>requires</strong></Col>
            <Col>{package_info.requires.map(r => (
              <Col key={r}><Row>{r}</Row></Col>))}
            </Col>
          </Row>)}
        </ListGroup.Item>
      </div>
    )
  }
  if (hasPackages) {
    return (
      <div>
        <h3>Packages {props.packageOS && ("(" + props.packageOS + ")")}</h3>
        {props.packageOS && (<a style={{color: '#007bff', cursor: 'pointer'}} onClick={() => props.setPackageOS(null)}>(Show all packages)</a>)}
        <br/>
        <ListGroup className="mb-4">
          { ((!props.packageOS) || (props.packageOS=='Linux')) && props.packages.filter(data => data.os == 'Linux').map(data => (<PackageItem key={data.package_id} package_info={data}/>)) }
          { ((!props.packageOS) || (props.packageOS=='Windows')) && props.packages.filter(data => data.os == 'Windows').map(data => (<PackageItem key={data.package_id} package_info={data}/>)) }
          { ((!props.packageOS) || (props.packageOS=='macOS')) && props.packages.filter(data => ((data.os == 'Macos') && (data.arch == 'x86_64'))).map(data => (<PackageItem key={data.package_id} package_info={data}/>)) }
          { ((!props.packageOS) || (props.packageOS=='macOS Apple Silicon')) && props.packages.filter(data => ((data.os == 'Macos') && (data.arch == 'armv8'))).map(data => (<PackageItem key={data.package_id} package_info={data}/>)) }
          { ((!props.packageOS) || (props.packageOS=='Header Only')) && props.packages.filter(data => ((!data.os && !data.arch))).map(data => (<PackageItem key={data.package_id} package_info={data}/>)) }
        </ListGroup>
      </div>
    );
  }
  return (
    <div>
      <h3>Packages</h3>
      <br/>
      <p>This recipe version (<strong>{props.recipeName}/{props.recipeVersion}</strong>) has no packages.</p>
    </div>
  );
}


function VersionsTab(props) {
  const VersionItem = function({recipe}) {
    const iconStatusColor = recipe.info.status === 'ok'? 'green': 'orange'
    const extraInfo = recipe.info.status === 'ok'? 'maintained version': recipe.info.status + ' version'
    return (
      <ListGroup.Item key={recipe.info.recipe_revision} style={{border: '0.05rem solid #21AFFF', backgroundColor: '#FFFFFF', borderRadius: '10px', margin:'0px 0px 5px 0px'}}>
        <ReactTooltip id="extra-info"/>
        <Row style={{alignItems: 'center'}}>
          <Col md="1">
            <a data-tooltip-id='extra-info' data-tooltip-html={extraInfo} data-tooltip-place="top">
            {(recipe.info.status === "unmaintained") && (<PiWarningBold style={{verticalAlign:'text-top',color: iconStatusColor,height: '21px', width: '21px'}}/>)}
            {(recipe.info.status === "ok") && (<MdOutlineCheckCircleOutline style={{verticalAlign:'text-top',color: iconStatusColor,height: '21px', width: '21px'}}/>)}
            </a>
          </Col>
          <Col md="2">
            <a data-tooltip-id='extra-info' data-tooltip-html="Reference version" data-tooltip-place="top">
              <FaTags className="mr-2" style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}/>
            </a>
            <a key={recipe.info.version} style={{color: '#007bff',cursor: 'pointer'}} onClick={()=>{props.selector(recipe.info.version);window.scrollTo(0, 0);}}>
              {recipe.info.version}
            </a>
          </Col>
          <Col md="3">
            <Row style={{padding:'0px 15px'}}>
              <div className="d-inline">
                <a data-tooltip-id='extra-info' data-tooltip-html="Last updated date" data-tooltip-place="top">
                  <MdOutlineToday className="conanIconBlue" style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/>
                </a> {recipe.info.timestamp}
              </div>
            </Row>
            {Object.keys(recipe.info.licenses).length > 0 && (<Row style={{padding:'0px 15px'}} className="mt-2">
                <div className="d-inline">
                  <a data-tooltip-id='extra-info' data-tooltip-html="Licenses" data-tooltip-place="top">
                    <LiaBalanceScaleSolid style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/>
                  </a> {Object.keys(recipe.info.licenses).join(", ")}
                </div>
            </Row>)}
          </Col>
          <Col className="text-center" md="6">
            <Row>
              <a data-tooltip-id='extra-info' data-tooltip-html="Latest recipe revision" data-tooltip-place="top">
                <AiOutlinePushpin style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}/>
              </a> {recipe.info.recipe_revision}
            </Row>
            {recipe.info.settings && recipe.info.settings.length > 0 && <Row className="mt-2">
              {prettyProfiles(recipe.info.settings).map((item) => (item.badget))}
            </Row>}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
  return (
    <ListGroup>
      { Object.values(props.data).map(data => (<VersionItem key={data.info.recipe_revision} recipe={data}/>)) }
    </ListGroup>
  );
}


function StatsTab(props) {
  const color = ['#21AFFF', '#3cb44b', '#ffe119', '#f58231', '#911eb4',
                 '#e6194B', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff',
                 '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1',
                 '#000075', '#a9a9a9', '#4363d8', '#42d4f4']
   const labels = props.maintainedVersions.map((item) => ({"key": item}));
   const [lineProps, setLineProps] = useState(
     labels.reduce(
       (a, { key }) => {
         a[key] = false;
         return a;
       },
       { hover: null }
     )
   );
   const handleLegendMouseEnter = (e) => {
     if (!lineProps[e.dataKey]) {
       setLineProps({ ...lineProps, hover: e.dataKey });
     }
   };

   const handleLegendMouseLeave = (e) => {
     setLineProps({ ...lineProps, hover: null });
   };

   const selectLine = (e) => {
     setLineProps({
       ...lineProps,
       [e.dataKey]: !lineProps[e.dataKey],
       hover: null
     });
   };

   const showAllLines = () => {
     const newLineProps = labels.reduce(
       (a, { key }) => {
         a[key] = false;
         return a;
       },
       { hover: null }
     );
     setLineProps(newLineProps);
   }

   const hideAllLines = () => {
     const newLineProps = labels.reduce(
       (a, { key }) => {
         a[key] = true;
         return a;
       },
       { hover: null }
     );
     setLineProps(newLineProps);
   }

   const showCurrentVersionLine = () => {
     const newLineProps = labels.reduce(
       (a, { key }) => {
         a[key] = !(key==props.selectedVersion);
         return a;
       },
       { hover: null }
     );
     setLineProps(newLineProps);
   }

  return (
    <div>
      <Row className="pl-3 pb-3"><h3>{props.recipeName} stats</h3></Row>
      <hr/>
      <Row className="pl-1">
        <Col xs md lg="3"><b>Total downloads:</b></Col>
        <Col xs md lg="auto">
          {Object.values(props.data).map((e) => e.info.downloads).reduce((a, b) => a + b, 0).toLocaleString()}</Col>
      </Row>
      <hr/>
      <Row className="pl-1">
        <Col xs md lg="3"><b>Current version total downloads:</b></Col>
        <Col xs md lg="auto">{props.currentVersionDownloads.toLocaleString()}</Col>
      </Row>
      <hr/>
      <Row className="pt-4 pl-3"><h4>Recipe downloads by version</h4></Row>
      <Row>
        <LineChart width={Math.min(1100, window.innerWidth*0.8)} height={400} data={props.recipeDownloadsAll} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis dataKey="date" stroke="#808080"/>
          <YAxis stroke="#808080"/>
          <Legend
            onClick={selectLine}
            onMouseOver={handleLegendMouseEnter}
            onMouseOut={handleLegendMouseLeave}
          />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          {props.maintainedVersions.map((item, index) => (
            <Line
              key={item}
              type="monotone"
              dataKey={item}
              stroke={color[index]}
              hide={lineProps[item] === true}
            />
          ))}
        </LineChart>
      </Row>
      <Row className="justify-content-center">
        <ButtonGroup size="sm" className="p-3 mb-4">
          <Button className="statsButton" onClick={hideAllLines}>Hide all</Button>
          <Button className="statsButton" onClick={showCurrentVersionLine}>Show current version</Button>
          <Button className="statsButton" onClick={showAllLines}>Show all</Button>
        </ButtonGroup>
      </Row>
    </div>
  )
}


export { UseItTab, BadgesTab, PackagesTab, DependenciesTab, VersionsTab, StatsTab };
