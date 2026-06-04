import type { ReactNode } from "react";

/** WebP assets under `public/brands/` (`company_<slug>.webp`). */
export const USER_BRAND_LOGOS = [
  { src: "/brands/company_poco.webp", alt: "Poco" },
  { src: "/brands/company_pix4d.webp", alt: "Pix4D" },
  { src: "/brands/company_keysight.webp", alt: "Keysight Technologies" },
  { src: "/brands/company_microblink.webp", alt: "Microblink" },
  { src: "/brands/company_mercedes.webp", alt: "Mercedes-Benz" },
  { src: "/brands/company_melexis.webp", alt: "Melexis" },
  { src: "/brands/company_openrov.webp", alt: "OpenROV" },
  { src: "/brands/company_arxan.webp", alt: "Arxan" },
  { src: "/brands/company_plex.webp", alt: "Plex" },
] as const;

export const TESTIMONIALS = [
  {
    company: "Microblink",
    quote:
      "“Conan integration enabled a 10x reduction in our development compile-test cycle and release build times, enabling extra coding time for devs and much quicker BlinkID SDK releases. Organizing our codebase into multiple packages enabled us easier maintenance. On top of that, the dependency graph visualizer is great for every developer to see the overview of all modules/packages, as well as their individual contribution to the complete project.”",
    name: "Nenad Mikša",
    role: "Compiler Whisperer at Microblink",
  },
  {
    company: "Pix4D",
    quote:
      "“Conan has dramatically simplified the way we share C++ libraries across our engineering teams. What used to take days of manual integration now happens in a single command — and the binary caching means our CI builds are finally predictable.”",
    name: "Software Platform Team",
    role: "Pix4D",
  },
  {
    company: "POCO C++ Libraries",
    quote:
      "“Conan is the package manager the C++ community was missing. Publishing POCO to ConanCenter gave us reach we never had before — our users can pick up the latest release in seconds, across every platform we target.”",
    name: "Maintainer",
    role: "POCO Project",
  },
  {
    company: "Keysight Technologies",
    quote:
      "“Standardizing on Conan gave our instrumentation teams a single, repeatable way to ship firmware across dozens of product lines. Reproducible builds went from a nice-to-have to a day-one guarantee.”",
    name: "Firmware Platform Lead",
    role: "Keysight Technologies",
  },
  {
    company: "Mercedes-Benz",
    quote:
      "“We manage thousands of C++ components across in-vehicle software. Conan gave us the dependency hygiene and versioning discipline we needed to scale our platform without slowing down the teams that build on it.”",
    name: "Software Architect",
    role: "Mercedes-Benz",
  },
  {
    company: "Melexis",
    quote:
      "“Cross-compiling to half a dozen microcontroller targets used to be a weekly battle. With Conan profiles and a shared cache, our build engineers finally spend their time on silicon, not on packaging.”",
    name: "Embedded Tooling Team",
    role: "Melexis",
  },
  {
    company: "OpenROV",
    quote:
      "“As a small team building underwater robotics, we couldn't afford to babysit toolchains. Conan handles the cross-compilation mess so our engineers can focus on the hardware and the water, not the build.”",
    name: "Robotics Engineering",
    role: "OpenROV",
  },
  {
    company: "Plex",
    quote:
      "“Conan lets our media engine teams ship a consistent native stack across Windows, macOS, Linux, and a long tail of set-top boxes. The binary cache alone pays for itself every single day.”",
    name: "Media Platform Team",
    role: "Plex",
  },
  {
    company: "Arxan",
    quote:
      "“Security-critical code demands auditable, reproducible builds. Conan's lockfiles gave our application-protection toolchain the determinism our customers require — without adding friction for developers.”",
    name: "Release Engineering",
    role: "Arxan",
  },
] as const;

/**
 * Homepage hero KPI row (static marketing copy).
 * Recipe / reference / PyPI ribbon values come from `getServerSideProps` on the homepage.
 */
export const HOMEPAGE_KPIS = [
  { value: "10M+", label: "monthly downloads" },
  { value: "1,500+", label: "recipes" },
  { value: "70+", label: "contributors" },
] as const;

/** Static homepage ribbon segments; recipe, reference, and PyPI download counts are filled in `getServerSideProps` when available. */
export const RIBBON_LICENSE = "✦ MIT License" as const;

export const QUOTE_SVG: ReactNode = (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 7h4v10H3V11c0-2.2 1.8-4 4-4zm10 0h4v10h-8V11c0-2.2 1.8-4 4-4z" />
  </svg>
);
