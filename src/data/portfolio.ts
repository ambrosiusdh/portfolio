export const profileName = 'Ambrosius David Haryono'

export const skillGroups = [
  {
    id: 'backend',
    skills: [
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'Project Reactor',
      'REST APIs',
      'Kafka',
      'JWT / JWKS',
    ],
  },
  { id: 'data', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Flyway'] },
  { id: 'frontend', skills: ['TypeScript', 'JavaScript', 'Vue', 'React'] },
  {
    id: 'delivery',
    skills: [
      'Docker',
      'Kubernetes',
      'Jenkins',
      'Argo CD',
      'JUnit',
      'Playwright',
      'Datadog',
    ],
  },
] as const

export const experience = [
  {
    id: 'banking',
    employer: 'OCBC Indonesia',
    startMonth: '2026-05',
    endMonth: null,
    highlights: ['onboarding', 'workerRecovery'],
  },
  {
    id: 'authentication',
    employer: 'Blibli',
    startMonth: '2025-03',
    endMonth: '2026-05',
    highlights: ['signingKeys', 'messageIsolation'],
  },
  {
    id: 'warehouse',
    employer: 'Blibli',
    startMonth: '2019-03',
    endMonth: '2025-03',
    highlights: ['modernization', 'migration'],
  },
] as const
