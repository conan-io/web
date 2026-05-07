import Head from "next/head";
import { useRouter } from "next/router";

import { getSiteOrigin } from "@/service/llms";

const DEFAULT_TITLE_SUFFIX = "Conan 2.0: C and C++ Open Source Package Manager";

const META_TITLE = "Conan.io - the Open Source C and C++ Package Manager for Developers";
const META_DESCRIPTION =
  "Conan is an open source, decentralized and multi-platform package manager for C and C++ that allows you to create and share all your native binaries.";
const GOOGLE_SITE_VERIFICATION = "v3n-2fbFdumhO916PmSTXMRwVAeXMeBiZ_SK_M6vjgs";

type PageHeadProps = {
  /**
   * Prepended to `DEFAULT_TITLE_SUFFIX` with " - ".
   * Omit for pages that should use only the default document title.
   */
  title?: string;
};

export default function PageHead({ title }: PageHeadProps) {
  const router = useRouter();
  const origin = getSiteOrigin();
  const pathOnly = router.asPath.split("?")[0] ?? "/";
  const canonicalUrl = `${origin}${pathOnly === "/" ? "" : pathOnly}`;
  const titlePrefix = title?.trim() ?? "";
  const documentTitle = titlePrefix !== "" ? `${titlePrefix} - ${DEFAULT_TITLE_SUFFIX}` : DEFAULT_TITLE_SUFFIX;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="title" content={META_TITLE} />
      <meta name="description" content={META_DESCRIPTION} />
      <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      <link rel="alternate" href={origin} hrefLang="en" />
      <title>{documentTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
