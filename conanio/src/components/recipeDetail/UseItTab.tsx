import { useMemo, useState, type ReactNode } from "react";

import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import RecipeInfoAside from "@/components/recipeDetail/RecipeInfoAside";
import { clipboardCopyIconSvg } from "@/components/recipeDetail/recipeDetailIcons";
import type { SecondaryTab, UseItTabProps } from "@/types/recipeDetail";
import {
  buildUseItTargetsModel,
  CCI_QUESTION_NEW_ISSUE,
  conanfilePySnippet,
  conanfileTxtSnippet,
  DOC_CONSUME_PACKAGES,
  DOC_LIBRARY_CMAKE,
  DOC_TOOLS_AS_PACKAGES,
} from "@/utils/recipeDetailUtils";
import { getConanfileHljsMarkup, getCppHljsMarkup } from "@/utils/hljsConanfile";

function CciAssistanceLink() {
  return (
    <p className="intro-text" style={{ marginTop: 12, marginBottom: 0 }}>
      If you need additional assistance, please ask a{" "}
      <a href={CCI_QUESTION_NEW_ISSUE} target="_blank" rel="noopener noreferrer">
        question
      </a>{" "}
      in the Conan Center Index repository.
    </p>
  );
}

function UseItTargetsSection({
  model,
}: {
  model: ReturnType<typeof buildUseItTargetsModel>;
}) {
  return (
    <div className="target-box">
      <p className="intro-text" style={{ marginTop: 0 }}>
        These are the main declared targets:
      </p>
      <ul>
        <li>
          <strong>CMake package name(s)</strong>: <code>{model.cmakePackageName}</code>
        </li>
        <li>
          <strong>CMake target name(s)</strong>: <code>{model.cmakeTargetName}</code>
          {model.componentsTargetNames.length > 0 ? (
            <details className="useit-details">
              <summary>Component targets</summary>
              <pre className="useit-comp-list">{model.componentsTargetNames.join("\n")}</pre>
            </details>
          ) : null}
        </li>
        <li>
          <strong>pkg-config file name(s)</strong>: <code>{model.pkgConfigName}</code>
          {model.componentsPkgConfigName.length > 0 ? (
            <details className="useit-details">
              <summary>Component pkg-config names</summary>
              <pre className="useit-comp-list">{model.componentsPkgConfigName.join("\n")}</pre>
            </details>
          ) : null}
        </li>
      </ul>
      <p className="intro-text" style={{ marginTop: 12 }}>
        A simple use case using the CMake file name and the global target:
      </p>
      <div className="mini-code useit-cmake-snippet">
        <span style={{ color: "var(--ink-3)" }}># ...</span>
        {"\n"}
        <span style={{ color: "var(--accent)" }}>find_package</span>({model.findPackageArg} REQUIRED)
        {"\n"}
        <span style={{ color: "var(--ink-3)" }}># ...</span>
        {"\n"}
        <span style={{ color: "var(--accent)" }}>target_link_libraries</span>(YOUR_TARGET {model.linkArg})
      </div>
    </div>
  );
}

function UseItHeadersSection({ recipeName, headers }: { recipeName: string; headers: string[] }) {
  const sorted = [...headers].sort((a, b) => a.localeCompare(b));
  const includesSource = sorted.map((header) => `#include "${header}"`).join("\n");
  const cppHljs = useMemo(() => getCppHljsMarkup(includesSource), [includesSource]);
  const scrollLongList = sorted.length > 20;

  return (
    <div className="target-box">
      <p className="intro-text" style={{ marginTop: 0 }}>
        These are all the available headers. Some of these ones might be non-public; make sure of it by visiting the{" "}
        <code>{recipeName}</code> homepage listed above:
      </p>
      <pre
        className={`useit-headers-pre${scrollLongList ? " useit-headers-pre--scroll" : ""}`}
      >
        <code
          className={cppHljs.className}
          dangerouslySetInnerHTML={{ __html: cppHljs.html }}
        />
      </pre>
    </div>
  );
}

export default function UseItTab({
  isActive,
  recipeName,
  recipe,
  onPlatformPick,
  useItLoading,
  activeCodeTab,
  onCodeTabChange,
}: UseItTabProps) {
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<SecondaryTab>("targets");
  const reference = `${recipe.name}/${recipe.info.version}`;
  const ui = recipe.use_it;
  const isTool = ui?.package_type === "application";
  const showTargetsTab = Boolean(ui?.properties && ui.properties.cmake_find_mode !== "none");
  const showHeadersTab = Boolean(ui?.headers && ui.headers.length > 0);
  const showDetailsSection = showTargetsTab || showHeadersTab;
  const showBothSecondary = showTargetsTab && showHeadersTab;

  const targetsModel =
    showTargetsTab && ui?.properties
      ? buildUseItTargetsModel(recipe.name, ui.properties, ui.components_properties)
      : null;

  const panelSecondary: SecondaryTab = showBothSecondary
    ? activeSecondaryTab
    : showTargetsTab
      ? "targets"
      : "headers";

  const showTargetsPanel =
    Boolean(targetsModel) &&
    (showBothSecondary ? panelSecondary === "targets" : showTargetsTab);
  const showHeadersPanel =
    Boolean(ui?.headers?.length) &&
    (showBothSecondary ? panelSecondary === "headers" : showHeadersTab);

  const heading =
    !useItLoading && ui && isTool ? `Using ${recipe.name} as a tool` : `Using ${recipe.name}`;

  const libraryConanfileSnippet = useMemo(() => {
    if (useItLoading || !ui || isTool) return null;
    return activeCodeTab === "conanfile.txt" ? conanfileTxtSnippet(reference) : conanfilePySnippet(reference);
  }, [useItLoading, ui, isTool, activeCodeTab, reference]);

  const conanfileHljs = useMemo(() => {
    if (libraryConanfileSnippet === null) return null;
    return getConanfileHljsMarkup(libraryConanfileSnippet, activeCodeTab);
  }, [libraryConanfileSnippet, activeCodeTab]);

  let mainCol: ReactNode = null;
  if (useItLoading) {
    mainCol = (
      <p className="intro-text" style={{ color: "var(--ink-3)" }}>
        Loading usage information…
      </p>
    );
  } else if (!ui) {
    mainCol = (
      <>
        <p className="intro-text">
          Please, have a look at the Conan documentation about{" "}
          <a href={DOC_LIBRARY_CMAKE} target="_blank" rel="noopener noreferrer">
            how to use a library in your project
          </a>
          .
        </p>
        <CciAssistanceLink />
      </>
    );
  } else if (isTool) {
    mainCol = (
      <>
        <p className="intro-text">This recipe belongs to the family of the Conan build tools.</p>
        <p className="intro-text">
          Please, have a look at the Conan documentation about{" "}
          <a href={DOC_TOOLS_AS_PACKAGES} target="_blank" rel="noopener noreferrer">
            how to use build tools as Conan packages
          </a>
          .
        </p>
        <CciAssistanceLink />
      </>
    );
  } else {
    mainCol = (
      <>
        <div className="note">
          <b>◉ Note</b>
          If you are a new Conan user, we recommend reading the{" "}
          <a href={DOC_CONSUME_PACKAGES} target="_blank" rel="noopener noreferrer">
            how to consume packages
          </a>{" "}
          tutorial.
        </div>
        <CciAssistanceLink />
        <p className="intro-text">
          Simplest use case consuming this recipe and assuming CMake as your local build tool:
        </p>
        <div className="secondary-tabs" role="tablist" aria-label="Conanfile format">
          <button
            type="button"
            role="tab"
            aria-selected={activeCodeTab === "conanfile.txt"}
            className={`stab${activeCodeTab === "conanfile.txt" ? " active" : ""}`}
            onClick={() => onCodeTabChange("conanfile.txt")}
          >
            📄 conanfile.txt
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCodeTab === "conanfile.py"}
            className={`stab${activeCodeTab === "conanfile.py" ? " active" : ""}`}
            onClick={() => onCodeTabChange("conanfile.py")}
          >
            🐍 conanfile.py
          </button>
        </div>
        <div className="target-box target-box--snippet" role="tabpanel">
          <div className="conanfile-snippet-row">
            <pre className="conanfile-snippet-pre"><code className={conanfileHljs?.className} dangerouslySetInnerHTML={{ __html: conanfileHljs?.html ?? "" }} /></pre>
            <CopyToClipboardButton
              copyText={libraryConanfileSnippet ?? ""}
              className="recipe-revision-row__copy"
              aria-label={
                activeCodeTab === "conanfile.txt"
                  ? "Copy conanfile.txt snippet to clipboard"
                  : "Copy conanfile.py snippet to clipboard"
              }
            >
              {clipboardCopyIconSvg}
            </CopyToClipboardButton>
          </div>
        </div>
        {showDetailsSection ? (
          <>
            <p className="intro-text" style={{ marginTop: 20 }}>
              Useful information to take into account to consume this library:
            </p>
            {showBothSecondary ? (
              <div className="secondary-tabs">
                <button
                  type="button"
                  className={`stab${activeSecondaryTab === "targets" ? " active" : ""}`}
                  onClick={() => setActiveSecondaryTab("targets")}
                >
                  Targets
                </button>
                <button
                  type="button"
                  className={`stab${activeSecondaryTab === "headers" ? " active" : ""}`}
                  onClick={() => setActiveSecondaryTab("headers")}
                >
                  Headers
                </button>
              </div>
            ) : null}
            {showTargetsPanel && targetsModel ? <UseItTargetsSection model={targetsModel} /> : null}
            {showHeadersPanel && ui.headers ? (
              <UseItHeadersSection recipeName={recipe.name} headers={ui.headers} />
            ) : null}
          </>
        ) : null}
      </>
    );
  }

  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-useit" data-recipe={recipeName}>
      <div className="useit">
        <RecipeInfoAside recipe={recipe} onPlatformPick={onPlatformPick} />
        <div className="main-col">
          <h2>{heading}</h2>
          {mainCol}
        </div>
      </div>
    </div>
  );
}
