<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseCard from '../components/common/BaseCard.vue'
import BaseTag from '../components/common/BaseTag.vue'
import { experience, profileName, skillGroups } from '../data/portfolio'

const { t, locale } = useI18n()

const monthFormatter = computed(
  () =>
    new Intl.DateTimeFormat(locale.value, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }),
)

function formatMonth(month: string) {
  return monthFormatter.value.format(new Date(`${month}-01T00:00:00Z`))
}
</script>

<template>
  <div class="portfolio-home">
    <section class="introduction" aria-labelledby="profile-name">
      <div>
        <p class="profile-role">{{ t('home.role') }}</p>
        <h1 id="profile-name" lang="id">{{ profileName }}</h1>
        <p class="profile-description">{{ t('home.description') }}</p>
      </div>

      <BaseCard class="profile-details">
        <dl>
          <div>
            <dt>{{ t('home.locationLabel') }}</dt>
            <dd>{{ t('home.location') }}</dd>
          </div>
          <div>
            <dt>{{ t('home.relocationLabel') }}</dt>
            <dd>{{ t('home.relocation') }}</dd>
          </div>
        </dl>
        <nav class="section-links" :aria-label="t('home.sectionNavigation')">
          <a href="#skills">{{ t('home.skills.title') }}</a>
          <a href="#experience">{{ t('home.experience.title') }}</a>
        </nav>
      </BaseCard>
    </section>

    <section class="home-section" aria-labelledby="skills">
      <h2 id="skills" tabindex="-1">{{ t('home.skills.title') }}</h2>
      <div class="skill-grid">
        <BaseCard v-for="group in skillGroups" :key="group.id">
          <h3>{{ t(`home.skills.groups.${group.id}`) }}</h3>
          <ul class="skill-tags" role="list">
            <li v-for="skill in group.skills" :key="skill">
              <BaseTag lang="en">{{ skill }}</BaseTag>
            </li>
          </ul>
        </BaseCard>
      </div>
    </section>

    <section class="home-section" aria-labelledby="experience">
      <h2 id="experience" tabindex="-1">{{ t('home.experience.title') }}</h2>
      <ol class="experience-list" role="list">
        <li
          v-for="position in experience"
          :key="position.id"
          class="experience-entry"
        >
          <p class="experience-period">
            <time :datetime="position.startMonth">{{
              formatMonth(position.startMonth)
            }}</time>
            {{ t('home.experience.periodSeparator') }}
            <time v-if="position.endMonth" :datetime="position.endMonth">
              {{ formatMonth(position.endMonth) }}
            </time>
            <span v-else>{{ t('home.experience.present') }}</span>
          </p>
          <div>
            <h3>{{ position.employer }}</h3>
            <p class="position-title">
              {{ t(`home.experience.roles.${position.id}.title`) }}
            </p>
            <ul class="experience-highlights">
              <li v-for="highlight in position.highlights" :key="highlight">
                {{
                  t(
                    `home.experience.roles.${position.id}.highlights.${highlight}`,
                  )
                }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped lang="scss">
.portfolio-home {
  display: grid;
  gap: clamp(3rem, 6vw, 5rem);
}

.introduction {
  display: grid;
  align-items: end;
  gap: var(--space-6);
}

h1,
h2,
h3,
p,
dl,
dd {
  margin: 0;
}

.profile-role {
  margin-block-end: var(--space-3);
  color: var(--color-accent);
  font-size: var(--text-lead);
  font-weight: 600;
}

h1 {
  max-inline-size: 13ch;
  font-size: var(--text-display);
  line-height: var(--line-tight);
  letter-spacing: -0.055em;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.profile-description {
  max-inline-size: 50ch;
  margin-block-start: var(--space-5);
  color: var(--color-muted);
  font-size: var(--text-lead);
}

.profile-details dl {
  display: grid;
  gap: var(--space-3);
}

.profile-details dt,
.experience-period {
  color: var(--color-muted);
  font-size: var(--text-small);
}

.profile-details dd {
  font-weight: 600;
}

.section-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 var(--space-4);
  margin-block-start: var(--space-4);
  padding-block-start: var(--space-2);
  border-block-start: 1px solid var(--color-divider);
}

.section-links a {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
  font-size: var(--text-small);
}

.home-section {
  padding-block-start: var(--space-6);
  border-block-start: 1px solid var(--color-divider);
}

h2 {
  margin-block-end: var(--space-5);
  scroll-margin-block-start: var(--space-4);
  font-size: var(--text-heading);
  line-height: 1.2;
  letter-spacing: -0.035em;
}

h3 {
  font-size: var(--text-lead);
  line-height: 1.4;
}

.skill-grid {
  display: grid;
  gap: var(--space-3);
}

.skill-tags,
.experience-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block-start: var(--space-3);
}

.experience-entry {
  display: grid;
  gap: var(--space-2);
  padding-block: var(--space-5);
}

.experience-entry:first-child {
  padding-block-start: 0;
}

.experience-entry:last-child {
  padding-block-end: 0;
}

.experience-entry + .experience-entry {
  border-block-start: 1px solid var(--color-divider);
}

.experience-period {
  font-variant-numeric: tabular-nums;
}

.position-title {
  margin-block-start: var(--space-1);
  color: var(--color-muted);
}

.experience-highlights {
  display: grid;
  gap: var(--space-2);
  max-inline-size: 68ch;
  margin-block: var(--space-3) 0;
  padding-inline-start: 1.25em;
}

@media (min-width: 42rem) {
  .skill-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .experience-entry {
    grid-template-columns: minmax(10rem, 1fr) minmax(0, 3fr);
    gap: var(--space-6);
  }
}

@media (min-width: 56rem) {
  .introduction {
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 19rem);
    column-gap: var(--space-7);
  }
}
</style>
