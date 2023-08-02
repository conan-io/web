import React from "react";
import { useRouter } from 'next/router'

import '../styles/bootstrap.min.css';
import '../styles/style.css';
import '../styles/stylev2.css';
import '../styles/font.css';
import '../styles/index.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "highlight.js/styles/github.css";

import Loader from '../components/loader'


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

  return <>{loading ? <Loader /> : <Component {...pageProps} />}</>
}
export default MyApp
