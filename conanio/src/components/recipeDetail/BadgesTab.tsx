import { useMemo, useState } from "react";

import type { BadgeSnippetFormat, RecipePageTabBase } from "@/types/recipeDetail";
import { badgeSnippetStrings } from "@/utils/recipeDetailUtils";

import { clipboardCopyIconSvg } from "./recipeDetailIcons";

export default function BadgesTab({ isActive, recipeName, recipeVersion }: RecipePageTabBase) {
  const [snippetFormat, setSnippetFormat] = useState<BadgeSnippetFormat>("markdown");
  const snippets = useMemo(() => badgeSnippetStrings(recipeName), [recipeName]);
  const activeSnippet = snippets[snippetFormat];

  const onCopySnippet = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(activeSnippet);
    }
  };

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-badges" data-recipe={recipeName}>
      <span className="bk-version">
        <span className="bk-label">conan</span>
        <span className="bk-value">v{recipeVersion}</span>
      </span>
      <div className="md-tabs" role="tablist" aria-label="Badge snippet format">
        <button
          type="button"
          role="tab"
          aria-selected={snippetFormat === "markdown"}
          className={`mtab${snippetFormat === "markdown" ? " active" : ""}`}
          onClick={() => setSnippetFormat("markdown")}
        >
          Markdown
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={snippetFormat === "rst"}
          className={`mtab${snippetFormat === "rst" ? " active" : ""}`}
          onClick={() => setSnippetFormat("rst")}
        >
          reStructuredText
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={snippetFormat === "asciidoc"}
          className={`mtab${snippetFormat === "asciidoc" ? " active" : ""}`}
          onClick={() => setSnippetFormat("asciidoc")}
        >
          AsciiDoc
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={snippetFormat === "html"}
          className={`mtab${snippetFormat === "html" ? " active" : ""}`}
          onClick={() => setSnippetFormat("html")}
        >
          HTML
        </button>
      </div>
      <div className="md-box badge-tab-panel" role="tabpanel">
        <div className="badge-tab-panel__row">
          <div className="badge-tab-panel__snippet">{activeSnippet}</div>
          <button type="button" className="recipe-revision-row__copy" aria-label="Copy badge snippet to clipboard" onClick={onCopySnippet}>
            {clipboardCopyIconSvg}
          </button>
        </div>
      </div>
    </div>
  );
}
