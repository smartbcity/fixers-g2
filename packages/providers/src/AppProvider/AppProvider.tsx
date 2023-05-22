import React, { Suspense, useMemo } from 'react'
import { i18n as I18nType, InitOptions } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import initI18next from './i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DeepPartial } from '@smartb/g2-utils'
import { G2Translations } from './G2Translations'

export interface AppProviderProps<
  Languages extends { [K in keyof Languages]: string } = {}
> {
  /**
   * The application that will be provided
   */
  children?: React.ReactNode
  /**
   * The languages used to init the i18n instance
   */
  languages?: Languages
  /**
   * This prop will override the default i18n instance
   */
  i18nOverride?: I18nType
  i18nTranslationsOverrides?: DeepPartial<typeof G2Translations>
  i18nOptions?: InitOptions
  /**
   * The queryClient from react-query
   */
  queryClient: QueryClient
  /**
   * The component that will be displayed when the providers are initializing
   */
  loadingComponent: JSX.Element
}

export const AppProvider = <
  Languages extends { [K in keyof Languages]: string } = {}
>(
  props: AppProviderProps<Languages>
) => {
  const {
    i18nOverride,
    languages = { fr: 'fr-FR' },
    loadingComponent,
    queryClient,
    children,
    i18nTranslationsOverrides,
    i18nOptions
  } = props
  const i18n = useMemo(
    () =>
      i18nOverride ||
      initI18next(languages, i18nTranslationsOverrides, i18nOptions),
    [i18nOverride, languages, i18nTranslationsOverrides, i18nOptions]
  )
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={loadingComponent}>
          <BrowserRouter>{children}</BrowserRouter>
        </Suspense>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
