import { useState } from 'react'
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { navItems, site } from '../../data/site'
import { tokens } from '../../app/theme'
import { AppIcon } from '../common/AppIcon'
import { Stack } from '../common/Stack'

/** Small logo mark: monospace prompt glyph in a bordered square. */
function LogoMark() {
  return (
    <Box
      aria-hidden
      sx={{
        width: 34,
        height: 34,
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: tokens.border,
        bgcolor: tokens.surface,
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: tokens.primary,
        letterSpacing: '-0.04em',
        flexShrink: 0,
      }}
    >
      {">_"}
    </Box>
  )
}

function isActivePath(pathname: string, to: string): boolean {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

interface NavLinksProps {
  onNavigate?: () => void
  variant: 'tabs' | 'stack'
}

function NavLinks({ onNavigate, variant }: NavLinksProps) {
  const { pathname } = useLocation()

  if (variant === 'tabs') {
    return (
      <Stack direction="row" spacing={0.5} component="nav" aria-label="Primary">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.to)
          return (
            <Box
              key={item.id}
              component={RouterLink}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: active ? 'text.primary' : 'text.secondary',
                textDecoration: 'none',
                transition: 'color 0.15s ease, background-color 0.15s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 10,
                  right: 10,
                  bottom: -10,
                  height: 2,
                  bgcolor: active ? tokens.primary : 'transparent',
                  transition: 'background-color 0.15s ease',
                },
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'rgba(88, 166, 255, 0.06)',
                },
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: active ? tokens.success : tokens.border,
                }}
              />
              {item.label}
            </Box>
          )
        })}
      </Stack>
    )
  }

  return (
    <Box component="nav" aria-label="Primary">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.to)
        return (
          <Box
            key={item.id}
            component={RouterLink}
            to={item.to}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.5,
              borderLeft: '3px solid',
              borderColor: active ? tokens.primary : 'transparent',
              bgcolor: active ? 'rgba(88, 166, 255, 0.08)' : 'transparent',
              color: active ? 'text.primary' : 'text.secondary',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease',
              '&:hover': { bgcolor: 'rgba(88, 166, 255, 0.06)', color: 'text.primary' },
            }}
          >
            <AppIcon icon={item.icon} size={17} />
            {item.label}
          </Box>
        )
      })}
    </Box>
  )
}

export function TopNav() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Box
      component="header"
      role="banner"
      className="no-print"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (z) => z.zIndex.appBar,
        bgcolor: 'rgba(13, 17, 23, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, lg: 64 }, gap: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'text.primary',
              mr: 'auto',
            }}
          >
            <LogoMark />
            <Box sx={{ lineHeight: 1.15 }}>
              <Typography
                component="span"
                sx={{ display: 'block', fontWeight: 700, fontSize: '0.98rem' }}
              >
                {site.name}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: 'text.secondary',
                  letterSpacing: '0.04em',
                }}
              >
                {site.positioning}
              </Typography>
            </Box>
          </Box>

          {isDesktop ? (
            <NavLinks variant="tabs" />
          ) : (
            <>
              <Typography
                component="span"
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: tokens.success,
                }}
              >
                ~/portfolio
              </Typography>
              <IconButton
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-navigation"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: 'rgba(88, 166, 255, 0.08)' },
                }}
              >
                <AppIcon icon="menu" size={20} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>

      <Drawer
        id="mobile-navigation"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: { sx: { width: { xs: '82vw', sm: 320 }, overflow: 'auto' } },
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <LogoMark />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{site.name}</Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    color: 'text.secondary',
                  }}
                >
                  {site.shortPositioning}
                </Typography>
              </Box>
            </Stack>
            <IconButton
              aria-label="Close navigation menu"
              onClick={() => setDrawerOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              <AppIcon icon="x" size={20} />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ py: 1 }}>
          <NavLinks variant="stack" onNavigate={() => setDrawerOpen(false)} />
        </Box>
        <Box sx={{ mt: 'auto', p: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'text.secondary' }}>
            {site.careerInterest}
          </Typography>
        </Box>
      </Drawer>
    </Box>
  )
}

export default TopNav
