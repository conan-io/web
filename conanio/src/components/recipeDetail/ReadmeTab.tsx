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
}: {
  isActive: boolean;
  readme: string;
  recipe: RecipeInfo;
  recipeName: string;
  onPlatformPick: (filter: PackageOsTabFilter) => void;
}) {
  useEffect(() => {
    if (!isActive) return;
    hljs.highlightAll();
  }, [isActive, readme]);

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-readme" data-recipe={recipeName}>
      <div className="useit">
        <RecipeInfoAside recipe={recipe} onPlatformPick={onPlatformPick} />
        <div className="main-col readme-prose">
          <h2>Readme</h2>
          <Markdown>{readme}</Markdown>
        </div>
      </div>
    </div>
  );
}
