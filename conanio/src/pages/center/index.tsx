import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import RecipeQuerySearchForm from "@/components/RecipeQuerySearchForm";
import styles from "@/styles/centerPages.module.css";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getJson, getJsonList, getUrls } from "@/service/api";
import type { RecipeBasic, RecipeReference } from "@/types/conanCenter";

function pushCenterEvent(event: {
  type: string;
  purpose: string;
  description: string;
  event_name?: string;
  search_term?: string;
}) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer;
  if (!Array.isArray(dataLayer)) return;
  dataLayer.push({
    event: "fireEvent",
    event_name: event.event_name ?? "element_click",
    type: event.type,
    purpose: event.purpose,
    description: event.description,
    ...(event.search_term ? { search_term: event.search_term } : {}),
  });
}

interface PageProps {
  data: {
    popular: RecipeBasic[];
    updated: RecipeBasic[];
    new: RecipeBasic[];
    referenceNum: number;
    recipesNum: number;
  };
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const urls = getUrls();
  const [referenceNumResponse, popularResponse, updatedResponse, newResponse] = await Promise.all([
    getJson<RecipeReference>(urls.reference.num, urls.api.private),
    getJsonList<RecipeBasic>(urls.popular, urls.api.private),
    getJsonList<RecipeBasic>(urls.updated, urls.api.private),
    getJsonList<RecipeBasic>(urls.new, urls.api.private),
  ]);

  const ref = referenceNumResponse.data;

  return {
    props: {
      data: {
        popular: popularResponse.data,
        updated: updatedResponse.data,
        new: newResponse.data,
        referenceNum: ref?.references ?? 0,
        recipesNum: ref?.recipes ?? 0,
      },
    },
  };
};

export default function CenterPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const trackCenterSearch = (term: string) => {
    pushCenterEvent({
      event_name: "search",
      type: "ui",
      purpose: "conancenter search",
      description: "search recipes",
      search_term: term,
    });
  };

  const renderRecipeList = (items: RecipeBasic[], showVersion: boolean, listName: string) =>
    items.map((item, index) => {
      const href = item.version
        ? `/center/recipes/${encodeURIComponent(item.name)}?version=${encodeURIComponent(item.version)}`
        : `/center/recipes/${encodeURIComponent(item.name)}`;
      const description = showVersion && item.version ? `${item.name}/${item.version}` : item.name;

      return (
        <li className="cc-item" key={`${item.name}-${item.version ?? index}`}>
          <Link
            href={href}
            className="cc-item-link"
            onClick={() =>
              pushCenterEvent({
                type: "ui",
                purpose: listName.toLowerCase(),
                description,
              })
            }
          >
            <span className="name">
              <span className="dot" />
              {item.name}
            </span>
            {showVersion && item.version && <span className="ver">{item.version}</span>}
          </Link>
        </li>
      );
    });

  return (
    <>
      <PageHead title="ConanCenter — Conan libraries and tools central repository" />

      <main id="page" className={styles.centerHome} data-screen-label="ConanCenter — Minimal / Carlos style">
        {/* NAV */}
        <MainNav />
        {/* HERO */}
        <section className="cc-hero">
          <a
            className="center-announcement"
            href="https://blog.conan.io/2024/09/30/Conan-Center-will-stop-receiving-updates-for-Conan-1.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conan 2: Conan Center now serves packages from center2.conan.io — read the announcement"
          >
            <span className="tag">Conan 2</span>
            <span>
              Now serving packages from <code className="center-announcement-code">center2.conan.io</code>
            </span>
            <span aria-hidden="true" className="center-announcement-arrow">→</span>
          </a>
          <h1>The Conan <span className="blue">libraries and tools</span><br />central repository.</h1>
          {/* Search */}
          <RecipeQuerySearchForm
            mode="get"
            formClassName="cc-search"
            onTrackSearchSubmit={trackCenterSearch}
          />
          {/* Counts */}
          <div className="cc-counts">
            <a>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1={12} y1="22.08" x2={12} y2={12} /></svg>
              <span><b>{data.recipesNum.toLocaleString("en-US")}</b> recipes</span>
            </a>
            <span className="sep">/</span>
            <a>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              <span><b>{data.referenceNum.toLocaleString("en-US")}</b> references</span>
            </a>
          </div>
        </section>
        {/* THREE-COLUMN LISTS */}
        <section className="cc-lists">
          <div className="cc-col recipes">
            <h2>Popular recipes</h2>
            <span className="colsub">Most-downloaded</span>
            <ul id="list-popular">
              {renderRecipeList(data.popular, false, "popular recipes")}
            </ul>
          </div>
          <div className="cc-col updated">
            <h2>Just updated</h2>
            <span className="colsub">Newest revisions</span>
            <ul id="list-updated">
              {renderRecipeList(data.updated, true, "just updated")}
            </ul>
          </div>
          <div className="cc-col newver">
            <h2>New version</h2>
            <span className="colsub">Fresh upstream releases</span>
            <ul id="list-new">
              {renderRecipeList(data.new, true, "new version")}
            </ul>
          </div>
        </section>
        {/* DARK FOOTER */}
        <MainFooter />
      </main>
    </>
  );
}
