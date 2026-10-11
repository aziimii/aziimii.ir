import { Box, Button, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { approach, closingCta, hero, navItems, site } from '../../data/site'
import { capabilities } from '../../data/skills'
import { featuredProjects } from '../../data/projects'
import { latestExperience } from '../../data/experience'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { tokens } from '../../app/theme'
import { AppIcon } from '../../components/common/AppIcon'
import { Section, SectionHeading } from '../../components/common/PageHeader'
import { ProjectCard } from '../../components/projects/ProjectCard'
import ConsoleTerminal from '../../components/terminal/ConsoleTerminal'

const PROFILE_ROWS: { label: string; value: string }[] = [
  { label: 'name', value: site.name },
  { label: 'role', value: site.role },
  { label: 'focus', value: site.shortPositioning },
  { label: 'status', value: 'open to international & remote roles' },
]

const STACK = [
  'react',
  'typescript',
  'nestjs',
  'postgresql',
  'docker',
  'nginx',
  'linux',
  'ci/cd',
]

function Hero() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      className="grid-bg"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(13, 17, 23, 0.6)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(700px 260px at 15% 0%, rgba(88,166,255,0.10), transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 7, md: 12 },
          position: 'relative',
          display: 'grid',
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: tokens.primary, display: 'flex', alignItems: 'center', gap: 1.25 }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: tokens.success,
                boxShadow: '0 0 0 3px rgba(63,185,80,0.18)',
              }}
            />
            {hero.eyebrow}
          </Typography>

          <Typography
            id="hero-heading"
            variant="h1"
            component="h1"
            sx={{
              mt: 2.5,
              fontSize: { xs: '2.35rem', sm: '2.9rem', md: '3.4rem' },
              maxWidth: '18ch',
            }}
          >
            {hero.heading}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              color: 'text.secondary',
              maxWidth: 640,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {hero.paragraph}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to={hero.primaryCta.to}
              variant="contained"
              color="primary"
              size="large"
              endIcon={<AppIcon icon="arrowRight" size={16} />}
              aria-label={`${hero.primaryCta.label} — browse case studies`}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              component={RouterLink}
              to={hero.secondaryCta.to}
              variant="outlined"
              size="large"
              startIcon={<AppIcon icon="fileText" size={16} />}
              aria-label={`${hero.secondaryCta.label} — open the résumé page`}
              sx={{
                borderColor: tokens.borderStrong,
                color: 'text.primary',
                '&:hover': { borderColor: tokens.primary, bgcolor: 'rgba(88,166,255,0.06)' },
              }}
            >
              {hero.secondaryCta.label}
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1.25}
            alignItems="center"
            sx={{
              mt: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: tokens.success,
              flexWrap: 'wrap',
            }}
          >
            <Box
              aria-hidden
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: tokens.success,
                animation: 'pulse 2.4s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.35 },
                },
              }}
            />
            <Box component="span">{hero.statusLine}</Box>
          </Stack>
          <Typography
            sx={{
              mt: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: tokens.textSecondary,
              maxWidth: 520,
            }}
          >
            {hero.availabilityNote}
          </Typography>
        </Box>

        <Card
          sx={{
            p: { xs: 2.5, md: 3 },
            bgcolor: 'rgba(22, 27, 34, 0.85)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pb: 1.5, mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography
              sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'text.secondary' }}
            >
              profile.ts
            </Typography>
            <Typography
              sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: tokens.success }}
            >
              ● verified content
            </Typography>
          </Stack>

          <Box component="dl" sx={{ m: 0 }}>
            {PROFILE_ROWS.map((row) => (
              <Box
                key={row.label}
                component="div"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '84px minmax(0, 1fr)',
                  gap: 1.5,
                  py: 0.75,
                }}
              >
                <Box
                  component="dt"
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: tokens.textSecondary,
                  }}
                >
                  {row.label}:
                </Box>
                <Box
                  component="dd"
                  sx={{ m: 0, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'text.primary' }}
                >
                  {row.value}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: tokens.accent,
                mb: 1,
              }}
            >
              stack
            </Typography>
            <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
              {STACK.map((item) => (
                <Box
                  key={item}
                  component="span"
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    px: 1,
                    py: 0.4,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: tokens.border,
                    color: 'text.secondary',
                    bgcolor: 'rgba(13,17,23,0.6)',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}

function CapabilityGrid() {
  return (
    <Section id="snapshot">
      <SectionHeading
        id="snapshot"
        eyebrow="ENGINEERING SNAPSHOT"
        title="Four areas I work in"
        description="A compact view of the capability areas supported by real project work. Every skill listed is configurable in src/data/skills.ts."
      />
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {capabilities.map((capability, index) => (
          <Card
            key={capability.id}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { borderColor: tokens.primary, transform: 'translateY(-2px)' },
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 1.5,
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid',
                  borderColor: tokens.border,
                  bgcolor: 'rgba(88,166,255,0.08)',
                  color: tokens.primary,
                }}
              >
                <AppIcon icon={capability.icon} size={19} />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: tokens.textSecondary,
                }}
              >
                0{index + 1}
              </Typography>
            </Stack>

            <Typography variant="h3" component="h3" sx={{ mt: 2, fontSize: '1.05rem' }}>
              {capability.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, flex: 1 }}>
              {capability.description}
            </Typography>

            <Box component="ul" aria-label={`${capability.title} skills`} sx={{ listStyle: 'none', pl: 0, mt: 2, mb: 0 }}>
              {capability.items.map((item) => (
                <Box
                  component="li"
                  key={item}
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'text.secondary',
                    py: 0.4,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    '&::before': {
                      content: '"›"',
                      color: tokens.success,
                    },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Card>
        ))}
      </Box>
    </Section>
  )
}

function SelectedProjects() {
  return (
    <Section id="selected-projects" sx={{ bgcolor: 'rgba(22, 27, 34, 0.35)' }}>
      <SectionHeading
        id="selected-projects"
        eyebrow="SELECTED PROJECTS"
        title="Case studies with real engineering detail"
        description="Each entry links to a dedicated case study covering context, constraints, decisions, and verification."
      />
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to="/projects"
          variant="outlined"
          endIcon={<AppIcon icon="arrowRight" size={15} />}
          sx={{
            borderColor: tokens.border,
            color: 'text.primary',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            '&:hover': { borderColor: tokens.primary, bgcolor: 'rgba(88,166,255,0.06)' },
          }}
        >
          view all projects
        </Button>
      </Box>
    </Section>
  )
}

function Approach() {
  return (
    <Section id="approach">
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 4, md: 8 },
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 0.85fr)' },
          alignItems: 'start',
        }}
      >
        <Box>
          <SectionHeading
            id="approach"
            eyebrow="ENGINEERING APPROACH"
            title={approach.heading}
            description={approach.copy}
          />
          <Button
            component={RouterLink}
            to="/about"
            variant="text"
            endIcon={<AppIcon icon="arrowRight" size={15} />}
            sx={{ px: 0, color: tokens.primary, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
            aria-label="Read more about my engineering approach"
          >
            more about how I work
          </Button>
        </Box>

        <Card sx={{ p: 3, bgcolor: '#0A0E14' }}>
          <Typography
            sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: tokens.accent, mb: 2 }}
          >
            approach.checklist
          </Typography>
          {[
            'clear architecture before clever architecture',
            'maintainable implementations over one-off tricks',
            'reliable delivery: build, verify, deploy, observe',
            'understand how the app behaves in real environments',
          ].map((item) => (
            <Stack key={item} direction="row" spacing={1.5} sx={{ py: 0.75, alignItems: 'flex-start' }}>
              <Box sx={{ color: tokens.success, display: 'flex', pt: '0.15rem' }}>
                <AppIcon icon="checkCircle" size={15} />
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item}
              </Typography>
            </Stack>
          ))}
        </Card>
      </Box>
    </Section>
  )
}

function ConsoleSection() {
  return (
    <Section id="console" sx={{ pt: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 4, md: 8 },
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' },
          alignItems: 'center',
        }}
      >
        <Box>
          <SectionHeading
            id="console"
            eyebrow="QUICK NAVIGATION"
            title="Prefer a prompt to a menu?"
            description="A small console that navigates the site. Try help, projects, resume, or contact — every command opens real content, and nothing else runs."
          />
        </Box>
        <ConsoleTerminal />
      </Box>
    </Section>
  )
}

function ExperiencePreview() {
  if (!latestExperience) return null

  return (
    <Section id="experience" sx={{ pt: 0 }}>
      <SectionHeading
        id="experience"
        eyebrow="EXPERIENCE PREVIEW"
        title="Most recent verified role"
        description="Only verified records are shown here. The complete résumé page carries the full detail and a printable PDF."
      />
      <Card sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
        >
          <Box>
            <Typography variant="h3" component="h3" sx={{ fontSize: '1.2rem' }}>
              {latestExperience.title}
            </Typography>
            <Typography
              sx={{
                mt: 0.75,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: tokens.primary,
              }}
            >
              {latestExperience.employer}
              {latestExperience.employerLocal && (
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {' '}
                  ({latestExperience.employerLocal})
                </Box>
              )}
            </Typography>
          </Box>
          <Stack spacing={0.75} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
            <Typography
              sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'text.secondary' }}
            >
              {latestExperience.startLabel} – {latestExperience.endLabel}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: tokens.accent,
                border: '1px solid',
                borderColor: tokens.accent,
                borderRadius: 1,
                px: 1,
                py: 0.25,
              }}
            >
              {latestExperience.arrangement}
            </Typography>
          </Stack>
        </Stack>

        <Box
          component="ul"
          aria-label="Responsibilities"
          sx={{
            listStyle: 'none',
            pl: 0,
            mt: 2.5,
            mb: 0,
            display: 'grid',
            gap: 0.75,
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          {latestExperience.responsibilities.map((item) => (
            <Box
              component="li"
              key={item}
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: 'text.secondary',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                '&::before': { content: '"•"', color: tokens.success },
              }}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Box
          component={RouterLink}
          to="/resume"
          sx={{
            mt: 3,
            pt: 2.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: tokens.primary,
            textDecoration: 'none',
            '&:hover': { color: '#7CB8FF' },
          }}
          aria-label="View the complete résumé"
        >
          view the complete résumé
          <AppIcon icon="arrowRight" size={14} />
        </Box>
      </Card>
    </Section>
  )
}

function ClosingCta() {
  return (
    <Box
      component="section"
      aria-labelledby="cta-heading"
      className="grid-bg"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, textAlign: 'center', position: 'relative' }}>
        <Typography variant="overline" component="p" sx={{ color: tokens.accent }}>
          NEXT STEP
        </Typography>
        <Typography
          id="cta-heading"
          variant="h2"
          component="h2"
          sx={{ mt: 1.5, fontSize: { xs: '1.75rem', md: '2.4rem' } }}
        >
          {closingCta.heading}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, mx: 'auto', maxWidth: 560 }}>
          {closingCta.copy}
        </Typography>
        <Button
          component={RouterLink}
          to={closingCta.to}
          variant="contained"
          size="large"
          startIcon={<AppIcon icon="send" size={16} />}
          sx={{ mt: 4 }}
          aria-label={`${closingCta.button} — open the contact page`}
        >
          {closingCta.button}
        </Button>
        <Typography
          sx={{
            mt: 3,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: tokens.textSecondary,
          }}
        >
          or jump straight to the <RouterLink to="/resume">résumé</RouterLink> ·{' '}
          <RouterLink to="/projects">case studies</RouterLink>
        </Typography>
      </Container>
    </Box>
  )
}

export default function Home() {
  useDocumentTitle(site.baseTitle, navItems[0].description)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Hero />
      <CapabilityGrid />
      <SelectedProjects />
      <Approach />
      <ConsoleSection />
      <ExperiencePreview />
      <ClosingCta />
    </Box>
  )
}
