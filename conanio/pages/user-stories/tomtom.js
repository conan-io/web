import React from 'react';

import { ConanKitchenHeader } from '../../components/header';
import ConanFooter from '../../components/footer';
import SingleUserStory from '../../components/user-story';
import Link from 'next/link'

function UserStoriesTomtomPage() {
  return (
    <React.StrictMode>

      <div className="flex-wrapper">
        <ConanKitchenHeader/>
        <SingleUserStory
          companyNameSlug="TomTom"
          metaTitle="Customer Success Story: TomTom"
          metaDescription="TomTom fast tracks their delivery cycle with Conan"
          pageTitle="Reducing Multi-Architecture Build Times for Navigation Devices with Conan and Artifactory"
          imgSrc="/user-stories/tomtom-s.png"
          downloadFileURL="https://media.jfrog.com/wp-content/uploads/2022/04/21101854/TomTom-and-Conan-Use-Case.pdf"
          downloadFileImgSrc="https://media.jfrog.com/wp-content/uploads/2022/04/20102313/tomtom-page1.png"
          fullPageURL="https://conan.io/user-stories/tomtom.html"
          contentHTML={
            <div>
              <p>
                Maikel van den Hurk is a Principal Software Engineer at TomTom, responsible for the developer experience of
                the company&apos;s navigation software stack. Representing the largest product unit in the organization of over
                4,500 employees, Maikel must design systems that enable developers to easily build their software in a
                predominantly C++ environment.
              </p>
              <p>
                TomTom&apos;s applications are wide-ranging; the same software stack targets many different platforms, from embedded
                software to web applications. &quot;It makes it quite a challenging exercise in the domain we&apos;re operating
                in,&quot; says Maikel.
              </p>
              <p>
                In making location technology for automated driving, navigation software for top car brands, and more,
                Maikel is excited by how, &quot;We try to make it possible for everybody to navigate and find a way within
                the world.&quot;
              </p>
              <br/>
              <h2>CHALLENGES</h2>
              <p>
                Developers at TomTom Navigation support their wide range of products from a monolithic C++ software stack
                that must be explicitly configured and built to run on each target platform. Each developer has to compile
                from this stack – often daily – in order to introduce new features or fix bugs reported by customers, some
                of which apply only to specific target hardware.
              </p>
              <p>
                TomTom developers had created their own proprietary solution based on Ivy to manage these variations, but found
                it was unable to fulfill their growing need to manage and trace build context.
              </p>
              <p>
                The lack of these abilities forced TomTom&apos;s developers to perform a full rebuild through CMake for every change,
                no matter how small. &quot;The compilation times were too lengthy, to actually make it so that the developers could in
                the fastest possible time frame deliver any value to our products.&quot; Maikel recalled. This requirement also slowed
                Jenkins CI builds, making it impossible to sustain a continuous delivery cycle.
              </p>
              <br/>
              <h2>RESULTS</h2>
              <p>
                The TomTom team has the opportunity to learn more about Conan&apos;s internal workings which empowers them to
                contribute extensions to the rest of C++ community. Once the TomTom Navigation team adopted Conan for C++,
                they could use the package manager&apos;s settings system to better target their builds for their many target
                platform environments. Using package IDs and other Conan settings features made it possible to create and
                manage binaries that developers and delivery managers could both share.
              </p>
              <p>
                &quot;The flexibility with all the settings and options, that explored a whole new world for us,&quot; Maikel said.
                &quot;That&apos;s the key thing which really brought us over the line.&quot;
              </p>
              <p>
                Conan enabled Maikel&apos;s navigation product unit to modernize from a mono repo to multi repo approach,
                working with &quot;nicely isolated packages which can be iterated upon quite fast.&quot; Developers can now quickly
                rebuild their own components while fetching dependencies as compiled binaries through Artifactory.
              </p>
              <p>
                With this shift to a binaries-centric approach powered by Artifactory, Maikel quickly saw how CI builds
                through Jenkin, accelerated. &quot;Lead times are actually going down as well in that regard,&quot; he noted. &quot;That is,
                I think, one of the key things that we have achieved by adopting Conan.&quot;
              </p>
              <div className='w-100 d-flex flex-column justify-content-center  pl-5 pt-4 pb-3'>
                <p className="font-italic">&quot;We started to see that we could speed up our development chain by producing
                  binary artifacts that could be shared across developers - we could actually shorten the build times
                  because they don&apos;t have to be built over again.&quot;
                </p>
                <p>
                  - Maikel van den Hurk, TomTom Principal Software Engineer
                </p>
              </div>
              <p>
                Conan is a free open source tool, <a href='https://conan.io/'>get started using Conan today</a>. If C++ is one
                of the many languages you leverage at your organization, Artifactory can help you manage all the packages in
                a single solution. <Link href='https://jfrog.com/start-free/'><a rel="noreferrer noopener" target='_blank'> Get started with Artifactory </a></Link> for free today.
              </p>
              <span className="font-weight-bold">
                About TomTom
              </span>
              <p>
                At TomTom we&apos;re mapmakers, providing geolocation technology for drivers, carmakers, enterprises and developers.
              </p>
              <p>
                Our highly accurate maps, navigation software, real-time traffic information and APIs enable smart mobility on a
                global scale, making the roads safer, the drive easier and the air cleaner.
              </p>
              <p>
                Headquartered in Amsterdam with offices worldwide, TomTom&apos;s technologies are trusted by hundreds of millions of drivers,
                businesses and governments worldwide.
              </p>
              <span className="font-weight-bold">
                INDUSTRY
              </span>
              <p>
                Location Technology<br/>Consumer Electronics
              </p>
              <span className="font-weight-bold">
                PROBLEM
              </span>
              <ul>
                <li>Monolithic software stack</li>
                <li>Need to support multiple platforms</li>
                <li>Limited ability to manage platform variations</li>
                <li>Excessive build times</li>
                <li>Unable to trace build context</li>
                <li>Poor developer productivity</li>
                <li>Unable to sustain a continuous delivery cycle</li>
              </ul>
                <span className="font-weight-bold">
                  RESULTS
                </span>
              <ul>
                <li>Modernized for multiple repositories</li>
                <li>Manage many platform variations through properties</li>
                <li>Able to share binaries across teams</li>
                <li>Shortened build times</li>
                <li>Improved developer productivity</li>
                <li>Accelerated release times for continuous delivery</li>
              </ul>
              <span className="font-weight-bold">
                SOLUTIONS
              </span>
              <p>
                Conan<br/>Artifactory
              </p>
            </div>
          }
        />
        <ConanFooter/>
      </div>

    </React.StrictMode>
  );
}

export default UserStoriesTomtomPage
