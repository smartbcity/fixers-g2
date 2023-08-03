import { useEffect } from 'react'
import { useLeafletContext } from '@react-leaflet/core'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import L, { LeafletEvent } from 'leaflet'
import { FeatureCollection } from 'geojson'
import { createLayersFromJson, transformLayerToJson } from './geoJsonLayer'
import { MapPluginProps } from './Map'

type PMDrawCircleEvent = { layer: L.Circle & { pm: { enable: () => void } } }
type PMEditCircleEvent = { target: L.Circle }

interface GeomanProps extends MapPluginProps {
  value?: FeatureCollection<any, any>
  setValue: (geojson: FeatureCollection<any, any>) => void
  onCircleRemoved?: () => void
}

export const Geoman = (props: GeomanProps) => {
  const { value, setValue } = props
  const context = useLeafletContext()

  useEffect(() => {
    const { map } = context
    map.eachLayer(function (layer) {
      // @ts-ignore
      if (layer.pm) {
        map.removeLayer(layer)
      }
    })
    value && createLayersFromJson(value, map)
  }, [value])

  useEffect(() => {
    const { map } = context
    map.pm.setGlobalOptions({
      // @ts-ignore
      measurements: { measurement: true, displayFormat: 'metric' }
    })
    map.pm.addControls({
      position: 'topleft',
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawPolygon: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      rotateMode: false,
      drawText: false
    })

    map.on('pm:create', (shape: PMDrawCircleEvent) => {
      // enable editing of circle
      shape.layer.pm.enable()

      const shapeObj = shape.layer.pm.getShape()
      map.eachLayer(function (layer) {
        // @ts-ignore
        if (layer.pm && layer._leaflet_id != shape.layer._leaflet_id) {
          map.removeLayer(layer)
        }
      })

      if (shapeObj == 'Circle') {
        setValue(transformLayerToJson(shape.layer))
      }
      shape.layer.on('pm:edit', (e: PMEditCircleEvent) => {
        setValue(transformLayerToJson(e.target))
      })
    })

    map.on('pm:remove', (shape: LeafletEvent) => {
      const shapeObj = shape.layer.pm.getShape()
      if (shapeObj == 'Circle') {
        // @ts-ignore
        onCircleRemoved && onCircleRemoved()
      }
    })

    return () => {
      map.pm.removeControls()
      // leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    }
  }, [context])

  return null
}

export default Geoman
