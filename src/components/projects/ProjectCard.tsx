import { Box, Card, Chip, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../common/Stack'
import type { Project } from '../../data/types'
import { tokens } from '../../app/theme'
import { TagList } from '../common/TagList'
import { AppIcon } from '../common/AppIcon'

export interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusTone = project.status === 'ongoing' ? 'warning' : 'success'

  return (
    <Card
      component="article"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.5, md: 3 },
        '&:hover': { borderColor: tokens.primary },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: tokens.accent,
          }}
        >
          {project.eyebrow}
        </Typography>
        <Chip
          size="small"
          label={project.statusLabel}
          sx={{
            color: statusTone === 'warning' ? tokens.warning : tokens.success,
            border: '1px solid',
            borderColor: statusTone === 'warning' ? tokens.warning : tokens.success,
            bgcolor: 'transparent',
            fontSize: '0.66rem',
          }}
        />
      </Stack>

      <Typography variant="h3" component="h3" sx={{ mt: 1.5, fontSize: '1.25rem' }}>
        <Box
          component={RouterLink}
          to={`/projects/${project.slug}`}
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': { color: tokens.primary },
          }}
        >
          {project.title}
        </Box>
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.25, flex: 1 }}>
        {project.summary}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 1,
          mt: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
        }}
      >
        <Box component="span" sx={{ color: tokens.textSecondary }}>
          role
        </Box>
        <Box component="span" sx={{ color: 'text.primary' }}>
          {project.role}
        </Box>
      </Box>

      <TagList tags={project.tags} ariaLabel="Technologies used" sx={{ mt: 2 }} />

      <Box
        component={RouterLink}
        to={`/projects/${project.slug}`}
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
          color: tokens.primary,
          textDecoration: 'none',
          '&:hover': { color: '#7CB8FF' },
        }}
        aria-label={`Read case study: ${project.title}`}
      >
        Read case study
        <AppIcon icon="arrowRight" size={14} />
      </Box>
    </Card>
  )
}

export default ProjectCard
