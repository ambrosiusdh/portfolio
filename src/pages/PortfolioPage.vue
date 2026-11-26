<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Portfolio</h1>
    <p>This portfolio is under construction.</p>
    <RouterLink :to="{ name: 'design-system' }">Design system</RouterLink>
  </main>
</template>

<style scoped>
main {
  max-inline-size: 60ch;
  margin-inline: auto;
  padding: var(--space-gutter);
}

h1 {
  margin-block: 0 var(--space-4);
  font-size: var(--text-display);
  line-height: var(--line-tight);
}

p {
  margin-block: 0 var(--space-5);
  color: var(--color-muted);
}
</style>
