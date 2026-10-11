import { Suspense } from 'react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopNav from '../navigation/TopNav'
import Footer from './Footer'
import { ScrollToTop } from '../../hooks/useScrollAndMotion'

function RouteFallback() {
  return (
    <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
      <CircularProgress size={28} sx={{ color: 'text.secondary' }} />
      <Typography
        sx={{
          mt: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'text.secondary',
        }}
      >
        loading route…
      </Typography>
    </Container>
  )
}

export function AppLayout() {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <ScrollToTop />
      <TopNav />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ flex: 1, outline: 'none', display: 'flex', flexDirection: 'column' }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  )
}

export default AppLayout
