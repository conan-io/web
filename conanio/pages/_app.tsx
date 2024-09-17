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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WK44ZFM');
        `}
      </Script>
      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  )
};
