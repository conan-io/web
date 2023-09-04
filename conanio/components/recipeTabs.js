import React from 'react';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from "react-icons/hi";
import { BiSolidInfoCircle } from "react-icons/bi";
import { MdOutlineCheckCircleOutline, MdOutlineToday } from "react-icons/md";
import { PiWarningBold } from "react-icons/pi";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { AiOutlinePushpin, AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import { Tooltip } from 'react-tooltip';
import Collapse from 'react-bootstrap/Collapse';

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
      .catch((err) => {
        console.log(err);
      });
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
  const mdMessage = `![Conan Center](https://img.shields.io/conan/v/${recipeName})`;
  const resMessage = `.. image:: https://img.shields.io/conan/v/${recipeName}   :alt: Conan Center`;
  const asciiMessage = `image:https://img.shields.io/conan/v/${recipeName} [Conan Center]`;
  const htmlMessage = `<img alt="Conan Center" src="https://img.shields.io/conan/v/${recipeName}">`;

  return (
    <div>
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
    <p>If you need additional assistance, please ask a
      <Link href={{ pathname: "https://github.com/conan-io/conan-center-index/issues/new", query: { labels: "question", template: "question.yml", title: "[question] SHORT DESCRIPTION" }}}>
        <a> question</a></Link> in the Conan Center Index repository.
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

  return (
    <div>
      <h3>Using {props.recipeName}</h3>
      <blockquote>
        <BiSolidInfoCircle/><strong> Note</strong>
        <br/><br/>
        If you are new with Conan, we recommend to read the section <Link href="https://docs.conan.io/2/tutorial/consuming_packages.html"><a>how to consume packages</a></Link>.
        <CCIAssistanceLink />
      </blockquote>
      Simplest use case consuming this recipe and assuming CMake as your local build tool:
      <br/><br/>
      <h4>conanfile.txt</h4>
      <pre><code className="language-ini">{"[requires]\n" + reference + "\n" + "[generators]\n" + "CMakeDeps\n" + "CMakeToolchain\n" + "[layout]\ncmake_layout"}</code></pre>
      <p>Now, you can run this Conan command to locally install (and build if necessary) this recipe and its dependencies (if any):</p>
      <pre><code className="language-bash">$ conan install conanfile.txt --build=missing</code></pre>
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
              <a> how to use build tools as Conan packages</a>
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
        <a> how to use a library in your project</a>
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
            return <Link key={ require + "deps"} href={{ pathname: "/center/recipes/" + name, query: { version: version } }} passHref><a onClick={() => props.setRecipeVersion(version)}><h5>{require}</h5></a></Link>;
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
            return <Link key={require + "tool_deps"} href={{ pathname: "/center/recipes/" + name, query: { version: version } }} passHref><a onClick={() => props.setRecipeVersion(version)}><h5>{require}</h5></a></Link>;
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


function VersionsTab(props) {
  const VersionItem = function({recipe}) {
    const iconStatusColor = recipe.info.status === 'ok'? 'green': 'orange'
    const extraInfo = recipe.info.status === 'ok'? 'maintained version': recipe.info.status + ' version'
    return (
      <ListGroup.Item style={{border: '0.05rem solid #21AFFF', backgroundColor: '#FFFFFF', borderRadius: '10px', margin:'0px 0px 5px 0px'}}>
        <Tooltip id="extra-info"/>
        <Row style={{alignItems: 'center'}}>
          <Col md="auto">
            <a data-tooltip-id='extra-info' data-tooltip-html={extraInfo} data-tooltip-place="top">
            {(recipe.info.status === "unmaintained") && (<PiWarningBold style={{verticalAlign:'text-top',color: iconStatusColor,height: '21px', width: '21px'}}/>)}
            {(recipe.info.status === "ok") && (<MdOutlineCheckCircleOutline style={{verticalAlign:'text-top',color: iconStatusColor,height: '21px', width: '21px'}}/>)}
            </a>
          </Col>
          <Col className="text-center" md="auto">
            <a data-tooltip-id='extra-info' data-tooltip-html="Reference version" data-tooltip-place="top">
              <FaTags className="mr-2" style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}/>
            </a>
            <a key={recipe.info.version} style={{color: '#007bff',cursor: 'pointer'}} onClick={()=>{props.selector(recipe.info.version);window.scrollTo(0, 0);}}>
              {recipe.info.version}
            </a>
          </Col>
          <Col md="auto">
            <Row style={{padding:'0px 15px'}}>
              <div className="d-inline">
                <a data-tooltip-id='extra-info' data-tooltip-html="Last updated date" data-tooltip-place="top">
                  <MdOutlineToday className="conanIconBlue" style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/>
                </a> {recipe.info.timestamp}
              </div>
            </Row>
            <Row style={{padding:'0px 15px'}}>
              {Object.keys(recipe.info.licenses).length > 0 && (
                <div className="d-inline">
                  <a data-tooltip-id='extra-info' data-tooltip-html="Licenses" data-tooltip-place="top">
                    <LiaBalanceScaleSolid style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/>
                  </a> {Object.keys(recipe.info.licenses).join(", ")}
                </div>)
              }
            </Row>
          </Col>
          <Col className="text-center" md="auto">
            <a data-tooltip-id='extra-info' data-tooltip-html="Latest recipe revision" data-tooltip-place="top">
              <AiOutlinePushpin style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}/>
            </a> {recipe.info.recipe_revision}
          </Col>
        </Row>
      </ListGroup.Item>
    )
  }
  return (
    <div>
      <ListGroup>
        { Object.values(props.data).map(data => (<VersionItem key={data.info.recipe_revision} recipe={data}/>)) }
      </ListGroup>
    </div>
  );
}


export { UseItTab, BadgesTab, DependenciesTab, VersionsTab };
