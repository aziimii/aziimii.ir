import { useEffect, useRef, useState } from 'react'
import { Box, Card, IconButton, InputBase, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { tokens } from '../../app/theme'
import { AppIcon } from '../common/AppIcon'

interface Line {
  id: number
  kind: 'echo' | 'output' | 'system' | 'error'
  text: string
}

const HELP_LINES = [
  'Available commands:',
  '  help      — show this list',
  '  home      — go to the homepage',
  '  about     — background and engineering principles',
  '  projects  — case studies and filters',
  '  resume    — printable résumé',
  '  notes     — engineering notes',
  '  contact   — ways to get in touch',
  '  whoami    — who is speaking',
  '  clear     — clear this console',
]

const NAV_COMMANDS: Record<string, { path: string; message: string }> = {
  home: { path: '/', message: '→ navigating to home' },
  about: { path: '/about', message: '→ navigating to about' },
  projects: { path: '/projects', message: '→ navigating to projects' },
  resume: { path: '/resume', message: '→ navigating to resume' },
  notes: { path: '/notes', message: '→ navigating to notes' },
  contact: { path: '/contact', message: '→ navigating to contact' },
}

const DISCLAIMER =
  'Site navigation only — this console cannot access your machine or mine.'

/**
 * A small, honest terminal-inspired widget: every command navigates to real
 * site content. It executes nothing else by design.
 */
export function ConsoleTerminal() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lines, setLines] = useState<Line[]>(() => [
    {
      id: 0,
      kind: 'system',
      text: 'Engineering Console — type "help" for the command list.',
    },
  ])
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const nextId = useRef(1)

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const push = (kind: Line['kind'], text: string) => {
    setLines((prev) => [...prev, { id: nextId.current++, kind, text }])
  }

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase()
    if (!command) return

    push('echo', command)
    setHistory((prev) => [command, ...prev].slice(0, 20))
    setHistoryIndex(-1)

    if (command === 'clear') {
      setLines([])
      return
    }

    if (command === 'help') {
      HELP_LINES.forEach((line) => push('output', line))
      push('system', DISCLAIMER)
      return
    }

    if (command === 'whoami') {
      push('output', 'Ahmad Azimi — software engineer (portfolio identity).')
      push('system', DISCLAIMER)
      return
    }

    const target = NAV_COMMANDS[command]
    if (target) {
      push('output', target.message)
      navigate(target.path)
      return
    }

    push('error', `command not found: ${command} — try "help"`)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    runCommand(value)
    setValue('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      if (next >= 0) {
        setHistoryIndex(next)
        setValue(history[next])
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = historyIndex - 1
      setHistoryIndex(next)
      setValue(next >= 0 ? history[next] : '')
    }
  }

  const lineColor: Record<Line['kind'], string> = {
    echo: tokens.text,
    output: '#C9D1D9',
    system: tokens.textSecondary,
    error: tokens.danger,
  }

  return (
    <Card
      sx={{
        bgcolor: '#0A0E14',
        borderColor: tokens.border,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: tokens.surface,
        }}
      >
        <Box aria-hidden sx={{ display: 'flex', gap: 0.75 }}>
          {['#F85149', '#D29922', '#3FB950'].map((color) => (
            <Box key={color} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: color }} />
          ))}
        </Box>
        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'text.secondary',
            mr: 'auto',
          }}
        >
          console — site navigation
        </Typography>
        <IconButton
          size="small"
          aria-label="Clear console output"
          onClick={() => setLines([])}
          sx={{ color: 'text.secondary' }}
        >
          <AppIcon icon="x" size={14} />
        </IconButton>
      </Box>

      <Box
        ref={bodyRef}
        role="log"
        aria-live="polite"
        aria-label="Console output"
        sx={{
          px: 2,
          py: 1.5,
          minHeight: 190,
          maxHeight: 260,
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          lineHeight: 1.7,
        }}
      >
        {lines.map((line) => (
          <Typography
            key={line.id}
            component="div"
            sx={{
              color: lineColor[line.kind],
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {line.kind === 'echo' ? (
              <>
                <Box component="span" sx={{ color: tokens.success }}>
                  guest@portfolio
                </Box>
                <Box component="span" sx={{ color: tokens.textSecondary }}>
                  :~${' '}
                </Box>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </Typography>
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.25,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'rgba(13, 17, 23, 0.7)',
        }}
      >
        <Box
          component="label"
          htmlFor="console-input"
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: tokens.success,
            whiteSpace: 'nowrap',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          guest@portfolio:~$
        </Box>
        <Box
          component="span"
          aria-hidden
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: tokens.success,
            display: { xs: 'block', sm: 'none' },
          }}
        >
          $
        </Box>
        <InputBase
          id="console-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          inputProps={{
            autoComplete: 'off',
            spellCheck: false,
            'aria-label': 'Console command (try help, about, projects, resume, contact)',
          }}
          placeholder="help"
          sx={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}
        />
      </Box>
      <Typography
        sx={{
          px: 2,
          pb: 1.25,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.66rem',
          color: tokens.textSecondary,
          bgcolor: 'rgba(13, 17, 23, 0.7)',
        }}
      >
        {DISCLAIMER}
      </Typography>
    </Card>
  )
}

export default ConsoleTerminal
