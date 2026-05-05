import { useMemo } from "react";

import type { RecipeInfo, RecipePageTabBase } from "@/types/recipeDetail";
import { licenseNames } from "@/utils/recipeDetailUtils";

import { recipeRevisionPinIconSvg, versionsTagIcon } from "@/components/recipeDetail/recipeDetailIcons";

export default function VersionsTab({
  isActive,
  recipeName,
  recipeVersion,
  packageInfo,
  onSelectVersion,
}: Pick<RecipePageTabBase, "isActive" | "recipeName" | "recipeVersion"> & {
  packageInfo: Record<string, RecipeInfo>;
  onSelectVersion: (version: string) => void;
}) {
  const rows = useMemo(() => {
    const list = Object.values(packageInfo);
    return [...list].sort((a, b) => {
      const ta = Date.parse(a.info.timestamp);
      const tb = Date.parse(b.info.timestamp);
      if (Number.isFinite(ta) && Number.isFinite(tb) && ta !== tb) {
        return tb - ta;
      }
      return b.info.version.localeCompare(a.info.version, undefined, { numeric: true, sensitivity: "base" });
    });
  }, [packageInfo]);

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-versions" data-recipe={recipeName}>
      <div className="ver-list">
        {rows.length === 0 ? (
          <p className="versions-empty">No versions available for this recipe.</p>
        ) : (
          rows.map((r, idx) => {
            const maintained = r.info.status === "ok";
            const rev = r.info.recipe_revision ?? "";
            const licenses = licenseNames(r.info.licenses);
            const licText = licenses.length ? licenses.join(", ") : null;
            const isCurrent = r.info.version === recipeVersion;
            const statusTitle = maintained ? "maintained version" : `${r.info.status} version`;
            const rowKey = rev || `${r.info.version}-${idx}`;
            return (
              <div key={rowKey} className={`ver-row${isCurrent ? " ver-row--current" : ""}`}>
                <span className={`status ${maintained ? "ok" : "warn"}`} title={statusTitle}>
                  {maintained ? "✓" : "!"}
                </span>
                <span className="tag">
                  {versionsTagIcon}
                  <button type="button" className="ver-version-btn" onClick={() => onSelectVersion(r.info.version)}>
                    {r.info.version}
                  </button>
                </span>
                <span className="date">
                  <span>{r.info.timestamp}</span>
                  {licText ? <span className="lic">◈ {licText}</span> : null}
                </span>
                <span className="hash" title="Latest recipe revision">
                  {recipeRevisionPinIconSvg}
                  <span>{rev || "—"}</span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
