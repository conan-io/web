# web
Conan website, including home and ConanCenter

## Test server

**server folder:** Flask test server.

Run server:

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip isntall -r requirements.txt
python server.py
```

## Webapp

**conanio folder:** NexJS web app source.

Run the development webserver with [yarn](https://yarnpkg.com/):

```bash
cd conanio
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


[API routes](https://nextjs.org/docs/api-routes/introduction): the `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

##Kubernetes

**chart folder:** helm chart package for kubernetes *(minikube only)*.

```bash
minikube start
eval $(minikube docker-env)

cd server
docker build -t conanio-server .

cd ..
cd conanio
docker build -t conanio-web .

cd ..
cd chart/conanio
helm upgrade --install conanio .
kubectl port-forward service/conanio-web 3000:3000
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
