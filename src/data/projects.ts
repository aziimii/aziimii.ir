import type { Project, ProjectCategory } from './types'

/**
 * Project index and case studies.
 *
 * Sherafat details were verified against the actual repository
 * (/Documents/Projects/sherafat): Vite + React 19 + TypeScript + MUI frontend,
 * NestJS api-gateway / sherafat-api / gold-price-service, two PostgreSQL 16
 * databases, Nginx reverse proxy, Docker Compose, certbot TLS, and a GitHub
 * Actions deploy workflow. The repository is private, so no code or demo URLs
 * are published. No customers, metrics, or URLs are invented anywhere below.
 */

export const projectCategories: ProjectCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interface engineering and application structure.',
  },
  {
    id: 'full-stack',
    label: 'Full-stack',
    description: 'Frontend plus services, APIs, and data.',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    description: 'Servers, containers, web servers, and delivery pipelines.',
  },
  {
    id: 'architecture',
    label: 'Software architecture',
    description: 'Service boundaries, gateways, and system structure.',
  },
]

export const projects: Project[] = [
  {
    slug: 'sherafat-gold-platform',
    title: 'Sherafat Gold Platform',
    eyebrow: 'Case study A',
    summary:
      'An ongoing software engineering project focused on a gold-price platform with a web frontend and multiple backend services.',
    longSummary:
      'A gold and currency price platform: a React web frontend backed by a NestJS API gateway, an application service, and a scheduled gold-price service — each with its own PostgreSQL database, delivered as a Docker Compose stack behind Nginx.',
    categories: ['full-stack', 'architecture'],
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'MUI',
      'NestJS',
      'PostgreSQL',
      'API gateway',
      'Docker Compose',
      'Nginx',
      'WebSockets',
    ],
    status: 'ongoing',
    statusLabel: 'Ongoing',
    role: 'Software engineer — frontend, service integration, and deployment',
    featured: true,
    meta: [
      { label: 'Type', value: 'Ongoing personal/contract engineering project' },
      { label: 'Stack', value: 'React + TypeScript, NestJS, PostgreSQL' },
      { label: 'Delivery', value: 'Docker Compose, Nginx, GitHub Actions' },
      { label: 'Repository', value: 'Private — no public link yet' },
    ],
    verification:
      'Stack and structure verified directly against the repository in October 2026. Feature completeness is not published, because readiness differs per module.',
    sections: [
      {
        id: 'overview',
        heading: 'Product overview',
        blocks: [
          {
            type: 'p',
            text: 'Sherafat is an ongoing software engineering project: a gold-price platform with a web frontend and several backend services. Users open the web interface to read current gold and currency prices, while backend services keep that data fresh and push updates to connected clients.',
          },
          {
            type: 'kv',
            rows: [
              { label: 'Frontend', value: 'React + TypeScript SPA (Vite, MUI)' },
              {
                label: 'Backend',
                value: 'Three NestJS services: gateway, application API, price service',
              },
              { label: 'Data', value: 'Two PostgreSQL 16 databases' },
              {
                label: 'Runtime',
                value: 'Docker Compose stack behind an Nginx reverse proxy',
              },
              { label: 'Status', value: 'Ongoing — not every module is production-ready' },
            ],
          },
          {
            type: 'note',
            tone: 'info',
            text: 'This portfolio publishes architecture and engineering decisions only. No customer names, user counts, revenue, or performance numbers are claimed, because none are verified.',
          },
        ],
      },
      {
        id: 'problem',
        heading: 'Problem and requirements',
        blocks: [
          {
            type: 'p',
            text: 'Price data changes continuously, so the platform has to collect it regularly, store it durably, and present it to users quickly — in a bilingual interface that also handles Persian (Jalali) dates and right-to-left layout.',
          },
          {
            type: 'list',
            items: [
              'Show current gold and currency prices in a clear, responsive web interface.',
              'Keep data fresh without requiring a page reload, including live updates for connected clients.',
              'Separate concerns: application logic (auth, users, support) is independent from price collection.',
              'Run the whole system reproducibly on a single Linux server.',
              'Expose only a small, well-controlled public surface; keep services on an internal network.',
              'Support English and Persian content, including RTL rendering and Jalali date handling.',
            ],
          },
        ],
      },
      {
        id: 'role',
        heading: 'My role and contributions',
        blocks: [
          {
            type: 'p',
            text: 'I work across the stack on this project: frontend interface work, service integration through the gateway, and the deployment setup that runs the whole system. The project is a good reference for how I move between UI code, API boundaries, and server operations.',
          },
          {
            type: 'list',
            items: [
              'Frontend: routing, pages, theming, forms, and typed API access in the React application.',
              'Integration: connecting the frontend to gateway routes and streaming updates over WebSockets.',
              'Infrastructure: the unified Docker Compose stack, Nginx configuration, and TLS setup.',
              'Delivery: a CI workflow that deploys to a Linux host and rebuilds the containers.',
              'Documentation: architecture, development, and deployment guides kept next to the code.',
            ],
          },
          {
            type: 'note',
            tone: 'warning',
            text: 'A detailed per-feature contribution list is still being confirmed against commit history; until then this section describes workstreams rather than claiming specific authorship.',
          },
        ],
      },
      {
        id: 'architecture',
        heading: 'System architecture',
        blocks: [
          {
            type: 'flow',
            steps: [
              'Browser',
              'Nginx (SPA + reverse proxy)',
              'API gateway',
              'sherafat-api · gold-price-service',
              'PostgreSQL ×2',
            ],
          },
          {
            type: 'list',
            items: [
              'Frontend — React SPA built with Vite and served by Nginx in production; the dev server serves it locally.',
              'API gateway — NestJS service that routes HTTP and WebSocket traffic to the right backend service.',
              'sherafat-api — NestJS application service covering authentication, users, and support/ticket features, with JWT-based auth and generated API documentation.',
              'gold-price-service — NestJS service that collects prices on a schedule, stores them, and broadcasts changes to connected clients.',
              'Databases — two independent PostgreSQL instances so application data and price data can be backed up and scaled separately.',
            ],
          },
          {
            type: 'note',
            tone: 'success',
            text: 'Only the web entry point is exposed publicly; the databases and internal services communicate over a private Docker network.',
          },
        ],
      },
      {
        id: 'frontend',
        heading: 'Frontend implementation',
        blocks: [
          {
            type: 'p',
            text: 'The frontend is a typed React application organised by feature: routes, pages, shared components, services, themes, and translations live in separate directories so a new feature has an obvious place to go.',
          },
          {
            type: 'list',
            items: [
              'Vite for development and production builds, with React and TypeScript throughout.',
              'Material UI with custom themes; icons from Lucide and the MUI icon set.',
              'react-router-dom for nested layouts and guarded routes.',
              'axios-based service layer for API calls, with react-hook-form + zod for validated forms.',
              'socket.io-client for live price updates pushed from the backend.',
              'i18next translations with RTL styling, plus Jalali calendar handling for Persian dates.',
              'Optional PWA support via vite-plugin-pwa.',
            ],
          },
        ],
      },
      {
        id: 'api-integration',
        heading: 'API and service integration',
        blocks: [
          {
            type: 'p',
            text: 'The browser never talks to individual services directly. Requests go to a single entry point, which forwards them to the correct service and bridges WebSocket connections as well — so the frontend sees one API, not three.',
          },
          {
            type: 'list',
            items: [
              'The gateway proxies API routes and real-time connections to the application and price services.',
              'Each backend service exposes its own documented HTTP API (Swagger is generated by the services).',
              'Authentication is handled with JWTs in the application service.',
              'The frontend keeps API access in a dedicated service layer rather than scattered through components.',
            ],
          },
          {
            type: 'code',
            caption: 'Simplified routing shape (illustrative, not the private configuration):',
            code: `location /api/       -> http://api-gateway:3000/api/
location /socket.io/  -> http://api-gateway:3000/socket.io/
location /            -> React SPA (built assets)

api-gateway
  /api/app/*    -> sherafat-api:3001
  /api/prices/* -> gold-price-service:3002`,
          },
        ],
      },
      {
        id: 'data',
        heading: 'Data and provider integration',
        blocks: [
          {
            type: 'p',
            text: 'The gold-price service is the only component that talks to external price providers. It fetches on a schedule, persists results in its own database, and emits events that are broadcast to connected clients.',
          },
          {
            type: 'list',
            items: [
              'Scheduled collection using the NestJS scheduler, so prices update without manual intervention.',
              'Event emitter inside the service to decouple "price changed" from "send it to clients".',
              'WebSocket broadcast so open dashboards refresh without polling.',
              'Structured logging in the price service to make failed fetches visible.',
              'Provider credentials and provider-specific endpoints stay in environment configuration and are never published.',
            ],
          },
        ],
      },
      {
        id: 'deployment',
        heading: 'Deployment and operations',
        blocks: [
          {
            type: 'p',
            text: 'The whole system runs from one Compose file on a Linux server. A CI pipeline deploys it by pulling the latest code on the host and rebuilding the containers.',
          },
          {
            type: 'code',
            caption: 'Simplified service topology (structure only):',
            code: `services:
  frontend:        # React build served by Nginx (+ reverse proxy config)
  reverse-proxy:   # Nginx + TLS certificates
  api-gateway:     # routes HTTP and WebSocket traffic
  sherafat-api:    # application service
  sherafat-api-db: # PostgreSQL 16
  gold-price-service: # scheduled price collection
  gold-price-db:   # PostgreSQL 16`,
          },
          {
            type: 'list',
            items: [
              'Docker Compose defines every service, database, volume, and the internal network.',
              'Nginx serves the built frontend, proxies API and WebSocket traffic, and applies caching and security headers.',
              'TLS certificates are managed with certbot on the host.',
              'GitHub Actions deploys on push to main over SSH: fetch, rebuild containers, restart the stack, and show service status.',
              'Backup/restore and troubleshooting steps are documented in the repository docs directory.',
            ],
          },
        ],
      },
      {
        id: 'challenges',
        heading: 'Engineering challenges',
        blocks: [
          {
            type: 'numbered',
            items: [
              'Freshness versus reliability: price providers can be slow or unavailable, so collection must be scheduled, observable, and safe to retry without corrupting stored data.',
              'Real-time delivery: WebSocket connections must pass through the gateway to the right service and survive container restarts.',
              'Service boundaries: splitting the API into services helped clarity but added configuration surface — routing, environment files, and release ordering all had to be explicit.',
              'Bilingual UI: right-to-left layout and Jalali dates touch styling, formatting, and testing, not just translation strings.',
              'Operational security: keeping only one public entry point, keeping databases internal, and keeping secrets out of the repository.',
            ],
          },
        ],
      },
      {
        id: 'lessons',
        heading: 'Lessons learned',
        blocks: [
          {
            type: 'list',
            items: [
              'A thin gateway that only routes keeps service boundaries honest and gives the frontend a single, stable contract.',
              'Scheduled jobs plus structured logging turn "prices seem stale" from a mystery into a visible failure.',
              'Keeping architecture, deployment, and development docs in the repository pays for itself the first time a container misbehaves.',
              'Environment configuration is part of the design: the same stack must run locally and on a server without edits.',
              'Publishing fewer claims, not more, is the honest way to describe an ongoing project.',
            ],
          },
        ],
      },
      {
        id: 'links',
        heading: 'Links',
        blocks: [
          {
            type: 'note',
            tone: 'info',
            text: 'The Sherafat repository is currently private, so there is no public code or demo link to show. If a public demo or a read-only repository is approved later, it will be added here.',
          },
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'frontend-engineering',
    title: 'Frontend Engineering & Application Interfaces',
    eyebrow: 'Case study B',
    summary:
      'Selected frontend work: component-based interfaces, responsive layouts, typed React implementation, and API integration that stays maintainable.',
    longSummary:
      'A body of frontend engineering work — building and maintaining interface code in React and TypeScript, connecting it to real APIs, and keeping the result readable for the next developer.',
    categories: ['frontend'],
    tags: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Responsive UI',
      'Component architecture',
      'REST integration',
      'Forms and validation',
    ],
    status: 'selected-work',
    statusLabel: 'Selected work',
    role: 'Frontend engineer',
    featured: true,
    meta: [
      { label: 'Focus', value: 'Interface engineering in React and TypeScript' },
      { label: 'Evidence', value: 'Project repositories and the résumé record' },
      { label: 'Screenshots', value: 'Not published yet — pending approval' },
    ],
    verification:
      'Describes engineering practice and the verified frontend scope of the Ghasdak Peyk Shahr role and the Sherafat project. No client names or outcome metrics are claimed.',
    sections: [
      {
        id: 'context',
        heading: 'Context',
        blocks: [
          {
            type: 'p',
            text: 'Frontend work has been a constant across my roles: building web interfaces for business websites and products at Ghasdak Peyk Shahr, and building the user-facing application of the ongoing Sherafat gold-price platform.',
          },
          {
            type: 'p',
            text: 'In both settings the frontend is where requirements, APIs, and real users meet — which is why I treat interface code as an engineering problem, not only a visual one.',
          },
        ],
      },
      {
        id: 'problem',
        heading: 'Problem',
        blocks: [
          {
            type: 'p',
            text: 'Interface code tends to rot quickly: components grow too large, API calls get duplicated, layout breaks at some widths, and errors are handled differently in every screen. The problem is rarely the first screen — it is the tenth change to it.',
          },
        ],
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        blocks: [
          {
            type: 'list',
            items: [
              'Features must ship incrementally; there is rarely time for a rewrite.',
              'The interface has to work across screen sizes and input methods.',
              'Backend contracts evolve, so the frontend must fail gracefully.',
              'Content may be bilingual, including right-to-left layouts.',
              'The code must remain understandable to another developer without me present.',
            ],
          },
        ],
      },
      {
        id: 'decisions',
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'Organise by feature — routes, pages, components, and services in predictable directories — instead of one flat folder.',
              'Keep API access in a typed service layer so components receive data rather than construct requests.',
              'Use a component library (Material UI) with a defined theme so spacing, colour, and typography stay consistent.',
              'Validate form input at the boundary with schemas rather than ad-hoc checks.',
              'Type the frontend strictly with TypeScript, so contract mismatches show up at compile time instead of in production.',
            ],
          },
        ],
      },
      {
        id: 'implementation',
        heading: 'Implementation',
        blocks: [
          {
            type: 'list',
            items: [
              'React function components with hooks, split into small, well-named pieces with clear props.',
              'Vite for fast development and small production builds.',
              'react-router-dom for layout nesting and route-level guards.',
              'axios-based services with consistent error handling and loading states.',
              'react-hook-form with zod resolvers for validated forms.',
              'Responsive layouts using the grid system plus container queries/breakpoints rather than fixed pixel widths.',
              'socket.io-client where the interface needs live updates instead of polling.',
            ],
          },
          {
            type: 'code',
            caption: 'Shape of a typed API service (illustrative pattern):',
            code: `// services/goldPrices.ts
export async function getLatestPrices(signal?: AbortSignal) {
  const { data } = await api.get<PriceSnapshot>('/prices/latest', { signal })
  return data
}

// in a component
const { data, error, loading } = useAsync(() => getLatestPrices(abort.signal))`,
          },
        ],
      },
      {
        id: 'verification',
        heading: 'Verification',
        blocks: [
          {
            type: 'list',
            items: [
              'Compile-time: strict TypeScript plus schema validation on request/response data.',
              'Runtime: reading console and network output, reproducing failures, and testing edge states (empty, slow, error).',
              'Layout: checking each page at mobile, tablet, and desktop widths, including RTL content.',
              'Interaction: keyboard navigation, focus visibility, and accessible names for controls.',
              'Repository structure: the frontend code in the referenced project repositories shows the directory and service patterns described above.',
            ],
          },
          {
            type: 'note',
            tone: 'info',
            text: 'No before/after performance numbers are published, because none were measured and recorded for this portfolio.',
          },
        ],
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        blocks: [
          {
            type: 'list',
            items: [
              'Interface code where a new feature has an obvious place, and existing screens keep working while it is added.',
              'API changes surface as type errors instead of silent runtime breakage.',
              'Layouts that hold up at real viewport sizes rather than only on a designer screen.',
              'Handover-friendly code: structure, naming, and error states explain themselves.',
            ],
          },
        ],
      },
    ],
    links: [
      {
        label: 'GitHub profile (aziimii)',
        href: 'https://github.com/aziimii',
        external: true,
        note: 'Public repositories; the main project repositories are private.',
      },
    ],
  },
  {
    slug: 'systems-deployment-infrastructure',
    title: 'Systems, Deployment & Infrastructure',
    eyebrow: 'Case study C',
    summary:
      'Verified experience with Linux servers, Docker Compose stacks, Nginx configuration, CI/CD pipelines, TLS, and operational troubleshooting.',
    longSummary:
      'Running applications the way they actually run in production: Linux hosts, containerised services, a reverse proxy in front, automated deploys, and documented recovery steps.',
    categories: ['infrastructure'],
    tags: [
      'Linux',
      'Docker',
      'Docker Compose',
      'Nginx',
      'TLS/certbot',
      'CI/CD',
      'GitHub Actions',
      'Web operations',
      'Backup and restore',
    ],
    status: 'selected-work',
    statusLabel: 'Selected work',
    role: 'Systems and deployment engineering',
    featured: true,
    meta: [
      { label: 'Focus', value: 'Deployment, containers, web servers, delivery' },
      {
        label: 'Evidence',
        value: 'Résumé record + Docker/Nginx/CI configuration in project repositories',
      },
      { label: 'Diagram', value: 'Matches the deployed Compose topology' },
    ],
    verification:
      'Based on the verified Ghasdak Peyk Shahr responsibilities and the deployment configuration present in the Sherafat repository. No uptime, cost, or performance figures are claimed.',
    sections: [
      {
        id: 'context',
        heading: 'Context',
        blocks: [
          {
            type: 'p',
            text: 'Two settings shaped this work: keeping business websites running and deployed safely in my remote role at Ghasdak Peyk Shahr, and building the deployment story for the multi-service Sherafat platform on a Linux server.',
          },
        ],
      },
      {
        id: 'problem',
        heading: 'Problem',
        blocks: [
          {
            type: 'p',
            text: '"It works on my machine" is the easy part. Applications have to be built the same way every time, exposed safely, updated without downtime surprises, and recoverable when something breaks — usually at an inconvenient hour.',
          },
        ],
      },
      {
        id: 'constraints',
        heading: 'Constraints',
        blocks: [
          {
            type: 'list',
            items: [
              'A single Linux server is a common budget for this class of project.',
              'Multiple services and databases must coexist without port conflicts or exposed data.',
              'Deploys should be repeatable and not depend on remembering a checklist.',
              'TLS and web security are mandatory, not optional.',
              'Secrets must never be committed to the repository.',
            ],
          },
        ],
      },
      {
        id: 'decisions',
        heading: 'Decisions',
        blocks: [
          {
            type: 'list',
            items: [
              'Containerise every service with Docker Compose so local, staging, and server runs share one definition.',
              'Put a single Nginx reverse proxy in front: it serves the built frontend, proxies APIs and WebSockets, applies caching and security headers, and terminates TLS.',
              'Expose only the web entry point publicly; databases and internal services stay on a private network.',
              'Automate deploys in GitHub Actions over SSH so a push to main is the only deploy step.',
              'Document deployment, backup, and recovery next to the code instead of in a notebook.',
            ],
          },
        ],
      },
      {
        id: 'implementation',
        heading: 'Implementation',
        blocks: [
          {
            type: 'flow',
            steps: [
              'Push to main',
              'GitHub Actions (SSH)',
              'git pull + docker compose build',
              'Nginx/TLS entry point',
              'Services on internal network',
            ],
          },
          {
            type: 'list',
            items: [
              'Multi-stage Docker builds: dependencies and compilation in a build stage, only the runtime artefacts in the final image.',
              'Compose volumes for databases and uploads so containers can be replaced without losing data.',
              'Nginx configuration covering SPA routing, API proxying, WebSocket upgrade, gzip, caching, and security headers.',
              'certbot for certificate issuance and renewal on the host.',
              'Health checks and structured logs so failures are visible rather than silent.',
              'Backup and restore procedures written down and tested against the actual volume layout.',
            ],
          },
        ],
      },
      {
        id: 'verification',
        heading: 'Verification',
        blocks: [
          {
            type: 'list',
            items: [
              'Fresh clone → one Compose command → all services healthy on a clean machine.',
              'Direct URL refreshes on routed pages return the SPA, not a 404 (SPA fallback configured).',
              'Ports checked against the running container list: only the intended entry point is public.',
              'TLS verified with a real certificate, and HTTP redirected to HTTPS.',
              'Deploy pipeline exercised end-to-end: push, build on host, restart, service status output.',
              'Restore path tested from a backup, not only assumed to work.',
            ],
          },
        ],
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        blocks: [
          {
            type: 'list',
            items: [
              'Deploys reduced to one repeatable pipeline instead of a manual sequence.',
              'A stack that can be recreated from the repository on a new server.',
              'A smaller public attack surface, with secrets kept in environment configuration.',
              'Documented recovery steps, so an incident does not depend on memory.',
            ],
          },
          {
            type: 'note',
            tone: 'info',
            text: 'These are engineering outcomes, not measured business metrics — no uptime percentages or cost savings are claimed.',
          },
        ],
      },
      {
        id: 'links',
        heading: 'Links',
        blocks: [
          {
            type: 'note',
            tone: 'info',
            text: 'Deployment configuration lives in the (currently private) project repositories. No public server URLs or infrastructure dashboards are shared.',
          },
        ],
      },
    ],
    links: [],
  },
]

export const featuredProjects: Project[] = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function filterProjects(
  list: Project[],
  query: string,
  category: string,
): Project[] {
  const q = query.trim().toLowerCase()
  return list.filter((project) => {
    const matchesCategory = category === 'all' || project.categories.includes(category as Project['categories'][number])
    if (!matchesCategory) return false
    if (!q) return true
    const haystack = [
      project.title,
      project.summary,
      project.longSummary,
      project.role,
      ...project.tags,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}
