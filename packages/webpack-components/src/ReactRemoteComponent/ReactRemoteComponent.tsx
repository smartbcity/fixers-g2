import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { ErrorBoundary } from './ErrorBoundary'

type Dependency = any

export interface ReactRemoteComponentProps<T extends object = {}> {
  url: string
  moduleName: string
  moduleDeps?: { [dependencyName: string]: Dependency }
  componentProps?: T
}

export const ReactRemoteComponent = <T extends object = {}>(
  props: ReactRemoteComponentProps<T>
) => {
  const { url, moduleName, moduleDeps, componentProps } = props
  const { ready, failed } = useDynamicScript(url, moduleName, moduleDeps)

  if (!ready) {
    return <Loader />
  }

  if (failed) {
    return <h2>Unavailable component</h2>
  }

  const Component = React.lazy(async () => {
    //@ts-ignore
    return await window[moduleName].get(moduleName).then((factory) => {
      const Module = factory()
      return Module
    })
  })

  return (
    <ErrorBoundary url={url}>
      <React.Suspense fallback={<Loader />}>
        <Component {...componentProps} />
      </React.Suspense>
    </ErrorBoundary>
  )
}

const useDynamicScript = (
  url: string,
  moduleName: string,
  moduleDeps?: { [dependencyName: string]: Dependency }
) => {
  const [ready, setReady] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!url) {
      return
    }

    if (document.getElementById(url) !== null) {
      setReady(true)
      return
    }

    const element = document.createElement('script')
    element.src = url
    element.id = url
    element.type = 'text/javascript'
    element.async = true

    element.onload = () => {
      shareModuleDeps(moduleName, moduleDeps).then(() => setReady(true))
    }

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`)
      setReady(false)
      setFailed(true)
    }

    document.head.appendChild(element)
  }, [url])

  return {
    ready,
    failed
  }
}

const Loader = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    width='100%'
    height='100%'
  >
    <CircularProgress />
  </Box>
)

const shareModuleDeps = async (
  moduleName: string,
  moduleDeps?: { [dependencyName: string]: Dependency }
) => {
  if (!moduleDeps || moduleDeps.length <= 0) return
  let sharedScope: { [key: string]: object } = {}
  for (const dep in moduleDeps) {
    const required = moduleDeps[dep]
    sharedScope[dep] = {
      [required.version]: {
        get: () =>
          new Promise((resolveShared) => {
            resolveShared(() => required)
          }),
        loaded: true
      }
    }
  }
  //@ts-ignore
  await window[moduleName].init(sharedScope)
}
