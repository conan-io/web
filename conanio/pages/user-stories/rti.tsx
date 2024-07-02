import React from 'react';
import { ConanKitchenHeader, ConanFooter, SingleUserStory } from '@/components';

function UserStoriesRTIPage() {
  return (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <SingleUserStory
          companyName="rti"
          metaTitle="[Use Case] How Conan Enables C/C++ DevOps for RTI IoT | JFrog"
          metaDescription="Learn how the Conan C/C++ package manager and Artifactory helped Real-Time Innovations (RTI) speed multi-platform releases for Industrial IoT from days to minutes."
          pageTitle="Speeding Multi-Platform Releases for Industrial IoT with Conan and Artifactory"
          imgSrc="/user-stories/rti-s.png"
          downloadFileURL="https://media.jfrog.com/wp-content/uploads/2021/06/15183931/USE-CASE-RTI.pdf"
          downloadFileImgSrc="https://media.jfrog.com/wp-content/uploads/2021/09/02140348/conan-rti-pdf-cover.png"
          contentHTML={
            <div>
              <h2>Company</h2>
              <p>
                Real-Time Innovations (RTI) is the largest software framework company for autonomous systems.
                RTI Connext® is the world&apos;s leading architecture for developing intelligent distributed systems.
                Uniquely, Connext shares data directly, connecting AI algorithms to real-time networks of devices
                to build autonomous systems.
              </p>
              <p>
                RTI is the best in the world at ensuring our customers’ success in deploying production systems.
                With over 1,500 designs, RTI software runs over 250 autonomous vehicle programs, controls the largest
                power plants in North America, coordinates combat management on U.S. Navy ships, drives a new generation
                of medical robotics, enables flying cars, and provides 24/7 intelligence for hospital and emergency
                medicine. RTI runs a smarter world.
              </p>
              <p>
                RTI is the leading vendor of products compliant with the Object Management Group® (OMG®) Data Distribution
                Service™ (DDS) standard. RTI is privately held and headquartered in Sunnyvale, California with regional
                offices in Colorado, Spain, and Singapore.
              </p>
              <h2 className="pt-4">Challenges</h2>
              <p>
                Javier Povedano Molina leads a team of engineers at RTI which is responsible for the build and automation
                tools for the RTI Connext framework. RTI Connext consists of more than 30 different products and libraries
                and is written in C, C++, C#, and Java. The build tooling is primarily written in Python.
              </p>
              <p>
                RTI Connext is used in a wide variety of smart machines and supports over 70 different architectures and embedded systems.
                The RTI development team, therefore, needs to create a different binary for each of the many architectures, with
                every release of RTI Connext. Although all are produced from the same baseline code, each binary must be
                independently tested and validated. The code’s large number of dependencies further complicate the build process..
              </p>
              <p>
                The RTI Engineering Team sought to modernize their build system to improve time-to-market performance and
                help ensure the quality of all binaries in the release. The team did not want to limit themselves to a
                narrow set of tools and sought a solution that would empower them to connect to what they choose now as
                well as in the future.
              </p>
              <div className="mt-4">
                <img src="https://media.jfrog.com/wp-content/uploads/2021/06/22141856/rti-diagram.png" alt="RTI Diagram" className="img-fluid"></img>
              </div>
            </div>
          }
        />
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default UserStoriesRTIPage
