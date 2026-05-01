import { Fragment } from "react";

import type { PackageOsTabFilter, RecipeInfo } from "@/types/recipeDetail";
import {
  licenseNames,
  profileSlotsFromPackages,
  sanitizeURL,
  truncateText,
  urlify,
  VALID_CHOOSELICENSE_SLUGS,
} from "@/utils/recipeDetailUtils";

import { recipeRevisionPinIconSvg } from "./recipeDetailIcons";

function RecipeRevisionRow({ revisionFull }: { revisionFull: string }) {
  const full = revisionFull;
  const truncated = full.length > 20 ? `${full.slice(0, 20)}…` : full;

  const onCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(full);
    }
  };

  return (
    <li className="recipe-revision-row">
      <span className="recipe-revision-row__pin" aria-hidden>
        {recipeRevisionPinIconSvg}
      </span>
      <span className="recipe-revision-row__hash" title={full}>
        {truncated}
      </span>
      <button
        type="button"
        className="recipe-revision-row__copy"
        aria-label="Copy recipe revision to clipboard"
        onClick={onCopy}
        disabled={!full}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x={9} y={9} width={11} height={11} rx={2} />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      </button>
    </li>
  );
}

/** Lateral “Recipe info” block — same data order as `conanio/pages/center/recipes/[recipeName].tsx` (`RecipeAside`). */
export default function RecipeInfoAside({
  recipe,
  onPlatformPick,
}: {
  recipe: RecipeInfo;
  onPlatformPick: (filter: PackageOsTabFilter) => void;
}) {
  const requiresLine = `${recipe.name}/${recipe.info.version}`;
  const rev = recipe.info.recipe_revision ?? "";
  const recipeDescription = recipe.info.description?.trim() ?? "";
  const licenses = licenseNames(recipe.info.licenses);
  const homepageRaw = recipe.info.homepage?.trim() ?? "";
  const recipeConanCenterUrl = `https://github.com/conan-io/conan-center-index/tree/master/recipes/${recipe.name}`;

  const packageRows = recipe.info.packages ? Object.values(recipe.info.packages) : [];
  const showRecipeInfoHeading = Boolean(recipeDescription) || licenses.length > 0;

  const iconRecipeInfoHeading = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="recipe-info-heading-svg">
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16v-5" />
      <circle cx={12} cy={8} r={1.35} fill="currentColor" stroke="none" />
    </svg>
  );
  const iconScale = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5 1 7 2 2-1 5-2 7-2h2" />
    </svg>
  );
  const iconGithub = (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" />
    </svg>
  );
  const iconHome = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
  const iconCalendar = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x={3} y={4} width={18} height={18} rx={2} />
      <line x1={16} y1={2} x2={16} y2={6} />
      <line x1={8} y1={2} x2={8} y2={6} />
      <line x1={3} y1={10} x2={21} y2={10} />
    </svg>
  );

  return (
    <aside className="side">
      {showRecipeInfoHeading ? (
        <h3 className="recipe-info-heading">
          {iconRecipeInfoHeading}
          Recipe info
        </h3>
      ) : null}
      <ul>
        {licenses.length > 0 ? (
          <li title="Licenses">
            {iconScale}{" "}
            <span>
              {licenses.map((license, index) => (
                <Fragment key={license}>
                  {index > 0 ? ", " : null}
                  {VALID_CHOOSELICENSE_SLUGS.has(license.toLowerCase()) ? (
                    <a
                      href={`https://choosealicense.com/licenses/${license.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {license}
                    </a>
                  ) : (
                    license
                  )}
                </Fragment>
              ))}
            </span>
          </li>
        ) : null}

        {recipeDescription ? (
          <li title="GitHub repository">
            {iconGithub}{" "}
            <a href={recipeConanCenterUrl} target="_blank" rel="noopener noreferrer">
              View recipe on GitHub
            </a>
          </li>
        ) : null}

        {homepageRaw ? (
          <li title="Home page">
            {iconHome}{" "}
            <a href={urlify(homepageRaw)} target="_blank" rel="noopener noreferrer">
              {truncateText(sanitizeURL(homepageRaw), 22)}
            </a>
          </li>
        ) : null}

        {recipeDescription ? (
          <li title="Last updated date">
            {iconCalendar} {recipe.info.timestamp}
          </li>
        ) : null}

        {recipeDescription ? <RecipeRevisionRow revisionFull={rev} /> : null}
      </ul>

      {recipeDescription ? <hr className="recipe-info-divider" /> : null}

      {packageRows.length > 0 ? <h3>Available packages</h3> : null}
      {packageRows.length > 0 ? (
        <div className="plat-list" style={{ marginBottom: 22 }}>
          {profileSlotsFromPackages(packageRows).map((slot) => (
            <button
              key={slot.key}
              type="button"
              className={`plat-btn ${slot.available ? "plat-btn--on" : "plat-btn--off"}`}
              onClick={() => onPlatformPick(slot.tabFilter)}
            >
              {slot.label}
            </button>
          ))}
        </div>
      ) : null}

      {packageRows.length > 0 ? <hr className="recipe-info-divider" /> : null}

      {recipeDescription ? (
        <>
          <h3>Install</h3>
          <p>Add the following line to your conanfile.txt:</p>
          <div className="install">
            <code>{`[requires]\n${requiresLine}`}</code>
          </div>
        </>
      ) : null}
    </aside>
  );
}
