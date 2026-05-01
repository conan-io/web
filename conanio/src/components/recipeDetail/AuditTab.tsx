import type { RecipePageTabBase } from "@/types/recipeDetail";

export default function AuditTab({ isActive, recipeName, recipeVersion }: RecipePageTabBase) {
  const ref = `${recipeName}/${recipeVersion}`;
  return (
    <div className={`panel${isActive ? " active" : ""}`} id="panel-audit" data-recipe={recipeName}>
      <div className="audit-box">
        <h2>🔍 Ready to secure your dependencies in seconds?</h2>
        <ol>
          <li>
            Register for free at <a>audit.conan.io/register</a>.
          </li>
          <li>Save your token and activate it via the confirmation email you receive.</li>
          <li>
            Configure Conan to use your token:
            <div className="cmd">
              <span className="k">conan</span> audit provider auth conancenter <span className="c">--token=&lt;token&gt;</span>
            </div>
          </li>
          <li>
            Scan for vulnerabilities:
            <div className="cmd">
              <span className="c"># Check a specific reference</span>
              <br />
              <span className="k">conan</span> audit list {ref}
            </div>
            <div className="cmd">
              <span className="c"># Scan the entire dependency graph</span>
              <br />
              <span className="k">conan</span> audit scan <span className="c">--requires=</span>
              {ref}
            </div>
          </li>
        </ol>
        <p className="note-txt">
          Note: For more details on the Conan Audit command, please read <a>this post</a>.
        </p>
        <p className="note-txt">
          Tip: To avoid exposing your token in shell history, authenticate using an environment variable (e.g.{" "}
          <code
            style={{
              fontFamily: "var(--mono)",
              background: "#fff",
              padding: "1px 6px",
              border: "1px solid var(--line)",
              fontSize: "11.5px",
            }}
          >
            CONAN_AUDIT_PROVIDER_TOKEN_CONANCENTER=&lt;token&gt;
          </code>
          ). For more info, see the <a>documentation</a>.
        </p>
      </div>
    </div>
  );
}
