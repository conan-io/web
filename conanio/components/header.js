import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LuPackageSearch } from "react-icons/lu";


function ConanHead() {
  return (
    <Head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="title" content="Conan.io - the Open Source C and C++ Package Manager for Developers"/>
      <meta
        name="description"
        content="Conan is an open source, decentralized and multi-platform package manager for C and C++ that allows you to create and share all your native binaries."
      />
      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      <link rel="alternate" href="https://conan.io" hrefLang="en"/>
      <title>Conan 2.0 - C and C++ Open Source Package Manager</title>
      <link rel="canonical" href="https://conan.io"/>
    </Head>
  )
}


function BetaBanner() {
  return (
    <section id="beta-banner" className="beta-banner">
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-1 mb-1 text-center text-white beta-links">
            Conancenter web BETA version - <Link href="https://github.com/conan-io/web/issues"><a className="white"><b>your feedback</b></a></Link> will help us to improve it!
          </div>
        </div>
      </div>
    </section>
  )
}


export function ConanHeader(props) {
  return (
    <header id="masthead" className={props.background}>
      <Script
        id="cdn-cookielaw-org-consent"
        type="text/javascript"
        src="https://cdn.cookielaw.org/consent/3aff98af-1ffa-49e8-a9f1-6024b60d0d7b/OtAutoBlock.js">
      </Script>
      <Script
        id="cdn-cookielaw-org-scripttemplates"
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charset="UTF-8"
        data-domain-script="3aff98af-1ffa-49e8-a9f1-6024b60d0d7b">
      </Script>
      <Script id="ot-callback" type="text/javascript">
        function OptanonWrapper() { }
      </Script>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <Link href="/"><a className="col-6 col-lg-4 d-block"><img alt="Conan C++ Package Manager" className="header-logo" src="/conan-logo.svg"></img></a></Link>
          <div className="col-6 col-lg-4 xs text-right d-flex align-items-center justify-content-end">
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/center"><a className="btn navBtn black">ConanCenter<LuPackageSearch className="ml-1"/></a></Nav.Link>
                    <Nav.Link href="/faq"><a className="btn navBtn black">FAQ</a></Nav.Link>
                    <Nav.Link href="https://docs.conan.io/"><a className="btn navBtn black">Docs</a></Nav.Link>
                    <Nav.Link href="https://blog.conan.io/"><a className="btn navBtn black">Blog</a></Nav.Link>
                    <Nav.Link href="https://github.com/conan-io/conan"><a className="btn navBtn mr-3" rel="nofollow noopener noreferrer" target="_blank"><img src="/small-github.svg" alt="Github"></img></a></Nav.Link>
                    <div className="downloads-cta arrow-cta">
                      <div className="button_cont">
                        <Nav.Link href="/downloads"><a className="btn conan-blue-gradient-bg white font-weight-bold" id="download_btn_header"><span>Downloads</span></a></Nav.Link>
                      </div>
                    </div>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </header>
  )
}


export function ConanCenterHeader() {
  return (
    <div>
      <ConanHead/>
      <ConanHeader background="backgroundWhite"/>
      <BetaBanner/>
    </div>
  )
}


export function ConanKitchenHeader() {
  return (
    <div>
      <ConanHead/>
      <div className="header-bg position-absolute"><img src="/kitchen-bg.svg" width="100%"></img></div>
      <ConanHeader/>
    </div>
  )
}
