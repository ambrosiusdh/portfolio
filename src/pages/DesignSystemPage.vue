<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '../components/common/BaseButton.vue'
import BaseCard from '../components/common/BaseCard.vue'
import BaseTag from '../components/common/BaseTag.vue'

const colors = [
  { label: 'Canvas', token: '--color-canvas' },
  { label: 'Surface', token: '--color-surface' },
  { label: 'Text', token: '--color-text' },
  { label: 'Muted text', token: '--color-muted' },
  { label: 'Border', token: '--color-border' },
  { label: 'Accent', token: '--color-accent' },
]

const spacingSteps = [1, 2, 3, 4, 5, 6, 7, 8]
const exampleShown = ref(false)
</script>

<template>
  <main class="design-system">
    <header class="intro">
      <RouterLink class="home-link" :to="{ name: 'home' }"
        >Portfolio</RouterLink
      >
      <div class="intro-content">
        <div>
          <h1>Design system</h1>
          <p>Shared colors, type, spacing and components for the portfolio.</p>
        </div>

        <nav class="section-links" aria-label="On this page">
          <a href="#color">Color</a>
          <a href="#typography">Typography</a>
          <a href="#spacing">Spacing</a>
          <a href="#components">Components</a>
        </nav>
      </div>
    </header>

    <section class="catalog-section" aria-labelledby="color">
      <h2 id="color">Color</h2>
      <ul class="palette" role="list">
        <li v-for="color in colors" :key="color.token" class="swatch">
          <span
            class="swatch-color"
            :style="{ backgroundColor: `var(${color.token})` }"
            aria-hidden="true"
          />
          <div class="swatch-caption">
            <strong>{{ color.label }}</strong>
            <code>{{ color.token }}</code>
          </div>
        </li>
      </ul>
    </section>

    <section class="catalog-section" aria-labelledby="typography">
      <h2 id="typography">Typography</h2>
      <BaseCard>
        <dl class="type-samples">
          <div>
            <dt>Display <code>--text-display</code></dt>
            <dd class="sample-display">Portfolio</dd>
          </div>
          <div>
            <dt>Heading <code>--text-heading</code></dt>
            <dd class="sample-heading">Engineering projects</dd>
          </div>
          <div>
            <dt>Body <code>--text-body</code></dt>
            <dd>Explain the problem, your decisions and what changed.</dd>
          </div>
          <div>
            <dt>Monospace <code>--font-mono</code></dt>
            <dd><code>npm run build</code></dd>
          </div>
        </dl>
      </BaseCard>
    </section>

    <section class="catalog-section" aria-labelledby="spacing">
      <h2 id="spacing">Spacing</h2>
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
      <h2 id="components">Components</h2>
      <div class="component-grid">
        <BaseCard class="button-card">
          <h3>Buttons</h3>
          <p>
            Use primary for the main action and secondary for supporting
            actions.
          </p>
          <div class="examples">
            <BaseButton @click="exampleShown = true">Show example</BaseButton>
            <BaseButton variant="secondary" @click="exampleShown = false">
              Reset
            </BaseButton>
            <BaseButton disabled>Unavailable</BaseButton>
          </div>
          <p class="example-status" role="status">
            {{ exampleShown ? 'Example shown.' : 'No example selected.' }}
          </p>
        </BaseCard>

        <BaseCard>
          <h3>Cards</h3>
          <p>
            Group related content on a shared surface with consistent padding.
          </p>
          <BaseCard class="nested-card">Related content</BaseCard>
        </BaseCard>

        <BaseCard>
          <h3>Tags</h3>
          <p>
            Label a category or draw attention to a short piece of metadata.
          </p>
          <div class="examples">
            <BaseTag>TypeScript</BaseTag>
            <BaseTag tone="accent">Featured</BaseTag>
          </div>
        </BaseCard>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.design-system {
  max-inline-size: calc(var(--width-content) + 2 * var(--space-gutter));
  margin-inline: auto;
  padding-inline: var(--space-gutter);
  padding-block-end: var(--space-8);
}

.intro {
  padding-block-start: var(--space-4);
}

.home-link {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
  color: var(--color-text);
  font-weight: 650;
}

.intro-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-5);
  margin-block-start: var(--space-3);
  padding-block: clamp(2rem, 6vw, 5rem) var(--space-6);
  border-block-start: 1px solid var(--color-divider);
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
