import { Box, Card, Container, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Stack } from '../../components/common/Stack'
import { about, site } from '../../data/site'
import { experience, experienceNote } from '../../data/experience'
import { selectedTechnologies, skillGroups } from '../../data/skills'
import { PageHeader } from '../../components/common/PageHeader'
import { AppIcon } from '../../components/common/AppIcon'
import { tokens } from '../../app/theme'

function SectionBlock({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Box component="section" id={id} aria-labelledby={`${id}-heading`} sx={{ py: { xs: 5, md: 7 } }}>
      <Typography variant="overline" component="p" sx={{ color: tokens.primary }}>
        {eyebrow}
      </Typography>
      <Typography
        id={`${id}-heading`}
        variant="h2"
        component="h2"
        sx={{ mt: 1, mb: description ? 1.5 : 3, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 720 }}>
          {description}
        </Typography>
      )}
      {children}
    </Box>
  )
}

export default function About() {
  return (
    <Box>
      <PageHeader
        path="~/about"
        title="About"
        description="A professional narrative: how I approach engineering, where I focus technically, and what kind of work I am looking for."
      />

      <Container maxWidth="lg">
        {/* Professional introduction */}
        <Box component="section" aria-labelledby="intro-heading" sx={{ py: { xs: 5, md: 7 } }}>
          <Typography variant="overline" component="p" sx={{ color: tokens.primary }}>
            PROFESSIONAL INTRODUCTION
          </Typography>
          <Box sx={{ mt: 2, maxWidth: 760, display: 'grid', gap: 2 }}>
            {about.paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                variant="body1"
                id={index === 0 ? 'intro-heading' : undefined}
                sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75 }}
              >
                {paragraph}
              </Typography>
            ))}
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: tokens.textSecondary,
                borderLeft: '3px solid',
                borderColor: tokens.border,
                pl: 2,
              }}
            >
              {site.positioning}
            </Typography>
          </Box>
        </Box>

        {/* Engineering principles */}
        <SectionBlock id="principles" eyebrow="HOW I WORK" title="Engineering principles">
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {about.principles.map((principle, index) => (
              <Card key={principle.title} sx={{ p: 2.5, '&:hover': { borderColor: tokens.primary } }}>
                <Typography
                  sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: tokens.success }}
                >
                  0{index + 1}
                </Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 1, fontSize: '1rem' }}>
                  {principle.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  {principle.text}
                </Typography>
              </Card>
            ))}
          </Box>
        </SectionBlock>

        {/* Technical focus areas */}
        <SectionBlock
          id="focus"
          eyebrow="TECHNICAL FOCUS"
          title="Technical focus areas"
        >
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' } }}>
            {about.focusAreas.map((area) => (
              <Box
                key={area.title}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2.5,
                  bgcolor: 'background.paper',
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ color: tokens.primary, display: 'flex' }}>
                    <AppIcon
                      icon={
                        area.title.includes('Frontend')
                          ? 'monitor'
                          : area.title.includes('Application')
                            ? 'code'
                            : area.title.includes('Systems')
                              ? 'server'
                              : 'workflow'
                      }
                      size={18}
                    />
                  </Box>
                  <Typography variant="h3" component="h3" sx={{ fontSize: '1.02rem' }}>
                    {area.title}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                  {area.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </SectionBlock>

        {/* Professional timeline */}
        <SectionBlock id="timeline" eyebrow="PROFESSIONAL TIMELINE" title="Experience so far">
          <Box sx={{ maxWidth: 820, position: 'relative' }}>
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 7,
                top: 8,
                bottom: 8,
                width: 1,
                bgcolor: 'divider',
                display: { xs: 'none', sm: 'block' },
              }}
            />
            {experience.map((entry) => (
              <Box key={entry.id} sx={{ position: 'relative', pl: { xs: 0, sm: 5 }, pb: 4 }}>
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 6,
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: tokens.success,
                    bgcolor: 'background.default',
                    display: { xs: 'none', sm: 'block' },
                  }}
                />
                <Card sx={{ p: 2.5 }}>
                  <Typography
                    sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: tokens.accent }}
                  >
                    {entry.startLabel} – {entry.endLabel} · {entry.arrangement}
                  </Typography>
                  <Typography variant="h3" component="h3" sx={{ mt: 1, fontSize: '1.1rem' }}>
                    {entry.title}
                  </Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '0.92rem', color: tokens.primary }}>
                    {entry.employer}
                    {entry.employerLocal ? ` (${entry.employerLocal})` : ''}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                    {entry.summary}
                  </Typography>
                  <Box
                    component="ul"
                    aria-label={`Responsibilities at ${entry.employer}`}
                    sx={{ listStyle: 'none', pl: 0, mt: 2, mb: 0, display: 'grid', gap: 0.5 }}
                  >
                    {entry.responsibilities.map((item) => (
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
                          '&::before': { content: '"›"', color: tokens.success },
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Box>
            ))}
            <Box
              sx={{
                ml: { xs: 0, sm: 5 },
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <Typography
                sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: tokens.warning }}
              >
                awaiting verified records
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {experienceNote}
              </Typography>
            </Box>
          </Box>
        </SectionBlock>

        {/* Selected technologies */}
        <SectionBlock
          id="technologies"
          eyebrow="TOOLKIT"
          title="Selected technologies"
          description="Grouped the way the work is grouped. No ratings or years are listed, because none are verified."
        >
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
            {skillGroups.map((group) => (
              <Box key={group.id}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    color: tokens.accent,
                    mb: 1.25,
                  }}
                >
                  {group.label}
                </Typography>
                <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
                  {group.items.map((item) => (
                    <Box
                      key={item}
                      component="span"
                      sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: tokens.border,
                        color: 'text.secondary',
                        bgcolor: 'background.paper',
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: tokens.textSecondary, mb: 1 }}
            >
              frequently used:
            </Typography>
            <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
              {selectedTechnologies.map((tech) => (
                <Box
                  key={tech}
                  component="span"
                  sx={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: tokens.borderStrong,
                    color: 'text.primary',
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Stack>
          </Box>
        </SectionBlock>

        {/* Career interests */}
        <SectionBlock
          id="interests"
          eyebrow="WHAT'S NEXT"
          title="Current career interests"
        >
          <Box
            component="ul"
            aria-label="Career interests"
            sx={{ listStyle: 'none', pl: 0, m: 0, maxWidth: 760, display: 'grid', gap: 1.25 }}
          >
            {about.careerInterests.map((interest) => (
              <Box
                component="li"
                key={interest}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'flex-start',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                  bgcolor: 'background.paper',
                }}
              >
                <Box sx={{ color: tokens.success, display: 'flex', pt: '0.1rem' }}>
                  <AppIcon icon="checkCircle" size={16} />
                </Box>
                <Typography variant="body2">{interest}</Typography>
              </Box>
            ))}
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 4, flexWrap: 'wrap' }}>
            <Box
              component={RouterLink}
              to="/projects"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: tokens.primary,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
              aria-label="Explore the case studies"
            >
              explore the case studies <AppIcon icon="arrowRight" size={14} />
            </Box>
            <Box
              component={RouterLink}
              to="/contact"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: tokens.primary,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
              aria-label="Get in touch"
            >
              get in touch <AppIcon icon="arrowRight" size={14} />
            </Box>
          </Stack>
        </SectionBlock>
      </Container>
    </Box>
  )
}
