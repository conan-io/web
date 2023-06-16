import { useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import MarketoForm from "./useMarketo";

function ConanFooter() {
  const [inputs, setInputs] = useState({
    baseUrl: "https://leap.jfrog.com",
    munchkinId: "256-FNZ-187",
    formId: "1479",
    callback: () => {}
  });

  return (
    <footer className="py-5 bg-bright-gray" id="siteFooter">
      <div className="container white d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <section id="signUp" className="sign-up white text-center">
              <div className="h2 white d-flex justify-content-center" id="signUpTitle">
                <span>Subscribe for release updates</span>
              </div>
              <div className="mktoFormWrapper">
                <div className="d-flex justify-content-center pt-3">
                  <MarketoForm {...inputs} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center px-0 px-md-3" style={{borderTop: '1px solid #404040',textAlign: 'center'}}>
          <div className="col-md-10 px-md-0 pl-3 pt-2">
            <ul className="d-md-flex justify-content-start pt-2 mt-1 list-unstyled footer-links">
              <li><Link href="/downloads"><a id="downloads_btn_footer">Download</a></Link></li>
              <li><Link href="/center"><a id="conancenter_btn_footer">ConanCenter</a></Link></li>
              <li><Link href="https://github.com/conan-io/conan"><a id="github_btn_footer">GitHub</a></Link></li>
              <li><Link href="https://docs.conan.io/"><a id="docs_btn_footer">Docs</a></Link></li>
              <li><Link href="https://blog.conan.io/"><a id="blog_btn_footer">Blog</a></Link></li>
              <li><Link href="/faq"><a id="faq_btn_footer">FAQ</a></Link></li>
              <li><Link href="/privacy-policy"><a id="privacypolicy_btn_footer">Privacy Policy</a></Link></li>
              <li><Link href="/terms-conditions"><a id="terms_btn_footer">Terms</a></Link></li>
              <li><Link href="#"><a className="ot-sdk-show-settings" id="cookies_btn_footer">Cookies Settings</a></Link></li>
            </ul>
          </div>
          <div className="col-md-2 pr-0">
            <ul className="socials d-flex mt-1 mb-0 pt-2 pl-0 justify-content-center list-unstyled">
              <li><a className="mr-2" href="https://twitter.com/conan_io"><img alt="twitter" className="lazy" src="/social/twitter.svg"></img></a></li>
              <li><a className="mr-2" href="https://cpplang.​slack.​com/?id=conan"><img alt="slack" className="lazy" src="/social/slack.svg"></img></a></li>
              <li><a className="mr-2" href="https://github.com/conan-io"><img alt="github" className="lazy" src="/social/github.svg" style={{filter: 'invert(100%)'}}></img></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ConanFooter
