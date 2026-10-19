import type { ContactChannel, NavItem, ResumePlaceholder } from './types'

/**
 * Central site copy and identity. Everything editable lives in src/data/*.
 */

export const site = {
  name: 'Ahmad Azimi',
  role: 'Software Engineer',
  positioning:
    'Software Engineer | Application Development | Systems & Infrastructure',
  shortPositioning: 'Application Dev · Systems · Infrastructure',
  careerInterest:
    'Open to international, remote, and relocation opportunities.',
  baseTitle: 'Ahmad Azimi — Software Engineer',
  baseUrl: 'https://aziimii.ir/',
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    icon: 'home',
    title: 'Home',
    description:
      'Ahmad Azimi — software engineer focused on application development, backend APIs, systems, and infrastructure.',
  },
  {
    id: 'about',
    label: 'About Me',
    to: '/about',
    icon: 'user',
    title: 'About',
    description:
      'Professional background, engineering principles, technical focus areas, and career interests of Ahmad Azimi.',
  },
  {
    id: 'projects',
    label: 'Projects',
    to: '/projects',
    icon: 'layers',
    title: 'Projects',
    description:
      'Case studies covering frontend applications, backend services, APIs, and deployment workflows.',
  },
  {
    id: 'resume',
    label: 'Résumé',
    to: '/resume',
    icon: 'fileText',
    title: 'Résumé',
    description:
      'Printable, ATS-friendly résumé covering engineering experience, skills, and selected projects.',
  },
  {
    id: 'notes',
    label: 'Notes',
    to: '/notes',
    icon: 'notebook',
    title: 'Engineering Notes',
    description:
      'Technical notes about frontend architecture, backend development, deployments, and software engineering practices.',
  },
  {
    id: 'contact',
    label: 'Contact',
    to: '/contact',
    icon: 'mail',
    title: 'Contact',
    description:
      'Ways to contact Ahmad Azimi about software engineering opportunities and technical collaboration.',
  },
]

export const hero = {
  eyebrow: 'SOFTWARE ENGINEER / APP DEVELOPMENT / SYSTEMS & INFRASTRUCTURE',
  heading: 'Building reliable software across the stack.',
  paragraph:
    "I started in IT infrastructure — systems and network administration — and moved into software engineering, so I build applications with production already in mind. Today that means designing backend APIs and services with Node.js and NestJS, modelling data in PostgreSQL, and connecting them to React and TypeScript frontends — then deploying and operating the whole thing on Linux with Docker, Compose, and Nginx. Having run the infrastructure myself, I care about the outcomes it buys: services that behave predictably in production, deployments that are repeatable, and debugging that goes all the way down to the network.",
  primaryCta: { label: 'Explore Projects', to: '/projects' },
  secondaryCta: { label: 'View Résumé', to: '/resume' },
  statusLine: 'Interested in international and remote opportunities.',
  availabilityNote:
    'Availability for new roles is confirmed case by case — treat the line above as a general career interest, not a commitment.',
}

export const approach = {
  heading: 'Engineering means understanding the whole system.',
  copy:
    'I believe good software requires more than writing isolated pieces of code. My experience across frontend applications, backend services, APIs, databases, Linux environments, and deployment workflows helps me understand software as a complete system — from user experience to production operation.',
}

export const closingCta = {
  heading: 'Have a challenging engineering problem?',
  copy:
    "I'm interested in working with teams that build meaningful products, solve complex technical problems, and care about software quality.",
  button: 'Get in Touch',
  to: '/contact',
}

export const about = {
  paragraphs: [
    "I'm a software engineer with experience across frontend development, backend services, and infrastructure. My journey started with systems and network administration, which shaped the way I think about reliability, performance, and real-world software operations.",
    'I build web applications with modern frontend technologies while also working with backend APIs, databases, authentication flows, server environments, and deployment workflows. I enjoy connecting different parts of a system and making them work together reliably.',
    "I'm interested in engineering environments where thoughtful architecture, clean implementation, collaboration, and continuous improvement are valued.",
  ],
  principles: [
    {
      title: 'Understand the whole system',
      text:
        'Consider user experience, application logic, infrastructure, and operational needs together when designing software.',
    },
    {
      title: 'Break complex problems down',
      text:
        'Turn large technical challenges into smaller, understandable pieces that can be solved and improved step by step.',
    },
    {
      title: 'Build maintainable software',
      text:
        'Keep architecture, naming, and code boundaries clear so future changes remain predictable and safe.',
    },
    {
      title: 'Think beyond development',
      text:
        'Understand how applications are deployed, monitored, secured, and maintained in real environments.',
    },
    {
      title: 'Verify before claiming',
      text:
        'Test behaviour, investigate errors, and separate confirmed facts from assumptions.',
    },
    {
      title: 'Keep learning',
      text:
        'Continuously explore new technologies and improve engineering practices through real-world experience.',
    },
  ],
  focusAreas: [
    {
      title: 'Frontend engineering',
      text:
        'React and TypeScript applications, component architecture, responsive interfaces, routing, forms, state management, and API integration.',
    },
    {
      title: 'Backend development',
      text:
        'Backend services, REST APIs, authentication, database integration, business logic, and scalable application structure.',
    },
    {
      title: 'Systems and infrastructure',
      text:
        'Linux servers, Docker and Compose environments, reverse proxies, TLS configuration, networking, and production troubleshooting.',
    },
    {
      title: 'Software delivery',
      text:
        'Deployment workflows, CI/CD practices, environment management, debugging, monitoring, and improving software reliability.',
    },
  ],
  careerInterests: [
    'Software engineering roles combining application development with systems and infrastructure responsibilities.',
    'Product teams that value maintainable architecture and thoughtful technical decisions.',
    'Remote-first or internationally distributed engineering teams.',
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
    icon: 'mail',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    value: '+989354106998',
    href: 'tel:+989354106998',
    status: 'verified',
    icon: 'mobile',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/aziimii/',
    href: 'https://www.linkedin.com/in/aziimii/',
    status: 'verified',
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
  heading: 'Let’s build something together',
  intro:
    'The best way to reach me is email or LinkedIn. I am interested in software engineering opportunities involving application development, backend APIs, systems, and infrastructure. I enjoy discussing architecture, technical challenges, and building reliable products.',
  note:
    'This site is a personal portfolio showcasing my engineering experience, projects, and technical interests.',
}

export const resumePlaceholders: ResumePlaceholder[] = [
  {
    section: 'Education',
    note:
      'Degrees, institutions, and graduation dates will be added from verified information.',
  },
  {
    section: 'Languages',
    note:
      'Language proficiency will be listed based on verified information.',
  },
  {
    section: 'Certifications',
    note:
      'Only verified certifications and professional credentials will be included.',
  },
  {
    section: 'Earlier experience',
    note:
      'Previous roles, responsibilities, and timelines will be added from verified career records.',
  },
]

export const seoDefaults = {
  title: site.baseTitle,
  description:
    'Portfolio of Ahmad Azimi, a software engineer working in application development — backend APIs, deployment tooling, and systems & infrastructure — with roots in IT infrastructure.',
}