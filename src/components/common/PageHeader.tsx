import type { ReactNode } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { tokens } from '../../app/theme'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export interface SectionProps {
  children: ReactNode
  id?: string
  /** Removes the max-width container (for full-bleed sections). */
  wide?: boolean
  sx?: object
}

export function Section({ children, id, wide = false, sx }: SectionProps) {
  const inner = (
    <Box
      component="section"
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      sx={{ py: { xs: 6, md: 9 }, ...sx }}
    >
      {children}
    </Box>
  )

  if (wide) return inner
  return <Container maxWidth="lg">{inner}</Container>
}

export interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        mb: { xs: 3.5, md: 5 },
        maxWidth: 760,
        mx: align === 'center' ? 'auto' : undefined,
        textAlign: align === 'center' ? 'center' : 'left',
      }}
    >
      {eyebrow && (
        <Typography
          variant="overline"
          component="p"
          sx={{
            color: tokens.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{ width: 18, height: 1, bgcolor: tokens.primary }}
          />
          {eyebrow}
        </Typography>
      )}
      <Typography
        variant="h2"
        component="h2"
        id={id ? `${id}-heading` : undefined}
        sx={{ mt: eyebrow ? 1 : 0, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mt: 1.5, fontSize: { xs: '1rem', md: '1.05rem' } }}
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}

export interface PageHeaderProps {
  /** Mono-style breadcrumb path, e.g. "~/projects". */
  path: string
  title: string
  description: string
  /** Document/tab title override when it differs from the on-page h1. */
  metaTitle?: string
  actions?: ReactNode
}

/**
 * Shared page header: breadcrumb, unique h1, description, and the document
 * title / meta description for the route.
 */
export function PageHeader({ path, title, description, metaTitle, actions }: PageHeaderProps) {
  useDocumentTitle(`${metaTitle ?? title} — Ahmad Azimi`, description)

  return (
    <Box
      sx={{
        pt: { xs: 5, md: 7 },
        pb: { xs: 4, md: 5 },
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        backgroundImage:
          'linear-gradient(rgba(48,54,61,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.18) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="caption"
          component="p"
          sx={{ color: tokens.success, mb: 1.5, display: 'block' }}
        >
          {path}
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, maxWidth: 900 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mt: 2, maxWidth: 760, fontSize: { xs: '1rem', md: '1.075rem' } }}
        >
          {description}
        </Typography>
        {actions && <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>{actions}</Box>}
      </Container>
    </Box>
  )
}

export default PageHeader
