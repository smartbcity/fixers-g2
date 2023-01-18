import L, { Layer, Map, PathOptions } from 'leaflet'
import * as geojson from 'geojson'
import { FeatureCollection } from 'geojson'

export const defaultPosition = { center: { lng: 2, lat: 46 }, zoom: 5 }

export const transformLayerToJson = (
  layer: L.Circle
): FeatureCollection<any, any> => {
  const json = layer.toGeoJSON()
  json.properties.radius = layer.getRadius()
  return {
    type: 'FeatureCollection',
    features: [json]
  }
}

var icon = () => {
  return new L.Icon({
    iconUrl: 'https://static.thenounproject.com/png/2333558-200.png',
    iconSize: [30, 36],
    iconAnchor: [15, 36],
    shadowUrl: '/btmc'
  })
}

export const createLayersFromJson = (
  data: geojson.FeatureCollection,
  map: Map
) => {
  const layers: Layer[] = []
  data.features.map((geo: geojson.GeoJsonObject) => {
    L.geoJSON(geo, {
      style: (
        feature?: geojson.Feature<geojson.GeometryObject, any>
      ): PathOptions => {
        if (feature?.properties?.color) {
          return {
            color: feature.properties.color
          }
        }

        return {}
      },
      pointToLayer: (feature, latlng) => {
        if (feature.properties.radius) {
          return L.layerGroup([
            new L.Marker(latlng, { icon: icon() }),
            new L.Circle(
              latlng,
              feature.properties.radius,
              //@ts-ignore
              {
                color: feature.properties.color
              }
            )
          ])
        } else {
          return new L.Marker(latlng, { icon: icon() })
        }
      },
      onEachFeature: (_, layer) => {
        layers.push(layer)
      }
    }).addTo(map)
  })
  return layers
}
