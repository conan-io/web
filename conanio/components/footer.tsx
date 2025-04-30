import { useState } from "react";
import Link from 'next/link';
import { MarketoForm, MarketoProps } from "@/components";
import Script from "next/script";


function gtmConanPush(description: string){
  window.dataLayer.push({
    'event': 'fireEvent',
    'event_name': 'element_click',
    'type': 'navigation',
    'purpose': 'footer menu',
    'description': description,
    'section': 'footer'
  });
}


function gtmConanPushSocial(description: string){
  window.dataLayer.push({
    'event': 'fireEvent',
    'event_name': 'element_click',
    'type': 'social',
    'purpose': 'social',
    'description': description,
    'section': 'footer'
  });
}


export const ConanFooter = () => {
  const [inputs, _setInputs] = useState<MarketoProps>({
    baseUrl: "https://leap.jfrog.com",
    munchkinId: "256-FNZ-187",
    formId: "1479",
    callback: (form: any) => {
      form.onSubmit(
        (_values: any, _followUpUrl: any) => {
          window.dataLayer.push({
            'event': 'fireEvent',
            'event_name': 'form_start',
            'type': 'subscribe',
            'purpose': 'social',
            'description': 'subscribe for release update'
          });
        }
      )
    }
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
          <div className="col-md-10 px-md-0 ps-3 pt-2">
            <ul className="d-md-flex justify-content-start pt-2 mt-1 list-unstyled footer-links">
              <li>
                <Link href="/downloads">
                  <div onClick={() => {gtmConanPush('downloads')}}id="downloads_btn_footer">Downloads</div>
                </Link>
              </li>
              <li>
                <Link href="/center">
                  <div onClick={() => {gtmConanPush('conancenter')}}id="conancenter_btn_footer">ConanCenter</div>
                </Link>
              </li>
              <li>
                <Link href="https://github.com/conan-io/conan">
                  <div onClick={() => {gtmConanPush('github')}}id="github_btn_footer">GitHub</div>
                </Link>
              </li>
              <li>
                <Link href="https://docs.conan.io/">
                  <div onClick={() => {gtmConanPush('docs')}}id="docs_btn_footer">Docs</div>
                </Link>
              </li>
              <li>
                <Link href="https://blog.conan.io/">
                  <div onClick={() => {gtmConanPush('blog')}} id="blog_btn_footer">Blog</div>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <div onClick={() => {gtmConanPush('faq')}} id="faq_btn_footer">FAQ</div>
                </Link>
              </li>
              <li>
                <Link href="https://jfrog.com/privacy-notice/">
                  <div onClick={() => {gtmConanPush('privacy notice')}} id="privacynotice_btn_footer">Privacy Notice</div>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <div onClick={() => {gtmConanPush('terms')}} id="terms_btn_footer">Terms</div>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div onClick={() => {
                    gtmConanPush('cookies');
                    if (typeof window !== 'undefined' && window.airgap) {
                        transcend.showConsentManager({ viewState: 'CompleteOptions' });
                    }
                  }} className="ot-sdk-show-settings" id="cookies_btn_footer">Cookies Settings</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2 pe-0">
            <ul className="socials d-flex mt-1 mb-0 pt-2 ps-0 justify-content-center list-unstyled">
              <li>
                <a onClick={() => {gtmConanPushSocial('x')}} className="me-2" href="https://x.com/conan_io">
                  <img alt="x" className="lazy" src="/social/x.svg"></img>
                </a>
              </li>
              <li>
                <a onClick={() => {gtmConanPushSocial('slack')}} className="me-2" href="https://cpplang.slack.com/?id=conan">
                  <img alt="slack" className="lazy" src="/social/slack.svg"></img>
                </a>
              </li>
              <li>
                <a onClick={() => {gtmConanPushSocial('github')}} className="me-2" href="https://github.com/conan-io">
                  <img alt="github" className="lazy" src="/social/github.svg" style={{filter: 'invert(100%)'}}></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
