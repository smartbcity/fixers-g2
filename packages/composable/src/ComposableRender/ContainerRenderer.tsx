import React, { useMemo } from 'react'
import { ElementFactory } from './ElementFactory'
import {
  ComposableElementConfig,
  ElementRenderers,
  ElementRenderPropsConfig
} from './ElementRenderer'

interface ContainerRendererProps<CONFIG extends ComposableElementConfig> {
  elements: ElementRenderPropsConfig<CONFIG>[]
  factories: ElementRenderers<CONFIG>
  customFactories?: ElementRenderers<CONFIG>
}

export const ContainerRenderer = <CONFIG extends ComposableElementConfig>(
  props: ContainerRendererProps<CONFIG>
) => {
  const { elements, factories, customFactories } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...factories, ...(customFactories ?? []) }
    return elements.map((component: ElementRenderPropsConfig<CONFIG>) => {
      return ElementFactory(component, factoryClasses)
    })
  }, [elements, factories, customFactories])

  return <>{comps}</>
}
