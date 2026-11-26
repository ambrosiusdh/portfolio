<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseTag from '../common/BaseTag.vue'

defineProps<{ technologies: readonly string[] }>()

const { t } = useI18n()
</script>

<template>
  <ul class="technologies" :aria-label="t('projects.technologies')" role="list">
    <li v-for="technology in technologies" :key="technology">
      <BaseTag lang="en">{{ technology }}</BaseTag>
    </li>
  </ul>
</template>

<style scoped>
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
