# Portfolio

Personal software engineering portfolio built with Vue 3, TypeScript, and Vite.

## Local development

Use Node.js 22.13 or later in the 22.x line and npm.

```sh
npm ci
npm run dev
```

## Design system

Open `/design-system` in the running app to review the color palette, responsive typography, spacing scale, and component examples. Semantic CSS custom properties live in `src/assets/_tokens.scss`. The components in `src/components/common` consume those properties and accept content through slots. Use `BaseButton` for actions, ordinary links for navigation, `BaseCard` to group related content, and `BaseTag` for short labels.

## Languages

English uses `/` and `/design-system`. Japanese uses `/ja` and `/ja/design-system`. The language switch keeps the current page, or takes visitors to the translated home page from a page-not-found view. The URL preserves the language on refresh and when shared.

Add user-facing text to both catalogs in `src/i18n/messages` and read it with Vue I18n in components. Add new pages under the shared locale route in `src/router/index.ts` so both languages use the same page component.

## Verification

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts Vite Preview and tests the compiled app from `dist`. On Linux, add `--with-deps` when installing Chromium if system libraries are missing.

## Deployment

Import this repository into Vercel with the Vite preset and Node.js 22.x. Vercel builds the static site into `dist`. The rewrite in `vercel.json` lets Vue Router handle direct visits to client-side routes.
