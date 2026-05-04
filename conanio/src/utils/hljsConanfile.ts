import hljs from "highlight.js/lib/core";
import ini from "highlight.js/lib/languages/ini";
import python from "highlight.js/lib/languages/python";

let languagesRegistered = false;

function ensureLanguagesRegistered(): void {
  if (languagesRegistered) return;
  hljs.registerLanguage("ini", ini);
  hljs.registerLanguage("python", python);
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
