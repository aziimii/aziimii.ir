import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  FolderGit2,
  GitBranch,
  Globe,
  GraduationCap,
  Home,
  Layers,
  Link as LinkIcon,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Notebook,
  Printer,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
  Workflow,
  Wrench,
  X,
  type LucideProps,
} from 'lucide-react'
import type { IconKey } from '../../data/types'
import { Box } from '@mui/material'

/**
 * GitHub and LinkedIn marks are inlined because lucide-react v1 no longer
 * ships brand icons. Both marks are drawn from the public-domain simple-icons
 * set; everything else comes from lucide.
 */

function BrandSvg({
  path,
  size = 18,
  title,
}: {
  path: string
  size?: number
  title: string
}) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      role="img"
      aria-label={title}
      focusable="false"
      sx={{ display: 'inline-block', flexShrink: 0, verticalAlign: 'middle' }}
    >
      <path d={path} />
    </Box>
  )
}

const GITHUB_PATH =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'

const LUCIDE_MAP: Partial<Record<IconKey, React.ComponentType<LucideProps>>> = {
  home: Home,
  user: User,
  layers: Layers,
  fileText: FileText,
  notebook: Notebook,
  mail: Mail,
  monitor: Monitor,
  server: Server,
  gitBranch: GitBranch,
  terminal: Terminal,
  code: Code,
  database: Database,
  rocket: Rocket,
  checkCircle: CheckCircle,
  alert: AlertCircle,
  link: LinkIcon,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  search: Search,
  filter: Filter,
  download: Download,
  printer: Printer,
  externalLink: ExternalLink,
  mapPin: MapPin,
  clock: Clock,
  bookOpen: BookOpen,
  globe: Globe,
  briefcase: Briefcase,
  graduationCap: GraduationCap,
  send: Send,
  menu: Menu,
  x: X,
  chevronRight: ChevronRight,
  sparkles: Sparkles,
  wrench: Wrench,
  shieldCheck: ShieldCheck,
  workflow: Workflow,
}

export interface AppIconProps extends LucideProps {
  icon: IconKey
  /** Accessible label when the icon is the only content of a control. */
  title?: string
}

export function AppIcon({ icon, title, ...rest }: AppIconProps) {
  const size = rest.size ?? 18

  if (icon === 'github') {
    return <BrandSvg path={GITHUB_PATH} size={Number(size)} title={title ?? 'GitHub'} />
  }
  if (icon === 'linkedin') {
    return <BrandSvg path={LINKEDIN_PATH} size={Number(size)} title={title ?? 'LinkedIn'} />
  }

  const Component = LUCIDE_MAP[icon] ?? FolderGit2
  return <Component aria-hidden={title ? undefined : true} aria-label={title} {...rest} />
}

export default AppIcon
