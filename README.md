# web
Conan website, including home and ConanCenter


**1. Run server**

Run thee server:

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip isntall -r requirements.txt
python server.py
```

**2. Run the web app**

Run the development webserver with [yarn](https://yarnpkg.com/):

```bash
cd conanio
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


[API routes](https://nextjs.org/docs/api-routes/introduction): the `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

**Docker**

```bash
cd conanio
docker build -t conanio-docker .
docker run -p 3000:3000 conanio-docker
```
