import { useEffect, useState } from 'react'
import { Box, Button, Card, Chip, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { contactChannels, resumePlaceholders, site } from '../../data/site'
import { experience, experienceNote } from '../../data/experience'
import { skillGroups } from '../../data/skills'
import { featuredProjects } from '../../data/projects'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'

const RESUME_PDF_PATH = '/assets/resume.pdf'

type PdfState = 'checking' | 'available' | 'missing'

function useResumePdf(): PdfState {
  const [state, setState] = useState<PdfState>('checking')

  useEffect(() => {
    let cancelled = false
    fetch(RESUME_PDF_PATH, { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) setState(response.ok ? 'available' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setState('missing')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

function ResumeHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <Typography
      id={id}
      variant="h2"
      component="h2"
      sx={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: tokens.primary,
        pb: 0.75,
        mb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {children}
    </Typography>
  )
}

function BulletList({ items, label }: { items: string[]; label: string }) {
  return (
    <Box
      component="ul"
      aria-label={label}
      sx={{ pl: 2.25, m: 0, display: 'grid', gap: 0.6 }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item}
          sx={{ color: 'text.secondary', fontSize: '0.92rem', '&::marker': { color: tokens.primary } }}
        >
          {item}
        </Box>
      ))}
    </Box>
  )
}

export default function Resume() {
  const pdfState = useResumePdf()
  useDocumentTitle(
    'Résumé — Ahmad Azimi',
    'Printable, ATS-friendly résumé of Ahmad Azimi: summary, technical skills, experience, and selected projects.',
  )

  const verifiedChannels = contactChannels.filter(
    (channel) => channel.status === 'verified' && Boolean(channel.href),
  )
  const placeholderChannels = contactChannels.filter((channel) => channel.status === 'placeholder')

  return (
    <Box>
      {/* Screen-only header with actions */}
      <Box className="no-print">
        <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 3 }}>
          <Typography
            variant="caption"
            component="p"
            sx={{ color: tokens.success, display: 'block', mb: 1.5 }}
          >
            ~/resume
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Résumé
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, maxWidth: 640 }}>
                An accessible HTML résumé designed for recruiters: readable on screen, clean when
                printed, and friendly to ATS text extraction.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {pdfState === 'available' && (
                <Button
                  component="a"
                  href={RESUME_PDF_PATH}
                  download="Ahmad-Azimi-Resume.pdf"
                  variant="contained"
                  startIcon={<AppIcon icon="download" size={16} />}
                  aria-label="Download the résumé as a PDF file"
                >
                  Download Résumé (PDF)
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => window.print()}
                startIcon={<AppIcon icon="printer" size={16} />}
                aria-label="Print this résumé page"
                sx={{
                  borderColor: tokens.border,
                  color: 'text.primary',
                  '&:hover': { borderColor: tokens.primary },
                }}
              >
                Print
              </Button>
            </Stack>
          </Stack>

          <Box
            role="status"
            sx={{
              mt: 3,
              border: '1px solid',
              borderLeft: '3px solid',
              borderLeftColor: pdfState === 'available' ? tokens.success : tokens.warning,
              borderRadius: 2,
              p: 2,
              bgcolor: 'background.paper',
              maxWidth: 720,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: pdfState === 'available' ? tokens.success : tokens.warning,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {pdfState === 'checking'
                ? 'checking PDF asset…'
                : pdfState === 'available'
                  ? 'PDF ready'
                  : 'PDF not generated yet'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
              {pdfState === 'available'
                ? 'The download button links to a real, text-based PDF at public/assets/resume.pdf. The Print button produces the same content via print styles.'
                : 'No download link is shown because the file does not exist yet. Generate it with "npm run build && npm run resume:pdf" — the button appears automatically once the file is in place.'}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Printable résumé sheet */}
      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
        <Card className="print-sheet" sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 2 }}>
          {/* Identity */}
          <Box component="header" sx={{ mb: 4 }}>
            <Typography
              variant="h1"
              component="h2"
              sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: 700, lineHeight: 1.15 }}
            >
              {site.name}
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: { xs: '0.82rem', md: '0.9rem' },
                color: tokens.primary,
              }}
            >
              {site.positioning}
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              gap={1.5}
              sx={{
                mt: 2.5,
                '& a, & span': {
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'text.secondary',
                  textDecoration: 'none',
                },
              }}
            >
              {verifiedChannels.map((channel) => {
                const href = channel.href ?? ''
                return href.startsWith('/') ? (
                  <Box key={channel.id} component={RouterLink} to={href}>
                    {channel.label}: {channel.value}
                  </Box>
                ) : (
                  <Box
                    key={channel.id}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {channel.label}: {channel.value}
                  </Box>
                )
              })}
              {placeholderChannels.map((channel) => (
                <Box component="span" key={channel.id}>
                  {channel.label}: <Box component="span" sx={{ color: tokens.warning }}>{channel.value}</Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Summary */}
          <Box component="section" aria-labelledby="resume-summary" sx={{ mb: 4 }}>
            <ResumeHeading id="resume-summary">Professional summary</ResumeHeading>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Software engineer with IT infrastructure roots in systems and network administration,
              now focused on application development. Builds backend APIs and services with Node.js
              and NestJS, models data in PostgreSQL, and connects them to React and TypeScript
              frontends — then deploys and operates the whole system on Linux with Docker, Docker
              Compose, and Nginx. That cross-layer background turns into engineering outcomes:
              services designed to behave predictably in production, repeatable deployments, and
              debugging that spans application code, networks, and servers. The Sherafat Gold
              Platform — a React frontend behind a NestJS API gateway, with multiple backend
              services, PostgreSQL databases, and a Docker Compose deployment — is the clearest
              example of that end-to-end work.
            </Typography>
          </Box>

          {/* Skills */}
          <Box component="section" aria-labelledby="resume-skills" sx={{ mb: 4 }}>
            <ResumeHeading id="resume-skills">Technical skills</ResumeHeading>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' } }}>
              {skillGroups.map((group) => (
                <Box key={group.id}>
                  <Typography
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: tokens.accent, mb: 0.75 }}
                  >
                    {group.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {group.items.join(' · ')}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography
              sx={{ mt: 2, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: tokens.textSecondary }}
            >
              No proficiency ratings or year counts are listed, because none are verified.
            </Typography>
          </Box>

          {/* Experience */}
          <Box component="section" aria-labelledby="resume-experience" sx={{ mb: 4 }}>
            <ResumeHeading id="resume-experience">Professional experience</ResumeHeading>
            {experience.map((entry) => (
              <Box key={entry.id} sx={{ mb: 3 }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={1}
                  alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                >
                  <Box>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.05rem' }}>
                      {entry.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.92rem', color: tokens.primary, mt: 0.25 }}>
                      {entry.employer}
                      {entry.employerLocal ? ` (${entry.employerLocal})` : ''} · {entry.arrangement}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'text.secondary' }}
                  >
                    {entry.startLabel} – {entry.endLabel}
                  </Typography>
                </Stack>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                  {entry.summary}
                </Typography>

                <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75} sx={{ mt: 1.5 }}>
                  {entry.responsibilities.map((item) => (
                    <Chip key={item} label={item} size="small" variant="outlined" sx={{ color: 'text.secondary' }} />
                  ))}
                </Stack>

                <Box sx={{ mt: 1.75 }}>
                  <BulletList items={entry.bullets} label={`Key contributions at ${entry.employer}`} />
                </Box>

                <Typography
                  sx={{
                    mt: 1.25,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: tokens.textSecondary,
                  }}
                >
                  {entry.verification}
                </Typography>
              </Box>
            ))}
            <Box
              sx={{
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1.5,
                p: 2,
              }}
            >
              <Typography
                sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: tokens.warning }}
              >
                note
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {experienceNote}
              </Typography>
            </Box>
          </Box>

          {/* Projects */}
          <Box component="section" aria-labelledby="resume-projects" sx={{ mb: 4 }}>
            <ResumeHeading id="resume-projects">Selected projects</ResumeHeading>
            <Box sx={{ display: 'grid', gap: 2.5 }}>
              {featuredProjects.map((project) => (
                <Box key={project.slug}>
                  <Stack direction="row" spacing={1.5} alignItems="baseline" flexWrap="wrap" useFlexGap>
                    <Typography variant="h3" component="h3" sx={{ fontSize: '0.98rem' }}>
                      {project.title}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: tokens.textSecondary }}
                    >
                      {project.role} · {project.statusLabel}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {project.summary}
                  </Typography>
                  <Typography
                    sx={{ mt: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: tokens.accent }}
                  >
                    {project.tags.join(' · ')}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Placeholders that need verified source material */}
          <Box component="section" aria-labelledby="resume-to-complete" sx={{ mb: 4 }}>
            <ResumeHeading id="resume-to-complete">Sections awaiting verified information</ResumeHeading>
            <Box sx={{ display: 'grid', gap: 1.5 }}>
              {resumePlaceholders.map((item) => (
                <Box
                  key={item.section}
                  sx={{
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    p: 2,
                  }}
                >
                  <Typography
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: tokens.warning }}
                  >
                    {item.section} — to be completed
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {item.note}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Additional info */}
          <Box component="section" aria-labelledby="resume-additional">
            <ResumeHeading id="resume-additional">Additional information</ResumeHeading>
            <Box component="ul" aria-label="Additional information" sx={{ pl: 2.25, m: 0, display: 'grid', gap: 0.6 }}>
              <Box component="li" sx={{ color: 'text.secondary', fontSize: '0.92rem', '&::marker': { color: tokens.primary } }}>
                {site.careerInterest}
              </Box>
              <Box component="li" sx={{ color: 'text.secondary', fontSize: '0.92rem', '&::marker': { color: tokens.primary } }}>
                Works comfortably in remote, distributed settings — the most recent role was fully
                remote.
              </Box>
              <Box component="li" sx={{ color: 'text.secondary', fontSize: '0.92rem', '&::marker': { color: tokens.primary } }}>
                Written technical documentation alongside code: architecture, development, and
                deployment guides.
              </Box>
            </Box>
          </Box>

          <Box
            className="no-print"
            sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
          >
            <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'text.secondary' }}>
              Full case studies with architecture detail:{' '}
              <RouterLink to="/projects">/projects</RouterLink> · engineering notes:{' '}
              <RouterLink to="/notes">/notes</RouterLink>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}
