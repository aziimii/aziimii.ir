import { Box, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { getNoteBySlug } from '../../data/notes'
import { PageHeader } from '../../components/common/PageHeader'
import { StatusChip, TagList } from '../../components/common/TagList'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'
import NotFound from '../NotFound/NotFound'

export default function NoteDetails() {
  const { slug } = useParams<{ slug: string }>()
  const note = slug ? getNoteBySlug(slug) : undefined

  if (!note) {
    return <NotFound />
  }

  return (
    <Box>
      <PageHeader
        path={`~/notes/${note.slug}`}
        title={note.title}
        description={note.summary}
        actions={<StatusChip label={note.statusLabel} tone="warning" />}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ maxWidth: 780 }}>
          <Card
            sx={{
              p: 2.5,
              borderLeft: '3px solid',
              borderColor: tokens.warning,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: tokens.warning,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              unpublished draft
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              This page is an outline for an article that has not been written yet. It is published
              as a draft topic so readers can see what is planned — it is not presented as completed
              work, and it carries no publication date because none exists.
            </Typography>
          </Card>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            {note.summary}
          </Typography>

          <Typography variant="overline" component="p" sx={{ color: tokens.accent }}>
            PLANNED OUTLINE
          </Typography>

          <Box sx={{ mt: 2, display: 'grid', gap: 2.5 }}>
            {note.outline.map((section, index) => (
              <Box
                key={section.heading}
                component="section"
                aria-label={section.heading}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2.5,
                  bgcolor: 'background.paper',
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="baseline">
                  <Typography
                    component="span"
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: tokens.accent }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h3" component="h3" sx={{ fontSize: '1.05rem' }}>
                    {section.heading}
                  </Typography>
                </Stack>
                <Box
                  component="ul"
                  sx={{
                    listStyle: 'none',
                    pl: 0,
                    mt: 1.5,
                    mb: 0,
                    display: 'grid',
                    gap: 0.75,
                  }}
                >
                  {section.points.map((point) => (
                    <Box
                      component="li"
                      key={point}
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        display: 'flex',
                        gap: 1.25,
                        alignItems: 'flex-start',
                        '&::before': {
                          content: '"—"',
                          fontFamily: 'var(--font-mono)',
                          color: tokens.textSecondary,
                        },
                      }}
                    >
                      {point}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <TagList tags={note.tags} ariaLabel="Topics" sx={{ mt: 3.5 }} />

          <Box
            component={RouterLink}
            to="/notes"
            sx={{
              mt: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: tokens.primary,
              textDecoration: 'none',
            }}
            aria-label="Back to engineering notes"
          >
            <AppIcon icon="arrowLeft" size={14} /> all engineering notes
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
