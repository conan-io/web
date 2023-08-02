import React from 'react';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { FaCopy } from "react-icons/fa";
import { BiSolidInfoCircle } from "react-icons/bi";
import { MdOutlineCheckCircleOutline, MdOutlineToday } from "react-icons/md";
import { PiWarningBold } from "react-icons/pi";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { AiOutlinePushpin } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import ListGroup from 'react-bootstrap/ListGroup';
import { Tooltip } from 'react-tooltip';


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
        <span>{isCopied ? 'Copied!' : <FaCopy/>}</span>
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
  const Components = function({components}) {
    if (Object.keys(components).length > 1) {
      return (<div>
         <p><strong>Important!</strong> This <em>example</em> target is linking against the global <em>{props.recipeName}</em> one, perhaps, what you really want is to
           link against any of their components instead:</p>
         <pre className='preFixed'>
           <code className="language-cmake">{Object.keys(components).map(function(component) {
           return "# Component " + component + "\ntarget_link_libraries(example " + components[component] + ")\n";
         })}</code></pre>
       </div>)
    }
    return null;
  };
  const Headers = function({headers}) {
    if (headers.length > 0) {
      return (
      <div>
        <p>You could use any of these headers in your example:</p>
        <pre className='preFixed'>
          <code className="language-c">{headers.map(function(h) {
          return `#include "${h}"\n`;})}</code>
        </pre>
      </div>);
    }
    return null;
  };
  const exampleName = props.info.project_type == "CXX" ? "main.cpp": "main.c";
  const headers = props.info.headers;
  const componentTargets = props.info.cmake_variables.component_alias;
  // Pieces of code
  const unixCLI = "$ cd build\n" +
                  "$ cmake .. -DCMAKE_TOOLCHAIN_FILE=conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release\n" +
                  "$ cmake --build .";
  const winCLI = "$ cd build\n" +
                 "# assuming Visual Studio 15 2017 is your VS version and that it matches your default profile\n" +
                 "$ cmake .. -G \"Visual Studio 15 2017\" -DCMAKE_TOOLCHAIN_FILE=conan_toolchain.cmake\n" +
                 "$ cmake --build . --config Release";

  const projectLayout = "./\n" +
                          "| - CMakeLists.txt\n" +
                          "| - " + exampleName + "\n" +
                          "| - conanfile.txt\n";

  const conanfileTxt = "[requires]\n" +
                       reference + "\n" +
                       "[generators]\n" +
                       "CMakeDeps\n" +
                       "CMakeToolchain";

  const cmakeContent = "cmake_minimum_required(VERSION 3.15)\n" +
                       "project(test " + props.info.project_type + ")\n\n" +
                       "find_package(" + props.info.cmake_variables.file_name + " REQUIRED)\n\n" +
                       "add_executable(example " + exampleName + ")\n" +
                       "# Using the global target name\n" +
                       "target_link_libraries(example " + props.info.cmake_variables.global_target_name + ")";

  return (
    <div>
      <h3>Using {props.recipeName} with CMake</h3>
      <p>This is a simple CMake project layout using this library:</p>
      <pre><code className="language-plaintext">{projectLayout}</code></pre>
      <h4>conanfile.txt</h4>
      <pre><code className="language-ini">{conanfileTxt}</code></pre>
      <h4>CMakeLists.txt</h4>
      <pre><code className="language-cmake">{cmakeContent}</code></pre>
      <Components components={componentTargets} />
      <h4>{exampleName}</h4>
      <Headers headers={headers} />
      <p>Now, let&apos;s run the Conan command to build this project:</p>
      <pre><code className="language-bash">$ conan install . --output-folder=build --build=missing</code></pre>
      <br/>
      <Tabs className="package-tabs" defaultActiveKey="win" id="use-it-uncontrolled">
        <Tab eventKey="win" title="Windows">
          <br/>
          <pre><code className="language-bash">{winCLI}</code></pre>
        </Tab>
        <Tab eventKey="unix" title="Linux/macOS">
          <br/>
          <pre><code className="language-bash">{unixCLI}</code></pre>
        </Tab>
      </Tabs>
      <br/>
      <blockquote>
        <BiSolidInfoCircle/><strong> Note</strong>
        <br/><br/>
        <p>Please, be aware that this information is generated automatically and it may contain some mistakes. If you have any problem, you can check
        the upstream recipe to confirm the information. Also, for more detailed information on how to consume Conan packages,
        please check the <Link href="https://docs.conan.io/2/tutorial/consuming_packages.html"><a>Conan documentation</a></Link>.</p>
      </blockquote>
      <CCIAssistanceLink />
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
            <a key={recipe.info.version} style={{color: '#007bff',cursor: 'pointer'}} onClick={()=>{props.selector(recipe.info.version);window.scrollTo(0, 0);}}>
              <FaTags className="mr-2" style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}/>{recipe.info.version}
            </a>
          </Col>
          <Col md="auto">
            <Row style={{padding:'0px 15px'}}>
              <div className="d-inline">
                <MdOutlineToday className="conanIconBlue" style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/> {recipe.info.timestamp}
              </div>
            </Row>
            <Row style={{padding:'0px 15px'}}>
              {recipe.info.licenses.length > 0 && (
                <div className="d-inline">
                  <LiaBalanceScaleSolid style={{verticalAlign:'text-top',color: '#21AFFF',height: '21px', width: '21px'}}/> {recipe.info.licenses.join(", ")}
                </div>)
              }
            </Row>
          </Col>
          <Col className="text-center" md="auto">
            <
              AiOutlinePushpin style={{verticalAlign:'text-top',color: '#21AFFF', height: '21px', width: '21px'}}
            /> {recipe.info.recipe_revision}
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
