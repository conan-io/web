import Link from "next/link";

import MainFooter from "@/components/MainFooter";
import MainNav from "@/components/MainNav";
import PageHead from "@/components/PageHead";

export default function NotFound() {
  return (
    <>
      <PageHead title="Conan — 404 Page Not Found" />

      <main id="page" data-screen-label="Conan 404 — Page Not Found">
        <MainNav />
        <section
          aria-labelledby="nf-heading"
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "48px 24px 80px",
            minHeight: "52vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              marginBottom: "28px",
            }}
          >
            <img
              src="/jfrog-mascot.svg"
              alt="Conan the barbarian frog mascot"
              style={{ width: "min(280px,72vw)", height: "auto", display: "block" }}
            />
            <span
              style={{
                position: "absolute",
                top: "-14px",
                left: "-72px",
                width: "116px",
                height: "52px",
                background: "var(--accent)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-12deg)",
                fontFamily: "var(--mono)",
                fontWeight: 700,
                fontSize: "var(--fs-30)",
                lineHeight: 1,
                letterSpacing: ".02em",
                borderRadius: 0,
                boxShadow: "0 8px 20px -8px rgba(26,115,232,.55)",
              }}
            >
              404
            </span>
          </div>
          <h1
            id="nf-heading"
            style={{
              fontSize: "clamp(var(--fs-22), 4vw, var(--fs-32))",
              fontWeight: 700,
              color: "var(--blue-ink)",
              letterSpacing: "-.02em",
              lineHeight: 1.2,
              margin: "0 0 28px",
              maxWidth: "540px",
            }}
          >
            {"The page you're looking for couldn't be found."}
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/" className="btn btn-primary">
              ← Back to homepage
            </Link>
          </div>
        </section>
        <MainFooter />
      </main>
    </>
  );
}
