import Head from 'next/head'
import Link from 'next/link'

function ConanHeader() {
  return (
    <header id="masthead">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <Link  href="/">
            <a className="col-10 col-lg-4 d-block">
              <img alt="Conan C++ Package Manager" className="header-logo" src="/logo-conan.svg" layout="fill"></img>
            </a>
          </Link>
          <div className="col-2 d-flex d-lg-none align-items-center justify-content-end"> <button
              className="d-block d-lg-none hamburger hamburger--collapse text-right" type="button"><span
                className="hamburger-box"><span className="hamburger-inner"></span></span></button></div>
          <div className="col-lg-7 text-right d-flex align-items-center justify-content-end">
            <nav className="header-nav align-items-center d-lg-flex" id="headerNav">
              <Link href="/search">
                <a className="btn bg-blue white">
                  <img src="/small-search.svg" layout="fill" alt="Search"></img>
                  Search
                </a>
              </Link>
              <Link href="/center">
                <a className="btn bg-bright-gray black">
                  Conan-Center
                </a>
              </Link>
              <Link href="/faq">
                <a className="btn bg-bright-gray black">
                    FAQ
                </a>
              </Link>
              <Link href="https://docs.conan.io/">
                <a className="btn bg-bright-gray black">
                    Docs
                </a>
              </Link>
              <Link href="https://blog.conan.io/">
                <a className="btn bg-bright-gray black">
                    Blog
                </a>
              </Link>
              <Link href="/user-stories">
                <a className="btn bg-bright-gray black d-none">
                    User Stories
                </a>
              </Link>
              <Link href="https://github.com/conan-io/conan">
                <a className="btn bg-bright-gray" rel="nofollow noopener noreferrer" target="_blank">
                    <img src="/small-github.svg" layout="fill" alt="Github"></img>
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ConanHeader
