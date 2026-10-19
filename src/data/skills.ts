import type { Capability, SkillGroup } from './types'

/**
 * Skill content. Every item here is supported by the owner's stated experience
 * or by files in the referenced project repositories. No proficiency ratings or
 * years-of-experience numbers are published, because none are verified.
 *
 * Ordering is intentional: backend/API work, deployment tooling, and systems
 * knowledge lead; frontend follows.
 */

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend and APIs',
    items: [
      'Node.js',
      'NestJS',
      'REST API design',
      'API gateways',
      'JWT authentication',
      'API documentation',
      'WebSocket integration',
      'Service integration',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Deployment and infrastructure',
    items: [
      'Docker',
      'Docker Compose',
      'Nginx reverse proxy',
      'TLS configuration',
      'CI/CD (GitHub Actions)',
      'Deployment and web operations',
      'Environment configuration',
    ],
  },
  {
    id: 'systems',
    label: 'Systems and data',
    items: [
      'Linux',
      'Systems and network administration',
      'Networking and troubleshooting',
      'PostgreSQL',
      'SQL',
      'Production debugging',
      'Data analysis',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Responsive UI',
      'Component-based architecture',
    ],
  },
  {
    id: 'practices',
    label: 'Engineering practices',
    items: [
      'Maintainability',
      'Debugging',
      'Documentation',
      'Security-conscious operations',
      'Cross-layer architecture',
    ],
  },
]

export const capabilities: Capability[] = [
  {
    id: 'application-development',
    title: 'Application Development',
    description:
      'Designing backend services and APIs that stay readable and predictable as features grow.',
    items: [
      'REST APIs and API gateways',
      'Node.js and NestJS services',
      'Authentication and authorization',
      'PostgreSQL data modelling',
      'Application structure',
    ],
    icon: 'code',
  },
  {
    id: 'systems-infrastructure',
    title: 'Systems & Infrastructure',
    description:
      'Running applications on real servers — and designing for how they actually behave there.',
    items: [
      'Linux servers',
      'Docker and Docker Compose',
      'Nginx reverse proxy and TLS',
      'Networking and troubleshooting',
    ],
    icon: 'server',
  },
  {
    id: 'software-delivery',
    title: 'Software Delivery',
    description: 'Getting changes out reliably and knowing when something breaks.',
    items: [
      'CI/CD workflows (GitHub Actions)',
      'Deployment pipelines',
      'Environment configuration',
      'Operational reliability',
    ],
    icon: 'workflow',
  },
  {
    id: 'frontend-engineering',
    title: 'Frontend Engineering',
    description: 'Building interface code that stays readable as features grow.',
    items: [
      'React',
      'TypeScript',
      'Component architecture',
      'Responsive interfaces',
      'API integration',
    ],
    icon: 'monitor',
  },
]

export const selectedTechnologies = [
  'NestJS',
  'Node.js',
  'REST APIs',
  'PostgreSQL',
  'Docker',
  'Docker Compose',
  'Nginx',
  'Linux',
  'GitHub Actions',
  'React',
  'TypeScript',
  'Vite',
  'Material UI',
]
