import { Box, Button, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { contactChannels, contactPage, site } from '../../data/site'
import { PageHeader } from '../../components/common/PageHeader'
import { AppIcon } from '../../components/common/AppIcon'
import { StatusChip } from '../../components/common/TagList'
import { tokens } from '../../app/theme'

function ChannelCard({
  channel,
}: {
  channel: (typeof contactChannels)[number]
}) {
  const isInternal = channel.href?.startsWith('/')
  const body = (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: tokens.border,
          display: 'grid',
          placeItems: 'center',
          color: channel.status === 'verified' ? tokens.primary : 'text.secondary',
          bgcolor: 'rgba(88,166,255,0.05)',
          flexShrink: 0,
        }}
      >
        <AppIcon icon={channel.icon} size={19} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Typography variant="h3" component="h3" sx={{ fontSize: '1rem' }}>
            {channel.label}
          </Typography>
          <StatusChip
            label={channel.status === 'verified' ? 'verified' : 'placeholder'}
            tone={channel.status === 'verified' ? 'success' : 'warning'}
          />
        </Stack>
        <Typography
          sx={{
            mt: 0.75,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: channel.href ? 'text.primary' : 'text.secondary',
            wordBreak: 'break-word',
          }}
        >
          {channel.value}
        </Typography>
        {channel.note && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontSize: '0.82rem' }}>
            {channel.note}
          </Typography>
        )}
      </Box>
    </Stack>
  )

  const sx = {
    height: '100%',
    p: 2.5,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition: 'border-color 0.15s ease',
    '&:hover': { borderColor: channel.href ? tokens.primary : tokens.borderStrong },
  } as const

  if (!channel.href) {
    return <Card sx={sx}>{body}</Card>
  }

  if (isInternal) {
    return (
      <Card component={RouterLink} to={channel.href} sx={sx} aria-label={`${channel.label}: ${channel.value}`}>
        {body}
      </Card>
    )
  }

  return (
    <Card
      component="a"
      href={channel.href}
      target="_blank"
      rel="noreferrer noopener"
      sx={sx}
      aria-label={`${channel.label}: ${channel.value} (opens in a new tab)`}
    >
      {body}
    </Card>
  )
}

export default function Contact() {
  return (
    <Box>
      <PageHeader
        path="~/contact"
        title={contactPage.heading}
        metaTitle="Contact"
        description={contactPage.intro}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {contactChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </Box>

        <Box
          sx={{
            mt: 4,
            border: '1px solid',
            borderLeft: '3px solid',
            borderLeftColor: tokens.warning,
            borderRadius: 2,
            p: 2.5,
            bgcolor: 'background.paper',
            maxWidth: 760,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: tokens.warning,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            configuration note
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {contactPage.note} Email and LinkedIn are still marked as placeholders — update them in{' '}
            <Box component="code" sx={{ fontFamily: 'var(--font-mono)', color: tokens.accent }}>
              src/data/site.ts
            </Box>{' '}
            and the cards above will become working links automatically.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h3" component="h3" sx={{ fontSize: '1.1rem' }}>
              Looking for an engineer for an interesting problem?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              {site.careerInterest} The résumé has the full picture, and the case studies show how I
              work.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button
              component={RouterLink}
              to="/resume"
              variant="outlined"
              startIcon={<AppIcon icon="fileText" size={15} />}
              sx={{
                borderColor: tokens.border,
                color: 'text.primary',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                '&:hover': { borderColor: tokens.primary },
              }}
            >
              view résumé
            </Button>
            <Button
              component={RouterLink}
              to="/projects"
              variant="outlined"
              startIcon={<AppIcon icon="layers" size={15} />}
              sx={{
                borderColor: tokens.border,
                color: 'text.primary',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                '&:hover': { borderColor: tokens.primary },
              }}
            >
              case studies
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
