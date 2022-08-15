import React, { useMemo } from 'react'
import { ComposableElementFactory } from './ElementFactory'
import { ElementRenderers, ElementRenderProps } from './ElementRenderer'

interface ComponentFactoryProps<
  TYPE extends string,
  PROPS,
  COMPONENT_PROPS extends ElementRenderProps<TYPE, PROPS>
> {
  elements: COMPONENT_PROPS[]
  factories: ElementRenderers<TYPE, PROPS, COMPONENT_PROPS>
  customFactories?: ElementRenderers<TYPE, PROPS, COMPONENT_PROPS>
}

export const ComposableFactory = <
  TYPE extends string,
  PROPS,
  COMPONENT_PROPS extends ElementRenderProps<TYPE, PROPS>
>(
  props: ComponentFactoryProps<TYPE, PROPS, COMPONENT_PROPS>
) => {
  const { elements, factories, customFactories } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...factories, ...(customFactories ?? []) }
    return elements.map((component: COMPONENT_PROPS) => {
      return ComposableElementFactory(component, factoryClasses)
    })
  }, [elements, factories, customFactories])

  return <>{comps}</>
}
