import { useState } from "react";
import MarketoForm, { type MarketoProps } from "@/components/MarketoForm";
import { trackConanEvent } from "@/service/analytics";

export default function MainFooter() {
  const [inputs] = useState<MarketoProps>({
    baseUrl: "https://leap.jfrog.com",
    munchkinId: "256-FNZ-187",
    formId: "1479",
    callback: (form: any) => {
      // Same hook shape as prod `conanio/components/footer.tsx`
      form.onSubmit((_values: unknown, _followUpUrl: unknown) => {
        trackConanEvent({
          event_name: "form_start",
          type: "subscribe",
          purpose: "social",
          description: "subscribe for release update",
        });
      });
    },
  });

  return (
    <footer className="dark">
      <div className="sub-head">
        <section id="signUp" className="sign-up text-center">
          <h2 id="signUpTitle">Subscribe for release updates</h2>
          <div className="mktoFormWrapper">
            <div className="mkto-form-inner">
              <MarketoForm {...inputs} />
            </div>
          </div>
        </section>
      </div>
      <div className="bar">
        <div className="links">
          <a href="/downloads" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "downloads", section: "footer" })}>Downloads</a>
          <a href="/center" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "conancenter", section: "footer" })}>ConanCenter</a>
          <a href="https://github.com/conan-io/conan" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "github", section: "footer" })}>GitHub</a>
          <a href="https://docs.conan.io/" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "docs", section: "footer" })}>Docs</a>
          <a href="https://blog.conan.io/" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "blog", section: "footer" })}>Blog</a>
          <a href="/faq" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "faq", section: "footer" })}>FAQ</a>
          <a href="https://jfrog.com/privacy-notice/" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "privacy notice", section: "footer" })}>Privacy Notice</a>
          <a href="/terms-conditions" onClick={() => trackConanEvent({ type: "navigation", purpose: "footer menu", description: "terms", section: "footer" })}>Terms</a>
          <a
            href="#"
            className="ot-sdk-show-settings"
            onClick={(e) => {
              e.preventDefault();
              trackConanEvent({
                type: "navigation",
                purpose: "footer menu",
                description: "cookies",
                section: "footer",
              });
              const transcendWindow = window as typeof window & {
                transcend?: { showConsentManager: (params: { viewState: string }) => void };
              };
              transcendWindow.transcend?.showConsentManager({ viewState: "CompleteOptions" });
            }}
          >
            Cookies Settings
          </a>
        </div>
        <div className="social">
          <a title="X" aria-label="X" href="https://x.com/conan_io" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "social", purpose: "social", description: "x", section: "footer" })}><svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.76-6.223L4.8 22H2l6.98-7.974L2 2h6.914l4.34 5.73L18.244 2zm-2.39 18.2h1.892L7.25 3.68H5.22L15.854 20.2z" /></svg></a>
          <a title="Slack" aria-label="Slack" href="https://cppalliance.org/slack/#cpp-slack" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "social", purpose: "social", description: "slack", section: "footer" })}><svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523z" /></svg></a>
          <a title="GitHub" aria-label="GitHub" href="https://github.com/conan-io" target="_blank" rel="noopener noreferrer" onClick={() => trackConanEvent({ type: "social", purpose: "social", description: "github", section: "footer" })}><svg width={13} height={13} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" /></svg></a>
        </div>
      </div>
    </footer>
  );
}
