import React from 'react';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Link from 'next/link';
import { FaCopy } from "react-icons/fa";


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
        <Tabs className="package-tabs" defaultActiveKey="Markdown" id="uncontrolled">
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
  
  
  function UseItTab(props) {
    const reference = props.recipeName + "/" + props.recipeVersion;
    const unixCLI = `$ cd build
$ cmake .. -DCMAKE_TOOLCHAIN_FILE=conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release
$ cmake --build .`;
    const winCLI = `$ cd build
# assuming Visual Studio 15 2017 is your VS version and that it matches your default profile
$ cmake .. -G "Visual Studio 15 2017" -DCMAKE_TOOLCHAIN_FILE=conan_toolchain.cmake
$ cmake --build . --config Release`;

    if (props.info) {
      const exampleName = props.info.project_type == "CXX" ? "main.cpp": "main.c";
      const headers = props.info.headers && props.info.headers.length > 0 ? props.info.headers: "";
      {/* TODO: if tool_require, it should have another instructions
      const isToolRequire = props.info.package_type & props.info.package_type == "application";
      const requiresSection = isToolRequire ? "tool_requires": "requires";
      */}

      // Pieces of code
      const projectLayout = `./
| - CMakeLists.txt
| - ${exampleName}
| - conanfile.txt`;

      const conanfileTxt = `[requires]
${reference}
[generators]
CMakeDeps
CMakeToolchain`;

      const cmakeContent = `cmake_minimum_required(VERSION 3.15)
project(test ${props.info.project_type})

find_package(${props.info.cmake_variables.file_name} CONFIG REQUIRED)

add_executable(example ${exampleName})
target_link_libraries(example ${props.info.cmake_variables.global_target_name})`;

      const exampleContent = `// Using a random header. Please, check any other header available.
#include "${headers[0]}"

int main() {
// Here your source code using the library
return 0;
}`;
      return (
      <div>
        <h3>Using {props.recipeName} with CMake</h3>
        <p>This is a simple CMake project layout using this library:</p>
        <pre><code className="language-plaintext">{projectLayout}</code></pre>
        <h4>conanfile.txt</h4>
        <pre><code className="language-ini">{conanfileTxt}</code></pre>
        <h4>CMakeLists.txt</h4>
        <pre><code className="language-cmake">{cmakeContent}</code></pre>
        <h4>{exampleName}</h4>
        <pre><code className="language-c">{exampleContent}</code></pre>
        <p>Now, let's run the Conan command to build this project:</p>
        <pre><code className="language-bash">$ conan install . --output-folder=build --build=missing</code></pre>
        <p>Please, be aware that this information is generated automatically and it may contain some mistakes. If you have any problem, you can check 
        the upstream recipe to confirm the information. Also, for more detailed information on how to consume Conan packages, 
        please check the <Link href="https://docs.conan.io/2/tutorial/consuming_packages.html"><a>Conan documentation</a></Link>.</p>
        <br/>
        <Tabs className="package-tabs" defaultActiveKey="win" id="uncontrolled">
          <Tab eventKey="win" title="Windows">
            <br/>
            <pre><code className="language-bash">{winCLI}</code></pre>
          </Tab>
          <Tab eventKey="unix" title="Linux/macOS">
            <br/>
            <pre><code className="language-bash">{unixCLI}</code></pre>
          </Tab>
        </Tabs>
      </div>
      );
    }
    return (
      <div>
        <h3>Using {props.recipeName} with CMake <strong>(**)</strong></h3>
        <p><strong>(**)</strong> <em>It was not possible to load all the metadata belonging to this recipe. Maybe, this recipe is not completely migrated for Conan 2.x.</em></p>
        <p>Please, let's try this command if you want to install it locally and generate its CMake files:</p>
        <pre><code className="language-bash">$ conan install --requires {reference} --build missing -g CMakeDeps -g CMakeToolchain --output-folder=build</code></pre>
        <p>Assuming that you already have your own project, you'll have to find out the {reference} targets that 
        you want to use within the <strong><em>build/</em></strong> folder. After that, you could run it:</p>
        <br/>
        <Tabs className="package-tabs" defaultActiveKey="win" id="uncontrolled">
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
        <p>Please visit the <Link href="https://docs.conan.io/2/tutorial/consuming_packages.html"><a>Conan documentation</a></Link> for more information.</p>
      </div>
    );
  }


  function DependenciesTab(props) {
    if (props.info) {
      if (props.info.requires && props.info.requires.length > 0) {
        return (
          <div>
          <h3>Dependencies</h3>
          <br/>
          {props.info.requires.map( function(require) { 
            let ref = require.split("/");
            let name = ref[0];
            let version = ref[1];
            return <Link href={{ pathname: "/center/recipes/" + name, query: { version: version } }}><a><h5>{require}</h5></a></Link>;
            })
          }
        </div>
        )
      }
      return (
        <div>
          <h3>Dependencies</h3>
          <br/>
          <p>This recipe (<strong>{props.recipeName}/{props.recipeVersion}</strong>) has no dependencies</p>
        </div>
      )
    }
    return (
      <div>
        <h3>Dependencies <strong>(**)</strong></h3>
        <p><strong>(**)</strong> <em>It was not possible to load all the metadata belonging to this recipe. Maybe, this recipe is not completely migrated for Conan 2.x.</em></p>
      </div>
    )
  }
  

  export { UseItTab, BadgesTab, DependenciesTab };
