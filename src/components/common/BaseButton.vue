<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  { variant: 'primary', type: 'button' },
)
</script>

<template>
  <button class="button" :class="`button--${variant}`" :type :disabled>
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  min-block-size: var(--size-control);
  max-inline-size: 100%;
  padding: var(--space-2) var(--space-5);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font: inherit;
  font-weight: 650;
  overflow-wrap: anywhere;

  &--primary {
    background: var(--color-accent);
    color: var(--color-on-accent);

    &:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }
  }

  &--secondary {
    border-color: var(--color-border);
    background: transparent;
    color: var(--color-text);

    &:hover:not(:disabled) {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
  }

  &:disabled {
    border-color: var(--color-divider);
    background: var(--color-canvas);
    color: var(--color-muted);
    cursor: default;
  }
}
</style>
