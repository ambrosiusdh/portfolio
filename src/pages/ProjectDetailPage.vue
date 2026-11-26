<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import BaseCard from '../components/common/BaseCard.vue'
import ProjectTechnologies from '../components/portfolio/ProjectTechnologies.vue'
import type { Project } from '../data/projects'

defineProps<{ project: Project }>()

const { t } = useI18n()
const sections = ['problem', 'contribution', 'decisions', 'outcome'] as const
</script>

<template>
  <article>
    <RouterLink class="back-link" :to="{ name: 'projects' }">
      {{ t('projects.back') }}
    </RouterLink>

    <header class="page-intro">
      <h1>{{ t(`projects.items.${project.slug}.title`) }}</h1>
      <p>{{ t(`projects.items.${project.slug}.summary`) }}</p>
    </header>

    <div class="case-study">
      <div class="case-study-sections">
        <section
          v-for="section in sections"
          :key="section"
          :aria-labelledby="section"
        >
          <h2 :id="section" tabindex="-1">
            {{ t(`projects.sections.${section}`) }}
          </h2>
          <p>{{ t(`projects.items.${project.slug}.${section}`) }}</p>
        </section>
      </div>

      <aside class="project-resources" :aria-label="t('projects.resources')">
        <BaseCard>
          <h2>{{ t('projects.technologies') }}</h2>
          <ProjectTechnologies :technologies="project.technologies" />

          <h2 class="repository-heading">{{ t('projects.sourceCode') }}</h2>
          <ul class="repository-links" role="list">
            <li
              v-for="repository in project.repositories"
              :key="repository.url"
            >
              <a :href="repository.url">{{
                t(`projects.repositories.${repository.label}`)
              }}</a>
            </li>
          </ul>
        </BaseCard>
      </aside>
    </div>
  </article>
</template>

<style scoped lang="scss">
.back-link {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
  margin-block-end: var(--space-4);
  font-size: var(--text-small);
}

.page-intro {
  max-inline-size: none;
}

.page-intro h1 {
  text-wrap: balance;
}

.page-intro h1:lang(ja) {
  font-size: clamp(2rem, 8vw, var(--text-display));
  line-break: strict;
}

.page-intro p {
  max-inline-size: 55ch;
}

.case-study {
  display: grid;
  align-items: start;
  gap: var(--space-6);
  margin-block-start: var(--space-6);
}

.case-study-sections {
  display: grid;
  gap: var(--space-5);
}

.case-study-sections section {
  padding-block-start: var(--space-5);
  border-block-start: 1px solid var(--color-divider);
}

.case-study h2 {
  margin-block: 0 var(--space-3);
  scroll-margin-block-start: var(--space-4);
  font-size: var(--text-heading);
  line-height: 1.2;
  letter-spacing: -0.035em;
}

.case-study-sections p {
  max-inline-size: 68ch;
  margin: 0;
}

.project-resources h2 {
  font-size: var(--text-lead);
}

.project-resources .repository-heading {
  margin-block-start: var(--space-5);
}

.repository-links {
  display: grid;
  justify-items: start;
  margin: 0;
  padding: 0;
  list-style: none;
}

.repository-links a {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
}

@media (min-width: 50rem) {
  .case-study {
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 19rem);
    gap: var(--space-7);
  }
}
</style>
