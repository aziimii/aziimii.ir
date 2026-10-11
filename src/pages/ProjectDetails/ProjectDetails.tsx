import { Box, Button, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { getProjectBySlug, projectCategories, projects } from '../../data/projects'
import { PageHeader } from '../../components/common/PageHeader'
import { ContentBlocks } from '../../components/common/ContentBlocks'
import { TagList, StatusChip } from '../../components/common/TagList'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'
import NotFound from '../NotFound/NotFound'

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return <NotFound />
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(currentIndex + 1) % projects.length]
  const statusTone = project.status === 'ongoing' ? 'warning' : 'success'

  return (
    <Box>
      <PageHeader
        path={`~/projects/${project.slug}`}
        title={project.title}
        description={project.summary}
        actions={
          <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
            <StatusChip
              label={project.statusLabel}
              tone={statusTone === 'warning' ? 'warning' : 'success'}
            />
            <TagList tags={project.categories.map(
              (id) => projectCategories.find((c) => c.id === id)?.label ?? id,
            )} ariaLabel="Project categories" />
          </Stack>
        }
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, lg: 6 },
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 300px' },
            alignItems: 'start',
          }}
        >
          {/* Main narrative */}
          <Box>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontSize: '1.05rem', mb: 4, maxWidth: 760 }}
            >
              {project.longSummary}
            </Typography>

            <Box
              component="nav"
              aria-label="Case study sections"
              sx={{
                mb: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2,
                bgcolor: 'background.paper',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: tokens.accent,
                  mb: 1.25,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                sections
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.sections.map((section, index) => (
                  <Box
                    key={section.id}
                    component="a"
                    href={`#${section.id}`}
                    sx={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: tokens.border,
                      '&:hover': { color: tokens.primary, borderColor: tokens.primary },
                    }}
                  >
                    {String(index + 1).padStart(2, '0')} · {section.heading}
                  </Box>
                ))}
              </Box>
            </Box>

            {project.sections.map((section) => (
              <Box
                key={section.id}
                component="section"
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                sx={{
                  py: { xs: 3, md: 4 },
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  scrollMarginTop: 90,
                }}
              >
                <Typography
                  id={`${section.id}-heading`}
                  variant="h2"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.35rem', md: '1.6rem' },
                    mb: 2.5,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 1.5,
                  }}
                >
                  <Box
                    component="span"
                    aria-hidden
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: tokens.accent }}
                  >
                    #{section.id}
                  </Box>
                  {section.heading}
                </Typography>
                <ContentBlocks blocks={section.blocks} />
              </Box>
            ))}

            {/* External links */}
            <Box sx={{ pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
              {project.links.length > 0 ? (
                <Stack spacing={1.5}>
                  {project.links.map((link) => (
                    <Stack key={link.href} direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                      <Button
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer noopener' : undefined}
                        endIcon={link.external ? <AppIcon icon="externalLink" size={14} /> : undefined}
                        variant="outlined"
                        sx={{
                          borderColor: tokens.border,
                          color: 'text.primary',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          '&:hover': { borderColor: tokens.primary },
                        }}
                      >
                        {link.label}
                      </Button>
                      {link.note && (
                        <Typography
                          sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'text.secondary' }}
                        >
                          {link.note}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    color: 'text.secondary',
                  }}
                >
                  No public links are published for this project yet.
                </Typography>
              )}
            </Box>
          </Box>

          {/* Sidebar */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 88 } }}>
            <Card sx={{ p: 2.5 }}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: tokens.accent,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 2,
                }}
              >
                project meta
              </Typography>
              <Box component="dl" sx={{ m: 0, display: 'grid', gap: 1.5 }}>
                {project.meta.map((row) => (
                  <Box key={row.label} component="div">
                    <Box
                      component="dt"
                      sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: tokens.textSecondary,
                      }}
                    >
                      {row.label}
                    </Box>
                    <Box component="dd" sx={{ m: 0, fontSize: '0.86rem', color: 'text.primary', mt: 0.25 }}>
                      {row.value}
                    </Box>
                  </Box>
                ))}
                <Box component="div">
                  <Box
                    component="dt"
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: tokens.textSecondary }}
                  >
                    role
                  </Box>
                  <Box component="dd" sx={{ m: 0, fontSize: '0.86rem', color: 'text.primary', mt: 0.25 }}>
                    {project.role}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 2.5, pt: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography
                  sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: tokens.textSecondary, mb: 1 }}
                >
                  technologies
                </Typography>
                <TagList tags={project.tags} ariaLabel="Technologies used" />
              </Box>
            </Card>

            <Card sx={{ p: 2.5, mt: 2, borderLeft: '3px solid', borderColor: tokens.warning }}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: tokens.warning,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                verification
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {project.verification}
              </Typography>
            </Card>

            <Stack spacing={1.25} sx={{ mt: 2.5 }}>
              <Box
                component={RouterLink}
                to="/projects"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: tokens.primary,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                }}
                aria-label="Back to all projects"
              >
                <AppIcon icon="arrowLeft" size={14} /> all projects
              </Box>
              <Box
                component={RouterLink}
                to={`/projects/${next.slug}`}
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: tokens.primary,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                }}
                aria-label={`Next case study: ${next.title}`}
              >
                next: {next.title} <AppIcon icon="arrowRight" size={14} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
