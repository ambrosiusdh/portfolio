export const projects = [
  {
    slug: 'bloom-app',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React'],
    repositories: [
      { label: 'backend', url: 'https://github.com/ambrosiusdh/bloom-app' },
      { label: 'frontend', url: 'https://github.com/ambrosiusdh/bloom-ui' },
    ],
  },
  {
    slug: 'portfolio',
    technologies: ['Vue', 'TypeScript', 'Vue I18n', 'Playwright'],
    repositories: [
      { label: 'portfolio', url: 'https://github.com/ambrosiusdh/portfolio' },
    ],
  },
] as const

export type Project = (typeof projects)[number]

export function projectRouteName(slug: Project['slug']) {
  return `project-${slug}`
}
