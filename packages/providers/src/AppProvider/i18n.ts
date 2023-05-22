import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { G2Translations } from './G2Translations'
import { DeepPartial } from '@smartb/g2-utils'

export const initI18next = <T extends { [key: string]: string } = {}>(
  languages?: T,
  translationsOverrides?: DeepPartial<typeof G2Translations>,
  options?: InitOptions
) => {
  let fallbackLng = {}
  if (!languages) {
    fallbackLng = {
      'fr-FR': ['fr'],
      default: ['fr']
    }
  } else {
    let iteration = 0
    for (var languageName in languages) {
      fallbackLng[languages[languageName.toString()]] = [languageName]
      if (iteration === 0) {
        fallbackLng['default'] = [languageName]
      }
      iteration++
    }
  }
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: fallbackLng,
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      },
      ns: ['translation', 'g2'],

      // application translation is the default namespace
      defaultNS: 'translation',

      // fallback to g2 translation to make g2 translations overridable
      fallbackNS: 'g2',
      resources: {
        fr: {
          g2: {
            ...G2Translations.fr,
            ...translationsOverrides?.fr
          }
        },
        en: {
          g2: {
            ...G2Translations.en,
            ...translationsOverrides?.en
          }
        },
        ...options?.resources
      },
      ...options
    })
  return i18n
}

export default initI18next
