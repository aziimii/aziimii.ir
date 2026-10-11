import type { Capability, SkillGroup } from './types'

/**
 * Skill content. Every item here is supported by the owner's stated experience
 * or by files in the referenced project repositories. No proficiency ratings or
 * years-of-experience numbers are published, because none are verified.
 */

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'React',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Responsive UI',
      'Component-based architecture',
    ],
  },
  {
    id: 'backend',
    label: 'Backend and APIs',
    items: [
      'Node.js',
      'NestJS',
      'REST APIs',
      'Service integration',
      'WebSocket integration',
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: ['PostgreSQL', 'SQL', 'Data analysis'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure and delivery',
    items: [
      'Linux',
      'Docker',
      'Docker Compose',
      'Nginx',
      'CI/CD',
      'Deployment and web operations',
    ],
  },
  {
    id: 'practices',
    label: 'Engineering practices',
    items: [
      'Debugging',
      'Maintainability',
      'Troubleshooting',
      'Documentation',
      'Security-conscious operations',
    ],
  },
]

export const capabilities: Capability[] = [
  {
    id: 'frontend-engineering',
    title: 'Frontend Engineering',
    description:
      'Building interface code that stays readable as features grow.',
    items: [
      'React',
      'JavaScript',
      'TypeScript',
      'Component architecture',
      'Responsive interfaces',
    ],
    icon: 'monitor',
  },
  {
    id: 'application-development',
    title: 'Application Development',
    description:
      'Connecting interfaces to services and keeping application code maintainable.',
    items: [
      'API integration',
      'Application structure',
      'Maintainability',
      'Debugging',
    ],
    icon: 'code',
  },
  {
    id: 'systems-infrastructure',
    title: 'Systems & Infrastructure',
    description:
      'Running applications on real servers, not only on a local machine.',
    items: [
      'Linux',
      'Docker',
      'Web server configuration',
      'Deployment operations',
    ],
    icon: 'server',
  },
  {
    id: 'software-delivery',
    title: 'Software Delivery',
    description: 'Getting changes out reliably and knowing when something breaks.',
    items: [
      'CI/CD workflows',
      'Environment configuration',
      'Troubleshooting',
      'Operational reliability',
    ],
    icon: 'workflow',
  },
]

export const selectedTechnologies = [
  'React',
  'TypeScript',
  'Vite',
  'Material UI',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Docker',
  'Nginx',
  'Linux',
  'GitHub Actions',
  'REST APIs',
]
