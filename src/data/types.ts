/** Shared typed content models for the portfolio. */

export type IconKey =
  | 'home'
  | 'user'
  | 'layers'
  | 'fileText'
  | 'notebook'
  | 'mail'
  | 'monitor'
  | 'server'
  | 'gitBranch'
  | 'terminal'
  | 'code'
  | 'database'
  | 'rocket'
  | 'checkCircle'
  | 'alert'
  | 'link'
  | 'arrowRight'
  | 'arrowLeft'
  | 'search'
  | 'filter'
  | 'download'
  | 'printer'
  | 'externalLink'
  | 'github'
  | 'linkedin'
  | 'mapPin'
  | 'clock'
  | 'bookOpen'
  | 'globe'
  | 'briefcase'
  | 'graduationCap'
  | 'send'
  | 'menu'
  | 'x'
  | 'chevronRight'
  | 'sparkles'
  | 'wrench'
  | 'shieldCheck'
  | 'workflow'
  |  'mobile'

export interface NavItem {
  id: string
  label: string
  to: string
  icon: IconKey
  title: string
  description: string
}

export type ProjectCategoryId =
  | 'frontend'
  | 'full-stack'
  | 'infrastructure'
  | 'architecture'

export interface ProjectCategory {
  id: ProjectCategoryId
  label: string
  description: string
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'kv'; rows: { label: string; value: string }[] }
  | { type: 'code'; caption?: string; code: string }
  | { type: 'note'; tone?: 'info' | 'warning' | 'success'; text: string }
  | { type: 'flow'; steps: string[] }

export interface CaseStudySection {
  id: string
  heading: string
  blocks: ContentBlock[]
}

export interface ProjectLink {
  label: string
  href: string
  external: boolean
  note?: string
}

export interface Project {
  slug: string
  title: string
  eyebrow: string
  summary: string
  longSummary: string
  categories: ProjectCategoryId[]
  tags: string[]
  status: 'ongoing' | 'selected-work'
  statusLabel: string
  role: string
  featured: boolean
  meta: { label: string; value: string }[]
  verification: string
  sections: CaseStudySection[]
  links: ProjectLink[]
}

export interface ExperienceEntry {
  id: string
  employer: string
  employerLocal?: string
  title: string
  arrangement: string
  startLabel: string
  endLabel: string
  start: string
  end: string
  current: boolean
  summary: string
  responsibilities: string[]
  bullets: string[]
  verification: string
}

export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export interface Capability {
  id: string
  title: string
  description: string
  items: string[]
  icon: IconKey
}

export interface NoteSection {
  heading: string
  points: string[]
}

export interface Note {
  slug: string
  title: string
  summary: string
  tags: string[]
  status: 'draft'
  statusLabel: string
  publishedOn: string | null
  outline: NoteSection[]
}

export interface ContactChannel {
  id: string
  label: string
  value: string
  href: string | null
  status: 'verified' | 'placeholder'
  note?: string
  icon: IconKey
}

export interface ResumePlaceholder {
  section: string
  note: string
}
