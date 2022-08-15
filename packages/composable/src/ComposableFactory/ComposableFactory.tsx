import React, { useMemo } from 'react'
import { ComposableElementFactory } from './ComposableElementFactory'
import {
  ComposableConfigKeys,
  ComposableConfigProps,
  ComposableElementConfig,
  ElementRenderers,
  ElementRenderProps
} from './ElementRenderer'

interface ComponentFactoryProps<
  CONFIG extends ComposableElementConfig,
  ELEMENT_PROPS extends ElementRenderProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>
  >
> {
  elements: ELEMENT_PROPS[]
  factories: ElementRenderers<CONFIG, ELEMENT_PROPS>
  customFactories?: ElementRenderers<CONFIG, ELEMENT_PROPS>
}

export const ComposableFactory = <
  CONFIG extends ComposableElementConfig,
  ELEMENT_PROPS extends ElementRenderProps<
    ComposableConfigKeys<CONFIG>,
    ComposableConfigProps<CONFIG>
  >
>(
  props: ComponentFactoryProps<CONFIG, ELEMENT_PROPS>
) => {
  const { elements, factories, customFactories } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...factories, ...(customFactories ?? []) }
    return elements.map((component: ELEMENT_PROPS) => {
      return ComposableElementFactory(component, factoryClasses)
    })
  }, [elements, factories, customFactories])

  return <>{comps}</>
}
