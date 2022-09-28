# web
Conan website, including home and ConanCenter

## Test server

**server folder:** FastAPI server. [WIP]

Run server:

```bash
cd test-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 5000
```

## Webapp

**conanio folder:** NexJS web app source.

Run the development webserver with [yarn](https://yarnpkg.com/):

```bash
cd conanio
yarn install
yarn test:ci
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction): the `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
