import { useMemo, type CSSProperties } from "react";

import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import type { PackagesTabProps } from "@/types/recipeDetail";
import {
  filterPackagesByPlatform,
  packageCompilerSettingRows,
  packageOptionsValueLines,
  primaryProfileTagValues,
  sortPackagesForDisplay,
} from "@/utils/recipeDetailUtils";

import { clipboardCopyIconSvg } from "@/components/recipeDetail/recipeDetailIcons";
import RecipeInfoAside from "@/components/recipeDetail/RecipeInfoAside";

const PKG_ROW_STACK: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontFamily: "var(--mono)",
  fontSize: "12.5px",
  color: "var(--ink-2)",
};

function PackageCardMeta({
  packageId,
  recipeRevision,
  compilerRows,
}: {
  packageId?: string;
  recipeRevision?: string;
  compilerRows: { name: string; value: string }[];
}) {
  if (!packageId && !recipeRevision && compilerRows.length === 0) return null;

  return (
    <div className="pkg-card-meta">
      {packageId || recipeRevision ? (
        <div className="pkg-card-meta__tight-stack">
          {packageId ? (
            <div className="pkg-card-meta__row">
              <span className="pkg-card-meta__label">package ID</span>
              <code className="pkg-card-meta__value">{packageId}</code>
            </div>
          ) : null}
          {recipeRevision ? (
            <div className="pkg-card-meta__row">
              <span className="pkg-card-meta__label">Recipe revision</span>
              <span className="pkg-card-meta__rev">
                <code className="pkg-card-meta__value" title={recipeRevision}>
                  {recipeRevision}
                </code>
                <CopyToClipboardButton
                  copyText={recipeRevision}
                  className="recipe-revision-row__copy"
                  aria-label="Copy recipe revision to clipboard"
                >
                  {clipboardCopyIconSvg}
                </CopyToClipboardButton>
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
      {(packageId || recipeRevision) && compilerRows.length > 0 ? <hr className="pkg-card-rule" /> : null}
      {compilerRows.length > 0 ? (
        <div className="pkg-card-meta__tight-stack">
          {compilerRows.map((row) => (
            <div key={row.name} className="pkg-card-meta__row">
              <span className="pkg-card-meta__label">{row.name}</span>
              <code className="pkg-card-meta__value">{row.value}</code>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function PackagesTab({
  isActive,
  recipeName,
  recipeVersion,
  recipe,
  onPlatformPick,
  packageOsFilter,
  onClearPackageOsFilter,
}: PackagesTabProps) {
  const ref = `${recipeName}/${recipeVersion}`;
  const packageRows = useMemo(() => {
    const raw = recipe.info.packages;
    if (!raw || typeof raw !== "object") return [];
    return sortPackagesForDisplay(Object.values(raw));
  }, [recipe.info.packages]);

  const filteredRows = useMemo(
    () => filterPackagesByPlatform(packageRows, packageOsFilter),
    [packageRows, packageOsFilter],
  );

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-packages" data-recipe={recipeName}>
      <div className="useit">
        <RecipeInfoAside recipe={recipe} onPlatformPick={onPlatformPick} />
        <div className="main-col">
          <h2>
            Packages
            {packageOsFilter ? ` (${packageOsFilter})` : null}
          </h2>
          {packageOsFilter ? (
            <button type="button" className="packages-clear-filter" onClick={onClearPackageOsFilter}>
              (Show all packages)
            </button>
          ) : null}
          {packageRows.length === 0 ? (
            <p style={{ color: "var(--ink-2)", fontSize: "13.5px", lineHeight: "1.6" }}>
              This recipe version (<strong style={{ fontFamily: "var(--mono)" }}>{ref}</strong>) has no packages.
            </p>
          ) : (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredRows.map((pkg, index) => {
                const recipeRevision = recipe.info.recipe_revision;
                const compilerRows = packageCompilerSettingRows(pkg);
                const hasMeta = Boolean(pkg.package_id || recipeRevision || compilerRows.length > 0);
                const profileTags = primaryProfileTagValues(pkg);
                return (
                  <div key={pkg.package_id ? `${pkg.package_id}-${index}` : `pkg-${index}`} className="pkg-card">
                    <div style={PKG_ROW_STACK}>
                      {profileTags.length > 0 ? (
                        <div className="pkg-card-tags">
                          {profileTags.map((v, ti) => (
                            <span key={`${pkg.package_id ?? "pkg"}-${v}-${ti}`} className="chip">
                              {v}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: "12.5px", color: "var(--ink-3)" }}>(header-only)</span>
                      )}
                      <hr className="pkg-card-rule" />
                      {hasMeta ? (
                        <>
                          <PackageCardMeta
                            packageId={pkg.package_id}
                            recipeRevision={recipeRevision}
                            compilerRows={compilerRows}
                          />
                          <hr className="pkg-card-rule" />
                        </>
                      ) : null}
                      <div className="pkg-card-meta__row">
                        <span className="pkg-card-meta__label">options</span>
                        <code
                          className="pkg-card-meta__value"
                          style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                        >
                          {packageOptionsValueLines(pkg).join("\n")}
                        </code>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
