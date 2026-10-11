import { useMemo, useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { filterProjects, projectCategories, projects } from '../../data/projects'
import { PageHeader } from '../../components/common/PageHeader'
import { ProjectCard } from '../../components/projects/ProjectCard'
import { ProjectFilters } from '../../components/projects/ProjectFilters'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        p: { xs: 4, md: 6 },
        textAlign: 'center',
      }}
    >
      <Box sx={{ color: tokens.textSecondary, display: 'flex', justifyContent: 'center', mb: 2 }}>
        <AppIcon icon="search" size={26} />
      </Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem' }}>
        No projects match this filter
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5, mx: 'auto', maxWidth: 420 }}>
        Try a different search term, or reset the filters to see all published case studies.
      </Typography>
      <Button
        onClick={onReset}
        variant="outlined"
        sx={{
          mt: 3,
          borderColor: tokens.border,
          color: 'text.primary',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          '&:hover': { borderColor: tokens.primary },
        }}
      >
        reset filters
      </Button>
    </Box>
  )
}

export default function Projects() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(
    () => filterProjects(projects, query, category),
    [query, category],
  )

  const handleReset = () => {
    setQuery('')
    setCategory('all')
  }

  return (
    <Box>
      <PageHeader
        path="~/projects"
        title="Projects"
        description="Case studies covering frontend engineering, full-stack delivery, and systems and deployment work. Filters run over real project metadata — categories, tags, and roles."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <ProjectFilters
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          categories={projectCategories}
          resultCount={filtered.length}
          totalCount={projects.length}
        />

        {filtered.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Box>
        )}

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box
            component={RouterLink}
            to="/resume"
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: tokens.primary,
              textDecoration: 'none',
              display: 'inline-flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <AppIcon icon="arrowLeft" size={14} /> résumé
          </Box>
          <Box
            component={RouterLink}
            to="/notes"
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: tokens.primary,
              textDecoration: 'none',
              display: 'inline-flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            engineering notes <AppIcon icon="arrowRight" size={14} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
