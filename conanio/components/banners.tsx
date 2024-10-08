import Link from "next/link";
import React from "react";


export function Conan1xBanner() {
  return (
    <section id="global-banner" className="global-banner">
      <div className="container">
        <div className="row d-flex justify-content-around align-items-center">
          <div className="col-auto mt-1 mb-1 text-center text-white">
            Conan Center will stop receiving updates for Conan 1.x packages soon.
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
                    } className="white"> <b>Read this blog post</b>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
