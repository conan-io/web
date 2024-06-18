import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LuPackageSearch } from "react-icons/lu";


function gtmConanPush(description){
  dataLayer.push({
    'event': 'fireEvent',
    'event_name': 'element_click',
    'type': 'navigation',
    'purpose': 'main menu',
    'description': description,
    'section': 'header'
  });
}


function ConanHead(props) {
  const router = useRouter();
  const defaultTitle = "Conan 2.0: C and C++ Open Source Package Manager";
  const title = props.titlePrefix? props.titlePrefix + " - " + defaultTitle: defaultTitle;
  const canonicalUrl = (`https://conan.io` + (router.asPath === "/" ? "": router.asPath)).split("?")[0];
  return (
    <Head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="title" content="Conan.io - the Open Source C and C++ Package Manager for Developers"/>
      <meta
        name="description"
        content="Conan is an open source, decentralized and multi-platform package manager for C and C++ that allows you to create and share all your native binaries."
      />
      <meta name="google-site-verification" content="v3n-2fbFdumhO916PmSTXMRwVAeXMeBiZ_SK_M6vjgs"/>
      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
      <link rel="alternate" href="https://conan.io" hrefLang="en"/>
      <title>{title}</title>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}


function BetaBanner() {
  return (
    <section id="beta-banner" className="beta-banner">
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-1 mb-1 text-center text-white beta-links">
            Conancenter web BETA version - <Link
              href="https://github.com/conan-io/web/issues"
              onClick={
                () => {
                  dataLayer.push({
                    'event': 'fireEvent',
                    'event_name': 'element_click',
                    'type': 'ui',
                    'purpose': 'feedback',
                    'description': 'conancenter web beta version feedback'
                  });
                }
              } style={{textDecoration: 'underline'}} className="white"><b>your feedback</b>
            </Link> will help us to improve it!
          </div>
        </div>
      </div>
    </section>
  );
}


export function ConanHeader(props) {
  return (
    <header id="masthead" className={props.background}>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <Link href="/" onClick={() => {gtmConanPush('conan logo')}} className="col-6 col-lg-4 d-block">
            <img alt="Conan C++ Package Manager" className="header-logo" style={{maxHeight: "83px"}} src="/conan-logo.png"></img>
          </Link>
          <div className="col-6 col-lg-4 xs text-right d-flex align-items-center justify-content-end">
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link onClick={() => {gtmConanPush('conancenter')}} href="/center"><span className="btn navBtn black">ConanCenter<LuPackageSearch className="ms-1"/></span></Nav.Link>
                      <Nav.Link onClick={() => {gtmConanPush('faq')}} href="/faq"><span className="btn navBtn black">FAQ</span></Nav.Link>
                      <Nav.Link onClick={() => {gtmConanPush('docs')}} href="https://docs.conan.io/"><span className="btn navBtn black">Docs</span></Nav.Link>
                      <Nav.Link onClick={() => {gtmConanPush('blog')}} href="https://blog.conan.io/"><span className="btn navBtn black">Blog</span></Nav.Link>
                      <Nav.Link onClick={() => {gtmConanPush('github')}} href="https://github.com/conan-io/conan" rel="nofollow noopener noreferrer" target="_blank"><span className="btn p-0 me-3"><img style={{maxHeight: "26px"}} src="/small-github.png" alt="Github"></img></span></Nav.Link>
                      <div className="downloads-cta arrow-cta">
                        <div className="button_cont">
                          <Nav.Link onClick={() => {gtmConanPush('downloads')}} href="/downloads"><span className="btn conan-blue-gradient-bg white fw-bold" id="download_btn_header"><span>Downloads</span></span></Nav.Link>
                        </div>
                      </div>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </header>
  );
}


export function ConanCenterHeader(props) {
  return (
    <div>
      <ConanHead titlePrefix={props.titlePrefix}/>
      <ConanHeader background="backgroundWhite"/>
      {/* <BetaBanner/> */}
    </div>
  );
}


export function ConanKitchenHeader(props) {
  return (
    <div>
      <ConanHead titlePrefix={props.titlePrefix}/>
      <div className="header-bg position-absolute"><img src="/kitchen-bg.svg" alt="" width="100%"></img></div>
      <ConanHeader/>
    </div>
  );
}
