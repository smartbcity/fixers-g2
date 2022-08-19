import React, { useMemo } from 'react'
import { ElementFactory } from './ElementFactory'
import { RenderersConfig } from './ElementRenderer'
import { FieldRenderProps } from '../FormComposable/type/FieldRenderProps'

interface ContainerRendererProps {
  elements: FieldRenderProps<any, any>[]
  renderer: RenderersConfig
  rendererCustom?: RenderersConfig
}

export const ContainerRenderer = (props: ContainerRendererProps) => {
  const { elements, renderer, rendererCustom } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...renderer, ...(rendererCustom ?? {}) }
    return elements.map((component: FieldRenderProps<any, any>) => {
      return ElementFactory(component, factoryClasses)
    })
  }, [elements, renderer, rendererCustom])

  return <>{comps}</>
}
