export const i18next = `
interface Languages {
  fr: string
  en: string
}
const languages: Languages = {
  fr: "fr-FR", // the value is the ISO language code of the language
  en: "en-US"
}
...
  <AruiAppProvider<Languages>
    languages={languages}
  >
`

export const usei18next = `
interface Languages {
  fr: string
  en: string
}
const languages: Languages = {
  fr: "fr-FR", // the value is the ISO language code of the language
  en: "en-US"
}

export const useExtendedI18n = () => {
  return useI18n<Languages>()
}
`

export const redux = `
const { store, history, reducer } = initRedux({myReducer: myReducerObject})

export type State = ReturnType<typeof reducer>;
...
  <AruiAppProvider
  reduxStore={store}
  history={history}
  >
`

