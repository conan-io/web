# conanio features backlog

This file tracks pending project-level features that are intentionally deferred.
Before implementing one of these items, confirm scope with the user in the current chat.

## Pending items

1. **Testing baseline**
   - Add project test strategy and scripts (`test`, `test:ci`).
   - Cover core flows with unit/integration and at least one E2E path.
   - Wire coverage expectations.

2. **Security headers**
   - Add security headers in `next.config.ts` (`headers()`).
   - Start with CSP in report-only mode, then move to enforcement after validation.
   - Validate GTM/transcend and other third-party integrations against CSP policy.
   - Proposed code snippet (do not apply automatically, use as implementation reference):

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // ... existing config ...
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://transcend-cdn.com https://gtm.jfrog.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https:",
              "connect-src 'self' https:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
```

3. **CI quality gates**
   - Add mandatory CI checks before merge: lint + typecheck + tests + build.
   - Define fail-fast policy and required checks for pull requests.
   - Finalize together with Point 2 once test baseline exists.
