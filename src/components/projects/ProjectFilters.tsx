import { Box, Button, Chip, IconButton, InputBase, Typography } from '@mui/material'
import { Stack } from '../common/Stack'
import type { ProjectCategory } from '../../data/types'
import { tokens } from '../../app/theme'
import { AppIcon } from '../common/AppIcon'

export interface ProjectFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: ProjectCategory[]
  resultCount: number
  totalCount: number
}

/**
 * Search + category filter over real project metadata (title, summary, role,
 * tags, categories). Every control changes the rendered result set.
 */
export function ProjectFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  resultCount,
  totalCount,
}: ProjectFiltersProps) {
  const hasActiveFilter = query.trim().length > 0 || category !== 'all'

  const handleClear = () => {
    onQueryChange('')
    onCategoryChange('all')
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        component="form"
        role="search"
        aria-label="Search projects"
        onSubmit={(event: React.FormEvent) => event.preventDefault()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 0.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          maxWidth: 560,
          '&:focus-within': { borderColor: tokens.primary },
        }}
      >
        <AppIcon icon="search" size={16} title="Search" />
        <InputBase
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name, tag, or technology…"
          inputProps={{
            'aria-label': 'Search projects by name, tag, or technology',
          }}
          sx={{ flex: 1, py: 1.25, fontSize: '0.9rem' }}
        />
        {query && (
          <IconButton
            size="small"
            aria-label="Clear search text"
            onClick={() => onQueryChange('')}
            sx={{ color: 'text.secondary' }}
          >
            <AppIcon icon="x" size={15} />
          </IconButton>
        )}
      </Box>

      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        gap={1}
        alignItems="center"
        sx={{ mt: 2.5 }}
        aria-label="Filter projects by category"
      >
        <Box
          component="span"
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: tokens.textSecondary,
            mr: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
          }}
        >
          <AppIcon icon="filter" size={13} />
          category
        </Box>
        <Chip
          label="All"
          onClick={() => onCategoryChange('all')}
          aria-pressed={category === 'all'}
          variant="outlined"
          sx={{
            color: category === 'all' ? tokens.primary : 'text.secondary',
            borderColor: category === 'all' ? tokens.primary : tokens.border,
            bgcolor: category === 'all' ? 'rgba(88,166,255,0.1)' : 'transparent',
            cursor: 'pointer',
            fontWeight: category === 'all' ? 700 : 400,
          }}
        />
        {categories.map((cat) => {
          const active = category === cat.id
          return (
            <Chip
              key={cat.id}
              label={cat.label}
              title={cat.description}
              onClick={() => onCategoryChange(cat.id)}
              aria-pressed={active}
              variant="outlined"
              sx={{
                color: active ? tokens.primary : 'text.secondary',
                borderColor: active ? tokens.primary : tokens.border,
                bgcolor: active ? 'rgba(88,166,255,0.1)' : 'transparent',
                cursor: 'pointer',
                fontWeight: active ? 700 : 400,
                '&:hover': { borderColor: active ? tokens.primary : tokens.borderStrong },
              }}
            />
          )
        })}
      </Stack>

      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          aria-live="polite"
          sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: tokens.textSecondary }}
        >
          showing {resultCount} of {totalCount} project{totalCount === 1 ? '' : 's'}
        </Typography>
        {hasActiveFilter && (
          <Button
            size="small"
            onClick={handleClear}
            startIcon={<AppIcon icon="x" size={13} />}
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: tokens.primary,
              minWidth: 0,
              px: 1,
            }}
          >
            reset filters
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default ProjectFilters
