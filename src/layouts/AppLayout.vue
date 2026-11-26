<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const mainContent = useTemplateRef<HTMLElement>('mainContent')
const fragment = ref(window.location.hash)
const alternateLocale = computed(() => (locale.value === 'ja' ? 'en' : 'ja'))
const languageLink = computed(() => {
  const localePrefix = alternateLocale.value === 'ja' ? 'ja' : ''
  if (!route.name || route.name === 'not-found') {
    return { name: 'home', params: { locale: localePrefix } }
  }

  const { fullPath } = router.resolve({
    name: route.name,
    params: { ...route.params, locale: localePrefix },
    query: route.query,
  })
  return `${fullPath}${fragment.value}`
})

function updateFragment() {
  fragment.value = window.location.hash
}

// Native section links and router navigation update the fragment independently.
onMounted(() => window.addEventListener('hashchange', updateFragment))
onUnmounted(() => window.removeEventListener('hashchange', updateFragment))
watch(() => route.fullPath, updateFragment)

watch(
  () => (route.matched.length ? route.path : undefined),
  (_path, previousPath) => {
    if (previousPath !== undefined) {
      mainContent.value?.focus({ preventScroll: true })
    }
  },
  { flush: 'post' },
)
</script>

<template>
  <div class="site-layout">
    <a class="skip-link" href="#main-content">{{ t('site.skipToMain') }}</a>

    <header id="site-header" tabindex="-1">
      <nav
        class="site-container site-nav"
        :aria-label="t('site.primaryNavigation')"
      >
        <RouterLink class="site-name" :to="{ name: 'home' }">
          {{ t('site.name') }}
        </RouterLink>
        <div class="site-nav-links">
          <RouterLink
            class="nav-link"
            :class="{
              'nav-link--section-active': route.meta.section === 'projects',
            }"
            :to="{ name: 'projects' }"
          >
            {{ t('projects.title') }}
          </RouterLink>
          <RouterLink class="nav-link" :to="{ name: 'design-system' }">
            {{ t('designSystem.title') }}
          </RouterLink>
          <RouterLink
            class="nav-link language-link"
            :to="languageLink"
            :lang="alternateLocale"
            :hreflang="alternateLocale"
          >
            {{ alternateLocale === 'ja' ? '日本語' : 'English' }}
          </RouterLink>
        </div>
      </nav>
    </header>

    <main
      id="main-content"
      ref="mainContent"
      class="site-container"
      tabindex="-1"
    >
      <slot />
    </main>

    <footer>
      <div class="site-container footer-content">
        <a class="footer-link" href="#site-header">{{ t('site.backToTop') }}</a>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-block-size: 100vh;
  min-block-size: 100dvh;
}

.site-container {
  inline-size: 100%;
  max-inline-size: calc(var(--width-content) + 2 * var(--space-gutter));
  margin-inline: auto;
  padding-inline: var(--space-gutter);
}

header {
  border-block-end: 1px solid var(--color-divider);
  background: var(--color-surface);
  outline-offset: -2px;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 var(--space-4);
  padding-block: var(--space-2);
}

.site-nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0 var(--space-4);
  margin-inline-start: auto;
}

.site-nav a,
.footer-link {
  display: inline-flex;
  min-block-size: var(--size-control);
  align-items: center;
}

.site-nav a {
  color: var(--color-text);
  text-decoration: none;
}

.site-nav a[aria-current='page'],
.site-nav a:hover,
.site-nav .nav-link--section-active,
.site-nav .language-link {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 0.35em;
}

.site-name {
  font-size: var(--text-lead);
  font-weight: 700;
}

.nav-link,
.footer-link {
  font-size: var(--text-small);
}

main {
  min-inline-size: 0;
  padding-block: clamp(2rem, 6vw, 5rem) var(--space-8);
  outline-offset: -2px;
}

footer {
  border-block-start: 1px solid var(--color-divider);
}

.footer-content {
  display: flex;
  justify-content: flex-end;
  padding-block: var(--space-2);
}

.footer-link {
  color: var(--color-muted);
}

.footer-link:hover {
  color: var(--color-accent);
}

.skip-link {
  position: fixed;
  z-index: 1;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-gutter);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-card);
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.skip-link:not(:focus) {
  clip-path: inset(50%);
}
</style>
