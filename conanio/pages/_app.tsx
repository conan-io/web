import React from "react";
import { useRouter } from 'next/router';
import Script from "next/script";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/style.css';
import '@/styles/stylev2.css';
import '@/styles/font.css';
import '@/styles/index.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "highlight.js/styles/github.css";

import { Loader } from '@/components';
import { AppProps } from "next/app";


export default function MyApp({ Component, pageProps }: AppProps){
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const GTM_ID = process.env.gtmID;
  const GTM_URL = process.env.gtmURL;
  React.useEffect(() => {
    const handleRouteChange = (url) => {setLoading(true)}
    const handleRouteChangeComplete = () => {setLoading(false)}

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])
  return (
    <>
      <Script
        id="transcend-consent-manager"
        strategy="afterInteractive"
        data-cfasync="false"
        data-tracker-overrides="GoogleConsentMode:security_storage=on;ad_storage=SaleOfInfo,Advertising;ad_user_data=SaleOfInfo,Advertising;ad_personalization=SaleOfInfo,Advertising;analytics_storage=Analytics,SaleOfInfo;functionality_storage=Functional,SaleOfInfo;personalization_storage=Functional,SaleOfInfo"
        src="https://transcend-cdn.com/cm/f0071674-c641-4cf3-9d31-303ec0c86b1b/airgap.js"
        data-report-only="on"
        data-prompt="1"
      />

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          '${GTM_URL}?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${GTM_ID}");
          gtag('set', 'developer_id.dODQ2Mj', true);
        `}
      </Script>

      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  )
};
