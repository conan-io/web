import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import ini from "highlight.js/lib/languages/ini";
import python from "highlight.js/lib/languages/python";

let languagesRegistered = false;

function ensureLanguagesRegistered(): void {
  if (languagesRegistered) return;
  hljs.registerLanguage("ini", ini);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("cpp", cpp);
  languagesRegistered = true;
}

export type ConanfileCodeTab = "conanfile.txt" | "conanfile.py";

/**
 * Legacy parity: `language-ini` / `language-python` + `hljs` on the `<code>` node.
 * Returns HTML for `dangerouslySetInnerHTML` so React reconciliation does not strip hljs nodes.
 */
export function getConanfileHljsMarkup(
  source: string,
  tab: ConanfileCodeTab,
): { className: string; html: string } {
  ensureLanguagesRegistered();
  const language = tab === "conanfile.txt" ? "ini" : "python";
  const { value } = hljs.highlight(source, { language, ignoreIllegals: true });
  const className = tab === "conanfile.txt" ? "hljs language-ini" : "hljs language-python";
  return { className, html: value };
}

/**
 * C++ syntax highlighting for `#include "…"` blocks (Use it → Headers), same stack as conanfile snippets.
 */
export function getCppHljsMarkup(source: string): { className: string; html: string } {
  ensureLanguagesRegistered();
  const { value } = hljs.highlight(source, { language: "cpp", ignoreIllegals: true });
  return { className: "hljs language-cpp", html: value };
}
