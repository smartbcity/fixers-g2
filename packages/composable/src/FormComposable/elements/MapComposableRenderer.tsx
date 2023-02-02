import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'
import React, { useMemo, useCallback } from 'react'
import {
  DraggableMarkerNeeds,
  Map,
  MapProps,
  MapPlugin
} from '@smartb/g2-forms'

export type MapPropsWithLimitedPlugins = Omit<
  MapProps,
  'draggableMarkerPlugin' | 'additionnalPlugins'
> & {
  draggableMarkerPlugin?: Omit<
    DraggableMarkerNeeds,
    'onPositionChange' | 'position'
  > & { enable?: boolean }
  additionnalPlugins?: Omit<MapPlugin, 'value' | 'setValue'>[]
}

export type MapComposableRendererProps = FieldRenderProps<
  'map',
  MapPropsWithLimitedPlugins
>
export const MapComposableRenderer: ElementRendererFunction<
  MapComposableRendererProps
> = (props: MapComposableRendererProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const mapState = useMemo(
    () => getIn(formState.values, basicProps.name),
    [formState.values, basicProps.name]
  )
  const onChange = basicProps.onChange
  delete basicProps.onChange

  const onChangeMapState = useCallback(
    (key: string, value: any) => {
      formState.setFieldValue(basicProps.name, { ...mapState, [key]: value })
    },
    [onChange, mapState, formState.setFieldValue]
  )

  const additionnalPlugins = useMemo(
    () =>
      params?.additionnalPlugins?.map(
        (plugin): MapPlugin => ({
          ...plugin,
          value: mapState ? mapState[plugin.key] : undefined,
          setValue: (value) => onChangeMapState(plugin.key, value)
        })
      ),
    [params?.additionnalPlugins, mapState, onChangeMapState]
  )

  return (
    <Map
      {...basicProps}
      {...params}
      additionnalPlugins={additionnalPlugins}
      draggableMarkerPlugin={
        params?.draggableMarkerPlugin?.enable
          ? {
              onPositionChange: (position, geojson) =>
                onChangeMapState('marker', {
                  position: position,
                  geojson: geojson
                }),
              position: mapState?.marker?.position,
              ...params?.draggableMarkerPlugin
            }
          : undefined
      }
    />
  )
}