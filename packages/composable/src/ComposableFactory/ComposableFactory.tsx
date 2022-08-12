import React, { useMemo } from 'react'
import {
  ComposableElementFactory,
  ElementFactories,
  ElementProps
} from './ElementFactory'

interface ComponentFactoryProps<
  TYPE extends string,
  PROPS,
  COMPONENT_PROPS extends ElementProps<TYPE, PROPS>
> {
  elements: COMPONENT_PROPS[]
  factories: ElementFactories<TYPE, PROPS, COMPONENT_PROPS>
  customFactories?: ElementFactories<TYPE, PROPS, COMPONENT_PROPS>
}

export const ComposableFactory = <
  TYPE extends string,
  PROPS,
  COMPONENT_PROPS extends ElementProps<TYPE, PROPS>
>(
  props: ComponentFactoryProps<TYPE, PROPS, COMPONENT_PROPS>
) => {
  const { elements, factories, customFactories } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...factories, ...(customFactories ?? []) }
    return elements.map((component: COMPONENT_PROPS) => {
      return ComposableElementFactory<TYPE, PROPS, COMPONENT_PROPS>(
        component,
        factoryClasses
      )
    })
  }, [elements, factories, customFactories])

  return <>{comps}</>
}
