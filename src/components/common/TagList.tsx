import type { ReactElement } from 'react'
import { Chip, type StackProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { Stack } from './Stack'
import { tokens } from '../../app/theme'

export interface TagListProps {
  tags: string[]
  ariaLabel?: string
  size?: 'small' | 'medium'
  sx?: StackProps['sx']
}

/** Monospace tag chips used across project cards and case studies. */
export function TagList({ tags, ariaLabel, size = 'small', sx }: TagListProps) {
  const mergedSx: SxProps<Theme> = [
    { flexWrap: 'wrap', gap: 0.75 },
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ]

  return (
    <Stack direction="row" useFlexGap aria-label={ariaLabel} sx={mergedSx}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size={size}
          variant="outlined"
          sx={{
            color: 'text.secondary',
            borderColor: tokens.border,
            bgcolor: 'rgba(22, 27, 34, 0.7)',
            '&:hover': { borderColor: tokens.borderStrong, color: 'text.primary' },
          }}
        />
      ))}
    </Stack>
  )
}

export interface StatusChipProps {
  label: string
  tone?: 'success' | 'info' | 'warning' | 'accent'
  icon?: ReactElement
}

const TONE_COLORS: Record<NonNullable<StatusChipProps['tone']>, string> = {
  success: tokens.success,
  info: tokens.primary,
  warning: tokens.warning,
  accent: tokens.accent,
}

/** Small status pill, e.g. "Ongoing" or "Draft topic". */
export function StatusChip({ label, tone = 'info', icon }: StatusChipProps) {
  const color = TONE_COLORS[tone]
  return (
    <Chip
      size="small"
      {...(icon ? { icon } : {})}
      label={label}
      sx={{
        color,
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid',
        borderColor: color,
        fontWeight: 600,
        '& .MuiChip-icon': { color, ml: 1 },
      }}
    />
  )
}

export default TagList
