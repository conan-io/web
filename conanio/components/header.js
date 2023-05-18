import Head from 'next/head'
import Link from 'next/link'

export function ConanHeader() {
  return (
    <header id="masthead">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <Link href="/"><a className="col-10 col-lg-4 d-block"><img alt="Conan C++ Package Manager" className="header-logo" src="/conan-logo.svg"></img></a></Link>
          <div className="col-2 d-flex d-lg-none align-items-center justify-content-end">
            <button className="d-block d-lg-none hamburger hamburger--collapse text-right" type="button">
            <span className="hamburger-box"><span className="hamburger-inner"></span></span>
            </button>
          </div>
          <div className="col-lg-4 text-right d-flex align-items-center justify-content-end">
            <nav className="header-nav align-items-center d-lg-flex" id="headerNav">
              <Link href="/search"><a className="btn conan-blue-border"> <img src="/small-search.svg" alt="Search" className="conan-center-icon mr-2 black"></img>Search</a></Link>
              <Link href="/center"><a className="btn black">ConanCenter</a></Link>
              <Link href="/faq"><a className="btn black">FAQ</a></Link>
              <Link href="https://docs.conan.io/"><a className="btn black">Docs</a></Link>
              <Link href="https://blog.conan.io/"><a className="btn black">Blog</a></Link>
              <Link href="https://github.com/conan-io/conan"><a className="btn mr-3" rel="nofollow noopener noreferrer" target="_blank"><img src="/small-github.svg" alt="Github"></img></a></Link>
              <div className="downloads-cta arrow-cta">
                <div className="button_cont">
                  <Link href="/downloads"><a className="btn conan-blue-gradient-bg white font-weight-bold" id="download_btn_header"><span>Downloads</span></a></Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}


export function ConanKitchenHeader() {
  return (
    <div>
      <div className="header-bg position-absolute"><img src="/kitchen-bg.svg" width="100%"></img></div>
      <ConanHeader/>
    </div>
  )
}
