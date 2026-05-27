# web
Monorepo for the Conan website, including the main site and ConanCenter web apps.

## Useful references

- [Next.js Documentation](https://nextjs.org/docs) - Framework reference for routing, rendering, and API routes used by `conanio`.
- [`conanio/README.md`](conanio/README.md) - Canonical local setup, scripts, env vars, and runtime notes for the web app.
- [`conanio/AGENTS.md`](conanio/AGENTS.md) - Project rules, especially API public/private split and implementation constraints.
- [`conanio/STYLE.md`](conanio/STYLE.md) - UI/page implementation guide for new pages and restyling work.
- [`conanio/FEATURES.md`](conanio/FEATURES.md) - Deferred feature backlog and scope guardrails.

## Test server

`test-server/` contains a local FastAPI mock server used for development and testing.

Run it locally:

```bash
cd test-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 5000
```

The server will be available at `http://localhost:5000`.

## Webapp

`conanio/` contains the Next.js web application source code.

Run the development server with [Yarn](https://yarnpkg.com/):

```bash
cd conanio
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For full local setup (including environment variables and test commands), see [`conanio/README.md`](conanio/README.md).

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes): the `pages/api` directory is mapped to `/api/*`, and files there are treated as API endpoints instead of React pages.

## NGINX Proxy pass configuration

```bash
server {
    listen 80 default_server;
    server_tokens off;
    server_name conancenter-stg.jfrog.team;
    client_max_body_size 8192M;
    location / {
        expires 2m;
        add_header              Cache-Control "public";
        proxy_pass              http://conancenter-web/;
        proxy_http_version      1.1;
        proxy_pass_header       Server;
        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forward-For $proxy_add_x_forwarded_for;
    }
}
```
