import Link from "next/link";
import React from "react";


export function Conan1xBanner() {
  return (
    <section id="global-banner" className="global-banner">
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-1 mb-1 text-center text-white">
          Conan Center has stopped receiving updates for Conan 1.x packages. A new https://center2.conan.io Conan 2-only remote is now available.
              <Link href="https://blog.conan.io/2024/09/30/Conan-Center-will-stop-receiving-updates-for-Conan-1.html" onClick={
                      () => {
                        window.dataLayer.push({
                          'event': 'fireEvent',
                          'event_name': 'element_click',
                          'type': 'ui',
                          'purpose': 'feedback',
                          'description': 'conancenter stop 1.x packages'
                        });
                      }
                    } className="white"> <b>Read the blog post</b>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ConanAuditBanner() {
  return (
    <section id="audit-banner" className="audit-banner">
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-4 mb-4 text-center text-white">
          Scan for vulnerabilities in your packages with the new conan audit command.
              <Link href="https://blog.conan.io/introducing-conan-audit-command/" onClick={
                      () => {
                        window.dataLayer.push({
                          'event': 'fireEvent',
                          'event_name': 'element_click',
                          'type': 'ui',
                          'purpose': 'feedback',
                          'description': 'Introducing the conan audit Command for Scanning'
                        });
                      }
                    } className="white"> <b>Learn more</b>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


export function LasoBanner() {
  return (
    <section id="laso-banner" className="laso-banner">
      <div className="container">
        <img className="laso-banner-img" alt="Laso portrait" src="/laso/laso.png"/>
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-4 mb-4 text-center text-white">
            <p className="mb-2">In memory of Luis Martinez de Bartolomé, "Laso":</p>
            <Link href="/laso" onClick={
                    () => {
                      window.dataLayer.push({
                        'event': 'fireEvent',
                        'event_name': 'element_click',
                        'type': 'ui',
                        'purpose': 'feedback',
                        'description': 'The LASO Scholarship'
                      });
                    }
                  } className="white">
                  <div
                  className="btn laso-btn-border bg-white ms-lg-4"
                  id="why_use_conan"
                >
                  <span><b></b>The LASO Scholarship</span>
                </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

