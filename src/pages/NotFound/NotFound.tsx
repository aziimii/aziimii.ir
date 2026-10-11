import { Box, Button, Container, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { navItems } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'

export default function NotFound() {
  const { pathname } = useLocation()
  useDocumentTitle('Page not found — Ahmad Azimi', 'The requested page does not exist on this site.')

  return (
    <Box className="grid-bg" sx={{ flex: 1, bgcolor: 'rgba(13,17,23,0.6)' }}>
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: tokens.danger,
          }}
        >
          error 404 · file not found
        </Typography>

        <Typography
          variant="h1"
          component="h1"
          sx={{ mt: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}
        >
          This route does not exist.
        </Typography>

        <Box
          sx={{
            mt: 3,
            mx: 'auto',
            maxWidth: 560,
            textAlign: 'left',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: '#0A0E14',
            p: 2.5,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.8,
          }}
        >
          <Box component="p" sx={{ m: 0, color: tokens.textSecondary }}>
            requested path:
          </Box>
          <Box component="p" sx={{ m: 0, color: tokens.danger, wordBreak: 'break-all' }}>
            {pathname}
          </Box>
          <Box component="p" sx={{ mt: 1.5, mb: 0, color: tokens.textSecondary }}>
            hint: check the address, or jump back into the site below.
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<AppIcon icon="home" size={16} />}
          >
            back to home
          </Button>
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            endIcon={<AppIcon icon="arrowRight" size={15} />}
            sx={{
              borderColor: tokens.border,
              color: 'text.primary',
              '&:hover': { borderColor: tokens.primary },
            }}
          >
            browse projects
          </Button>
        </Stack>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: tokens.textSecondary, mb: 1.5 }}
          >
            AVAILABLE ROUTES
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            gap={1}
            justifyContent="center"
            component="nav"
            aria-label="Site routes"
          >
            {[...navItems.map((item) => item.to), '/projects/:slug', '/notes/:slug'].map((to) => (
              <Box
                key={to}
                component={RouterLink}
                to={to.includes(':') ? '/projects' : to}
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  px: 1.5,
                  py: 0.6,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: tokens.border,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: tokens.primary, borderColor: tokens.primary },
                }}
              >
                {to}
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
