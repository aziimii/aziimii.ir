import type { ExperienceEntry } from './types'

/**
 * Professional experience.
 *
 * The Ghasdak Peyk Shahr record was supplied by Ahmad Azimi. Bullet points are
 * draft descriptions of responsibilities, not independently verified
 * performance metrics. Earlier roles are intentionally absent until verified
 * records are provided.
 */

export const experience: ExperienceEntry[] = [
  {
    id: 'ghasdak-peyk-shahr',
    employer: 'Ghasdak Peyk Shahr',
    employerLocal: 'قاصدک پیک شهر',
    title: 'Software Development & Marketing Engineer',
    arrangement: 'Remote',
    startLabel: '23 September 2025',
    endLabel: '21 May 2026',
    start: '2025-09-23',
    end: '2026-05-21',
    current: false,
    summary:
      'Remote engineering role combining frontend development with infrastructure, deployment, and web operations responsibilities.',
    responsibilities: [
      'Frontend development',
      'DevOps and software infrastructure',
      'Website management and maintenance',
      'CI/CD and software deployment',
      'Website security',
      'Data analysis',
      'Digital marketing',
    ],
    bullets: [
      'Developed and maintained frontend functionality for web-based products and business websites.',
      'Supported application infrastructure, deployment, and operational maintenance.',
      'Contributed to CI/CD and software delivery workflows.',
      'Performed website troubleshooting and security-related operational tasks.',
      'Contributed to data analysis and digital marketing activities alongside software development responsibilities.',
      'Worked remotely to support ongoing development and operational activities.',
    ],
    verification:
      'Draft descriptions supplied by Ahmad Azimi — responsibilities, not measured performance outcomes. No metrics, team sizes, or budgets are claimed.',
  },
]

export const experienceNote =
  'Only the verified record above is published. Earlier roles, education, and certifications will be added once source material is available.'

/** Most recent verified entry, used for the homepage preview. */
export const latestExperience: ExperienceEntry | undefined = experience[0]
