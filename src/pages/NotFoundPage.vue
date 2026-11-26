<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-intro">
    <h1>Page not found</h1>
    <p>
      The page you requested may have moved or the address may be incorrect.
    </p>
    <RouterLink :to="{ name: 'home' }">Return to the portfolio</RouterLink>
  </div>
</template>
