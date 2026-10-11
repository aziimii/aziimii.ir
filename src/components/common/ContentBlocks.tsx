import { Box, Typography } from '@mui/material'
import type { ContentBlock } from '../../data/types'
import { tokens } from '../../app/theme'

const NOTE_TONE = {
  info: tokens.primary,
  warning: tokens.warning,
  success: tokens.success,
} as const

const NOTE_LABEL: Record<keyof typeof NOTE_TONE, string> = {
  info: 'note',
  warning: 'verify',
  success: 'confirmed',
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, maxWidth: 78 }}>
          {block.text}
        </Typography>
      )

    case 'list':
      return (
        <Box
          component="ul"
          aria-label="Key points"
          sx={{
            pl: 2.5,
            my: 0,
            mb: 2,
            maxWidth: 760,
            '& > li': {
              color: 'text.secondary',
              mb: 1,
              pl: 0.5,
              '&::marker': { color: tokens.primary },
            },
          }}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Box>
      )

    case 'numbered':
      return (
        <Box
          component="ol"
          aria-label="Ordered steps"
          sx={{
            pl: 2.5,
            my: 0,
            mb: 2,
            maxWidth: 760,
            '& > li': { color: 'text.secondary', mb: 1.25, pl: 0.5 },
            '& > li::marker': {
              fontFamily: 'var(--font-mono)',
              color: tokens.accent,
            },
          }}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Box>
      )

    case 'kv':
      return (
        <Box
          component="dl"
          sx={{
            my: 0,
            mb: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'rgba(22, 27, 34, 0.6)',
          }}
        >
          {block.rows.map((row) => (
            <Box
              key={row.label}
              component="div"
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '200px 1fr' },
                gap: { xs: 0.25, sm: 2 },
                px: 2,
                py: 1.25,
                borderTop: '1px solid',
                borderColor: 'divider',
                '&:first-of-type': { borderTop: 0 },
              }}
            >
              <Box
                component="dt"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: tokens.textSecondary,
                  pt: 0.25,
                }}
              >
                {row.label}
              </Box>
              <Box component="dd" sx={{ m: 0, color: 'text.primary', fontSize: '0.95rem' }}>
                {row.value}
              </Box>
            </Box>
          ))}
        </Box>
      )

    case 'code':
      return (
        <Box component="figure" sx={{ my: 2.5, maxWidth: 780 }}>
          <Box
            component="figcaption"
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: tokens.textSecondary,
              mb: 0.75,
            }}
          >
            {block.caption ?? 'code'}
          </Box>
          <Box
            component="pre"
            tabIndex={0}
            sx={{
              m: 0,
              p: 2,
              bgcolor: '#0A0E14',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: '#C9D1D9',
            }}
          >
            <code>{block.code}</code>
          </Box>
        </Box>
      )

    case 'note': {
      const tone = block.tone ?? 'info'
      const color = NOTE_TONE[tone]
      return (
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'flex-start',
            borderLeft: '3px solid',
            borderColor: color,
            bgcolor: 'rgba(255,255,255,0.02)',
            px: 2,
            py: 1.5,
            borderRadius: 1,
            my: 2.5,
            maxWidth: 780,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color,
              pt: '0.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
            }}
          >
            {NOTE_LABEL[tone]}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {block.text}
          </Typography>
        </Box>
      )
    }

    case 'flow':
      return (
        <Box
          aria-label="Architecture flow"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1,
            my: 2.5,
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'rgba(22, 27, 34, 0.6)',
            maxWidth: 820,
          }}
        >
          {block.steps.map((step, index) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="span"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: index === 0 ? tokens.primary : 'text.primary',
                  border: '1px solid',
                  borderColor: index === 0 ? tokens.primary : 'divider',
                  borderRadius: 1,
                  px: 1.25,
                  py: 0.5,
                  bgcolor: 'rgba(13, 17, 23, 0.8)',
                }}
              >
                {step}
              </Box>
              {index < block.steps.length - 1 && (
                <Box
                  component="span"
                  aria-hidden
                  sx={{ color: tokens.textSecondary, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                >
                  →
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )

    default:
      return null
  }
}

export interface ContentBlocksProps {
  blocks: ContentBlock[]
}

/** Renders typed structured content (paragraphs, lists, tables, code, notes, flows). */
export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  )
}

export default ContentBlocks
