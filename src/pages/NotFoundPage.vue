<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <div class="page-intro">
    <h1>{{ t('notFound.title') }}</h1>
    <p>{{ t('notFound.description') }}</p>
    <RouterLink :to="{ name: 'home' }">{{ t('notFound.homeLink') }}</RouterLink>
  </div>
</template>
