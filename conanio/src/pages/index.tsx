import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import {
  QUOTE_SVG,
  RIBBON_LICENSE,
  TESTIMONIALS,
  USER_BRAND_LOGOS,
} from "@/data/homePageContent";
import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import { getConanPypiMonthlyDownloadsCached } from "@/service/pypiStats";
import { getJson, getUrls } from "@/service/api";
import { trackConanEvent } from "@/service/analytics";
import type { RecipeReference } from "@/types/conanCenter";

interface HomePageProps {
  recipesNum: number;
  referenceNum: number;
  pipMonthlyDownloads: number | null;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const urls = getUrls();
  const [refResponse, pipMonthlyDownloads] = await Promise.all([
    getJson<RecipeReference>(urls.reference.num, urls.api.private),
    getConanPypiMonthlyDownloadsCached(),
  ]);
  const data = refResponse.data;
  return {
    props: {
      recipesNum: data?.recipes ?? 0,
      referenceNum: data?.references ?? 0,
      pipMonthlyDownloads,
    },
  };
};

export default function HomePage({
  recipesNum,
  referenceNum,
  pipMonthlyDownloads,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const tCount = TESTIMONIALS.length;
  const goPrev = useCallback(() => {
    setTestimonialIndex((i) => (i - 1 + tCount) % tCount);
  }, [tCount]);
  const goNext = useCallback(() => {
    setTestimonialIndex((i) => (i + 1) % tCount);
  }, [tCount]);

  const ribbonItems = [
    RIBBON_LICENSE,
    ...(pipMonthlyDownloads != null
      ? [
          `${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(pipMonthlyDownloads)} monthly PyPI downloads`,
        ]
      : []),
    `◆ ${recipesNum.toLocaleString("en-US")} recipes`,
    `◇ ${referenceNum.toLocaleString("en-US")} references`,
  ];
  const ribbonLoop = [...ribbonItems, ...ribbonItems, ...ribbonItems, ...ribbonItems];

  return (
    <>
      <PageHead title="Conan — Homepage" />

      <main id="page" data-mascot={1} data-screen-label="Conan Homepage">
        <MainNav />
        <section className="hero">
          <div className="left">
            <h1 style={{marginTop: 22}}>The package manager <span className="blue">C and C++</span> developers deserve.</h1>
            <p>Create, share and reuse native binaries across your teams. One tool that speaks MSVC, CMake, Meson, Ninja — and plays nicely with the compiler flags you already have.</p>
            <div className="cta">
              <a
                className="btn btn-primary"
                href="https://docs.conan.io/2/tutorial.html"
                target="_blank"
                rel="noopener"
                onClick={() => trackConanEvent({ type: "ui", purpose: "hero cta", description: "get started" })}
              >
                Get started →
              </a>
              <a
                className="btn btn-ghost"
                href="https://academy.jfrog.com/conan-2-essentials?utm_source=Conan+Web"
                target="_blank"
                rel="noopener"
                onClick={() => trackConanEvent({ type: "ui", purpose: "hero cta", description: "watch video" })}
              >
                Watch video
              </a>
              <Link className="btn btn-ghost" href="/why-conan" onClick={() => trackConanEvent({ type: "ui", purpose: "hero cta", description: "why use conan" })}>
                Why use Conan?
              </Link>
            </div>
            {/* <div className="hero-meta">
              {HOMEPAGE_KPIS.map((kpi) => (
                <div key={kpi.label}>
                  <b>{kpi.value}</b>
                  <span>{kpi.label}</span>
                </div>
              ))}
            </div> */}
          </div>
          <div className="visual">
            <div className="mascot-solo">
              <Image
                src="/conan-frog.png"
                alt="Conan the barbarian frog mascot"
                width={520}
                height={520}
                sizes="(max-width: 640px) 260px, (max-width: 1024px) min(380px, 100vw), 520px"
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </section>
        <div className="ribbon">
          <div className="track">
            {ribbonLoop.map((item, idx) => (
              <span key={`${item}-${idx}`}>{item}</span>
            ))}
          </div>
        </div>
        <section className="section">
          <span className="pill">Why Conan</span>
          <h2>Three reasons teams pick Conan.</h2>
          <p className="lead">A decentralized, developer-friendly workflow for shipping C and C++ — without wrestling your build system into submission.</p>
          <div className="why-grid">
            <div className="why-card"><div className="ico">01</div><h3>Universal and portable.</h3><p>It works in all operating systems including Windows, Linux, OSX, FreeBSD, and others, and it can target any platform, including desktop, server, and cross-building for mobile (Android and iOS), as well as embedded and bare metal devices. It integrates with other tools like Docker, MinGW, WSL, and with all build systems such as CMake, MSBuild, Makefiles, Meson, SCons. It can even integrate with any proprietary build systems.</p></div>
            <div className="why-card"><div className="ico">02</div><h3>Open source, complexity-free.</h3><p>It has native integration with JFrog Artifactory, including the free Artifactory Community Edition for Conan, enabling developers to host their own private packages on their own server. Conan is developed by a full team of full-time maintainers who support many thousands of users, from small to big enterprises, alongside an active and awesome community.</p></div>
            <div className="why-card"><div className="ico">03</div><h3>Any number of binaries.</h3><p>Not only different binaries but also different build configurations, including different architectures, compilers, compiler versions, runtimes, C++ standard library, etc. When binaries are not available for one configuration, they can be built from sources on-demand. Conan can create, upload and download binaries with the same commands and flows on every platform, saving lots of time in development and continuous integration.</p></div>
          </div>
        </section>
        <section className="related-dark packages-dark">
          <div className="wrap">
            <div className="related-head">
              <div>
                <span className="pill">Where packages live</span>
                <h2 style={{marginTop: 10, marginBottom: 8}}>Artifactory CE &amp; ConanCenter.</h2>
                <p className="lead">One home for your private packages, one for the shared open ecosystem.</p>
              </div>
            </div>
            <div className="products">
              <div className="prod ce">
                <div className="badge">◆ Artifactory CE</div>
                <h3>Host private packages, your server.</h3>
                <p>Artifactory CE for C/C++ is the recommended free server for development and hosting private packages. WebUI, advanced auth and permissions, great performance, generic CLI, generic repos — for any kind of source or binary artifact.</p>
                <div>
                  <Link
                    className="btn btn-primary"
                    href="/downloads"
                    onClick={() => trackConanEvent({ type: "ui", purpose: "products", description: "download artifactory ce" })}
                  >
                    Download Artifactory CE
                  </Link>
                </div>
              </div>
              <div className="prod cc">
                <div className="badge">◇ ConanCenter</div>
                <h3>Discover and share.</h3>
                <p>The central place to search every available open-source Conan package created by the community. Includes recipes, configuration info, and makes it easy to package debugging into the UI — thousands of popular libraries ready to go.</p>
                <div>
                  <Link
                    className="btn btn-ghost"
                    href="/center"
                    onClick={() => trackConanEvent({ type: "ui", purpose: "products", description: "explore conan libraries and tools" })}
                  >
                    Explore Conan libraries and tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="tribe">
            <div>
              <span className="pill">Community</span>
              <h2>Meet the Conan 2.0 tribe.</h2>
              <p className="lead">A group of more than 70 expert users and contributors who helped define Conan 2.0.</p>
              <Link className="btn btn-primary" href="/tribe" onClick={() => trackConanEvent({ type: "ui", purpose: "community", description: "learn more tribe" })}>
                Learn more
              </Link>
            </div>
            <div className="tribe-illo">
              <Image src="/tribe-frogs.png" alt="The Conan barbarian tribe" width={620} height={340} />
            </div>
          </div>
        </section>
        <section className="stories-section">
          <div className="stories-head">
            <div>
              <span className="pill">Customer success stories</span>
              <h2>Teams shipping C/C++ at scale with Conan.</h2>
              <p className="lead">Real stories from engineering teams who replaced custom scripts and fragile submodules with Conan.</p>
            </div>
            <div className="meta">Case studies · PDF</div>
          </div>
          <div className="stories-grid">
            <Link className="story" href="/user-stories/tomtom" onClick={() => trackConanEvent({ type: "ui", purpose: "customer stories", description: "tomtom case study" })}>
              <div className="body">
                <span className="company">TomTom Navigation</span>
                <h3>TomTom fast tracks their delivery cycle with Conan.</h3>
                <p>A Principal Software Engineer at TomTom shares how the navigation team consolidated hundreds of internal packages and cut end-to-end build times across platforms.</p>
                <div className="foot">
                  <div className="tags"><span>Navigation</span><span>CI/CD</span></div>
                  <span className="dl">Download PDF
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1={12} y1={15} x2={12} y2={3} /></svg>
                  </span>
                </div>
              </div>
              <div className="cover">
                <div className="pdf">
                  <div className="pdf-head">
                    <span className="jfrog">JFrog</span>
                    <span className="logo-mark">TomTom</span>
                  </div>
                  <div className="pdf-label">Customer success story</div>
                  <div className="pdf-title">TomTom Navigation</div>
                  <div className="pdf-lines"><span /><span /><span /><span /><span /></div>
                  <div className="pdf-img" style={{background: 'linear-gradient(135deg,#0E4FB8,#1A73E8)'}} />
                </div>
              </div>
            </Link>
            <Link className="story" href="/user-stories/rti" onClick={() => trackConanEvent({ type: "ui", purpose: "customer stories", description: "rti case study" })}>
              <div className="body">
                <span className="company">Real-Time Innovations</span>
                <h3>Speeding multi-platform releases for Industrial IoT with Conan and Artifactory.</h3>
                <p>RTI's team describes how they accelerated release cycles for DDS connectivity software across dozens of target platforms and toolchains.</p>
                <div className="foot">
                  <div className="tags"><span>Industrial IoT</span><span>DDS</span></div>
                  <span className="dl">Download PDF
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1={12} y1={15} x2={12} y2={3} /></svg>
                  </span>
                </div>
              </div>
              <div className="cover">
                <div className="pdf">
                  <div className="pdf-head">
                    <span className="jfrog">JFrog</span>
                    <span className="logo-mark">rti</span>
                  </div>
                  <div className="pdf-label">Customer success story</div>
                  <div className="pdf-title">Speeding Multi-Platform Releases</div>
                  <div className="pdf-lines"><span /><span /><span /><span /><span /></div>
                  <div className="pdf-img" style={{background: 'linear-gradient(135deg,#0E4FB8,#1A73E8)'}} />
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section className="users-section">
          <div className="users-head">
            <div>
              <span className="pill">Our users</span>
              <h2>Teams building with Conan.</h2>
              <p className="lead">From robotics and automotive to navigation and connected devices — Conan is trusted by engineering teams across every industry.</p>
            </div>
            <div className="meta">Community · Enterprise</div>
          </div>
          <div className="logo-grid">
            {USER_BRAND_LOGOS.map((brand) => (
              <div key={brand.src} className="logo-card">
                <Image src={brand.src} alt={brand.alt} width={180} height={64} />
              </div>
            ))}
          </div>
          <div className="testimonial" id="testimonial-carousel">
            <div className="t-track" id="t-track">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.company} className={i === testimonialIndex ? "t-slide active" : "t-slide"} aria-hidden={i !== testimonialIndex}>
                  <div className="mark">{t.company}</div>
                  <blockquote>{t.quote}</blockquote>
                  <div className="quote-divider">{QUOTE_SVG}</div>
                  <div className="who">
                    <span className="name">{t.name}</span>
                    <span className="role">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="t-nav prev" aria-label="Previous testimonial" onClick={goPrev}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button type="button" className="t-nav next" aria-label="Next testimonial" onClick={goNext}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <div className="dots" id="t-dots" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((t, i) => (
                <span
                  key={t.company}
                  className={i === testimonialIndex ? "on" : undefined}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show testimonial: ${t.company}`}
                  aria-current={i === testimonialIndex ? "true" : undefined}
                  onClick={() => setTestimonialIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setTestimonialIndex(i);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="related-dark" id="ecosystem-section">
          <div className="wrap">
            <div className="related-head">
              <div>
                <span className="pill">In the Conan ecosystem</span>
                <h2 style={{marginTop: 10, marginBottom: 8}}>Sister projects, built on Conan.</h2>
                <p className="lead">A growing family of open-source tools that extend Conan into adjacent problems — security, Python packaging, and more.</p>
              </div>
              <div className="meta">github.com/conan-io</div>
            </div>
            <div className="related-grid" id="related-grid">
              <a className="proj" href="https://github.com/jfrog/tome" target="_blank" rel="noopener">
                <div className="top">
                  <span className="slug"><span className="sq" />tome</span>
                  <span className="gh">
                    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" /></svg>
                    jfrog/tome
                  </span>
                </div>
                <h3>Tome</h3>
                <p>Build, package and share extensions for the JFrog Platform — a CLI and toolkit for authoring custom commands and integrations.</p>
                <div className="foot">
                  <div className="tags"><span>CLI</span><span>extensions</span></div>
                  <span className="link">Learn more
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </a>
              <a className="proj green" href="https://github.com/conan-io/conan-py-build" target="_blank" rel="noopener">
                <div className="top">
                  <span className="slug"><span className="sq" />conan-py-build</span>
                  <span className="gh">
                    <svg width={12} height={12} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" /></svg>
                    conan-io/conan-py-build
                  </span>
                </div>
                <h3>Conan Py Build</h3>
                <p>A minimal PEP 517 build backend that uses Conan to compile Python C/C++ extensions. Drop it into your <span style={{fontFamily: 'var(--mono)', fontSize: 'var(--fs-12-5)', color: 'var(--ink-2)'}}>pyproject.toml</span> and ship wheels.</p>
                <div className="foot">
                  <div className="tags"><span>PEP 517</span><span>python</span></div>
                  <span className="link">View on GitHub
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </a>
              <a className="proj addmore">
                <div className="plus">+</div>
                <h3 style={{color: 'var(--ink-2)', fontSize: 'var(--fs-16)'}}>More coming soon</h3>
                <p>We ship adjacent tools regularly. Follow <b style={{color: 'var(--ink-2)'}}>@conan_io</b> or watch the org on GitHub.</p>
              </a>
            </div>
          </div>
        </section> */}
        <MainFooter />
      </main>
    </>
  );
}
