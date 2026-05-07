import Link from "next/link";
import { trackConanEvent } from "@/service/analytics";
import type { SearchRecipeItem } from "@/types/searchRecipe";
import { collectUiPlatformsFromBinaries, PLATFORM_OPTIONS } from "@/utils/centerRecipesConfig";
import { recipePath, recipePathWithVersion } from "@/utils/recipeUrls";

function platformStrip(recipe: SearchRecipeItem): { kind: "header-only" } | { kind: "grid"; supported: Set<string> } {
  const bins = Object.values(recipe.info.packages);
  if (bins.length === 0) {
    return { kind: "header-only" };
  }
  const supported = collectUiPlatformsFromBinaries(bins);
  if (supported.size === 0) {
    return { kind: "header-only" };
  }
  return { kind: "grid", supported };
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
      <line x1={16} y1={2} x2={16} y2={6} />
      <line x1={8} y1={2} x2={8} y2={6} />
      <line x1={3} y1={10} x2={21} y2={10} />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 4.5v6c0 5-3.5 9.5-9 11-5.5-1.5-9-6-9-11v-6L12 2z" />
    </svg>
  );
}

export default function RecipeSearchCard({ recipe }: { recipe: SearchRecipeItem }) {
  const { info } = recipe;
  const licenseNames = Object.keys(info.licenses);
  const licenseLine = licenseNames.join(", ");
  const topicKeys = Object.keys(info.labels);
  const platforms = platformStrip(recipe);
  const deprecated = info.deprecated;
  const isDeprecatedWithReason =
    typeof deprecated === "string" && (deprecated === "true" || deprecated.includes(" "));
  const hasDeprecatedSubstitute =
    typeof deprecated === "string" &&
    deprecated !== "true" &&
    deprecated !== "false" &&
    !deprecated.includes(" ");
  const deprecatedSubstituteHref = hasDeprecatedSubstitute
    ? recipePath(deprecated)
    : null;
  const reference = recipe.name;
  const href = recipePathWithVersion(reference, info.version ?? "");

  return (
    <div className="card">
      <div className="main">
        <h3 className="name">
          <Link
            href={href}
            className="name-link"
            onClick={() =>
              trackConanEvent({
                type: "ui",
                purpose: "recipes search results",
                description: `${reference}/${info.version ?? ""}`,
              })
            }
          >
            {reference}/{info.version}
          </Link>
        </h3>
        <p className="desc">{info.description}</p>
        <div className="chips">
          {topicKeys.map((label) => (
            <span className="chip" key={label}>
              #{label}
            </span>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="meta">
          <span className="row">
            <IconCalendar /> {info.timestamp}
          </span>
          {licenseLine.length > 0 && (
            <span className="row">
              <IconShield /> {licenseLine}
            </span>
          )}
          {isDeprecatedWithReason && <span className="deprecated-badge">Deprecated</span>}
          {hasDeprecatedSubstitute && deprecatedSubstituteHref && (
            <Link href={deprecatedSubstituteHref} className="deprecated-badge">
              Deprecated, substitute available: {deprecated}
            </Link>
          )}
        </div>
        <div className="plats">
          {platforms.kind === "header-only" ? (
            <span className="plat hdr">Header Only</span>
          ) : (
            PLATFORM_OPTIONS.map((label) => (
              <span key={label} className={platforms.supported.has(label) ? "plat" : "plat muted"}>
                {label}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
