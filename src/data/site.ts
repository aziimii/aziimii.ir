import type { ContactChannel, NavItem, ResumePlaceholder } from './types'

/**
 * Central site copy and identity. Everything editable lives in src/data/*.
 */

export const site = {
  name: 'Ahmad Azimi',
  role: 'Software Engineer',
  positioning: 'Software Engineer | Frontend Engineering | Systems & DevOps',
  shortPositioning: 'Frontend · Systems · DevOps',
  careerInterest:
    'Open to international, remote, and relocation opportunities.',
  baseTitle: 'Ahmad Azimi — Software Engineer',
  baseUrl: 'https://aziimii.ir/', // Set to the production origin (e.g. "https://example.com") to enable absolute OG URLs.
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    icon: 'home',
    title: 'Home',
    description:
      'Ahmad Azimi — software engineer focused on frontend engineering, systems, and DevOps.',
  },
  {
    id: 'about',
    label: 'About',
    to: '/about',
    icon: 'user',
    title: 'About',
    description:
      'Professional narrative, engineering principles, technical focus areas, and career interests of Ahmad Azimi.',
  },
  {
    id: 'projects',
    label: 'Projects',
    to: '/projects',
    icon: 'layers',
    title: 'Projects',
    description:
      'Case studies covering frontend engineering, full-stack delivery, and systems and deployment work.',
  },
  {
    id: 'resume',
    label: 'Résumé',
    to: '/resume',
    icon: 'fileText',
    title: 'Résumé',
    description:
      'Printable, ATS-friendly résumé: summary, skills, experience, and selected projects.',
  },
  {
    id: 'notes',
    label: 'Notes',
    to: '/notes',
    icon: 'notebook',
    title: 'Engineering Notes',
    description:
      'Draft topics on maintainable React applications, deployments, API debugging, and CI/CD.',
  },
  {
    id: 'contact',
    label: 'Contact',
    to: '/contact',
    icon: 'mail',
    title: 'Contact',
    description:
      'Ways to get in touch with Ahmad Azimi about frontend, systems, and software delivery work.',
  },
]

export const hero = {
  eyebrow: 'SOFTWARE ENGINEER / ENGINEERING WORKSPACE',
  heading: 'Building software with engineering discipline.',
  paragraph:
    "I'm a software engineer with a background in systems and network administration and extensive experience in frontend development. I enjoy building reliable applications, designing maintainable interfaces, and solving problems across the software stack.",
  primaryCta: { label: 'Explore Projects', to: '/projects' },
  secondaryCta: { label: 'View Résumé', to: '/resume' },
  statusLine: 'Interested in international and remote opportunities.',
  availabilityNote:
    'Availability for new roles is confirmed case by case — treat the line above as a general career interest, not a commitment.',
}

export const approach = {
  heading: 'Good engineering goes beyond writing code.',
  copy: 'I value clear architecture, maintainable implementations, reliable delivery, and understanding how applications behave in real environments. My background across frontend development and systems administration helps me approach software from both the user interface and operational perspectives.',
}

export const closingCta = {
  heading: 'Have an interesting engineering problem?',
  copy: "I'm interested in connecting with teams building useful products and reliable software.",
  button: 'Get in Touch',
  to: '/contact',
}

export const about = {
  paragraphs: [
    "I'm a software engineer whose experience spans frontend development and systems and network administration. I enjoy understanding how a product works as a whole—from the user interface and application structure to APIs, deployment, and operational concerns.",
    'I approach engineering by breaking complex problems into manageable parts, choosing practical solutions, and keeping maintainability in mind.',
    "I'm particularly interested in teams that value thoughtful technical decisions, collaboration, continuous learning, and software that solves real problems.",
  ],
  principles: [
    {
      title: 'Break problems down',
      text: 'Split complex requirements into small, independently understandable parts before writing code.',
    },
    {
      title: 'Choose practical solutions',
      text: 'Prefer the simplest approach that satisfies the real constraints — reliability, time, and maintainability.',
    },
    {
      title: 'Design for maintainability',
      text: 'Keep structure, naming, and boundaries clear so the next change is cheap and safe.',
    },
    {
      title: 'Think in operations',
      text: 'Consider how software is deployed, observed, and repaired in real environments, not only how it runs locally.',
    },
    {
      title: 'Verify before claiming',
      text: 'Test behaviour, read error output, and separate what is confirmed from what is assumed.',
    },
    {
      title: 'Keep learning',
      text: 'Treat unfamiliar systems as a normal part of the job and document what is learned along the way.',
    },
  ],
  focusAreas: [
    {
      title: 'Frontend engineering',
      text: 'Component-based React and TypeScript interfaces, responsive layouts, routing, forms, and API integration.',
    },
    {
      title: 'Application structure',
      text: 'Organising code so features, services, and state are easy to locate, test, and extend.',
    },
    {
      title: 'Systems and infrastructure',
      text: 'Linux servers, Docker and Compose environments, web server configuration, TLS, and reverse proxies.',
    },
    {
      title: 'Delivery and operations',
      text: 'CI/CD workflows, environment configuration, deployment automation, troubleshooting, and website security.',
    },
  ],
  careerInterests: [
    'Frontend engineering roles with room to own application structure.',
    'Product teams that value maintainable code and thoughtful technical decisions.',
    'Remote-first or internationally distributed teams.',
    'Opportunities that could support relocation abroad.',
  ],
}

export const contactChannels: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'azimi.ahmad@outlook.com',
    href: 'mailto:azimi.ahmad@outlook.com',
    status: 'verified',
    // note: 'Add the real address in src/data/site.ts (contactChannels) before publishing.',
    icon: 'mail',
  },
    {
    id: 'mobile',
    label: 'Mobile',
    value: '+989354106998',
    href: 'tel:+989354106998',
    status: 'verified',
    // note: 'Add the real address in src/data/site.ts (contactChannels) before publishing.',
    icon: 'mobile',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/aziimii/',
    href: 'https://www.linkedin.com/in/aziimii/',
    status: 'verified',
    // note: 'Add the verified profile URL in src/data/site.ts (contactChannels).',
    icon: 'linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/aziimii',
    href: 'https://github.com/aziimii',
    status: 'verified',
    note: 'Public profile verified at build time.',
    icon: 'github',
  },
  {
    id: 'resume',
    label: 'Portfolio Résumé',
    value: 'Online résumé (this site)',
    href: '/resume',
    status: 'verified',
    icon: 'fileText',
  },
]

export const contactPage = {
  heading: 'Get in touch',
  intro: 'The fastest way to reach me is email or LinkedIn. I am interested in international, remote, and relocation-friendly engineering roles, and I am happy to talk through projects, architecture decisions, or frontend and infrastructure work in more detail.',
  note: 'This site is static and has no backend, so there is no contact form here — the channels below link directly to real destinations once configured.',
}

export const resumePlaceholders: ResumePlaceholder[] = [
  {
    section: 'Education',
    note: 'Degrees, institutions, and graduation dates must come from verified source material before this section is filled in.',
  },
  {
    section: 'Languages',
    note: 'Language proficiency has not been verified and is intentionally left unlisted rather than guessed.',
  },
  {
    section: 'Certifications',
    note: 'No certifications are claimed here. Add only those that can be verified.',
  },
  {
    section: 'Earlier experience',
    note: 'Employers, titles, and dates before September 2025 will be added once verified records are available.',
  },
]

export const seoDefaults = {
  title: site.baseTitle,
  description:
    'Portfolio of Ahmad Azimi, a software engineer focused on frontend engineering, application development, systems and DevOps. Projects, engineering notes, and résumé.',
}
