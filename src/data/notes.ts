import type { Note } from './types'

/**
 * Engineering notes.
 *
 * These are draft topics — outlines, not published articles. Nothing here is
 * presented as published personal writing. When a real article is written, set
 * `status` to a published state, fill `publishedOn`, and move the body into
 * structured content blocks.
 */

export const notes: Note[] = [
  {
    slug: 'designing-a-maintainable-react-application',
    title: 'Designing a Maintainable React Application',
    summary:
      'Ideas for structuring a React codebase so that the tenth feature costs less than the first: folder layout, component boundaries, typed API access, and state placement.',
    tags: ['React', 'TypeScript', 'Architecture'],
    status: 'draft',
    statusLabel: 'Draft topic — not yet written',
    publishedOn: null,
    outline: [
      {
        heading: 'Feature-first directory structure',
        points: [
          'Routes, pages, components, and services grouped by feature rather than by file type.',
          'Where shared, cross-feature code should live and how it is promoted.',
        ],
      },
      {
        heading: 'Component boundaries',
        points: [
          'Signals that a component is doing too much (props drilling, mixed data fetching, unclear props).',
          'Container versus presentational split, and when it is worth it.',
        ],
      },
      {
        heading: 'Typed API access',
        points: [
          'Keeping HTTP calls in one service layer instead of inside components.',
          'Validating responses at runtime, not only typing them.',
        ],
      },
      {
        heading: 'State placement',
        points: [
          'Server state versus UI state versus form state.',
          'Avoiding global stores for data that only one screen uses.',
        ],
      },
    ],
  },
  {
    slug: 'lessons-from-deploying-multi-service-applications',
    title: 'Lessons from Deploying Multi-Service Applications',
    summary:
      'What changes when an application becomes several containers: single entry points, internal networks, environment configuration, health checks, and documented recovery.',
    tags: ['Docker', 'Nginx', 'DevOps'],
    status: 'draft',
    statusLabel: 'Draft topic — not yet written',
    publishedOn: null,
    outline: [
      {
        heading: 'One public door',
        points: [
          'Why a reverse proxy in front of services keeps configuration and TLS in one place.',
          'Keeping databases and internal services off the public network.',
        ],
      },
      {
        heading: 'Configuration as part of the design',
        points: [
          'Environment files, defaults, and the difference between local and server runs.',
          'Secrets: what belongs in the repository and what never does.',
        ],
      },
      {
        heading: 'Knowing when something is unhealthy',
        points: [
          'Health checks, structured logs, and restart policies.',
          'Turning "the site feels slow" into a specific, checkable statement.',
        ],
      },
      {
        heading: 'Recovery is a feature',
        points: [
          'Backup and restore that is written down and actually tested.',
          'What to document before an incident, not during one.',
        ],
      },
    ],
  },
  {
    slug: 'debugging-api-integration-problems',
    title: 'Debugging API Integration Problems',
    summary:
      'A repeatable method for tracking down integration failures: reproduce, isolate the boundary, read the payload, and check assumptions about timing and types.',
    tags: ['API', 'Debugging', 'Frontend'],
    status: 'draft',
    statusLabel: 'Draft topic — not yet written',
    publishedOn: null,
    outline: [
      {
        heading: 'Reproduce reliably',
        points: [
          'Finding the request and response that actually failed, not the symptom on screen.',
          'Reducing the failure to the smallest input that still breaks.',
        ],
      },
      {
        heading: 'Isolate the boundary',
        points: [
          'Deciding whether the bug is in the client, the gateway, or the service.',
          'Using status codes, headers, and logs as evidence rather than guessing.',
        ],
      },
      {
        heading: 'Check timing and shape assumptions',
        points: [
          'Race conditions, caching, and stale responses.',
          'Optional fields, changed types, and silent coercion.',
        ],
      },
      {
        heading: 'Leave it better',
        points: [
          'Turning the fix into a validation rule or test so it cannot quietly return.',
          'Documenting the failure mode for the next person.',
        ],
      },
    ],
  },
  {
    slug: 'practical-considerations-for-cicd-and-environment-configuration',
    title: 'Practical Considerations for CI/CD and Environment Configuration',
    summary:
      'Notes on pipelines that are boring in the good way: deterministic builds, environment parity, safe rollbacks, and configuration that never leaks into the repository.',
    tags: ['CI/CD', 'GitHub Actions', 'Environments'],
    status: 'draft',
    statusLabel: 'Draft topic — not yet written',
    publishedOn: null,
    outline: [
      {
        heading: 'Deterministic builds',
        points: [
          'Lockfiles, pinned base images, and why "works on the runner" is not enough.',
          'Running type checks and linting before deployment, not after.',
        ],
      },
      {
        heading: 'Environment parity',
        points: [
          'Keeping local and server runs driven by the same definition.',
          'Configuration drift: how it starts and how to notice it early.',
        ],
      },
      {
        heading: 'Safe deployment steps',
        points: [
          'Ordered startup, health checks before traffic, and clear failure output.',
          'Rolling back quickly: what has to be in place beforehand.',
        ],
      },
      {
        heading: 'Secrets and permissions',
        points: [
          'Secrets stored in the CI system, scoped to what each job needs.',
          'Least-privilege deploy credentials.',
        ],
      },
    ],
  },
]

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug)
}

export const publishedNotes: Note[] = notes.filter(
  (note) => note.status !== 'draft',
)
