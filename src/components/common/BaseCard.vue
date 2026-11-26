<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  min-inline-size: 0;
  padding: var(--space-5);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  overflow-wrap: anywhere;
}
</style>
