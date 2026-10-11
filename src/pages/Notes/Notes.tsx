import { Box, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { notes, publishedNotes } from '../../data/notes'
import { PageHeader } from '../../components/common/PageHeader'
import { TagList, StatusChip } from '../../components/common/TagList'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'

export default function Notes() {
  return (
    <Box>
      <PageHeader
        path="~/notes"
        title="Engineering Notes"
        description="Short technical writing on frontend design, deployment, API debugging, and delivery — currently a set of clearly marked draft topics."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        {/* Honest empty state: nothing is published yet. */}
        <Box
          role="status"
          sx={{
            border: '1px solid',
            borderColor: tokens.border,
            borderLeft: '3px solid',
            borderLeftColor: tokens.warning,
            borderRadius: 2,
            p: { xs: 2.5, md: 3 },
            bgcolor: 'background.paper',
            mb: 4,
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ color: tokens.warning, display: 'flex', pt: '0.15rem' }}>
            <AppIcon icon="alert" size={18} />
          </Box>
          <Box>
            <Typography variant="h3" component="h3" sx={{ fontSize: '1.02rem' }}>
              {publishedNotes.length === 0
                ? 'No published articles yet'
                : `${publishedNotes.length} article${publishedNotes.length === 1 ? '' : 's'} published`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Everything below is an unpublished draft topic — an outline for a future article, not
              published personal writing. When a full article is written, it will appear here with a
              real publication date, readable code blocks, and its own page.
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="overline"
          component="h2"
          sx={{ color: tokens.accent, display: 'block', mb: 2 }}
        >
          DRAFT TOPICS ({notes.length})
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {notes.map((note) => (
            <Card
              key={note.slug}
              component="article"
              sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', '&:hover': { borderColor: tokens.accent } }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
                <StatusChip label={note.statusLabel} tone="warning" />
                <Typography
                  sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: tokens.textSecondary }}
                >
                  date: pending
                </Typography>
              </Stack>

              <Typography variant="h3" component="h3" sx={{ mt: 2, fontSize: '1.2rem' }}>
                <Box
                  component={RouterLink}
                  to={`/notes/${note.slug}`}
                  sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { color: tokens.accent } }}
                >
                  {note.title}
                </Box>
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.25, flex: 1 }}>
                {note.summary}
              </Typography>

              <TagList tags={note.tags} ariaLabel="Topics" sx={{ mt: 2.5 }} />

              <Box
                component={RouterLink}
                to={`/notes/${note.slug}`}
                aria-label={`Read the outline: ${note.title}`}
                sx={{
                  mt: 2.5,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: tokens.accent,
                  textDecoration: 'none',
                }}
              >
                read the outline
                <AppIcon icon="arrowRight" size={14} />
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
