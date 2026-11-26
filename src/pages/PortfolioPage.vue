<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="page-intro">
    <h1>{{ t('site.name') }}</h1>
    <p>{{ t('home.description') }}</p>
  </div>
</template>
