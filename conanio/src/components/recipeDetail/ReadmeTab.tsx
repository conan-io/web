import { useEffect } from "react";
import Markdown from "react-markdown";
import hljs from "highlight.js";

import RecipeInfoAside from "@/components/recipeDetail/RecipeInfoAside";
import type { PackageOsTabFilter, RecipeInfo } from "@/types/recipeDetail";

export default function ReadmeTab({
  isActive,
  readme,
  recipe,
  recipeName,
  onPlatformPick,
  versionFolderMap,
}: {
  isActive: boolean;
  readme: string;
  recipe: RecipeInfo;
  recipeName: string;
  onPlatformPick: (filter: PackageOsTabFilter) => void;
  versionFolderMap: Record<string, string>;
}) {
  useEffect(() => {
    if (!isActive) return;

    const codeBlocks = document.querySelectorAll<HTMLElement>("#panel-readme pre code");
    codeBlocks.forEach((codeEl) => {
      if (codeEl.classList.contains("hljs")) return;
      if (codeEl.children.length > 0) return;
      hljs.highlightElement(codeEl);
    });
  }, [isActive, readme]);

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-readme" data-recipe={recipeName}>
      <div className="useit">
        <RecipeInfoAside recipe={recipe} onPlatformPick={onPlatformPick} versionFolderMap={versionFolderMap} />
        <div className="main-col readme-prose">
          <h2>Readme</h2>
          <Markdown>{readme}</Markdown>
        </div>
      </div>
    </div>
  );
}
