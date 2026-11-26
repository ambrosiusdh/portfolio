<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral' | 'accent' }>(), {
  tone: 'neutral',
})
</script>

<template>
  <span class="tag" :class="`tag--${tone}`">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  display: inline-block;
  max-inline-size: 100%;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-muted);
  font-size: var(--text-small);
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.tag--accent {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
