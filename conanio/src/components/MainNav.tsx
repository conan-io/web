import { useEffect, useState } from "react";
import Image from "next/image";
import { trackConanEvent } from "@/service/analytics";

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (description: string) => {
    trackConanEvent({
      type: "navigation",
      purpose: "main menu",
      description,
      section: "header",
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`nav${isMenuOpen ? " open" : ""}${isScrolled ? " scrolled" : ""}`}>
      <a className="logo" aria-label="Conan — C/C++ Package Manager" href="/" onClick={() => handleNavClick("conan logo")}>
        <Image src="/conan-logo.png" alt="Conan — C/C++ Package Manager" width={304} height={65} priority />
      </a>
      <ul>
        <li><a href="/center" onClick={() => handleNavClick("conancenter")}>ConanCenter</a></li>
        <li><a href="/audit/register" onClick={() => handleNavClick("audit")}>Conan Audit</a></li>
        <li><a href="https://docs.conan.io/" target="_blank" rel="noopener" onClick={() => handleNavClick("docs")}>Docs</a></li>
        <li><a href="https://blog.conan.io/" target="_blank" rel="noopener" onClick={() => handleNavClick("blog")}>Blog</a></li>
        <li><a href="/faq" onClick={() => handleNavClick("faq")}>FAQ</a></li>
        <li className="nav-github">
          <a className="gh" href="https://github.com/conan-io/conan" target="_blank" rel="noopener" onClick={() => handleNavClick("github")}>
            <span className="repo">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" /></svg>
              conan-io/conan
            </span>
          </a>
        </li>
        <li className="nav-download">
          <a className="dl" href="/downloads" onClick={() => handleNavClick("downloads")}>↓ Downloads</a>
        </li>
      </ul>
      <div className="right">
        <a className="gh" href="https://github.com/conan-io/conan" target="_blank" rel="noopener" onClick={() => handleNavClick("github")}>
          <span className="repo">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 0z" /></svg>
            conan-io/conan
          </span>
        </a>
        <a className="dl" href="/downloads" onClick={() => handleNavClick("downloads")}>↓ Downloads</a>
      </div>
      <button
        type="button"
        className="menu-toggle"
        id="menu-toggle"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen ? "true" : "false"}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <svg className="ico-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1={3} y1={7} x2={21} y2={7} /><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={17} x2={21} y2={17} /></svg>
        <svg className="ico-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1={6} y1={6} x2={18} y2={18} /><line x1={18} y1={6} x2={6} y2={18} /></svg>
      </button>
    </nav>
  );
}
