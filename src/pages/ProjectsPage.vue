<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import BaseCard from '../components/common/BaseCard.vue'
import ProjectTechnologies from '../components/portfolio/ProjectTechnologies.vue'
import { projectRouteName, projects } from '../data/projects'

const { t } = useI18n()
</script>

<template>
  <div>
    <header class="page-intro">
      <h1>{{ t('projects.title') }}</h1>
      <p>{{ t('projects.description') }}</p>
    </header>

    <ul class="project-grid" role="list">
      <li v-for="project in projects" :key="project.slug">
        <BaseCard class="project-card">
          <p class="category">
            {{ t(`projects.items.${project.slug}.category`) }}
          </p>
          <h2>
            <RouterLink :to="{ name: projectRouteName(project.slug) }">
              {{ t(`projects.items.${project.slug}.title`) }}
            </RouterLink>
          </h2>
          <p class="summary">
            {{ t(`projects.items.${project.slug}.summary`) }}
          </p>
          <ProjectTechnologies :technologies="project.technologies" />
        </BaseCard>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.project-grid {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;
}

.project-card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  min-block-size: 100%;
  gap: var(--space-3);
  padding: clamp(1.5rem, 4vw, 2.5rem);
}

.project-card h2,
.project-card p {
  margin: 0;
}

.project-card h2 {
  font-size: var(--text-heading);
  line-height: 1.2;
  letter-spacing: -0.035em;
}

.project-card h2 a {
  text-decoration-thickness: 0.06em;
}

.category {
  color: var(--color-muted);
  font-size: var(--text-small);
}

.summary {
  max-inline-size: 50ch;
}

@media (min-width: 42rem) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
