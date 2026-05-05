import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";
import RecipeQuerySearchForm from "@/components/RecipeQuerySearchForm";
import styles from "@/styles/centerPages.module.css";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getJson, getJsonList, getUrls } from "@/service/api";
import type { RecipeBasic, RecipeReference } from "@/types/conanCenter";

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
  const renderRecipeList = (items: RecipeBasic[], showVersion: boolean) =>
    items.map((item, index) => {
      const href = item.version
        ? `/center/recipes/${encodeURIComponent(item.name)}?version=${encodeURIComponent(item.version)}`
        : `/center/recipes/${encodeURIComponent(item.name)}`;

      return (
        <li className="cc-item" key={`${item.name}-${item.version ?? index}`}>
          <Link href={href} className="cc-item-link">
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
            className="eyebrow"
            href="https://blog.conan.io/2024/09/30/Conan-Center-will-stop-receiving-updates-for-Conan-1.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conan 2: Conan Center now serves packages from center2.conan.io — read the announcement"
          >
            <span className="tag">Conan 2</span>
            <span>
              Now serving packages from <code className="cc-eyebrow-code">center2.conan.io</code>
            </span>
          </a>
          <h1>The Conan <span className="blue">libraries and tools</span><br />central repository.</h1>
          {/* Search */}
          <RecipeQuerySearchForm mode="get" formClassName="cc-search" />
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
              {renderRecipeList(data.popular, false)}
            </ul>
          </div>
          <div className="cc-col updated">
            <h2>Just updated</h2>
            <span className="colsub">Newest revisions</span>
            <ul id="list-updated">
              {renderRecipeList(data.updated, true)}
            </ul>
          </div>
          <div className="cc-col newver">
            <h2>New version</h2>
            <span className="colsub">Fresh upstream releases</span>
            <ul id="list-new">
              {renderRecipeList(data.new, true)}
            </ul>
          </div>
        </section>
        {/* DARK FOOTER */}
        <MainFooter />
      </main>
    </>
  );
}
