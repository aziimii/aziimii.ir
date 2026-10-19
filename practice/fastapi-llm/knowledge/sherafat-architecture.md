# Sherafat Gold Platform — architecture

Sherafat is an ongoing gold and currency price platform. The web frontend is
built with Vite + React 19 + TypeScript + Material UI. It talks to a NestJS
api-gateway, which routes to two backend services: sherafat-api (auth, users,
support tickets) and gold-price-service (scheduled price collection).

Each backend service has its own PostgreSQL 16 database. Real-time price
updates are pushed to connected clients over WebSockets through the gateway.

# Deployment

The whole platform ships as a Docker Compose stack behind Nginx. Nginx
terminates TLS and reverse-proxies by path prefix: `/` serves the built
frontend, `/api/app/*` routes to sherafat-api on port 3001, and market-data
routes go to gold-price-service. Services reach each other over a shared
Docker network; each database is pinned to a named volume.

# Cross-layer ownership

One engineer works across the layers: React frontend code, NestJS gateway and
services, PostgreSQL schemas, and the Nginx + Docker Compose deployment. The
deployment topology is the evidence that the work is genuinely full-stack:
frontend, application services, data stores, and infrastructure in one
repository, delivered as one stack.
