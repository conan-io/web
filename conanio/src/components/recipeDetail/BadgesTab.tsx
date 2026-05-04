import { useMemo, useState } from "react";

import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import type { BadgeSnippetFormat, RecipePageTabBase } from "@/types/recipeDetail";
import { badgeSnippetStrings } from "@/utils/recipeDetailUtils";

import { clipboardCopyIconSvg } from "@/components/recipeDetail/recipeDetailIcons";

export default function BadgesTab({ isActive, recipeName, recipeVersion }: RecipePageTabBase) {
  const [snippetFormat, setSnippetFormat] = useState<BadgeSnippetFormat>("markdown");
  const snippets = useMemo(() => badgeSnippetStrings(recipeName), [recipeName]);
  const activeSnippet = snippets[snippetFormat];

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
          <CopyToClipboardButton
            copyText={activeSnippet}
            className="recipe-revision-row__copy"
            aria-label="Copy badge snippet to clipboard"
          >
            {clipboardCopyIconSvg}
          </CopyToClipboardButton>
        </div>
      </div>
    </div>
  );
}
