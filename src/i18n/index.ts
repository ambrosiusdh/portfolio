import { createI18n } from 'vue-i18n'
import en from './messages/en.json'
import ja from './messages/ja.json'

export const i18n = createI18n<[typeof en], 'en' | 'ja', false>({
  legacy: false,
  globalInjection: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ja },
})
