import { useMemo } from "react";

import type { DependenciesTabProps } from "@/types/recipeDetail";

import DependencyRefLink from "./DependencyRefLink";
import RecipeInfoAside from "./RecipeInfoAside";

export default function DependenciesTab({
  isActive,
  recipeName,
  recipeVersion,
  recipe,
  onPlatformPick,
  useItLoading,
}: DependenciesTabProps) {
  const ref = `${recipeName}/${recipeVersion}`;
  const content = useMemo(() => {
    if (useItLoading) {
      return <p className="deps-empty">Loading dependencies…</p>;
    }
    if (!recipe.use_it) {
      return <p className="deps-empty">This information is not available at this moment.</p>;
    }

    const requires = recipe.use_it.requires ?? [];
    const buildRequires = recipe.use_it.build_requires ?? [];
    const hasRequires = requires.length > 0;
    const hasBuildRequires = buildRequires.length > 0;

    if (!hasRequires && !hasBuildRequires) {
      return (
        <p className="deps-empty">
          This recipe version (<strong>{ref}</strong>) has no dependencies.
        </p>
      );
    }

    return (
      <>
        {hasRequires ? (
          <div className="deps-block">
            <h3 className="deps-sub">Dependencies</h3>
            <ul className="deps-list">
              {requires.map((r) => (
                <li key={`dep-req-${r}`}>
                  <DependencyRefLink reference={r} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {hasBuildRequires ? (
          <div className="deps-block">
            <h3 className="deps-sub">Dependencies (tool requirements)</h3>
            <ul className="deps-list">
              {buildRequires.map((r) => (
                <li key={`dep-br-${r}`}>
                  <DependencyRefLink reference={r} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }, [recipe.use_it, ref, useItLoading]);

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-deps" data-recipe={recipeName}>
      <div className="useit">
        <RecipeInfoAside recipe={recipe} onPlatformPick={onPlatformPick} />
        <div className="main-col">
          <h2>Dependencies</h2>
          {content}
        </div>
      </div>
    </div>
  );
}
