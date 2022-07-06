//import React from 'react';
// import Image from 'next/image'

function ConanFooter() {
  return (
    <footer className="py-5 bg-bright-gray" id="siteFooter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="socials d-flex mt-1 mb-0 pt-2 pl-0 justify-content-center list-unstyled">
              <div><a className="mr-2" href="https://twitter.com/conan_io"><img alt="twitter" className="lazy" src="/social/twitter.svg"></img></a></div>
              <div><a className="mr-2" href="https://facebook.com/conan.io"><img alt="facebook" className="lazy" src="/social/facebook.svg"></img></a></div>
              <div><a className="mr-2" href="https://cpplang.​slack.​com/?id=conan"><img alt="slack" className="lazy" src="/social/slack.svg"></img></a></div>
              <div><a className="mr-2" href="https://github.com/conan-io"><img alt="github" className="lazy" src="/social/github.svg"></img></a></div>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 footer-left d-md-flex d-none align-items-center">
            <div className="footer-menu w-100">
              <div className="row">
                <div className="col-sm-3">
                  <h4 className="blue mb-1">GET</h4>
                    <div><a href="/downloads.html" id="download_btn_bottom">Download </a></div>
                    <div><a href="https://conan.io/center/">Conan-Center </a></div>
                    <div><a href="https://github.com/conan-io/conan" rel="nofollow">GitHub </a></div>
                </div>
                <div className="col-sm-3">
                  <h4 className="blue mb-1">Resources</h4>
                    <div><a href="https://docs.conan.io/" rel="noopener">Docs </a></div>
                    <div><a href="https://blog.conan.io/" rel="noopener">Blog </a></div>
                </div>
                <div className="col-sm-3">
                  <h4 className="blue mb-1">Legal</h4>
                    <div><a href="/privacy-policy.html">Privacy Policy </a></div>
                    <div><a href="/terms-conditions.html">Terms </a></div>
                    <div><a href="#" className="ot-sdk-show-settings"></a></div>
                </div>
                <div className="col-sm-3">
                  <h4 className="blue mb-1">Social</h4>
                    <div><a href="https://github.com/conan-io" rel="noopener noreferrer" target="_blank">Github </a></div>
                    <div><a href="https://twitter.com/conan_io" rel="noopener noreferrer" target="_blank">Twitter </a></div>
                    <div><a href="https://facebook.com/conan.io" rel="noopener noreferrer" target="_blank">Facebook </a></div>
                    <div><a href="https://cpplang.​slack.​com/?id=conan" rel="noopener noreferrer" target="_blank">Slack #conan </a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ConanFooter
