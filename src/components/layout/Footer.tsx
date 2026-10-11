import { Box, Container, Divider, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../common/Stack'
import { navItems, site } from '../../data/site'
import { tokens } from '../../app/theme'
import { AppIcon } from '../common/AppIcon'

const QUICK_LINKS = navItems.filter((item) =>
  ['projects', 'resume', 'notes', 'contact'].includes(item.id),
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      className="no-print"
      sx={{ mt: 'auto', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box sx={{ maxWidth: 420 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{site.name}</Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'text.secondary',
                mt: 0.5,
              }}
            >
              {site.positioning}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
              {site.careerInterest}
            </Typography>
          </Box>

          <Stack component="nav" aria-label="Footer" spacing={1}>
            {QUICK_LINKS.map((item) => (
              <Box
                key={item.id}
                component={RouterLink}
                to={item.to}
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { color: tokens.primary },
                }}
              >
                <AppIcon icon="chevronRight" size={13} />
                {item.label}
              </Box>
            ))}
            <Box
              component="a"
              href="https://github.com/aziimii"
              target="_blank"
              rel="noreferrer noopener"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'text.secondary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': { color: tokens.primary },
              }}
            >
              <AppIcon icon="github" size={14} />
              github.com/aziimii
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'text.secondary' }}>
            © {year} {site.name}. All rights reserved.
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'text.secondary' }}>
            Built with React · TypeScript · Material UI
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
