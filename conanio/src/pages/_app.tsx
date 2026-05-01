import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";

import "../styles/globals.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? process.env.gtmID ?? "";
  const gtmUrl =
    process.env.NEXT_PUBLIC_GTM_URL ?? process.env.gtmURL ?? "";
  const hasGtmConfig = Boolean(gtmId && gtmUrl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as typeof window & { dataLayer?: unknown[] }).dataLayer =
        (window as typeof window & { dataLayer?: unknown[] }).dataLayer ?? [];
    }

    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Script
        data-cfasync="false"
        data-tracker-overrides="GoogleConsentMode:security_storage=on;ad_storage=SaleOfInfo,Advertising;ad_user_data=SaleOfInfo,Advertising;ad_personalization=SaleOfInfo,Advertising;analytics_storage=Analytics,SaleOfInfo;functionality_storage=Functional,SaleOfInfo;personalization_storage=Functional,SaleOfInfo"
        src="https://transcend-cdn.com/cm/f0071674-c641-4cf3-9d31-303ec0c86b1b/airgap.js"
        data-languages="en"
      />
      {hasGtmConfig && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              '${gtmUrl}?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <Script id="gtag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "${gtmId}");
              gtag('set', 'developer_id.dODQ2Mj', true);
            `}
          </Script>
        </>
      )}
      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}
