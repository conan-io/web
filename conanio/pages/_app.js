import React from "react";
import { useRouter } from 'next/router';
import Script from "next/script";

import '../styles/bootstrap.min.css';
import '../styles/style.css';
import '../styles/stylev2.css';
import '../styles/font.css';
import '../styles/index.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "highlight.js/styles/github.css";

import Loader from '../components/loader';


const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      {/*https://www.mohammadfaisal.dev/blog/add-google-analytics-to-nextjs*/}
      <Script
        id="google-analytics-manager"
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=GTM-WK44ZFM"
      />
      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-WK44ZFM', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  )
}
export default MyApp
