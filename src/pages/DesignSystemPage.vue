<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseTag from '../components/common/BaseTag.vue'

const colors = ['canvas', 'surface', 'text', 'muted', 'border', 'accent']
const sections = ['color', 'typography', 'spacing', 'components']
const spacingSteps = [1, 2, 3, 4, 5, 6, 7, 8]
const exampleShown = ref(false)
const { t } = useI18n()
</script>

<template>
  <div>
    <header class="intro">
      <div>
        <h1>{{ t('designSystem.title') }}</h1>
        <p>{{ t('designSystem.description') }}</p>
      </div>

      <nav
        class="section-links"
        :aria-label="t('designSystem.sectionNavigation')"
      >
        <a v-for="section in sections" :key="section" :href="`#${section}`">
          {{ t(`designSystem.sections.${section}`) }}
        </a>
      </nav>
    </header>

    <section class="catalog-section" aria-labelledby="color">
      <h2 id="color">{{ t('designSystem.sections.color') }}</h2>
      <ul class="palette" role="list">
        <li v-for="color in colors" :key="color" class="swatch">
          <span
            class="swatch-color"
            :style="{ backgroundColor: `var(--color-${color})` }"
            aria-hidden="true"
          />
          <div class="swatch-caption">
            <strong>{{ t(`designSystem.colors.${color}`) }}</strong>
            <code>--color-{{ color }}</code>
          </div>
        </li>
      </ul>
    </section>

    <section class="catalog-section" aria-labelledby="typography">
      <h2 id="typography">{{ t('designSystem.sections.typography') }}</h2>
      <BaseCard>
        <dl class="type-samples">
          <div>
            <dt>
              {{ t('designSystem.type.display') }} <code>--text-display</code>
            </dt>
            <dd class="sample-display">{{ t('site.name') }}</dd>
          </div>
          <div>
            <dt>
              {{ t('designSystem.type.heading') }} <code>--text-heading</code>
            </dt>
            <dd class="sample-heading">
              {{ t('designSystem.type.headingExample') }}
            </dd>
          </div>
          <div>
            <dt>{{ t('designSystem.type.body') }} <code>--text-body</code></dt>
            <dd>{{ t('designSystem.type.bodyExample') }}</dd>
          </div>
          <div>
            <dt>
              {{ t('designSystem.type.monospace') }} <code>--font-mono</code>
            </dt>
            <dd><code>npm run build</code></dd>
          </div>
        </dl>
      </BaseCard>
    </section>

    <section class="catalog-section" aria-labelledby="spacing">
      <h2 id="spacing">{{ t('designSystem.sections.spacing') }}</h2>
      <BaseCard>
        <ul class="space-samples" role="list">
          <li v-for="step in spacingSteps" :key="step">
            <span
              class="space-sample"
              :style="{ inlineSize: `var(--space-${step})` }"
              aria-hidden="true"
            />
            <code>--space-{{ step }}</code>
          </li>
        </ul>
      </BaseCard>
    </section>

    <section class="catalog-section" aria-labelledby="components">
      <h2 id="components">{{ t('designSystem.sections.components') }}</h2>
      <div class="component-grid">
        <BaseCard class="button-card">
          <h3>{{ t('designSystem.buttons.title') }}</h3>
          <p>{{ t('designSystem.buttons.description') }}</p>
          <div class="examples">
            <BaseButton @click="exampleShown = true">{{
              t('designSystem.buttons.show')
            }}</BaseButton>
            <BaseButton variant="secondary" @click="exampleShown = false">
              {{ t('designSystem.buttons.reset') }}
            </BaseButton>
            <BaseButton disabled>{{
              t('designSystem.buttons.unavailable')
            }}</BaseButton>
          </div>
          <p class="example-status" role="status">
            {{
              t(
                exampleShown
                  ? 'designSystem.buttons.shown'
                  : 'designSystem.buttons.empty',
              )
            }}
          </p>
        </BaseCard>

        <BaseCard>
          <h3>{{ t('designSystem.cards.title') }}</h3>
          <p>{{ t('designSystem.cards.description') }}</p>
          <BaseCard class="nested-card">{{
            t('designSystem.cards.example')
          }}</BaseCard>
        </BaseCard>

        <BaseCard>
          <h3>{{ t('designSystem.tags.title') }}</h3>
          <p>{{ t('designSystem.tags.description') }}</p>
          <div class="examples">
            <BaseTag>TypeScript</BaseTag>
            <BaseTag tone="accent">{{
              t('designSystem.tags.featured')
            }}</BaseTag>
          </div>
        </BaseCard>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.intro {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-5);
  padding-block-end: var(--space-6);
}

h1,
h2,
h3,
p,
dl,
dd,
ul {
  margin: 0;
}

h1,
.sample-display {
  font-size: var(--text-display);
  line-height: var(--line-tight);
  letter-spacing: -0.055em;
  overflow-wrap: anywhere;
}

h1 {
  font-weight: 700;
}

.intro p {
  max-inline-size: 38ch;
  margin-block-start: var(--space-4);
  font-size: var(--text-lead);
}

p,
code,
dt {
  color: var(--color-muted);
}

code {
  font-family: var(--font-mono);
  font-size: var(--text-small);
}

.section-links,
.examples {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
}

.section-links a {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
  font-size: var(--text-small);
}

.catalog-section {
  display: grid;
  gap: var(--space-4);
  padding-block: var(--space-6);
  border-block-start: 1px solid var(--color-divider);
}

h2,
.sample-heading {
  font-size: var(--text-heading);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

h2 {
  scroll-margin-block-start: var(--space-4);
}

.palette,
.component-grid {
  display: grid;
  gap: var(--space-3);
}

.palette,
.space-samples {
  padding: 0;
  list-style: none;
}

.palette {
  grid-template-columns: repeat(auto-fit, minmax(min(8.125rem, 100%), 1fr));
}

.swatch {
  overflow: hidden;
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-card);
  background: var(--color-surface);
}

.swatch-color {
  display: block;
  block-size: 5.5rem;
  border-block-end: 1px solid var(--color-divider);
}

.swatch-caption {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3);
  overflow-wrap: anywhere;
}

.type-samples > div {
  display: grid;
  align-items: baseline;
  gap: var(--space-2) var(--space-5);
}

.type-samples > div + div {
  margin-block-start: var(--space-4);
  padding-block-start: var(--space-4);
  border-block-start: 1px solid var(--color-divider);
}

dt code {
  display: block;
}

.sample-display {
  font-weight: 700;
}

.space-samples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(6rem, 100%), 1fr));
  gap: var(--space-4);
}

.space-samples li {
  display: grid;
  justify-items: start;
  align-content: end;
  gap: var(--space-2);
}

.space-sample {
  block-size: var(--space-2);
  max-inline-size: 100%;
  background: var(--color-accent);
}

.component-grid p {
  margin-block: var(--space-1) var(--space-4);
}

.component-grid .example-status {
  margin-block: var(--space-4) 0;
  font-size: var(--text-small);
}

.nested-card {
  background: var(--color-canvas);
}

@media (min-width: 42rem) {
  .type-samples > div {
    grid-template-columns: minmax(9rem, 1fr) minmax(0, 3fr);
  }

  .component-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .button-card {
    grid-column: 1 / -1;
  }
}
</style>
